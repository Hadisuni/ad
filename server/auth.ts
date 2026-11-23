import { createHash, timingSafeEqual } from 'node:crypto';

const BEARER_PREFIX = 'Bearer ';
/** A shorter secret is too easy to guess, so it is treated as not configured. */
export const MIN_TOKEN_LENGTH = 24;

const digest = (value: string) => createHash('sha256').update(value).digest();

export type TokenCheck = 'ok' | 'disabled' | 'denied';

export function isIngestEnabled(configuredToken: string | undefined): boolean {
  return configuredToken !== undefined && configuredToken.length >= MIN_TOKEN_LENGTH;
}

/**
 * Checks an Authorization header against the configured ingest token. 'disabled' means no usable token is set, so
 * sending is off for everyone; 'denied' means a token is set and this request did not present it.
 */
export function checkBearer(authorization: string | undefined, configuredToken: string | undefined): TokenCheck {
  if (configuredToken === undefined || !isIngestEnabled(configuredToken)) return 'disabled';
  if (authorization === undefined || !authorization.startsWith(BEARER_PREFIX)) return 'denied';
  const presented = authorization.slice(BEARER_PREFIX.length);
  // Both sides are hashed first so the comparison takes the same time whatever the lengths are.
  return timingSafeEqual(digest(presented), digest(configuredToken)) ? 'ok' : 'denied';
}
