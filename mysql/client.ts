import memoizee from "memoizee";
import mysql2 from "mysql2/promise";

const MYSQL_HOST = process.env.MYSQL_HOST || "";
const MYSQL_USER = process.env.MYSQL_USER || "";
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || "";
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || "";
const MYSQL_PORT = process.env.MYSQL_PORT || "3306";

const pool = mysql2.createPool({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  port: parseInt(MYSQL_PORT),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const execQuery = async (sql: string, params: any[] = []) => {
  try {
    const [rows] = (await pool.execute(sql, params)) as [any[], any];

    return rows;
  } catch (error) {
    return [];
  }
};

const isJSON = (str: string) => {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
};

const safeJSONParse = (data: string, defaultValue: any) => {
  try {
    if (!isJSON(data) && data) return data;
    return JSON.parse(data);
  } catch {
    return defaultValue;
  }
};

const parseArticle = (item: any): TArticle => ({
  id: item.id,
  title: item.title,
  content: item.content,
  full_content: item.full_content,
  slug: item.slug,
  thumbnail: item.thumbnail,
  date: item.date,
  readCount: item.read_count,
  source: item.source,
  url: item.original_url,
  keywords: safeJSONParse(item.keywords || "[]", []),
  summary: item.summary,
  categories: safeJSONParse(item.categories || "[]", []),
});

// Use keyset pagination to optimize query and reduce rows read.
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

  const data = await execQuery(query, params);

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
  length: 2,
});

const getPopularArticlesForSource = async (source: string) => {
  const data = await execQuery(
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
    length: 1,
  }
);

const getArticles = async () => {
  const data = await execQuery(
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
  const [article] = await execQuery(
    `SELECT * FROM articles a WHERE a.source = ? AND a.slug = ?`,
    [source, slug]
  );

  if (article) {
    const attributes = await execQuery(
      `SELECT attribute_name, value FROM article_attributes aa WHERE aa.article_id = ?`,
      [article.id]
    );

    attributes.forEach((attr) => {
      article[attr.attribute_name] = attr.value;
    });

    return parseArticle(article);
  } else {
    return null;
  }
};

const memoizedGetArticleBySourceAndSlug = memoizee(getArticleBySourceAndSlug, {
  promise: true,
  maxAge: 1000 * 60 * 2,
  length: 2,
});

const getSitemapForSource = async (source: string) => {
  const data = await execQuery(
    "SELECT slug, date FROM articles WHERE source = ? ORDER BY date DESC LIMIT 100",
    [source]
  );
  return data;
};

const memoizedGetSitemapForSource = memoizee(getSitemapForSource, {
  promise: true,
  maxAge: 1000 * 60 * 60,
  length: 1,
});

const getArticlesByIds = async (ids: string[]) => {
  if (ids.length === 0) {
    return [];
  }
  const placeholders = ids.map(() => "?").join(",");
  const query = `SELECT id, title, content, slug, thumbnail, source FROM articles WHERE id IN (${placeholders})`;
  const data = await execQuery(query, ids);
  return data.map(parseArticle);
};

const memoizedGetArticlesByIds = memoizee(getArticlesByIds, {
  promise: true,
  maxAge: 1000 * 60 * 2,
  length: 1,
});

export default {
  execQuery,
  getArticles: memoizedGetArticles,
  getArticlesForSource: memoizedGetArticlesForSource,
  getArticleBySourceAndSlug: memoizedGetArticleBySourceAndSlug,
  getPopularArticlesForSource: memoizedGetPopularArticlesForSource,
  getSitemapForSource: memoizedGetSitemapForSource,
  getArticlesByIds: memoizedGetArticlesByIds,
};
