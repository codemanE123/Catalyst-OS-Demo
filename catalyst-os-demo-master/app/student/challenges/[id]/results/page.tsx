"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RubricScoreCard } from "@/components/shared/RubricScoreCard";
import { BadgeReveal } from "@/components/shared/BadgeReveal";
import { useDemoState } from "@/lib/demo-state";
import { getStudentById, currentStudentId, getBadgeById } from "@/lib/mock-data";
import { useCountUp } from "@/lib/useCountUp";
import { Sparkles, FolderKanban, ArrowRight, Clock3 } from "lucide-react";

export default function ResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const student = getStudentById(currentStudentId)!;
  const demo = useDemoState();
  const challenge = demo.findChallengeById(id);

  if (!challenge) notFound();

  const myTeam = demo.getTeamsForChallenge(challenge.id).find((t) => t.studentIds.includes(student.id));
  const submission = myTeam ? demo.findSubmissionByTeam(myTeam.id) : undefined;
  const result = submission
    ? demo.getStudentPortfolio(student.id).find((e) => e.submission.id === submission.id)?.result
    : undefined;

  const xp = useCountUp(result?.xpAwarded ?? 0, 1.6);

  if (!myTeam || !submission) {
    return (
      <div className="mx-auto max-w-lg py-16 text-center">
        <p className="text-sm text-muted-foreground">
          You haven&apos;t submitted a project for this challenge yet.
        </p>
        <Button
          className="mt-4"
          nativeButton={false}
          render={<Link href={`/student/challenges/${challenge.id}`} />}
        >
          Back to Challenge
        </Button>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-3 py-20 text-center">
        <Clock3 className="size-12 text-muted-foreground" strokeWidth={1.5} />
        <h1 className="font-heading text-xl font-semibold">Judging in progress</h1>
        <p className="text-sm text-muted-foreground">
          {myTeam.name} has a submission in for {challenge.title}. Check back after{" "}
          {new Date(challenge.resultsDate).toLocaleDateString("en-US", { month: "long", day: "numeric" })}{" "}
          to see scores, feedback, and any XP or badges earned.
        </p>
        <Button variant="outline" nativeButton={false} render={<Link href="/student" />}>
          Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        {result.recognitionTitle && (
          <Badge className="bg-lime text-lime-foreground">{result.recognitionTitle}</Badge>
        )}
        <h1 className="font-heading text-2xl font-semibold">{submission.title}</h1>
        <p className="text-sm text-muted-foreground">
          {myTeam.name} &middot; {challenge.title}
        </p>
      </div>

      <Card className="items-center bg-gradient-to-br from-primary to-[#a855f7] py-8 text-center text-white">
        <CardContent className="flex flex-col items-center gap-1">
          <Sparkles className="size-6" />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-heading text-4xl font-bold tabular-nums"
          >
            +{xp}
          </motion.p>
          <p className="text-sm text-white/85">XP earned</p>
        </CardContent>
      </Card>

      {result.badgeIdsAwarded.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Badges Unlocked</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap justify-center gap-6 py-2">
            {result.badgeIdsAwarded.map((badgeId, i) => {
              const badge = getBadgeById(badgeId);
              if (!badge) return null;
              return <BadgeReveal key={badgeId} badge={badge} index={i} />;
            })}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>
            Rubric Score &middot; {result.totalScore}/{result.maxTotalScore}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {result.scores.map((score, i) => (
            <RubricScoreCard key={score.criterion} score={score} index={i} />
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Judge Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{result.overallFeedback}</p>
          <p className="mt-2 text-xs text-muted-foreground">&mdash; {result.judgeName}</p>
        </CardContent>
      </Card>

      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center gap-3 py-6 text-center">
          <FolderKanban className="size-6 text-primary" />
          <p className="text-sm font-medium">Added to your portfolio</p>
          <Button variant="outline" nativeButton={false} render={<Link href="/student/portfolio" />}>
            View Portfolio <ArrowRight />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
