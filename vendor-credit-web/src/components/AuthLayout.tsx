import type { ReactNode } from "react";
import { BrandMark } from "./BrandMark";

type AuthLayoutProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
};

export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: AuthLayoutProps) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <aside className="hidden bg-brand p-12 lg:flex lg:flex-col lg:justify-between">
        <BrandMark surface="light" />
        <p className="max-w-sm text-lg text-white/80">
          Apply for a business loan and track every application in one place.
        </p>
      </aside>
      <main className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden">
            <BrandMark surface="dark" />
          </div>
          <header className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight text-brand">
              {title}
            </h1>
            <p className="text-slate-600">{subtitle}</p>
          </header>
          {children}
          <p className="text-sm text-slate-600">{footer}</p>
        </div>
      </main>
    </div>
  );
}
