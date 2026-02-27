'use client'

import { useRouter } from 'next/navigation'
import { ChangePasswordForm } from '@/app/components/change-password-form'

export default function ChangePasswordPage() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)] text-[var(--foreground)]">
      <div className="w-full max-w-sm px-6 py-7">
        <ChangePasswordForm
          requireCurrentPassword={false}
          title="Set your password"
          description="Your account was created with a temporary password. Set a permanent one to continue."
          submitLabel="Set Password & Continue"
          onSuccess={() => router.replace('/')}
        />
      </div>
    </div>
  )
}