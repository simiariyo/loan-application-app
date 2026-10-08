import { NavLink, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { signOutApplicant } from "../services/authService";
import { BrandMark } from "./BrandMark";

function navLinkClasses({ isActive }: { isActive: boolean }) {
  return `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    isActive ? "bg-brand/10 text-brand" : "text-slate-600 hover:text-brand"
  }`;
}

export function AppLayout() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <BrandMark surface="light" />
          <nav className="flex items-center gap-1">
            <NavLink to="/loans/apply" className={navLinkClasses}>
              Apply
            </NavLink>
            <NavLink to="/loans" end className={navLinkClasses}>
              Loan history
            </NavLink>
          </nav>
          <div className="flex items-center gap-3">
            {/* displayName is set just after sign-up, so email covers that first render */}
            <span className="hidden text-sm text-slate-600 sm:inline">
              {user?.displayName ?? user?.email}
            </span>
            <button
              type="button"
              onClick={() => void signOutApplicant()}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:border-brand hover:text-brand"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <Outlet />
      </main>
    </div>
  );
}
