"use client";

import { getProducts } from "@/services/products";
import { Product } from "@/types/product";
import { AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { ProductCard } from "./product-card";
import { useExplorerStore } from "@/store/app-store";
import { ProductGridSkeleton } from "./product-skeleton";
import { EmptyState, ErrorState } from "./state-message";

const LIMIT = 10;

export default function ProductList() {
  const { search, category, favoritesOnly, favorites } = useExplorerStore();

  const [products, setProducts] = useState<Product[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [total, setTotal] = useState(0);

  const skipRef = useRef(0);
  const loadingRef = useRef(false);
  const requestIdRef = useRef(0);

  const debounced = search.trim().toLowerCase();

  const fetchPage = useCallback(
    async (reset: boolean) => {
      if (loadingRef.current) return;
      loadingRef.current = true;
      reset ? setInitialLoading(true) : setLoadingMore(true);
      setError("");

      const thisRequestId = reset
        ? ++requestIdRef.current
        : requestIdRef.current;
      const nextSkip = reset ? 0 : skipRef.current;

      try {
        const data = await getProducts({
          skip: nextSkip,
          limit: LIMIT,
          query: debounced,
          category,
        });

        if (thisRequestId !== requestIdRef.current) return;

        setProducts((current) =>
          reset ? data.products : [...current, ...data.products],
        );
        setTotal(data.total);
        skipRef.current = nextSkip + data.products.length;
      } catch {
        if (thisRequestId === requestIdRef.current) {
          setError("We could not load the catalog. Please try again.");
        }
      } finally {
        loadingRef.current = false;
        setInitialLoading(false);
        setLoadingMore(false);
      }
    },
    [category, debounced],
  );

  useEffect(() => {
    skipRef.current = 0;
    setProducts([]);
    void fetchPage(true);
  }, [fetchPage]);

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const hasMore = products.length < total;

  useEffect(() => {
    if (!hasMore) return;
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingRef.current) {
          void fetchPage(false);
        }
      },
      { rootMargin: "300px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, fetchPage]);

  const visibleProducts = favoritesOnly
    ? products.filter((product) => favorites.includes(product.id))
    : products;

  if (initialLoading) {
    return <ProductGridSkeleton />;
  }

  if (error && products.length === 0) {
    return <ErrorState message={error} onRetry={() => fetchPage(true)} />;
  }

  if (visibleProducts.length === 0) {
    return <EmptyState searchTerm={debounced} />;
  }

  return (
    <div className="flex p-4 flex-col h-full gap-4">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <AnimatePresence initial={false}>
          {visibleProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={index < 5}
            />
          ))}
        </AnimatePresence>
      </div>

      {hasMore && (
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
