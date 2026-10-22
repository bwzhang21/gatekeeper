"use client";

import { useAppState } from "@/components/providers/app-provider";
import type { Application } from "@/lib/types";

export function ActionButtons({
  application,
  compact = false,
}: {
  application: Application;
  compact?: boolean;
}) {
  const { requestAction } = useAppState();
  const disabled =
    application.status === "accepted" || application.status === "declined";
  const size = compact ? "px-2.5 py-1.5 text-xs" : "px-3 py-2 text-sm";

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        disabled={disabled}
        onClick={() => requestAction({ action: "accept", application })}
        className={`${size} rounded-lg bg-emerald-600 font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-40`}
      >
        Accept
      </button>
      <button
        type="button"
        disabled={disabled}
        onClick={() => requestAction({ action: "request_info", application })}
        className={`${size} rounded-lg bg-white font-medium text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40`}
      >
        Ask for more information
      </button>
      <button
        type="button"
        disabled={disabled}
        onClick={() => requestAction({ action: "decline", application })}
        className={`${size} rounded-lg bg-rose-600 font-medium text-white hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-40`}
      >
        Decline
      </button>
    </div>
  );
}
