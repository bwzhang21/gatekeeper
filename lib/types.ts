export type ApplicationStatus =
  | "pending"
  | "in_review"
  | "needs_info"
  | "accepted"
  | "declined";

export type RiskLevel = "low" | "medium" | "high";

export type Application = {
  id: string;
  name: string;
  email: string;
  handle: string;
  community: string;
  roleSought: string;
  appliedAt: string;
  status: ApplicationStatus;
  riskLevel: RiskLevel;
  screeningScore: number;
  location: string;
  answers: {
    whyJoin: string;
    contribution: string;
    referral: string;
  };
  flags: string[];
  notes: string[];
};

export type BlocklistEntry = {
  id: string;
  name: string;
  email: string;
  reason: string;
  sourceCommunity: string;
  addedAt: string;
};

export type CommunitySettings = {
  communityName: string;
  reviewSlaHours: number;
  notifyOnNewApplication: boolean;
  requireHumanConfirm: boolean;
  autoFlagHighRisk: boolean;
};

export type ReviewAction = "accept" | "request_info" | "decline";
