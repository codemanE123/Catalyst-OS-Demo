"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatTile } from "@/components/shared/StatTile";
import { StudentAvatar } from "@/components/shared/StudentAvatar";
import { SkillTagChip } from "@/components/shared/SkillTagChip";
import { SkillDistributionChart } from "@/components/charts/SkillDistributionChart";
import { getIcon } from "@/components/shared/icon-map";
import { Logo } from "@/components/shared/Logo";
import { useDemoState } from "@/lib/demo-state";
import { getJudgeResultBySubmission } from "@/lib/mock-data";
import { challengeStatusLabel, challengeStatusBadgeClass } from "@/lib/status";
import { Building2, Users, FolderCheck, Gauge, Trophy } from "lucide-react";

export default function SponsorDashboardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const demo = useDemoState();
  const challenge = demo.findChallengeById(id);

  if (!challenge) notFound();

  if (!challenge.sponsor) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-3 px-6 py-24 text-center">
        <Building2 className="size-8 text-muted-foreground" />
        <h1 className="font-heading text-xl font-semibold">No industry sponsor</h1>
        <p className="text-sm text-muted-foreground">
          {challenge.title} isn&apos;t a corporate-sponsored challenge, so there&apos;s no industry
          dashboard for it.
        </p>
        <Link
          href={`/student/challenges/${challenge.id}`}
          className="text-sm font-medium text-primary hover:underline"
        >
          Back to challenge
        </Link>
      </div>
    );
  }

  const Icon = getIcon(challenge.coverIcon);
  const stats = demo.getChallengeJudgingStats(challenge.id);
  const skillDistribution = demo.getSkillDistributionForChallenge(challenge.id);
  const talent = demo.getChallengeTalent(challenge.id);
  const submissions = demo.getSubmissionsForChallenge(challenge.id);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 sm:px-6">
          <Logo href="/" />
          <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
            Industry Dashboard
          </span>
          <div className="ml-auto">
            <Link
              href={`/student/challenges/${challenge.id}`}
              className="text-xs font-medium text-muted-foreground hover:text-foreground"
            >
              Back to challenge
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        <div
          className="relative flex flex-col items-center gap-3 rounded-2xl px-6 py-14 text-center text-white"
          style={{ background: `linear-gradient(135deg, ${challenge.colorFrom}, ${challenge.colorTo})` }}
        >
          <Icon className="size-12 text-white/90" strokeWidth={1.5} />
          <Badge className={challengeStatusBadgeClass[challenge.status]}>
            {challengeStatusLabel[challenge.status]}
          </Badge>
          <p className="flex items-center gap-1.5 text-xs font-medium tracking-wide text-white/70 uppercase">
            <Building2 className="size-3.5" /> Sponsored by {challenge.sponsor}
          </p>
          <h1 className="font-heading max-w-xl text-3xl font-semibold">{challenge.title}</h1>
          <p className="max-w-lg text-sm text-white/80">{challenge.shortDescription}</p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatTile label="Participants" value={talent.length} icon={Users} />
          <StatTile label="Teams Formed" value={stats.teamsFormed} icon={Trophy} />
          <StatTile label="Submissions Received" value={stats.submissionsReceived} icon={FolderCheck} />
          <StatTile
            label="Avg. Rubric Score"
            value={stats.avgScorePct !== null ? `${stats.avgScorePct}%` : "Pending"}
            icon={Gauge}
            hint={stats.judgedCount > 0 ? `${stats.judgedCount} judged` : "Judging not started"}
          />
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Skills Demonstrated</CardTitle>
            </CardHeader>
            <CardContent>
              {skillDistribution.length === 0 ? (
                <p className="text-sm text-muted-foreground">No participants have joined yet.</p>
              ) : (
                <SkillDistributionChart data={skillDistribution} />
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="size-4 text-primary" /> Talent
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col divide-y divide-border">
              {talent.length === 0 ? (
                <p className="py-2 text-sm text-muted-foreground">No participants have joined yet.</p>
              ) : (
                talent.map(({ student, team, result }) => (
                  <div key={student.id} className="flex items-center gap-3 py-2.5">
                    <StudentAvatar name={student.name} seed={student.avatarSeed} size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{student.name}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {team.name} &middot; {student.grade}
                      </p>
                    </div>
                    {result ? (
                      <Badge variant="secondary" className="shrink-0">
                        {result.recognitionTitle ?? `${result.totalScore}/${result.maxTotalScore}`}
                      </Badge>
                    ) : (
                      <span className="shrink-0 text-xs text-muted-foreground">In progress</span>
                    )}
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Submissions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col divide-y divide-border">
            {submissions.length === 0 ? (
              <p className="py-2 text-sm text-muted-foreground">No submissions yet.</p>
            ) : (
              submissions.map((submission) => {
                const result = getJudgeResultBySubmission(submission.id);
                return (
                  <div key={submission.id} className="flex flex-col gap-2 py-3.5 first:pt-0 last:pb-0">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-medium">{submission.title}</p>
                      {result?.recognitionTitle ? (
                        <Badge variant="secondary">{result.recognitionTitle}</Badge>
                      ) : null}
                    </div>
                    <p className="text-sm text-muted-foreground">{submission.summary}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {submission.toolsUsed.map((tool) => (
                        <SkillTagChip key={tool}>{tool}</SkillTagChip>
                      ))}
                    </div>
                    {result ? (
                      <p className="text-xs text-muted-foreground italic">
                        &ldquo;{result.overallFeedback}&rdquo;
                      </p>
                    ) : null}
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
