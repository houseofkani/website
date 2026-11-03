import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { JournalPagination, journalPageHref } from "@/components/JournalPagination";

function render(props: { page: number; totalPages: number }) {
  return renderToStaticMarkup(createElement(JournalPagination, props));
}

describe("journalPageHref", () => {
  it("drops the query on the first page and keeps it afterwards", () => {
    expect(journalPageHref(1)).toBe("/journal");
    expect(journalPageHref(2)).toBe("/journal?page=2");
    expect(journalPageHref(7)).toBe("/journal?page=7");
  });
});

describe("JournalPagination", () => {
  it("renders nothing when everything fits on one page", () => {
    expect(render({ page: 1, totalPages: 1 })).toBe("");
  });

  it("offers only 'older' on the first page", () => {
    const html = render({ page: 1, totalPages: 3 });

    expect(html).toContain('aria-label="Journal pagination"');
    expect(html).toContain("Page 1 of 3");
    expect(html).toContain('rel="next"');
    expect(html).toContain('href="/journal?page=2"');
    expect(html).not.toContain('rel="prev"');
  });

  it("offers both directions mid-archive, linking page 1 back to /journal", () => {
    const html = render({ page: 2, totalPages: 3 });

    expect(html).toContain('rel="prev"');
    expect(html).toContain('href="/journal"');
    expect(html).toContain('rel="next"');
    expect(html).toContain('href="/journal?page=3"');
    expect(html).toContain("Page 2 of 3");
  });

  it("offers only 'newer' on the last page", () => {
    const html = render({ page: 3, totalPages: 3 });

    expect(html).toContain('rel="prev"');
    expect(html).toContain('href="/journal?page=2"');
    expect(html).not.toContain('rel="next"');
    expect(html).toContain("Page 3 of 3");
  });
});
