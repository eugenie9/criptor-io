"use server";

import cloudflareClient from "@/cloudflare/client";

const getArticlesForSource = async (source: string, lastDate?: number) => {
  return await cloudflareClient.getArticlesForSource(source, lastDate);
};

const getPopularArticlesForSource = async (source: string) => {
  return await cloudflareClient.getPopularArticlesForSource(source);
};

const getArticles = async () => {
  return await cloudflareClient.getArticles();
};

const getArticleWithSourceAndSlug = async (source: string, slug: string) => {
  return await cloudflareClient.getArticleBySourceAndSlug(source, slug);
};

const getSitemapForSource = async (source: string) => {
  return await cloudflareClient.getSitemapForSource(source);
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
