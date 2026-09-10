import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { avatarUrl, initials } from "@/lib/avatar";
import { cn } from "@/lib/utils";

export function StudentAvatar({
  name,
  seed,
  size = "default",
  className,
}: {
  name: string;
  seed: string;
  size?: "sm" | "default" | "lg";
  className?: string;
}) {
  return (
    <Avatar size={size} className={cn(className)}>
      <AvatarImage src={avatarUrl(seed)} alt={name} />
      <AvatarFallback>{initials(name)}</AvatarFallback>
    </Avatar>
  );
}
