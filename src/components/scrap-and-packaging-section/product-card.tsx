/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
import { CheckCircle, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { QuoteRequest } from "../quote-request";
import Link from "next/link";

type ColorScheme = "blue" | "green" | "purple" | "orange";

type ProductCardProps = {
  category: string;
  title: string;
  subtitle?: string;
  image: string | string[];
  features: string[];
  icon?: React.ReactNode;
  ctaText: string;
  colorScheme?: ColorScheme;
  href?: string;
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
}: ProductCardProps) {
  const [expanded, setExpanded] = useState(false);

  // Normalize image to array
  const images = Array.isArray(image) ? image : [image];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Autoplay carousel
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Swipe gesture handlers
  const minSwipeDistance = 50;

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && images.length > 1) {
      nextImage();
    }
    if (isRightSwipe && images.length > 1) {
      prevImage();
    }
  }, [touchStart, touchEnd, images.length, nextImage, prevImage]);

  const getProductValue = useCallback((c: string) =>
    ({
      "Paper Scrap": "paper-scrap",
      "Plastic Scrap": "plastic-scrap",
      "Metal Scrap": "metal-scrap",
      "CFC Packaging": "cfc-packaging",
      "Thermal Packaging": "thermal-packaging",
      "Custom Packaging": "custom-packaging",
    }[c] || "other"), []);

  const colors = useMemo(() => ({
    blue: {
      badge: "bg-blue-600 text-white",
      checkIcon: "text-blue-600",
      button: "bg-blue-600 hover:bg-blue-700 text-white",
      border: "border-slate-200",
      accent: "text-blue-600",
    },
    green: {
      badge: "bg-emerald-600 text-white",
      checkIcon: "text-emerald-600",
      button: "bg-emerald-600 hover:bg-emerald-700 text-white",
      border: "border-slate-200",
      accent: "text-emerald-600",
    },
    purple: {
      badge: "bg-violet-600 text-white",
      checkIcon: "text-violet-600",
      button: "bg-violet-600 hover:bg-violet-700 text-white",
      border: "border-slate-200",
      accent: "text-violet-600",
    },
    orange: {
      badge: "bg-amber-600 text-white",
      checkIcon: "text-amber-600",
      button: "bg-amber-600 hover:bg-amber-700 text-white",
      border: "border-slate-200",
      accent: "text-amber-600",
    },
  }[colorScheme]), [colorScheme]);

  const visibleFeatures = useMemo(() =>
    expanded ? features : features.slice(0, 3),
    [expanded, features]
  );
  const hasMoreFeatures = useMemo(() => features.length > 3, [features.length]);

  return (
    <div
      className={`group relative flex flex-col rounded-2xl border ${colors.border} bg-white overflow-hidden shadow-md hover:shadow-lg transition-all duration-300`}
    >
      <div
        className="relative aspect-[16/10] w-full overflow-hidden bg-slate-50 group/carousel touch-pan-y"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Image Carousel with Autoplay */}
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`${title} - Image ${index + 1}`}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={index === 0 ? "high" : "low"}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        {/* Navigation Arrows - Show on Hover */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm p-2.5 sm:p-2 rounded-full shadow-lg hover:bg-white hover:scale-110 active:scale-95 transition-all opacity-0 group-hover/carousel:opacity-100 md:opacity-0 md:group-hover/carousel:opacity-100 z-20 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 sm:w-5 sm:h-5 text-slate-700" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm p-2.5 sm:p-2 rounded-full shadow-lg hover:bg-white hover:scale-110 active:scale-95 transition-all opacity-0 group-hover/carousel:opacity-100 md:opacity-0 md:group-hover/carousel:opacity-100 z-20 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 sm:w-5 sm:h-5 text-slate-700" />
            </button>
          </>
        )}

        {/* Navigation Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 flex space-x-1.5 sm:space-x-1.5 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`transition-all rounded-full touch-manipulation focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 ${
                  index === currentImageIndex
                    ? 'bg-white w-7 sm:w-6 h-2 sm:h-1.5'
                    : 'bg-white/50 hover:bg-white/75 active:bg-white/90 w-2 sm:w-1.5 h-2 sm:h-1.5'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}

        <div className="absolute top-4 left-4 z-10">
          <span
            className={`inline-flex items-center gap-1.5 ${colors.badge} px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm`}
          >
            {icon || <Sparkles className="w-3.5 h-3.5" />}
            {category}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-6">
        <div className="mb-5">
          <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm text-slate-600 leading-relaxed">{subtitle}</p>
          )}
        </div>

        <div className="flex-1 mb-6">
          <div className="mb-3">
            <h4 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">
              What We Offer
            </h4>
          </div>
          <div className={`space-y-2.5 transition-all duration-300 ${expanded ? 'max-h-96' : 'max-h-32'} overflow-hidden`}>
            {visibleFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-2.5"
              >
                <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${colors.checkIcon}`} />
                <span className="text-sm text-slate-700 leading-relaxed">{feature}</span>
              </div>
            ))}
          </div>

          {hasMoreFeatures && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-3 text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1 transition-colors"
            >
              {expanded ? (
                <>
                  Show less <ChevronUp className="w-3.5 h-3.5" />
                </>
              ) : (
                <>
                  {features.length - 3} more features <ChevronDown className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          )}
        </div>

        <div className="flex gap-3">
          {href && (
            <Link href={href} className="flex-1">
              <span className={`inline-flex items-center justify-center w-full px-4 py-2.5 text-sm font-semibold rounded-lg border ${colors.border} hover:bg-slate-50 text-slate-700 transition-colors`}>
                View details
              </span>
            </Link>
          )}
          <QuoteRequest product={getProductValue(category)} colorScheme={colorScheme as "green" | "blue"}>
            <button
              className={`${href ? 'flex-1' : 'w-full'} ${colors.button} font-semibold rounded-lg py-2.5 px-4 transition-colors duration-200 shadow-sm hover:shadow`}
            >
              {ctaText}
            </button>
          </QuoteRequest>
        </div>
      </div>
    </div>
  );
}

export default memo(ProductCard);

