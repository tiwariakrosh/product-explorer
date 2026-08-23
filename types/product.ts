export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  thumbnail: string;
  images: string[];
}

export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface CategoryOption {
  slug: string;
  name: string;
  url: string;
}

export type SortOption =
  | "default"
  | "price-asc"
  | "price-desc"
  | "rating-desc"
  | "title-asc";
