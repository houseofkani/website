"use client";

import Link, { useLinkStatus } from "next/link";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

import { JournalArticleSkeleton } from "@/components/JournalSkeletons";

/** Full-page skeleton shown while a journal article is being navigated to. */
function PendingArticle() {
  const { pending } = useLinkStatus();
  if (!pending) return null;

  // Portal to the body: the card may sit inside a transformed/revealed wrapper.
  return createPortal(
    <div
      className="animate-in fade-in fixed inset-0 z-50 overflow-y-auto bg-ivory duration-300"
      role="status"
      aria-busy="true"
      aria-live="polite"
    >
      <JournalArticleSkeleton />
    </div>,
    document.body,
  );
}

type JournalArticleLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

/**
 * Journal card link: keeps the normal Link behaviour but paints an article
 * skeleton while the destination loads.
 */
export function JournalArticleLink({ href, className, children }: JournalArticleLinkProps) {
  return (
    <Link href={href} className={className}>
      {children}
      <PendingArticle />
    </Link>
  );
}
