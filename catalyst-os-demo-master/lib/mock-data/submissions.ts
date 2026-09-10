import { Submission } from "./types";

export const submissions: Submission[] = [
  {
    id: "submission-neural-ninjas",
    teamId: "team-neural-ninjas",
    challengeId: "challenge-ai-sprint",
    title: "StudyBuddy: An AI Study Session Planner",
    summary:
      "A lightweight tool that turns a student's upcoming tests and assignments into a realistic, day-by-day study plan.",
    problem:
      "Students at Bridgeview said the hardest part of studying isn't the material — it's figuring out what to study and when, especially with multiple classes stacking deadlines in the same week.",
    solution:
      "StudyBuddy takes a list of upcoming tests and assignments, estimates study time per topic, and generates a day-by-day plan using a simple scheduling algorithm plus the OpenAI API to summarize dense material into review notes. Students can check off sessions as they complete them.",
    toolsUsed: ["Python", "OpenAI API", "Streamlit"],
    links: [
      { label: "GitHub Repository", url: "https://github.com/example/studybuddy" },
      { label: "Live Demo", url: "https://studybuddy-demo.example.com" },
    ],
    contributions: [
      { studentId: "student-zoe", contribution: "Built the scheduling algorithm and led the AI summarization integration." },
      { studentId: "student-owen", contribution: "Handled data structures for tracking assignments and study sessions." },
      { studentId: "student-sofia", contribution: "Designed the UI and ran user testing with five classmates." },
    ],
    submittedAt: "2026-08-20T22:14:00Z",
  },
  {
    id: "submission-automation-avengers",
    teamId: "team-automation-avengers",
    challengeId: "challenge-ai-sprint",
    title: "ClubSync: Auto-Scheduling for Club Meetings",
    summary:
      "An automation workflow that finds meeting times that work for every club member without ten back-and-forth texts.",
    problem:
      "Club officers spend hours every month coordinating meeting times across dozens of members' schedules.",
    solution:
      "ClubSync connects to a shared form where members submit their weekly availability, then uses a Zapier workflow plus a small scoring script to recommend the top three meeting slots automatically, posting the winner to the club's group chat.",
    toolsUsed: ["Zapier", "Google Sheets", "JavaScript"],
    links: [
      { label: "GitHub Repository", url: "https://github.com/example/clubsync" },
      { label: "Demo Video", url: "https://video.example.com/clubsync-demo" },
    ],
    contributions: [
      { studentId: "student-devon", contribution: "Built the availability-scoring script and tested it against three real clubs." },
      { studentId: "student-priya", contribution: "Set up the Zapier automation and the Sheets data pipeline." },
    ],
    submittedAt: "2026-08-21T18:40:00Z",
  },
  {
    id: "submission-circuit-breakers",
    teamId: "team-circuit-breakers",
    challengeId: "challenge-ai-sprint",
    title: "HallPass: A Simple Digital Hall Pass Log",
    summary:
      "A no-frills digital replacement for the paper hall pass sign-out sheet.",
    problem:
      "Our classroom's paper hall pass log was always missing, hard to read, and impossible to search when someone asked 'who was out and when.'",
    solution:
      "HallPass is a small web form that logs student name, time out, destination, and time back, storing everything in a simple spreadsheet-backed database the teacher can filter and search.",
    toolsUsed: ["Python", "Flask", "Google Sheets"],
    links: [{ label: "GitHub Repository", url: "https://github.com/example/hallpass" }],
    contributions: [
      { studentId: "student-jalen", contribution: "Built the Flask form and the logging logic." },
      { studentId: "student-marcus", contribution: "Set up the Sheets integration and wrote the project writeup." },
    ],
    submittedAt: "2026-08-21T20:05:00Z",
  },
  {
    id: "submission-data-storytellers",
    teamId: "team-data-storytellers",
    challengeId: "challenge-community-data",
    title: "What's Actually in the Cafeteria Trash",
    summary:
      "A short data story on cafeteria food waste, built from four weeks of logged bin data.",
    problem:
      "Nobody at school had ever actually measured how much food gets thrown away, or which items were wasted the most.",
    solution:
      "We logged and categorized cafeteria waste for four weeks, built a Tableau dashboard showing waste by food type and day of week, and drafted one concrete recommendation for the cafeteria menu.",
    toolsUsed: ["Tableau", "Google Sheets"],
    links: [
      { label: "Dashboard", url: "https://tableau.example.com/cafeteria-waste" },
      { label: "Write-up", url: "https://docs.example.com/cafeteria-waste-writeup" },
    ],
    contributions: [
      { studentId: "student-priya", contribution: "Built the Tableau dashboard and cleaned four weeks of logged data." },
      { studentId: "student-sofia", contribution: "Designed the presentation and wrote the final recommendation." },
    ],
    submittedAt: "2026-09-08T16:30:00Z",
  },
  {
    id: "submission-gear-heads",
    teamId: "team-gear-heads",
    challengeId: "challenge-robotics-expo",
    title: "SortBot: An Arduino Recycling Sorting Arm",
    summary:
      "A small robotic arm that sorts recyclables from trash on a moving belt, built for the fall expo showcase.",
    problem:
      "The recycling bin outside the cafeteria is contaminated with trash more often than not, because sorting by hand is slow and nobody wants to do it between classes.",
    solution:
      "SortBot uses an Arduino-driven arm with a simple color and weight sensor to detect recyclable containers on a small conveyor belt and divert them into a separate bin. The CAD-modeled arm was 3D printed in the school makerspace, and a short demo video walks through a full sorting cycle for the expo floor.",
    toolsUsed: ["Arduino", "Python", "CAD"],
    links: [
      { label: "GitHub Repository", url: "https://github.com/example/sortbot" },
      { label: "Demo Video", url: "https://video.example.com/sortbot-demo" },
    ],
    contributions: [
      { studentId: "student-jalen", contribution: "Designed and built the sorting arm, wrote the Arduino control code." },
      { studentId: "student-amara", contribution: "Shot and edited the expo demo video and wrote up the build documentation." },
    ],
    submittedAt: "2026-08-27T19:30:00Z",
  },
];

export function getSubmissionByTeam(teamId: string): Submission | undefined {
  return submissions.find((s) => s.teamId === teamId);
}

export function getSubmissionsForChallenge(challengeId: string): Submission[] {
  return submissions.filter((s) => s.challengeId === challengeId);
}
