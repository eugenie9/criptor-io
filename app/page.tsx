import AskMore from "./components/AskMore";
import { getArticles } from "./actions";
import ItemLeftRight from "./components/ItemLeftRight";
import ItemVertical from "./components/ItemVertical";

export const revalidate = 60;

type TArticleWithPubDate = TArticle & {
  pubDate: string;
};

export default async function News() {
  const today = new Date();

  const todayString = today.toISOString().split("T")[0];

  // @ts-ignore
  const data: {
    items: TArticleWithPubDate[];
    lastEvaluatedKey: TLastEvaluatedKeyForAllSources;
  } = await getArticles("News " + todayString);
  const { items } = data;
  let { lastEvaluatedKey } = data;
  if (typeof lastEvaluatedKey === "undefined" && items.length) {
    lastEvaluatedKey = {
      pubDate: items[items.length - 1].pubDate,
      date: items[items.length - 1].date,
    };
  }

  return (
    <>
      {items.length == 1 && (
        <div className="grid grid-cols-7 gap-6 gap-y-2">
          <div className="col-span-7 lg:col-span-4">
            <ItemVertical item={items[0]} />
          </div>
        </div>
      )}

      {items.length == 2 && (
        <div className="grid grid-cols-7 gap-6 gap-y-2">
          <div className="col-span-7 lg:col-span-4">
            <ItemVertical item={items[0]} />
          </div>
          <div className="col-span-7 md:col-span-7 lg:col-span-3 flex flex-col justify-center">
            <ItemLeftRight item={items[1]} orientation={"right"} />
          </div>
        </div>
      )}

      {items.length >= 3 && (
        <div className="grid grid-cols-7 gap-6 gap-y-2">
          <div className="col-span-7 lg:col-span-4">
            <ItemVertical item={items[0]} />
          </div>
          <div className="col-span-7 md:col-span-7 lg:col-span-3 flex flex-col justify-center">
            <ItemLeftRight item={items[1]} orientation={"right"} />
            <ItemLeftRight item={items[2]} orientation={"right"} />
          </div>
        </div>
      )}

      <div className="grid grid-cols-12 gap-6 gap-y-2 pb-4">
        {items.map((item, index) => {
          if (index < 3) return;

          return (
            <div
              className={`col-span-12 md:col-span-6 lg:col-span-4`}
              key={item.url}
            >
              <ItemVertical item={item} />
            </div>
          );
        })}
      </div>

      <AskMore lastEvaluatedKey={lastEvaluatedKey} />
    </>
  );
}
