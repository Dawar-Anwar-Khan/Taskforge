'use client'

type TaskForgeLogoProps = {
  variant?: 'default' | 'compact'
  className?: string
  wordmarkClassName?: string
}

export function TaskForgeLogo({ variant = 'default', className = '', wordmarkClassName = '' }: TaskForgeLogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--accent)] text-[var(--background)] [&_svg]:h-5 [&_svg]:w-5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none" aria-hidden>
          <path
            d="M12 28V12h4v6h8v-6h4v16h-4v-6h-8v6h-4z"
            fill="currentColor"
          />
          <circle cx="20" cy="26" r="2" fill="currentColor" />
        </svg>
      </span>
      {variant === 'default' && (
        <span className={`text-sm font-semibold text-[var(--accent)] ${wordmarkClassName}`.trim()}>
          TaskForge
        </span>
      )}
    </div>
  )
}

export function TaskForgeLogoWithTagline({
  tagline,
  className = '',
}: {
  tagline: React.ReactNode
  className?: string
}) {
  return (
    <div className={`flex flex-col gap-0.5 ${className}`}>
      <div className="flex items-center gap-2">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--accent)] text-[var(--background)] [&_svg]:h-5 [&_svg]:w-5">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none" aria-hidden>
            <path d="M12 28V12h4v6h8v-6h4v16h-4v-6h-8v6h-4z" fill="currentColor" />
            <circle cx="20" cy="26" r="2" fill="currentColor" />
          </svg>
        </span>
        <span className="text-sm font-semibold text-[var(--accent)]">TaskForge</span>
      </div>
      {tagline != null && (
        <p className="mt-0.5 flex items-center gap-1 pl-11 text-xs text-[var(--muted-foreground)]">
          {tagline}
        </p>
      )}
    </div>
  )
}
