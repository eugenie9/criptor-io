import { MetadataRoute } from "next";
import sources from "@/sources.json";

const publishers: {
  url: string;
  changeFrequency: "always";
}[] = sources.map((source) => {
  return {
    url: `https://criptor.io/publisher/${source.id}`,
    changeFrequency: "always",
  };
});

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://criptor.io",
      changeFrequency: "always",
    },
    {
      url: "https://criptor.io/about",
      changeFrequency: "weekly",
    },
    {
      url: "https://criptor.io/info/cookie-policy",
      changeFrequency: "weekly",
    },
    {
      url: "https://criptor.io/info/disclaimer",
      changeFrequency: "weekly",
    },
    {
      url: "https://criptor.io/info/privacy-policy",
      changeFrequency: "weekly",
    },
    {
      url: "https://criptor.io/info/terms-of-service",
      changeFrequency: "weekly",
    },
    ...publishers,
  ];
}
