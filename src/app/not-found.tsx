import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow text-gold">House of Kani</p>
        <h1 className="display-1 mt-4">Page not found</h1>
        <p className="body-editorial mt-4 text-charcoal/70">
          The page you&apos;re looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="nav-label mt-8 inline-block border-b border-gold pb-1 text-charcoal"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}
