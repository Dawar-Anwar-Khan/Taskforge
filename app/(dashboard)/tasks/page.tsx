'use client'
import { useState } from 'react'
import { toast } from 'sonner'
import { TaskSkeleton } from '@/app/components/skeletonLoader'
import {
  useCreateTaskMutation,
  useGetTasksQuery,
} from '@/lib/tasksApi'
import { useGetEmployeesQuery } from '@/lib/employeesApi'

const statusColors: Record<string, string> = {
  Pending: 'bg-yellow-100 text-yellow-700',
  'In Progress': 'bg-blue-100 text-blue-700',
  Completed: 'bg-green-100 text-green-700',
}

export default function TasksPage() {
  const { data: tasksData, isLoading: tasksLoading } = useGetTasksQuery()
  const { data: employeesData } = useGetEmployeesQuery()
  const [createTask, { isLoading: creating }] = useCreateTaskMutation()

  const [showModal, setShowModal] = useState(false)
  const [statusFilter, setStatusFilter] = useState<'all' | 'Pending' | 'In Progress' | 'Completed'>('all')
  const [search, setSearch] = useState('')
  const [form, setForm] = useState({
    title: '',
    description: '',
    assignedTo: '',
    deadline: '',
  })

  const tasks = tasksData?.tasks ?? []
  const employees = employeesData?.employees ?? []

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      statusFilter === 'all' ? true : task.status === statusFilter

    const term = search.trim().toLowerCase()
    if (!term) return matchesStatus

    const haystack = `${task.title} ${task.description ?? ''} ${task.assignedTo?.name ?? ''}`.toLowerCase()
    return matchesStatus && haystack.includes(term)
  })

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    try {
      await createTask(form).unwrap()
      toast.success('Task assigned successfully')
      setShowModal(false)
      setForm({ title: '', description: '', assignedTo: '', deadline: '' })
    } catch (err: unknown) {
      const message = (err as { data?: { error?: string } })?.data?.error
      toast.error(message || 'Failed to create task')
    }
  }

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 py-12 sm:px-8 sm:py-10">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--accent)]">Tasks</h1>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            {filteredTasks.length} matching tasks
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="w-full rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--background)] transition-colors hover:brightness-110 sm:w-auto"
        >
          + Assign Task
        </button>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as typeof statusFilter)
            }
            className="w-full max-w-[180px] rounded-md border border-[var(--card-border)] bg-[var(--card-background)] px-3 py-2 text-xs text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          >
            <option value="all">All statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title, description, or assignee"
          className="w-full rounded-md border border-[var(--card-border)] bg-[var(--card-background)] px-3 py-2 text-xs text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] sm:max-w-xs"
        />
      </div>
      {tasksLoading ? (
        <TaskSkeleton />
      ) : filteredTasks.length === 0 ? (
        <div className="py-16 text-center text-sm text-[var(--muted-foreground)]">
          No tasks match your filters.
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-[var(--card-border)] bg-[var(--card-background)]">
          {/* Mobile cards */}
          <div className="divide-y divide-[var(--card-border)] sm:hidden">
            {filteredTasks.map((task) => (
              <div key={task._id} className="px-4 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="break-words font-medium text-[var(--accent)]">
                      {task.title}
                    </p>
                    {task.description && (
                      <p className="mt-1 break-words text-xs text-[var(--muted-foreground)]">
                        {task.description}
                      </p>
                    )}
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2 py-1 text-xs font-medium ${statusColors[task.status]}`}
                  >
                    {task.status}
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-1 gap-2 text-xs">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[var(--muted-foreground)]">
                      Assigned to
                    </span>
                    <span className="text-[var(--foreground)]">
                      {task.assignedTo?.name || '—'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[var(--muted-foreground)]">
                      Deadline
                    </span>
                    <span className="text-[var(--foreground)]">
                      {new Date(task.deadline).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden overflow-x-auto sm:block">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--card-border)] bg-[color-mix(in_oklab,var(--background)_92%,#ffffff_8%)]">
                  <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">
                    Task
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">
                    Assigned To
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">
                    Deadline
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((task) => (
                  <tr
                    key={task._id}
                    className="border-b border-[var(--card-border)]/70 last:border-0 hover:bg-[color-mix(in_oklab,var(--background)_96%,#ffffff_4%)]"
                  >
                    <td className="px-4 py-3">
                      <p className="font-medium text-[var(--accent)]">{task.title}</p>
                      {task.description && (
                        <p className="mt-0.5 text-xs text-[var(--muted-foreground)]">
                          {task.description}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3 text-[var(--muted-foreground)]">
                      {task.assignedTo?.name || '—'}
                    </td>
                    <td className="px-4 py-3 text-[var(--muted-foreground)]">
                      {new Date(task.deadline).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${statusColors[task.status]}`}
                      >
                        {task.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create Task Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-lg border border-[var(--card-border)] bg-[var(--card-background)] p-6 shadow-xl">
            <h2 className="mb-4 text-lg font-semibold text-[var(--accent)]">
              Assign Task
            </h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-[var(--accent)]">
                  Title
                </label>
                <input
                  value={form.title}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, title: e.target.value }))
                  }
                  required
                  placeholder="Task title"
                  className="w-full rounded-md border border-[var(--card-border)] bg-[var(--card-background)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-[var(--accent)]">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, description: e.target.value }))
                  }
                  placeholder="Optional details"
                  rows={2}
                  className="w-full resize-none rounded-md border border-[var(--card-border)] bg-[var(--card-background)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-[var(--accent)]">
                  Assign To
                </label>
                <select
                  value={form.assignedTo}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, assignedTo: e.target.value }))
                  }
                  required
                  className="w-full rounded-md border border-[var(--card-border)] bg-[var(--card-background)] px-3 py-2 text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                >
                  <option value="">Select employee</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-[var(--accent)]">
                  Deadline
                </label>
                <input
                  type="date"
                  value={form.deadline}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, deadline: e.target.value }))
                  }
                  required
                  className=" w-full rounded-md border border-[var(--card-border)] bg-[var(--card-background)] px-3 py-2 text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                />
              </div>
              <div className="flex flex-col gap-2 pt-1 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-full rounded-md border border-[var(--card-border)] py-2 text-sm font-medium text-[var(--muted-foreground)] hover:bg-[color-mix(in_oklab,var(--background)_96%,#ffffff_4%)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="w-full rounded-md bg-[var(--accent)] py-2 text-sm font-medium text-[var(--background)] hover:brightness-110 disabled:opacity-50"
                >
                  {creating ? 'Assigning...' : 'Assign Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}