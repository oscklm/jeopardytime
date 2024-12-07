import { v } from 'convex/values';
import { mutation, query, type MutationCtx } from './_generated/server';

export const createGameRoom = mutation({
  args: {
    userId: v.id('users'),
    name: v.string(),
  },
  handler: async (ctx, { userId, name }) => {
    // Generate a unique code for the game room
    const code = await generateCode(ctx, 6);

    const gameRoomId = await ctx.db.insert('gameRooms', {
      name: name,
      code: code,
      hostId: userId,
      status: 'waiting',
      lastUpdatedAt: Date.now(),
      maxPlayers: 10,
    });

    return gameRoomId;
  },
});

async function generateCode(ctx: MutationCtx, length: number) {
  const MAX_ATTEMPTS = 10;
  let attempts = 0;
  let code: string;
  let exists: boolean;

  // Define the characters we want to use (0-9 and A-Z)
  const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  do {
    // Generate a random code using the characters array
    code = Array.from(crypto.getRandomValues(new Uint8Array(length)))
      .map((b) => characters[b % characters.length])
      .join('');

    exists = await checkCodeExists(ctx, code);
    attempts++;

    if (attempts >= MAX_ATTEMPTS) {
      throw new Error(
        'Failed to generate unique game code after maximum attempts',
      );
    }
  } while (exists);

  return code;
}

async function checkCodeExists(ctx: MutationCtx, code: string) {
  const gameRoom = await ctx.db
    .query('gameRooms')
    .withIndex('by_code', (q) => q.eq('code', code))
    .first();
  return gameRoom !== null;
}

export const getAllGameRooms = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('gameRooms').order('desc').collect();
  },
});
