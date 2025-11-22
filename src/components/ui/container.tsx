import * as React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  padding?: "none" | "sm" | "md" | "lg";
  isOnPage?: boolean;
}

const containerSizes = {
  sm: "max-w-4xl",
  md: "max-w-6xl",
  lg: "max-w-7xl",
  xl: "max-w-8xl",
  full: "max-w-full",
};

const containerPadding = {
  none: "",
  sm: "px-4",
  md: "px-4 sm:px-6 lg:px-8",
  lg: "px-4 sm:px-6 lg:px-8 xl:px-12",
};

function Container({
  className,
  children,
  size = "lg",
  padding = "md",
  isOnPage = false,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full",
        containerSizes[size],
        containerPadding[padding],
        isOnPage ? "pt-[160px] pb-16 lg:pt-[200px] lg:pb-24" : "",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { Container };
