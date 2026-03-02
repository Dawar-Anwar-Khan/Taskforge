import { ThemeToggle } from '@/app/components/theme-toggle'
import { ChangePasswordForm } from '@/app/components/change-password-form'
import { getSession } from '@/lib/auth'
import { connectDB } from '@/lib/db'
import User from '@/models/userModel'

export default async function ProfilePage() {
  const [session] = await Promise.all([getSession(), connectDB()])

  if (!session) {
    return null
  }

  const user = await User.findById(session.id).select('-password -__v')

  if (!user) {
    return null
  }

  const createdAt = new Date(user.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-5 pt-12">
     <div className="flex justify-between items-center">
     <h1 className="mb-8 text-2xl font-semibold text-[var(--accent)]">Profile</h1>
     <ThemeToggle />
     </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="max-w-md rounded-lg border border-[var(--card-border)] bg-[var(--card-background)] p-6">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)] text-xl font-semibold text-[var(--background)]">
              {user.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div>
              <p className="font-semibold text-[var(--accent)]">{user.name}</p>
              <p className="text-sm capitalize text-[var(--muted-foreground)]">
                {user.role}
              </p>
            </div>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-[var(--card-border)]/70 py-2">
              <span className="text-[var(--muted-foreground)]">Role</span>
              <span className="capitalize font-medium text-[var(--accent)]">
                {user.role}
              </span>
            </div>
            <div className="flex justify-between border-b border-[var(--card-border)]/70 py-2">
              <span className="text-[var(--muted-foreground)]">Created at</span>
              <span className="font-medium text-[var(--accent)]">{createdAt}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-[var(--muted-foreground)]">Account status</span>
              <span className="font-medium text-emerald-500">Active</span>
            </div>
          </div>
        </div>

        <div className="max-w-md">
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  )
}