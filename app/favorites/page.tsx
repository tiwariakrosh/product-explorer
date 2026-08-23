"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { PageTransition } from "@/components/page-transition";
import { ProductGridSkeleton } from "@/components/product-skeleton";
import { ErrorState } from "@/components/state-message";
import { ProductGrid } from "@/components/product-grid";
import { useExplorerStore } from "@/store/app-store";
import { useFavoriteProducts } from "@/hooks/use-favorite-products";

export default function FavoritesPage() {
  const { favorites } = useExplorerStore();
  console.log("🚀 ~ FavoritesPage ~ favorites:", favorites);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const { products, loading, error, retry } = useFavoriteProducts(favorites);

  const visibleProducts = useMemo(
    () => products.filter((p) => favorites.includes(p.id)),
    [products, favorites],
  );

  return (
    <PageTransition>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold tracking-tight text-ink dark:text-ink-dark sm:text-3xl">
          Your favorites
        </h1>
        <p className="mt-1 text-sm text-ink-soft dark:text-ink-dark-soft">
          Products you have saved for later.
        </p>
      </div>

      {!mounted || loading ? (
        <ProductGridSkeleton count={favorites.length || 5} />
      ) : error ? (
        <ErrorState message={error} onRetry={retry} />
      ) : visibleProducts.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-line px-6 py-16 text-center dark:border-line-dark">
          <h3 className="font-display text-base font-semibold text-ink dark:text-ink-dark">
            No favorites yet
          </h3>
          <p className="max-w-sm text-sm text-ink-soft dark:text-ink-dark-soft">
            Tap the heart on any product to save it here.
          </p>
          <Link
            href="/"
            className="mt-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-600"
          >
            Browse products
          </Link>
        </div>
      ) : (
        <ProductGrid products={visibleProducts} />
      )}
    </PageTransition>
  );
}
