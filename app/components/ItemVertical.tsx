import { getSource } from "@/app/utils";
import ItemFooter from "@/app/components/ItemFooter";

export default function ItemVertical({ item }: { item: TArticle }) {
  return (
    <div
      className={`border-b border-gray-300 pt-4 pb-2 group h-full flex flex-col`}
    >
      <a href={item.url} target="_blank">
        <img
          src={item.thumbnail || getSource(item.source).img}
          alt={item.title}
          className="rounded object-contain w-full max-w-full grayscale-[60%] transition-all duration-500 group-hover:grayscale-0 my-2"
        />
        <p className="text-xl font-bold mb-2">{item.title}</p>
      </a>

      <p className="text-base">{item.content}...</p>
      <ItemFooter item={item} />
    </div>
  );
}
