"use client";

import { getArticlesForSource } from "@/app/actions";
import { useState } from "react";
import LoadingCircle from "@/app/components/LoadingCircle";
import LoadMoreButton from "@/app/components/LoadMoreButton";
import ArticleContainer from "@/app/components/ArticleContainer";

export default function AskMore({
  source,
  lastDate,
}: {
  source: string;
  lastDate: number;
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TArticle[]>([]);
  const [offset, setOffset] = useState(lastDate);

  const askData = async () => {
    if (loading) return;
    setLoading(true);
    // @ts-ignore
    const articles: {
      items: TArticle[];
      nextLastDate: number;
    } = await getArticlesForSource(source, offset);
    setData([...data, ...articles.items]);
    setOffset(articles.nextLastDate);
    setLoading(false);
  };

  return (
    <>
      <ArticleContainer data={data} />

      {loading ? <LoadingCircle /> : <></>}

      {offset ? <LoadMoreButton onClick={askData} disabled={loading} /> : <></>}
    </>
  );
}
