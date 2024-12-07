import { defineSchema, defineTable } from 'convex/server';
import { type Infer, v } from 'convex/values';

const schema = defineSchema({
  users: defineTable({
    name: v.string(),
    username: v.union(v.string(), v.null()),
    email: v.string(),
    imageId: v.union(v.string(), v.null()),
    externalId: v.string(),
  })
    .index('by_externalId', ['externalId'])
    .index('by_email', ['email']),

  gameRooms: defineTable({
    name: v.string(),
    code: v.string(),
    hostId: v.id('users'),
    status: v.union(
      v.literal('waiting'),
      v.literal('in_progress'),
      v.literal('completed'),
    ),
    currentRound: v.optional(v.number()),
    lastUpdatedAt: v.number(),
    maxPlayers: v.number(),
  })
    .index('by_hostId', ['hostId'])
    .index('by_code', ['code'])
    .index('by_status', ['status']),

  gamePlayers: defineTable({
    gameRoomId: v.id('gameRooms'),
    userId: v.id('users'),
    score: v.number(),
    isHost: v.boolean(),
    joinedAt: v.number(),
  })
    .index('by_gameRoomId', ['gameRoomId'])
    .index('by_userId', ['userId']),

  categories: defineTable({
    name: v.string(),
    gameRoomId: v.id('gameRooms'),
    order: v.number(),
  }),

  questions: defineTable({
    categoryId: v.id('categories'),
    question: v.string(),
    answer: v.string(),
    pointValue: v.number(),
    isAnswered: v.boolean(),
    answeredBy: v.optional(v.id('users')),
  }),
});

export default schema;

const user = schema.tables.users.validator;
const gameRoom = schema.tables.gameRooms.validator;
const category = schema.tables.categories.validator;
const question = schema.tables.questions.validator;
const gamePlayer = schema.tables.gamePlayers.validator;

export type User = Infer<typeof user>;
export type GameRoom = Infer<typeof gameRoom>;
export type Category = Infer<typeof category>;
export type Question = Infer<typeof question>;
export type GamePlayer = Infer<typeof gamePlayer>;
