import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <div className="flex justify-around items-center my-4 sm:my-8 lg:my-16">
      <div className="flex flex-col space-y-6">
        <div className="w-full xl:max-w-lg 2xl:max-w-xl">
          <h2 className="text-lg !leading-tight font-semibold text-neutral-900 xl:text-2xl hidden sm:block mb-3">
            An RSS reader for Cryptocurrency news.
          </h2>
          <span className="block text-base xl:text-lg text-neutral-600">
            📰 Criptor is entirely open-source and aims to provide a seamless
            experience for its users. All content is fetched from public RSS
            feeds, contains no ads, and links back to the original source.
          </span>
        </div>

        <div className="w-full xl:max-w-lg 2xl:max-w-xl">
          <h2 className="text-lg !leading-tight font-semibold text-neutral-900 xl:text-2xl mb-3">
            What is unique about this project?
          </h2>
          <span className="block text-base xl:text-lg text-neutral-600">
            🔥 It is entirely serverless! From the frontend hosted on Vercel, to
            the backend on AWS Lambda + Server Actions, and the database on AWS
            DynamoDB. No servers provisioned at all!
          </span>
        </div>

        <div className="w-full xl:max-w-lg 2xl:max-w-xl">
          <h2 className="text-lg !leading-tight font-semibold text-neutral-900 xl:text-2xl mb-3">
            The Tech Stack
          </h2>
          <span className="block text-base xl:text-lg text-neutral-600">
            🚀 Next.js 14, AWS Lambda, AWS DynamoDB, TypeScript, Tailwind CSS
            and Vercel.
          </span>
        </div>

        <div className="w-full xl:max-w-lg 2xl:max-w-xl">
          <h2 className="text-lg !leading-tight font-semibold text-neutral-900 xl:text-2xl mb-3">
            It is all open-source!
          </h2>
          <span className="block text-base xl:text-lg text-neutral-600">
            👨🏻‍💻 The source code will be available on GitHub soon.
          </span>
        </div>

        <div className="w-full max-w-full xl:max-w-lg 2xl:max-w-xl space-y-3">
          <h2 className="text-lg !leading-tight font-semibold text-neutral-900 xl:text-2xl">
            About me 👋
          </h2>
          <span className="block text-base xl:text-lg text-neutral-600">
            Hi, I am Yavuz, the creator of{" "}
            <b className="text-black">Criptor.io</b>. I am a Full Stack Software
            Developer passionate about web development and cryptocurrencies.
            This project was born out of my desire to build a simple app with
            Next.js to test its new features App Router and Server Actions.
          </span>
          <span className="block text-base xl:text-lg text-neutral-600">
            The website will be used for educational purposes only. The whole
            development process will be published as a series of blog posts. If
            you are the owner of any of the RSS feeds and want to remove your
            content from the website, please{" "}
            <Link
              href="https://www.linkedin.com/in/yavuztuncil"
              className="text-blue-500 hover:underline"
            >
              contact me.
            </Link>
          </span>
        </div>
      </div>
      <div className="p-20 hidden lg:block">
        <Image
          src="/images/ipad-mockup-portrait.png"
          className="rotate-[15deg]"
          alt="iPad mockup"
          width={400}
          height={400}
        />
      </div>
    </div>
  );
}
