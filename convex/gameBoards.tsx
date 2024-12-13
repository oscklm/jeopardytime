import { v } from "convex/values";
import { GameBoard } from "./schema";
import { mutation, query } from "./_generated/server";
import { getCurrentUser } from "./helpers";
import invariant from "tiny-invariant";

const { creatorId, ...fields } = GameBoard.withoutSystemFields;

export const createGameBoard = mutation({
  args: {
    values: v.object(fields),
  },
  handler: async (ctx, { values }) => {
    const user = await getCurrentUser(ctx);

    invariant(user, "Authentication required, this should not happen.");

    return await ctx.db.insert("gameBoards", {
      ...values,
      creatorId: user._id,
    });
  },
});

export const getGameBoards = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("gameBoards").collect();
  },
});

export const getGameBoardByUserId = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    return await ctx.db
      .query("gameBoards")
      .withIndex("by_creatorId", (q) => q.eq("creatorId", userId))
      .collect();
  },
});
