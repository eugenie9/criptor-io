import { MetadataRoute } from "next";
import sources from "@/sources.json";

const publishers: {
  url: string;
  changeFrequency: "always";
}[] = sources.map((source) => {
  return {
    url: `https://www.criptor.io/publisher/${source.id}`,
    changeFrequency: "always",
  };
});

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.criptor.io",
      changeFrequency: "always",
    },
    {
      url: "https://www.criptor.io/about",
      changeFrequency: "weekly",
    },
    {
      url: "https://www.criptor.io/info/cookie-policy",
      changeFrequency: "weekly",
    },
    {
      url: "https://www.criptor.io/info/disclaimer",
      changeFrequency: "weekly",
    },
    {
      url: "https://www.criptor.io/info/privacy-policy",
      changeFrequency: "weekly",
    },
    {
      url: "https://www.criptor.io/info/terms-of-service",
      changeFrequency: "weekly",
    },
    ...publishers,
  ];
}
