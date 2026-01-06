import { getSource } from "@/app/utils";
import Section from "@/app/components/Section";
import Link from "next/link";
import sources from "@/sources.json";

export default async function PublisherList() {
  return (
    <Section className="py-6 md:py-12 lg:py-16">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-heading text-gray-900 dark:text-white mb-2">
          Publishers
        </h1>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
          Discover news from leading cryptocurrency and blockchain publications
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
        {sources.map((source) => {
          const _source = getSource(source.id);

          return (
            <Link
              href={`/publisher/${source.id}`}
              key={_source.name}
              className="group relative overflow-hidden rounded-lg bg-white dark:bg-crypto-dark border border-gray-100 dark:border-gray-800 shadow-card dark:shadow-card-dark hover:shadow-card-hover dark:hover:shadow-card-hover-dark transition-all duration-300 animate-fade-in"
            >
              <div className="flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 h-full min-h-[240px] sm:min-h-[280px] space-y-4 sm:space-y-6">
                <div className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-gray-50 dark:bg-gray-800/50 group-hover:bg-gray-100 dark:group-hover:bg-gray-700/50 transition-colors duration-300">
                  <img
                    src={_source.logo}
                    alt={_source.name}
                    className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                  />
                </div>
                <div className="text-center space-y-1 sm:space-y-2">
                  <h3 className="text-base sm:text-lg font-semibold font-heading text-gray-900 dark:text-white group-hover:text-crypto-light transition-colors duration-200 line-clamp-2">
                    {_source.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    View latest articles
                  </p>
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-crypto-light/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
