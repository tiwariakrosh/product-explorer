"use client";

import { useMemo } from "react";
import { useExplorerStore } from "@/store/app-store";
import { useProductList } from "@/hooks/use-product-list";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { ProductGrid } from "@/components/product-grid";
import { ProductGridSkeleton } from "./product-skeleton";
import { EmptyState, ErrorState } from "./state-message";
import { useDebouncedValue } from "@/hooks/use-debounced-value";

export default function ProductList() {
  const { search, category, favoritesOnly, favorites } = useExplorerStore();
  const debounced = useDebouncedValue(search.trim().toLowerCase(), 300);

  const {
    products,
    initialLoading,
    loadingMore,
    error,
    hasMore,
    fetchNextPage,
    retry,
  } = useProductList(debounced, category);

  const canLoadMore = hasMore && !favoritesOnly;

  const sentinelRef = useInfiniteScroll(
    canLoadMore,
    loadingMore,
    fetchNextPage,
  );

  const visibleProducts = useMemo(
    () =>
      favoritesOnly
        ? products.filter((p) => favorites.includes(p.id))
        : products,
    [products, favoritesOnly, favorites],
  );

  const isPendingDebounce = search.trim().toLowerCase() !== debounced;

  const isLoading = initialLoading || isPendingDebounce;

  if (isLoading && products.length === 0) return <ProductGridSkeleton />;
  if (error && products.length === 0)
    return <ErrorState message={error} onRetry={retry} />;
  if (visibleProducts.length === 0)
    return <EmptyState searchTerm={debounced} />;

  return (
    <div className="flex p-4 flex-col h-full gap-4">
      <ProductGrid products={visibleProducts} />

      {canLoadMore && (
        <div ref={sentinelRef} className="flex justify-center py-4">
          {loadingMore && (
            <span className="text-sm text-muted-foreground">Loading more…</span>
          )}
        </div>
      )}

      {error && products.length > 0 && (
        <p className="text-center text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
