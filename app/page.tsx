'use client';

import { useEffect, useMemo, useState } from "react";
import { ThemeToggle } from "./components/theme-toggle";

type User = {
  id: string;
  name: string;
  role: string;
};

type TaskStatus = "Pending" | "In Progress" | "Completed";

type Task = {
  id: string;
  title: string;
  description: string;
  assignedBy: string;
  deadline: string;
  status: TaskStatus;
};

const MOCK_TASKS: Task[] = [
  {
    id: "1",
    title: "Complete Project Documentation",
    description: "Write comprehensive documentation for the task management system",
    assignedBy: "System Admin",
    deadline: "Feb 25, 2026, 5:00 PM",
    status: "In Progress",
  },
];

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await fetch("/api/me");
        if (!res.ok) return;
        const data = (await res.json()) as User;
        setUser(data);
      } catch {
        // best-effort; keep UI functional even if the call fails
      }
    };

    loadUser();
  }, []);

  const stats = useMemo(() => {
    const total = MOCK_TASKS.length;
    const pending = MOCK_TASKS.filter((t) => t.status === "Pending").length;
    const inProgress = MOCK_TASKS.filter(
      (t) => t.status === "In Progress",
    ).length;
    const completed = MOCK_TASKS.filter(
      (t) => t.status === "Completed",
    ).length;

    return {
      total,
      pending,
      inProgress,
      completed,
    };
  }, []);

  const currentUserName = user?.name ?? "John Employee";
  const currentUserRole = user?.role ?? "Employee";

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto flex min-h-screen max-w-6xl">
        <aside className="flex w-64 flex-col border-r border-[var(--card-border)] bg-[var(--card-background)]/90 px-6 py-6">
          <div className="mb-8">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
              Employee Portal
            </div>
            <div className="mt-2 text-xl font-semibold text-[var(--accent)]">
              Task Manager
            </div>
          </div>

          <nav className="space-y-1 text-sm font-medium text-[var(--muted-foreground)]">
            <button className="flex w-full items-center justify-between rounded-lg bg-[var(--accent-soft)] px-3 py-2 text-[var(--accent)]">
              <span>Dashboard</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            </button>
            <button className="flex w-full items-center justify-between rounded-lg px-3 py-2 hover:bg-[var(--card-background)]">
              <span>Profile</span>
            </button>
          </nav>

          <div className="mt-auto space-y-4 pt-8 text-sm">
            <div className="flex items-center gap-3 rounded-xl border border-[var(--card-border)] bg-[var(--card-background)] px-3 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent-soft)] text-xs font-semibold text-[var(--accent)]">
                {currentUserName
                  .split(" ")
                  .map((part) => part[0])
                  .join("")}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-[var(--accent)]">
                  {currentUserName}
                </span>
                <span className="text-xs text-[var(--muted-foreground)]">
                  {currentUserRole}
                </span>
              </div>
            </div>

            <button className="flex items-center justify-center rounded-lg border border-[var(--card-border)] bg-[var(--card-background)] px-3 py-2 text-xs font-medium text-[var(--accent)] hover:bg-[var(--accent-soft)]">
              Logout
            </button>
          </div>
        </aside>

        <main className="flex-1 px-10 py-8">
          <header className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                Dashboard
              </div>
              <h1 className="mt-2 text-2xl font-semibold text-[var(--accent)]">
                Welcome back, {currentUserName}
              </h1>
            </div>
            <ThemeToggle />
          </header>

          <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-4">
            <StatCard label="Total Tasks" value={stats.total} />
            <StatCard label="Pending" value={stats.pending} />
            <StatCard label="In Progress" value={stats.inProgress} />
            <StatCard label="Completed" value={stats.completed} />
          </section>

          <section className="mt-10">
            <h2 className="text-sm font-semibold text-[var(--accent)]">
              My Tasks
            </h2>

            <div className="mt-4 overflow-hidden rounded-xl border border-[var(--card-border)] bg-[var(--card-background)] text-sm">
              <div className="grid grid-cols-[1.5fr,1fr,1fr,1fr,1fr] border-b border-[var(--card-border)] bg-[var(--background)]/60 px-6 py-3 text-xs font-medium text-[var(--muted-foreground)]">
                <span>Task</span>
                <span>Assigned By</span>
                <span>Deadline</span>
                <span>Status</span>
                <span className="text-right">Actions</span>
              </div>

              {MOCK_TASKS.map((task) => (
                <div
                  key={task.id}
                  className="grid grid-cols-[1.5fr,1fr,1fr,1fr,1fr] items-center px-6 py-4 text-xs text-[var(--foreground)]"
                >
                  <div>
                    <div className="font-medium text-[var(--accent)]">
                      {task.title}
                    </div>
                    <div className="mt-1 text-[var(--muted-foreground)]">
                      {task.description}
                    </div>
                  </div>
                  <span className="text-[var(--muted-foreground)]">
                    {task.assignedBy}
                  </span>
                  <span className="text-[var(--muted-foreground)]">
                    {task.deadline}
                  </span>
                  <span>
                    <span className="inline-flex rounded-full border border-sky-400/40 bg-sky-50/80 px-2 py-0.5 text-[10px] font-medium text-sky-700">
                      {task.status}
                    </span>
                  </span>
                  <span className="flex justify-end">
                    <button className="rounded-md border border-[var(--card-border)] bg-[var(--card-background)] px-2 py-1 text-[10px] font-medium text-[var(--muted-foreground)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]">
                      {task.status}
                    </button>
                  </span>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

type StatCardProps = {
  label: string;
  value: number;
};

function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-background)] px-4 py-4 shadow-sm">
      <div className="text-xs font-medium text-[var(--muted-foreground)]">
        {label}
      </div>
      <div className="mt-3 text-2xl font-semibold text-[var(--accent)]">
        {value}
      </div>
    </div>
  );
}

