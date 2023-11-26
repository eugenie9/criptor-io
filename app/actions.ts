"use server";

import dynamodb from "@/dynamodb";

export const revalidate = 60;

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

export { getArticlesForSource, getArticles };
