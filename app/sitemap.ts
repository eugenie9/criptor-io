import { MetadataRoute } from "next";
import sources from "@/sources.json";
const BASE_URL = process.env.BASE_URL || "";

// Sub-sitemaps from @frontend/app/robots.ts
const subSitemaps = [
  "/sitemap/beincrypto.xml",
  "/sitemap/bitcoin_news.xml",
  "/sitemap/bitcoin_magazine.xml",
  "/sitemap/coin_gape.xml",
  "/sitemap/crypto_potato.xml",
  "/sitemap/crypto_slate.xml",
  "/sitemap/defiant.xml",
  "/sitemap/forkast.xml",
  "/sitemap/protos.xml",
].map((path) => ({
  url: `${BASE_URL}${path}`,
  changeFrequency: "hourly" as const,
}));

const publishers: {
  url: string;
  changeFrequency: "always";
}[] = sources.map((source) => {
  return {
    url: `${BASE_URL}/publisher/${source.id}`,
    changeFrequency: "always",
  };
});

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      changeFrequency: "always",
    },
    {
      url: `${BASE_URL}/about`,
      changeFrequency: "weekly",
    },
    {
      url: `${BASE_URL}/info/cookie-policy`,
      changeFrequency: "weekly",
    },
    {
      url: `${BASE_URL}/info/disclaimer`,
      changeFrequency: "weekly",
    },
    {
      url: `${BASE_URL}/info/privacy-policy`,
      changeFrequency: "weekly",
    },
    {
      url: `${BASE_URL}/info/terms-of-service`,
      changeFrequency: "weekly",
    },
    ...publishers,
    ...subSitemaps,
  ];
}
