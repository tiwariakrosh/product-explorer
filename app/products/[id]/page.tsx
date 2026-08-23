import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Star } from "lucide-react";
import { notFound } from "next/navigation";
import { getProduct } from "@/services/products";

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
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-5 py-8 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> Back to catalog
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
            <div className="mt-8 flex items-center gap-6 border-y border-border py-5">
              <span className="font-mono text-2xl font-bold">
                ${product.price.toFixed(2)}
              </span>
              <span className="flex items-center gap-1 font-mono text-sm text-muted-foreground">
                <Star className="size-4 fill-primary text-primary" />{" "}
                {product.rating.toFixed(1)}
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                {product.stock} available
              </span>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              {product.brand ? `Made by ${product.brand}. ` : ""}A thoughtful
              addition to any collection.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
