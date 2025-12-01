import { getSource } from "@/app/utils";
import Section from "@/app/components/Section";
import Link from "next/link";

const sources = [
  "beincrypto",
  "bitcoin_news",
  "bitcoin_magazine",
  "coin_gape",
  "crypto_potato",
  "crypto_slate",
  "defiant",
  "protos",
  "forkast",
];

export default async function PublisherList() {
  return (
    <Section>
      <div className="grid grid-cols-4 gap-4">
        {sources.map((source) => {
          const _source = getSource(source);

          return (
            <Link
              href={`/publisher/${source}`}
              key={_source.name}
              className="bg-gray-100 rounded flex flex-col items-center justify-center p-4 col-span-1"
            >
              <img src={_source.logo} alt={_source.name} className="w-3/4" />
              <span className="text-base font-semibold mt-2">
                {_source.name}
              </span>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
