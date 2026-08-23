"use client";

import { cn } from "@/utils/cn";
import { useExplorerStore } from "@/store/app-store";
import { Heart } from "lucide-react";

interface FavoriteButtonProps {
  productId: number;
  size?: "sm" | "md";
}

export function FavoriteButton({
  productId,
  size = "md",
}: FavoriteButtonProps) {
  const { favoritesOnly, setFavoritesOnly, favorites } = useExplorerStore();

  const dimension = size === "sm" ? "h-8 w-8" : "h-10 w-10";

  return (
    <button
      type="button"
      aria-pressed={favorites.includes(productId)}
      aria-label={
        favorites.includes(productId)
          ? "Remove from favorites"
          : "Add to favorites"
      }
      onClick={() => setFavoritesOnly(!favoritesOnly)}
      className={cn(
        dimension,
        "grid place-items-center rounded-full border border-line bg-surface-raised/90 text-ink-soft shadow-card backdrop-blur transition-colors hover:text-accent-rose dark:border-line-dark dark:bg-surface-dark-raised/90 dark:text-ink-dark-soft",
      )}
    >
      <Heart
        className={
          favoritesOnly ? "size-4 fill-primary text-primary" : "size-4"
        }
      />
    </button>
  );
}
