"use client";

import { getCategories } from "@/services/products";
import { useExplorerStore } from "@/store/app-store";
import { SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";

export function FilterBar() {
  const { category, setCategory } = useExplorerStore();
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => undefined);
  }, []);

  return (
    <div className="flex w-full items-center gap-2 sm:w-auto sm:flex-row">
      <SlidersHorizontal className="size-7 text-foreground/50" />
      <select
        value={category}
        onChange={(event) => setCategory(event.target.value)}
        className="h-11 rounded-lg border border-border bg-transparent px-3 pl-2 text-sm capitalize outline-none focus:border-primary"
      >
        <option value="all">All categories</option>
        {categories.map((item) => (
          <option key={item} value={item}>
            {item.replaceAll("-", " ")}
          </option>
        ))}
      </select>
    </div>
  );
}
