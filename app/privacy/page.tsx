import { PublicPageShell } from '@/app/components/public-page-shell'

export default function PrivacyPage() {
  return (
    <PublicPageShell
      title="Privacy Policy"
      subtitle="This Privacy Policy explains how TaskForge handles personal information when you use the application."
    >
      <section className="space-y-2 text-sm">
        <h2 className="text-sm font-semibold text-[var(--accent)]">Data we work with</h2>
        <p className="text-[var(--muted-foreground)]">
          TaskForge processes information needed to operate an HR task management service. This
          includes basic account details (such as name, work email address, role), authentication
          credentials stored in hashed form, and task-related data (such as task titles, due dates and
          status).
        </p>
      </section>

      <section className="space-y-2 text-sm">
        <h2 className="text-sm font-semibold text-[var(--accent)]">How we use your information</h2>
        <p className="text-[var(--muted-foreground)]">
          We use this information to authenticate users, authorize access based on role, assign and
          track tasks, and operate and improve the service (for example by understanding which
          features are used). We do not sell personal information to third parties.
        </p>
      </section>

      <section className="space-y-2 text-sm">
        <h2 className="text-sm font-semibold text-[var(--accent)]">Retention and security</h2>
        <p className="text-[var(--muted-foreground)]">
          Account and task data is retained for as long as your organization uses the application or
          as required by internal policy or law. Passwords are stored using one‑way hashing. Access to
          production data is restricted to authorized personnel and protected by technical and
          organizational measures appropriate for an internal HR system.
        </p>
      </section>

      <section className="space-y-2 text-sm">
        <h2 className="text-sm font-semibold text-[var(--accent)]">Access and contact</h2>
        <p className="text-[var(--muted-foreground)]">
          Your organization controls the data stored in TaskForge. If you have questions about how
          your information is used, or if you want to request access, correction, or deletion, please
          contact your HR or system administrator.
        </p>
      </section>
    </PublicPageShell>
  )
}

