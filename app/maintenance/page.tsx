import Link from 'next/link'
import { PublicPageShell } from '@/app/components/public-page-shell'

export default function MaintenancePage() {
  return (
    <PublicPageShell
      title="Maintenance"
      subtitle="A professional downtime page. In production, middleware can rewrite all routes here during maintenance windows."
    >
      <section className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-background)] px-6 py-6 text-center shadow-sm">
        <p className="text-sm text-[var(--muted-foreground)]">
          This demo instance is not currently in maintenance mode, so you can continue using the
          application as normal.
        </p>
        <Link
          href="/"
          className="mt-5 inline-flex items-center justify-center rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--background)] transition-colors hover:brightness-110"
        >
          Go back to dashboard
        </Link>
      </section>
    </PublicPageShell>
  )
}

