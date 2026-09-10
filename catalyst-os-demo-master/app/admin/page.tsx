"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatTile } from "@/components/shared/StatTile";
import { StudentAvatar } from "@/components/shared/StudentAvatar";
import { ParticipationChart } from "@/components/charts/ParticipationChart";
import { SkillDistributionChart } from "@/components/charts/SkillDistributionChart";
import { useDemoState } from "@/lib/demo-state";
import { defaultSchool, getLeaderboard, getSkillDistribution, participationTrend } from "@/lib/mock-data";
import { challengeStatusLabel, challengeStatusBadgeClass } from "@/lib/status";
import { formatDeadline } from "@/lib/utils";
import { Users, Flame, CheckCircle2, Sparkles, Trophy } from "lucide-react";

export default function AdminDashboardPage() {
  const demo = useDemoState();
  const stats = demo.getSchoolStats(defaultSchool.id);
  const skillDistribution = getSkillDistribution(defaultSchool.id);
  const topStudents = getLeaderboard(defaultSchool.id, 5);
  const liveChallenges = demo.challenges.filter(
    (c) => c.status === "open" || c.status === "in_progress"
  );

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-heading text-2xl font-semibold">{defaultSchool.name}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {defaultSchool.city}, {defaultSchool.state} &middot; Program overview
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Active Students" value={stats.activeStudents} icon={Users} hint={`of ${stats.totalStudents} total`} />
        <StatTile label="Active Challenges" value={stats.activeChallenges} icon={Flame} />
        <StatTile label="Completion Rate" value={`${stats.completionRate}%`} icon={CheckCircle2} />
        <StatTile label="Avg. Student XP" value={stats.avgXp.toLocaleString()} icon={Sparkles} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Participation Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ParticipationChart data={participationTrend} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Skills Demonstrated</CardTitle>
          </CardHeader>
          <CardContent>
            <SkillDistributionChart data={skillDistribution} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="size-4 text-primary" /> Top Students
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col divide-y divide-border">
            {topStudents.map((student, i) => (
              <div key={student.id} className="flex items-center gap-3 py-2.5">
                <span className="w-4 text-sm font-medium text-muted-foreground">{i + 1}</span>
                <StudentAvatar name={student.name} seed={student.avatarSeed} size="sm" />
                <span className="flex-1 truncate text-sm font-medium">{student.name}</span>
                <span className="text-sm text-muted-foreground tabular-nums">
                  {student.xp.toLocaleString()} XP
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Active &amp; Open Challenges</CardTitle>
              <Link href="/admin/challenges" className="text-xs font-medium text-primary hover:underline">
                Manage all
              </Link>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col divide-y divide-border">
            {liveChallenges.length === 0 ? (
              <p className="py-2 text-sm text-muted-foreground">No active challenges right now.</p>
            ) : (
              liveChallenges.map((challenge) => (
                <div key={challenge.id} className="flex items-center justify-between gap-3 py-2.5">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{challenge.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {demo.getChallengeParticipantCount(challenge.id)} participants &middot;{" "}
                      {formatDeadline(challenge.submissionDeadline)}
                    </p>
                  </div>
                  <Badge className={challengeStatusBadgeClass[challenge.status]}>
                    {challengeStatusLabel[challenge.status]}
                  </Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
