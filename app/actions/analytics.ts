"use server";

/**
 * Server Action for recording analytics events.
 *
 * The API key and base URL are read from server-side env vars only
 * (no NEXT_PUBLIC_ prefix) — they never reach the browser bundle.
 */

const ANALYTICS_URL = process.env.ANALYTICS_URL || "http://localhost:3000";
const API_KEY = process.env.ANALYTICS_API_KEY || "token";

export async function recordEventAction(
  eventName: string,
  identifier: string,
  metadata: Record<string, unknown>,
) {
  try {
    const response = await fetch(`${ANALYTICS_URL}/api/analytics/events`, {
      method: "POST",
      headers: {
        "X-API-Key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event_name: eventName,
        identifier,
        metadata,
      }),
    });
  } catch (error) {
    console.error(`[analytics] Failed to record event "${eventName}":`, error);
  }
}
