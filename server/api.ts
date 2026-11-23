import express, { type ErrorRequestHandler, type Express, type NextFunction, type Request, type Response } from 'express';

import { checkBearer, isIngestEnabled } from './auth.ts';
import { parseCampaign } from './campaignSchema.ts';
import { isCampaignId, type CampaignStore } from './campaignStore.ts';
import { createRateLimiter, type RateLimitOptions } from './rateLimit.ts';

export interface ApiOptions {
  /** The secret n8n sends as "Authorization: Bearer <token>". Unset (or too short) switches sending off. */
  readonly ingestToken?: string;
  readonly store: CampaignStore;
  /** The public address of this app, used to build the preview link. Falls back to the address the request came to. */
  readonly appUrl?: string;
  readonly rateLimit: Pick<RateLimitOptions, 'limit' | 'windowMs'>;
}

const BODY_LIMIT = '256kb';

interface Envelope<T> {
  readonly success: boolean;
  readonly data?: T;
  readonly error?: string;
}

const ok = <T,>(data: T): Envelope<T> => ({ success: true, data });
const failure = (error: string): Envelope<never> => ({ success: false, error });

function previewUrlFor(request: Request, appUrl: string | undefined, id: string): string {
  const base = (appUrl ?? `${request.protocol}://${request.get('host')}`).replace(/\/+$/, '');
  return `${base}/?c=${id}`;
}

/** Turns what the body parser throws into the status codes a caller can act on. */
const bodyErrorHandler: ErrorRequestHandler = (error, _request, response, next) => {
  const type = (error as { type?: string }).type;
  if (type === 'entity.too.large') {
    response.status(413).json(failure('body is too large'));
    return;
  }
  if (type === 'entity.parse.failed') {
    response.status(400).json(failure('body is not valid JSON'));
    return;
  }
  next(error);
};

/** The campaign API alone, so the same app serves the real server and the tests. Mount it before any page handlers. */
export function createApiApp(options: ApiOptions): Express {
  const app = express();
  app.disable('x-powered-by');
  // One proxy (the platform's front end) sits in front of the app, so the caller's address is the one it reports.
  app.set('trust proxy', 1);

  const withinLimit = createRateLimiter(options.rateLimit);
  app.use('/api', (request: Request, response: Response, next: NextFunction) => {
    if (withinLimit(request.ip ?? 'unknown')) {
      next();
      return;
    }
    response.status(429).json(failure('too many requests'));
  });

  app.get('/api/health', (_request, response) => {
    response.json(ok({ ingestEnabled: isIngestEnabled(options.ingestToken) }));
  });

  const requireIngestToken = (request: Request, response: Response, next: NextFunction) => {
    const check = checkBearer(request.get('authorization'), options.ingestToken);
    if (check === 'ok') {
      next();
      return;
    }
    if (check === 'disabled') {
      response.status(503).json(failure('sending campaigns is not configured on this server'));
      return;
    }
    response.status(401).json(failure('missing or wrong token'));
  };

  // The token is checked before the body is read, so an unauthorised caller costs almost nothing.
  app.post('/api/campaigns', requireIngestToken, express.json({ limit: BODY_LIMIT }), async (request, response) => {
    const parsed = parseCampaign(request.body);
    if (!parsed.ok) {
      response.status(400).json(failure(parsed.error));
      return;
    }
    try {
      const stored = await options.store.save(parsed.campaign);
      response.status(201).json(ok({ id: stored.id, previewUrl: previewUrlFor(request, options.appUrl, stored.id), createdAt: stored.createdAt }));
    } catch (error) {
      console.error('campaign save failed', error);
      response.status(500).json(failure('could not store the campaign'));
    }
  });

  app.get('/api/campaigns/:id', async (request, response) => {
    const { id } = request.params;
    if (!isCampaignId(id)) {
      response.status(404).json(failure('campaign not found'));
      return;
    }
    try {
      const stored = await options.store.get(id);
      if (stored === null) {
        response.status(404).json(failure('campaign not found'));
        return;
      }
      response.set('Cache-Control', 'no-store');
      response.json(ok({ campaign: stored.campaign, createdAt: stored.createdAt }));
    } catch (error) {
      console.error('campaign read failed', error);
      response.status(500).json(failure('could not read the campaign'));
    }
  });

  app.use('/api', bodyErrorHandler);
  return app;
}
