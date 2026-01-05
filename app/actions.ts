"use server";

import mysqlClient from "@/mysql/client";

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
  return await mysqlClient.getArticleBySourceAndSlug(source, slug);
};

const getSitemapForSource = async (source: string) => {
  return await mysqlClient.getSitemapForSource(source);
};

const getCryptoPrices = async () => {
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
};

export {
  getArticlesForSource,
  getArticles,
  getArticleWithSourceAndSlug,
  getPopularArticlesForSource,
  getSitemapForSource,
  getCryptoPrices,
};
