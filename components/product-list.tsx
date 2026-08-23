"use client";

import { getProducts } from "@/services/products";
import { Product } from "@/types/product";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ProductCard } from "./product-card";
import { Loader } from "lucide-react";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    getProducts({ skip: 0, limit: 10 })
      .then((data) => {
        if (cancelled) return;
        setProducts(data.products);
      })
      .catch(() => {
        if (!cancelled) {
          setError("We could not load the catalog. Please try again.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);
  return (
    <div className="flex  flex-col h-full gap-4">
      {loading && (
        <Loader size={32} className="animate-spin text-muted-foreground" />
      )}

      {error && <div className="text-center text-sm text-red-500">{error}</div>}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <AnimatePresence initial={false}>
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={index < 5}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
