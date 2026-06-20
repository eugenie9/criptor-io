import { describe, it, expect, beforeEach } from "vitest";
import { z } from "zod";

// ── Zod schema tests (mirrors schemas from app/actions.ts) ──────────────

const searchArticlesSchema = z.object({
  query: z.string().min(1).max(200),
  limit: z.number().int().min(1).max(100).default(10),
  offset: z.number().int().min(0).max(10000).default(0),
});

const subscribeSchema = z.object({
  email: z.string().email().max(254),
});

const sourceSlugSchema = z.object({
  source: z.string().min(1).max(100),
  slug: z.string().min(1).max(200),
});

describe("searchArticlesSchema", () => {
  it("accepts valid search params", () => {
    const result = searchArticlesSchema.safeParse({
      query: "bitcoin",
      limit: 20,
      offset: 0,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.query).toBe("bitcoin");
      expect(result.data.limit).toBe(20);
    }
  });

  it("applies default values", () => {
    const result = searchArticlesSchema.safeParse({ query: "ethereum" });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.limit).toBe(10);
      expect(result.data.offset).toBe(0);
    }
  });

  it("rejects empty query", () => {
    const result = searchArticlesSchema.safeParse({ query: "" });
    expect(result.success).toBe(false);
  });

  it("rejects query exceeding max length", () => {
    const result = searchArticlesSchema.safeParse({
      query: "a".repeat(201),
    });
    expect(result.success).toBe(false);
  });

  it("rejects negative limit", () => {
    const result = searchArticlesSchema.safeParse({
      query: "bitcoin",
      limit: -1,
    });
    expect(result.success).toBe(false);
  });

  it("rejects limit exceeding max", () => {
    const result = searchArticlesSchema.safeParse({
      query: "bitcoin",
      limit: 101,
    });
    expect(result.success).toBe(false);
  });

  it("rejects negative offset", () => {
    const result = searchArticlesSchema.safeParse({
      query: "bitcoin",
      offset: -1,
    });
    expect(result.success).toBe(false);
  });
});

describe("subscribeSchema", () => {
  it("accepts valid email", () => {
    const result = subscribeSchema.safeParse({
      email: "user@example.com",
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid email format", () => {
    const result = subscribeSchema.safeParse({ email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects empty email", () => {
    const result = subscribeSchema.safeParse({ email: "" });
    expect(result.success).toBe(false);
  });

  it("rejects email exceeding max length", () => {
    const result = subscribeSchema.safeParse({
      email: "a@b.c" + "x".repeat(250),
    });
    expect(result.success).toBe(false);
  });

  it("rejects missing email", () => {
    const result = subscribeSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});

describe("sourceSlugSchema", () => {
  it("accepts valid source and slug", () => {
    const result = sourceSlugSchema.safeParse({
      source: "beincrypto",
      slug: "bitcoin-price-surge-2024",
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty source", () => {
    const result = sourceSlugSchema.safeParse({
      source: "",
      slug: "valid-slug",
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty slug", () => {
    const result = sourceSlugSchema.safeParse({
      source: "beincrypto",
      slug: "",
    });
    expect(result.success).toBe(false);
  });
});

// ── Rate limiter tests ─────────────────────────────────────────────────

function createRateLimiter() {
  const store = new Map<string, number[]>();
  const WINDOW = 60_000; // 1 minute
  const MAX = 3;

  return {
    checkRateLimit(key: string): boolean {
      const now = Date.now();
      const timestamps = store.get(key) || [];
      const recent = timestamps.filter((t) => now - t < WINDOW);

      if (recent.length >= MAX) {
        store.set(key, recent);
        return false;
      }

      recent.push(now);
      store.set(key, recent);
      return true;
    },
    getStore() {
      return store;
    },
  };
}

describe("checkRateLimit", () => {
  let rateLimiter: ReturnType<typeof createRateLimiter>;

  beforeEach(() => {
    rateLimiter = createRateLimiter();
  });

  it("allows requests within limit", () => {
    expect(rateLimiter.checkRateLimit("test-key")).toBe(true);
    expect(rateLimiter.checkRateLimit("test-key")).toBe(true);
    expect(rateLimiter.checkRateLimit("test-key")).toBe(true);
  });

  it("blocks requests exceeding limit", () => {
    rateLimiter.checkRateLimit("test-key");
    rateLimiter.checkRateLimit("test-key");
    rateLimiter.checkRateLimit("test-key");
    expect(rateLimiter.checkRateLimit("test-key")).toBe(false);
  });

  it("tracks different keys independently", () => {
    rateLimiter.checkRateLimit("key-a");
    rateLimiter.checkRateLimit("key-a");
    rateLimiter.checkRateLimit("key-a");
    // key-b should still be allowed
    expect(rateLimiter.checkRateLimit("key-b")).toBe(true);
  });
});
