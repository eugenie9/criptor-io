import Image from "next/image";
import Link from "next/link";
import Section from "../components/Section";

export default function About() {
  return (
    <Section className="py-8 md:py-12 lg:py-16 px-4 lg:px-8 max-w-7xl mx-auto">
      <div className="grid gap-10 lg:gap-16 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-center">
        <div className="space-y-6">
          <div className="rounded-2xl bg-white/90 dark:bg-gray-900/80 border border-gray-100 dark:border-gray-800 shadow-card dark:shadow-card-dark p-6 sm:p-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-crypto-light mb-2">
              About Criptor
            </h2>
            <h3 className="text-xl !leading-tight font-semibold text-neutral-900 xl:text-2xl mb-3 dark:text-gray-100">
              An RSS reader for cryptocurrency news.
            </h3>
            <p className="text-base xl:text-lg text-neutral-600 dark:text-gray-200">
              📰 Criptor is entirely open-source and aims to provide a seamless
              experience for its users. All content is fetched from public RSS
              feeds, contains no ads, and always links back to the original
              source.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-white/90 dark:bg-gray-900/80 border border-gray-100 dark:border-gray-800 p-5 sm:p-6">
              <h3 className="text-lg !leading-tight font-semibold text-neutral-900 xl:text-xl mb-2 dark:text-gray-100">
                What is unique?
              </h3>
              <p className="text-sm md:text-base text-neutral-600 dark:text-gray-300">
                🔥 It is entirely serverless – from the frontend hosted on
                Vercel, to the backend on AWS Lambda + Server Actions, and the
                database on Cloudflare D1. No servers provisioned at all.
              </p>
            </div>

            <div className="rounded-2xl bg-white/90 dark:bg-gray-900/80 border border-gray-100 dark:border-gray-800 p-5 sm:p-6">
              <h3 className="text-lg !leading-tight font-semibold text-neutral-900 xl:text-xl mb-2 dark:text-gray-100">
                The tech stack
              </h3>
              <p className="text-sm md:text-base text-neutral-600 dark:text-gray-300">
                🚀 Next.js 14, AWS Lambda, Cloudflare D1, TypeScript, Tailwind
                CSS and Vercel – modern tools built for fast, reliable crypto
                news delivery.
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-r from-crypto-light/10 via-crypto-light/5 to-transparent dark:from-crypto-light/20 dark:via-crypto-light/10 dark:to-transparent border border-crypto-light/40 dark:border-crypto-light/50 p-6 sm:p-7">
            <h3 className="text-lg !leading-tight font-semibold text-neutral-900 xl:text-xl mb-2 dark:text-gray-100">
              It is all open-source
            </h3>
            <p className="text-base xl:text-lg text-neutral-700 dark:text-gray-100">
              👨🏻‍💻 The source code will be available on GitHub soon so you can
              learn from it, fork it, or contribute improvements.
            </p>
          </div>

          <div className="rounded-2xl bg-white/90 dark:bg-gray-900/80 border border-gray-100 dark:border-gray-800 p-6 sm:p-8 space-y-3">
            <h3 className="text-lg !leading-tight font-semibold text-neutral-900 xl:text-2xl dark:text-gray-100">
              About me 👋
            </h3>
            <p className="text-base xl:text-lg text-neutral-600 dark:text-gray-200">
              Hi, I am Yavuz, the creator of{" "}
              <b className="text-black dark:text-white">Criptor.net</b>. I am a
              Full Stack Software Developer passionate about web development and
              cryptocurrencies. This project was born out of my desire to build
              a simple app with Next.js to test its new App Router and Server
              Actions.
            </p>
            <p className="text-base xl:text-lg text-neutral-600 dark:text-gray-200">
              The website is used for educational purposes only. The whole
              development process will be published as a series of blog posts.
              If you are the owner of any of the RSS feeds and want to remove
              your content from the website, please{" "}
              <Link
                href="https://www.linkedin.com/in/yavuztuncil"
                className="text-crypto-light hover:underline"
              >
                contact me.
              </Link>
            </p>
          </div>
        </div>

        <div className="relative hidden lg:flex justify-center">
          <Image
            src="/images/ipad-mockup-portrait.png"
            className="rotate-[15deg] drop-shadow-2xl"
            alt="iPad mockup showing Criptor"
            width={420}
            height={420}
            priority
          />
        </div>
      </div>
    </Section>
  );
}
