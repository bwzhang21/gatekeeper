"use client";

import { FormEvent, useState } from "react";
import { useAppState } from "@/components/providers/app-provider";
import { formatDate } from "@/lib/format";

export function BlocklistView() {
  const { blocklist, addBlocklistEntry, removeBlocklistEntry, settings } =
    useAppState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [pendingRemove, setPendingRemove] = useState<string | null>(null);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !reason.trim()) return;
    addBlocklistEntry({
      name: name.trim(),
      email: email.trim(),
      reason: reason.trim(),
      sourceCommunity: settings.communityName,
    });
    setName("");
    setEmail("");
    setReason("");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Shared blocklist
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Mock identities communities can share so known bad actors do not hop
          between member groups.
        </p>
      </div>
      <form
        onSubmit={onSubmit}
        className="grid gap-3 rounded-2xl bg-white p-5 ring-1 ring-slate-200 md:grid-cols-4"
      >
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Name"
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-4 focus:ring-teal-600/20"
        />
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          type="email"
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-4 focus:ring-teal-600/20"
        />
        <input
          value={reason}
          onChange={(event) => setReason(event.target.value)}
          placeholder="Reason"
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-4 focus:ring-teal-600/20"
        />
        <button
          type="submit"
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Add entry
        </button>
      </form>
      <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Identity</th>
              <th className="px-4 py-3 font-medium">Reason</th>
              <th className="px-4 py-3 font-medium">Source</th>
              <th className="px-4 py-3 font-medium">Added</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {blocklist.map((entry) => (
              <tr key={entry.id} className="border-t border-slate-100">
                <td className="px-4 py-4">
                  <p className="font-medium text-slate-900">{entry.name}</p>
                  <p className="text-xs text-slate-500">{entry.email}</p>
                </td>
                <td className="px-4 py-4 text-slate-600">{entry.reason}</td>
                <td className="px-4 py-4 text-slate-600">
                  {entry.sourceCommunity}
                </td>
                <td className="px-4 py-4 text-slate-600">
                  {formatDate(entry.addedAt)}
                </td>
                <td className="px-4 py-4 text-right">
                  {pendingRemove === entry.id ? (
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        className="text-xs font-medium text-slate-500"
                        onClick={() => setPendingRemove(null)}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="text-xs font-semibold text-rose-700"
                        onClick={() => {
                          removeBlocklistEntry(entry.id);
                          setPendingRemove(null);
                        }}
                      >
                        Confirm remove
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="text-xs font-medium text-rose-700"
                      onClick={() => setPendingRemove(entry.id)}
                    >
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
