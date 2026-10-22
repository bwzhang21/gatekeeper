"use client";

import { useMemo, useState } from "react";
import { ActionButtons } from "@/components/review/action-buttons";
import { useAppState } from "@/components/providers/app-provider";
import { RiskBadge, StatusBadge } from "@/components/ui/status-badge";
import { formatDate, initials } from "@/lib/format";
import type { ApplicationStatus } from "@/lib/types";

const filters: { id: "all" | ApplicationStatus; label: string }[] = [
  { id: "all", label: "All" },
  { id: "pending", label: "Pending" },
  { id: "in_review", label: "In review" },
  { id: "needs_info", label: "Needs info" },
  { id: "accepted", label: "Accepted" },
  { id: "declined", label: "Declined" },
];

export function ApplicationsView() {
  const { applications } = useAppState();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");

  const rows = useMemo(() => {
    return applications.filter((item) => {
      const matchesFilter = filter === "all" || item.status === filter;
      const haystack = `${item.name} ${item.email} ${item.handle}`.toLowerCase();
      return matchesFilter && haystack.includes(query.toLowerCase());
    });
  }, [applications, filter, query]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Applications
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Fictional applicant records with live status updates in this session.
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              className={`rounded-full px-3 py-1.5 text-sm ${
                filter === item.id
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-600 ring-1 ring-slate-200"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search name, email, or handle"
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-teal-600/20 focus:ring-4 sm:max-w-xs"
        />
      </div>
      <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium">Applicant</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Applied</th>
                <th className="px-4 py-3 font-medium">Score</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((item) => (
                <tr key={item.id} className="border-t border-slate-100">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex size-9 items-center justify-center rounded-full bg-teal-50 text-xs font-semibold text-teal-800">
                        {initials(item.name)}
                      </span>
                      <div>
                        <p className="font-medium text-slate-900">{item.name}</p>
                        <p className="text-xs text-slate-500">
                          {item.email} · {item.handle}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-slate-600">{item.roleSought}</td>
                  <td className="px-4 py-4 text-slate-600">
                    {formatDate(item.appliedAt)}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-900">
                        {item.screeningScore}
                      </span>
                      <RiskBadge level={item.riskLevel} />
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-4 py-4">
                    <ActionButtons application={item} compact />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {rows.length === 0 ? (
          <p className="px-4 py-10 text-center text-sm text-slate-500">
            No applications match this filter.
          </p>
        ) : null}
      </div>
    </div>
  );
}
