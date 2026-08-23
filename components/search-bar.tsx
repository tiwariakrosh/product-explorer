"use client";

import { useExplorerStore } from "@/store/app-store";

export function SearchBar() {
  const { search, setSearch } = useExplorerStore();

  return (
    <div className="relative w-full">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft dark:text-ink-dark-soft"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path strokeLinecap="round" d="M21 21l-4.3-4.3" />
      </svg>
      <input
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search products..."
        aria-label="Search products"
        className="w-full rounded-xl border border-line bg-surface-raised py-2.5 pl-10 pr-9 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-line-dark dark:bg-surface-dark-raised dark:text-ink-dark dark:focus:border-brand-300"
      />
      {search && (
        <button
          type="button"
          onClick={() => setSearch("")}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-soft transition hover:text-ink dark:text-ink-dark-soft dark:hover:text-ink-dark"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            className="h-4 w-4"
          >
            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      )}
    </div>
  );
}
