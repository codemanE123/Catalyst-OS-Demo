import {
  Rocket,
  Users,
  Sparkles,
  Trophy,
  Shield,
  Star,
  BarChart3,
  PiggyBank,
  Cog,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  Rocket,
  Users,
  Sparkles,
  Trophy,
  Shield,
  Star,
  BarChart3,
  PiggyBank,
  Cog,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Sparkles;
}
