"use client";

import { getArticles } from "@/app/actions";
import { useState } from "react";
import LoadingCircle from "./LoadingCircle";
import LoadMoreButton from "@/app/components/LoadMoreButton";
import ArticleContainer from "./ArticleContainer";

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
      <ArticleContainer data={data} />

      {loading ? <LoadingCircle /> : <></>}

      <LoadMoreButton onClick={askData} disabled={loading} />
    </>
  );
}
