"use server";

import mysqlClient from "@/mysql/client";
import meilisearch from "@/utils/meilisearch";
import market from "@/app/actions/market";
import memoizee from "memoizee";

const getArticlesForSource = async (source: string, lastDate?: number) => {
  return await mysqlClient.getArticlesForSource(source, lastDate);
};

const getPopularArticlesForSource = async (source: string) => {
  return await mysqlClient.getPopularArticlesForSource(source);
};

const getArticles = async () => {
  return await mysqlClient.getArticles();
};

const getArticleWithSourceAndSlug = async (source: string, slug: string) => {
  try {
    const response = await mysqlClient.getArticleBySourceAndSlug(source, slug);
    if (response) {
      // Increase read_count by 1
      mysqlClient.execQuery(
        "UPDATE articles SET read_count = read_count + 1 WHERE source = ? AND slug = ?",
        [source, slug]
      );

      return response;
    }
  } catch (error) {
    return null;
  }
};

const getSitemapForSource = async (source: string) => {
  return await mysqlClient.getSitemapForSource(source);
};

const searchArticles = memoizee(
  async (query: string, limit: number = 10, offset: number = 0) => {
    try {
      const { results, total, nextOffset } = await meilisearch.searchArticle(
        query,
        limit,
        offset
      );

      const ids = results.map((item) => item.id);
      const articles = await mysqlClient.getArticlesByIds(ids);

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
  }
);

const subscribeToNewsletter = async (email: string) => {
  try {
    const result: any = await mysqlClient.execQuery(
      "INSERT INTO newsletter_subscribers (email) VALUES (?) ON DUPLICATE KEY UPDATE updated_at = NOW()",
      [email]
    );
    // If affectedRows === 1, it's a new subscription. If === 2, it was already subscribed
    return {
      success: true,
      isNewSubscriber: result?.affectedRows === 1,
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
