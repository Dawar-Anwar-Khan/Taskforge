import { PublicPageShell } from '@/app/components/public-page-shell'

const faqs = [
  {
    q: 'What is TaskForge?',
    a: 'TaskForge is a role-based HR task management dashboard used in this project to demonstrate secure assignment, tracking, and review of work for employees.',
  },
  {
    q: 'Is this a production service?',
    a: 'No. This instance is a portfolio/demo application. It should not be used with real employee or company data without further hardening and review.',
  },
  {
    q: 'How are roles handled?',
    a: 'The app distinguishes between admin/HR users and employees. Admins can manage employees and tasks; employees can only see and update their own assignments.',
  },
  {
    q: 'Can this be extended?',
    a: 'Yes. The codebase is structured so you can add new entities (for example departments or projects), integrate with your own auth provider, or plug into external HR systems.',
  },
]

export default function FaqPage() {
  return (
    <PublicPageShell
      title="Frequently Asked Questions"
      subtitle="Short answers for reviewers and teams considering reusing this codebase."
    >
      <section className="space-y-4">
        {faqs.map(item => (
          <div
            key={item.q}
            className="rounded-lg border border-[var(--card-border)] bg-[var(--card-background)] px-4 py-3"
          >
            <h2 className="text-sm font-semibold text-[var(--accent)]">{item.q}</h2>
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">{item.a}</p>
          </div>
        ))}
      </section>
    </PublicPageShell>
  )
}

