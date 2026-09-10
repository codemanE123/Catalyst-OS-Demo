export interface School {
  id: string;
  name: string;
  shortName: string;
  city: string;
  state: string;
  colorFrom: string;
  colorTo: string;
}

export interface Student {
  id: string;
  name: string;
  avatarSeed: string;
  grade: string;
  bio: string;
  skillTags: string[];
  xp: number;
  badgeIds: string[];
  schoolId: string;
}

export type ChallengeStatus = "upcoming" | "open" | "in_progress" | "closed";
export type ChallengeFormat = "solo" | "team";
export type ChallengeDifficulty = "beginner" | "intermediate" | "advanced";

export interface RubricCriterion {
  criterion: string;
  maxScore: number;
  description: string;
}

export interface Challenge {
  id: string;
  title: string;
  theme: string;
  sponsor: string | null;
  coverIcon: string;
  colorFrom: string;
  colorTo: string;
  shortDescription: string;
  brief: string;
  status: ChallengeStatus;
  format: ChallengeFormat;
  difficulty: ChallengeDifficulty;
  minTeamSize: number;
  maxTeamSize: number;
  skillTags: string[];
  toolTags: string[];
  rubric: RubricCriterion[];
  reward: string;
  registrationOpens: string;
  startDate: string;
  submissionDeadline: string;
  resultsDate: string;
  schoolId: string;
}

export type TeamStatus = "forming" | "building" | "submitted" | "judged";

export interface Team {
  id: string;
  challengeId: string;
  name: string;
  description: string;
  studentIds: string[];
  status: TeamStatus;
  maxSize: number;
}

export interface SubmissionLink {
  label: string;
  url: string;
}

export interface Submission {
  id: string;
  teamId: string;
  challengeId: string;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  toolsUsed: string[];
  links: SubmissionLink[];
  contributions: { studentId: string; contribution: string }[];
  submittedAt: string;
}

export interface CriterionScore {
  criterion: string;
  score: number;
  maxScore: number;
  feedback: string;
}

export interface JudgeResult {
  id: string;
  submissionId: string;
  judgeName: string;
  scores: CriterionScore[];
  overallFeedback: string;
  totalScore: number;
  maxTotalScore: number;
  xpAwarded: number;
  badgeIdsAwarded: string[];
  recognitionTitle: string | null;
  publishedAt: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
}
