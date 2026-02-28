'use client'

import { useMemo } from 'react'
import { Clock, CheckCircle2 } from 'lucide-react'
import { ThemeToggle } from '@/app/components/theme-toggle'
import { StatSkeleton, TaskSkeleton } from '@/app/components/skeletonLoader'
import { useGetMeQuery } from '@/lib/meApi'
import {
  useGetTasksQuery,
  type TaskStatus,
  useUpdateTaskStatusMutation,
} from '@/lib/tasksApi'
import { useGetEmployeesQuery } from '@/lib/employeesApi'
import { toast } from 'sonner'

const statusConfig = {
  Pending: {
    className: 'bg-amber-50 text-amber-700 border border-amber-200',
  },
  'In Progress': {
    className: 'bg-sky-50 text-sky-700 border border-sky-200',
  },
  Completed: {
    className: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  },
}

export default function DashboardPage() {
  const { data: me, isLoading: meLoading } = useGetMeQuery()
  const { data: tasksData, isLoading: tasksLoading } = useGetTasksQuery()
  const isAdmin = me?.role === 'admin'

  const { data: employeesData, isLoading: employeesLoading } = useGetEmployeesQuery(
    undefined,
    { skip: !isAdmin },
  )
  const [updateStatus] = useUpdateTaskStatusMutation()

  const tasks = useMemo(() => tasksData?.tasks ?? [], [tasksData])
  const employeeCount = employeesData?.employees?.length ?? 0

  async function handleStatusChange(taskId: string, status: TaskStatus) {
    try {
      await updateStatus({ id: taskId, status }).unwrap()
      toast.success('Status updated')
    } catch (err: unknown) {
      const message = (err as { data?: { error?: string } })?.data?.error
      toast.error(message || 'Failed to update')
    }
  }

  const { pending, inProgress, completed } = useMemo(() => {
    const pendingCount = tasks.filter((t) => t.status === 'Pending').length
    const inProgressCount = tasks.filter(
      (t) => t.status === 'In Progress',
    ).length
    const completedCount = tasks.filter(
      (t) => t.status === 'Completed',
    ).length

    return {
      pending: pendingCount,
      inProgress: inProgressCount,
      completed: completedCount,
    }
  }, [tasks])

  const cards =
    isAdmin
      ? [
          { label: 'Total Employees', value: employeeCount },
          { label: 'Total Tasks', value: tasks.length },
          { label: 'Pending', value: pending },
          { label: 'In Progress', value: inProgress },
          { label: 'Completed', value: completed },
        ]
      : [
          { label: 'Total Tasks', value: tasks.length },
          { label: 'Pending', value: pending },
          { label: 'In Progress', value: inProgress },
          { label: 'Completed', value: completed },
        ]

  const loading = meLoading || tasksLoading || (isAdmin && employeesLoading)

  if (loading) {
    return (
      <div className="mx-auto min-h-screen max-w-6xl space-y-8 px-4 py-8 sm:px-8">
        <div className="h-6 w-48 rounded bg-[var(--card-background)] shimmer" />
        <StatSkeleton />
        <TaskSkeleton />
      </div>
    )
  }

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 py-15 sm:px-8 sm:py-12">
      {/* Header */}
      <header className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
            Dashboard
          </div>
          <h1 className="mt-2 text-2xl font-semibold text-[var(--accent)]">
            Welcome back, {me?.name || 'Employee'}
          </h1>
        </div>
        <ThemeToggle />
      </header>

      {/* Stat cards — responsive grid */}
      <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {cards.map(({ label, value }) => (
          <div
            key={label}
            className="flex flex-col rounded-xl border border-[var(--card-border)] bg-[var(--card-background)] px-5 py-4"
          >
            <span className="text-xs font-medium text-[var(--muted-foreground)]">
              {label}
            </span>
            <span className="mt-3 text-3xl font-semibold text-[var(--accent)]">
              {value}
            </span>
          </div>
        ))}
      </section>

      {/* Tasks section */}
      <section className="mt-10">
        <h2 className="text-sm font-semibold text-[var(--accent)]">
          {isAdmin ? 'All Tasks' : 'My Tasks'}
        </h2>

        <div className="mt-4 overflow-hidden rounded-xl border border-[var(--card-border)] bg-[var(--card-background)] text-sm">
          <div className="hidden grid-cols-[2fr,1.2fr,1.2fr,1fr,1fr] border-b border-[var(--card-border)] bg-[color-mix(in_oklab,var(--background)_92%,#ffffff_8%)] px-6 py-3 text-xs font-medium text-[var(--muted-foreground)] sm:grid">
            <span>Task</span>
            <span>Assigned By</span>
            <span>Deadline</span>
            <span>Status</span>
            {!isAdmin && <span className="text-right">Actions</span>}
          </div>

          {tasks.length === 0 ? (
            <div className="py-16 text-center text-xs text-[var(--muted-foreground)]">
              No tasks yet.
            </div>
          ) : (
            <div className="divide-y divide-[var(--card-border)]">
              {tasks.map((task) => {
                const cfg = statusConfig[task.status]

                return (
                  <div
                    key={task._id}
                    className="flex flex-col gap-3 px-4 py-4 text-xs text-[var(--foreground)] sm:grid sm:grid-cols-[2fr,1.2fr,1.2fr,1fr,1fr] sm:items-center sm:px-6"
                  >
                    {/* Task & description */}
                    <div>
                      <div className="font-medium text-[var(--accent)]">
                        {task.title}
                      </div>
                      {task.description && (
                        <div className="mt-1 text-[var(--muted-foreground)]">
                          {task.description}
                        </div>
                      )}
                    </div>

                    {/* Assigned by */}
                    <div className="flex items-center justify-between gap-3 sm:block">
                      <span className="text-[var(--muted-foreground)] sm:hidden">
                        Assigned by
                      </span>
                      <span className="text-[var(--muted-foreground)]">
                        {task.assignedBy?.name || '—'}
                      </span>
                    </div>

                    {/* Deadline */}
                    <div className="flex items-center justify-between gap-3 sm:block">
                      <span className="text-[var(--muted-foreground)] sm:hidden">
                        Deadline
                      </span>
                      <span className="text-[var(--muted-foreground)]">
                        {new Date(task.deadline).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>

                    {/* Status pill */}
                    <div className="flex items-center justify-between gap-3 sm:block">
                      <span className="text-[var(--muted-foreground)] sm:hidden">
                        Status
                      </span>
                      <span>
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-medium ${cfg.className}`}
                        >
                          {task.status === 'Completed' ? (
                            <CheckCircle2 size={11} />
                          ) : (
                            <Clock size={11} />
                          )}
                          {task.status}
                        </span>
                      </span>
                    </div>

                    {/* Actions button - employees only */}
                    {!isAdmin && (
                      <span className="flex justify-start sm:justify-end">
                        <select
                          value={task.status}
                          onChange={(e) =>
                            handleStatusChange(task._id, e.target.value as TaskStatus)
                          }
                          className="w-full cursor-pointer rounded-md border border-[var(--card-border)] bg-[var(--card-background)] px-2 py-1 text-[10px] font-medium text-[var(--muted-foreground)] hover:border-[color-mix(in_oklab,var(--card-border)_70%,var(--accent)_30%)] sm:max-w-[140px]"
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
