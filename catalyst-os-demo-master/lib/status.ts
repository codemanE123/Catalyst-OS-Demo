import type { ChallengeStatus, TeamStatus } from "@/lib/mock-data";

export const challengeStatusLabel: Record<ChallengeStatus, string> = {
  upcoming: "Upcoming",
  open: "Registration Open",
  in_progress: "In Progress",
  closed: "Results Published",
};

export const challengeStatusBadgeClass: Record<ChallengeStatus, string> = {
  upcoming: "bg-secondary text-secondary-foreground",
  open: "bg-lime text-lime-foreground",
  in_progress: "bg-primary text-primary-foreground",
  closed: "bg-accent text-accent-foreground",
};

export const teamStatusLabel: Record<TeamStatus, string> = {
  forming: "Forming",
  building: "Building",
  submitted: "Submitted",
  judged: "Judged",
};
