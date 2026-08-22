"use client";

import { toggle, useAppDispatch, useAppSelector } from "@/store/app-store";
import { Moon, Sun } from "lucide-react";

export function Header() {
  const mode = useAppSelector((state) => state.theme.mode);
  const dispatch = useAppDispatch();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 lg:px-8">
        <h1 className="mt-1 text-xl font-bold tracking-tight sm:text-2xl">
          Product Explorer
        </h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => dispatch(toggle())}
            aria-label="Toggle theme"
            className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:border-primary hover:text-primary"
          >
            {mode === "dark" ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
