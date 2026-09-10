import {
  students,
  getStudentById,
  getJudgeResultBySubmission,
  type Challenge,
  type Team,
  type Submission,
  type JudgeResult,
  type Student,
  type SkillDistributionEntry,
} from "@/lib/mock-data";

/**
 * All functions here take explicit teams/challenges/submissions arrays so they
 * produce correct results whether called with the static seed data or the
 * live, session-updated arrays from `useDemoState()` — one implementation,
 * no risk of the two drifting out of sync.
 */

export function findChallengeById(challenges: Challenge[], id: string): Challenge | undefined {
  return challenges.find((c) => c.id === id);
}

export function findTeamById(teams: Team[], id: string): Team | undefined {
  return teams.find((t) => t.id === id);
}

export function findSubmissionByTeam(submissions: Submission[], teamId: string): Submission | undefined {
  return submissions.find((s) => s.teamId === teamId);
}

export function getTeamsForChallenge(teams: Team[], challengeId: string): Team[] {
  return teams.filter((t) => t.challengeId === challengeId);
}

export function getTeamsForStudent(teams: Team[], studentId: string): Team[] {
  return teams.filter((t) => t.studentIds.includes(studentId));
}

export function getChallengeParticipantCount(teams: Team[], challengeId: string): number {
  return getTeamsForChallenge(teams, challengeId).reduce((sum, t) => sum + t.studentIds.length, 0);
}

export function getActiveChallengeForStudent(
  teams: Team[],
  challenges: Challenge[],
  studentId: string
): { team: Team; challenge: Challenge } | null {
  const studentTeams = getTeamsForStudent(teams, studentId).filter((t) => t.status !== "judged");
  for (const team of studentTeams) {
    const challenge = findChallengeById(challenges, team.challengeId);
    if (challenge && (challenge.status === "open" || challenge.status === "in_progress")) {
      return { team, challenge };
    }
  }
  return null;
}

export function getRecommendedChallenges(
  teams: Team[],
  challenges: Challenge[],
  studentId: string,
  limit = 3
): Challenge[] {
  const student = getStudentById(studentId);
  const joinedChallengeIds = new Set(getTeamsForStudent(teams, studentId).map((t) => t.challengeId));
  const openChallenges = challenges.filter(
    (c) => (c.status === "open" || c.status === "upcoming") && !joinedChallengeIds.has(c.id)
  );
  if (!student) return openChallenges.slice(0, limit);
  const scored = openChallenges
    .map((c) => ({
      challenge: c,
      score: c.skillTags.filter((tag) => student.skillTags.includes(tag)).length,
    }))
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.challenge);
}

export interface PortfolioEntry {
  challenge: Challenge;
  team: Team;
  submission: Submission;
  result: JudgeResult;
}

/** A student's completed, judged work — always derived from live entities, never hand-authored. */
export function getStudentPortfolio(
  teams: Team[],
  challenges: Challenge[],
  submissions: Submission[],
  studentId: string
): PortfolioEntry[] {
  const studentTeams = getTeamsForStudent(teams, studentId).filter((t) => t.status === "judged");
  const entries: PortfolioEntry[] = [];
  for (const team of studentTeams) {
    const submission = findSubmissionByTeam(submissions, team.id);
    if (!submission) continue;
    const result = getJudgeResultBySubmission(submission.id);
    if (!result) continue;
    const challenge = findChallengeById(challenges, team.challengeId);
    if (!challenge) continue;
    entries.push({ challenge, team, submission, result });
  }
  return entries.sort(
    (a, b) => new Date(b.result.publishedAt).getTime() - new Date(a.result.publishedAt).getTime()
  );
}

export interface SchoolStats {
  totalStudents: number;
  activeStudents: number;
  activeChallenges: number;
  totalChallenges: number;
  totalSubmissions: number;
  completionRate: number;
  avgXp: number;
  totalBadgesAwarded: number;
}

/** Every number here is computed from the same live arrays used everywhere else in the app. */
export function getSchoolStats(
  teams: Team[],
  challenges: Challenge[],
  submissions: Submission[],
  schoolId: string
): SchoolStats {
  const schoolStudents = students.filter((s) => s.schoolId === schoolId);
  const schoolChallenges = challenges.filter((c) => c.schoolId === schoolId);
  const activeChallenges = schoolChallenges.filter(
    (c) => c.status === "open" || c.status === "in_progress"
  );

  const activeStudentIds = new Set<string>();
  for (const challenge of activeChallenges) {
    for (const team of getTeamsForChallenge(teams, challenge.id)) {
      team.studentIds.forEach((id) => activeStudentIds.add(id));
    }
  }

  const closedChallenges = schoolChallenges.filter((c) => c.status === "closed");
  const closedTeams = closedChallenges.flatMap((c) => getTeamsForChallenge(teams, c.id));
  const judgedTeams = closedTeams.filter((t) => t.status === "judged");
  const completionRate =
    closedTeams.length === 0 ? 0 : Math.round((judgedTeams.length / closedTeams.length) * 100);

  const totalSubmissions = submissions.filter((s) =>
    schoolChallenges.some((c) => c.id === s.challengeId)
  ).length;

  const avgXp =
    schoolStudents.length === 0
      ? 0
      : Math.round(schoolStudents.reduce((sum, s) => sum + s.xp, 0) / schoolStudents.length);

  const totalBadgesAwarded = schoolStudents.reduce((sum, s) => sum + s.badgeIds.length, 0);

  return {
    totalStudents: schoolStudents.length,
    activeStudents: activeStudentIds.size,
    activeChallenges: activeChallenges.length,
    totalChallenges: schoolChallenges.length,
    totalSubmissions,
    completionRate,
    avgXp,
    totalBadgesAwarded,
  };
}

export function getSubmissionsForChallenge(submissions: Submission[], challengeId: string): Submission[] {
  return submissions.filter((s) => s.challengeId === challengeId);
}

export interface ChallengeTalentEntry {
  student: Student;
  team: Team;
  result: JudgeResult | undefined;
}

/** Every participant in a challenge, ranked by judged score (then XP) once results are in. */
export function getChallengeTalent(
  teams: Team[],
  submissions: Submission[],
  challengeId: string
): ChallengeTalentEntry[] {
  const entries: ChallengeTalentEntry[] = [];
  for (const team of getTeamsForChallenge(teams, challengeId)) {
    const submission = findSubmissionByTeam(submissions, team.id);
    const result = submission ? getJudgeResultBySubmission(submission.id) : undefined;
    for (const studentId of team.studentIds) {
      const student = getStudentById(studentId);
      if (student) entries.push({ student, team, result });
    }
  }
  return entries.sort(
    (a, b) => (b.result?.totalScore ?? -1) - (a.result?.totalScore ?? -1) || b.student.xp - a.student.xp
  );
}

export function getSkillDistributionForChallenge(
  teams: Team[],
  challengeId: string
): SkillDistributionEntry[] {
  const counts = new Map<string, number>();
  for (const team of getTeamsForChallenge(teams, challengeId)) {
    for (const studentId of team.studentIds) {
      const student = getStudentById(studentId);
      if (!student) continue;
      for (const tag of student.skillTags) {
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
      }
    }
  }
  return Array.from(counts.entries())
    .map(([skill, studentCount]) => ({ skill, studentCount }))
    .sort((a, b) => b.studentCount - a.studentCount);
}

export interface ChallengeJudgingStats {
  teamsFormed: number;
  submissionsReceived: number;
  judgedCount: number;
  avgScorePct: number | null;
}

export function getChallengeJudgingStats(
  teams: Team[],
  submissions: Submission[],
  challengeId: string
): ChallengeJudgingStats {
  const challengeSubmissions = getSubmissionsForChallenge(submissions, challengeId);
  const results = challengeSubmissions
    .map((s) => getJudgeResultBySubmission(s.id))
    .filter((r): r is JudgeResult => Boolean(r));
  const avgScorePct =
    results.length === 0
      ? null
      : Math.round(
          (results.reduce((sum, r) => sum + r.totalScore / r.maxTotalScore, 0) / results.length) * 100
        );
  return {
    teamsFormed: getTeamsForChallenge(teams, challengeId).length,
    submissionsReceived: challengeSubmissions.length,
    judgedCount: results.length,
    avgScorePct,
  };
}
