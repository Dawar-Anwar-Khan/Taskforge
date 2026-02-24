'use client';

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem("theme") as Theme | null;

    if (stored === "light" || stored === "dark") {
      applyTheme(stored);
      setTheme(stored);
      return;
    }

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const initial: Theme = prefersDark ? "dark" : "light";
    applyTheme(initial);
    setTheme(initial);
  }, []);

  const applyTheme = (value: Theme) => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(value);
    window.localStorage.setItem("theme", value);
  };

  const toggle = () => {
    if (!theme) return;
    const next: Theme = theme === "light" ? "dark" : "light";
    applyTheme(next);
    setTheme(next);
  };

  if (!theme) {
    return (
      <div className="h-9 w-20 rounded-full border border-[var(--card-border)] bg-[var(--card-background)]/80" />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      className="flex h-9 items-center gap-2 rounded-full border border-[var(--card-border)] bg-[var(--card-background)] px-3 text-xs font-medium text-[var(--muted-foreground)] shadow-sm transition-colors hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]"
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

