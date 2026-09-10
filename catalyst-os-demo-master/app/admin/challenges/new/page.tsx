"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDemoState } from "@/lib/demo-state";
import { defaultSchool, STANDARD_RUBRIC, type ChallengeDifficulty } from "@/lib/mock-data";

const COVER_OPTIONS = [
  { icon: "Sparkles", colorFrom: "#6366f1", colorTo: "#a855f7" },
  { icon: "Shield", colorFrom: "#0ea5e9", colorTo: "#0f172a" },
  { icon: "BarChart3", colorFrom: "#16a34a", colorTo: "#0d9488" },
  { icon: "PiggyBank", colorFrom: "#f59e0b", colorTo: "#ea580c" },
  { icon: "Cog", colorFrom: "#64748b", colorTo: "#1e293b" },
];

export default function NewChallengePage() {
  const router = useRouter();
  const demo = useDemoState();
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [brief, setBrief] = useState("");
  const [skillTags, setSkillTags] = useState("");
  const [reward, setReward] = useState("");
  const [difficulty, setDifficulty] = useState<ChallengeDifficulty>("intermediate");
  const [deadline, setDeadline] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !deadline) return;

    const cover = COVER_OPTIONS[Math.floor(Math.random() * COVER_OPTIONS.length)];
    const today = new Date().toISOString().slice(0, 10);
    const resultsDate = new Date(deadline);
    resultsDate.setDate(resultsDate.getDate() + 7);

    const challenge = demo.createChallenge({
      title: title.trim(),
      theme: theme.trim() || "General",
      sponsor: null,
      coverIcon: cover.icon,
      colorFrom: cover.colorFrom,
      colorTo: cover.colorTo,
      shortDescription: shortDescription.trim(),
      brief: brief.trim() || shortDescription.trim(),
      status: "open",
      format: "team",
      difficulty,
      minTeamSize: 2,
      maxTeamSize: 4,
      skillTags: skillTags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      toolTags: [],
      rubric: STANDARD_RUBRIC,
      reward: reward.trim() || "Recognition + XP",
      registrationOpens: today,
      startDate: today,
      submissionDeadline: deadline,
      resultsDate: resultsDate.toISOString().slice(0, 10),
      schoolId: defaultSchool.id,
    });

    toast.success(`"${challenge.title}" is live in the marketplace.`);
    router.push("/admin/challenges");
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-semibold">Create Challenge</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Publishes immediately to the student marketplace for this demo session.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Challenge Details</CardTitle>
            <CardDescription>Keep it tight — students respond best to a clear, specific brief.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Field label="Title" htmlFor="title">
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Sustainable Design Sprint"
                required
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Theme / category" htmlFor="theme">
                <Input
                  id="theme"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  placeholder="e.g. Engineering"
                />
              </Field>
              <Field label="Difficulty" htmlFor="difficulty">
                <Select
                  items={{ beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced" }}
                  value={difficulty}
                  onValueChange={(v) => v && setDifficulty(v as ChallengeDifficulty)}
                >
                  <SelectTrigger id="difficulty" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>
            <Field label="Short description" htmlFor="short">
              <Textarea
                id="short"
                rows={2}
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="One sentence for the marketplace card."
                required
              />
            </Field>
            <Field label="Full brief (optional)" htmlFor="brief">
              <Textarea
                id="brief"
                rows={3}
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                placeholder="What should teams build, and why does it matter?"
              />
            </Field>
            <Field label="Skill tags (comma separated)" htmlFor="skills">
              <Input
                id="skills"
                value={skillTags}
                onChange={(e) => setSkillTags(e.target.value)}
                placeholder="Python, Design, Data Analysis"
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Reward" htmlFor="reward">
                <Input
                  id="reward"
                  value={reward}
                  onChange={(e) => setReward(e.target.value)}
                  placeholder="e.g. $250 grant"
                />
              </Field>
              <Field label="Submission deadline" htmlFor="deadline">
                <Input
                  id="deadline"
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  required
                />
              </Field>
            </div>
            <Button type="submit" size="lg" className="self-start">
              Publish Challenge
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
