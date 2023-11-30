"use client";

import { getArticlesForSource } from "@/app/actions";
import { useState } from "react";
import LoadingCircle from "@/app/components/LoadingCircle";
import LoadMoreButton from "@/app/components/LoadMoreButton";
import ArticleContainer from "@/app/components/ArticleContainer";

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
      <ArticleContainer data={data} />

      {loading ? <LoadingCircle /> : <></>}

      {lastEvaluatedKey ? (
        <LoadMoreButton onClick={askData} disabled={loading} />
      ) : (
        <></>
      )}
    </>
  );
}
