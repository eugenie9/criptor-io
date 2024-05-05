import { getArticles } from "@/app/actions";
import FeaturedPublisher from "./components/FeaturedPublisher";
import CarouselCard from "./components/Carousel/Card";
import CarouselCardBig from "./components/Carousel/CardBig";
import FeaturedPublisher2 from "./components/FeaturedPublisher2";
import FeaturedPublisher3 from "./components/FeaturedPublisher3";
import Section from "./components/Section";
import FeaturedPublisher4 from "./components/FeaturedPublisher4";
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
    <Section className="py-10">
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
  const data: {
    items: TArticleWithPubDate[];
  } = await getArticles();
  const { items } = data;

  return (
    <div className="flex flex-col mt-4">
      <Section className="!py-0">
        <div className="grid grid-cols-5 mt-2 gap-4">
          <div className="col-span-5 md:col-span-3">
            {items.length >= 1 && <CarouselCardBig article={items[0]} />}
          </div>
          <div className="col-span-5 md:col-span-2 flex flex-col space-y-4">
            {items.length >= 2 && <CarouselCard article={items[1]} />}
            {items.length >= 3 && <CarouselCard article={items[2]} />}
          </div>
        </div>
      </Section>

      <Section className="!py-0 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.length >= 4 && <CarouselCard article={items[3]} />}
          {items.length >= 5 && <CarouselCard article={items[4]} />}
          {items.length >= 6 && <CarouselCard article={items[5]} />}
        </div>
      </Section>

      <Section className="!py-8">
        <div className="grid grid-cols-2 gap-4">
          {items.map((item, index) => {
            if (index < 6 || index >= 10) return;

            return (
              <div className={`col-span-2 md:col-span-1`} key={item.url}>
                <HorizontalCard article={item} />
              </div>
            );
          })}
        </div>
      </Section>

      <FeaturedPublisher publisher={"crypto_slate"} />

      <NewsRow items={items} min={10} max={12} />

      <FeaturedPublisher2 publisher={"beincrypto"} />

      <NewsRow items={items} min={12} max={16} />

      <FeaturedPublisher3 publisher={"protos"} />

      <NewsRow items={items} min={16} max={18} />

      <FeaturedPublisher4 publisher={"defiant"} />

      <NewsRow items={items} min={18} max={20} />
    </div>
  );
}
