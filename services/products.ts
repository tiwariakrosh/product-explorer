import { Product, ProductResponse } from "@/types/product";
import axios from "axios";

const api = axios.create({ baseURL: "https://dummyjson.com", timeout: 10000 });
const cache = new Map<string, ProductResponse | Product>();

export async function getProducts(params: {
  skip: number;
  limit: number;
  query?: string;
  category?: string;
}): Promise<ProductResponse> {
  const { skip, limit, query, category } = params;
  const key = JSON.stringify(params);
  const cached = cache.get(key);
  if (cached && "products" in cached) return cached;
  const path = query
    ? "/products/search"
    : category && category !== "all"
      ? `/products/category/${encodeURIComponent(category)}`
      : "/products";
  const response = await api.get<ProductResponse>(path, {
    params: { limit, skip, ...(query ? { q: query } : {}) },
  });
  console.log("🚀 ~ getProducts ~ response:", response);
  cache.set(key, response.data);
  return response.data;
}

export async function getProduct(id: string | number): Promise<Product> {
  const key = `product:${id}`;
  const cached = cache.get(key);
  if (cached && "id" in cached) return cached;
  const response = await api.get<Product>(`/products/${id}`);
  cache.set(key, response.data);
  return response.data;
}
