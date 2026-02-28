// app/(auth)/login/page.tsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { ThemeToggle } from '@/app/components/theme-toggle'
import { TaskForgeLogo } from '@/app/components/taskforge-logo'
import { useDispatch } from 'react-redux'
import { resetAllApiState } from '@/lib/resetApiState'
import type { AppDispatch } from '@/lib/store'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()

      if (res.status === 401) {
        toast.error('Invalid credentials')
        return
      }
      if (res.status === 200) {
        toast.success('Login successful')
        resetAllApiState(dispatch)
        router.replace('/')
        router.refresh()
        return
      }

      toast.error(data?.error || 'Login failed')
    } catch {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
    <div className="flex justify-between items-center px-5 pt-9 md:px-20">
      <TaskForgeLogo wordmarkClassName="text-xl md:text-2xl" />
      <ThemeToggle />
    </div>
    <div className="flex min-h-[calc(100vh-72px)] items-center justify-center bg-[var(--background)] text-[var(--foreground)] px-5">
      <div className="w-full max-w-sm rounded-2xl border border-[var(--card-border)] bg-[var(--card-background)] px-6 py-7 shadow-sm">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-[var(--accent)]">Sign in</h1>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            TaskForge HR Management
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--accent)]">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full rounded-md border border-[var(--card-border)] bg-[var(--card-background)] px-3 py-2 text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              placeholder="you@company.com"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--accent)]">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full rounded-md border border-[var(--card-border)] bg-[var(--card-background)] px-3 py-2 text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-[var(--accent)] py-2 px-4 text-sm font-medium text-[var(--background)] transition-colors hover:brightness-110 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  </>
  )
}