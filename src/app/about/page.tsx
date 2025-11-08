import React from "react";
import {
  Leaf,
  Recycle,
  Package,
  Shield,
  Globe,
  Layers,
  FlaskConical,
  Factory,
  Truck,
  Boxes,
  type LucideIcon,
} from "lucide-react";

import Navbar from "@/components/navbar";
import FooterSection from "@/components/footer-section";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ABOUT_US_CONFIG } from "@/lib/config";

/** ---------------------------- Icons ---------------------------- */
const IconMap: Record<string, LucideIcon> = {
  Leaf,
  Recycle,
  Package,
  Shield,
  Globe,
  Layers,
  FlaskConical,
  Factory,
  Truck,
  Boxes,
};

/** ---------------------------- Types ---------------------------- */
type Feature = { icon: keyof typeof IconMap; label: string };
type ValueItem = { stat: string; label: string };
type Highlight = { title: string; points: string[] };

type AboutConfig = {
  badge: { variant?: "default" | "secondary" | "outline" | "destructive"; text: string };
  title: string;
  subtitle?: string;
  description: { first: string; second?: string };
  features: Feature[];
  highlights: Highlight[];
  values: ValueItem[];
  kpi?: { label: string; value: string };
  mission?: string;
  vision?: string;
  cta?: {
    primary: { href: string; label: string };
    secondary?: { href: string; label: string };
  };
};

/** ---------------------------- Page ---------------------------- */
export default function AboutPage() {
  const cfg = ABOUT_US_CONFIG as unknown as AboutConfig;

  // Title upgrade: tighter, more executive

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <div className="pt-20 sm:pt-24">
        <Container className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        {/* ---------------------------- Header ---------------------------- */}
        <section className="text-left items-start space-y-6 mb-6 sm:mb-10">
          {cfg.badge?.text ? (
            <Badge
              variant={cfg.badge.variant}
            >
              {cfg.badge.text}
            </Badge>
          ) : null}

          <h1 className="text-balance font-bold tracking-tight leading-tight text-[clamp(1.75rem,3vw+0.75rem,2.75rem)] sm:text-[clamp(2rem,2.5vw+1rem,3.25rem)] md:text-[clamp(2.25rem,2vw+1.25rem,3.5rem)]">
            {cfg.title}
          </h1>

          {cfg.subtitle ? (
            <p className="text-pretty text-base sm:text-lg text-muted-foreground text-left">
              {cfg.subtitle}
            </p>
          ) : null}
        </section>

        {/* ---------------------------- Overview ---------------------------- */}
        <section className="text-left mx-auto space-y-6 leading-relaxed mb-10 sm:mb-14">
          <p className="text-pretty text-base sm:text-lg text-muted-foreground text-left">{cfg.description.first}</p>
          {cfg.description.second ? (
            <p className="text-pretty text-base sm:text-lg text-muted-foreground text-left">{cfg.description.second}</p>
          ) : null}
        </section>

        {/* ---------------------------- Core Capabilities (uniform on mobile) ---------------------------- */}
        <section className="mb-12 sm:mb-16">
            <h2 className="text-balance text-2xl sm:text-3xl font-semibold text-left mb-6 leading-tight">Core Capabilities</h2>

          <div className="rounded-2xl border border-border/70 bg-card/50 p-4 sm:p-6">
            {/* Auto-fit yields balanced wrapping without orphans */}
            <div
              className="
                grid gap-4 sm:gap-6 md:gap-7
                [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]
                md:[grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]
              "
            >
              {cfg.features?.map(({ icon, label }, featureIndex) => (
                <Card
                  key={`${label}-${featureIndex}`}
                  className="h-full rounded-xl border border-border/60 bg-card/60 shadow-sm backdrop-blur-sm transition-all hover:shadow-md hover:border-border"
                >
                  <div className="flex h-full flex-col items-start justify-center gap-3 p-5 sm:p-6">
                    <div className="inline-flex items-center justify-center rounded-lg bg-muted/60 ring-1 ring-border/60 p-2.5">
                      {IconMap[icon] ? (
                        React.createElement(IconMap[icon], { className: "h-5 w-5", "aria-hidden": true, focusable: false })
                      ) : null}
                    </div>
                    <p className="text-left text-sm sm:text-base font-medium leading-tight text-foreground">
                      {label}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------- Divisions / Highlights ---------------------------- */}
        <section className="space-y-10 sm:space-y-12 mb-12 sm:mb-16">
            {cfg.highlights?.map(({ title, points }, highlightIndex) => (
            <div key={`${title}-${highlightIndex}`} className="pt-6 border-t border-border/70">
              <h3 className="text-xl sm:text-2xl font-semibold mb-5 leading-tight">{title}</h3>
              <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
                {points?.map((point, pointIndex) => (
                  <li key={`${highlightIndex}-${pointIndex}`} className="leading-relaxed text-pretty">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* ---------------------------- Mission / Vision ---------------------------- */}
        {(cfg.mission || cfg.vision) && (
          <section className="grid gap-7 sm:gap-9 md:grid-cols-2 mb-12 sm:mb-16">
            {cfg.mission ? (
              <Card className="rounded-2xl border border-border shadow-sm">
                <div className="p-6 sm:p-8 md:p-10 space-y-4">
                  <h3 className="text-xl font-semibold leading-tight">Our Mission</h3>
                  <p className="text-muted-foreground leading-relaxed text-pretty">{cfg.mission}</p>
                </div>
              </Card>
            ) : null}

            {cfg.vision ? (
              <Card className="rounded-2xl border border-border shadow-sm">
                <div className="p-6 sm:p-8 md:p-10 space-y-4">
                  <h3 className="text-xl font-semibold leading-tight">Our Vision</h3>
                  <p className="text-muted-foreground leading-relaxed text-pretty">{cfg.vision}</p>
                </div>
              </Card>
            ) : null}
          </section>
        )}

        {/* ---------------------------- Values ---------------------------- */}
        {cfg.values?.length ? (
          <section className="mb-12 sm:mb-16">
            <h2 className="text-balance text-2xl sm:text-3xl font-semibold text-center mb-8 sm:mb-10 leading-tight">Our Values</h2>

            <div className="grid gap-7 sm:gap-9 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
              {cfg.values.map(({ stat, label }, valueIndex) => (
                <Card
                  key={`${label}-${valueIndex}`}
                  className="rounded-2xl border border-border text-center shadow-sm transition-shadow motion-reduce:transition-none hover:shadow-md h-full"
                >
                  <div className="p-6 sm:p-8 md:p-10 space-y-3">
                    <p className="text-2xl sm:text-3xl font-bold">{stat}</p>
                    <p className="text-muted-foreground text-pretty">{label}</p>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        ) : null}

        {/* ---------------------------- KPI / Impact ---------------------------- */}
        {cfg.kpi ? (
          <section className="text-center mb-12 sm:mb-16">
            <h2 className="text-balance text-2xl sm:text-3xl font-semibold mb-4 leading-tight">Our Impact</h2>
            <p className="text-pretty text-base sm:text-lg font-medium text-muted-foreground">{cfg.kpi.label}</p>
            <p className="text-3xl sm:text-4xl font-semibold mt-1">{cfg.kpi.value}</p>
          </section>
        ) : null}

        {/* ---------------------------- CTA ---------------------------- */}
        {cfg.cta?.primary ? (
          <section className="text-center mb-4 sm:mb-6">
            <h2 className="text-balance text-2xl sm:text-3xl font-semibold mb-6 leading-tight">
              Partner with Us for Sustainable Growth
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
              <Button asChild>
                <a href={cfg.cta.primary.href}>{cfg.cta.primary.label}</a>
              </Button>

              {cfg.cta.secondary ? (
                <Button variant="outline" asChild>
                  <a href={cfg.cta.secondary.href}>{cfg.cta.secondary.label}</a>
                </Button>
              ) : null}
            </div>
          </section>
        ) : null}
        </Container>
      </div>

      <FooterSection />
    </div>
  );
}
