import type { ApplicationStatus, RiskLevel } from "./types";

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

export function formatDateTime(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function statusLabel(status: ApplicationStatus) {
  switch (status) {
    case "pending":
      return "Pending";
    case "in_review":
      return "In review";
    case "needs_info":
      return "Needs info";
    case "accepted":
      return "Accepted";
    case "declined":
      return "Declined";
  }
}

export function riskLabel(level: RiskLevel) {
  switch (level) {
    case "low":
      return "Low risk";
    case "medium":
      return "Medium";
    case "high":
      return "High risk";
  }
}

export function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}
