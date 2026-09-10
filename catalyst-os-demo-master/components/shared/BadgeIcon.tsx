import { getIcon } from "./icon-map";
import { cn } from "@/lib/utils";

export function BadgeIcon({
  icon,
  size = "default",
  className,
}: {
  icon: string;
  size?: "sm" | "default" | "lg";
  className?: string;
}) {
  const Icon = getIcon(icon);
  const sizeClasses = {
    sm: "size-8",
    default: "size-11",
    lg: "size-16",
  }[size];
  const iconSizeClasses = {
    sm: "size-4",
    default: "size-5",
    lg: "size-8",
  }[size];

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[#a855f7] text-white shadow-sm",
        sizeClasses,
        className
      )}
    >
      <Icon className={iconSizeClasses} strokeWidth={2} />
    </div>
  );
}
