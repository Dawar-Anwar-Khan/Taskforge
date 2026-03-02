import { PublicPageShell } from '@/app/components/public-page-shell'

export default function AboutPage() {
  return (
    <PublicPageShell
      title="About TaskForge"
      subtitle="A role-based HR task management dashboard built with Next.js, MongoDB, and JWT authentication."
    >
      <section className="space-y-2 text-sm">
        <h2 className="text-sm font-semibold text-[var(--accent)]">What this project is</h2>
        <p className="text-[var(--muted-foreground)]">
          TaskForge is a portfolio-quality internal tool that demonstrates how HR teams can
          assign and track work across employees with clear permissions and a modern, theme-aware UI.
        </p>
      </section>

      <section className="space-y-2 text-sm">
        <h2 className="text-sm font-semibold text-[var(--accent)]">User experience first</h2>
        <p className="text-[var(--muted-foreground)]">
          The interface is designed to be fast, consistent, and comfortable in both light and
          dark mode. UI components reuse a shared design system and rely on CSS variables to keep
          theme switching smooth.
        </p>
      </section>

      <section className="space-y-2 text-sm">
        <h2 className="text-sm font-semibold text-[var(--accent)]">Security model (high level)</h2>
        <p className="text-[var(--muted-foreground)]">
          Authentication is JWT-based, and server-side role checks are applied to protect sensitive
          operations. Admin users manage employees and tasks; employees focus on their own assignments.
        </p>
      </section>
    </PublicPageShell>
  )
}

