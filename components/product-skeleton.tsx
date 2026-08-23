function ShimmerBlock({ className }: { className: string }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-shimmer rounded-md bg-[linear-gradient(90deg,theme(colors.border)_0px,theme(colors.muted)_40px,theme(colors.border)_80px)] bg-[length:450px_100%] ${className}`}
    />
  );
}

export function ProductCardSkeleton({ delay = 0 }: { delay?: number }) {
  return (
    <div
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
      style={{ animationDelay: `${delay}ms` }}
    >
      <ShimmerBlock className="aspect-square w-full rounded-none" />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <ShimmerBlock className="h-3 w-1/3" />
        <ShimmerBlock className="h-4 w-full" />
        <ShimmerBlock className="h-4 w-2/3" />
        <div className="mt-auto flex items-center justify-between pt-1">
          <ShimmerBlock className="h-3 w-1/3" />
          <ShimmerBlock className="h-7 w-20 rounded-md" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div
      role="status"
      aria-label="Loading products"
      className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} delay={(index % 5) * 90} />
      ))}
      <span className="sr-only">Loading products…</span>
    </div>
  );
}
