import { getSource } from "@/app/utils";
import ItemFooter from "@/app/components/ItemFooter";
import Link from "next/link";

const LinkWrapper = ({ article }: { article: TArticle }) => {
  if (article.slug) {
    return (
      <Link href={`/publisher/${article.source}/${article.slug}`}>
        <img
          src={article.thumbnail || getSource(article.source).logo}
          alt={article.title}
          className="rounded object-contain w-full max-w-full grayscale-[60%] transition-all duration-500 group-hover:grayscale-0 my-2"
        />
        <p className="text-xl font-bold mb-2">{article.title}</p>
      </Link>
    );
  } else {
    return (
      <a href={article.url} target="_blank">
        <img
          src={article.thumbnail || getSource(article.source).logo}
          alt={article.title}
          className="rounded object-contain w-full max-w-full grayscale-[60%] transition-all duration-500 group-hover:grayscale-0 my-2"
        />
        <p className="text-xl font-bold mb-2">{article.title}</p>
      </a>
    );
  }
};

export default function ItemVertical({ item }: { item: TArticle }) {
  return (
    <div
      className={`border-b border-gray-300 pt-4 pb-2 group h-full flex flex-col`}
    >
      <LinkWrapper article={item} />
      <p className="text-base text-neutral-700">{item.content}...</p>
      <ItemFooter item={item} />
    </div>
  );
}
