"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/types/product";
import { Heart, Star } from "lucide-react";
import { formatCategoryLabel, formatPrice } from "@/utils/format";
import { useExplorerStore } from "@/store/app-store";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { favorites, toggleFavorite } = useExplorerStore();
  const favorite = favorites.includes(product.id);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface-raised shadow-card transition-shadow duration-300 hover:shadow-card-hover dark:border-line-dark dark:bg-surface-dark-raised"
    >
      <Link
        href={`/products/${product.id}`}
        className="flex h-full flex-col focus:outline-none"
        aria-label={`View details for ${product.title}`}
      >
        <div className="relative aspect-square w-full overflow-hidden bg-surface dark:bg-surface-dark">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 240px"
            priority={priority}
            className="object-contain p-6 transition-transform duration-500 ease-out group-hover:scale-105"
          />
          {product.discountPercentage > 0 && (
            <span className="absolute left-3 top-3 rounded-full bg-brand-500 px-2 py-0.5 font-mono text-[11px] font-medium text-white">
              -{Math.round(product.discountPercentage)}%
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-2 p-4">
          <span className="font-mono text-[11px] uppercase tracking-wider text-brand-500 dark:text-brand-300">
            {formatCategoryLabel(product.category)}
          </span>
          <h3 className="line-clamp-2 font-display text-sm font-semibold leading-snug text-ink dark:text-ink-dark">
            {product.title}
          </h3>
          <div className="mt-auto flex items-center gap-1 font-mono text-xs text-muted-foreground">
            <Star
              className="size-3.5 fill-primary text-primary"
              aria-hidden="true"
            />{" "}
            {product.rating.toFixed(1)}{" "}
          </div>
          <div className="inline-flex items-center gap-2">
            <div className="relative inline-flex items-center rounded-md bg-brand-500 py-1 pl-3.5 pr-2.5 text-white">
              <span
                aria-hidden="true"
                className="absolute -left-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-surface-raised dark:bg-surface-dark-raised"
              />
              <span className="font-mono text-sm font-semibold tabular-nums">
                {formatPrice(
                  product.discountPercentage > 0
                    ? product.price -
                        (product.price * product.discountPercentage) / 100
                    : product.price,
                )}
              </span>
            </div>{" "}
          </div>
        </div>
      </Link>

      <div className="absolute right-3 top-3">
        <button
          type="button"
          onClick={() => toggleFavorite(product.id)}
          className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-background/90 text-muted-foreground shadow-sm backdrop-blur transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Heart
            className={favorite ? "size-4 fill-primary text-primary" : "size-4"}
            aria-hidden="true"
          />
        </button>
      </div>
    </motion.article>
  );
}
