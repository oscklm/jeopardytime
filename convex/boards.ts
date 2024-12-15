import { v } from 'convex/values';
import { Board } from './schema';
import { mutation, query } from './_generated/server';
import { getCurrentUserOrThrow, isNotNull } from './helpers';

import { partial } from 'convex-helpers/validators';

const { authorId, timesPlayed, ...fields } = Board.withoutSystemFields;

export const createBoard = mutation({
  args: {
    values: v.object(fields),
  },
  handler: async (ctx, { values }) => {
    const user = await getCurrentUserOrThrow(ctx);

    return await ctx.db.insert('boards', {
      authorId: user._id,
      ...values,
      timesPlayed: 0,
    });
  },
});

const updateBoardFields = partial(fields);

export const updateBoardById = mutation({
  args: { id: v.id('boards'), values: v.object(updateBoardFields) },
  handler: async (ctx, { id, values }) => {
    const user = await getCurrentUserOrThrow(ctx);

    return await ctx.db.patch(id, { ...values });
  },
});

export const getBoardById = query({
  args: { id: v.id('boards') },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

export const getAllBoards = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('boards').collect();
  },
});

export const getAllBoardsByCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUserOrThrow(ctx);

    return await ctx.db
      .query('boards')
      .withIndex('by_authorId', (q) => q.eq('authorId', user._id))
      .order('desc')
      .collect();
  },
});

export const getAllBoardCategories = query({
  args: { id: v.id('boards') },
  handler: async (ctx, { id }) => {
    const relations = await ctx.db
      .query('boardCategoryRelations')
      .withIndex('by_boardId', (q) => q.eq('boardId', id))
      .order('desc')
      .collect();

    return (
      await Promise.all(
        relations.map((relation) => ctx.db.get(relation.categoryId)),
      )
    ).filter(isNotNull);
  },
});
