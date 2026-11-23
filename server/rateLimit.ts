export interface RateLimitOptions {
  /** How many requests one caller may make in a window. */
  readonly limit: number;
  readonly windowMs: number;
  /** Injected so a test can move the clock. */
  readonly now?: () => number;
}

interface Window {
  readonly startedAt: number;
  readonly count: number;
}

/** A fixed-window counter per caller: returns true while the caller is within the limit, false once it is over. */
export function createRateLimiter({ limit, windowMs, now = Date.now }: RateLimitOptions): (key: string) => boolean {
  let windows = new Map<string, Window>();

  return (key) => {
    const current = now();
    // Windows that ended are dropped now and then so a stream of one-off callers cannot grow the map without end.
    if (windows.size > 10_000) {
      windows = new Map([...windows].filter(([, value]) => current - value.startedAt < windowMs));
    }
    const existing = windows.get(key);
    const live = existing && current - existing.startedAt < windowMs ? existing : { startedAt: current, count: 0 };
    const next = { startedAt: live.startedAt, count: live.count + 1 };
    windows.set(key, next);
    return next.count <= limit;
  };
}
