import { PublicPageShell } from '@/app/components/public-page-shell'

export default function CookiesPage() {
  return (
    <PublicPageShell
      title="Cookie Policy"
      subtitle="This Cookie Policy explains how TaskForge uses cookies and similar technologies."
    >
      <section className="space-y-2 text-sm">
        <h2 className="text-sm font-semibold text-[var(--accent)]">Essential cookies</h2>
        <p className="text-[var(--muted-foreground)]">
          A production-ready HR dashboard would typically use cookies for essential functions such
          as maintaining authenticated sessions. These are required for the service to work and are
          separate from any marketing or analytics cookies.
        </p>
      </section>

      <section className="space-y-2 text-sm">
        <h2 className="text-sm font-semibold text-[var(--accent)]">
          Analytics and third-party tools
        </h2>
        <p className="text-[var(--muted-foreground)]">
          If analytics or monitoring tools are enabled, they may set cookies that help measure usage
          patterns (for example, which pages are visited most often). Where required, your
          organization should ensure that appropriate notices and consents are in place before such
          cookies are used.
        </p>
      </section>

      <section className="space-y-2 text-sm">
        <h2 className="text-sm font-semibold text-[var(--accent)]">Managing cookies</h2>
        <p className="text-[var(--muted-foreground)]">
          Most browsers allow you to manage cookies through their settings, including blocking or
          deleting them. Disabling essential cookies may affect the ability to sign in or use parts of
          the application that rely on session information.
        </p>
      </section>
    </PublicPageShell>
  )
}

