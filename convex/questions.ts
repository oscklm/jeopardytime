import { v } from 'convex/values';
import { Question } from './schema';
import { mutation, query } from './_generated/server';
import { getCurrentUserOrThrow } from './helpers';

import { partial } from 'convex-helpers/validators';

const { authorId, ...fields } = Question.withSystemFields;

export const createQuestion = mutation({
  args: {
    values: v.object(fields),
  },
  handler: async (ctx, { values }) => {
    const user = await getCurrentUserOrThrow(ctx);

    return await ctx.db.insert('questions', {
      authorId: user._id,
      ...values,
    });
  },
});

export const updateQuestionById = mutation({
  args: { id: v.id('questions'), values: v.object(partial(fields)) },
  handler: async (ctx, { id, values }) => {
    const user = await getCurrentUserOrThrow(ctx);

    return await ctx.db.patch(id, { ...values });
  },
});

export const getQuestionById = query({
  args: { id: v.id('questions') },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

export const getAllQuestions = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('questions').collect();
  },
});

export const getAllQuestionsByUserId = query({
  args: { userId: v.id('users') },
  handler: async (ctx, { userId }) => {
    return await ctx.db
      .query('questions')
      .withIndex('by_authorId', (q) => q.eq('authorId', userId))
      .collect();
  },
});