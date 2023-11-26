import { getSource } from "@/app/utils";
import ItemFooter from "@/app/components/ItemFooter";

export default function ArticleCard({ article }: { article: TArticle }) {
  return (
    <div
      className={`border-b border-gray-300 pt-4 pb-2 group h-full flex flex-col`}
    >
      <a href={article.url} target="_blank">
        <img
          src={article.thumbnail || getSource(article.source).img}
          alt={article.title}
          className="rounded object-cover h-64 sm:h-80 w-full max-w-full grayscale-[60%] transition-all duration-500 group-hover:grayscale-0 my-2"
        />
        <p className="text-xl font-bold mb-2">{article.title}</p>
      </a>

      <p className="text-base">{article.content}...</p>
      <ItemFooter item={article} />
    </div>
  );
}
