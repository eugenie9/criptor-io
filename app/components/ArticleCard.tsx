import { getSource } from "@/app/utils";
import ItemFooter from "@/app/components/ItemFooter";
import Link from "next/link";

const LinkWrapper = ({ article }: { article: TArticle }) => {
  if (article.slug) {
    return (
      <Link href={`/publisher/${article.source}/${article.slug}`} className="group">
        <div className="overflow-hidden rounded-lg shadow-card dark:shadow-card-dark transition-all duration-300 hover:shadow-card-hover dark:hover:shadow-card-hover-dark">
          <img
            src={article.thumbnail || getSource(article.source).logo}
            alt={article.title}
            className="rounded-t-lg object-cover h-64 sm:h-80 w-full max-w-full grayscale-[40%] transition-all duration-500 group-hover:grayscale-0 transform group-hover:scale-105"
          />
        </div>
        <h2 className="font-heading text-xl md:text-2xl font-bold mt-4 mb-2 text-gray-800 dark:text-gray-100 group-hover:text-crypto-light transition-colors duration-200">
          {article.title}
        </h2>
      </Link>
    );
  } else {
    return (
      <a href={article.url} target="_blank" className="group">
        <div className="overflow-hidden rounded-lg shadow-card dark:shadow-card-dark transition-all duration-300 hover:shadow-card-hover dark:hover:shadow-card-hover-dark">
          <img
            src={article.thumbnail || getSource(article.source).logo}
            alt={article.title}
            className="rounded-t-lg object-cover h-64 sm:h-80 w-full max-w-full grayscale-[40%] transition-all duration-500 group-hover:grayscale-0 transform group-hover:scale-105"
          />
        </div>
        <h2 className="font-heading text-xl md:text-2xl font-bold mt-4 mb-2 text-gray-800 dark:text-gray-100 group-hover:text-crypto-light transition-colors duration-200">
          {article.title}
        </h2>
      </a>
    );
  }
};

export default function ArticleCard({ article }: { article: TArticle }) {
  return (
    <article className="border-b border-gray-200 dark:border-gray-700 pt-6 pb-6 group h-full flex flex-col animate-fade-in">
      <LinkWrapper article={article} />
      <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">
        {article.content}...
      </p>
      <div className="mt-auto pt-4">
        <ItemFooter item={article} />
      </div>
    </article>
  );
}
