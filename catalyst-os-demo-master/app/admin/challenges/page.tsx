"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { getIcon } from "@/components/shared/icon-map";
import { useDemoState } from "@/lib/demo-state";
import { challengeStatusLabel, challengeStatusBadgeClass } from "@/lib/status";
import { formatDate } from "@/lib/utils";
import { Plus, Building2 } from "lucide-react";

export default function AdminChallengesPage() {
  const demo = useDemoState();
  const sorted = [...demo.challenges].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-semibold">Challenges</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage every challenge running at Bridgeview Innovation Academy.
          </p>
        </div>
        <Button nativeButton={false} render={<Link href="/admin/challenges/new" />}>
          <Plus /> Create Challenge
        </Button>
      </div>

      <Card className="p-0">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Challenge</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead>Submission Deadline</TableHead>
                <TableHead className="text-right">Sponsor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map((challenge) => {
                const Icon = getIcon(challenge.coverIcon);
                return (
                  <TableRow key={challenge.id}>
                    <TableCell>
                      <Link
                        href={`/student/challenges/${challenge.id}`}
                        className="flex items-center gap-2.5 font-medium hover:text-primary"
                      >
                        <span
                          className="flex size-7 shrink-0 items-center justify-center rounded-md text-white"
                          style={{
                            background: `linear-gradient(135deg, ${challenge.colorFrom}, ${challenge.colorTo})`,
                          }}
                        >
                          <Icon className="size-3.5" />
                        </span>
                        {challenge.title}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge className={challengeStatusBadgeClass[challenge.status]}>
                        {challengeStatusLabel[challenge.status]}
                      </Badge>
                    </TableCell>
                    <TableCell>{demo.getChallengeParticipantCount(challenge.id)}</TableCell>
                    <TableCell>{formatDate(challenge.submissionDeadline)}</TableCell>
                    <TableCell className="text-right">
                      {challenge.sponsor ? (
                        <Link
                          href={`/sponsor/${challenge.id}`}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                        >
                          <Building2 className="size-3.5" /> Industry Dashboard
                        </Link>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
