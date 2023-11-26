"use client";

import { getArticlesForSource } from "@/app/actions";
import { useState } from "react";
import ArticleCard from "@/app/components/ArticleCard";

export default function AskMore({
  source,
  start,
}: {
  source: string;
  start: string;
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TArticle[]>([]);
  const [lastEvaluatedKey, setLastEvaluatedKey] = useState(start);

  const askData = async () => {
    if (loading) return;
    setLoading(true);
    // @ts-ignore
    const articles: {
      items: TArticle[];
      lastEvaluatedKey: string;
    } = await getArticlesForSource(source, Number(lastEvaluatedKey));
    setData([...data, ...articles.items]);
    setLastEvaluatedKey(articles.lastEvaluatedKey);
    setLoading(false);
  };

  return (
    <>
      {data.length ? (
        <div className="grid grid-cols-12 gap-6 gap-y-2 pb-4">
          {data.map((item: TArticle) => {
            return (
              <div
                className={`col-span-12 md:col-span-6 lg:col-span-4`}
                key={item.url}
              >
                <ArticleCard article={item} />
              </div>
            );
          })}
        </div>
      ) : (
        <></>
      )}

      {loading ? (
        <div className="flex justify-center pb-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <></>
      )}

      {lastEvaluatedKey ? (
        <div className="flex justify-center mb-4">
          <button
            onClick={askData}
            disabled={loading}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <span>Load More</span>
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
