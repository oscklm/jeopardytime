import { defineSchema, defineTable } from 'convex/server';
import { type Infer, v } from 'convex/values';
import { Table } from 'convex-helpers/server';

export const User = Table('users', {
  name: v.string(),
  username: v.union(v.string(), v.null()),
  email: v.string(),
  imageId: v.union(v.string(), v.null()),
  externalId: v.string(),
});

export const GameRoom = Table('gameRooms', {
  name: v.string(),
  code: v.string(),
  gameBoardId: v.id('gameBoards'),
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

export const GamePlayer = Table('gamePlayers', {
  gameRoomId: v.id('gameRooms'),
  userId: v.id('users'),
  score: v.number(),
  isHost: v.boolean(),
  joinedAt: v.number(),
});

export const GameBoard = Table('gameBoards', {
  name: v.string(),
  creatorId: v.id('users'),
  isPublic: v.boolean(),
  timesPlayed: v.number(),
  categories: v.array(
    v.object({
      id: v.string(),
      name: v.string(),
      questions: v.array(
        v.object({
          id: v.string(),
          imageId: v.union(v.string(), v.null()),
          question: v.string(),
          answer: v.string(),
          value: v.number(),
        }),
      ),
    }),
  ),
});

const schema = defineSchema({
  users: User.table
    .index('by_externalId', ['externalId'])
    .index('by_email', ['email']),

  gameRooms: GameRoom.table
    .index('by_hostId', ['hostId'])
    .index('by_code', ['code'])
    .index('by_status', ['status']),

  gamePlayers: GamePlayer.table
    .index('by_gameRoomId', ['gameRoomId'])
    .index('by_userId', ['userId']),

  gameBoards: GameBoard.table
    .index('by_creatorId', ['creatorId'])
    .index('by_public', ['isPublic']),
});

export default schema;

export const gameBoardFields = GameBoard.withoutSystemFields;
export const categoryFields =
  GameBoard.withoutSystemFields.categories.element.fields;
export const questionFields =
  GameBoard.withoutSystemFields.categories.element.fields.questions.element
    .fields;
export const gamePlayerFields = GamePlayer.withoutSystemFields;

export const enrichedGamePlayerFields = v.object({
  ...GamePlayer.withSystemFields,
  user: v.object(User.withSystemFields),
});

export type EnrichedGamePlayer = Infer<typeof enrichedGamePlayerFields>;
