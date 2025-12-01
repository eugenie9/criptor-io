import Link from "next/link";
import { getHowManyTimePassed, getSource } from "@/app/utils";
import Image from "next/image";
import HoverCard from "./HoverCard";

export default function ItemFooter({ item }: { item: TArticle }) {
  const source = getSource(item.source);
  const timeAgo = getHowManyTimePassed(item.date);

  return (
    <div className="flex items-center justify-between mt-2 flex-1">
      <Link
        href={`/publisher/${item.source}`}
        prefetch={false}
        className="group/source"
      >
        <div className="flex items-center">
          <div className="relative h-8 w-8 overflow-hidden rounded-full border border-gray-200 dark:border-gray-700 shadow-sm">
            <Image
              src={source.logo}
              alt={item.title}
              width={32}
              height={32}
              className="object-cover transition-transform duration-300 group-hover/source:scale-110"
            />
          </div>
          <span className="ml-2 font-medium text-gray-700 dark:text-gray-300 text-sm group-hover/source:text-crypto-light transition-colors duration-200">
            {source.name}
          </span>
        </div>
      </Link>

      <HoverCard
        content={
          <div className="text-xs">
            <p>Published: {new Date(item.date).toLocaleString()}</p>
          </div>
        }
      >
        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
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
          <span>{timeAgo}</span>
        </div>
      </HoverCard>
    </div>
  );
}
