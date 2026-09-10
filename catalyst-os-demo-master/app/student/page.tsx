"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatTile } from "@/components/shared/StatTile";
import { XPBar } from "@/components/shared/XPBar";
import { ChallengeCard } from "@/components/shared/ChallengeCard";
import { BadgeIcon } from "@/components/shared/BadgeIcon";
import { useDemoState } from "@/lib/demo-state";
import { getStudentById, currentStudentId, getBadgeById } from "@/lib/mock-data";
import { challengeStatusLabel, teamStatusLabel } from "@/lib/status";
import { formatDeadline } from "@/lib/utils";
import { Trophy, FolderKanban, Sparkles, ArrowRight, Compass } from "lucide-react";

export default function StudentDashboardPage() {
  const student = getStudentById(currentStudentId)!;
  const demo = useDemoState();

  const active = demo.getActiveChallengeForStudent(student.id);
  const portfolio = demo.getStudentPortfolio(student.id);
  const recommended = demo.getRecommendedChallenges(student.id, 3);

  const uniqueSkills = new Set(portfolio.flatMap((entry) => entry.challenge.skillTags));

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-sm text-muted-foreground">Welcome back,</p>
        <h1 className="font-heading text-2xl font-semibold">{student.name.split(" ")[0]} 👋</h1>
        <XPBar xp={student.xp} className="mt-4 max-w-sm" />
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        <StatTile label="Total XP" value={student.xp.toLocaleString()} icon={Sparkles} />
        <StatTile label="Challenges Completed" value={portfolio.length} icon={Trophy} />
        <StatTile label="Skills Demonstrated" value={uniqueSkills.size} icon={Compass} />
        <StatTile label="Badges Earned" value={student.badgeIds.length} icon={FolderKanban} />
      </div>

      <section>
        <h2 className="mb-3 font-heading text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Active Challenge
        </h2>
        {active ? (
          <Card>
            <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <Badge variant="secondary" className="mb-2">
                  {challengeStatusLabel[active.challenge.status]}
                </Badge>
                <h3 className="font-heading text-lg font-medium">{active.challenge.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Team: {active.team.name} &middot; {teamStatusLabel[active.team.status]} &middot;{" "}
                  {formatDeadline(active.challenge.submissionDeadline)}
                </p>
              </div>
              <Button
                nativeButton={false}
                render={
                  <Link
                    href={
                      active.team.status === "submitted"
                        ? `/student/challenges/${active.challenge.id}`
                        : `/student/challenges/${active.challenge.id}/submit`
                    }
                  />
                }
              >
                {active.team.status === "submitted" ? "View Submission" : "Continue Building"}
                <ArrowRight />
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center gap-3 py-6 text-center">
              <p className="text-sm text-muted-foreground">
                You&apos;re not in an active challenge right now.
              </p>
              <Button nativeButton={false} render={<Link href="/student/challenges" />}>
                Browse Challenges <ArrowRight />
              </Button>
            </CardContent>
          </Card>
        )}
      </section>

      {student.badgeIds.length > 0 && (
        <section>
          <h2 className="mb-3 font-heading text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Your Badges
          </h2>
          <div className="flex flex-wrap gap-4">
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
        </section>
      )}

      {recommended.length > 0 && (
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-heading text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Recommended For You
            </h2>
            <Link href="/student/challenges" className="text-xs font-medium text-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {recommended.map((challenge) => (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
                participantCount={demo.getChallengeParticipantCount(challenge.id)}
              />
            ))}
          </div>
        </section>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="size-4 text-primary" /> Your Portfolio
          </CardTitle>
        </CardHeader>
        <CardContent>
          {portfolio.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Complete your first judged challenge and it will show up here automatically.
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {portfolio.slice(0, 2).map((entry) => (
                <Link
                  key={entry.submission.id}
                  href={`/student/challenges/${entry.challenge.id}/results`}
                  className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5 text-sm hover:bg-muted/50"
                >
                  <span className="font-medium">{entry.submission.title}</span>
                  <span className="text-xs text-muted-foreground">{entry.result.recognitionTitle}</span>
                </Link>
              ))}
              <Link
                href="/student/portfolio"
                className="mt-1 text-xs font-medium text-primary hover:underline"
              >
                View full portfolio →
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
