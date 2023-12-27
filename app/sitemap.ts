import { MetadataRoute } from "next";
import sources from "@/sources.json";
const BASE_URL = process.env.BASE_URL || "";

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
  ];
}
