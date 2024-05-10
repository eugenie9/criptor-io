import Link from "next/link";
import { calculateMinutesToRead, getSource } from "../utils";

const PopularArticles = ({ articles }: { articles: TArticle[] }) => {
  return (
    <div className="bg-[#f9f9f9] flex flex-col pt-4 sticky top-4">
      <p className="text-center text-xl lg:text-2xl font-semibold text-black">
        Popular News
      </p>

      <hr className="border-t border-[#e5e5e5] m-4" />

      {articles.map((article) => {
        return (
          <div
            className={`md:px-5 pb-5 group h-full grid grid-cols-3 items-center gap-4`}
            key={article.slug}
          >
            <Link
              href={`/publisher/${article.source}/${article.slug}`}
              className="col-span-1 md:max-lg:hidden"
            >
              <img
                src={article.thumbnail || getSource(article.source).logo}
                alt={article.title}
                className="rounded object-cover h-32 grayscale-[60%] transition-all duration-500 group-hover:grayscale-0"
              />
            </Link>
            <div className="col-span-2 md:max-lg:col-span-3">
              <p className="text-base font-semibold mb-2">
                {article.title.slice(0, 70)}
                {article.title.length > 70 ? "..." : ""}
              </p>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width={14}
                  height={14}
                >
                  <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
                </svg>
                <span className="ml-2 text-[#777777]">
                  {calculateMinutesToRead(article.full_content)} min read
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PopularArticles;
