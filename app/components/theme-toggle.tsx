'use client';

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function applyTheme(value: Theme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(value);
  window.localStorage.setItem("theme", value);
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  // Hydration-safe: first render is always "light" on both server and client.
  // Then we read the real preference on the client and update once.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("theme") as Theme | null;
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      return;
    }
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      className=" cursor-pointer flex h-9 items-center gap-2 rounded-full border border-[var(--card-border)] bg-[var(--card-background)] px-3 text-xs font-medium text-[var(--muted-foreground)] shadow-sm transition-colors hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]"
      aria-label="Toggle theme"
    >
      <span
        className={`h-2 w-2 rounded-full ${
          isDark ? "bg-sky-400" : "bg-amber-400"
        }`}
      />
      <span>{isDark ? "Dark mode" : "Light mode"}</span>
    </button>
  );
}

