import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  badge?: {
    text: string;
    variant?: "default" | "secondary" | "outline" | "destructive";
    className?: string;
  };
  variant?: "center" | "left" | "right";
  /**
   * "stacked" — badge above title (default, works centered or left)
   * "inline"  — badge + horizontal rule on same row, matching the about-us / hero pattern
   */
  badgeStyle?: "stacked" | "inline";
}

export function SectionHeader({
  title,
  description,
  badge,
  variant = "center",
  badgeStyle = "stacked",
  className,
  ...props
}: SectionHeaderProps) {
  const alignment =
    variant === "center"
      ? "text-center items-center mx-auto"
      : variant === "left"
        ? "text-left items-start"
        : "text-right items-end ml-auto";

  return (
    <div
      className={cn("flex w-full flex-col mb-10 lg:mb-12", alignment, className)}
      {...props}
    >
      {badge && badgeStyle === "inline" && (
        <div className="flex items-center gap-3 mb-4">
          <Badge
            variant={badge.variant ?? "outline"}
            className={cn(
              "px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] w-fit",
              badge.className,
            )}
          >
            {badge.text}
          </Badge>
          <span className="h-px w-8 bg-primary-200 flex-shrink-0" aria-hidden />
        </div>
      )}

      {badge && badgeStyle === "stacked" && (
        <Badge
          variant={badge.variant ?? "outline"}
          className={cn(
            "mb-4 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] w-fit",
            badge.className,
          )}
        >
          {badge.text}
        </Badge>
      )}

      <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold tracking-tight text-foreground leading-[1.12]">
        {title}
      </h2>

      {description && (
        <p
          className={cn(
            "mt-4 text-sm text-neutral-600 leading-relaxed",
            variant === "center" && "max-w-2xl",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
