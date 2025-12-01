import Link from "next/link";
import { getSource } from "../utils";
import LinkWrapper from "./LinkWrapper";

export default async function HorizontalCard({
  article,
}: {
  article: TArticle;
}) {
  const source = getSource(article.source);

  return (
    <article className="grid grid-cols-3 bg-white dark:bg-crypto-dark border border-gray-100 dark:border-gray-800 rounded-lg shadow-card dark:shadow-card-dark group h-full hover:shadow-card-hover dark:hover:shadow-card-hover-dark transition-all duration-300 overflow-hidden animate-fade-in">
      <div className="col-span-2 flex flex-col p-6 sm:p-8 space-y-4">
        <LinkWrapper article={article}>
          <h2 className="font-heading font-semibold text-lg xl:text-xl text-gray-800 dark:text-gray-100 group-hover:text-crypto-light transition-colors duration-200">
            {article.title}
          </h2>
        </LinkWrapper>
        <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed line-clamp-3">
          {article.content?.slice(0, 150)}...
        </p>
        <div className="flex flex-1 items-end mt-4">
          <Link href={`/publisher/${article.source}`} className="group/source">
            <div className="flex items-center">
              <img
                src={source.logo}
                alt={source.name}
                className="h-8 w-8 object-contain rounded-full bg-white p-1 shadow-sm"
              />
              <p className="ml-2 font-medium text-gray-700 dark:text-gray-300 group-hover/source:text-crypto-light transition-colors duration-200">
                {source?.name}
              </p>
            </div>
          </Link>
        </div>
      </div>
      <div className="col-span-1 overflow-hidden">
        <LinkWrapper article={article}>
          <img
            alt={article.title}
            src={article.thumbnail}
            className="h-full w-full object-cover grayscale-[40%] transition-all duration-500 group-hover:grayscale-0 transform group-hover:scale-105"
          />
        </LinkWrapper>
      </div>
    </article>
  );
}
