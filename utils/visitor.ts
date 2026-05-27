/**
 * Generates and persists a stable anonymous visitor identifier.
 *
 * The ID is stored in localStorage and survives page refreshes, browser
 * restarts, and tab changes. It only resets when the user manually clears
 * browser storage or switches devices/browsers — exactly what you want
 * for anonymous analytics when there is no authenticated user.
 *
 * Falls back to a session-only ID (held in a closure) when localStorage
 * is unavailable (SSR, incognito with strict storage, etc.).
 */

const STORAGE_KEY = "_cvid";

let memoryFallback: string | null = null;

function generateId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Legacy fallback: manual UUID v4 generation
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function getLocalStorage(): Storage | null {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      // Test write to detect private Safari / storage-full scenarios
      const testKey = "__storage_test__";
      window.localStorage.setItem(testKey, "1");
      window.localStorage.removeItem(testKey);
      return window.localStorage;
    }
  } catch {
    // localStorage blocked or unavailable
  }
  return null;
}

/**
 * Returns the persistent anonymous visitor identifier.
 * Generates and stores a new one on first call.
 * Safe to call during SSR (returns a fallback).
 */
export function getVisitorId(): string {
  const storage = getLocalStorage();

  if (storage) {
    const existing = storage.getItem(STORAGE_KEY);
    if (existing) return existing;

    const id = generateId();
    storage.setItem(STORAGE_KEY, id);
    return id;
  }

  // No localStorage — keep the same ID in memory for this session at least
  if (!memoryFallback) {
    memoryFallback = generateId();
  }
  return memoryFallback;
}

/**
 * Resets the identifier (useful for logout / privacy settings).
 */
export function resetVisitorId(): void {
  const storage = getLocalStorage();
  if (storage) {
    storage.removeItem(STORAGE_KEY);
  }
  memoryFallback = null;
}
