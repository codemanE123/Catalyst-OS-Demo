import { Progress } from "@/components/ui/progress";
import type { CriterionScore } from "@/lib/mock-data";

export function RubricScoreCard({ score, index = 0 }: { score: CriterionScore; index?: number }) {
  const pct = Math.round((score.score / score.maxScore) * 100);
  return (
    <div className="rounded-lg border border-border p-4">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-sm font-medium">{score.criterion}</p>
        <p className="shrink-0 text-sm font-semibold tabular-nums">
          {score.score}
          <span className="text-muted-foreground">/{score.maxScore}</span>
        </p>
      </div>
      <Progress value={pct} className="mt-2" />
      <p className="mt-2.5 text-sm text-muted-foreground">{score.feedback}</p>
    </div>
  );
}
