import ItemVertical from "@/app/components/ItemVertical";
import ItemLeftRight from "@/app/components/ItemLeftRight";
import { getArticlesForSource } from "@/app/actions";
import AskMore from "@/app/publisher/[id]/AskMore";
import ArticleCard from "@/app/components/ArticleCard";
import type { Metadata } from "next";
import sources from "@/sources.json";
import Section from "@/app/components/Section";

export const revalidate = 60;

type Props = {
  params: { id: string };
  searchParams: { start: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;

  let source = sources.find((source) => source.id == id);
  if (!source) source = { id: "", name: "404" };

  return {
    title: `${source.name} - Cryptocurrency News | Criptor.io`,
    description: `Stay updated with the latest cryptocurrency news from ${source.name} on Criptor.io, your comprehensive source for all things crypto.`,
    keywords: `Cryptocurrency, Crypto News, Bitcoin, Ethereum, Blockchain, Crypto Market, Altcoins, Crypto Trading, Crypto Investment, Crypto Updates, Blockchain Technology, DeFi, NFT, Crypto RSS Reader, Criptor, ${source.name}`,
  };
}

export default async function News({ params, searchParams }: Props) {
  const id = params.id;
  const start = searchParams.start ? parseInt(searchParams.start) : 0;

  const data = await getArticlesForSource(id, start);

  // @ts-ignore
  const {
    items,
    lastEvaluatedKey,
  }: {
    items: TArticle[];
    lastEvaluatedKey: string;
  } = data;

  if (!items) return <div>404</div>;
  if (!items.length) return <div>404</div>;

  return (
    <Section className="py-4">
      {items.length == 1 && (
        <div className="grid grid-cols-7 gap-6 gap-y-2">
          <div className="col-span-7 lg:col-span-4">
            <ItemVertical item={items[0]} />
          </div>
        </div>
      )}

      {items.length == 2 && (
        <div className="grid grid-cols-7 gap-6 gap-y-2">
          <div className="col-span-7 lg:col-span-4">
            <ItemVertical item={items[0]} />
          </div>
          <div className="col-span-7 md:col-span-7 lg:col-span-3 flex flex-col justify-center">
            <ItemLeftRight item={items[1]} orientation={"right"} />
          </div>
        </div>
      )}

      {items.length >= 3 && (
        <div className="grid grid-cols-7 gap-6 gap-y-2">
          <div className="col-span-7 lg:col-span-4">
            <ItemVertical item={items[0]} />
          </div>
          <div className="col-span-7 md:col-span-7 lg:col-span-3 flex flex-col justify-center">
            <ItemLeftRight item={items[1]} orientation={"right"} />
            <ItemLeftRight item={items[2]} orientation={"right"} />
          </div>
        </div>
      )}

      <div className="grid grid-cols-12 gap-6 gap-y-2 pb-4">
        {items.map((item, index) => {
          if (index < 3) return;

          return (
            <div
              className={`col-span-12 md:col-span-6 lg:col-span-4`}
              key={item.url}
            >
              <ArticleCard article={item} />
            </div>
          );
        })}
      </div>

      <AskMore source={id} start={lastEvaluatedKey} />
    </Section>
  );
}
