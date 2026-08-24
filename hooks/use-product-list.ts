import { useCallback, useEffect, useRef, useState } from "react";
import { getProducts, isRequestCancelled } from "@/services/products";
import { Product } from "@/types/product";
import { useAbortController } from "./use-abort-controller";

const LIMIT = 10;

export function useProductList(query: string, category: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [total, setTotal] = useState(0);

  const skipRef = useRef(0);
  const isFetchingRef = useRef(false);
  const renewSignal = useAbortController();

  const fetchPage = useCallback(
    async (reset: boolean) => {
      if (isFetchingRef.current && !reset) return;
      isFetchingRef.current = true;
      reset ? setInitialLoading(true) : setLoadingMore(true);
      setError("");

      const signal = renewSignal();
      const nextSkip = reset ? 0 : skipRef.current;

      try {
        const data = await getProducts(
          { skip: nextSkip, limit: LIMIT, query, category },
          signal,
        );
        setProducts((current) =>
          reset ? data.products : [...current, ...data.products],
        );
        setTotal(data.total);
        skipRef.current = nextSkip + data.products.length;
      } catch (err) {
        if (isRequestCancelled(err)) return;
        setError("We could not load the catalog. Please try again.");
      } finally {
        isFetchingRef.current = false;
        setInitialLoading(false);
        setLoadingMore(false);
      }
    },
    [query, category, renewSignal],
  );

  useEffect(() => {
    skipRef.current = 0;
    setProducts([]);
    void fetchPage(true);
  }, [fetchPage]);

  return {
    products,
    initialLoading,
    loadingMore,
    error,
    hasMore: products.length < total,
    fetchNextPage: () => fetchPage(false),
    retry: () => fetchPage(true),
  };
}
