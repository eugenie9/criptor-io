import {
  getArticlesForSource,
  getArticlesWithSourceAndSlug,
} from "@/app/actions";
import { getSource } from "@/app/utils";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Section from "@/app/components/Section";

export const revalidate = 600;

const allowedImg = [
  "beincrypto",
  "bitcoin_magazine",
  "crypto_potato",
  "crypto_slate",
  "defiant",
  "protos",
  "forkast",
];

const FacebookSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    width="24"
    viewBox="0 0 448 512"
  >
    <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64h98.2V334.2H109.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H255V480H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z" />
  </svg>
);

const XSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    width="24"
    viewBox="0 0 448 512"
  >
    <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm297.1 84L257.3 234.6 379.4 396H283.8L209 298.1 123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5L313.6 116h47.5zM323.3 367.6L153.4 142.9H125.1L296.9 367.6h26.3z" />
  </svg>
);

const TelegramSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    width="24"
    viewBox="0 0 496 512"
  >
    <path d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z" />
  </svg>
);

const WhatsAppSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    width="24"
    viewBox="0 0 448 512"
  >
    <path d="M92.1 254.6c0 24.9 7 49.2 20.2 70.1l3.1 5-13.3 48.6L152 365.2l4.8 2.9c20.2 12 43.4 18.4 67.1 18.4h.1c72.6 0 133.3-59.1 133.3-131.8c0-35.2-15.2-68.3-40.1-93.2c-25-25-58-38.7-93.2-38.7c-72.7 0-131.8 59.1-131.9 131.8zM274.8 330c-12.6 1.9-22.4 .9-47.5-9.9c-36.8-15.9-61.8-51.5-66.9-58.7c-.4-.6-.7-.9-.8-1.1c-2-2.6-16.2-21.5-16.2-41c0-18.4 9-27.9 13.2-32.3c.3-.3 .5-.5 .7-.8c3.6-4 7.9-5 10.6-5c2.6 0 5.3 0 7.6 .1c.3 0 .5 0 .8 0c2.3 0 5.2 0 8.1 6.8c1.2 2.9 3 7.3 4.9 11.8c3.3 8 6.7 16.3 7.3 17.6c1 2 1.7 4.3 .3 6.9c-3.4 6.8-6.9 10.4-9.3 13c-3.1 3.2-4.5 4.7-2.3 8.6c15.3 26.3 30.6 35.4 53.9 47.1c4 2 6.3 1.7 8.6-1c2.3-2.6 9.9-11.6 12.5-15.5c2.6-4 5.3-3.3 8.9-2s23.1 10.9 27.1 12.9c.8 .4 1.5 .7 2.1 1c2.8 1.4 4.7 2.3 5.5 3.6c.9 1.9 .9 9.9-2.4 19.1c-3.3 9.3-19.1 17.7-26.7 18.8zM448 96c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96zM148.1 393.9L64 416l22.5-82.2c-13.9-24-21.2-51.3-21.2-79.3C65.4 167.1 136.5 96 223.9 96c42.4 0 82.2 16.5 112.2 46.5c29.9 30 47.9 69.8 47.9 112.2c0 87.4-72.7 158.5-160.1 158.5c-26.6 0-52.7-6.7-75.8-19.3z" />
  </svg>
);

const calculateMinutesToRead = (content: string) => {
  const wordsPerMinute = 200;
  const _content = content.replace(/<[^>]*>/g, "").split(/\s/g);
  const numberOfWords = _content.filter((word) => word !== "").length;
  return Math.ceil(numberOfWords / wordsPerMinute);
};

const shuffle = (array: any[]) => {
  array.sort(() => Math.random() - 0.5);
};

export async function generateMetadata({
  params,
}: {
  params: { id: string; slug: string };
}): Promise<Metadata> {
  const id = params.id;
  const slug = params.slug;
  const articles = await getArticlesWithSourceAndSlug(id, slug);

  const article = articles?.items?.[0];

  const title = `${article?.title} | Criptor.io` || "Not found";
  const description = article?.content || "Not found";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: article?.thumbnail || getSource(article?.source).logo,
          alt: title,
        },
      ],
    },
  };
}

export default async function NewsDetails({
  params,
}: {
  params: { id: string; slug: string };
}) {
  const id = params.id;
  const slug = params.slug;
  const articles = await getArticlesWithSourceAndSlug(id, slug);
  const article = articles?.items?.[0];

  if (!article) {
    return <div>Not found</div>;
  }

  const data = await getArticlesForSource(id, 0);
  if (data.items) shuffle(data.items);
  const items = data.items?.slice(0, 3);

  const month = new Date(article.date).toLocaleString("en-US", {
    month: "long",
  });

  const day = new Date(article.date).toLocaleString("en-US", {
    day: "numeric",
  });

  const year = new Date(article.date).toLocaleString("en-US", {
    year: "numeric",
  });

  const date = `${month} ${day}, ${year}`;
  const encodedTitle = encodeURIComponent(`${article.title} | Criptor.io`);
  const encodedURL = encodeURIComponent(
    `https://criptor.io/publisher/${id}/${slug}`
  );

  const encodedText = `${encodedTitle} ${encodedURL}`;

  return (
    <Section className="py-4">
      <div className="grid grid-cols-4 gap-8 my-6 sm:my-8 flex-col sm:flex-row">
        <div className="flex flex-col justify-center items-centers col-span-4 lg:col-span-3 space-y-4">
          <h1 className="text-xl sm:text-2xl font-medium">{article.title}</h1>

          <div className="flex justify-between flex-col sm:flex-row">
            <div className="flex items-center">
              <Link
                className="flex items-center border-r border-black pr-4"
                href={`/publisher/${id}`}
              >
                <Image
                  src={getSource(article.source).logo}
                  alt={article.title}
                  width={24}
                  height={24}
                  className="mr-2"
                />
                <span className="text-base sm:text-lg font-medium">
                  {getSource(article.source).name}
                </span>
              </Link>

              <span className="text-base text-neutral-700 px-4 border-r border-black hidden sm:block">
                {date}
              </span>

              <span className="text-base text-neutral-700 px-4">
                {calculateMinutesToRead(article.full_content)} min read
              </span>
            </div>

            <div className="flex items-center space-x-2 mr-2 mt-4 sm:mt-0">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedURL}&t=${encodedTitle}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookSVG />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodedText}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <XSVG />
              </a>
              <a href={`https://t.me/share/url?url=${encodedText}`}>
                <TelegramSVG />
              </a>
              <a href={`https://api.whatsapp.com/send?text=${encodedText}`}>
                <WhatsAppSVG />
              </a>
            </div>
          </div>

          {allowedImg.includes(id) && (
            <img
              src={article.thumbnail || getSource(article.source).logo}
              alt={article.title}
              className="rounded object-cover max-h-[400px] w-full max-w-full"
            />
          )}

          <article
            className="!text-lg flex flex-col space-y-4 
          [&>img]:w-full [&>img]:rounded-lg [&>img]:object-contain
          [&>figure>img]:w-full [&>figure>img]:rounded-lg [&>figure>img]:object-contain
          [&>a]:!text-blue-500 [&>a]:!font-medium [&>a]:!underline
          [&>p>a]:!text-blue-500 [&>p>a]:!font-medium [&>p>a]:!underline
          [&>[data-el='widget-exchanges-affiliate']]:hidden
          overflow-hidden"
            dangerouslySetInnerHTML={{ __html: article.full_content }}
          />
        </div>

        <div className="col-span-4 lg:col-span-1">
          <section className="flex flex-col space-y-4 sticky top-8">
            <h2 className="text-xl font-semibold">MORE ARTICLES</h2>
            <hr />
            <div className="flex flex-col md:max-lg:flex-row gap-4">
              {items?.map((item) => (
                <div className="flex flex-col space-y-2" key={item.url}>
                  <Link href={`/publisher/${item.source}/${item.slug}`}>
                    <img
                      src={item.thumbnail || getSource(item.source).logo}
                      alt={item.title}
                      className="rounded object-cover h-40 w-full max-w-full grayscale-[60%] transition-all duration-500 group-hover:grayscale-0 font-medium"
                    />
                    <p className="text-base my-2">{item.title}</p>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Section>
  );
}
