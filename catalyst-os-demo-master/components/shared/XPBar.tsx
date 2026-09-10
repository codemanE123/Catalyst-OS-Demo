"use client";

import { getLevelInfo } from "@/lib/mock-data";
import { useCountUp } from "@/lib/useCountUp";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export function XPBar({
  xp,
  animated = false,
  className,
}: {
  xp: number;
  animated?: boolean;
  className?: string;
}) {
  const { level, xpIntoLevel, xpForNextLevel, progressPct } = getLevelInfo(xp);
  const displayedXp = useCountUp(animated ? xp : 0, 1.4);
  const shownXp = animated ? displayedXp : xp;

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-sm font-medium">Level {level}</span>
        <span className="text-xs text-muted-foreground tabular-nums">
          {shownXp.toLocaleString()} XP total &middot; {xpIntoLevel}/{xpForNextLevel} to next level
        </span>
      </div>
      <Progress value={progressPct} />
    </div>
  );
}
