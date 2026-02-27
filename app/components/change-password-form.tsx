"use client"

import { useState } from "react"
import { toast } from "sonner"

type ChangePasswordResponse = { success?: boolean; error?: string }

export function ChangePasswordForm({
  requireCurrentPassword = true,
  title = "Change password",
  description = "Use a strong password (min 8 characters).",
  submitLabel = "Update password",
  onSuccess,
}: {
  requireCurrentPassword?: boolean
  title?: string
  description?: string
  submitLabel?: string
  onSuccess?: () => void
}) {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (newPassword !== confirm) {
      toast.error("Passwords do not match")
      return
    }
    if (newPassword.length < 8) {
      toast.error("Minimum 8 characters")
      return
    }

    setLoading(true)
    try {
      const payload: { newPassword: string; currentPassword?: string } = {
        newPassword,
      }
      if (requireCurrentPassword) {
        payload.currentPassword = currentPassword
      }

      const res = await fetch("/api/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data: ChangePasswordResponse = await res
        .json()
        .catch(() => ({} as ChangePasswordResponse))
      if (!res.ok) {
        toast.error(data?.error || "Failed — try again")
        return
      }

      toast.success("Password updated")
      setCurrentPassword("")
      setNewPassword("")
      setConfirm("")
      onSuccess?.()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card-background)] p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-[var(--accent)]">{title}</h2>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">{description}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {requireCurrentPassword && (
          <div className="space-y-1">
            <label className="text-sm font-medium text-[var(--accent)]">
              Current password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Your current password"
              required
              className="w-full rounded-md border border-[var(--card-border)] bg-[var(--card-background)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            />
          </div>
        )}

        <div className="space-y-1">
          <label className="text-sm font-medium text-[var(--accent)]">
            New password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Min 8 characters"
            required
            className="w-full rounded-md border border-[var(--card-border)] bg-[var(--card-background)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-[var(--accent)]">
            Confirm new password
          </label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Repeat new password"
            required
            className="w-full rounded-md border border-[var(--card-border)] bg-[var(--card-background)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-[var(--accent)] py-2 text-sm font-medium text-[var(--background)] transition-colors hover:brightness-110 disabled:opacity-50"
        >
          {loading ? "Saving..." : submitLabel}
        </button>
      </form>
    </div>
  )
}

