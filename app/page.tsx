import { FilterBar } from "@/components/filter-bar";
import { PageTransition } from "@/components/page-transition";
import ProductList from "@/components/product-list";
import { SearchBar } from "@/components/search-bar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Explorer — Browse Products",
};

export default function HomePage() {
  return (
    <PageTransition>
      <div className="container mx-auto flex h-full flex-1 flex-col gap-4 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="sm:max-w-sm sm:flex-1">
            <SearchBar />
          </div>
          <FilterBar />
        </div>
        <ProductList />
      </div>
    </PageTransition>
  );
}
