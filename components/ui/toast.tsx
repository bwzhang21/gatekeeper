"use client";

import { useEffect } from "react";
import { useAppState } from "@/components/providers/app-provider";

export function Toast() {
  const { toast, dismissToast } = useAppState();

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(dismissToast, 3200);
    return () => window.clearTimeout(timer);
  }, [toast, dismissToast]);

  if (!toast) return null;

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-40">
      <p className="pointer-events-auto rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-lg">
        {toast}
      </p>
    </div>
  );
}
