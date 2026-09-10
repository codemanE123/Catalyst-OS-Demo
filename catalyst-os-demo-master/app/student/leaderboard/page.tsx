import { Card, CardContent } from "@/components/ui/card";
import { StudentAvatar } from "@/components/shared/StudentAvatar";
import { getLeaderboard, defaultSchool, currentStudentId } from "@/lib/mock-data";
import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

const MEDAL_COLORS = ["text-amber-500", "text-zinc-400", "text-amber-700"];

export default function LeaderboardPage() {
  const leaderboard = getLeaderboard(defaultSchool.id, 10);

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold">Leaderboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">{defaultSchool.name} &middot; all-time XP</p>
      </div>

      <Card>
        <CardContent className="flex flex-col divide-y divide-border">
          {leaderboard.map((student, i) => (
            <div
              key={student.id}
              className={cn(
                "flex items-center gap-3 py-3",
                student.id === currentStudentId && "-mx-4 rounded-lg bg-accent px-4"
              )}
            >
              <span className="flex w-6 shrink-0 items-center justify-center text-sm font-semibold text-muted-foreground">
                {i < 3 ? <Trophy className={cn("size-4", MEDAL_COLORS[i])} /> : i + 1}
              </span>
              <StudentAvatar name={student.name} seed={student.avatarSeed} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{student.name}</p>
                <p className="text-xs text-muted-foreground">{student.grade}</p>
              </div>
              <span className="shrink-0 text-sm font-semibold tabular-nums">
                {student.xp.toLocaleString()} XP
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
