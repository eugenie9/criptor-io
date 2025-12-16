import memoizee from "memoizee";
import d1Query from "./d1";

const parseArticle = (item: any) => ({
  id: item.id,
  title: item.title,
  content: item.content,
  full_content: item.full_content,
  slug: item.slug,
  thumbnail: item.thumbnail,
  date: item.date,
  readCount: item.read_count,
  categories: item.categories,
  source: item.source,
});

// Use keyset pagination to optimize D1 query and reduce rows read.
// Pass the lastDate (date of the last article from the previous page) instead of offset.
const getArticlesForSource = async (source: string, lastDate?: number) => {
  let query: string;
  let params: any[];

  if (lastDate) {
    // For subsequent pages, fetch articles older than the given date
    query =
      "SELECT * FROM articles WHERE source = ? AND date < ? ORDER BY date DESC LIMIT 12";
    params = [source, lastDate];
  } else {
    // For the first page, fetch the most recent articles
    query =
      "SELECT * FROM articles WHERE source = ? ORDER BY date DESC LIMIT 12";
    params = [source];
  }

  const data = await d1Query(query, params);

  return {
    items: data.map(parseArticle),
    // For the client: nextLastDate can be used as the 'lastDate' for the next page,
    // or null if there are no more articles
    nextLastDate: data.length > 0 ? data[data.length - 1].date : null,
  };
};

const memoizedGetArticlesForSource = memoizee(getArticlesForSource, {
  promise: true,
  maxAge: 1000 * 60 * 2,
});

const getPopularArticlesForSource = async (source: string) => {
  const data = await d1Query(
    "SELECT * FROM articles WHERE source = ? AND date > ? ORDER BY read_count DESC LIMIT 5",
    [source, Date.now() - 1000 * 60 * 60 * 24 * 7]
  );

  return data.map(parseArticle);
};

const memoizedGetPopularArticlesForSource = memoizee(
  getPopularArticlesForSource,
  {
    promise: true,
    maxAge: 1000 * 60 * 2,
  }
);

const getArticles = async () => {
  const data = await d1Query(
    "SELECT * FROM articles ORDER BY date DESC LIMIT 20"
  );

  return {
    items: data.map(parseArticle),
  };
};

const memoizedGetArticles = memoizee(getArticles, {
  promise: true,
  maxAge: 1000 * 60 * 2,
});

const getArticleBySourceAndSlug = async (source: string, slug: string) => {
  const data = await d1Query(
    "SELECT * FROM articles WHERE source = ? AND slug = ?",
    [source, slug]
  );

  if (data.length > 0) {
    // Increase read_count by 1
    d1Query(
      "UPDATE articles SET read_count = read_count + 1 WHERE source = ? AND slug = ?",
      [source, slug]
    );
    return parseArticle(data[0]);
  } else {
    return null;
  }
};

const memoizedGetArticleBySourceAndSlug = memoizee(getArticleBySourceAndSlug, {
  promise: true,
  maxAge: 1000 * 60 * 2,
});

const mongoClient = {
  getArticles: memoizedGetArticles,
  getArticlesForSource: memoizedGetArticlesForSource,
  getArticleBySourceAndSlug: memoizedGetArticleBySourceAndSlug,
  getPopularArticlesForSource: memoizedGetPopularArticlesForSource,
};

export default mongoClient;
