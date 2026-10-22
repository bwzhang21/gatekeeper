"use client";

import { FormEvent, useState } from "react";
import { useAppState } from "@/components/providers/app-provider";

export function SettingsView() {
  const { settings, updateSettings } = useAppState();
  const [communityName, setCommunityName] = useState(settings.communityName);
  const [reviewSlaHours, setReviewSlaHours] = useState(
    String(settings.reviewSlaHours),
  );
  const [notifyOnNewApplication, setNotifyOnNewApplication] = useState(
    settings.notifyOnNewApplication,
  );
  const [requireHumanConfirm, setRequireHumanConfirm] = useState(
    settings.requireHumanConfirm,
  );
  const [autoFlagHighRisk, setAutoFlagHighRisk] = useState(
    settings.autoFlagHighRisk,
  );

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    updateSettings({
      communityName: communityName.trim() || settings.communityName,
      reviewSlaHours: Number(reviewSlaHours) || 48,
      notifyOnNewApplication,
      requireHumanConfirm,
      autoFlagHighRisk,
    });
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Settings
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Local admin preferences for this demo. Nothing is persisted to a
          backend.
        </p>
      </div>
      <form
        onSubmit={onSubmit}
        className="space-y-5 rounded-2xl bg-white p-6 ring-1 ring-slate-200"
      >
        <label className="block text-sm font-medium text-slate-700">
          Community name
          <input
            value={communityName}
            onChange={(event) => setCommunityName(event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-4 focus:ring-teal-600/20"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Review SLA (hours)
          <input
            type="number"
            min={1}
            value={reviewSlaHours}
            onChange={(event) => setReviewSlaHours(event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-4 focus:ring-teal-600/20"
          />
        </label>
        <Toggle
          label="Email admins on new applications"
          checked={notifyOnNewApplication}
          onChange={setNotifyOnNewApplication}
        />
        <Toggle
          label="Require human confirmation before every decision"
          checked={requireHumanConfirm}
          onChange={setRequireHumanConfirm}
        />
        <Toggle
          label="Auto-flag high-risk applications in the queue"
          checked={autoFlagHighRisk}
          onChange={setAutoFlagHighRisk}
        />
        <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
          AI screening, Supabase auth, and shared blocklist sync are intentionally
          off. This screen only updates in-memory settings.
        </div>
        <button
          type="submit"
          className="rounded-xl bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800"
        >
          Save settings
        </button>
      </form>
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-4 text-sm text-slate-700">
      {label}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 rounded-full transition ${
          checked ? "bg-teal-700" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-0.5 size-5 rounded-full bg-white transition ${
            checked ? "left-[22px]" : "left-0.5"
          }`}
        />
      </button>
    </label>
  );
}
