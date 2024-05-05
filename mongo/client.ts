import memoizee from "memoizee";
import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_CONNECTION_STRING || "");

import News from "./models/news";

const getArticlesForSource = async (source: string, offset: number) => {
  const data = await News.find({ source })
    .sort({ date: -1 })
    .limit(12)
    .skip(offset);

  return data;
};

const memoizedGetArticlesForSource = memoizee(getArticlesForSource, {
  promise: true,
  maxAge: 1000 * 60 * 2,
});

const getArticles = async () => {
  const data = await News.find().sort({ date: -1 }).limit(20);

  return {
    items: data,
  };
};

const memoizedGetArticles = memoizee(getArticles, {
  promise: true,
  maxAge: 1000 * 60 * 2,
});

const getArticlesWithSourceAndSlug = async (source: string, slug: string) => {
  const data = await News.findOne({ source, slug });

  return {
    items: [data],
  };
};

const memoizedGetArticlesWithSourceAndSlug = memoizee(
  getArticlesWithSourceAndSlug,
  {
    promise: true,
    maxAge: 1000 * 60 * 2,
  }
);

const mongoClient = {
  getArticles: memoizedGetArticles,
  getArticlesForSource: memoizedGetArticlesForSource,
  getArticlesWithSourceAndSlug: memoizedGetArticlesWithSourceAndSlug,
};

export default mongoClient;
