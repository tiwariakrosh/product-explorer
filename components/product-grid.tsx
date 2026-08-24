import { AnimatePresence } from "framer-motion";
import { Product } from "@/types/product";
import { ProductCard } from "./product-card";

export function ProductGrid({ products }: { products: Product[] }) {
  return (
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
  );
}
