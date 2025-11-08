/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import React, { useMemo, memo } from "react";
import { DUAL_BUSINESS_CONFIG } from "@/lib/config";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QuoteRequest } from "@/components/quote-request";
import {
  Recycle,
  Package,
  Shield,
  Zap,
  Globe,
  Award,
  TrendingUp,
  Users,
  PackageSearch,
  Leaf,
  CheckCircle2,FileText
} from "lucide-react";

const iconMap = {
  Recycle,
  Package,
  Shield,
  Zap,
  Globe,
  Award,
  TrendingUp,
  Users,
  PackageSearch,
  Leaf,
  CheckCircle2,
  FileText,
} as const;

function getIconComponent(icon: string) {
  const Icon = (iconMap as Record<string, any>)[icon] ?? Package;
  return <Icon className="h-6 w-6" />;
}

function DualBusinessOverview() {
  const businesses = useMemo(() =>
    DUAL_BUSINESS_CONFIG.businesses.map((b) => ({
      ...b,
      icon: getIconComponent(b.icon),
    })), []
  );

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50 pt-28 pb-24 lg:pt-32 lg:pb-28"
    >


      <Container>
        {/* HEADER */}
        <div className="relative mx-auto mb-24 text-center max-w-3xl">
          <Badge className="mb-4 px-4 py-1 text-sm tracking-wide backdrop-blur border border-gray-200">
            {DUAL_BUSINESS_CONFIG.badge.text}
          </Badge>
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            {DUAL_BUSINESS_CONFIG.title}
          </h2>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed">
            {DUAL_BUSINESS_CONFIG.description}
          </p>
        </div>

        {/* GRID */}
        <div className="grid gap-10 lg:grid-cols-2 relative z-10">
          {businesses.map((b, i) => (
            <div
              key={i}
              className={`group relative flex flex-col overflow-hidden rounded-3xl border border-gray-200 shadow-md transition-all duration-500 hover:shadow-xl`}
              style={{
                background:
                  b.badge === "Polymer Manufacturing"
                    ? "linear-gradient(145deg, #ecfdf5 0%, #d1fae5 100%)"
                    : "linear-gradient(145deg, #eff6ff 0%, #dbeafe 100%)",
              }}
            >
              {/* Inner glow overlay */}
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] opacity-70 group-hover:opacity-50 transition-opacity duration-500" />

              <div className="relative z-10 p-10 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`p-3 rounded-xl ${
                      b.badge === "Polymer Manufacturing"
                        ? "bg-green-100 text-green-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {b.icon}
                  </div>
                  <Badge
                    variant="secondary"
                    className={`text-sm ${
                      b.badge === "Polymer Manufacturing"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {b.badge}
                  </Badge>
                </div>

                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  {b.title}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {b.description}
                </p>

                <ul className="grid sm:grid-cols-2 gap-2 mb-8">
                  {b.highlights.map((h: string, j: number) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-700">
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          b.badge === "Polymer Manufacturing"
                            ? "bg-green-500"
                            : "bg-blue-500"
                        }`}
                      />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="relative overflow-hidden rounded-2xl border border-white/40 shadow-inner aspect-video">
                  <img
                    src={b.image}
                    alt={b.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="relative mt-32">
          <div className="mx-auto max-w-4xl rounded-3xl border border-gray-200 bg-white/70 backdrop-blur-lg p-14 text-center shadow-lg transition-all hover:shadow-xl">
            <h3 className="text-3xl font-semibold text-gray-900 mb-3">
              {DUAL_BUSINESS_CONFIG.cta.title}
            </h3>
            <p className="text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              {DUAL_BUSINESS_CONFIG.cta.description}
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-5">
              {DUAL_BUSINESS_CONFIG.cta.buttons.map((button, i) => (
                <QuoteRequest
                  key={i}
                  product={button.variant === "green" ? "paper-scrap" : "cfc-packaging"}
                  colorScheme={button.variant as "green" | "blue"}
                >
                  <Button
                    size="lg"
                    className={`font-medium px-10 py-3.5 text-white rounded-xl shadow-md transition-all ${
                      button.variant === "green"
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {button.text}
                  </Button>
                </QuoteRequest>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default memo(DualBusinessOverview);
