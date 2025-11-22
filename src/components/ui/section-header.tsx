import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  badge?: {
    text: string;
    variant?: "default" | "secondary" | "outline" | "destructive";
    className?: string;
  };
  variant?: "center" | "left" | "right";
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
      ? "text-center items-center mx-auto"
      : variant === "left"
      ? "text-left items-start"
      : "text-right items-end ml-auto";

  return (
    <div
      className={cn("flex w-full flex-col gap-3 mb-12 lg:mb-16", alignment, className)}
      {...props}
    >
      {badge && (
        <Badge
          variant={badge.variant || "secondary"}
          className={cn(
            // Removed hardcoded 'bg-amber' so it uses the variant colors correctly
            "px-3 py-1 text-xs font-bold uppercase tracking-widest w-fit",
            badge.className,
          )}
        >
          {badge.text}
        </Badge>
      )}

      <div className="space-y-4 max-w-4xl">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl leading-[1.1]">
          {title}
        </h2>

        {description && (
          <p
            className={cn(
              "text-lg text-muted-foreground leading-relaxed",
              // Constrain width when centered for better readability
              variant === "center" && "max-w-2xl mx-auto",
            )}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
