import { FilterBar } from "@/components/filter-bar";
import { PageTransition } from "@/components/page-transition";
import ProductList from "@/components/product-list";
import { SearchBar } from "@/components/search-bar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Explorer — Browse Products",
  description:
    "Discover a wide range of products with our advanced search and filtering options. Save your favorites.",
};

export default function HomePage() {
  return (
    <PageTransition>
      <div className="container mx-auto max-w-7xl flex gap-1 h-full flex-1 flex-col px-5 py-8 lg:px-8">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-ink dark:text-ink-dark sm:text-3xl">
            Explore the products you love
          </h1>
          <p className="mt-1 text-sm text-muted-foreground dark:text-ink-dark-soft">
            Search, filter and save the products you care about.
          </p>
        </div>
        <div className="flex flex-col gap-3 mb-5 mt-4 lg:mb-8 sm:flex-row sm:items-center sm:justify-between">
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
