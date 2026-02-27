'use client'
import { useState } from 'react'
import { toast } from 'sonner'
import { TaskSkeleton } from '@/app/components/skeletonLoader'
import {
  useCreateEmployeeMutation,
  useGetEmployeesQuery,
} from '@/lib/employeesApi'

export default function EmployeesPage() {
  const { data, isLoading } = useGetEmployeesQuery()
  const [createEmployee, { isLoading: creating }] = useCreateEmployeeMutation()

  const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [tempPassword, setTempPassword] = useState<string | null>(null)

  const employees = data?.employees ?? []

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    try {
      const res = await createEmployee({ name, email }).unwrap()
      toast.success(`${name} added successfully`)
      setTempPassword(res.temporaryPassword)
      setName('')
      setEmail('')
    } catch (err: unknown) {
      const message = (err as { data?: { error?: string } })?.data?.error
      toast.error(message || 'Failed to create employee')
    }
  }

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 py-8 sm:px-8 sm:py-10">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--accent)]">Employees</h1>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            {employees.length} total employees
          </p>
        </div>
        <button
          onClick={() => {
            setShowModal(true)
            setTempPassword(null)
          }}
          className="w-full rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--background)] transition-colors hover:brightness-110 sm:w-auto"
        >
          + Add Employee
        </button>
      </div>

      {/* Table */}
      {isLoading ? (
        <TaskSkeleton />
      ) : employees.length === 0 ? (
        <div className="py-16 text-center text-sm text-[var(--muted-foreground)]">
          No employees yet. Add your first employee.
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-[var(--card-border)] bg-[var(--card-background)]">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--card-border)] bg-[color-mix(in_oklab,var(--background)_92%,#ffffff_8%)]">
                  <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr
                    key={emp._id}
                    className="border-b border-[var(--card-border)]/70 last:border-0 hover:bg-[color-mix(in_oklab,var(--background)_96%,#ffffff_4%)]"
                  >
                    <td className="px-4 py-3 font-medium text-[var(--accent)]">
                      {emp.name}
                    </td>
                    <td className="px-4 py-3 text-[var(--muted-foreground)]">
                      {emp.email}
                    </td>
                    <td className="px-4 py-3 text-[var(--muted-foreground)]">
                      {new Date(emp.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-lg border border-[var(--card-border)] bg-[var(--card-background)] p-6 shadow-xl">
            {tempPassword ? (
              // Step 2: Show temp password
              <div>
                <h2 className="mb-1 text-lg font-semibold text-[var(--accent)]">
                  Employee Created
                </h2>
                <p className="mb-4 text-sm text-[var(--muted-foreground)]">
                  Share this temporary password with the employee. It will not be
                  shown again.
                </p>
                <div className="mb-4 select-all rounded-md border border-[var(--card-border)] bg-[color-mix(in_oklab,var(--background)_94%,#ffffff_6%)] px-4 py-3 font-mono text-sm text-[var(--accent)]">
                  {tempPassword}
                </div>
                <p className="mb-4 text-xs text-[var(--muted-foreground)]">
                  The employee will be forced to change this password on first
                  login.
                </p>
                <button
                  onClick={() => {
                    setShowModal(false)
                    setTempPassword(null)
                  }}
                  className="w-full rounded-md bg-[var(--accent)] py-2 text-sm font-medium text-[var(--background)]"
                >
                  Done
                </button>
              </div>
            ) : (
              // Step 1: Create form
              <div>
                <h2 className="mb-1 text-lg font-semibold text-[var(--accent)]">
                  Add Employee
                </h2>
                <p className="mb-4 text-sm text-[var(--muted-foreground)]">
                  A temporary password will be generated automatically.
                </p>
                <form onSubmit={handleCreate} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-[var(--accent)]">
                      Full Name
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Jane Smith"
                      className="w-full rounded-md border border-[var(--card-border)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-[var(--accent)]">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="jane@company.com"
                      className="w-full rounded-md border border-[var(--card-border)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                    />
                  </div>
                  <div className="flex flex-col gap-2 pt-1 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="w-full flex-1 rounded-md border border-[var(--card-border)] py-2 text-sm font-medium text-[var(--muted-foreground)] hover:bg-[color-mix(in_oklab,var(--background)_96%,#ffffff_4%)]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={creating}
                      className="w-full flex-1 rounded-md bg-[var(--accent)] py-2 text-sm font-medium text-[var(--background)] hover:brightness-110 disabled:opacity-50"
                    >
                      {creating ? 'Creating...' : 'Create Employee'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}