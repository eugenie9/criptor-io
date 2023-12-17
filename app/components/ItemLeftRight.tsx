import { getSource } from "@/app/utils";
import ItemFooter from "@/app/components/ItemFooter";
import Link from "next/link";

const LinkWrapper = ({
  article,
  orientation,
}: {
  article: TArticle;
  orientation: string;
}) => {
  const floatType =
    orientation == "left" ? "float-left mr-4" : "float-right ml-4";

  if (article.slug) {
    return (
      <Link href={`/publisher/${article.source}/${article.slug}`}>
        <p className="text-xl font-bold mb-2">{article.title}</p>
        <img
          src={article.thumbnail || getSource(article.source).logo}
          alt={article.title}
          className={`${floatType} rounded object-contain max-h-full w-2/5 grayscale-[60%] transition-all duration-500 group-hover:grayscale-0`}
        />
      </Link>
    );
  } else {
    return (
      <a href={article.url} target="_blank">
        <p className="text-xl font-bold mb-2">{article.title}</p>
        <img
          src={article.thumbnail || getSource(article.source).logo}
          alt={article.title}
          className={`${floatType} rounded object-contain max-h-full w-2/5 grayscale-[60%] transition-all duration-500 group-hover:grayscale-0`}
        />
      </a>
    );
  }
};

export default function ItemLeftRight({
  item,
  orientation,
}: {
  item: TArticle;
  orientation: string;
}) {
  return (
    <div className={`border-b border-gray-300 pt-4 pb-2 group`}>
      <LinkWrapper article={item} orientation={orientation} />
      <p className="text-base text-neutral-700">{item.content}...</p>
      <ItemFooter item={item} />
    </div>
  );
}
