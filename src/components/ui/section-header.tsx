import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface SectionProps {
  title: string;
  description?: string;
  badge?: {
    text: string;
    variant?: "default" | "secondary" | "outline";
    className?: string;
  };
  variant?: "center" | "left" | "right";
  className?: string;
}

export function SectionHeader({
  title,
  description,
  badge,
  variant = "center",
  className,
  ...props
}: SectionProps) {
  const alignment =
    variant === "center"
      ? "text-center items-center"
      : variant === "left"
      ? "text-left items-start"
      : "text-right items-end";

  return (
    <div {...props} className={cn("mb-10 flex flex-col", alignment, className)}>
      {badge && (
        <Badge
          variant={badge.variant || "secondary"}
          className={cn(
            "inline-flex items-center rounded-full bg-amber-100 text-amber-800 px-3 py-1 text-xs font-medium",
            badge.className,
          )}
        >
          {badge.text}
        </Badge>
      )}

      <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{title}</h2>

      {description && <p className="mt-3 text-muted-foreground">{description}</p>}
    </div>
  );
}
