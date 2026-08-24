# Product Explorer

A product explorer app built with Next.js (App Router), TypeScript, and Tailwind CSS. Search, filter by category, and infinite-scroll through products, with theme (light/dark) support.

Data source: [DummyJSON Products API](https://dummyjson.com/products)

## Tech Stack

- **Framework:** Next.js (App Router), TypeScript
- **Styling:** Tailwind CSS v4
- **State:** Redux Toolkit for theme + Zustand (search, category, favorites)
- **Data fetching:** Axios
- **Animation:** Framer Motion

## Features

- Product listing with infinite scroll (10 per page)
- Debounced search (300ms) with request cancellation via `AbortController`
- Category filtering
- Favorites (toggle from any product card, persisted client-side)
- Product detail page
- Light/dark theme
- Loading skeletons and error states

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # run production build
```

## Project Structure

```
app/                    routes (home, product detail)
components/              UI components (product-card, search-bar, header, etc.)
hooks/                    use-product-list, use-debounced-value, use-infinite-scroll, use-abort-controller.ts
services/                 Axios instance + cached product API calls
store/                    Redux (theme) + Zustand (search/category/favorites)
types/                    shared TypeScript types
utils/                    format.ts

```

## Known Limitations

- Favorites products section are only available from the product list page.
- Favorites are cleared when the page is reloaded.
- In-memory cache resets on full page reload.
