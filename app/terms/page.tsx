import { PublicPageShell } from '@/app/components/public-page-shell'

export default function TermsPage() {
  return (
    <PublicPageShell
      title="Terms of Use"
      subtitle="These Terms of Use govern how TaskForge may be accessed and used within your organization."
    >
      <section className="space-y-2 text-sm">
        <h2 className="text-sm font-semibold text-[var(--accent)]">Intended use</h2>
        <p className="text-[var(--muted-foreground)]">
          TaskForge is designed as an internal dashboard for HR teams and employees to track work.
          Real-world deployments should limit access to authorized users and avoid using real
          production data in public demo environments.
        </p>
      </section>

      <section className="space-y-2 text-sm">
        <h2 className="text-sm font-semibold text-[var(--accent)]">Accounts and responsibilities</h2>
        <p className="text-[var(--muted-foreground)]">
          Users are responsible for keeping their credentials confidential and for all activity
          carried out under their accounts. Administrators are responsible for assigning roles
          appropriately and ensuring that only authorized personnel have access to employee and task
          data.
        </p>
      </section>

      <section className="space-y-2 text-sm">
        <h2 className="text-sm font-semibold text-[var(--accent)]">Acceptable use</h2>
        <p className="text-[var(--muted-foreground)]">
          You agree not to misuse TaskForge, including by attempting to gain unauthorized access,
          introducing malicious code, interfering with other users, or using the application in a way
          that violates applicable law or your organization&apos;s internal policies.
        </p>
      </section>

      <section className="space-y-2 text-sm">
        <h2 className="text-sm font-semibold text-[var(--accent)]">No warranties</h2>
        <p className="text-[var(--muted-foreground)]">
          This codebase is provided as-is for demonstration and learning. If you reuse it, you are
          responsible for hardening, testing, and validating it for your own environment, including
          security, availability, and data protection.
        </p>
      </section>

      <section className="space-y-2 text-sm">
        <h2 className="text-sm font-semibold text-[var(--accent)]">Changes to the service</h2>
        <p className="text-[var(--muted-foreground)]">
          The application may evolve over time. Your organization may update configuration, roles or
          integrations, and may also update these terms to reflect those changes.
        </p>
      </section>
    </PublicPageShell>
  )
}

