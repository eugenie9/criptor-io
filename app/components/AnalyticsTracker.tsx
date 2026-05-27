"use client";

import { useEffect, useRef } from "react";
import { recordEvent } from "@/sqlite/events";

type AnalyticsTrackerProps = {
  /** Event name to fire (e.g. "page-view", "article-read", "publisher-view") */
  event: string;
  /** Additional metadata to attach to the event */
  metadata?: Record<string, unknown>;
  /** Only fire when this condition is true (defaults to true) */
  fireOnce?: boolean;
};

/**
 * Client component that fires an analytics event on mount.
 * Drop it into any server-component page or layout to track page views.
 *
 * Example:
 *   <AnalyticsTracker event="page-view" metadata={{ path: "/home" }} />
 *   <AnalyticsTracker event="article-read" metadata={{ articleId: "abc", slug: "news" }} />
 */
export default function AnalyticsTracker({
  event,
  metadata = {},
  fireOnce = true,
}: AnalyticsTrackerProps) {
  const firedRef = useRef(false);

  useEffect(() => {
    if (fireOnce && firedRef.current) return;
    firedRef.current = true;

    recordEvent(event, {
      ...metadata,
      // Add client-side context automatically
      path:
        metadata.path ??
        (typeof window !== "undefined" ? window.location.pathname : ""),
      referrer:
        typeof document !== "undefined"
          ? document.referrer || undefined
          : undefined,
    });
  }, [event]); // eslint-disable-line react-hooks/exhaustive-deps

  // This component renders nothing
  return null;
}
