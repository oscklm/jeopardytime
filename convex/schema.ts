import { defineSchema } from 'convex/server';
import { type Infer, v } from 'convex/values';
import { Table } from 'convex-helpers/server';
import { zid, zodToConvexFields } from 'convex-helpers/server/zod';
import { z } from 'zod';

export const User = Table('users', {
  name: v.string(),
  username: v.union(v.string(), v.null()),
  email: v.string(),
  imageId: v.union(v.string(), v.null()),
  externalId: v.string(),
});

/**
 *  Room
 */

export const roomSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  code: z.string(),
  boardId: zid('boards'),
  hostId: zid('users'),
});

export const roomFormSchema = roomSchema
  .omit({
    hostId: true,
    boardId: true,
    code: true,
  })
  .extend({
    boardId: z.string().min(1, { message: 'Board is required' }),
  });

export const Room = Table('rooms', {
  name: v.string(),
  code: v.string(),
  boardId: v.id('boards'),
  hostId: v.id('users'),
  status: v.union(
    v.literal('waiting'),
    v.literal('in_progress'),
    v.literal('completed'),
  ),
  currentRound: v.optional(v.number()),
  lastUpdatedAt: v.number(),
  maxPlayers: v.number(),
});

export const Player = Table('players', {
  roomId: v.id('rooms'),
  userId: v.id('users'),
  score: v.number(),
  isHost: v.boolean(),
  joinedAt: v.number(),
});

/**
 * Questions
 */
export const questionSchema = z.object({
  authorId: zid('users'),
  question: z.string().min(1),
  answer: z.string().min(1),
  value: z.number().min(100),
  imageId: z.string().nullable(),
});

export const questionFormSchema = questionSchema
  .extend({
    categoryId: z.string().optional(),
  })
  .omit({ authorId: true });

export const Question = Table(
  'questions',
  zodToConvexFields(questionSchema.shape),
);

/**
 * Categories
 */

export const categorySchema = z.object({
  authorId: zid('users'),
  name: z.string().min(1),
  description: z.string().min(1),
});

export const categoryFormSchema = categorySchema.omit({ authorId: true });

export const Category = Table(
  'categories',
  zodToConvexFields(categorySchema.shape),
);

export const CategoryQuestionRelation = Table('categoryQuestionRelations', {
  categoryId: Category._id,
  questionId: Question._id,
});

/**
 * Boards
 */

export const boardSchema = z.object({
  authorId: zid('users'),
  name: z.string().min(1).max(100),
  isPublic: z.boolean(),
  timesPlayed: z.number(),
});

export const boardFormSchema = boardSchema.omit({
  authorId: true,
  timesPlayed: true,
});

export const Board = Table('boards', zodToConvexFields(boardSchema.shape));

export const BoardCategoryRelation = Table('boardCategoryRelations', {
  boardId: Board._id,
  categoryId: Category._id,
});

const schema = defineSchema({
  users: User.table
    .index('by_externalId', ['externalId'])
    .index('by_email', ['email']),

  rooms: Room.table
    .index('by_hostId', ['hostId'])
    .index('by_code', ['code'])
    .index('by_status', ['status']),

  players: Player.table
    .index('by_roomId', ['roomId'])
    .index('by_userId', ['userId']),

  boards: Board.table
    .index('by_authorId', ['authorId'])
    .index('by_public', ['isPublic']),

  boardCategoryRelations: BoardCategoryRelation.table
    .index('by_boardId', ['boardId'])
    .index('by_categoryId', ['categoryId']),

  categories: Category.table.index('by_authorId', ['authorId']),

  questions: Question.table.index('by_authorId', ['authorId']),

  categoryQuestionRelations: CategoryQuestionRelation.table
    .index('by_categoryId', ['categoryId'])
    .index('by_questionId', ['questionId']),
});

export default schema;

export const enrichedPlayerFields = v.object({
  ...Player.withSystemFields,
  user: v.object(User.withSystemFields),
});

export type EnrichedPlayer = Infer<typeof enrichedPlayerFields>;
