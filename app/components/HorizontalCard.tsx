import { getSource } from "../utils";
import LinkWrapper from "./LinkWrapper";

export default async function HorizontalCard({
  article,
}: {
  article: TArticle;
}) {
  const source = getSource(article.source);

  return (
    <div className="grid grid-cols-3 bg-[#FAFAFA] group h-full">
      <div className="col-span-2 flex flex-col p-6 sm:p-8 space-y-4">
        <LinkWrapper article={article}>
          <p className="font-semibold text-base xl:text-lg">{article.title}</p>
        </LinkWrapper>
        <p>{article.content?.slice(0, 150)}...</p>
        <div className="flex flex-1 items-end">
          <div className="flex items-center">
            <img src={source.logo} alt={source.name} className="h-8" />
            <p className="ml-2">{source?.name}</p>
          </div>
        </div>
      </div>
      <LinkWrapper article={article}>
        <img
          alt={article.title}
          src={article.thumbnail}
          className="h-full w-full object-cover col-span-1 grayscale-[60%] transition-all duration-500 group-hover:grayscale-0"
        />
      </LinkWrapper>
    </div>
  );
}
