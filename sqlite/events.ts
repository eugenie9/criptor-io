"use client";

import { getVisitorId } from "@/utils/visitor";
import { recordEventAction } from "@/app/actions/analytics";

/**
 * Records an analytics event with the persistent anonymous visitor identifier.
 *
 * The visitor ID is resolved client-side (localStorage), then the event is
 * sent through a Server Action so the API key and endpoint URL are never
 * exposed to the browser.
 *
 * Example usage:
 *   recordEvent("page-view", { url: window.location.pathname });
 *   recordEvent("article-read", { articleId: "abc", slug: "some-slug" });
 */
export async function recordEvent(
  eventName: string,
  metadata: Record<string, unknown> = {},
) {
  try {
    const identifier = getVisitorId();
    await recordEventAction(eventName, identifier, metadata);
  } catch (error) {
    console.error(`[analytics:client] Failed for "${eventName}":`, error);
  }
}
