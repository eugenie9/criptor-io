type TArticle = {
  id: string;
  title: string;
  content: string;
  full_content: string;
  slug: string;
  url: string;
  thumbnail: string;
  date: number;
  source: string;
};

type TLastEvaluatedKeyForAllSources = {
  pubDate: string;
  date: number;
};

type TLastEvaluatedKeyForASource = {
  source: string;
  date: number;
};
