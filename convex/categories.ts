import { v } from 'convex/values';
import { Category } from './schema';
import { mutation, query } from './_generated/server';
import { getCurrentUserOrThrow, isNotNull } from './helpers';

import { partial } from 'convex-helpers/validators';

const { authorId, ...fields } = Category.withoutSystemFields;

export const createCategory = mutation({
  args: {
    values: v.object(fields),
    boardId: v.optional(v.id('boards')),
  },
  handler: async (ctx, { values, boardId }) => {
    const user = await getCurrentUserOrThrow(ctx);

    const categoryId = await ctx.db.insert('categories', {
      authorId: user._id,
      ...values,
    });

    if (boardId) {
      // Create relation between category and board
      await ctx.db.insert('boardCategoryRelations', {
        boardId,
        categoryId,
      });
    }

    return categoryId;
  },
});

export const updateCategoryById = mutation({
  args: { id: v.id('categories'), values: v.object(partial(fields)) },
  handler: async (ctx, { id, values }) => {
    const user = await getCurrentUserOrThrow(ctx);

    return await ctx.db.patch(id, { ...values });
  },
});

export const getCategoryById = query({
  args: { id: v.id('categories') },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

export const getAllCategories = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('categories').order('desc').collect();
  },
});

export const getAllCategoriesByUserId = query({
  args: { userId: v.id('users') },
  handler: async (ctx, { userId }) => {
    return await ctx.db
      .query('categories')
      .withIndex('by_authorId', (q) => q.eq('authorId', userId))
      .order('desc')
      .collect();
  },
});

export const getAllCategoryQuestions = query({
  args: { id: v.id('categories') },
  handler: async (ctx, { id }) => {
    const relations = await ctx.db
      .query('categoryQuestionRelations')
      .withIndex('by_categoryId', (q) => q.eq('categoryId', id))
      .order('desc')
      .collect();

    return (
      await Promise.all(
        relations.map((relation) => ctx.db.get(relation.questionId)),
      )
    ).filter(isNotNull);
  },
});
