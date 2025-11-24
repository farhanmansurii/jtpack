/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useCallback, useMemo, memo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
  Box,
  Layers,
  Info,
} from "lucide-react";
import Link from "next/link";
import { QuoteRequest } from "../quote-request";
import { cn } from "@/lib/utils"; // Assuming you have a shadcn utils helper

// --- Types ---
export type ColorScheme = "blue" | "green" | "slate";

export type ProductCardProps = {
  category: string;
  title: string;
  subtitle?: string;
  image: string | { url: string; description?: string }[];
  features: string[]; // These are now "Products/Grades"
  icon?: React.ReactNode;
  ctaText: string;
  colorScheme?: ColorScheme; // Derived from your config (Recycling=Green, Packaging=Blue)
  href?: string;
  slug?: string;
};

// --- Theme Configuration using Shadcn-like Utility Classes ---
const getTheme = (scheme: ColorScheme) => {
  // Using specific colors for branding, but shadcn utilities for structure
  const themes = {
    blue: {
      badge: "bg-secondary-100 text-secondary-800 border-secondary-200",
      icon: "text-secondary-600",
      softBg: "bg-secondary-50/50",
      primaryBtn: "bg-secondary-600 hover:bg-secondary-700 text-white shadow-sm",
      hoverBorder: "hover:border-secondary-300",
    },
    green: {
      badge: "bg-primary-100 text-primary-800 border-primary-200",
      icon: "text-primary-600",
      softBg: "bg-primary-50/50",
      primaryBtn: "bg-primary-600 hover:bg-primary-700 text-white shadow-sm",
      hoverBorder: "hover:border-primary-300",
    },
    slate: {
      badge: "bg-secondary text-secondary-foreground border-border",
      icon: "text-muted-foreground",
      softBg: "bg-muted/30",
      primaryBtn: "bg-primary text-primary-foreground hover:bg-primary/90",
      hoverBorder: "hover:border-primary/30",
    },
  };
  return themes[scheme] || themes.blue;
};

function ProductCard({
  category,
  title,
  subtitle,
  image,
  features,
  icon,
  ctaText,
  colorScheme = "blue",
  href,
  slug,
}: ProductCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Normalize images
  const images = useMemo(() => {
    if (!image) return [];
    const imgArray = Array.isArray(image) ? image : [image];
    return imgArray.map((img) => (typeof img === "string" ? img : img.url));
  }, [image]);

  const theme = useMemo(() => getTheme(colorScheme), [colorScheme]);

  // Show 4 items initially
  const visibleProducts = useMemo(
    () => (expanded ? features : features.slice(0, 4)),
    [expanded, features],
  );
  const hasMoreProducts = features.length > 4;

  // --- Carousel Logic ---
  const nextImage = useCallback(() => {
    if (images.length > 1) setCurrentImageIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    if (images.length > 1)
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Swipe Handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) nextImage();
    if (distance < -50) prevImage();
  };

  return (
    <div
      className={cn(
        "group flex flex-col h-full bg-card text-card-foreground rounded-xl border border-border shadow-sm transition-all duration-300 overflow-hidden hover:shadow-md",
        theme.hoverBorder,
      )}
    >
      {/* --- Header: Image Carousel --- */}
      <div
        className="relative aspect-[4/3] w-full overflow-hidden bg-muted touch-pan-y select-none border-b border-border"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {images.length > 0 ? (
          images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${title} - View ${index + 1}`}
              loading={index === 0 ? "eager" : "lazy"}
              className={cn(
                "absolute inset-0 w-full h-full object-cover transition-opacity duration-500 z-0",
                index === currentImageIndex ? "opacity-100" : "opacity-0",
              )}
            />
          ))
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
            <Box className="w-12 h-12 opacity-20" />
          </div>
        )}

        {/* Gradient & Badge */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none z-10" />

        <div className="absolute top-3 left-3 z-20">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wide border shadow-sm bg-white/95 backdrop-blur",
              theme.badge,
            )}
          >
            {icon || <Box className="w-3.5 h-3.5" />}
            {category}
          </span>
        </div>

        {/* Navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.preventDefault();
                prevImage();
              }}
              className="absolute z-20 left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-md bg-background/90 text-foreground shadow-sm border border-border opacity-0 group-hover:opacity-100 transition-all hover:bg-background"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                nextImage();
              }}
              className="absolute z-20 right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-md bg-background/90 text-foreground shadow-sm border border-border opacity-0 group-hover:opacity-100 transition-all hover:bg-background"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-0 left-0 right-0 flex justify-center p-2 gap-1 z-20">
              {images.map((_, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "h-1 rounded-full transition-all duration-300 shadow-sm",
                    idx === currentImageIndex ? "w-6 bg-white" : "w-2 bg-white/60",
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* --- Body Content --- */}
      <div className="flex flex-col flex-grow p-5">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-foreground leading-tight tracking-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{subtitle}</p>
          )}
        </div>

        {/* --- Product Range Grid (Was Features) --- */}
        <div className="flex-grow mb-6">
          <div className={cn("rounded-lg p-3.5 border border-border/50", theme.softBg)}>
            <div className="flex items-center gap-2 mb-3">
              <Layers className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                what we offer
              </span>
            </div>

            <div
              className={cn(
                "grid grid-cols-2 gap-x-2 gap-y-2 transition-all duration-300",
                expanded ? "" : "max-h-[110px] overflow-hidden",
              )}
            >
              {visibleProducts.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 min-w-0">
                  {/* Small bullet point style instead of checkmark to imply "List of Items" */}
                  <div
                    className={cn(
                      "mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0",
                      theme.icon.replace("text-", "bg-"),
                    )}
                  />
                  <span className="text-xs text-foreground/90 font-medium leading-snug break-words">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {hasMoreProducts && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="w-full mt-3 pt-2 border-t border-border/40 text-[11px] font-bold text-muted-foreground hover:text-foreground uppercase tracking-wide flex items-center justify-center gap-1 transition-colors"
              >
                {expanded ? (
                  <>
                    Show Less <ChevronUp className="w-3 h-3" />
                  </>
                ) : (
                  <>
                    View All <ChevronDown className="w-3 h-3" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* --- Footer Buttons --- */}
        <div className="mt-auto grid grid-cols-[auto_1fr] gap-3">
          {href ? (
            <Link
              href={href}
              className="flex items-center justify-center px-4 py-2.5 text-sm font-semibold rounded-lg border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              title="View Product Details"
            >
              <Info className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Details</span>
            </Link>
          ) : (
            <div className="hidden" />
          )}

          <QuoteRequest
            product={slug || title}
            colorScheme={colorScheme === "green" ? "green" : "blue"}
          >
            <button
              className={cn(
                "w-full flex items-center justify-center px-4 py-2.5 text-sm font-bold rounded-lg transition-all active:scale-[0.98]",
                theme.primaryBtn,
                !href ? "col-span-2" : "",
              )}
            >
              {ctaText}
              <ArrowUpRight className="w-4 h-4 ml-2 opacity-90" />
            </button>
          </QuoteRequest>
        </div>
      </div>
    </div>
  );
}

export default memo(ProductCard);
