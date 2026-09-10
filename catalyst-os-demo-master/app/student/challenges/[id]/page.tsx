"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SkillTagChip } from "@/components/shared/SkillTagChip";
import { StudentAvatar } from "@/components/shared/StudentAvatar";
import { getIcon } from "@/components/shared/icon-map";
import { useDemoState } from "@/lib/demo-state";
import { getStudentById, currentStudentId } from "@/lib/mock-data";
import { challengeStatusLabel, challengeStatusBadgeClass, teamStatusLabel } from "@/lib/status";
import { formatDateLong, formatDeadline } from "@/lib/utils";
import { Users, Calendar, Gift, Wrench, ArrowRight, Building2 } from "lucide-react";

export default function ChallengeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const student = getStudentById(currentStudentId)!;
  const demo = useDemoState();
  const challenge = demo.findChallengeById(id);

  if (!challenge) notFound();

  const teams = demo.getTeamsForChallenge(challenge.id);
  const myTeam = teams.find((t) => t.studentIds.includes(student.id));
  const Icon = getIcon(challenge.coverIcon);
  const participantCount = teams.reduce((sum, t) => sum + t.studentIds.length, 0);
  const canJoin = challenge.status === "open" || challenge.status === "in_progress";

  return (
    <div className="flex flex-col gap-6">
      <div
        className="relative flex flex-col items-center gap-3 rounded-2xl px-6 py-14 text-center text-white"
        style={{ background: `linear-gradient(135deg, ${challenge.colorFrom}, ${challenge.colorTo})` }}
      >
        <Icon className="size-12 text-white/90" strokeWidth={1.5} />
        <Badge className={challengeStatusBadgeClass[challenge.status]}>
          {challengeStatusLabel[challenge.status]}
        </Badge>
        <h1 className="font-heading max-w-xl text-3xl font-semibold">{challenge.title}</h1>
        <p className="text-sm text-white/80">
          {challenge.theme}
          {challenge.sponsor ? ` · Sponsored by ${challenge.sponsor}` : ""}
        </p>
        {challenge.sponsor ? (
          <Link
            href={`/sponsor/${challenge.id}`}
            className="flex items-center gap-1.5 text-xs font-medium text-white/70 underline-offset-4 hover:text-white hover:underline"
          >
            <Building2 className="size-3.5" /> View Industry Dashboard
          </Link>
        ) : null}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>The Brief</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <p className="text-sm text-muted-foreground">{challenge.brief}</p>
              <div className="flex flex-wrap gap-1.5">
                {challenge.skillTags.map((tag) => (
                  <SkillTagChip key={tag}>{tag}</SkillTagChip>
                ))}
              </div>
              <div>
                <p className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase">
                  <Wrench className="size-3.5" /> Suggested tools
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {challenge.toolTags.map((tool) => (
                    <SkillTagChip key={tool}>{tool}</SkillTagChip>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Judging Rubric</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col divide-y divide-border">
              {challenge.rubric.map((c) => (
                <div key={c.criterion} className="flex items-center justify-between py-2.5 text-sm">
                  <div>
                    <p className="font-medium">{c.criterion}</p>
                    <p className="text-xs text-muted-foreground">{c.description}</p>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">/{c.maxScore}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="size-4 text-primary" /> Teams
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {teams.length === 0 ? (
                <p className="text-sm text-muted-foreground">No teams have formed yet — be the first.</p>
              ) : (
                teams.map((team) => (
                  <div
                    key={team.id}
                    className="flex flex-col gap-2 rounded-lg border border-border p-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="text-sm font-medium">
                        {team.name}{" "}
                        <span className="font-normal text-muted-foreground">
                          &middot; {teamStatusLabel[team.status]}
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground">{team.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {team.studentIds.map((sid) => {
                          const s = getStudentById(sid);
                          if (!s) return null;
                          return (
                            <StudentAvatar
                              key={sid}
                              name={s.name}
                              seed={s.avatarSeed}
                              size="sm"
                              className="ring-2 ring-background"
                            />
                          );
                        })}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {team.studentIds.length}/{team.maxSize}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card>
            <CardContent className="flex flex-col gap-3 text-sm">
              <InfoRow icon={Calendar} label="Submission deadline">
                {formatDateLong(challenge.submissionDeadline)}
              </InfoRow>
              <InfoRow icon={Users} label="Team size">
                {challenge.minTeamSize}–{challenge.maxTeamSize} students
              </InfoRow>
              <InfoRow icon={Gift} label="Reward">
                {challenge.reward}
              </InfoRow>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Participants</span>
                <span className="font-medium">{participantCount} joined</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Time remaining</span>
                <span className="font-medium">{formatDeadline(challenge.submissionDeadline)}</span>
              </div>
            </CardContent>
          </Card>

          {myTeam ? (
            <Button
              size="lg"
              className="w-full"
              nativeButton={false}
              render={
                <Link
                  href={
                    myTeam.status === "submitted"
                      ? `/student/challenges/${challenge.id}/results`
                      : `/student/challenges/${challenge.id}/submit`
                  }
                />
              }
            >
              {myTeam.status === "submitted" ? "View Your Submission" : "Continue to Submission"}
              <ArrowRight />
            </Button>
          ) : canJoin ? (
            <Button
              size="lg"
              className="w-full"
              nativeButton={false}
              render={<Link href={`/student/challenges/${challenge.id}/join`} />}
            >
              Join Challenge <ArrowRight />
            </Button>
          ) : challenge.status === "upcoming" ? (
            <Button size="lg" className="w-full" disabled>
              Opens {formatDateLong(challenge.registrationOpens)}
            </Button>
          ) : (
            <Button size="lg" className="w-full" variant="outline" disabled>
              Results Published
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Calendar;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-medium">{children}</p>
      </div>
    </div>
  );
}
