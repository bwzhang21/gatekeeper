"use client";

import { useState, type ReactNode } from "react";
import { AppProvider, useAppState } from "@/components/providers/app-provider";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Toast } from "@/components/ui/toast";
import { Sidebar } from "./sidebar";

function Shell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { settings } = useAppState();

  return (
    <div className="flex min-h-full bg-slate-50">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-lg p-2 text-slate-700 ring-1 ring-slate-200 lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open navigation"
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="none">
                <path
                  d="M5 7h14M5 12h14M5 17h14"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Membership screening
              </p>
              <p className="text-sm font-semibold text-slate-900">
                {settings.communityName}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-800 sm:inline">
              Human review required
            </span>
            <div className="flex size-9 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
              AD
            </div>
          </div>
        </header>
        <main className="flex-1 px-4 py-6 lg:px-8">{children}</main>
      </div>
      <ConfirmDialog />
      <Toast />
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <AppProvider>
      <Shell>{children}</Shell>
    </AppProvider>
  );
}
