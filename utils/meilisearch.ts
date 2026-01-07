import memoizee from "memoizee";
import { MeiliSearch } from "meilisearch";

const meiliClient = new MeiliSearch({
  host: process.env.MEILISEARCH_HOST || "http://127.0.0.1:7700",
  apiKey: process.env.MEILISEARCH_API_KEY || "",
});

const searchArticle = async (
  query: string,
  limit: number = 10,
  offset: number = 0
) => {
  try {
    if (!query || query.trim().length === 0 || limit <= 0 || offset < 0) {
      return { results: [], total: 0, nextOffset: null };
    }

    const allArticles = await meiliClient.index("articles").search(query, {
      limit: 10,
      offset: offset,
      attributesToRetrieve: ["id"],
    });

    const results = allArticles.hits as any[];

    return {
      results,
      total: allArticles.estimatedTotalHits,
      nextOffset:
        offset + limit < (allArticles.estimatedTotalHits || 0)
          ? offset + limit
          : null,
    };
  } catch (error) {
    console.error("Search error:", error);
    return { results: [], total: 0, nextOffset: null };
  }
};

export default {
  searchArticle,
};
