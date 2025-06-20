import { v } from "convex/values";
import { query } from "../_generated/server";
import { BoardReaderController } from "./controllers";

export const getAll = query({
	args: {},
	handler: async (ctx) => {
		const boardController = new BoardReaderController(ctx.db);
		const boards = await boardController.query().collect();
		return boards;
	},
});

export const getAllEnriched = query({
	args: {},
	handler: async (ctx) => {
		const boardController = new BoardReaderController(ctx.db);
		const boards = await boardController.query().collect();
		return (
			await Promise.all(
				boards.map((board) => boardController.getEnriched(board._id)),
			)
		).filter((board): board is NonNullable<typeof board> => board !== null);
	},
});

export const getById = query({
	args: { id: v.string() },
	handler: async (ctx, { id }) => {
		const boardController = new BoardReaderController(ctx.db);

		const normalizedId = ctx.db.normalizeId("boards", id);
		if (!normalizedId) {
			throw new Error(`Invalid board ID: ${id}`);
		}

		return boardController.get(normalizedId);
	},
});

export const getByIdEnriched = query({
	args: { id: v.string() },
	handler: async (ctx, { id }) => {
		const boardController = new BoardReaderController(ctx.db);
		const normalizedId = ctx.db.normalizeId("boards", id);
		if (!normalizedId) {
			throw new Error(`Invalid board ID: ${id}`);
		}
		return boardController.getEnriched(normalizedId);
	},
});
