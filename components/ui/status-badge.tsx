import { riskLabel, statusLabel } from "@/lib/format";
import type { ApplicationStatus, RiskLevel } from "@/lib/types";

const statusStyles: Record<ApplicationStatus, string> = {
  pending: "bg-amber-50 text-amber-800 ring-amber-200",
  in_review: "bg-sky-50 text-sky-800 ring-sky-200",
  needs_info: "bg-violet-50 text-violet-800 ring-violet-200",
  accepted: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  declined: "bg-rose-50 text-rose-800 ring-rose-200",
};

const riskStyles: Record<RiskLevel, string> = {
  low: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  medium: "bg-amber-50 text-amber-800 ring-amber-200",
  high: "bg-rose-50 text-rose-800 ring-rose-200",
};

export function StatusBadge({ status }: { status: ApplicationStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${statusStyles[status]}`}
    >
      {statusLabel(status)}
    </span>
  );
}

export function RiskBadge({ level }: { level: RiskLevel }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${riskStyles[level]}`}
    >
      {riskLabel(level)}
    </span>
  );
}
