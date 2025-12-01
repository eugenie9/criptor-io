"use server";

import mongoClient from "@/mongo/client";

const getArticlesForSource = async (source: string, offset: number) => {
  const data = await mongoClient.getArticlesForSource(source, offset);

  // Properly serialize MongoDB objects to plain JavaScript objects
  return {
    items: data.map((item: any) => ({
      _id: item._id.toString(),
      url: item.url,
      title: item.title,
      content: item.content,
      full_content: item.full_content,
      slug: item.slug,
      thumbnail: item.thumbnail,
      date: item.date,
      readCount: item.readCount,
      categories: item.categories,
      source: item.source,
      __v: item.__v,
    })),
    offset: offset + data.length,
  };
};

const getPopularArticlesForSource = async (source: string) => {
  const data = await mongoClient.getPopularArticlesForSource(source);

  // Properly serialize MongoDB objects to plain JavaScript objects
  return data.map((item: any) => ({
    _id: item._id.toString(),
    url: item.url,
    title: item.title,
    content: item.content,
    full_content: item.full_content,
    slug: item.slug,
    thumbnail: item.thumbnail,
    date: item.date,
    readCount: item.readCount,
    categories: item.categories,
    source: item.source,
    __v: item.__v,
  }));
};

const getArticles = async () => {
  const data = await mongoClient.getArticles();

  // Properly serialize MongoDB objects to plain JavaScript objects
  return {
    items: data.items.map((item: any) => ({
      _id: item._id.toString(),
      url: item.url,
      title: item.title,
      content: item.content,
      full_content: item.full_content,
      slug: item.slug,
      thumbnail: item.thumbnail,
      date: item.date,
      readCount: item.readCount,
      categories: item.categories,
      source: item.source,
      __v: item.__v,
    })),
  };
};

const getArticlesWithSourceAndSlug = async (source: string, slug: string) => {
  const data = await mongoClient.getArticlesWithSourceAndSlug(source, slug);

  // Properly serialize MongoDB objects to plain JavaScript objects
  return {
    items: data.items
      .map((item: any) => {
        if (!item) return null;
        return {
          _id: item._id.toString(),
          url: item.url,
          title: item.title,
          content: item.content,
          full_content: item.full_content,
          slug: item.slug,
          thumbnail: item.thumbnail,
          date: item.date,
          readCount: item.readCount,
          categories: item.categories,
          source: item.source,
          __v: item.__v,
        };
      })
      .filter(Boolean),
  };
};

const getCryptoPrices = async () => {
  try {
  const data = await fetch("https://api.binance.com/api/v3/ticker/tradingDay?symbols=[\"BTCUSDT\",\"ETHUSDT\",\"BNBUSDT\",\"XRPUSDT\",\"SOLUSDT\"]", {
    method: "GET",
    redirect: "follow"
  } );
    const prices = await data.json();
    return prices;
  } catch (error) {
    return [];
  }
};

export {
  getArticlesForSource,
  getArticles,
  getArticlesWithSourceAndSlug,
  getPopularArticlesForSource,
  getCryptoPrices,
};
