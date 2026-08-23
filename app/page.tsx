import { PageTransition } from "@/components/page-transition";
import ProductList from "@/components/product-list";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Explorer — Browse Products",
};

export default function HomePage() {
  return (
    <PageTransition>
      <div className="container mx-auto flex h-full flex-1 flex-col gap-4 px-4">
        <ProductList />
      </div>
    </PageTransition>
  );
}
