/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import React, { useMemo, memo } from "react";
import { DUAL_BUSINESS_CONFIG } from "@/lib/config";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QuoteRequest } from "@/components/quote-request";
import { cn } from "@/lib/utils";
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
  CheckCircle2,
  FileText,
  ArrowRight,
  Factory,
  Layers,
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
  return <Icon className="h-5 w-5" />;
}

function DualBusinessOverview() {
  const businesses = useMemo(
    () =>
      DUAL_BUSINESS_CONFIG.businesses.map((b) => ({
        ...b,
        icon: getIconComponent(b.icon),
        // Helper: Identify theme based on content
        isGreen: b.badge.includes("Polymer") || b.title.includes("Granule"),
      })),
    [],
  );

  return (
    <section id="services" className="relative py-24 lg:py-32 bg-background border-t border-border">
      <Container>
        {/* --- Section Header --- */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 px-3 py-1 text-xs font-bold uppercase tracking-widest border-primary/20 text-primary bg-primary/5"
          >
            {DUAL_BUSINESS_CONFIG.badge.text}
          </Badge>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6">
            {DUAL_BUSINESS_CONFIG.title}
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed">
            {DUAL_BUSINESS_CONFIG.description}
          </p>
        </div>

        {/* --- Industrial Cards Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {businesses.map((b, i) => (
            <div
              key={i}
              className={cn(
                "group relative flex flex-col rounded-xl border transition-all duration-300 hover:shadow-lg bg-gradient-to-br",
                // Theme-specific borders and gradient backgrounds
                b.isGreen
                  ? "border-green-200/60 hover:border-green-300"
                  : "border-blue-200/60 hover:border-blue-300",
                b.gradient, // Applies: from-green-500/10 via-white to-green-500/5
              )}
            >
              <div className="p-6 sm:p-8 flex flex-col h-full">
                {/* Card Header: Icon + Badge */}
                <div className="flex justify-between items-start mb-6">
                  <div
                    className={cn(
                      "p-3 rounded-lg border bg-white shadow-sm",
                      b.isGreen
                        ? "border-green-100 text-green-600"
                        : "border-blue-100 text-blue-600",
                    )}
                  >
                    {b.icon}
                  </div>
                  <span
                    className={cn(
                      "px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border bg-white/80 backdrop-blur",
                      b.isGreen
                        ? "text-green-700 border-green-200"
                        : "text-blue-700 border-blue-200",
                    )}
                  >
                    {b.badge}
                  </span>
                </div>

                {/* Text Content */}
                <h3 className="text-2xl font-bold text-foreground mb-3">{b.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-8">{b.description}</p>

                {/* "Spec Sheet" Highlights Box */}
                <div className="bg-white/60 border border-black/5 rounded-lg p-5 mb-8 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Layers className="w-4 h-4 text-muted-foreground/70" />
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                      Core Capabilities
                    </span>
                  </div>
                  <ul className="space-y-2.5">
                    {b.highlights.map((h: string, j: number) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 text-sm font-medium text-foreground/80"
                      >
                        <div
                          className={cn(
                            "mt-1.5 w-1.5 h-1.5 rounded-full shrink-0",
                            b.isGreen ? "bg-green-500" : "bg-blue-500",
                          )}
                        />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Image Viewport (Engineering Style) */}
                <div className="mt-auto rounded-lg border border-border overflow-hidden relative aspect-video bg-muted shadow-inner">
                  <img
                    src={b.image}
                    alt={b.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Tech Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-2 left-2 px-1.5 py-0.5 bg-black/70 text-white text-[9px] font-mono rounded uppercase backdrop-blur-md">
                    Division: {b.isGreen ? "01_RECYCLE" : "02_MFG"}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- Command Bar CTA --- */}
        <div className="mt-20 lg:mt-24">
          <div className="relative rounded-xl bg-slate-50  p-8 sm:p-10 shadow-xl shadow-slate-200 overflow-hidden">
            {/* Abstract Tech Background */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left max-w-2xl">
                <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                  {DUAL_BUSINESS_CONFIG.cta.title}
                </h3>
                <p className="text-slate-500 text-lg">{DUAL_BUSINESS_CONFIG.cta.description}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                {DUAL_BUSINESS_CONFIG.cta.buttons.map((button, i) => (
                  <QuoteRequest
                    key={i}
                    product={
                      button.variant === "green" ? "Recycling Services" : "Packaging Solutions"
                    }
                    colorScheme={button.variant as "green" | "blue"}
                  >
                    <Button
                      size="lg"
                      className={cn(
                        "w-full sm:w-auto h-12 px-6 font-bold shadow-lg border transition-all",
                        button.variant === "green"
                          ? "bg-emerald-600 hover:bg-emerald-700 border-emerald-500 text-white"
                          : "bg-white text-slate-900 hover:bg-slate-100 border-white",
                      )}
                    >
                      {button.text}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </QuoteRequest>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default memo(DualBusinessOverview);
