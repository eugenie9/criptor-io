import { getArticlesForSource } from "../../actions";
import { getSource, getHowManyTimePassed } from "../../utils";
import Section from "../Section";
import LinkWrapper from "../LinkWrapper";

const Card = ({ article }: { article: TArticle }) => {
  return (
    <article className="flex flex-col h-96">
      <img
        alt={article.title}
        src={article.thumbnail}
        className="h-80 w-full object-cover rounded-lg"
      />

      <div>
        <div className="py-4 px-2 flex flex-col">
          <LinkWrapper article={article}>
            <h3 className="mt-0.5 text-base xl:text-lg font-medium">
              {article.title}
            </h3>
          </LinkWrapper>

          <span className="font-medium text-sm mt-1">
            {getHowManyTimePassed(article.date)}
          </span>
        </div>
      </div>
    </article>
  );
};

export default async function CryptoSlate() {
  const source = getSource("crypto_slate");
  if (!source) return null;

  const _articles = await getArticlesForSource("crypto_slate", 0);

  // @ts-ignore
  const { items }: { items: TArticle[] } = _articles;

  if (!items) return null;

  const articles = items.slice(0, 6);

  if (articles.length < 6) return null;

  return (
    <div className="bg-gradient-to-b from-[#F0F3F7]/90 to-[#F0F3F7]/80 rounded-lg">
      <Section className="!p-8 lg:p-12">
        <div className="flex">
          <div className="flex items-center border-b-2 border-black pb-2">
            <img src={source.logo} alt={source.name} className="h-10" />
            <h2 className="text-lg font-bold ml-2">{source.name}</h2>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="col-span-3 md:col-span-1">
            <Card article={articles[0]} />
          </div>
          <div className="col-span-3 md:col-span-1">
            <Card article={articles[1]} />
          </div>
          <div className="col-span-3 md:col-span-1">
            <Card article={articles[2]} />
          </div>
        </div>
      </Section>
    </div>
  );
}
