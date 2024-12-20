import { v } from 'convex/values';
import {
  mutation,
  query,
  type QueryCtx,
  type MutationCtx,
} from './_generated/server';
import invariant from 'tiny-invariant';
import { enrichedPlayerFields, Game } from './schema';
import type { Doc } from './_generated/dataModel';

export const createGame = mutation({
  args: {
    userId: v.id('users'),
    name: v.string(),
    boardId: v.id('boards'),
  },
  returns: v.id('games'),
  handler: async (ctx, { userId, name, boardId }) => {
    // Generate a unique code for the game room
    const code = await generateCode(ctx, 6);

    const gameRoomId = await ctx.db.insert('games', {
      name: name,
      code: code,
      boardId: boardId,
      hostId: userId,
      status: 'waiting',
      lastUpdatedAt: Date.now(),
      maxPlayers: 10,
    });

    //

    // Increment the board's play count

    // Get the board
    const board = await ctx.db.get(boardId);
    invariant(board, 'Board not found');

    // Increment the board's play count
    await ctx.db.patch(boardId, {
      timesPlayed: board.timesPlayed + 1,
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
    .query('games')
    .withIndex('by_code', (q) => q.eq('code', code))
    .first();
  return gameRoom !== null;
}

export const getAllRooms = query({
  args: {},
  returns: v.array(Game.doc),
  handler: async (ctx) => {
    return await ctx.db.query('games').order('desc').collect();
  },
});

export const getRoomById = query({
  args: { id: v.id('games') },
  returns: Game.doc,
  handler: async (ctx, { id }) => {
    const gameRoom = await ctx.db.get(id);
    invariant(gameRoom, `Game room not found by id ${id}`);
    return gameRoom;
  },
});

export const getPlayersByRoomId = query({
  args: { id: v.id('rooms') },
  returns: v.array(enrichedPlayerFields),
  handler: async (ctx, { id }) => {
    const gamePlayers = await ctx.db
      .query('players')
      .withIndex('by_roomId', (q) => q.eq('roomId', id))
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

async function enrichGamePlayer(ctx: QueryCtx, gamePlayer: Doc<'players'>) {
  const user = await ctx.db.get(gamePlayer.userId);
  invariant(user, 'User not found');
  return { ...gamePlayer, user };
}
