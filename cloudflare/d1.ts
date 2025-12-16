const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const CLOUDFLARE_D1_TOKEN = process.env.CLOUDFLARE_D1_TOKEN;
const CLOUDFLARE_D1_ID = process.env.CLOUDFLARE_D1_ID;

const D1_API_URL = `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/d1/database/${CLOUDFLARE_D1_ID}/query`;

export default async function d1Query(
  sql: string,
  params: any[] = []
): Promise<any[]> {
  // Replace multiline SQL with single space for logging and execution
  const singleLineSql = sql
    .replace(/[\r\n]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const res = await fetch(D1_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${CLOUDFLARE_D1_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sql, params }),
    cache: "no-store",
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(
      `D1 Query failed: ${res.status} ${res.statusText} ${JSON.stringify(
        data.errors
      )}, sql: ${singleLineSql}, params: ${JSON.stringify(params)}`
    );
  }

  const data = await res.json();

  if (data.success) {
    return data.result && data.result[0] && data.result[0].results
      ? data.result[0].results
      : [];
  } else {
    console.log(data.errors);
    throw new Error(`D1 Query error: ${JSON.stringify(data.errors)}`);
  }
}
