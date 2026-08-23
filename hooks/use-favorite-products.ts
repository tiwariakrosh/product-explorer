import { useCallback, useEffect, useState } from "react";
import { getProduct } from "@/services/products";
import { Product } from "@/types/product";
import { useAbortController } from "./use-abort-controller";

export function useFavoriteProducts(favorites: number[]) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const renewSignal = useAbortController();

  const load = useCallback(async () => {
    if (favorites.length === 0) {
      setProducts([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");
    const signal = renewSignal();

    const settled = await Promise.allSettled(
      favorites.map((id) => getProduct(id, signal)),
    );

    const fulfilled = settled
      .filter(
        (r): r is PromiseFulfilledResult<Product> => r.status === "fulfilled",
      )
      .map((r) => r.value);

    if (fulfilled.length === 0 && favorites.length > 0) {
      setError("We could not load your favorites. Please try again.");
    }
    setProducts(fulfilled);
    setLoading(false);
  }, [favorites, renewSignal]);

  useEffect(() => {
    void load();
  }, [load]);

  return { products, loading, error, retry: load };
}
