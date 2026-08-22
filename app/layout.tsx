import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/providers/store-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Product Explorer App",
  description:
    "Explore our wide range of products and find the perfect fit for your needs.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`h-full bg-background antialiased`}>
      <body className="min-h-full flex flex-col">
        <StoreProvider>
          <Header />
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
