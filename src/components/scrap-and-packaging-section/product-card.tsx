/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useCallback, useMemo, memo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Box,
  Info,
} from "lucide-react";
import Link from "next/link";
import { QuoteRequest } from "../quote-request";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ColorScheme = "blue" | "green" | "slate";

export type ProductCardProps = {
  category: string;
  title: string;
  subtitle?: string;
  image: string | { url: string; description?: string }[];
  features: string[];
  icon?: React.ReactNode;
  ctaText: string;
  colorScheme?: ColorScheme;
  href?: string;
  slug?: string;
};

const palette = {
  green: {
    label: "text-primary-600",
    divisionNum: "text-primary-400",
    badge: "bg-primary-50 border-primary-200 text-primary-800",
    badgeStripe: "bg-primary-500",
    outlineBtn: "border-primary-300 text-primary-700 hover:bg-primary-50",
    solidBtn: "bg-primary-600 hover:bg-primary-700 text-white",
  },
  blue: {
    label: "text-secondary-600",
    divisionNum: "text-secondary-400",
    badge: "bg-secondary-50 border-secondary-200 text-secondary-800",
    badgeStripe: "bg-secondary-500",
    outlineBtn: "border-secondary-300 text-secondary-700 hover:bg-secondary-50",
    solidBtn: "bg-secondary-600 hover:bg-secondary-700 text-white",
  },
  slate: {
    label: "text-neutral-500",
    divisionNum: "text-neutral-400",
    badge: "bg-neutral-50 border-neutral-200 text-neutral-700",
    badgeStripe: "bg-neutral-400",
    outlineBtn: "border-neutral-300 text-neutral-700 hover:bg-neutral-50",
    solidBtn: "bg-neutral-800 hover:bg-neutral-900 text-white",
  },
} as const;

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

  const images = useMemo(() => {
    if (!image) return [];
    const arr = Array.isArray(image) ? image : [image];
    return arr.map((img) => (typeof img === "string" ? img : img.url));
  }, [image]);

  const p = palette[colorScheme] ?? palette.blue;

  const visibleFeatures = useMemo(
    () => (expanded ? features : features.slice(0, 5)),
    [expanded, features],
  );
  const hasMore = features.length > 5;

  const nextImage = useCallback(() => {
    if (images.length > 1) setCurrentImageIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    if (images.length > 1)
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const d = touchStart - touchEnd;
    if (d > 50) nextImage();
    if (d < -50) prevImage();
  };

  return (
    <div className="group flex flex-col h-full border border-neutral-200 overflow-hidden">
      {/* ── Image carousel ──────────────────────────────── */}
      <div
        className="relative aspect-[4/3] w-full overflow-hidden flex-shrink-0 touch-pan-y select-none bg-neutral-100"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {images.length > 0 ? (
          images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${title} — view ${i + 1}`}
              loading={i === 0 ? "eager" : "lazy"}
              className={cn(
                "absolute inset-0 w-full h-full object-cover transition-opacity duration-500",
                i === currentImageIndex ? "opacity-100" : "opacity-0",
              )}
            />
          ))
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Box className="w-10 h-10 text-neutral-300" />
          </div>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent pointer-events-none" />

        {/* Category badge — bottom left, matching DualBusiness label style */}
        <div className="absolute bottom-0 left-0 right-0 px-4 py-3">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "inline-flex items-center gap-1.5 border overflow-hidden bg-white/92 backdrop-blur-sm",
              )}
            >
              <span className={cn("w-[3px] self-stretch flex-shrink-0", p.badgeStripe)} />
              <span className={cn("flex items-center gap-1.5 px-2 py-1", p.badge)}>
                <span className="flex-shrink-0 [&>svg]:w-3 [&>svg]:h-3">
                  {icon ?? <Box className="w-3 h-3" />}
                </span>
                <span className="text-[0.55rem] font-bold uppercase tracking-[0.18em]">
                  {category}
                </span>
              </span>
            </div>

            {images.length > 1 && (
              <span className="ml-auto text-[0.55rem] font-semibold text-white/80 tabular-nums">
                {currentImageIndex + 1}/{images.length}
              </span>
            )}
          </div>
        </div>

        {/* Carousel nav */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.preventDefault(); prevImage(); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 flex items-center justify-center bg-white/80 backdrop-blur-sm text-neutral-700 border border-white/50 opacity-0 group-hover:opacity-100 transition-all hover:bg-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => { e.preventDefault(); nextImage(); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 flex items-center justify-center bg-white/80 backdrop-blur-sm text-neutral-700 border border-white/50 opacity-0 group-hover:opacity-100 transition-all hover:bg-white"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Dot indicators */}
            <div className="absolute top-2.5 right-2.5 flex gap-1 z-10">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={cn(
                    "rounded-full transition-all duration-300",
                    idx === currentImageIndex ? "w-4 h-1 bg-white" : "w-1 h-1 bg-white/50",
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Body ────────────────────────────────────────── */}
      <div className="flex flex-col flex-grow p-5">
        {/* Category label — matches DualBusiness `b.badge` pattern */}
        <span className={cn("text-[0.6rem] font-bold uppercase tracking-[0.18em] mb-2 block", p.label)}>
          {category}
        </span>

        <h3 className="text-[1.05rem] font-bold text-foreground leading-[1.2] mb-2">
          {title}
        </h3>

        {subtitle && (
          <p className="text-sm text-neutral-600 leading-relaxed mb-4">{subtitle}</p>
        )}

        {/* Features — chip badges */}
        <div className="flex-grow mb-5">
          <p className="text-[0.55rem] font-bold uppercase tracking-[0.18em] text-neutral-400 mb-2.5">
            What We Offer
          </p>
          <div className="flex flex-wrap gap-1.5">
            {visibleFeatures.map((item, idx) => (
              <span
                key={idx}
                className={cn(
                  "inline-flex items-center gap-1.5 px-2.5 py-1 border text-[11px] font-semibold leading-none",
                  p.badge,
                )}
              >
                <span className={cn("w-1 h-1 rounded-full flex-shrink-0", p.badgeStripe)} />
                {item}
              </span>
            ))}
          </div>
          {hasMore && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-2 flex items-center gap-1 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              {expanded ? (
                <><ChevronUp className="w-3 h-3" /> Show less</>
              ) : (
                <><ChevronDown className="w-3 h-3" /> +{features.length - 5} more</>
              )}
            </button>
          )}
        </div>

        {/* ── CTAs ────────────────────────────────────── */}
        <div className="mt-auto pt-3 border-t border-neutral-100 flex items-center gap-2">
          {href && (
            <Link href={href} title="View product details">
              <Button
                variant="outline"
                size="sm"
                className="h-9 px-3 font-semibold text-sm border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
              >
                <Info className="w-3.5 h-3.5" />
                <span className="hidden sm:inline ml-1.5">Details</span>
              </Button>
            </Link>
          )}

          <QuoteRequest
            product={slug || title}
            colorScheme={colorScheme === "green" ? "green" : "blue"}
          >
            <Button
              size="sm"
              className={cn("h-9 px-4 font-semibold text-sm flex-1", p.solidBtn)}
            >
              {ctaText}
              <ArrowRight className="w-3.5 h-3.5 ml-2" />
            </Button>
          </QuoteRequest>
        </div>
      </div>
    </div>
  );
}

export default memo(ProductCard);
