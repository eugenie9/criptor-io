import { MetadataRoute } from "next";
import sources from "@/sources.json";
const BASE_URL = process.env.BASE_URL || "";

// Sub-sitemaps — served from app/sitemap-sources/[id]/route.tsx to avoid
// Next.js metadata route collision (__metadata_id__ vs id)
const subSitemaps = [
  "/sitemap-sources/beincrypto.xml",
  "/sitemap-sources/bitcoin_news.xml",
  "/sitemap-sources/bitcoin_magazine.xml",
  "/sitemap-sources/coin_gape.xml",
  "/sitemap-sources/crypto_potato.xml",
  "/sitemap-sources/crypto_slate.xml",
  "/sitemap-sources/defiant.xml",
  "/sitemap-sources/forkast.xml",
  "/sitemap-sources/protos.xml",
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
