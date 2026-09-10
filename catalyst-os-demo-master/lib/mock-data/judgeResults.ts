import { JudgeResult } from "./types";

const JUDGE_PANEL = "Ms. Alvarez (CS Faculty) & Mr. Whitman (ELS-Tec Group)";

export const judgeResults: JudgeResult[] = [
  {
    id: "result-neural-ninjas",
    submissionId: "submission-neural-ninjas",
    judgeName: JUDGE_PANEL,
    scores: [
      {
        criterion: "Technical Execution",
        score: 5,
        maxScore: 5,
        feedback: "The scheduling algorithm handled edge cases well, and the AI summarization was genuinely useful, not just a gimmick.",
      },
      {
        criterion: "Creativity & Innovation",
        score: 5,
        maxScore: 5,
        feedback: "Turning vague 'study for the test' advice into a concrete day-by-day plan is a real insight, not just a feature list.",
      },
      {
        criterion: "Presentation & Communication",
        score: 4,
        maxScore: 5,
        feedback: "Clear demo and strong problem framing. The pitch could have spent more time on why students would actually stick with it.",
      },
      {
        criterion: "Collaboration & Process",
        score: 5,
        maxScore: 5,
        feedback: "Contribution notes show real division of labor, and user testing with classmates was a nice touch.",
      },
    ],
    overallFeedback:
      "One of the strongest submissions this round — the team identified a real pain point, built something that works, and could clearly explain both. Keep pushing on retention: would students actually open this every day?",
    totalScore: 19,
    maxTotalScore: 20,
    xpAwarded: 480,
    badgeIdsAwarded: ["first-submission", "team-player", "ai-explorer", "top-scorer"],
    recognitionTitle: "Challenge Winner",
    publishedAt: "2026-08-28T15:00:00Z",
  },
  {
    id: "result-automation-avengers",
    submissionId: "submission-automation-avengers",
    judgeName: JUDGE_PANEL,
    scores: [
      {
        criterion: "Technical Execution",
        score: 4,
        maxScore: 5,
        feedback: "The scoring script worked reliably in testing across three clubs — solid engineering for the timeframe.",
      },
      {
        criterion: "Creativity & Innovation",
        score: 4,
        maxScore: 5,
        feedback: "Practical, well-scoped idea. Not flashy, but it solves a problem every club officer actually has.",
      },
      {
        criterion: "Presentation & Communication",
        score: 4,
        maxScore: 5,
        feedback: "The demo video walked through the workflow clearly and showed real usage, which strengthened the pitch.",
      },
      {
        criterion: "Collaboration & Process",
        score: 4,
        maxScore: 5,
        feedback: "Good two-person split between automation and data pipeline work.",
      },
    ],
    overallFeedback:
      "A genuinely useful tool built at the right scope for the timeframe. Next round, consider testing with a club that has messier availability data to stress-test the scoring logic.",
    totalScore: 16,
    maxTotalScore: 20,
    xpAwarded: 380,
    badgeIdsAwarded: ["first-submission", "team-player"],
    recognitionTitle: "Finalist",
    publishedAt: "2026-08-28T15:00:00Z",
  },
  {
    id: "result-circuit-breakers",
    submissionId: "submission-circuit-breakers",
    judgeName: JUDGE_PANEL,
    scores: [
      {
        criterion: "Technical Execution",
        score: 3,
        maxScore: 5,
        feedback: "The core form and logging worked, though the search/filter functionality mentioned in the brief wasn't fully implemented.",
      },
      {
        criterion: "Creativity & Innovation",
        score: 3,
        maxScore: 5,
        feedback: "A straightforward, practical fix for a real annoyance — not groundbreaking, but genuinely usable.",
      },
      {
        criterion: "Presentation & Communication",
        score: 3,
        maxScore: 5,
        feedback: "The writeup explained the problem well; the live demo was a little rushed.",
      },
      {
        criterion: "Collaboration & Process",
        score: 4,
        maxScore: 5,
        feedback: "Clear that both teammates contributed meaningfully despite this being their first challenge.",
      },
    ],
    overallFeedback:
      "Strong first challenge. The core idea is solid — for next time, scope the feature list a little tighter so everything you promise in the brief makes it into the demo.",
    totalScore: 13,
    maxTotalScore: 20,
    xpAwarded: 300,
    badgeIdsAwarded: ["first-submission"],
    recognitionTitle: "Challenge Completed",
    publishedAt: "2026-08-28T15:00:00Z",
  },
  {
    id: "result-gear-heads",
    submissionId: "submission-gear-heads",
    judgeName: "Mr. Whitman (ELS-Tec Group) & Ms. Alvarez (CS Faculty)",
    scores: [
      {
        criterion: "Technical Execution",
        score: 4,
        maxScore: 5,
        feedback: "The arm reliably sorted on every pass we watched at the expo — solid mechanical and code work for a two-person team.",
      },
      {
        criterion: "Creativity & Innovation",
        score: 4,
        maxScore: 5,
        feedback: "A well-chosen, real problem for the space, with a sensible sensor-based approach rather than an overbuilt solution.",
      },
      {
        criterion: "Presentation & Communication",
        score: 4,
        maxScore: 5,
        feedback: "The demo video was polished and easy to follow — a strong showcase piece for the expo floor.",
      },
      {
        criterion: "Collaboration & Process",
        score: 5,
        maxScore: 5,
        feedback: "A clean split between the build and the storytelling, and Amara's first challenge didn't show — great onboarding by this team.",
      },
    ],
    overallFeedback:
      "One of the stronger expo builds — it actually works reliably, not just for the demo. ELS-Tec would like to see this team back for a future challenge.",
    totalScore: 17,
    maxTotalScore: 20,
    xpAwarded: 400,
    badgeIdsAwarded: ["first-submission", "team-player"],
    recognitionTitle: "Finalist",
    publishedAt: "2026-09-05T15:00:00Z",
  },
];

export function getJudgeResultBySubmission(submissionId: string): JudgeResult | undefined {
  return judgeResults.find((r) => r.submissionId === submissionId);
}
