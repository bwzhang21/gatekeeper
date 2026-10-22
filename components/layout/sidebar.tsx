"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppState } from "@/components/providers/app-provider";

const nav = [
  { href: "/", label: "Dashboard", icon: DashboardIcon },
  { href: "/applications", label: "Applications", icon: ApplicationsIcon },
  { href: "/review", label: "Review Queue", icon: ReviewIcon },
  { href: "/blocklist", label: "Shared Blocklist", icon: BlocklistIcon },
  { href: "/settings", label: "Settings", icon: SettingsIcon },
];

export function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const { applications, settings } = useAppState();
  const queueCount = applications.filter(
    (item) =>
      item.status === "pending" ||
      item.status === "in_review" ||
      item.status === "needs_info",
  ).length;

  return (
    <>
      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden"
          aria-label="Close navigation"
          onClick={onClose}
        />
      ) : null}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 shrink-0 flex-col bg-slate-950 text-slate-100 transition-transform lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-3 px-6 py-6">
          <span className="flex size-10 items-center justify-center rounded-xl bg-teal-500 text-slate-950">
            <ShieldIcon />
          </span>
          <div>
            <p className="text-sm font-semibold tracking-wide">Gatekeeper</p>
            <p className="text-xs text-slate-400">{settings.communityName}</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-3">
                  <item.icon />
                  {item.label}
                </span>
                {item.href === "/review" ? (
                  <span className="rounded-full bg-teal-500 px-2 py-0.5 text-[11px] font-semibold text-slate-950">
                    {queueCount}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>
        <div className="m-4 rounded-2xl bg-white/5 p-4 text-xs text-slate-400">
          <p className="font-medium text-slate-200">Mock screening only</p>
          <p className="mt-1 leading-5">
            Decisions stay in local state. No AI, APIs, or databases are wired
            up yet.
          </p>
        </div>
      </aside>
    </>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden>
      <path
        d="M12 3.5 5 6.5v5.2c0 4.2 2.8 7.9 7 8.8 4.2-.9 7-4.6 7-8.8V6.5L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M9 12.2 11 14l4-4.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DashboardIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden>
      <rect x="4" y="4" width="7" height="7" rx="1.5" stroke="currentColor" />
      <rect x="13" y="4" width="7" height="4" rx="1.5" stroke="currentColor" />
      <rect x="13" y="10" width="7" height="10" rx="1.5" stroke="currentColor" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" stroke="currentColor" />
    </svg>
  );
}

function ApplicationsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden>
      <path
        d="M7 4h10a2 2 0 0 1 2 2v14l-3-2-3 2-3-2-3 2V6a2 2 0 0 1 2-2Z"
        stroke="currentColor"
      />
      <path d="M9 9h6M9 13h4" stroke="currentColor" strokeLinecap="round" />
    </svg>
  );
}

function ReviewIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="6" stroke="currentColor" />
      <path d="m16 16 4 4" stroke="currentColor" strokeLinecap="round" />
    </svg>
  );
}

function BlocklistIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8" stroke="currentColor" />
      <path d="m8 8 8 8" stroke="currentColor" strokeLinecap="round" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="3" stroke="currentColor" />
      <path
        d="M12 4.5v1.6M12 17.9v1.6M4.5 12h1.6M17.9 12h1.6M6.7 6.7l1.1 1.1M16.2 16.2l1.1 1.1M17.3 6.7l-1.1 1.1M7.8 16.2l-1.1 1.1"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </svg>
  );
}
