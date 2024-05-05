"use server";

import mongoClient from "@/mongo/client";

const getArticlesForSource = async (source: string, offset: number) => {
  const data = await mongoClient.getArticlesForSource(source, offset);

  return {
    items: data,
    offset: offset + data.length,
  };
};

const getArticles = async () => {
  const data = await mongoClient.getArticles();

  return data;
};

const getArticlesWithSourceAndSlug = async (source: string, slug: string) => {
  const data = await mongoClient.getArticlesWithSourceAndSlug(source, slug);

  return data;
};

export { getArticlesForSource, getArticles, getArticlesWithSourceAndSlug };
