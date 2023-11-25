import Link from "next/link";
import { getHowManyTimePassed, getSource } from "../utils";
import Image from "next/image";

export default function ItemFooter({ item }: { item: TArticle }) {
  return (
    <div className="flex items-end justify-between mt-4 flex-1 ">
      <Link href={`/publisher/${item.source}`} prefetch={false}>
        <div className="flex items-center">
          <Image
            src={getSource(item.source).logo}
            alt={item.title}
            width={32}
            height={32}
            className="mr-2"
          />
          <span className="font-semibold">{getSource(item.source).name}</span>
        </div>
      </Link>
      <span className="font-medium">{getHowManyTimePassed(item.date)}</span>
    </div>
  );
}
