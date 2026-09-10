import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SkillTagChip } from "./SkillTagChip";
import { getIcon } from "./icon-map";
import type { Challenge } from "@/lib/mock-data";
import { challengeStatusLabel, challengeStatusBadgeClass } from "@/lib/status";
import { formatDeadline } from "@/lib/utils";
import { Users, Building2 } from "lucide-react";

export function ChallengeCard({
  challenge,
  participantCount,
}: {
  challenge: Challenge;
  participantCount: number;
}) {
  const Icon = getIcon(challenge.coverIcon);

  return (
    <Card className="group/challenge-card overflow-hidden pt-0 transition-shadow hover:shadow-md">
      <Link href={`/student/challenges/${challenge.id}`} className="block">
        <div
          className="relative flex h-28 items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${challenge.colorFrom}, ${challenge.colorTo})`,
          }}
        >
          <Icon className="size-10 text-white/90" strokeWidth={1.5} />
          <Badge className={`absolute top-2.5 right-2.5 ${challengeStatusBadgeClass[challenge.status]}`}>
            {challengeStatusLabel[challenge.status]}
          </Badge>
        </div>
      </Link>
      <CardContent className="flex flex-1 flex-col gap-2.5">
        <div>
          <p className="text-xs font-medium text-muted-foreground">
            {challenge.theme}
            {challenge.sponsor ? ` · Sponsored by ${challenge.sponsor}` : ""}
          </p>
          <Link href={`/student/challenges/${challenge.id}`}>
            <h3 className="mt-0.5 font-heading text-base leading-snug font-medium group-hover/challenge-card:text-primary">
              {challenge.title}
            </h3>
          </Link>
          {challenge.sponsor ? (
            <Link
              href={`/sponsor/${challenge.id}`}
              className="mt-0.5 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
            >
              <Building2 className="size-3" /> Industry Dashboard
            </Link>
          ) : null}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{challenge.shortDescription}</p>
        <div className="flex flex-wrap gap-1.5">
          {challenge.skillTags.slice(0, 3).map((tag) => (
            <SkillTagChip key={tag}>{tag}</SkillTagChip>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Users className="size-3.5" /> {participantCount} joined
        </span>
        <span
          className={
            challenge.status === "open" || challenge.status === "in_progress"
              ? "font-medium text-foreground"
              : ""
          }
        >
          {challenge.status === "upcoming"
            ? `Opens ${formatDeadlineLabel(challenge.registrationOpens)}`
            : formatDeadline(challenge.submissionDeadline)}
        </span>
      </CardFooter>
    </Card>
  );
}

function formatDeadlineLabel(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
