"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  teams as baseTeams,
  challenges as baseChallenges,
  submissions as baseSubmissions,
  type Team,
  type Challenge,
  type Submission,
  type TeamStatus,
  type SkillDistributionEntry,
} from "@/lib/mock-data";
import * as selectors from "@/lib/selectors";

const STORAGE_KEY = "catalyst-os-demo-state-v1";

interface DemoStateShape {
  extraTeams: Team[];
  teamMemberOverrides: Record<string, string[]>;
  teamStatusOverrides: Record<string, TeamStatus>;
  extraSubmissions: Submission[];
  extraChallenges: Challenge[];
}

const emptyState: DemoStateShape = {
  extraTeams: [],
  teamMemberOverrides: {},
  teamStatusOverrides: {},
  extraSubmissions: [],
  extraChallenges: [],
};

interface CreateTeamInput {
  challengeId: string;
  name: string;
  description: string;
  creatorStudentId: string;
  maxSize: number;
}

type SubmitProjectInput = Omit<Submission, "id" | "submittedAt">;

interface CreateChallengeInput extends Omit<Challenge, "id"> {}

interface DemoStateContextValue {
  teams: Team[];
  challenges: Challenge[];
  submissions: Submission[];
  joinTeam: (teamId: string, studentId: string) => void;
  createTeam: (input: CreateTeamInput) => Team;
  submitProject: (input: SubmitProjectInput) => Submission;
  createChallenge: (input: CreateChallengeInput) => Challenge;
  resetDemo: () => void;
  // Bound selectors — same logic as lib/selectors.ts, pre-applied to live state.
  getTeamsForChallenge: (challengeId: string) => Team[];
  getTeamsForStudent: (studentId: string) => Team[];
  getChallengeParticipantCount: (challengeId: string) => number;
  getActiveChallengeForStudent: (studentId: string) => { team: Team; challenge: Challenge } | null;
  getRecommendedChallenges: (studentId: string, limit?: number) => Challenge[];
  getStudentPortfolio: (studentId: string) => selectors.PortfolioEntry[];
  getSchoolStats: (schoolId: string) => selectors.SchoolStats;
  findChallengeById: (id: string) => Challenge | undefined;
  findTeamById: (id: string) => Team | undefined;
  findSubmissionByTeam: (teamId: string) => Submission | undefined;
  getSubmissionsForChallenge: (challengeId: string) => Submission[];
  getChallengeTalent: (challengeId: string) => selectors.ChallengeTalentEntry[];
  getSkillDistributionForChallenge: (challengeId: string) => SkillDistributionEntry[];
  getChallengeJudgingStats: (challengeId: string) => selectors.ChallengeJudgingStats;
}

const DemoStateContext = createContext<DemoStateContextValue | null>(null);

export function DemoStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DemoStateShape>(emptyState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setState({ ...emptyState, ...JSON.parse(raw) });
    } catch {
      // Private browsing / blocked storage — demo runs fine on default seed data.
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore — nothing user-visible depends on persistence succeeding.
    }
  }, [state, hydrated]);

  const teams = useMemo<Team[]>(() => {
    return [...baseTeams, ...state.extraTeams].map((t) => {
      const extraMembers = state.teamMemberOverrides[t.id];
      const statusOverride = state.teamStatusOverrides[t.id];
      if (!extraMembers && !statusOverride) return t;
      return {
        ...t,
        studentIds: extraMembers ? [...t.studentIds, ...extraMembers] : t.studentIds,
        status: statusOverride ?? t.status,
      };
    });
  }, [state.extraTeams, state.teamMemberOverrides, state.teamStatusOverrides]);

  const challenges = useMemo<Challenge[]>(
    () => [...baseChallenges, ...state.extraChallenges],
    [state.extraChallenges]
  );

  const submissions = useMemo<Submission[]>(
    () => [...baseSubmissions, ...state.extraSubmissions],
    [state.extraSubmissions]
  );

  const joinTeam = useCallback((teamId: string, studentId: string) => {
    setState((prev) => {
      const current = prev.teamMemberOverrides[teamId] ?? [];
      const base = [...baseTeams, ...prev.extraTeams].find((t) => t.id === teamId);
      if (current.includes(studentId) || base?.studentIds.includes(studentId)) return prev;
      return {
        ...prev,
        teamMemberOverrides: { ...prev.teamMemberOverrides, [teamId]: [...current, studentId] },
      };
    });
  }, []);

  const createTeam = useCallback((input: CreateTeamInput) => {
    const id = `team-${input.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now().toString(36)}`;
    const newTeam: Team = {
      id,
      challengeId: input.challengeId,
      name: input.name,
      description: input.description,
      studentIds: [input.creatorStudentId],
      status: "forming",
      maxSize: input.maxSize,
    };
    setState((prev) => ({ ...prev, extraTeams: [...prev.extraTeams, newTeam] }));
    return newTeam;
  }, []);

  const submitProject = useCallback((input: SubmitProjectInput) => {
    const id = `submission-${input.teamId}-${Date.now().toString(36)}`;
    const submission: Submission = { ...input, id, submittedAt: new Date().toISOString() };
    setState((prev) => ({
      ...prev,
      extraSubmissions: [...prev.extraSubmissions, submission],
      teamStatusOverrides: { ...prev.teamStatusOverrides, [input.teamId]: "submitted" },
    }));
    return submission;
  }, []);

  const createChallenge = useCallback((input: CreateChallengeInput) => {
    const id = `challenge-${input.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now().toString(36)}`;
    const challenge: Challenge = { ...input, id };
    setState((prev) => ({ ...prev, extraChallenges: [...prev.extraChallenges, challenge] }));
    return challenge;
  }, []);

  const resetDemo = useCallback(() => {
    setState(emptyState);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore.
    }
  }, []);

  const value = useMemo<DemoStateContextValue>(
    () => ({
      teams,
      challenges,
      submissions,
      joinTeam,
      createTeam,
      submitProject,
      createChallenge,
      resetDemo,
      getTeamsForChallenge: (challengeId) => selectors.getTeamsForChallenge(teams, challengeId),
      getTeamsForStudent: (studentId) => selectors.getTeamsForStudent(teams, studentId),
      getChallengeParticipantCount: (challengeId) =>
        selectors.getChallengeParticipantCount(teams, challengeId),
      getActiveChallengeForStudent: (studentId) =>
        selectors.getActiveChallengeForStudent(teams, challenges, studentId),
      getRecommendedChallenges: (studentId, limit) =>
        selectors.getRecommendedChallenges(teams, challenges, studentId, limit),
      getStudentPortfolio: (studentId) =>
        selectors.getStudentPortfolio(teams, challenges, submissions, studentId),
      getSchoolStats: (schoolId) => selectors.getSchoolStats(teams, challenges, submissions, schoolId),
      findChallengeById: (id) => selectors.findChallengeById(challenges, id),
      findTeamById: (id) => selectors.findTeamById(teams, id),
      findSubmissionByTeam: (teamId) => selectors.findSubmissionByTeam(submissions, teamId),
      getSubmissionsForChallenge: (challengeId) =>
        selectors.getSubmissionsForChallenge(submissions, challengeId),
      getChallengeTalent: (challengeId) =>
        selectors.getChallengeTalent(teams, submissions, challengeId),
      getSkillDistributionForChallenge: (challengeId) =>
        selectors.getSkillDistributionForChallenge(teams, challengeId),
      getChallengeJudgingStats: (challengeId) =>
        selectors.getChallengeJudgingStats(teams, submissions, challengeId),
    }),
    [teams, challenges, submissions, joinTeam, createTeam, submitProject, createChallenge, resetDemo]
  );

  return <DemoStateContext.Provider value={value}>{children}</DemoStateContext.Provider>;
}

export function useDemoState() {
  const ctx = useContext(DemoStateContext);
  if (!ctx) throw new Error("useDemoState must be used within a DemoStateProvider");
  return ctx;
}
