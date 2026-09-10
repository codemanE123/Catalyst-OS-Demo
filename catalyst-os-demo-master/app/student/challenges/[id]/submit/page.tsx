"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StudentAvatar } from "@/components/shared/StudentAvatar";
import { useDemoState } from "@/lib/demo-state";
import { getStudentById, currentStudentId } from "@/lib/mock-data";
import { CheckCircle2, ArrowRight, UploadCloud } from "lucide-react";

export default function SubmitProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const student = getStudentById(currentStudentId)!;
  const demo = useDemoState();
  const challenge = demo.findChallengeById(id);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [problem, setProblem] = useState("");
  const [solution, setSolution] = useState("");
  const [tools, setTools] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [myContribution, setMyContribution] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!challenge) notFound();

  const myTeam = demo.getTeamsForChallenge(challenge.id).find((t) => t.studentIds.includes(student.id));

  if (!myTeam) {
    return (
      <div className="mx-auto max-w-lg py-16 text-center">
        <p className="text-sm text-muted-foreground">
          You need to join a team before you can submit to this challenge.
        </p>
        <Button
          className="mt-4"
          nativeButton={false}
          render={<Link href={`/student/challenges/${challenge.id}/join`} />}
        >
          Join Challenge
        </Button>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-4 py-20 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
        >
          <CheckCircle2 className="size-16 text-primary" strokeWidth={1.5} />
        </motion.div>
        <h1 className="font-heading text-xl font-semibold">Submission received!</h1>
        <p className="text-sm text-muted-foreground">
          {myTeam.name} is officially in the running for {challenge.title}. Judging opens once the
          deadline passes — you&apos;ll see your results and any XP or badges earned right here.
        </p>
        <div className="flex gap-2 pt-2">
          <Button variant="outline" nativeButton={false} render={<Link href="/student" />}>
            Back to Dashboard
          </Button>
          <Button nativeButton={false} render={<Link href={`/student/challenges/${challenge.id}`} />}>
            View Challenge <ArrowRight />
          </Button>
        </div>
      </div>
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!challenge || !myTeam) return;
    demo.submitProject({
      teamId: myTeam.id,
      challengeId: challenge.id,
      title: title.trim() || `${myTeam.name}'s Project`,
      summary: summary.trim(),
      problem: problem.trim(),
      solution: solution.trim(),
      toolsUsed: tools
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      links: [
        ...(repoUrl ? [{ label: "Repository", url: repoUrl }] : []),
        ...(demoUrl ? [{ label: "Demo", url: demoUrl }] : []),
      ],
      contributions: [
        { studentId: student.id, contribution: myContribution.trim() || "Contributed to the build." },
      ],
    });
    setSubmitted(true);
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <div>
        <p className="text-sm text-muted-foreground">Submitting for</p>
        <h1 className="font-heading text-2xl font-semibold">{challenge.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">Team: {myTeam.name}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          {myTeam.studentIds.map((sid) => {
            const s = getStudentById(sid);
            if (!s) return null;
            return (
              <div key={sid} className="flex items-center gap-2 rounded-full bg-muted py-1 pr-3 pl-1">
                <StudentAvatar name={s.name} seed={s.avatarSeed} size="sm" />
                <span className="text-xs font-medium">{s.name}</span>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UploadCloud className="size-4 text-primary" /> Project Details
            </CardTitle>
            <CardDescription>No file upload needed — links work great for a demo.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Field label="Project title" htmlFor="title">
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </Field>
            <Field label="Summary" htmlFor="summary">
              <Textarea
                id="summary"
                rows={2}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="One or two sentences on what you built."
                required
              />
            </Field>
            <Field label="Problem addressed" htmlFor="problem">
              <Textarea
                id="problem"
                rows={2}
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="What real problem does this solve?"
              />
            </Field>
            <Field label="Solution" htmlFor="solution">
              <Textarea
                id="solution"
                rows={2}
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                placeholder="How does it work?"
              />
            </Field>
            <Field label="Tools used (comma separated)" htmlFor="tools">
              <Input
                id="tools"
                value={tools}
                onChange={(e) => setTools(e.target.value)}
                placeholder="Python, Figma, OpenAI API"
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Repository link" htmlFor="repo">
                <Input
                  id="repo"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  placeholder="https://github.com/..."
                />
              </Field>
              <Field label="Demo link" htmlFor="demo">
                <Input
                  id="demo"
                  value={demoUrl}
                  onChange={(e) => setDemoUrl(e.target.value)}
                  placeholder="https://..."
                />
              </Field>
            </div>
            <Field label="Your individual contribution" htmlFor="contribution">
              <Textarea
                id="contribution"
                rows={2}
                value={myContribution}
                onChange={(e) => setMyContribution(e.target.value)}
                placeholder="What did you personally build or lead?"
              />
            </Field>
            <Button type="submit" size="lg" className="self-start">
              Submit Project <ArrowRight />
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}
