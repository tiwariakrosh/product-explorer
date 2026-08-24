import { Product, ProductResponse } from "@/types/product";
import axios from "axios";

const api = axios.create({ baseURL: "https://dummyjson.com", timeout: 10000 });

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
const MAX_CACHE_ENTRIES = 50;

type CacheEntry<T> = { data: T; expiresAt: number };
const cache = new Map<
  string,
  CacheEntry<ProductResponse | Product | string[]>
>();

function getCached<T>(key: string): T | undefined {
  const entry = cache.get(key);
  if (!entry) return undefined;
  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return undefined;
  }
  return entry.data as T;
}

function setCached<T>(key: string, data: T) {
  if (cache.size >= MAX_CACHE_ENTRIES) {
    const oldestKey = cache.keys().next().value;
    if (oldestKey) cache.delete(oldestKey);
  }
  cache.set(key, {
    data: data as ProductResponse | Product | string[],
    expiresAt: Date.now() + CACHE_TTL_MS,
  });
}

export async function getProducts(
  params: { skip: number; limit: number; query?: string; category?: string },
  signal?: AbortSignal,
): Promise<ProductResponse> {
  const { skip, limit, query, category } = params;
  const key = `products:${JSON.stringify(params)}`;

  const cached = getCached<ProductResponse>(key);
  if (cached) return cached;

  const path = query
    ? "/products/search"
    : category && category !== "all"
      ? `/products/category/${encodeURIComponent(category)}`
      : "/products";

  const response = await api.get<ProductResponse>(path, {
    params: { limit, skip, ...(query ? { q: query } : {}) },
    signal,
  });

  setCached(key, response.data);
  return response.data;
}

export async function getProduct(
  id: string | number,
  signal?: AbortSignal,
): Promise<Product> {
  const key = `product:${id}`;

  const cached = getCached<Product>(key);
  if (cached) return cached;

  const response = await api.get<Product>(`/products/${id}`, { signal });
  setCached(key, response.data);
  return response.data;
}

export async function getCategories(signal?: AbortSignal): Promise<string[]> {
  const key = "categories";

  const cached = getCached<string[]>(key);
  if (cached) return cached;

  const response = await api.get<string[]>("/products/category-list", {
    signal,
  });
  setCached(key, response.data);
  return response.data;
}

export function isRequestCancelled(error: unknown): boolean {
  return axios.isCancel(error);
}
