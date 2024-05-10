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

const getPopularArticlesForSource = async (source: string) => {
  const data = await News.find({
    source,
    date: { $gt: Date.now() - 1000 * 60 * 60 * 24 * 7 },
  })
    .sort({ readCount: -1 })
    .limit(5);

  return data;
};

const memoizedGetPopularArticlesForSource = memoizee(
  getPopularArticlesForSource,
  {
    promise: true,
    maxAge: 1000 * 60 * 2,
  }
);

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
  getPopularArticlesForSource: memoizedGetPopularArticlesForSource,
};

export default mongoClient;
