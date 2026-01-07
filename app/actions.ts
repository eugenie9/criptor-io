"use server";

import mysqlClient from "@/mysql/client";
import meilisearch from "@/utils/meilisearch";
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

const getCryptoPrices = async () => {
  try {
    const data = await getTickers();
    return data;
  } catch (error) {
    return [];
  }
};

const getTickers = memoizee(
  async () => {
    try {
      const data = await fetch(
        'https://api.binance.com/api/v3/ticker/tradingDay?symbols=["BTCUSDT","ETHUSDT","BNBUSDT","XRPUSDT","SOLUSDT"]',
        {
          method: "GET",
          redirect: "follow",
        }
      );
      const prices = await data.json();
      return prices;
    } catch (error) {
      return [];
    }
  },
  { promise: true, maxAge: 1 * 60 * 1000 }
);

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

export {
  getArticlesForSource,
  getArticles,
  getArticleWithSourceAndSlug,
  getPopularArticlesForSource,
  getSitemapForSource,
  getCryptoPrices,
  searchArticles,
};
