"use client";

import { getArticles } from "@/app/actions";
import { useState } from "react";
import ItemVertical from "@/app/components/ItemVertical";

export default function AskMore({
  lastEvaluatedKey,
}: {
  lastEvaluatedKey: TLastEvaluatedKeyForAllSources;
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TArticle[]>([]);
  const [lastEvaluated, setLastEvaluated] = useState(lastEvaluatedKey);
  const [lastItemCount, setLastItemCount] = useState(9);
  const [lastRequestedPubDate, setLastRequestedPubDate] = useState(
    lastEvaluated?.pubDate
  );

  const askData = async () => {
    if (loading) return;
    setLoading(true);
    let articles: any = [];

    let pubDate = lastRequestedPubDate;

    if (lastItemCount !== 9 || !lastEvaluated) {
      pubDate = pubDate.replace("News ", "");
      pubDate = new Date(new Date(pubDate).getTime() - 60 * 60 * 24 * 1000)
        .toISOString()
        .split("T")[0];
      // @ts-ignore
      articles = await getArticles(`News ${pubDate}`);
    } else {
      // @ts-ignore
      articles = await getArticles(lastEvaluated.pubDate, lastEvaluated);
    }

    setData([...data, ...articles.items]);
    setLastEvaluated(articles.lastEvaluatedKey);
    setLastItemCount(articles.items.length);
    if (pubDate !== lastRequestedPubDate) {
      setLastRequestedPubDate(pubDate);
    } else if (articles.lastEvaluatedKey) {
      setLastRequestedPubDate(articles.lastEvaluatedKey.pubDate);
    }
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
                <ItemVertical item={item} />
              </div>
            );
          })}
        </div>
      ) : (
        <></>
      )}

      {loading ? (
        <div className="flex justify-center pb-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
        </div>
      ) : (
        <></>
      )}

      <div className="flex justify-center mb-4">
        <button
          onClick={askData}
          disabled={loading}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <span>Load More</span>
        </button>
      </div>
    </>
  );
}
