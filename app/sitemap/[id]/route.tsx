import { getSitemapForSource } from "@/app/actions";
import { NextRequest } from "next/server";

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
  const source = id.replace(".xml", "");

  const data = await getSitemapForSource(source);

  let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xmlContent += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  data.forEach((item: { slug: string; date: string }) => {
    xmlContent += `  <url>\n`;
    xmlContent += `    <loc>https://www.criptor.net/publisher/${source}/${item.slug}</loc>\n`;
    xmlContent += `    <lastmod>${new Date(
      item.date
    ).toISOString()}</lastmod>\n`;
    xmlContent += `    <changefreq>weekly</changefreq>\n`;
    xmlContent += `    <priority>0.7</priority>\n`;
    xmlContent += `  </url>\n`;
  });

  xmlContent += `</urlset>`;

  return new Response(xmlContent, { headers: { "Content-Type": "text/xml" } });
}
