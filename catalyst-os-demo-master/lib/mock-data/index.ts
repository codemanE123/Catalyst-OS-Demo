import { schools, defaultSchool } from "./schools";
import { students, currentStudentId, getStudentById } from "./students";
import { challenges, getChallengeById, STANDARD_RUBRIC } from "./challenges";
import { teams, getTeamsForChallenge, getTeamById, getTeamsForStudent } from "./teams";
import { submissions, getSubmissionByTeam, getSubmissionsForChallenge } from "./submissions";
import { judgeResults, getJudgeResultBySubmission } from "./judgeResults";
import { badges, getBadgeById } from "./badges";

export * from "./types";
export {
  schools,
  defaultSchool,
  students,
  currentStudentId,
  getStudentById,
  challenges,
  getChallengeById,
  STANDARD_RUBRIC,
  teams,
  getTeamsForChallenge,
  getTeamById,
  getTeamsForStudent,
  submissions,
  getSubmissionByTeam,
  getSubmissionsForChallenge,
  judgeResults,
  getJudgeResultBySubmission,
  badges,
  getBadgeById,
};

/**
 * Entity-dependent derived views (portfolio, dashboard stats, recommendations,
 * participant counts...) live in `lib/selectors.ts`, parameterized over
 * teams/challenges/submissions so they stay correct whether they're reading
 * the static seed or the live, session-updated arrays from `useDemoState()`.
 */

/** XP required per level — simple, deterministic, presentable in the UI. */
const XP_PER_LEVEL = 500;

export function getLevelInfo(xp: number) {
  const level = Math.floor(xp / XP_PER_LEVEL) + 1;
  const xpIntoLevel = xp % XP_PER_LEVEL;
  const xpForNextLevel = XP_PER_LEVEL;
  const progressPct = Math.round((xpIntoLevel / xpForNextLevel) * 100);
  return { level, xpIntoLevel, xpForNextLevel, progressPct };
}

export function getLeaderboard(schoolId: string, limit = 10) {
  return students
    .filter((s) => s.schoolId === schoolId)
    .slice()
    .sort((a, b) => b.xp - a.xp)
    .slice(0, limit);
}

export interface SkillDistributionEntry {
  skill: string;
  studentCount: number;
}

export function getSkillDistribution(schoolId: string): SkillDistributionEntry[] {
  const counts = new Map<string, number>();
  for (const student of students.filter((s) => s.schoolId === schoolId)) {
    for (const tag of student.skillTags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([skill, studentCount]) => ({ skill, studentCount }))
    .sort((a, b) => b.studentCount - a.studentCount);
}

/**
 * Illustrative monthly participation trend for the dashboard chart.
 * The seed data only models a handful of recent challenges in detail, so this
 * multi-month view is authored separately as scene-setting context — it does
 * not duplicate or risk drifting from any other on-screen count.
 */
export const participationTrend = [
  { month: "Apr", participants: 22 },
  { month: "May", participants: 28 },
  { month: "Jun", participants: 19 },
  { month: "Jul", participants: 31 },
  { month: "Aug", participants: 47 },
  { month: "Sep", participants: 58 },
];
