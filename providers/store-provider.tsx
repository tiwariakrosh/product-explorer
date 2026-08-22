"use client";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { store, useAppSelector } from "@/store/app-store";

function ThemeClass({ children }: { children: React.ReactNode }) {
  const mode = useAppSelector((state) => state.theme.mode);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark");
    document.documentElement.classList.toggle("light", mode === "light");
  }, [mode]);
  return children;
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeClass>{children}</ThemeClass>
    </Provider>
  );
}
