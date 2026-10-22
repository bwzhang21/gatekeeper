"use client";

import { useEffect, useState } from "react";
import { useAppState } from "@/components/providers/app-provider";

const titles = {
  accept: "Accept this applicant?",
  request_info: "Ask for more information?",
  decline: "Decline this applicant?",
} as const;

const descriptions = {
  accept:
    "They will be marked as accepted and counted toward your membership stats. This is a local mock action.",
  request_info:
    "The application will move to Needs info. Add the question you want the applicant to answer.",
  decline:
    "They will be marked as declined. You can also add them to the shared blocklist.",
} as const;

export function ConfirmDialog() {
  const { confirmPayload, closeConfirm, confirmAction, settings } =
    useAppState();
  const [message, setMessage] = useState("");
  const [addToBlocklist, setAddToBlocklist] = useState(false);

  useEffect(() => {
    if (!confirmPayload) return;
    setAddToBlocklist(false);
    if (confirmPayload.action === "accept") {
      setMessage(`Accepted into ${settings.communityName}.`);
    } else if (confirmPayload.action === "request_info") {
      setMessage("");
    } else {
      setMessage("");
    }
  }, [confirmPayload, settings.communityName]);

  if (!confirmPayload) return null;

  const { action, application } = confirmPayload;
  const canSubmit =
    action === "accept" || message.trim().length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-slate-950/50"
        aria-label="Close confirmation"
        onClick={closeConfirm}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-200"
      >
        <p className="text-xs font-medium uppercase tracking-wide text-teal-700">
          Confirm action
        </p>
        <h2 id="confirm-title" className="mt-1 text-xl font-semibold text-slate-900">
          {titles[action]}
        </h2>
        <p className="mt-2 text-sm text-slate-600">{descriptions[action]}</p>
        <div className="mt-4 rounded-xl bg-slate-50 p-4">
          <p className="font-medium text-slate-900">{application.name}</p>
          <p className="text-sm text-slate-500">
            {application.email} · {application.roleSought}
          </p>
        </div>
        <label className="mt-4 block text-sm font-medium text-slate-700">
          {action === "accept"
            ? "Note for the record"
            : action === "request_info"
              ? "What do you need from them?"
              : "Decline reason"}
          <textarea
            className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none ring-teal-600/20 focus:ring-4"
            rows={3}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder={
              action === "request_info"
                ? "Please share two member vouchers and a short bio."
                : action === "decline"
                  ? "Does not meet contribution or trust bar."
                  : undefined
            }
          />
        </label>
        {action === "decline" ? (
          <label className="mt-3 flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={addToBlocklist}
              onChange={(event) => setAddToBlocklist(event.target.checked)}
              className="size-4 rounded border-slate-300 text-teal-700"
            />
            Also add to the shared blocklist
          </label>
        ) : null}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={closeConfirm}
            className="rounded-xl px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!canSubmit}
            onClick={() => confirmAction(message.trim(), addToBlocklist)}
            className={`rounded-xl px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50 ${
              action === "decline"
                ? "bg-rose-600 hover:bg-rose-700"
                : action === "accept"
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-teal-700 hover:bg-teal-800"
            }`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
