import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-line px-6 py-24 text-center dark:border-line-dark">
      <h1 className="font-display text-2xl font-bold text-ink dark:text-ink-dark">
        Page not found
      </h1>
      <p className="max-w-sm text-sm text-ink-soft dark:text-ink-dark-soft">
        The page you are looking for does not exist or may have moved.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-600"
      >
        Back to catalog
      </Link>
    </div>
  );
}
