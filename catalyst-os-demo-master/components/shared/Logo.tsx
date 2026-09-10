import Link from "next/link";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ href = "/", className }: { href?: string; className?: string }) {
  return (
    <Link href={href} className={cn("flex items-center gap-2 font-heading font-semibold", className)}>
      <span className="flex size-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-[#a855f7] text-white">
        <Zap className="size-4" fill="currentColor" strokeWidth={0} />
      </span>
      Catalyst OS
    </Link>
  );
}
