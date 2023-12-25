import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/", // Allow everything
    },
    sitemap: [
      "https://www.criptor.io/sitemap.xml",
      "https://www.criptor.io/sitemap/beincrypto.xml",
      "https://www.criptor.io/sitemap/bitcoin_news.xml",
      "https://www.criptor.io/sitemap/bitcoin_magazine.xml",
      "https://www.criptor.io/sitemap/coin_gape.xml",
      "https://www.criptor.io/sitemap/crypto_potato.xml",
      "https://www.criptor.io/sitemap/crypto_slate.xml",
      "https://www.criptor.io/sitemap/defiant.xml",
      "https://www.criptor.io/sitemap/forkast.xml",
      "https://www.criptor.io/sitemap/protos.xml",
    ],
  };
}
