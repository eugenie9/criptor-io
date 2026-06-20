import sources from "@/sources.json";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://criptor.net";

export async function GET() {
  const publisherLinks = sources
    .map(
      (s) =>
        `- [${s.name}](https://criptor.net/publisher/${s.id}) — Latest cryptocurrency news from ${s.name}`,
    )
    .join("\n");

  const publisherArticleLinks = sources
    .map(
      (s) =>
        `- [${s.name} Articles](https://criptor.net/publisher/${s.id}) — Full article feed for ${s.name} (format: /publisher/${s.id}/{slug})`,
    )
    .join("\n");

  const body = `# Criptor.net — Cryptocurrency News Aggregator

> A comprehensive RSS-based crypto news aggregator curating headlines from 9 top-tier cryptocurrency publishers. Stay updated with real-time crypto news, market data, and blockchain developments — all in one place.

## Site Overview

Criptor.net is a cryptocurrency news aggregation platform that collects, indexes, and presents articles from leading crypto news publishers. It provides a unified reading experience with article summaries, keyword extraction, read-time estimates, and full-content views — all without needing to visit multiple sites.

**Target Audience:** Crypto traders, blockchain developers, DeFi enthusiasts, NFT collectors, and anyone tracking digital asset markets.

**Core Capabilities:**
- Aggregates articles from 9 major crypto news sources
- Full-text search across all articles via Meilisearch
- Publisher-specific feeds with infinite scroll pagination
- Live cryptocurrency price ticker (BTC, ETH, SOL, XRP, DOGE, ADA, BNB, TRX, LINK, BCH)
- Global market overview (total market cap, 24h volume, BTC/ETH dominance)
- User authentication (register, login, password reset)
- User profiles with reading preferences
- Dark/light theme support
- Responsive design (mobile, tablet, desktop)

## Key Pages

### Home Page
- [Home](https://criptor.net/) — Latest aggregated crypto news from all publishers, featured articles carousel, popular articles sidebar, and market stats bar

### Publishers
- [All Publishers](https://criptor.net/publisher) — Browse all 9 tracked crypto news sources

### Individual Publisher Feeds
${publisherLinks}

### Article Pages
${publisherArticleLinks}

### Search
- [Search](https://criptor.net/search) — Full-text search across all articles using Meilisearch with relevance ranking

### Authentication
- [Register](https://criptor.net/auth/register) — Create a new user account
- [Login](https://criptor.net/auth/login) — Sign in to existing account
- [Forgot Password](https://criptor.net/auth/forgot-password) — Request password reset
- [Reset Password](https://criptor.net/auth/reset-password) — Set new password (token-based)

### User Dashboard
- [User Home](https://criptor.net/user) — Authenticated user dashboard
- [Profile](https://criptor.net/user/profile) — View and edit profile information
- [Preferences](https://criptor.net/user/preferences) — Customize reading preferences
- [Settings](https://criptor.net/user/settings) — Account settings and password change

### API Endpoints
- [User Profile API](https://criptor.net/api/user/profile) — GET/PATCH user profile data
- [Change Password API](https://criptor.net/api/user/change-password) — POST password change
- [Auth Callback](https://criptor.net/api/auth/[...all]) — Authentication provider callbacks

### Info Pages
- [About](https://criptor.net/about) — About Criptor.net
- [Privacy Policy](https://criptor.net/info/privacy-policy) — Data privacy policy
- [Terms of Service](https://criptor.net/info/terms-of-service) — Terms and conditions
- [Cookie Policy](https://criptor.net/info/cookie-policy) — Cookie usage policy
- [Disclaimer](https://criptor.net/info/disclaimer) — Content disclaimer

## Publishers Tracked

Criptor aggregates articles from these sources (identified by their slug ID):

| ID | Name | Publisher Page |
|---|---|---|
${sources.map((s) => `| \`${s.id}\` | ${s.name} | [View](https://criptor.net/publisher/${s.id}) |`).join("\n")}

Each publisher has its own dedicated page showing featured articles, top stories, and a reverse-chronological feed with infinite scroll. Article URLs follow the pattern:

\`\`\`
/publisher/{publisher-id}/{article-slug}
\`\`\`

## Content Categories

Articles cover the following cryptocurrency and blockchain topics:

- **Bitcoin (BTC)** — Price analysis, adoption news, mining, Lightning Network
- **Ethereum (ETH)** — DeFi protocols, L2 scaling, smart contracts, staking
- **Altcoins** — XRP, Solana, Cardano, Dogecoin, BNB Chain, TRON, Chainlink
- **DeFi** — Decentralized exchanges, lending protocols, yield farming
- **NFTs** — Market trends, collection launches, gaming
- **Regulation** — Global crypto policy, SEC/CFTC actions, compliance
- **Blockchain Technology** — Consensus mechanisms, interoperability, zero-knowledge proofs
- **Market Analysis** — Technical analysis, on-chain metrics, sentiment indicators
- **Exchange News** — Binance, Coinbase, Kraken, and other major exchanges
- **Web3 & Metaverse** — dApps, DAOs, virtual worlds

## Search Capabilities

The platform uses **Meilisearch** for fast, relevance-ranked full-text search:

- **Endpoint:** \`/search?q={query}\`
- **Index:** All article titles and content
- **Pagination:** Offset-based with configurable limits (1–100 results per page)
- **Attributes Returned:** Article IDs (content fetched from SQLite)
- **Rate Limiting:** 3 requests per minute per IP for newsletter subscriptions; search is cached via React \`cache()\`

## Data Freshness

- **Article Revalidation:** Pages revalidate every 60 seconds (\`revalidate = 60\`)
- **Article Storage:** SQLite database with articles indexed by source, slug, and date
- **Sort Order:** Articles are sorted by date descending (newest first)
- **Read Tracking:** Each article view increments a \`read_count\` counter
- **Popular Articles:** Top 5 most-read articles per publisher from the last 7 days
- **Article Attributes:** Extended metadata stored in a separate \`article_attributes\` table (key-value pairs per article)

## Market Data

Live cryptocurrency data is integrated:

- **Price Ticker:** Binance API — real-time prices for 10 major pairs (BTC, ETH, BNB, XRP, SOL, TRX, DOGE, ADA, BCH, LINK — all vs USDT)
- **Market Overview:** CoinGecko API — global market cap, 24h volume, BTC/ETH dominance, market sentiment
- **Display:** CryptoTicker component in the TopBar and MarketOverview/MarketStatsBar components

## Technical Stack

- **Framework:** Next.js (App Router) with standalone output mode
- **Language:** TypeScript
- **Styling:** Tailwind CSS with dark mode support
- **Fonts:** Inter (body), Montserrat (headings), Roboto Mono (monospace)
- **Database:** SQLite (remote API-based, not embedded)
- **Search:** Meilisearch
- **Authentication:** Custom auth with cookie-based sessions
- **Caching:** React \`cache()\` for per-request deduplication
- **Validation:** Zod schemas for all server actions
- **Analytics:** Google Analytics (GA4) with custom event tracking
- **Testing:** Vitest for unit tests

## Data Shapes

### Article Object (TArticle)
\`\`\`typescript
type TArticle = {
  id: string;           // Unique article identifier
  title: string;        // Article headline
  content: string;      // HTML content (truncated in listings)
  full_content: string; // Complete HTML content
  slug: string;         // URL-friendly slug
  url: string;          // Original source URL
  thumbnail: string;    // Article image URL
  date: number;         // Unix timestamp
  source: string;       // Publisher slug (e.g., "beincrypto")
  readCount: number;    // View counter
  categories: string[]; // Topic categories
  keywords?: string[];  // Extracted keywords
  summary?: string;     // Article summary
};
\`\`\`

## Optional

### Sitemaps
- [Main Sitemap](https://criptor.net/sitemap.xml) — All site routes and publisher sub-sitemaps
- Publisher-specific sitemaps:
${sources.map((s) => `  - [${s.name} Sitemap](https://criptor.net/sitemap-sources/${s.id}.xml)`).join("\n")}

### Other Machine-Readable Files
- [robots.txt](https://criptor.net/robots.txt) — Crawler directives
- [manifest](https://criptor.net/manifest.webmanifest) — PWA web app manifest

### Contact & Social
- Website: https://criptor.net
- This llms.txt is auto-generated from live data sources

---

*Last generated: ${new Date().toISOString()}*
*Format: llms.txt — a proposed standard for LLM-friendly site documentation*
*Specification: https://llmstxt.org*`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
