import Link from 'next/link'
import { ThemeToggle } from '@/app/components/theme-toggle'
import { TaskForgeLogo } from '@/app/components/taskforge-logo'

export function PublicPageShell({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--foreground)]">
      <header className="flex items-center justify-between px-5 pt-8 md:px-20">
        <TaskForgeLogo wordmarkClassName="text-base md:text-lg" />
        <ThemeToggle />
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-5 py-10 md:py-12">
        <section>
          <h1 className="text-2xl font-semibold text-[var(--accent)]">{title}</h1>
          {subtitle && (
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">{subtitle}</p>
          )}
        </section>

        {children}

        <footer className="mt-6 border-t border-[var(--card-border)] pt-6 space-y-3">
          <div className="flex flex-wrap gap-2 text-xs">
            <Link
              href="/login"
              className="rounded-md border border-[var(--card-border)] bg-[var(--card-background)] px-3 py-1.5 font-medium text-[var(--muted-foreground)] transition-colors hover:border-[color-mix(in_oklab,var(--card-border)_70%,var(--accent)_30%)] hover:text-[var(--accent)]"
            >
              Login
            </Link>
            <Link
              href="/about"
              className="rounded-md border border-[var(--card-border)] bg-[var(--card-background)] px-3 py-1.5 font-medium text-[var(--muted-foreground)] transition-colors hover:border-[color-mix(in_oklab,var(--card-border)_70%,var(--accent)_30%)] hover:text-[var(--accent)]"
            >
              About
            </Link>
            <Link
              href="/faq"
              className="rounded-md border border-[var(--card-border)] bg-[var(--card-background)] px-3 py-1.5 font-medium text-[var(--muted-foreground)] transition-colors hover:border-[color-mix(in_oklab,var(--card-border)_70%,var(--accent)_30%)] hover:text-[var(--accent)]"
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              className="rounded-md border border-[var(--card-border)] bg-[var(--card-background)] px-3 py-1.5 font-medium text-[var(--muted-foreground)] transition-colors hover:border-[color-mix(in_oklab,var(--card-border)_70%,var(--accent)_30%)] hover:text-[var(--accent)]"
            >
              Contact
            </Link>
            <Link
              href="/privacy"
              className="rounded-md border border-[var(--card-border)] bg-[var(--card-background)] px-3 py-1.5 font-medium text-[var(--muted-foreground)] transition-colors hover:border-[color-mix(in_oklab,var(--card-border)_70%,var(--accent)_30%)] hover:text-[var(--accent)]"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="rounded-md border border-[var(--card-border)] bg-[var(--card-background)] px-3 py-1.5 font-medium text-[var(--muted-foreground)] transition-colors hover:border-[color-mix(in_oklab,var(--card-border)_70%,var(--accent)_30%)] hover:text-[var(--accent)]"
            >
              Terms
            </Link>
            <Link
              href="/cookies"
              className="rounded-md border border-[var(--card-border)] bg-[var(--card-background)] px-3 py-1.5 font-medium text-[var(--muted-foreground)] transition-colors hover:border-[color-mix(in_oklab,var(--card-border)_70%,var(--accent)_30%)] hover:text-[var(--accent)]"
            >
              Cookies
            </Link>
          </div>
          <p className="text-xs text-[var(--muted-foreground)]">
            © {new Date().getFullYear()} TaskForge. All rights reserved.
          </p>
        </footer>
      </main>
    </div>
  )
}

