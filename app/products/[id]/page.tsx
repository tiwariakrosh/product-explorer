import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Box, DollarSign, Star } from "lucide-react";
import { notFound } from "next/navigation";
import { getProduct } from "@/services/products";
import { formatPrice } from "@/utils/format";
import type { Metadata } from "next";
import { PageTransition } from "@/components/page-transition";

export const metadata: Metadata = {
  title: "Product Explorer — Product Details",
  description:
    "View detailed information about a product, including its price, rating, stock, and description.",
};

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let product;

  try {
    product = await getProduct(id);
  } catch {
    notFound();
  }

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to catalog
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-muted">
              <Image
                src={product.images[0] ?? product.thumbnail}
                alt={product.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                {product.category}
              </p>

              <h1 className="mt-4 text-4xl font-bold tracking-[-0.04em] sm:text-6xl">
                {product.title}
              </h1>

              <p className="mt-6 text-base leading-8 text-muted-foreground">
                {product.description}
              </p>

              <dl className="grid grid-cols-3 gap-4 border-y border-border py-6">
                <div>
                  <dt className="mb-1 flex items-center gap-1 font-mono text-[10px] uppercase text-muted-foreground">
                    <DollarSign className="size-4" />
                    Price
                  </dt>
                  <dd className="font-mono text-2xl font-bold">
                    {formatPrice(product.price)}
                  </dd>
                </div>

                <div>
                  <dt className="mb-1 flex items-center gap-1 font-mono text-[10px] uppercase text-muted-foreground">
                    <Star className="fill-primary text-primary" size={16} />
                    Rating
                  </dt>
                  <dd className="font-mono text-2xl font-bold">
                    {product.rating.toFixed(1)}
                    <span className="text-xs text-muted-foreground">
                      {" "}
                      / 5.0
                    </span>
                  </dd>
                </div>

                <div>
                  <dt className="mb-1 flex items-center gap-1 font-mono text-[10px] uppercase text-muted-foreground">
                    <Box className="size-4" />
                    Stock
                  </dt>
                  <dd className="font-mono text-2xl font-bold">
                    {product.stock}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
