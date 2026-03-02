import Link from 'next/link'
import { PublicPageShell } from '@/app/components/public-page-shell'

export default function ContactPage() {
  return (
    <PublicPageShell
      title="Contact & Support"
      subtitle="A demo-friendly support surface. In production, you would link your real support channels here."
    >
      <section className="space-y-3 text-sm">
        <div>
          <h2 className="text-sm font-semibold text-[var(--accent)]">For recruiters & HR</h2>
          <p className="mt-1 text-[var(--muted-foreground)]">
            If you are reviewing this project and would like to discuss the implementation,
            architecture, or see a guided walkthrough, please use the contact details provided
            alongside this repository (for example on the GitHub profile or CV).
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-[var(--accent)]">
            How this looks in production
          </h2>
          <p className="mt-1 text-[var(--muted-foreground)]">
            In a live HR environment, this page would typically include a dedicated support email
            address, escalation paths for urgent issues, and links to internal help documentation or
            your ticketing system.
          </p>
        </div>
      </section>

      <section className="text-xs text-[var(--muted-foreground)]">
        <p>
          Note: There is intentionally no live contact form or email address baked into the code to
          avoid spam and to keep this project safe to host publicly.
        </p>
      </section>

      <section className="text-xs text-[var(--muted-foreground)]">
        <p>If you came here from within the app, you can continue using the dashboard below.</p>
        <Link
          href="/"
          className="mt-2 inline-flex items-center justify-center rounded-md border border-[var(--card-border)] bg-[var(--card-background)] px-3 py-1.5 text-xs font-medium text-[var(--muted-foreground)] transition-colors hover:border-[color-mix(in_oklab,var(--card-border)_70%,var(--accent)_30%)] hover:text-[var(--accent)]"
        >
          Return to dashboard
        </Link>
      </section>
    </PublicPageShell>
  )
}

