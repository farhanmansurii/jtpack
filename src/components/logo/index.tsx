"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { NAVBAR_CONFIG } from "@/lib/config";

type LogoVariant = "default" | "light" | "dark";
type LogoSize = "sm" | "md" | "lg" | "xl";

interface LogoProps {
  /**
   * Variant of the logo - controls text color
   * - default: uses primary color
   * - light: uses white color
   * - dark: uses foreground color
   */
  variant?: LogoVariant;
  /**
   * Size of the logo
   * - sm: text-base (16px) / 24px image
   * - md: text-xl (20px) / 32px image
   * - lg: text-2xl (24px) / 40px image
   * - xl: text-3xl (30px) / 48px image
   */
  size?: LogoSize;
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

const imageSizeClasses: Record<LogoSize, number> = {
  sm: 24,
  md: 32,
  lg: 40,
  xl: 48,
};

const variantClasses: Record<LogoVariant, string> = {
  default: "text-primary",
  light: "text-white",
  dark: "text-foreground",
};

export function Logo({
  variant = "default",
  size = "md",
  showBadge = false,
  className,
  href = "/",
  clickable = true,
}: LogoProps) {
  // Determine if we should use image or text
  const logoImageSrc = NAVBAR_CONFIG.logo.image;
  const [imageError, setImageError] = useState(false);
  const useImage = (logoImageSrc && logoImageSrc !== "" && !imageError);

  const logoContent = (
    <div className={cn("flex items-center space-x-2", className)}>
      {useImage ? (
        <div className="relative flex-shrink-0" style={{ width: imageSizeClasses[size], height: imageSizeClasses[size] }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoImageSrc}
            alt={NAVBAR_CONFIG.logo.text}
            width={imageSizeClasses[size]}
            height={imageSizeClasses[size]}
            className="object-contain"
            onError={() => {
              // Fallback to text if image fails to load
              setImageError(true);
            }}
          />
        </div>
      ) : (
        <div
          className={cn(
            "font-bold transition-colors duration-300",
            sizeClasses[size],
            variantClasses[variant],
          )}
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
              : "bg-muted text-muted-foreground border-border",
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

