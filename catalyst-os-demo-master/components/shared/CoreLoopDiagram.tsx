"use client";

import { motion } from "framer-motion";
import {
  Flag,
  UserPlus,
  Hammer,
  UploadCloud,
  Gavel,
  Award,
  FolderKanban,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const STEPS = [
  {
    label: "Challenge Created",
    icon: Flag,
    description:
      "A school admin publishes a real-world challenge — skills, rubric, and timeline — and it appears in the student marketplace.",
  },
  {
    label: "Students Join",
    icon: UserPlus,
    description:
      "Students browse open challenges and join a team, solo or with classmates.",
  },
  {
    label: "Build",
    icon: Hammer,
    description:
      "Teams work over the challenge window, applying real skills to a real problem.",
  },
  {
    label: "Submit",
    icon: UploadCloud,
    description:
      "Teams submit their project — links, writeups, and artifacts — before the deadline.",
  },
  {
    label: "Judged",
    icon: Gavel,
    description:
      "Human judges score the submission against the rubric and leave real feedback.",
  },
  {
    label: "Recognition",
    icon: Award,
    description:
      "Strong performance earns XP and badges tied to the skills demonstrated.",
  },
  {
    label: "Portfolio Updated",
    icon: FolderKanban,
    description:
      "The completed challenge — problem, solution, and judge feedback — is added to the student's portfolio automatically.",
  },
  {
    label: "School Outcomes Updated",
    icon: TrendingUp,
    description:
      "Participation, skills coverage, and outcomes roll up into the school's dashboard in real time — then the next challenge opens.",
  },
];

export function CoreLoopDiagram({ className }: { className?: string }) {
  return (
    <TooltipProvider delay={100}>
      <div className={cn("grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4", className)}>
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 * i, duration: 0.4 }}
              className="relative flex flex-col items-center gap-2 text-center"
            >
              <Tooltip>
                <TooltipTrigger
                  className="flex flex-col items-center gap-2 outline-none"
                  render={<div />}
                >
                  <div className="flex size-12 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-sm transition-colors hover:bg-white/25">
                    <Icon className="size-5" strokeWidth={1.75} />
                  </div>
                  <p className="text-xs leading-tight font-medium text-white/90 max-w-24">
                    {step.label}
                  </p>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-56 text-center">
                  {step.description}
                </TooltipContent>
              </Tooltip>
              <span className="absolute -top-1 -left-1 flex size-4 items-center justify-center rounded-full bg-lime text-[9px] font-bold text-lime-foreground">
                {i + 1}
              </span>
            </motion.div>
          );
        })}
      </div>
    </TooltipProvider>
  );
}
