# Crypto News Aggregator

A modern cryptocurrency news aggregator built with Next.js that collects and displays news from various crypto-focused publications.

## Overview

This application aggregates news from multiple cryptocurrency news sources, stores them in a MongoDB database, and presents them in a clean, modern interface. It's designed to be a one-stop destination for staying updated with the latest developments in the cryptocurrency world.

## Features

- **Multi-source News Aggregation**: Collects news from 9 major crypto publications including BeInCrypto, Bitcoin News, Bitcoin Magazine, Coin Gape, Crypto Potato, Crypto Slate, The Defiant, Forkast, and Protos.
- **Modern UI**: Clean, responsive interface built with Next.js and Tailwind CSS.
- **Performance Optimized**: Uses memoization for database queries to reduce load and improve performance.
- **Popular Articles**: Tracks article read counts to display popular articles from each source.
- **MongoDB Integration**: Stores and retrieves news articles from MongoDB.
- **Server-side Rendering**: Leverages Next.js server components for improved performance and SEO.

## Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Next.js API routes, MongoDB
- **Authentication**: NextAuth.js
- **Analytics**: Vercel Analytics
- **Database**: MongoDB (via Mongoose)
- **Deployment**: Vercel (recommended)

## Project Structure

- `/app`: Next.js application code
  - `/components`: UI components
  - `/api`: API routes
  - `actions.ts`: Server actions for data fetching
  - `utils.ts`: Utility functions
- `/mongo`: MongoDB connection and models
  - `/models`: Database schemas
  - `client.ts`: MongoDB client with memoized query functions
- `sources.json`: Configuration for news sources
- `stopWords.json`: List of common words to exclude from keyword extraction
- `types.d.ts`: TypeScript type definitions

## Getting Started

### Prerequisites

- Node.js 18 or later
- MongoDB database (local or cloud-based)

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
MONGO_CONNECTION_STRING=your_mongodb_connection_string
BASE_URL=your_base_url
```

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

The application uses a MongoDB schema for news articles with the following structure:

- `id`: Unique identifier for the article
- `url`: Original article URL
- `title`: Article title
- `content`: Summary content
- `full_content`: Complete article content
- `slug`: URL-friendly version of the title
- `thumbnail`: Image URL
- `date`: Publication timestamp
- `is_external`: Flag for external articles
- `readCount`: Number of times the article has been read
- `categories`: Array of article categories
- `source`: Source publication identifier

## Deployment

The application is optimized for deployment on Vercel. Follow these steps:

1. Push your code to a Git repository
2. Import the project into Vercel
3. Configure the environment variables
4. Deploy

## License

This project is licensed under the terms included in the LICENSE file.
