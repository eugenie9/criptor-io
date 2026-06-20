"use server";

import sqliteClient from "@/sqlite/client";
import meilisearch from "@/utils/meilisearch";
import market from "@/app/actions/market";
import memoizee from "memoizee";
import { z } from "zod";

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

const getArticlesForSource = async (source: string, lastDate?: number) => {
  return await sqliteClient.getArticlesForSource(source, lastDate);
};

const getPopularArticlesForSource = async (source: string) => {
  return await sqliteClient.getPopularArticlesForSource(source);
};

const getArticles = async () => {
  return await sqliteClient.getArticles();
};

const getArticleWithSourceAndSlug = async (source: string, slug: string) => {
  const parsed = sourceSlugSchema.safeParse({ source, slug });
  if (!parsed.success) {
    return null;
  }
  const { source: s, slug: sl } = parsed.data;

  try {
    // Increase read_count by 1 (await before returning article)
    await sqliteClient.execQuery(
      "UPDATE articles SET read_count = read_count + 1 WHERE source = ? AND slug = ?",
      [s, sl],
    );

    const response = await sqliteClient.getArticleBySourceAndSlug(s, sl);
    if (response) {
      return response;
    }
  } catch (error) {
    return null;
  }
};

const getSitemapForSource = async (source: string) => {
  return await sqliteClient.getSitemapForSource(source);
};

const searchArticles = memoizee(
  async (query: string, limit: number = 10, offset: number = 0) => {
    const parsed = searchArticlesSchema.safeParse({ query, limit, offset });
    if (!parsed.success) {
      return { items: [], total: 0, nextOffset: null };
    }
    const { query: q, limit: l, offset: o } = parsed.data;

    try {
      const { results, total, nextOffset } = await meilisearch.searchArticle(
        q,
        l,
        o,
      );

      const ids = results.map((item) => item.id);
      const articles = await sqliteClient.getArticlesByIds(ids);

      const orderedArticles = ids
        .map((id) => articles.find((article) => article.id === id))
        .filter((article) => article !== undefined);

      return {
        items: orderedArticles,
        total,
        nextOffset,
      };
    } catch (error) {
      return { items: [], total: 0, nextOffset: null };
    }
  },
  {
    promise: true,
    maxAge: 1 * 60 * 1000,
    length: 3,
  },
);

const subscribeToNewsletter = async (email: string) => {
  const parsed = subscribeSchema.safeParse({ email });
  if (!parsed.success) {
    return { success: false, isNewSubscriber: false };
  }
  const { email: validEmail } = parsed.data;

  try {
    // Check if already subscribed
    const existing = await sqliteClient.execQuery(
      "SELECT id FROM newsletter_subscribers WHERE email = ?",
      [validEmail],
    );

    const isNewSubscriber = existing.length === 0;

    if (isNewSubscriber) {
      await sqliteClient.execQuery(
        "INSERT INTO newsletter_subscribers (email) VALUES (?)",
        [validEmail],
      );
    } else {
      await sqliteClient.execQuery(
        "UPDATE newsletter_subscribers SET updated_at = CURRENT_TIMESTAMP WHERE email = ?",
        [validEmail],
      );
    }

    return {
      success: true,
      isNewSubscriber,
    };
  } catch (error) {
    return { success: false, isNewSubscriber: false };
  }
};

const getCryptoPrices = async () => {
  return await market.getCryptoPrices();
};

const getMarketData = async () => {
  return await market.getMarketData();
};

export {
  getArticlesForSource,
  getArticles,
  getArticleWithSourceAndSlug,
  getPopularArticlesForSource,
  getSitemapForSource,
  getCryptoPrices,
  getMarketData,
  searchArticles,
  subscribeToNewsletter,
};
