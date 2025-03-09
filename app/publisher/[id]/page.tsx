import {
  getArticlesForSource,
  getPopularArticlesForSource,
} from "@/app/actions";
import AskMore from "@/app/publisher/[id]/AskMore";
import ArticleCard2 from "@/app/components/ArticleCard2";
import type { Metadata } from "next";
import sources from "@/sources.json";
import Section from "@/app/components/Section";
import CarouselCard from "@/app/components/Carousel/Card";
import CarouselCardBig from "@/app/components/Carousel/CardBig";
import PopularArticles from "@/app/components/PopularArticles";

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
    title: `${source.name} - Cryptocurrency News | Criptor.net`,
    description: `Stay updated with the latest cryptocurrency news from ${source.name} on Criptor.net, your comprehensive source for all things crypto.`,
    keywords: `Cryptocurrency, Crypto News, Bitcoin, Ethereum, Blockchain, Crypto Market, Altcoins, Crypto Trading, Crypto Investment, Crypto Updates, Blockchain Technology, DeFi, NFT, Crypto RSS Reader, Criptor, ${source.name}`,
  };
}

export default async function News({ params, searchParams }: Props) {
  const id = params.id;
  const start = searchParams.start ? parseInt(searchParams.start) : 0;

  const data = await getArticlesForSource(id, start);

  const popularArticles = await getPopularArticlesForSource(id);

  const {
    items,
    offset,
  }: {
    items: TArticle[];
    offset: number;
  } = data;

  if (!items) return <div>404</div>;
  if (!items.length) return <div>404</div>;

  return (
    <>
      <Section className="!py-0 mt-4">
        <div className="grid grid-cols-7 gap-2">
          <div className="col-span-7 md:col-span-2 flex flex-col space-y-2 max-md:order-2">
            <CarouselCard article={items[1]} />
            <CarouselCard article={items[2]} />
          </div>
          <div className="col-span-7 md:col-span-3 max-md:order-1">
            <CarouselCardBig article={items[0]} />
          </div>
          <div className="col-span-7 md:col-span-2 flex flex-col space-y-2 max-md:order-3">
            <CarouselCard article={items[3]} />
            <CarouselCard article={items[4]} />
          </div>
        </div>
      </Section>

      <Section className="py-4">
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-3 md:col-span-2">
            {items.map((item, index) => {
              if (index < 5) return;
              return (
                <div key={item.slug}>
                  <ArticleCard2 article={item} />
                </div>
              );
            })}
            <AskMore source={id} start={offset} />
          </div>
          <div className="col-span-3 md:col-span-1 h-auto">
            <PopularArticles articles={popularArticles} />
          </div>
        </div>
      </Section>
    </>
  );
}
