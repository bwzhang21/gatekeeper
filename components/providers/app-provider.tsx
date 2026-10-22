"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  initialApplications,
  initialBlocklist,
  initialSettings,
} from "@/lib/mock-data";
import type {
  Application,
  BlocklistEntry,
  CommunitySettings,
  ReviewAction,
} from "@/lib/types";

export type ConfirmPayload = {
  action: ReviewAction;
  application: Application;
};

type AppContextValue = {
  applications: Application[];
  blocklist: BlocklistEntry[];
  settings: CommunitySettings;
  toast: string | null;
  confirmPayload: ConfirmPayload | null;
  requestAction: (payload: ConfirmPayload) => void;
  closeConfirm: () => void;
  confirmAction: (message: string, addToBlocklist?: boolean) => void;
  addBlocklistEntry: (entry: Omit<BlocklistEntry, "id" | "addedAt">) => void;
  removeBlocklistEntry: (id: string) => void;
  updateSettings: (next: Partial<CommunitySettings>) => void;
  dismissToast: () => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [applications, setApplications] = useState(initialApplications);
  const [blocklist, setBlocklist] = useState(initialBlocklist);
  const [settings, setSettings] = useState(initialSettings);
  const [toast, setToast] = useState<string | null>(null);
  const [confirmPayload, setConfirmPayload] = useState<ConfirmPayload | null>(
    null,
  );

  const requestAction = useCallback((payload: ConfirmPayload) => {
    setConfirmPayload(payload);
  }, []);

  const closeConfirm = useCallback(() => {
    setConfirmPayload(null);
  }, []);

  const confirmAction = useCallback(
    (message: string, addToBlocklist = false) => {
      if (!confirmPayload) return;
      const { action, application } = confirmPayload;
      const timestampNote = `${new Date().toISOString()} · ${message}`;

      setApplications((current) =>
        current.map((item) => {
          if (item.id !== application.id) return item;
          if (action === "accept") {
            return {
              ...item,
              status: "accepted",
              notes: [...item.notes, timestampNote],
            };
          }
          if (action === "request_info") {
            return {
              ...item,
              status: "needs_info",
              notes: [...item.notes, timestampNote],
            };
          }
          return {
            ...item,
            status: "declined",
            notes: [...item.notes, timestampNote],
          };
        }),
      );

      if (action === "decline" && addToBlocklist) {
        setBlocklist((current) => [
          {
            id: `bl-${Date.now()}`,
            name: application.name,
            email: application.email,
            reason: message,
            sourceCommunity: settings.communityName,
            addedAt: new Date().toISOString(),
          },
          ...current,
        ]);
      }

      const verb =
        action === "accept"
          ? `Accepted ${application.name}`
          : action === "request_info"
            ? `Asked ${application.name} for more information`
            : `Declined ${application.name}`;
      setToast(verb);
      setConfirmPayload(null);
    },
    [confirmPayload, settings.communityName],
  );

  const addBlocklistEntry = useCallback(
    (entry: Omit<BlocklistEntry, "id" | "addedAt">) => {
      setBlocklist((current) => [
        {
          ...entry,
          id: `bl-${Date.now()}`,
          addedAt: new Date().toISOString(),
        },
        ...current,
      ]);
      setToast(`Added ${entry.name} to the shared blocklist`);
    },
    [],
  );

  const removeBlocklistEntry = useCallback((id: string) => {
    setBlocklist((current) => current.filter((entry) => entry.id !== id));
    setToast("Removed entry from the shared blocklist");
  }, []);

  const updateSettings = useCallback((next: Partial<CommunitySettings>) => {
    setSettings((current) => ({ ...current, ...next }));
    setToast("Settings saved locally");
  }, []);

  const dismissToast = useCallback(() => setToast(null), []);

  const value = useMemo(
    () => ({
      applications,
      blocklist,
      settings,
      toast,
      confirmPayload,
      requestAction,
      closeConfirm,
      confirmAction,
      addBlocklistEntry,
      removeBlocklistEntry,
      updateSettings,
      dismissToast,
    }),
    [
      applications,
      blocklist,
      settings,
      toast,
      confirmPayload,
      requestAction,
      closeConfirm,
      confirmAction,
      addBlocklistEntry,
      removeBlocklistEntry,
      updateSettings,
      dismissToast,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppState must be used within AppProvider");
  }
  return context;
}
