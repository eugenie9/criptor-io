"use server";

import dynamodb from "@/dynamodb";

const getArticlesForSource = async (source: string, start: number) => {
  const data = await dynamodb.getArticlesForSource(source, start);

  return data;
};

const getArticles = async (
  pubDate: string,
  lastEvaluated?: TLastEvaluatedKeyForAllSources
) => {
  const data = await dynamodb.getArticles(pubDate, lastEvaluated);

  return data;
};

const getArticlesWithSourceAndSlug = async (source: string, slug: string) => {
  const data = await dynamodb.getArticlesWithSourceAndSlug(source, slug);

  return data;
};

export { getArticlesForSource, getArticles, getArticlesWithSourceAndSlug };
