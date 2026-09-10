"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SkillTagChip } from "@/components/shared/SkillTagChip";
import { StudentAvatar } from "@/components/shared/StudentAvatar";
import { BadgeIcon } from "@/components/shared/BadgeIcon";
import { useDemoState } from "@/lib/demo-state";
import { getStudentById, currentStudentId, getBadgeById } from "@/lib/mock-data";
import { formatDateLong } from "@/lib/utils";
import { ExternalLink, Trophy } from "lucide-react";

export default function PortfolioPage() {
  const student = getStudentById(currentStudentId)!;
  const demo = useDemoState();
  const portfolio = demo.getStudentPortfolio(student.id);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <Card>
        <CardContent className="flex flex-col items-center gap-3 py-8 text-center">
          <StudentAvatar name={student.name} seed={student.avatarSeed} size="lg" />
          <div>
            <h1 className="font-heading text-xl font-semibold">{student.name}</h1>
            <p className="text-sm text-muted-foreground">
              {student.grade} &middot; Bridgeview Innovation Academy
            </p>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">{student.bio}</p>
          <div className="flex flex-wrap justify-center gap-1.5">
            {student.skillTags.map((tag) => (
              <SkillTagChip key={tag}>{tag}</SkillTagChip>
            ))}
          </div>
        </CardContent>
      </Card>

      {student.badgeIds.length > 0 && (
        <div>
          <h2 className="mb-3 font-heading text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Badges
          </h2>
          <div className="flex flex-wrap gap-5">
            {student.badgeIds.map((id) => {
              const badge = getBadgeById(id);
              if (!badge) return null;
              return (
                <div key={id} className="flex flex-col items-center gap-1.5 text-center">
                  <BadgeIcon icon={badge.icon} />
                  <span className="max-w-16 text-xs text-muted-foreground">{badge.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div>
        <h2 className="mb-3 font-heading text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Project History
        </h2>
        {portfolio.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No completed challenges yet — finished projects will show up here automatically.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {portfolio.map((entry) => (
              <Card key={entry.submission.id}>
                <CardHeader>
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <CardTitle>{entry.submission.title}</CardTitle>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {entry.challenge.title} &middot; {entry.team.name} &middot;{" "}
                        {formatDateLong(entry.result.publishedAt)}
                      </p>
                    </div>
                    {entry.result.recognitionTitle && (
                      <Badge className="bg-lime text-lime-foreground shrink-0">
                        <Trophy className="size-3" /> {entry.result.recognitionTitle}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <p className="text-sm text-muted-foreground">{entry.submission.summary}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {entry.submission.toolsUsed.map((tool) => (
                      <SkillTagChip key={tool}>{tool}</SkillTagChip>
                    ))}
                  </div>
                  <div className="flex items-center justify-between border-t border-border pt-3 text-sm">
                    <span className="text-muted-foreground">
                      Score: <span className="font-medium text-foreground">{entry.result.totalScore}/{entry.result.maxTotalScore}</span>
                      {" "}&middot; +{entry.result.xpAwarded} XP
                    </span>
                    {entry.submission.links[0] && (
                      <Link
                        href={entry.submission.links[0].url}
                        target="_blank"
                        className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                      >
                        {entry.submission.links[0].label} <ExternalLink className="size-3" />
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
