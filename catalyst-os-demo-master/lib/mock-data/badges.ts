import { Badge } from "./types";

export const badges: Badge[] = [
  {
    id: "first-submission",
    name: "First Submission",
    description: "Submitted a project to a Catalyst OS challenge for the first time.",
    icon: "Rocket",
  },
  {
    id: "team-player",
    name: "Team Player",
    description: "Completed a challenge as part of a team.",
    icon: "Users",
  },
  {
    id: "ai-explorer",
    name: "AI Explorer",
    description: "Built a project using AI or automation tools.",
    icon: "Sparkles",
  },
  {
    id: "top-scorer",
    name: "Top Scorer",
    description: "Earned one of the highest rubric scores in a judged challenge.",
    icon: "Trophy",
  },
  {
    id: "security-sleuth",
    name: "Security Sleuth",
    description: "Demonstrated strong cybersecurity skills in a challenge.",
    icon: "Shield",
  },
  {
    id: "rising-star",
    name: "Rising Star",
    description: "Completed multiple challenges and leveled up along the way.",
    icon: "Star",
  },
];

export function getBadgeById(id: string): Badge | undefined {
  return badges.find((b) => b.id === id);
}
