"use client";

import { ActionButtons } from "@/components/review/action-buttons";
import { useAppState } from "@/components/providers/app-provider";
import { RiskBadge, StatusBadge } from "@/components/ui/status-badge";
import { formatDateTime, initials } from "@/lib/format";

export function ReviewQueue() {
  const { applications } = useAppState();
  const queue = applications.filter(
    (item) =>
      item.status === "pending" ||
      item.status === "in_review" ||
      item.status === "needs_info",
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Review queue
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Pending human decisions. Accept, request more information, or decline
          after confirming the action.
        </p>
      </div>
      {queue.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 text-center ring-1 ring-slate-200">
          <p className="font-medium text-slate-900">Queue is clear</p>
          <p className="mt-1 text-sm text-slate-500">
            Every mock application has a final decision in this session.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {queue.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl bg-white p-5 ring-1 ring-slate-200"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                    {initials(item.name)}
                  </span>
                  <div>
                    <h2 className="font-semibold text-slate-900">{item.name}</h2>
                    <p className="text-sm text-slate-500">
                      {item.handle} · {item.location}
                    </p>
                  </div>
                </div>
                <StatusBadge status={item.status} />
              </div>
              <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-wide text-slate-500">
                    Role
                  </dt>
                  <dd className="mt-1 text-slate-800">{item.roleSought}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-slate-500">
                    Applied
                  </dt>
                  <dd className="mt-1 text-slate-800">
                    {formatDateTime(item.appliedAt)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-slate-500">
                    Screening score
                  </dt>
                  <dd className="mt-1 flex items-center gap-2 text-slate-800">
                    {item.screeningScore}
                    <RiskBadge level={item.riskLevel} />
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-slate-500">
                    Referral
                  </dt>
                  <dd className="mt-1 text-slate-800">{item.answers.referral}</dd>
                </div>
              </dl>
              <p className="mt-4 text-sm leading-6 text-slate-700">
                {item.answers.whyJoin}
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Contribution: {item.answers.contribution}
              </p>
              {item.flags.length > 0 ? (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {item.flags.map((flag) => (
                    <li
                      key={flag}
                      className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-800"
                    >
                      {flag}
                    </li>
                  ))}
                </ul>
              ) : null}
              {item.notes.length > 0 ? (
                <div className="mt-3 space-y-1 text-xs text-slate-500">
                  {item.notes.map((note) => (
                    <p key={note}>{note}</p>
                  ))}
                </div>
              ) : null}
              <div className="mt-5 border-t border-slate-100 pt-4">
                <ActionButtons application={item} />
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
