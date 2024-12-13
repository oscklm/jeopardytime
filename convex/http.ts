import { httpRouter } from 'convex/server';
import { httpAction } from './_generated/server';
import { internal } from './_generated/api';
import type { WebhookEvent } from '@clerk/backend';
import { Webhook } from 'svix';

const http = httpRouter();

http.route({
  path: '/clerk-users-webhook',
  method: 'POST',
  handler: httpAction(async (ctx, request) => {
    const event = await validateRequest(request);
    if (!event) {
      return new Response('Error occured', { status: 400 });
    }
    switch (event.type) {
      case 'user.created': // intentional fallthrough
      case 'user.updated':
        await ctx.runMutation(internal.users.upsertFromClerk, {
          data: event.data,
        });
        break;

      case 'user.deleted': {
        const clerkUserId = event.data.id;
        if (!clerkUserId) {
          return new Response('Missing user ID', { status: 400 });
        }
        await ctx.runMutation(internal.users.deleteFromClerk, { clerkUserId });
        break;
      }
      default:
        console.log('Ignored Clerk webhook event', event.type);
    }

    return new Response(null, { status: 200 });
  }),
});

http.route({
  path: '/uploadImage',
  method: 'POST',
  handler: httpAction(async (ctx, request) => {
    const blob = await request.blob();
    const storageId = await ctx.storage.store(blob);
    return new Response(JSON.stringify({ storageId }), {
      status: 200,
      // CORS headers
      headers: new Headers({
        // e.g. https://mywebsite.com, configured on your Convex dashboard
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
        Vary: 'origin',
      }),
    });
  }),
});

http.route({
  path: '/uploadImage',
  method: 'OPTIONS',
  handler: httpAction(async (_, request) => {
    // Make sure the necessary headers are present
    // for this to be a valid pre-flight request
    const headers = request.headers;
    if (
      headers.get('Origin') !== null &&
      headers.get('Access-Control-Request-Method') !== null &&
      headers.get('Access-Control-Request-Headers') !== null
    ) {
      return new Response(null, {
        headers: new Headers({
          // e.g. https://mywebsite.com, configured on your Convex dashboard
          // biome-ignore lint/style/noNonNullAssertion: <explanation>
          'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type, Digest',
          'Access-Control-Max-Age': '86400',
        }),
      });
    }

    return new Response(null, { status: 400 });
  }),
});

async function validateRequest(req: Request): Promise<WebhookEvent | null> {
  const payloadString = await req.text();
  const svixHeaders = {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    'svix-id': req.headers.get('svix-id')!,
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    'svix-timestamp': req.headers.get('svix-timestamp')!,
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    'svix-signature': req.headers.get('svix-signature')!,
  };
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);
  try {
    return wh.verify(payloadString, svixHeaders) as unknown as WebhookEvent;
  } catch (error) {
    console.error('Error verifying webhook event', error);
    return null;
  }
}

export default http;
