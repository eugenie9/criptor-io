import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/", // Allow everything
    },
    sitemap: "https://criptor.io/sitemap.xml",
  };
}