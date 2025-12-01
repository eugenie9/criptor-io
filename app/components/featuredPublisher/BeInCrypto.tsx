import { getArticlesForSource } from "@/app/actions";
import { getHowManyTimePassed, getSource } from "@/app/utils";
import Section from "../Section";
import LinkWrapper from "../LinkWrapper";

const Card = ({ article }: { article: TArticle }) => {
  return (
    <LinkWrapper article={article}>
      <article className="relative overflow-hidden rounded-lg shadow transition hover:shadow-lg h-[400px] flex">
        <img
          alt={article.title}
          src={article.thumbnail}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="relative bg-gradient-to-t from-gray-900/70 to-gray-900/30 flex-1 flex items-end">
          <div className="p-4 sm:p-6 flex flex-col">
            <h3 className="mt-0.5 text-base xl:text-lg text-white">
              {article.title}
            </h3>

            <span className="font-medium text-sm text-white/90 mt-1">
              {getHowManyTimePassed(article.date)}
            </span>
          </div>
        </div>
      </article>
    </LinkWrapper>
  );
};

const CardHorizontal = ({ article }: { article: TArticle }) => {
  return (
    <article className="flex items-center h-full">
      <img
        alt={article.title}
        src={article.thumbnail}
        className="h-20 w-20 rounded-lg object-cover"
      />

      <div className="p-4 sm:p-6 flex flex-col">
        <LinkWrapper article={article}>
          <h3 className="mt-0.5 text-base xl:text-lg text-white">
            {article.title}
          </h3>
        </LinkWrapper>

        <span className="font-medium text-sm text-white/90">
          {getHowManyTimePassed(article.date)}
        </span>
      </div>
    </article>
  );
};

export default async function BeInCrypto() {
  const source = getSource("beincrypto");
  if (!source) return null;

  const _articles = await getArticlesForSource("beincrypto", 0);

  // @ts-ignore
  const { items }: { items: TArticle[] } = _articles;

  if (!items) return null;

  const articles = items.slice(0, 6);

  if (articles.length < 6) return null;

  return (
    <div className="bg-[#172132] rounded-lg">
      <Section className="!p-8 lg:!p-12">
        <div className="flex">
          <div className="flex items-center border-b-2 pb-2">
            <img src={source.logo} alt={source.name} className="h-10" />
            <h2 className="text-2xl font-bold ml-2 text-white">
              {source.name}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6 mt-8">
          <div className="col-span-4 md:col-span-2">
            <Card article={articles[0]} />
          </div>
          <div className="col-span-2 md:col-span-1">
            <Card article={articles[1]} />
          </div>
          <div className="col-span-2 md:col-span-1">
            <Card article={articles[2]} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 mt-4">
          <CardHorizontal article={articles[3]} />
          <CardHorizontal article={articles[4]} />
          <CardHorizontal article={articles[5]} />
        </div>
      </Section>
    </div>
  );
}
