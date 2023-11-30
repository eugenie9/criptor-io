import ArticleCard from "./ArticleCard";

export default function ArticleContainer({ data }: { data: any }) {
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
    </>
  );
}
