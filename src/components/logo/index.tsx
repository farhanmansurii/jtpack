"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { NAVBAR_CONFIG } from "@/lib/config";

type LogoVariant = "light" | "dark";
type LogoSize = "sm" | "md" | "lg" | "xl";

interface LogoProps {
  /**
   * Variant of the logo - controls text color
   * - light: uses white color
   * - dark: uses foreground color
   */
  variant?: LogoVariant;
  /**
   * Size of the logo
   * - sm: text-base (16px) / 48px image
   * - md: text-xl (20px) / 64px image
   * - lg: text-2xl (24px) / 128px image
   * - xl: text-3xl (30px) / 160px image
   * - number: custom pixel size for image
   */
  size?: LogoSize | number;
  /**
   * Whether to show the badge next to the logo
   */
  showBadge?: boolean;
  /**
   * Custom className to override styles
   */
  className?: string;
  /**
   * Custom href for the logo link (defaults to "/")
   */
  href?: string;
  /**
   * Whether the logo should be clickable (wrapped in Link)
   */
  clickable?: boolean;
}

const sizeClasses: Record<LogoSize, string> = {
  sm: "text-base",
  md: "text-xl",
  lg: "text-2xl",
  xl: "text-3xl",
};

const imageSizes: Record<LogoSize, number> = {
  sm: 48,
  md: 64,
  lg: 128,
  xl: 160,
};

const variantClasses: Record<LogoVariant, string> = {
  light: "text-white",
  dark: "text-foreground",
};

export function Logo({
  variant = "dark",
  size = "lg",
  showBadge = false,
  className,
  href = "/",
  clickable = true,
}: LogoProps) {
  const logoImageSrc =
    typeof NAVBAR_CONFIG.logo.image === "string"
      ? NAVBAR_CONFIG.logo.image
      : NAVBAR_CONFIG.logo.image[variant];

  const useImage = logoImageSrc && logoImageSrc !== "";

  // Handle both preset sizes and custom numbers
  const imageSize = typeof size === "number" ? size : imageSizes[size];
  const textSizeClass = typeof size === "number" ? "" : sizeClasses[size];

  const logoContent = (
    <div className={cn("flex items-center space-x-2", className)}>
      {useImage ? (
        <div className="relative flex-shrink-0">
          <Image
            src="/logo/jtpack-logo.svg"
            alt={NAVBAR_CONFIG.logo.text}
            width={imageSize}
            height={imageSize}
            className="object-contain"
            style={{ width: `${imageSize}px` }}
            priority
          />
        </div>
      ) : (
        <div
          className={cn(
            "font-bold transition-colors duration-300",
            textSizeClass,
            variantClasses[variant]
          )}
          style={typeof size === "number" ? { fontSize: `${size}px` } : undefined}
        >
          {NAVBAR_CONFIG.logo.text}
        </div>
      )}
      {showBadge && NAVBAR_CONFIG.logo.badge && (
        <span
          className={cn(
            "text-xs font-medium px-2 py-0.5 rounded-md border",
            variant === "light"
              ? "bg-white/10 text-white border-white/20"
              : "bg-muted text-muted-foreground border-border"
          )}
        >
          {NAVBAR_CONFIG.logo.badge}
        </span>
      )}
    </div>
  );

  if (!clickable) {
    return logoContent;
  }

  return (
    <Link
      href={href}
      className="focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 rounded-sm"
    >
      {logoContent}
    </Link>
  );
}
