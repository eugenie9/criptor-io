import { describe, it, expect } from "vitest";
import {
  formatPrice,
  getSource,
  calculateMinutesToRead,
  extractKeywords,
  shorten,
} from "@/app/utils";

// ── formatPrice ────────────────────────────────────────────────────────

describe("formatPrice", () => {
  it("formats a whole number with 2 decimal places", () => {
    expect(formatPrice("67,341.52".replace(/,/g, ""))).toBe("67,341.52");
  });

  it("handles numeric input", () => {
    expect(formatPrice(67341.52)).toBe("67,341.52");
  });

  it("returns the original value for NaN input", () => {
    expect(formatPrice("not-a-number")).toBe("not-a-number");
  });

  it("formats zero", () => {
    expect(formatPrice(0)).toBe("0");
  });

  it("formats negative numbers", () => {
    const result = formatPrice(-123.45);
    expect(result).toContain("-123.45");
  });

  it("formats large numbers with commas", () => {
    expect(formatPrice(1234567.89)).toBe("1,234,567.89");
  });

  it("handles numbers with many decimal places", () => {
    const result = formatPrice(0.12345678);
    expect(result).toBe("0.12345678");
  });

  it("strips trailing zeros after decimal", () => {
    expect(formatPrice(1.5)).toBe("1.5");
  });
});

// ── getSource ──────────────────────────────────────────────────────────

describe("getSource", () => {
  it("returns BeInCrypto for beincrypto id", () => {
    expect(getSource("beincrypto")).toEqual({
      name: "BeInCrypto",
      logo: "/images/beincrypto-logo.jpeg",
    });
  });

  it("returns empty strings for unknown id", () => {
    expect(getSource("unknown")).toEqual({ name: "", logo: "" });
  });

  it("returns correct data for crypto_slate", () => {
    expect(getSource("crypto_slate")).toEqual({
      name: "Crypto Slate",
      logo: "/images/crypto-slate-logo.jpeg",
    });
  });

  it("returns correct data for defiant", () => {
    expect(getSource("defiant")).toEqual({
      name: "The Defiant",
      logo: "/images/defiant-logo.jpeg",
    });
  });
});

// ── calculateMinutesToRead ─────────────────────────────────────────────

describe("calculateMinutesToRead", () => {
  it("calculates reading time for short content", () => {
    const content = Array(200).fill("word").join(" ");
    expect(calculateMinutesToRead(content)).toBe(1);
  });

  it("calculates reading time for longer content", () => {
    const content = Array(400).fill("word").join(" ");
    expect(calculateMinutesToRead(content)).toBe(2);
  });

  it("handles HTML tags in content", () => {
    const content = "<p>" + Array(200).fill("word").join(" ") + "</p>";
    expect(calculateMinutesToRead(content)).toBe(1);
  });

  it("handles empty content", () => {
    expect(calculateMinutesToRead("")).toBe(0);
  });
});

// ── extractKeywords ────────────────────────────────────────────────────

describe("extractKeywords", () => {
  it("extracts keywords from content", () => {
    const content =
      "Bitcoin price surges as Bitcoin market rallies. Bitcoin continues to grow.";
    const keywords = extractKeywords(content);
    expect(keywords.length).toBeGreaterThan(0);
    expect(keywords).toContain("bitcoin");
  });

  it("removes HTML tags before keyword extraction", () => {
    const content =
      '<figure class="img"><img src="test.jpg"/></figure><p>Bitcoin price analysis</p>';
    const keywords = extractKeywords(content);
    // Should not contain HTML artifacts
    keywords.forEach((kw) => {
      expect(kw).not.toContain("<");
      expect(kw).not.toContain(">");
    });
  });

  it("returns keywords from full content", () => {
    const content = `Ethereum blockchain technology is transforming decentralized finance.
      Smart contracts on Ethereum enable new financial primitives.
      The Ethereum network continues to evolve with layer 2 scaling solutions.`;
    const keywords = extractKeywords(content);
    expect(keywords).toContain("ethereum");
  });
});

// ── shorten ────────────────────────────────────────────────────────────

describe("shorten", () => {
  it("truncates text at the nearest period to the given size", () => {
    const text = "First sentence. Second sentence. Third sentence.";
    const result = shorten(text, 20);
    // Should end at a period near position 20
    expect(result.endsWith(".")).toBe(true);
  });

  it("returns original text if no periods found", () => {
    const text = "No periods here just a long string";
    expect(shorten(text, 10)).toBe(text);
  });
});
