/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { CheckCircle, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { QuoteRequest } from "../quote-request";
import Link from "next/link";

type ColorScheme = "blue" | "green" | "purple" | "orange";

type ProductCardProps = {
  category: string;
  title: string;
  subtitle?: string;
  image: string;
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
      gradient: "from-blue-500/10 via-blue-400/5 to-transparent",
      badge: "bg-gradient-to-r from-blue-500 to-blue-600",
      checkIcon: "text-blue-600",
      button: "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800",
      glow: "group-hover:shadow-blue-500/20",
      border: "border-blue-200/50",
    },
    green: {
      gradient: "from-green-500/10 via-green-400/5 to-transparent",
      badge: "bg-gradient-to-r from-green-500 to-green-600",
      checkIcon: "text-green-600",
      button: "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800",
      glow: "group-hover:shadow-green-500/20",
      border: "border-green-200/50",
    },
    purple: {
      gradient: "from-purple-500/10 via-purple-400/5 to-transparent",
      badge: "bg-gradient-to-r from-purple-500 to-purple-600",
      checkIcon: "text-purple-600",
      button: "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800",
      glow: "group-hover:shadow-purple-500/20",
      border: "border-purple-200/50",
    },
    orange: {
      gradient: "from-orange-500/10 via-orange-400/5 to-transparent",
      badge: "bg-gradient-to-r from-orange-500 to-orange-600",
      checkIcon: "text-orange-600",
      button: "bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800",
      glow: "group-hover:shadow-orange-500/20",
      border: "border-orange-200/50",
    },
  }[colorScheme];

  const visibleFeatures = expanded ? features : features.slice(0, 3);
  const hasMoreFeatures = features.length > 3;

  return (
    <>
      <div
        className={`group relative flex flex-col rounded-3xl border ${colors.border} bg-white overflow-hidden shadow-lg hover:shadow-2xl ${colors.glow} transition-all duration-500 hover:-translate-y-2`}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

        <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
          />

          <div className="absolute top-4 left-4">
            <span
              className={`inline-flex items-center gap-2 ${colors.badge} text-white px-4 py-2 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm`}
            >
              {icon || <Sparkles className="w-3.5 h-3.5" />}
              {category}
            </span>
          </div>
        </div>

        <div className="relative flex flex-col flex-1 p-6">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900 mb-1 leading-tight group-hover:text-gray-800 transition-colors">
              {title}
            </h3>
            {subtitle && (
              <p className="text-sm text-gray-500 leading-relaxed">{subtitle}</p>
            )}
          </div>

          <div className="flex-1 mb-4">
            <div className={`space-y-2 transition-all duration-300 ${expanded ? 'max-h-96' : 'max-h-32'} overflow-hidden`}>
              {visibleFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2.5 opacity-0 animate-fadeIn"
                  style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'forwards' }}
                >
                  <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${colors.checkIcon}`} />
                  <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>

            {hasMoreFeatures && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="mt-3 text-xs font-medium text-gray-600 hover:text-gray-900 flex items-center gap-1.5 transition-all duration-200 hover:gap-2"
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

          {href && (
            <div className="mb-3">
              <Link href={href} className="inline-block">
                <span className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border ${colors.border} hover:border-gray-300 transition-colors`}>
                  View details
                </span>
              </Link>
            </div>
          )}

          <QuoteRequest product={getProductValue(category)} colorScheme={colorScheme as "green" | "blue"}>
            <button
              className={`w-full ${colors.button} text-white font-semibold rounded-xl py-3.5 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]`}
            >
              {ctaText}
            </button>
          </QuoteRequest>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}

