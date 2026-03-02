"use client"

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import Link from "next/link";
import {
  LayoutDashboard,
  UserCircle,
  Users,
  ClipboardList,
  LogOut,
  X,
  ShieldCheck,
  Menu,
  HelpCircle,
  Mail,
  Info,
  FileText,
} from "lucide-react";
import { TbShield } from "react-icons/tb";
import { useGetMeQuery } from "@/lib/meApi";
import { useDispatch } from "react-redux";
import { resetAllApiState } from "@/lib/resetApiState";
import type { AppDispatch } from "@/lib/store";
import { TaskForgeLogoWithTagline } from "@/app/components/taskforge-logo";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: me } = useGetMeQuery();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  const allLinks = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard, adminOnly: false },
    { href: "/employees", label: "Employees", icon: Users, adminOnly: true },
    // Employees already see their tasks inside the dashboard, so keep the full
    // Tasks management page accessible only for admins.
    { href: "/tasks", label: "Tasks", icon: ClipboardList, adminOnly: true },
    { href: "/profile", label: "Profile", icon: UserCircle, adminOnly: false },
  ];
  const navLinks = allLinks.filter((l) => !l.adminOnly || me?.role === "admin");
  const supportLinks = [
    { href: "/about", label: "About", icon: Info },
    { href: "/faq", label: "FAQ", icon: HelpCircle },
    { href: "/contact", label: "Contact", icon: Mail },
    { href: "/privacy", label: "Privacy", icon: FileText },
    { href: "/terms", label: "Terms", icon: FileText },
    { href: "/cookies", label: "Cookies", icon: FileText },
  ];

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    resetAllApiState(dispatch);
    toast.success("Logged out");
    router.replace("/login");
    router.refresh();
  }

  return (
    <div className="flex h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Mobile sidebar toggle */}
      <button
        type="button"
        onClick={() => setSidebarOpen(true)}
        className="fixed left-4 top-4 z-40 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--card-border)] bg-[var(--card-background)] text-[var(--accent)] shadow-sm md:hidden"
        aria-label="Open navigation"
      >
        <Menu size={18} />
      </button>
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
        />
      )}
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-56 shrink-0 flex-col border-r border-[var(--card-border)] bg-[var(--card-background)] transition-transform duration-200 md:static md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Brand row */}
        <div className="flex items-start justify-between px-5 pt-5 pb-4">
          <TaskForgeLogoWithTagline
            tagline={
              me?.role === "admin" ? (
                <>
                  <TbShield className="text-emerald-500" size={18} />
                  Admin Portal
                </>
              ) : (
                "Employee Portal"
              )
            }
          />
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="mt-0.5 text-[var(--muted-foreground)] transition-colors hover:text-[var(--accent)] md:hidden"
            aria-label="Close navigation"
          >
            <X size={14} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-0.5 px-3">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors ${
                  active
                    ? "bg-[var(--accent)] text-[var(--background)]"
                    : "text-[var(--muted-foreground)] hover:bg-[color-mix(in_oklab,var(--background)_94%,#ffffff_6%)] hover:text-[var(--accent)]"
                }`}
              >
                <Icon size={15} strokeWidth={1.8} />
                {label}
              </Link>
            );
          })}

          <div className="mt-4 px-3">
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
              Help &amp; Legal
            </div>
          </div>
          <div className="space-y-0.5">
            {supportLinks.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors ${
                    active
                      ? "bg-[var(--accent)] text-[var(--background)]"
                      : "text-[var(--muted-foreground)] hover:bg-[color-mix(in_oklab,var(--background)_94%,#ffffff_6%)] hover:text-[var(--accent)]"
                  }`}
                >
                  <Icon size={15} strokeWidth={1.8} />
                  {label}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom: user card + logout */}
        <div className="mt-4 space-y-1.5 px-3 pb-4">
          {me && (
            <div className="rounded-md border border-[var(--card-border)] bg-[color-mix(in_oklab,var(--background)_94%,#ffffff_6%)] px-3 py-2.5">
              <p className="text-xs font-semibold text-[var(--accent)]">
                {me.name}
              </p>
              <p className="mt-0.5 truncate text-xs text-[var(--muted-foreground)]">
                {me.email}
              </p>
              <p className="mt-0.5 flex items-center gap-1 text-xs text-[var(--muted-foreground)] capitalize">
                {me.role === "admin" && (
                  <ShieldCheck size={12} className="text-emerald-500" />
                )}
                <span>Role: {me.role}</span>
              </p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-[var(--muted-foreground)] transition-colors hover:bg-[color-mix(in_oklab,var(--background)_94%,#ffffff_6%)] hover:text-[var(--accent)]"
          >
            <LogOut size={14} strokeWidth={1.8} />
            Logout
          </button>
        </div>
      </aside>

      {/* Page content */}
      <main className="flex-1 overflow-y-auto bg-[var(--background)] text-[var(--foreground)]">
        <div className="flex min-h-full flex-col">
          <div className="flex-1">{children}</div>
          <footer className="text-center border-t border-[var(--card-border)] px-4 py-3 text-xs text-[var(--muted-foreground)] sm:px-8">
            <p>© {new Date().getFullYear()} TaskForge. All rights reserved.</p>
          </footer>
        </div>
      </main>
    </div>
  );
}

