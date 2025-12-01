import { getSource } from "@/app/utils";
import ItemFooter from "@/app/components/ItemFooter";
import Link from "next/link";
import Button from "./Button";

export default function ArticleCard({ article }: { article: TArticle }) {
  const source = getSource(article.source);
  
  return (
    <article className="py-6 group h-full grid grid-cols-7 gap-8 mb-8 bg-white dark:bg-crypto-dark rounded-xl shadow-card dark:shadow-card-dark hover:shadow-card-hover dark:hover:shadow-card-hover-dark transition-all duration-300 p-4 sm:p-6 animate-fade-in">
      <div className="col-span-7 md:col-span-3 overflow-hidden rounded-lg">
        <Link href={`/publisher/${article.source}/${article.slug}`} className="block overflow-hidden rounded-lg">
          <img
            src={article.thumbnail || source.logo}
            alt={article.title}
            className="rounded-lg object-cover h-64 w-full max-w-full grayscale-[40%] transition-all duration-500 group-hover:grayscale-0 transform group-hover:scale-105"
          />
        </Link>
      </div>
      <div className="col-span-7 md:col-span-4 flex flex-col">
        <div className="mb-3 flex items-center">
          <img 
            src={source.logo} 
            alt={source.name} 
            className="h-6 w-6 object-contain rounded-full bg-white p-0.5 shadow-sm" 
          />
          <Link 
            href={`/publisher/${article.source}`}
            className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-crypto-light transition-colors duration-200"
          >
            {source.name}
          </Link>
        </div>
        
        <Link
          href={`/publisher/${article.source}/${article.slug}`}
          className="font-heading text-xl md:text-2xl font-bold mb-3 text-gray-800 dark:text-gray-100 hover:text-crypto-light dark:hover:text-crypto-light transition-colors duration-200"
        >
          {article.title}
        </Link>
        
        <div className="border-b border-gray-200 dark:border-gray-700 mb-4" />
        
        <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3 mb-4">
          {article.content}...
        </p>
        
        <div className="mt-auto">
          <div className="flex flex-wrap items-center justify-between">
            <ItemFooter item={article} />
            <Button 
              href={`/publisher/${article.source}/${article.slug}`}
              variant="outline"
              size="sm"
              className="mt-4 md:mt-0"
            >
              Read More
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}

