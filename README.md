# Crypto News Aggregator

A modern cryptocurrency news aggregator built with Next.js that collects and displays news from various crypto-focused publications.

## Overview

This application aggregates news from multiple cryptocurrency news sources, stores them in a Cloudflare D1 database, and presents them in a clean, modern interface. It's designed to be a one-stop destination for staying updated with the latest developments in the cryptocurrency world.

## Features

- **Multi-source News Aggregation**: Collects news from 9 major crypto publications including BeInCrypto, Bitcoin News, Bitcoin Magazine, Coin Gape, Crypto Potato, Crypto Slate, The Defiant, Forkast, and Protos.
- **Modern UI**: Clean, responsive interface built with Next.js and Tailwind CSS.
- **Performance Optimized**: Uses memoization for database queries to reduce load and improve performance.
- **Popular Articles**: Tracks article read counts to display popular articles from each source.
- **Cloudflare D1 Integration**: Stores and retrieves news articles from Cloudflare D1 database.
- **Server-side Rendering**: Leverages Next.js server components for improved performance and SEO.

## Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Next.js API routes, Cloudflare D1
- **Analytics**: Vercel Analytics
- **Database**: Cloudflare D1 (SQLite)
- **Deployment**: Vercel (recommended)

## Project Structure

- `/app`: Next.js application code
  - `/components`: UI components
  - `/api`: API routes
  - `actions.ts`: Server actions for data fetching
  - `utils.ts`: Utility functions
- `/cloudflare`: Cloudflare D1 integration
  - `d1.ts`: D1 query client for executing SQL queries
  - `client.ts`: Cloudflare D1 client with memoized query functions
- `sources.json`: Configuration for news sources
- `stopWords.json`: List of common words to exclude from keyword extraction
- `types.d.ts`: TypeScript type definitions

## Getting Started

### Prerequisites

- Node.js 24 or later
- Cloudflare account with D1 database enabled

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id
CLOUDFLARE_D1_TOKEN=your_cloudflare_api_token
CLOUDFLARE_D1_ID=your_d1_database_id
BASE_URL=your_base_url
```

You can find these values in your Cloudflare dashboard under Account ID and create an API Token with D1 permissions.

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Data Model

The application uses a Cloudflare D1 SQLite database with the following `articles` table structure:

```sql
CREATE TABLE articles (
  id TEXT PRIMARY KEY,
  url TEXT,
  title TEXT,
  content TEXT,
  full_content TEXT,
  slug TEXT,
  thumbnail TEXT,
  date INTEGER,
  is_external BOOLEAN,
  read_count INTEGER DEFAULT 0,
  categories TEXT,
  source TEXT,
  UNIQUE(source, slug)
);
```

Column descriptions:
- `id`: Unique identifier for the article
- `url`: Original article URL
- `title`: Article title
- `content`: Summary content
- `full_content`: Complete article content
- `slug`: URL-friendly version of the title
- `thumbnail`: Image URL
- `date`: Publication timestamp (Unix timestamp in milliseconds)
- `is_external`: Flag for external articles
- `read_count`: Number of times the article has been read
- `categories`: Comma-separated or JSON string of article categories
- `source`: Source publication identifier

## Deployment

The application is optimized for deployment on Vercel. Follow these steps:

1. Push your code to a Git repository
2. Import the project into Vercel
3. Configure the environment variables
4. Deploy

## License

This project is licensed under the terms included in the LICENSE file.
