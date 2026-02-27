// components/SkeletonLoader.tsx
export function TaskSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="shimmer h-16 rounded-lg border border-[var(--card-border)] bg-[var(--card-background)]"
        />
      ))}
    </div>
  )
}

export function StatSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="shimmer h-24 rounded-xl border border-[var(--card-border)] bg-[var(--card-background)]"
        />
      ))}
    </div>
  )
}