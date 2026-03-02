'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ThemeToggle } from '@/app/components/theme-toggle'
import { TaskForgeLogo } from '@/app/components/taskforge-logo'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Surface the error in the console for debugging in development/monitoring in production.
    // eslint-disable-next-line no-console
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--foreground)]">
      <header className="flex items-center justify-between px-5 pt-8 md:px-20">
        <TaskForgeLogo wordmarkClassName="text-base md:text-lg" />
        <ThemeToggle />
      </header>

      <main className="flex flex-1 items-center justify-center px-5">
        <div className="w-full max-w-md rounded-2xl border border-[var(--card-border)] bg-[var(--card-background)] px-6 py-8 text-center shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
            Something went wrong
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-[var(--accent)]">
            We&apos;re having trouble loading TaskForge
          </h1>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            This looks like a temporary server issue. You can try again or return to a safe
            starting point while we recover.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex items-center justify-center rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--background)] transition-colors hover:brightness-110"
            >
              Try again
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-md border border-[var(--card-border)] bg-[var(--card-background)] px-4 py-2 text-sm font-medium text-[var(--muted-foreground)] transition-colors hover:border-[color-mix(in_oklab,var(--card-border)_70%,var(--accent)_30%)] hover:text-[var(--accent)]"
            >
              Go to dashboard
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

