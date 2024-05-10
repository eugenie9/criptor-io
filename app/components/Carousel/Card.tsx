import { getHowManyTimePassed, getSource } from "@/app/utils";
import LinkWrapper from "../LinkWrapper";

export default async function CarouselCard({ article }: { article: TArticle }) {
  const source = getSource(article.source);

  return (
    <LinkWrapper article={article}>
      <article className="relative overflow-hidden rounded-lg shadow transition hover:shadow-lg h-[244px] flex">
        <img
          alt={article.title}
          src={article.thumbnail}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="relative bg-gradient-to-t from-gray-900/70 to-gray-900/30 flex-1 flex items-end">
          <div className="p-4 sm:px-6 flex flex-col">
            <div className="bg-gradient-to-r from-[#172132]/100 to-[#172132]/80 text-neutral-200 w-auto mr-auto uppercase text-sm rounded-tl-lg rounded-br-3xl px-4 py-3 flex items-center absolute top-0 left-0 font-medium">
              <img src={source.logo} alt={source.name} className="h-5" />
              <p className="ml-2">{source.name}</p>
            </div>

            <h3 className="mt-0.5 text-base lg:text-lg text-white">
              {article.title}
            </h3>

            <span className="font-medium text-sm text-white/90 mt-1">
              {getHowManyTimePassed(article.date)}
            </span>
          </div>
        </div>
      </article>
    </LinkWrapper>
  );
}
