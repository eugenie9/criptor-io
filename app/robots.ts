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
      `${BASE_URL}/sitemap/beincrypto.xml`,
      `${BASE_URL}/sitemap/bitcoin_news.xml`,
      `${BASE_URL}/sitemap/bitcoin_magazine.xml`,
      `${BASE_URL}/sitemap/coin_gape.xml`,
      `${BASE_URL}/sitemap/crypto_potato.xml`,
      `${BASE_URL}/sitemap/crypto_slate.xml`,
      `${BASE_URL}/sitemap/defiant.xml`,
      `${BASE_URL}/sitemap/forkast.xml`,
      `${BASE_URL}/sitemap/protos.xml`,
    ],
  };
}
