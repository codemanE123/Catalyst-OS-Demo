"use client";

import { useMemo, useState } from "react";
import { ChallengeCard } from "@/components/shared/ChallengeCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDemoState } from "@/lib/demo-state";
import { Search } from "lucide-react";

const STATUS_OPTIONS = [
  { value: "all", label: "All statuses" },
  { value: "open", label: "Registration Open" },
  { value: "in_progress", label: "In Progress" },
  { value: "upcoming", label: "Upcoming" },
  { value: "closed", label: "Results Published" },
];

const FORMAT_OPTIONS = [
  { value: "all", label: "Any format" },
  { value: "team", label: "Team" },
  { value: "solo", label: "Solo" },
];

export default function ChallengeMarketplacePage() {
  const { challenges, getChallengeParticipantCount } = useDemoState();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [format, setFormat] = useState("all");
  const [skill, setSkill] = useState("all");

  const allSkills = useMemo(() => {
    const set = new Set<string>();
    challenges.forEach((c) => c.skillTags.forEach((tag) => set.add(tag)));
    return Array.from(set).sort();
  }, [challenges]);

  const statusItems = useMemo(
    () => Object.fromEntries(STATUS_OPTIONS.map((o) => [o.value, o.label])),
    []
  );
  const formatItems = useMemo(
    () => Object.fromEntries(FORMAT_OPTIONS.map((o) => [o.value, o.label])),
    []
  );
  const skillItems = useMemo(
    () => Object.fromEntries([["all", "Any skill"], ...allSkills.map((s) => [s, s] as const)]),
    [allSkills]
  );

  const filtered = challenges.filter((c) => {
    if (status !== "all" && c.status !== status) return false;
    if (format !== "all" && c.format !== format) return false;
    if (skill !== "all" && !c.skillTags.includes(skill)) return false;
    if (query && !`${c.title} ${c.theme}`.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold">Challenges</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Browse open, upcoming, and completed challenges from your school.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search challenges..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select items={statusItems} value={status} onValueChange={(v) => setStatus(v ?? "all")}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select items={formatItems} value={format} onValueChange={(v) => setFormat(v ?? "all")}>
          <SelectTrigger className="w-full sm:w-36">
            <SelectValue placeholder="Format" />
          </SelectTrigger>
          <SelectContent>
            {FORMAT_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select items={skillItems} value={skill} onValueChange={(v) => setSkill(v ?? "all")}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Skill" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any skill</SelectItem>
            {allSkills.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted-foreground">
          No challenges match those filters.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              participantCount={getChallengeParticipantCount(challenge.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
