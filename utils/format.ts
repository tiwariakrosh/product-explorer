export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(price);
}

export function formatCategoryLabel(category: string): string {
  return category
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
