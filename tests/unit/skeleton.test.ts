import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { HomeJournalSkeleton, JournalListingSkeleton } from "@/components/Skeleton";

function count(html: string, pattern: RegExp): number {
  return html.match(pattern)?.length ?? 0;
}

describe("journal skeletons", () => {
  it("renders a featured card with picture, headline and body blocks", () => {
    const html = renderToStaticMarkup(createElement(JournalListingSkeleton));

    expect(html).toContain("Loading the Journal");
    expect(html).toContain('role="status"');
    expect(html).toContain("skeleton-block-dark"); // featured picture
    expect(html).toContain("skeleton-sheen-dim"); // dark shimmer
    expect(html).toContain("min-h-[52svh]"); // the 52svh feature frame
    expect(html).toContain("sm:grid-cols-2"); // the article grid
    // Six cards, each with a 4:3 picture frame.
    expect(count(html, /aspect-\[4\/3\]/g)).toBe(6);
    // Picture + eyebrow + headline + dek for every card.
    expect(count(html, /skeleton-block/g)).toBeGreaterThan(30);
  });

  it("renders the homepage journal block with three cards", () => {
    const html = renderToStaticMarkup(createElement(HomeJournalSkeleton));

    expect(html).toContain("Loading stories from the Journal");
    expect(count(html, /aspect-\[4\/3\]/g)).toBe(3);
    expect(html).toContain("md:grid-cols-3");
    expect(count(html, /skeleton-sheen/g)).toBeGreaterThan(3);
  });
});
