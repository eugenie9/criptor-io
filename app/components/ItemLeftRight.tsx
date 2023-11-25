import { getSource } from "@/app/utils";
import ItemFooter from "./ItemFooter";

export default function ItemLeftRight({
  item,
  orientation,
}: {
  item: TArticle;
  orientation: string;
}) {
  const floatType =
    orientation == "left" ? "float-left mr-4" : "float-right ml-4";
  return (
    <div className={`border-b border-gray-300 pt-4 pb-2 group`}>
      <a href={item.url} target="_blank">
        <p className="text-xl font-bold mb-2">{item.title}</p>
        {item.thumbnail && (
          <img
            src={item.thumbnail || getSource(item.source).img}
            alt={item.title}
            className={`${floatType} rounded object-contain max-h-full w-2/5 grayscale-[60%] transition-all duration-500 group-hover:grayscale-0`}
          />
        )}
      </a>

      <p className="text-base">{item.content}...</p>

      <ItemFooter item={item} />
    </div>
  );
}
