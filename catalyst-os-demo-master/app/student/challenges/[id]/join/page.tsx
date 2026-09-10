"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StudentAvatar } from "@/components/shared/StudentAvatar";
import { useDemoState } from "@/lib/demo-state";
import { getStudentById, currentStudentId } from "@/lib/mock-data";
import { Users, UserPlus } from "lucide-react";

export default function JoinChallengePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const student = getStudentById(currentStudentId)!;
  const demo = useDemoState();
  const challenge = demo.findChallengeById(id);
  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");

  if (!challenge) notFound();

  const teams = demo.getTeamsForChallenge(challenge.id);
  const openTeams = teams.filter((t) => t.studentIds.length < t.maxSize && t.status !== "judged");

  function handleJoinTeam(teamId: string, teamName: string) {
    demo.joinTeam(teamId, student.id);
    toast.success(`You joined ${teamName}!`);
    router.push(`/student/challenges/${challenge!.id}`);
  }

  function handleCreateTeam(e: React.FormEvent) {
    e.preventDefault();
    if (!teamName.trim()) return;
    const team = demo.createTeam({
      challengeId: challenge!.id,
      name: teamName.trim(),
      description: teamDescription.trim() || "Just getting started.",
      creatorStudentId: student.id,
      maxSize: challenge!.maxTeamSize,
    });
    toast.success(`Team "${team.name}" created!`);
    router.push(`/student/challenges/${challenge!.id}`);
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <div>
        <p className="text-sm text-muted-foreground">Joining</p>
        <h1 className="font-heading text-2xl font-semibold">{challenge.title}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="size-4 text-primary" /> Join an Open Team
          </CardTitle>
          <CardDescription>Jump in with a team that&apos;s already forming.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {openTeams.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No open teams right now — start your own below.
            </p>
          ) : (
            openTeams.map((team) => (
              <div
                key={team.id}
                className="flex flex-col gap-3 rounded-lg border border-border p-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-sm font-medium">{team.name}</p>
                  <p className="text-xs text-muted-foreground">{team.description}</p>
                  <div className="mt-1.5 flex -space-x-2">
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
                </div>
                <Button
                  variant="outline"
                  onClick={() => handleJoinTeam(team.id, team.name)}
                  className="shrink-0"
                >
                  Join ({team.studentIds.length}/{team.maxSize})
                </Button>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="size-4 text-primary" /> Or Start a New Team
          </CardTitle>
          <CardDescription>
            Up to {challenge.maxTeamSize} members. You can invite classmates after creating it.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateTeam} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="team-name">Team name</Label>
              <Input
                id="team-name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="e.g. The Debuggers"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="team-description">What's your plan? (optional)</Label>
              <Textarea
                id="team-description"
                value={teamDescription}
                onChange={(e) => setTeamDescription(e.target.value)}
                placeholder="One sentence on what you're going to build."
                rows={2}
              />
            </div>
            <Button type="submit" className="self-start">
              Create Team
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
