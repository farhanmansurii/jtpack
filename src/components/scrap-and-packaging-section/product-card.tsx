/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
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

export default function ProductCard({
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

  // Autoplay carousel
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const getProductValue = (c: string) =>
    ({
      "Paper Scrap": "paper-scrap",
      "Plastic Scrap": "plastic-scrap",
      "Metal Scrap": "metal-scrap",
      "CFC Packaging": "cfc-packaging",
      "Thermal Packaging": "thermal-packaging",
      "Custom Packaging": "custom-packaging",
    }[c] || "other");

  const colors = {
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
  }[colorScheme];

  const visibleFeatures = expanded ? features : features.slice(0, 3);
  const hasMoreFeatures = features.length > 3;

  return (
    <div
      className={`group relative flex flex-col rounded-2xl border ${colors.border} bg-white overflow-hidden shadow-md hover:shadow-lg transition-all duration-300`}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-50 group/carousel">
        {/* Image Carousel with Autoplay */}
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`${title} - Image ${index + 1}`}
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
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all opacity-0 group-hover/carousel:opacity-100 z-20"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 text-slate-700" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all opacity-0 group-hover/carousel:opacity-100 z-20"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 text-slate-700" />
            </button>
          </>
        )}

        {/* Navigation Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1.5 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`transition-all rounded-full ${
                  index === currentImageIndex
                    ? 'bg-white w-6 h-1.5'
                    : 'bg-white/50 hover:bg-white/75 w-1.5 h-1.5'
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

