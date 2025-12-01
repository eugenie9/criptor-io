import { getArticles } from "@/app/actions";
import CryptoSlate from "./components/featuredPublisher/CryptoSlate";
import BeInCrypto from "./components/featuredPublisher/BeInCrypto";
import Protos from "./components/featuredPublisher/Protos";
import Defiant from "./components/featuredPublisher/Defiant";
import CarouselCardBig from "./components/Carousel/CardBig";
import Section from "./components/Section";
import HorizontalCard from "./components/HorizontalCard";

export const revalidate = 60;

type TArticleWithPubDate = TArticle & {
  pubDate: string;
};

const NewsRow = ({
  items,
  min,
  max,
}: {
  items: TArticle[];
  min: number;
  max: number;
}) => {
  return (
    <Section className="py-8 md:py-10">
      <div className="grid grid-cols-2 gap-4">
        {items.map((item, index) => {
          if (index < min || index >= max) return;

          return (
            <div className={`col-span-2 md:col-span-1`} key={item.url}>
              <HorizontalCard article={item} />
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default async function News() {
  // @ts-ignore
  const data: {
    items: TArticleWithPubDate[];
  } = await getArticles();
  const { items } = data;

  return (
    <div className="flex flex-col mt-4">
      <div className="grid grid-cols-8 md:grid-cols-7 gap-4 px-4 md:px-0">
        <div className="col-span-8 md:col-span-3 flex flex-col space-y-2">
          <CarouselCardBig article={items[0]} />
        </div>
        <div className="col-span-4 md:col-span-2">
          <CarouselCardBig article={items[1]} />
        </div>
        <div className="col-span-4 md:col-span-2 flex flex-col space-y-2">
          <CarouselCardBig article={items[2]} />
        </div>
      </div>

      <NewsRow items={items} min={3} max={7} />

      <CryptoSlate />

      <NewsRow items={items} min={7} max={9} />

      <BeInCrypto />

      <NewsRow items={items} min={9} max={13} />

      <Protos />

      <NewsRow items={items} min={13} max={15} />

      <Defiant />

      <NewsRow items={items} min={15} max={17} />
    </div>
  );
}
