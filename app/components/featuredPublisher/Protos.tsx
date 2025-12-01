import { getArticlesForSource } from "@/app/actions";
import { getHowManyTimePassed, getSource } from "@/app/utils";
import Section from "../Section";
import LinkWrapper from "../LinkWrapper";

const Card = ({ article }: { article: TArticle }) => {
  return (
    <LinkWrapper article={article}>
      <article className="relative overflow-hidden rounded-lg shadow transition hover:shadow-lg h-full min-h-[240px] flex">
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

            <span className="font-medium text-xs text-white/90">
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
    <article className="flex items-center">
      <div className="py-2 flex flex-1 flex-col pr-4">
        <LinkWrapper article={article}>
          <h3 className="mt-0.5 text-base xl:text-lg font-medium">
            {article.title}
          </h3>
        </LinkWrapper>

        <span className="font-medium text-sm mt-1">
          {getHowManyTimePassed(article.date)}
        </span>
      </div>

      <img
        alt={article.title}
        src={article.thumbnail}
        className="h-24 w-24 rounded-lg object-cover"
      />
    </article>
  );
};

export default async function Protos() {
  const source = getSource("protos");
  if (!source) return null;

  const _articles = await getArticlesForSource("protos", 0);

  // @ts-ignore
  const { items }: { items: TArticle[] } = _articles;

  if (!items) return null;

  const articles = items.slice(0, 6);

  if (articles.length < 6) return null;

  return (
    <div className="bg-gradient-to-b from-[#A3C92C]/90 to-[#A3C92C]/80 rounded-lg">
      <Section className="p-4 md:p-8 lg:p-12">
        <div className="flex">
          <div className="flex items-center border-b-2 border-black pb-2">
            <img src={source.logo} alt={source.name} className="h-10" />
            <h2 className="text-2xl font-bold ml-2">{source.name}</h2>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-6 mt-8 space-x-4">
          <div className="col-span-5 md:col-span-3">
            <Card article={articles[0]} />
          </div>
          <div className="col-span-5 md:col-span-2 grid space-y-2">
            <CardHorizontal article={articles[1]} />
            <CardHorizontal article={articles[2]} />
            <CardHorizontal article={articles[3]} />
            <CardHorizontal article={articles[4]} />
          </div>
        </div>
      </Section>
    </div>
  );
}
