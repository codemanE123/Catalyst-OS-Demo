import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CoreLoopDiagram } from "@/components/shared/CoreLoopDiagram";
import { Zap, GraduationCap, LayoutDashboard, ArrowRight } from "lucide-react";
import { defaultSchool } from "@/lib/mock-data";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#312e81] via-[#4338ca] to-[#6d28d9] px-6 py-20 text-white sm:py-28">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <span className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium ring-1 ring-white/20">
            <Zap className="size-3.5" fill="currentColor" strokeWidth={0} />
            Now piloting at {defaultSchool.name}
          </span>
          <h1 className="font-heading text-4xl leading-tight font-semibold sm:text-5xl">
            The operating system for continuous experiential workforce development
          </h1>
          <p className="max-w-xl text-base text-white/80 sm:text-lg">
            Schools run recurring, real-world challenges. Students participate, build, submit, get
            evaluated, and walk away with a stronger portfolio. Every cycle, the next challenge opens.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button
              size="lg"
              className="h-11 px-5 text-base"
              nativeButton={false}
              render={<Link href="/student" />}
            >
              <GraduationCap /> View as a Student
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-11 border-white/30 bg-white/5 px-5 text-base text-white hover:bg-white/15 hover:text-white"
              nativeButton={false}
              render={<Link href="/admin" />}
            >
              <LayoutDashboard /> View as a School Admin
            </Button>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <p className="mb-6 text-center text-xs font-medium tracking-wide text-white/60 uppercase">
            The core loop
          </p>
          <CoreLoopDiagram />
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-5xl gap-4 px-6 py-16 sm:grid-cols-3">
        <InfoCard
          title="Built for one loop, done well"
          body="Challenge created, students join, build, submit, get judged, earn recognition — and the next challenge opens. No bloated LMS, no half-built talent marketplace."
        />
        <InfoCard
          title="Evidence, not just grades"
          body="Every completed challenge becomes a portfolio entry: the problem, the solution, the tools used, and real feedback from human judges."
        />
        <InfoCard
          title="Outcomes schools can see"
          body="Participation, completion, and skills demonstrated roll up into a single dashboard schools can point to when asked what the program is worth."
        />
      </section>

      <footer className="mt-auto border-t border-border px-6 py-6 text-center text-xs text-muted-foreground">
        Catalyst OS — investor preview build. Seeded demo data, not a live production system.
      </footer>
    </main>
  );
}

function InfoCard({ title, body }: { title: string; body: string }) {
  return (
    <Card className="gap-2 p-5">
      <h3 className="font-heading text-sm font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{body}</p>
      <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0">
        <ArrowRight className="size-3" />
      </span>
    </Card>
  );
}
