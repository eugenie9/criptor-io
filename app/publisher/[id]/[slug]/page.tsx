import {
  getArticlesForSource,
  getArticleWithSourceAndSlug,
} from "@/app/actions";
import {
  getHowManyTimePassed,
  getSource,
  calculateMinutesToRead,
  extractKeywords,
} from "@/app/utils";
import Link from "next/link";
import type { Metadata } from "next";
import Section from "@/app/components/Section";
import LinkWrapper from "@/app/components/LinkWrapper";
import MarketOverview from "@/app/components/MarketOverview";
import SubscribeToUpdates from "@/app/components/SubscribeToUpdates";

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

const shuffle = (array: any[]) => {
  array.sort(() => Math.random() - 0.5);
};

const Card = ({ article }: { article: TArticle }) => {
  return (
    <LinkWrapper article={article}>
      <article className="group relative overflow-hidden rounded-xl shadow-card dark:shadow-card-dark hover:shadow-card-hover dark:hover:shadow-card-hover-dark transition-all duration-300 h-[350px] flex bg-white dark:bg-crypto-dark/60">
        <img
          alt={article.title}
          src={article.thumbnail}
          className="absolute inset-0 h-full w-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105"
        />

        <div className="relative bg-gradient-to-t from-black/80 via-black/50 to-transparent flex-1 flex items-end z-10">
          <div className="p-5 sm:p-6 flex flex-col">
            <div className="flex items-center mb-3">
              <span className="bg-crypto-light/90 text-white text-xs font-medium px-2 py-1 rounded-full">
                {getSource(article.source).name}
              </span>
            </div>

            <h3 className="font-heading font-bold text-lg text-white group-hover:text-crypto-light transition-colors duration-200 line-clamp-3">
              {article.title}
            </h3>

            <div className="flex items-center mt-3 text-gray-300 text-sm">
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
              <span>{getHowManyTimePassed(article.date)}</span>
            </div>
          </div>
        </div>
      </article>
    </LinkWrapper>
  );
};

const getArticle = async (id: string, slug: string) => {
  try {
    const article = await getArticleWithSourceAndSlug(id, slug);

    if (!article) {
      return null;
    }

    let keywords = article.keywords;

    if (!keywords || keywords.length === 0) {
      keywords = extractKeywords(article.full_content || "");
      keywords.push(
        ...[getSource(article?.source).name.toLowerCase(), "criptor"]
      );
      shuffle(keywords);
    }

    return { ...article, keywords };
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
};

export async function generateMetadata({
  params,
}: {
  params: { id: string; slug: string };
}): Promise<Metadata> {
  const id = params.id;
  const slug = params.slug;
  const article = await getArticle(id, slug);

  if (!article) {
    return {
      title: "Not found | Criptor.net",
      description: "Not found",
    };
  }

  const title = `${article?.title} | Criptor.net` || "Not found";
  const description = article?.content || "Not found";
  const keywords = extractKeywords(article?.full_content || "");
  keywords.push(...[getSource(article?.source).name.toLowerCase(), "criptor"]);

  return {
    title,
    keywords,
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
  const article = await getArticle(id, slug);

  if (!article) {
    return (
      <Section className="container mx-auto !pb-0 pt-8 px-4 lg:px-12">
        <div className="text-center py-20">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Article Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            The article you are looking for does not exist or has been removed.
          </p>
        </div>
      </Section>
    );
  }

  const data = await getArticlesForSource(id, 0);
  // @ts-ignore
  let { items }: { items: TArticle[] } = data;
  if (!items) items = [];

  shuffle(items);
  items = items.slice(0, 8);

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
  const encodedTitle = encodeURIComponent(`${article.title} | Criptor.net`);
  const encodedURL = encodeURIComponent(
    `https://www.criptor.net/publisher/${id}/${slug}`
  );

  const encodedText = `${encodedTitle} ${encodedURL}`;

  let image = "";

  if (!allowedImg.includes(id)) {
    // get first image from article
    const firstImage = article.full_content?.match(/<img.*?src="(.*?)"/);
    // get image link
    const imgLink = firstImage?.[0].match(/src="([^"]*)"/);
    // get image source
    const imageSource = imgLink?.[0].replace(/src="/, "");
    // remove the last "
    image = imageSource?.replace(/"$/, "");

    // remove the image from the article
    const content = article.full_content?.replace(/<img.*?src="(.*?)\/>/, "");
    article.full_content = content;
  }

  return (
    <>
      {/* Article content with 2-to-1 grid layout */}
      <Section className="container mx-auto !pb-0 pt-8 px-4 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main article content - 2/3 width on desktop */}
          <div className="lg:col-span-2">
            <div>
              {/* Breadcrumb navigation */}
              <div className="flex items-center text-gray-500 text-sm mb-6">
                <Link
                  href="/"
                  className="hover:text-crypto-light transition-colors flex items-center"
                >
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
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Home
                </Link>
                <span className="mx-2">›</span>
                <Link
                  href={`/publisher/${id}`}
                  className="hover:text-crypto-light transition-colors flex items-center"
                >
                  <span className="truncate max-w-[120px]">
                    {getSource(article.source).name}
                  </span>
                </Link>
                <span className="mx-2">›</span>
                <span className="text-gray-400 truncate max-w-[200px] hidden sm:inline">
                  {article.title}
                </span>
              </div>

              {/* Publisher info and share buttons */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
                <Link
                  className="flex items-center group hover:bg-gray-50 dark:hover:bg-gray-800/30 rounded-lg max-md:p-0 px-3 py-2 transition-all duration-200 mb-4 sm:mb-0"
                  href={`/publisher/${id}`}
                >
                  <div className="w-10 h-10 rounded-full bg-white p-1 mr-3 overflow-hidden shadow-sm">
                    <img
                      src={getSource(article.source).logo}
                      alt={getSource(article.source).name}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div>
                    <p className="text-base font-medium text-gray-800 dark:text-gray-200 group-hover:text-crypto-light transition-colors">
                      {getSource(article.source).name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Original publisher
                    </p>
                  </div>
                </Link>

                {/* Social share buttons */}
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500 text-sm mr-1">Share:</span>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodedURL}&t=${encodedTitle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 dark:bg-gray-800 hover:bg-[#1877f2]/10 p-1.5 rounded-full transition-all duration-200 hover:scale-110"
                    aria-label="Share on Facebook"
                  >
                    <FacebookSVG />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodedText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 dark:bg-gray-800 hover:bg-[#1da1f2]/10 p-1.5 rounded-full transition-all duration-200 hover:scale-110"
                    aria-label="Share on Twitter"
                  >
                    <XSVG />
                  </a>
                  <a
                    href={`https://t.me/share/url?url=${encodedText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 dark:bg-gray-800 hover:bg-[#0088cc]/10 p-1.5 rounded-full transition-all duration-200 hover:scale-110"
                    aria-label="Share on Telegram"
                  >
                    <TelegramSVG />
                  </a>
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodedText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 dark:bg-gray-800 hover:bg-[#25d366]/10 p-1.5 rounded-full transition-all duration-200 hover:scale-110"
                    aria-label="Share on WhatsApp"
                  >
                    <WhatsAppSVG />
                  </a>
                </div>
              </div>

              {/* Article title */}
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
                {article.title}
              </h1>

              {/* Categories */}
              {article.categories && article.categories.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  {article.categories.map((category, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium bg-white dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-crypto-light hover:text-crypto-light dark:hover:border-crypto-light dark:hover:text-crypto-light transition-all duration-200 cursor-pointer"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              )}

              {/* Article meta information */}
              <div className="flex flex-wrap items-center gap-4 pb-4 text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 mb-4">
                <div className="flex items-center">
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm md:text-base">{date}</span>
                </div>

                <div className="flex items-center">
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
                  <span className="text-sm md:text-base">
                    {calculateMinutesToRead(article.full_content)} min read
                  </span>
                </div>
              </div>

              {/* Featured image */}
              <div className="relative overflow-hidden rounded-lg shadow-md mb-10">
                <img
                  src={
                    article.thumbnail || image || getSource(article.source).logo
                  }
                  alt={article.title}
                  className="w-full max-w-full object-cover max-h-[500px]"
                />
              </div>
            </div>

            <article
              className="!text-lg flex flex-col space-y-4 !leading-8
              [&>img]:max-w-full [&>img]:rounded-lg [&>img]:object-contain [&>img]:my-6
              [&>figure>img]:max-w-full [&>figure>img]:rounded-lg [&>figure>img]:object-contain [&>figure>img]:my-6
              [&>figure>a>img]:max-w-full [&>figure>a>img]:rounded-lg [&>figure>a>img]:object-contain [&>figure>a>img]:my-6
              [&>a]:!text-crypto-light [&>a]:!font-medium [&>a]:!underline
              [&>p>a]:!text-crypto-light [&>p>a]:!font-medium [&>p>a]:!underline
              [&>[data-el='widget-exchanges-affiliate']]:hidden
              [&>h1]:!text-3xl [&>h1]:!font-heading [&>h1]:!font-bold [&>h1]:!mt-8 [&>h1]:!mb-4 [&>h1]:!text-gray-900 dark:[&>h1]:!text-gray-100
              [&>h2]:!text-2xl [&>h2]:!font-heading [&>h2]:!font-bold [&>h2]:!mt-8 [&>h2]:!mb-4 [&>h2]:!text-gray-900 dark:[&>h2]:!text-gray-100
              [&>h3]:!text-xl [&>h3]:!font-heading [&>h3]:!font-bold [&>h3]:!mt-8 [&>h3]:!mb-4 [&>h3]:!text-gray-900 dark:[&>h3]:!text-gray-100
              [&>h4]:!text-lg [&>h4]:!font-heading [&>h4]:!font-bold [&>h4]:!mt-8 [&>h4]:!mb-4 [&>h4]:!text-gray-900 dark:[&>h4]:!text-gray-100
              [&>h5]:!text-base [&>h5]:!font-heading [&>h5]:!font-bold [&>h5]:!mt-8 [&>h5]:!mb-4 [&>h5]:!text-gray-900 dark:[&>h5]:!text-gray-100
              [&>h6]:!text-base [&>h6]:!font-heading [&>h6]:!font-bold [&>h6]:!mt-8 [&>h6]:!mb-4 [&>h6]:!text-gray-900 dark:[&>h6]:!text-gray-100
              [&>p]:!text-gray-800 dark:[&>p]:!text-gray-200 [&>p]:!my-4
              [&>blockquote]:!border-l-4 [&>blockquote]:!border-crypto-light [&>blockquote]:!pl-4 [&>blockquote]:!italic [&>blockquote]:!my-6 [&>blockquote]:!text-gray-700 dark:[&>blockquote]:!text-gray-300
              overflow-hidden"
              dangerouslySetInnerHTML={{ __html: article.full_content || "" }}
            />

            {/* Keywords section */}
            <div className="my-12 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-heading font-bold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-crypto-light"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
                RELATED TOPICS
              </h3>
              <div className="flex flex-wrap gap-2">
                {(article.keywords || []).map((keyword, index) => (
                  <span
                    className="text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full px-3 py-1 hover:bg-crypto-light/20 dark:hover:bg-crypto-light/20 transition-colors duration-200 cursor-pointer"
                    key={index}
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar content - 1/3 width on desktop */}
          <div className="lg:col-span-1 flex flex-col space-y-8 md:space-y-12">
            {/* Related articles in sidebar */}
            <div className="bg-gray-50 dark:bg-gray-900/30 rounded-lg p-6">
              <h3 className="text-xl font-heading font-bold mb-6 text-gray-900 dark:text-gray-100 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-crypto-light"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
                More From {getSource(article.source).name}
              </h3>
              <div className="space-y-6">
                {(items || []).slice(0, 3).map((relatedArticle, index) => (
                  <div key={index} className="group">
                    <LinkWrapper article={relatedArticle}>
                      <div className="flex items-start space-x-3">
                        <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-md">
                          <img
                            src={
                              relatedArticle.thumbnail ||
                              getSource(relatedArticle.source).logo
                            }
                            alt={relatedArticle.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div>
                          <h4 className="text-base font-medium text-gray-800 dark:text-gray-200 group-hover:text-crypto-light transition-colors duration-200 line-clamp-2">
                            {relatedArticle.title}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {getHowManyTimePassed(relatedArticle.date)}
                          </p>
                        </div>
                      </div>
                    </LinkWrapper>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Link
                  href={`/publisher/${id}`}
                  className="inline-flex items-center text-crypto-light hover:text-crypto-light/80 font-medium text-sm"
                >
                  View All Articles
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            <MarketOverview />

            <div className="sticky top-32">
              <SubscribeToUpdates />
            </div>
          </div>
        </div>
      </Section>

      {/* Additional related articles in full width - optional */}
      <Section className="bg-gray-50 dark:bg-gray-900/50 transition-colors duration-300 mt-12 px-4 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
          You May Also Like
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {items
            .slice(4, 8)
            .map((relatedArticle, index) => (
              <div
                key={index}
                className="animate-fade-in"
                style={{ animationDelay: `${100}ms` }}
              >
                <Card article={relatedArticle} />
              </div>
            ))
            .slice(0, 4)}
        </div>
      </Section>
    </>
  );
}
