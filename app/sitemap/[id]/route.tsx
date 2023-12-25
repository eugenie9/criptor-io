import { NextRequest } from "next/server";

const REMOTE_SITEMAP_URL = process.env.REMOTE_SITEMAP_URL;

const sources = [
  "beincrypto.xml",
  "bitcoin_news.xml",
  "bitcoin_magazine.xml",
  "coin_gape.xml",
  "crypto_potato.xml",
  "crypto_slate.xml",
  "defiant.xml",
  "forkast.xml",
  "protos.xml",
];

export const revalidate = 60 * 60; // 1 hour in seconds

export async function GET(req: NextRequest) {
  const url = new URL(req.nextUrl);
  const id = url.pathname.split("/")[2];

  if (!sources.includes(id)) {
    return new Response("Not found", { status: 404 });
  }

  const data = await fetch(`${REMOTE_SITEMAP_URL}/${id}`);
  const xmlContent = await data.text();

  return new Response(xmlContent, { headers: { "Content-Type": "text/xml" } });
}
