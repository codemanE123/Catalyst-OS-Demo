import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function SkillTagChip({ children, className }: { children: string; className?: string }) {
  return (
    <Badge variant="outline" className={cn("bg-background font-normal", className)}>
      {children}
    </Badge>
  );
}
