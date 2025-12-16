import { getArticlesForSource } from "@/app/actions";
import AskMore from "@/app/publisher/[id]/AskMore";
import ArticleCard2 from "@/app/components/ArticleCard2";
import type { Metadata } from "next";
import sources from "@/sources.json";
import Section from "@/app/components/Section";
import AnimatedContainer from "@/app/components/AnimatedContainer";
import { getSource } from "@/app/utils";
import Link from "next/link";

export const revalidate = 60;

type Props = {
  params: { id: string };
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

export default async function News({ params }: Props) {
  const id = params.id;

  const data = await getArticlesForSource(id);
  const source = getSource(id);

  // Convert the data to match TArticle type
  const items = data.items;
  const lastDate = data.nextLastDate;

  if (!items) return <div>404</div>;
  if (!items.length) return <div>404</div>;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Publisher Header */}
      <div className="relative bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto py-12 px-4">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="mb-6">
              <img
                src={source.logo}
                alt={source.name}
                width={80}
                height={80}
                className="h-20 w-20 object-contain"
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-3">
              {source.name}
            </h1>
            <div className="w-24 h-1 bg-crypto-light mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              Exclusive coverage of cryptocurrency markets, blockchain
              innovations, and digital asset trends
            </p>
          </div>

          <div className="flex justify-center">
            <div className="flex space-x-6 text-sm font-medium">
              <Link
                href="/"
                className="text-gray-700 dark:text-gray-300 hover:text-crypto-light dark:hover:text-crypto-light transition-colors flex items-center"
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
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Home
              </Link>
              <span className="text-gray-400">|</span>
              <Link
                href="/publisher"
                className="text-gray-700 dark:text-gray-300 hover:text-crypto-light dark:hover:text-crypto-light transition-colors"
              >
                All Publishers
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Article */}
      <div className="bg-white dark:bg-gray-900">
        <Section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedContainer className="order-2 lg:order-1">
              <span className="text-crypto-light text-sm font-medium tracking-wider uppercase mb-4 block">
                Featured Article
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-6">
                {items[0].title}
              </h2>
              <div className="w-16 h-1 bg-crypto-light mb-6"></div>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
                {items[0].content?.slice(0, 280)}...
              </p>
              <div className="flex items-center mb-8">
                <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
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
                  {new Date(items[0].date || "").toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <Link
                href={`/publisher/${id}/${items[0].slug}`}
                className="inline-flex items-center text-crypto-light hover:text-crypto-dark dark:hover:text-white font-medium transition-colors group"
              >
                Continue Reading
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </AnimatedContainer>

            <AnimatedContainer className="order-1 lg:order-2" delay={100}>
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={items[0].thumbnail}
                  alt={items[0].title}
                  width={600}
                  height={400}
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-black/10 hover:bg-black/0 transition-colors duration-300"></div>
              </div>
            </AnimatedContainer>
          </div>
        </Section>
      </div>

      {/* Top Stories */}
      <div className="bg-gray-50 dark:bg-gray-800">
        <Section>
          <div className="flex flex-col items-center text-center mb-12">
            <span className="text-crypto-light text-sm font-medium tracking-wider uppercase mb-3 block">
              Editor&apos;s Selection
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-3">
              Top Stories
            </h2>
            <div className="w-16 h-1 bg-crypto-light mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {items.slice(1, 4).map((item, index) => (
              <AnimatedContainer
                key={item.slug}
                delay={index * 150}
                className="h-full"
              >
                <div className="bg-white dark:bg-gray-700 overflow-hidden h-full flex flex-col border border-gray-100 dark:border-gray-600 group">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      width={400}
                      height={200}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-0 right-0 bg-white dark:bg-gray-900 text-xs text-gray-600 dark:text-gray-300 py-1 px-2">
                      {new Date(item.date || "").toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-heading font-bold text-xl mb-3 text-gray-800 dark:text-gray-100 line-clamp-2">
                      <Link
                        href={`/publisher/${id}/${item.slug}`}
                        className="hover:text-crypto-light transition-colors"
                      >
                        {item.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4 flex-1 text-sm">
                      {item.content?.slice(0, 120)}...
                    </p>
                    <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-600">
                      <Link
                        href={`/publisher/${id}/${item.slug}`}
                        className="text-crypto-light hover:text-crypto-dark dark:hover:text-white font-medium text-sm flex items-center"
                      >
                        Continue Reading
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
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </AnimatedContainer>
            ))}
          </div>
        </Section>
      </div>

      {/* Latest Articles */}
      <div className="bg-white dark:bg-gray-900">
        <Section>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Main Content */}
            <div className="col-span-1 md:col-span-8">
              <div className="flex flex-col mb-12">
                <span className="text-crypto-light text-sm font-medium tracking-wider uppercase mb-3 block">
                  Recent Publications
                </span>
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-3">
                  Latest Articles
                </h2>
                <div className="w-16 h-1 bg-crypto-light mb-6"></div>
              </div>

              <div className="flexflex-col space-y-12">
                {items.slice(4, 10).map((item, index) => (
                  <AnimatedContainer
                    key={item.slug}
                    delay={index * 100}
                    className="border-b border-gray-100 dark:border-gray-800 last:border-0"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                      <div className="col-span-1 md:col-span-5 md:order-2">
                        <Link
                          href={`/publisher/${id}/${item.slug}`}
                          className="block overflow-hidden rounded-lg"
                        >
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            width={400}
                            height={240}
                            className="w-full h-56 md:h-64 object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </Link>
                      </div>
                      <div className="col-span-1 md:col-span-7 md:order-1">
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 w-3 mr-1"
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
                            {new Date(item.date || "").toLocaleDateString(
                              "en-US",
                              { month: "long", day: "numeric", year: "numeric" }
                            )}
                          </span>
                          <span className="text-gray-300 dark:text-gray-600">
                            •
                          </span>
                          <span className="text-xs text-crypto-light">
                            Cryptocurrency
                          </span>
                        </div>

                        <h3 className="font-heading font-bold text-xl md:text-2xl mb-4 text-gray-900 dark:text-white leading-snug">
                          <Link
                            href={`/publisher/${id}/${item.slug}`}
                            className="hover:text-crypto-light transition-colors"
                          >
                            {item.title}
                          </Link>
                        </h3>

                        <p className="text-gray-600 dark:text-gray-300 mb-5 line-clamp-3 leading-relaxed">
                          {item.content?.slice(0, 180)}...
                        </p>

                        <Link
                          href={`/publisher/${id}/${item.slug}`}
                          className="inline-flex items-center text-crypto-light hover:text-crypto-dark dark:hover:text-white font-medium transition-colors group"
                        >
                          Continue Reading
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </AnimatedContainer>
                ))}
              </div>

              <AnimatedContainer className="mt-8 lg:mt-16">
                <AskMore source={id} lastDate={lastDate} />
              </AnimatedContainer>
            </div>

            {/* Sidebar */}
            <div className="col-span-1 md:col-span-4">
              <div className="sticky top-24 lg:top-48 space-y-10">
                {/* About Publisher */}
                <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center mb-6">
                    <img
                      src={source.logo}
                      alt={source.name}
                      width={48}
                      height={48}
                      className="h-12 w-12 object-contain rounded-full bg-white p-1 shadow-sm"
                    />
                    <h3 className="ml-3 text-xl font-heading font-bold text-gray-900 dark:text-white">
                      About {source.name}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm leading-relaxed">
                    {source.name} provides in-depth coverage of cryptocurrency
                    markets, blockchain technology, and digital asset trends.
                    Stay updated with expert analysis and breaking news.
                  </p>
                  <div className="flex space-x-3">
                    <a
                      href="#"
                      className="bg-white dark:bg-gray-700 text-crypto-light hover:bg-crypto-light hover:text-white dark:hover:bg-crypto-light p-2 rounded-full transition-colors border border-gray-200 dark:border-gray-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="bg-white dark:bg-gray-700 text-crypto-light hover:bg-crypto-light hover:text-white dark:hover:bg-crypto-light p-2 rounded-full transition-colors border border-gray-200 dark:border-gray-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="bg-white dark:bg-gray-700 text-crypto-light hover:bg-crypto-light hover:text-white dark:hover:bg-crypto-light p-2 rounded-full transition-colors border border-gray-200 dark:border-gray-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="bg-white dark:bg-gray-700 text-crypto-light hover:bg-crypto-light hover:text-white dark:hover:bg-crypto-light p-2 rounded-full transition-colors border border-gray-200 dark:border-gray-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Newsletter Signup */}
                <div className="bg-crypto-light bg-opacity-10 dark:bg-opacity-20 p-8 rounded-lg">
                  <h3 className="text-xl font-heading font-bold mb-4 text-gray-900 dark:text-white">
                    Subscribe to Updates
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
                    Get the latest cryptocurrency news and insights delivered
                    directly to your inbox.
                  </p>
                  <div className="flex flex-col space-y-3">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-crypto-light"
                    />
                    <button className="bg-crypto-light hover:bg-crypto-dark text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors">
                      Subscribe Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
