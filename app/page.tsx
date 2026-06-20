import { Suspense } from "react";
import { getArticles } from "@/app/actions";
import CryptoSlate from "./components/featuredPublisher/CryptoSlate";
import BeInCrypto from "./components/featuredPublisher/BeInCrypto";
import Protos from "./components/featuredPublisher/Protos";
import Defiant from "./components/featuredPublisher/Defiant";
import CarouselCardBig from "./components/Carousel/CardBig";
import Section from "./components/Section";
import HorizontalCard from "./components/HorizontalCard";
import PublisherSkeleton from "./components/PublisherSkeleton";

export const revalidate = 60;

const ArticleRow = ({ items }: { items: TArticle[] }) => {
  return (
    <Section className="py-8 md:py-10">
      <div className="grid grid-cols-2 gap-4">
        {items.map((item) => (
          <div className="col-span-2 md:col-span-1" key={item.url}>
            <HorizontalCard article={item} />
          </div>
        ))}
      </div>
    </Section>
  );
};

export default async function News() {
  const { items } = await getArticles();

  // Data-driven layout: slice articles into logical sections
  const heroArticles = items.slice(0, 3);
  const row1Articles = items.slice(3, 7);
  const row2Articles = items.slice(7, 9);
  const row3Articles = items.slice(9, 13);
  const row4Articles = items.slice(13, 15);
  const row5Articles = items.slice(15, 17);

  return (
    <div className="flex flex-col pt-8 px-4 lg:px-12 container mx-auto w-full">
      {/* Hero Section */}
      <div className="grid grid-cols-8 md:grid-cols-7 gap-4">
        <div className="col-span-8 md:col-span-3 flex flex-col space-y-2">
          {heroArticles[0] && <CarouselCardBig article={heroArticles[0]} />}
        </div>
        <div className="col-span-4 md:col-span-2">
          {heroArticles[1] && <CarouselCardBig article={heroArticles[1]} />}
        </div>
        <div className="col-span-4 md:col-span-2 flex flex-col space-y-2">
          {heroArticles[2] && <CarouselCardBig article={heroArticles[2]} />}
        </div>
      </div>

      {row1Articles.length > 0 && <ArticleRow items={row1Articles} />}

      <Suspense fallback={<PublisherSkeleton />}>
        <CryptoSlate />
      </Suspense>

      {row2Articles.length > 0 && <ArticleRow items={row2Articles} />}

      <Suspense fallback={<PublisherSkeleton />}>
        <BeInCrypto />
      </Suspense>

      {row3Articles.length > 0 && <ArticleRow items={row3Articles} />}

      <Suspense fallback={<PublisherSkeleton />}>
        <Protos />
      </Suspense>

      {row4Articles.length > 0 && <ArticleRow items={row4Articles} />}

      <Suspense fallback={<PublisherSkeleton />}>
        <Defiant />
      </Suspense>

      {row5Articles.length > 0 && <ArticleRow items={row5Articles} />}
    </div>
  );
}
