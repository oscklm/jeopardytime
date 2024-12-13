import { v } from 'convex/values';
import {
  mutation,
  query,
  type QueryCtx,
  type MutationCtx,
} from './_generated/server';
import { enrichedGamePlayerFields, GameRoom } from './schema';
import invariant from 'tiny-invariant';
import type { Doc } from './_generated/dataModel';

export const createGameRoom = mutation({
  args: {
    userId: v.id('users'),
    name: v.string(),
    gameBoardId: v.id('gameBoards'),
  },
  returns: v.id('gameRooms'),
  handler: async (ctx, { userId, name, gameBoardId }) => {
    // Generate a unique code for the game room
    const code = await generateCode(ctx, 6);

    const gameRoomId = await ctx.db.insert('gameRooms', {
      name: name,
      code: code,
      gameBoardId: gameBoardId,
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
  returns: v.array(GameRoom.doc),
  handler: async (ctx) => {
    return await ctx.db.query('gameRooms').order('desc').collect();
  },
});

export const getGameRoomById = query({
  args: { id: v.id('gameRooms') },
  returns: GameRoom.doc,
  handler: async (ctx, { id }) => {
    const gameRoom = await ctx.db.get(id);
    invariant(gameRoom, `Game room not found by id ${id}`);
    return gameRoom;
  },
});

export const getPlayersByGameRoomId = query({
  args: { id: v.id('gameRooms') },
  returns: v.array(enrichedGamePlayerFields),
  handler: async (ctx, { id }) => {
    const gamePlayers = await ctx.db
      .query('gamePlayers')
      .withIndex('by_gameRoomId', (q) => q.eq('gameRoomId', id))
      .collect();

    // Enrich with their user details
    const enrichedGamePlayers = await Promise.all(
      gamePlayers.map(async (player) => {
        return await enrichGamePlayer(ctx, player);
      }),
    );

    return enrichedGamePlayers;
  },
});

async function enrichGamePlayer(ctx: QueryCtx, gamePlayer: Doc<'gamePlayers'>) {
  const user = await ctx.db.get(gamePlayer.userId);
  invariant(user, 'User not found');
  return { ...gamePlayer, user };
}
