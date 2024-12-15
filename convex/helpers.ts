import invariant from 'tiny-invariant';
import type { QueryCtx } from './_generated/server';

export async function getCurrentUserOrThrow(ctx: QueryCtx) {
  const user = await getCurrentUser(ctx);
  invariant(user, 'Could not get current user');
  return user;
}

export async function getCurrentUser(ctx: QueryCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (identity === null) {
    return null;
  }
  return await userByExternalId(ctx, identity.subject);
}

export async function userByExternalId(ctx: QueryCtx, externalId: string) {
  return await ctx.db
    .query('users')
    .withIndex('by_externalId', (q) => q.eq('externalId', externalId))
    .unique();
}

export async function assertUserExists(ctx: QueryCtx) {
  const user = await getCurrentUser(ctx);
  if (!user) throw new Error('User not found');
  return user;
}

export const isNotNull = <T>(value: T | null): value is T => value !== null;
