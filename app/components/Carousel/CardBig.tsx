import { getHowManyTimePassed, getSource } from "@/app/utils";
import LinkWrapper from "../LinkWrapper";

export default async function CarouselCardBig({
  article,
}: {
  article: TArticle;
}) {
  const source = getSource(article.source);

  return (
    <LinkWrapper article={article}>
      <article className="relative overflow-hidden rounded-xl shadow-card dark:shadow-card-dark transition-all duration-300 hover:shadow-card-hover dark:hover:shadow-card-hover-dark h-72 md:h-[496px] flex cursor-pointer group">
        <img
          alt={article.title}
          src={article.thumbnail}
          className="absolute inset-0 h-full w-full object-cover transform transition-transform duration-700 group-hover:scale-105"
        />

        <div className="relative bg-gradient-to-t from-gray-900/80 to-gray-900/20 flex-1 flex items-end">
          <div className="p-4 sm:p-6">
            <div className="bg-crypto-dark/90 text-white w-auto mr-auto uppercase text-sm rounded-br-xl px-4 py-3 flex items-center absolute top-0 left-0 font-medium shadow-md">
              <img 
                src={source.logo} 
                alt={source.name} 
                className="h-5 w-5 object-contain rounded-full bg-white p-0.5" 
              />
              <p className="ml-2 font-medium">{source.name}</p>
            </div>
            <h3 className="mt-0.5 font-heading text-lg xl:text-xl font-bold text-white group-hover:text-crypto-light transition-colors duration-200">
              {article.title}
            </h3>
            <div className="mt-2 flex items-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 text-white/70" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
              <span className="font-medium text-xs text-white/90 ml-1">
                {getHowManyTimePassed(article.date)}
              </span>
            </div>
          </div>
        </div>
      </article>
    </LinkWrapper>
  );
}
