import { MetadataRoute } from "next";
const BASE_URL = process.env.BASE_URL;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/", // Allow everything
    },
    sitemap: [
      `${BASE_URL}/sitemap.xml`,
      `${BASE_URL}/sitemap-sources/beincrypto.xml`,
      `${BASE_URL}/sitemap-sources/bitcoin_news.xml`,
      `${BASE_URL}/sitemap-sources/bitcoin_magazine.xml`,
      `${BASE_URL}/sitemap-sources/coin_gape.xml`,
      `${BASE_URL}/sitemap-sources/crypto_potato.xml`,
      `${BASE_URL}/sitemap-sources/crypto_slate.xml`,
      `${BASE_URL}/sitemap-sources/defiant.xml`,
      `${BASE_URL}/sitemap-sources/forkast.xml`,
      `${BASE_URL}/sitemap-sources/protos.xml`,
    ],
  };
}
