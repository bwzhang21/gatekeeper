"use client";

import Link from "next/link";
import { ActionButtons } from "@/components/review/action-buttons";
import { useAppState } from "@/components/providers/app-provider";
import { RiskBadge, StatusBadge } from "@/components/ui/status-badge";
import { formatDateTime } from "@/lib/format";
import type { ApplicationStatus } from "@/lib/types";

const statusOrder: ApplicationStatus[] = [
  "pending",
  "in_review",
  "needs_info",
  "accepted",
  "declined",
];

export function DashboardView() {
  const { applications, blocklist, settings } = useAppState();
  const pending = applications.filter((item) =>
    ["pending", "in_review", "needs_info"].includes(item.status),
  );
  const accepted = applications.filter((item) => item.status === "accepted");
  const declined = applications.filter((item) => item.status === "declined");
  const decided = accepted.length + declined.length;
  const acceptanceRate = decided
    ? Math.round((accepted.length / decided) * 100)
    : 0;
  const highRisk = applications.filter((item) => item.riskLevel === "high");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Screening overview for {settings.communityName}. All figures are mock
          data held in local state.
        </p>
      </div>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total applications"
          value={String(applications.length)}
          hint="This session"
        />
        <StatCard
          label="Pending reviews"
          value={String(pending.length)}
          hint={`${settings.reviewSlaHours}h SLA`}
        />
        <StatCard
          label="Acceptance rate"
          value={`${acceptanceRate}%`}
          hint={`${accepted.length} accepted · ${declined.length} declined`}
        />
        <StatCard
          label="Shared blocklist"
          value={String(blocklist.length)}
          hint={`${highRisk.length} high-risk flags`}
        />
      </section>
      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Status mix</h2>
            <Link
              href="/applications"
              className="text-sm font-medium text-teal-700 hover:text-teal-800"
            >
              View all
            </Link>
          </div>
          <div className="mt-5 space-y-3">
            {statusOrder.map((status) => {
              const count = applications.filter(
                (item) => item.status === status,
              ).length;
              const width = Math.max(
                8,
                Math.round((count / applications.length) * 100),
              );
              return (
                <div key={status}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <StatusBadge status={status} />
                    <span className="text-slate-500">{count}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-teal-600"
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
          <h2 className="font-semibold text-slate-900">Attention</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="rounded-xl bg-rose-50 p-3 text-rose-900">
              {highRisk.length === 1
                ? "1 high-risk application needs a careful human pass."
                : `${highRisk.length} high-risk applications need a careful human pass.`}
            </li>
            <li className="rounded-xl bg-amber-50 p-3 text-amber-900">
              {pending.filter((item) => item.status === "needs_info").length === 1
                ? "1 applicant is waiting on more information."
                : `${pending.filter((item) => item.status === "needs_info").length} applicants are waiting on more information.`}
            </li>
            <li className="rounded-xl bg-slate-50 p-3 text-slate-700">
              Blocklist currently shared with Harbor Club and Atlas Operators
              (mock).
            </li>
          </ul>
        </div>
      </section>
      <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-slate-900">Needs a decision</h2>
          <Link
            href="/review"
            className="text-sm font-medium text-teal-700 hover:text-teal-800"
          >
            Open queue
          </Link>
        </div>
        <div className="mt-4 divide-y divide-slate-100">
          {pending.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-3 py-4 lg:flex-row lg:items-center lg:justify-between"
            >
              <div>
                <p className="font-medium text-slate-900">{item.name}</p>
                <p className="text-sm text-slate-500">
                  {item.roleSought} · {formatDateTime(item.appliedAt)}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <StatusBadge status={item.status} />
                  <RiskBadge level={item.riskLevel} />
                </div>
              </div>
              <ActionButtons application={item} compact />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
        {value}
      </p>
      <p className="mt-1 text-xs text-slate-500">{hint}</p>
    </div>
  );
}
