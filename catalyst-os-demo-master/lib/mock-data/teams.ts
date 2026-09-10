import { Team } from "./types";

export const teams: Team[] = [
  // AI & Automation Sprint — closed, judged
  {
    id: "team-neural-ninjas",
    challengeId: "challenge-ai-sprint",
    name: "Neural Ninjas",
    description: "Building tools that quietly do the boring stuff for you.",
    studentIds: ["student-zoe", "student-owen", "student-sofia"],
    status: "judged",
    maxSize: 4,
  },
  {
    id: "team-automation-avengers",
    challengeId: "challenge-ai-sprint",
    name: "Automation Avengers",
    description: "Assemble! (mostly Zapier workflows, but still.)",
    studentIds: ["student-devon", "student-priya"],
    status: "judged",
    maxSize: 4,
  },
  {
    id: "team-circuit-breakers",
    challengeId: "challenge-ai-sprint",
    name: "Circuit Breakers",
    description: "First challenge, first team, first time staying up past midnight for code.",
    studentIds: ["student-jalen", "student-marcus"],
    status: "judged",
    maxSize: 4,
  },

  // Cybersecurity Capture-the-Flag — open, forming
  {
    id: "team-packet-sniffers",
    challengeId: "challenge-cyber-ctf",
    name: "Packet Sniffers",
    description: "Looking for one or two more teammates who aren't afraid of a terminal.",
    studentIds: ["student-devon"],
    status: "forming",
    maxSize: 3,
  },
  {
    id: "team-firewall-falcons",
    challengeId: "challenge-cyber-ctf",
    name: "Firewall Falcons",
    description: "Cybersecurity club regulars, room for one more flag-hunter.",
    studentIds: ["student-ines", "student-marcus"],
    status: "forming",
    maxSize: 3,
  },

  // Community Impact Data Challenge — in progress
  {
    id: "team-data-storytellers",
    challengeId: "challenge-community-data",
    name: "Data Storytellers",
    description: "Turning the cafeteria waste logs into a story someone will actually read.",
    studentIds: ["student-priya", "student-sofia"],
    status: "submitted",
    maxSize: 4,
  },
  {
    id: "team-impact-squad",
    challengeId: "challenge-community-data",
    name: "Impact Squad",
    description: "Amara's first Catalyst OS team, mapping park usage across town.",
    studentIds: ["student-owen", "student-amara"],
    status: "building",
    maxSize: 4,
  },

  // Robotics & Automation Expo — closed, judged
  {
    id: "team-gear-heads",
    challengeId: "challenge-robotics-expo",
    name: "Gear Heads",
    description: "One robotics kid, one storyteller, and a sorting arm that actually works.",
    studentIds: ["student-jalen", "student-amara"],
    status: "judged",
    maxSize: 4,
  },
];

export function getTeamsForChallenge(challengeId: string): Team[] {
  return teams.filter((t) => t.challengeId === challengeId);
}

export function getTeamById(id: string): Team | undefined {
  return teams.find((t) => t.id === id);
}

export function getTeamsForStudent(studentId: string): Team[] {
  return teams.filter((t) => t.studentIds.includes(studentId));
}
