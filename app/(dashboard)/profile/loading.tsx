export default function ProfileLoading() {
  return (
    <div className="mx-auto min-h-screen max-w-6xl px-5 py-12">
      <div className="flex justify-between items-center mb-8">
        <div className="h-8 w-32 rounded bg-[var(--card-background)] shimmer" />
        <div className="h-9 w-9 rounded-md bg-[var(--card-background)] shimmer" />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="max-w-md rounded-lg border border-[var(--card-border)] bg-[var(--card-background)] p-6">
          <div className="mb-6 flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-[var(--card-background)] shimmer" />
            <div className="space-y-2">
              <div className="h-5 w-28 rounded bg-[var(--card-background)] shimmer" />
              <div className="h-4 w-20 rounded bg-[var(--card-background)] shimmer" />
            </div>
          </div>
          <div className="space-y-3 text-sm">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex justify-between border-b border-[var(--card-border)]/70 py-2"
              >
                <div className="h-4 w-20 rounded bg-[var(--card-background)] shimmer" />
                <div className="h-4 w-16 rounded bg-[var(--card-background)] shimmer" />
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-md rounded-lg border border-[var(--card-border)] bg-[var(--card-background)] p-6">
          <div className="mb-4">
            <div className="h-6 w-40 rounded bg-[var(--card-background)] shimmer mb-2" />
            <div className="h-4 w-full rounded bg-[var(--card-background)] shimmer" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-10 w-full rounded-md bg-[var(--card-background)] shimmer" />
            ))}
            <div className="h-10 w-full rounded-md bg-[var(--card-background)] shimmer" />
          </div>
        </div>
      </div>
    </div>
  )
}
