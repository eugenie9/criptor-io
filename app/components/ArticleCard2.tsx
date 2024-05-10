import { getSource } from "@/app/utils";
import ItemFooter from "@/app/components/ItemFooter";
import Link from "next/link";

export default function ArticleCard({ article }: { article: TArticle }) {
  return (
    <div className={`py-4 group h-full grid grid-cols-7 gap-6 mb-8`}>
      <div className="col-span-7 md:col-span-3">
        <Link href={`/publisher/${article.source}/${article.slug}`}>
          <img
            src={article.thumbnail || getSource(article.source).logo}
            alt={article.title}
            className="rounded object-cover h-full w-full max-w-full grayscale-[60%] transition-all duration-500 group-hover:grayscale-0"
          />
        </Link>
      </div>
      <div className="col-span-7 md:col-span-4">
        <Link
          href={`/publisher/${article.source}/${article.slug}`}
          className="text-lg font-semibold mb-2"
        >
          {article.title}
        </Link>
        <div className="border-b border-gray-300 my-2" />
        <p className="text-base text-neutral-700">{article.content}...</p>
        <div className="border-b border-gray-300 my-2" />
        <div className="-mt-1">
          <ItemFooter item={article} />
        </div>
      </div>
    </div>
  );
}
