"use client";

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
  CheckCircle2,
  Target,
  Lightbulb,
  TrendingUp,
  Users,
  Box,
  type LucideIcon,
} from "lucide-react";

import Navbar from "@/components/navbar";
import FooterSection from "@/components/footer-section";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ABOUT_US_CONFIG } from "@/lib/config";
import { ProductImageCarousel } from "@/components/about-us-section/product-image-carousel";
import { cn } from "@/lib/utils"; // Ensure you have this standard shadcn util

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

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/10">
      <Navbar />

      <Container isOnPage className="max-w-7xl mx-auto pt-[90px]">
        {/* ---------------------------- 1. Hero Header ---------------------------- */}
        <section className="max-w-4xl mx-auto text-center mb-16 sm:mb-20 space-y-6">
          {cfg.badge?.text && (
            <Badge
              variant="outline"
              className="bg-muted/50 border-primary/20 text-primary px-4 py-1.5 text-sm font-medium tracking-wide uppercase"
            >
              {cfg.badge.text}
            </Badge>
          )}

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
            {cfg.title}
          </h1>

          {cfg.subtitle && (
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {cfg.subtitle}
            </p>
          )}
        </section>

        {/* ---------------------------- 2. Visual Showcase ---------------------------- */}
        <section className="mb-20 sm:mb-24 relative">
          {/* Decorative elements */}
          <div className="absolute -inset-4 bg-gradient-to-b from-muted/50 to-transparent -z-10 rounded-[2.5rem] blur-xl opacity-50" />

          <div className="rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-card">
            <ProductImageCarousel />
          </div>
        </section>

        {/* ---------------------------- 3. Corporate Overview ---------------------------- */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-24 items-start">
          <div className="lg:col-span-5 space-y-8 sticky top-32">
            <h2 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
              <Factory className="w-8 h-8 text-muted-foreground/50" />
              Who We Are
            </h2>
            <div className="prose prose-lg text-muted-foreground leading-relaxed">
              <p>{cfg.description.first}</p>
              {cfg.description.second && <p>{cfg.description.second}</p>}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-muted/20 rounded-3xl border border-border/50 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Layers className="w-5 h-5 text-primary" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                  Core Capabilities
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cfg.features?.map(({ icon, label }, idx) => (
                  <div
                    key={idx}
                    className="group flex items-center gap-4 p-4 bg-card rounded-xl border border-border/60 hover:border-primary/30 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/5 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      {IconMap[icon] ? (
                        React.createElement(IconMap[icon], { className: "h-5 w-5" })
                      ) : (
                        <Boxes className="h-5 w-5" />
                      )}
                    </div>
                    <span className="font-medium text-foreground text-sm sm:text-base">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------- 4. Mission & Vision (Dual Grid) ---------------------------- */}
        {(cfg.mission || cfg.vision) && (
          <section className="mb-24">
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {cfg.mission && (
                <Card className="bg-gradient-to-br from-green-50/50 to-transparent dark:from-green-950/10 border-green-100/50 dark:border-green-900/50">
                  <CardContent className="p-8 sm:p-10 flex flex-col h-full">
                    <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center mb-6">
                      <Target className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-foreground">Our Mission</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed flex-grow">
                      {cfg.mission}
                    </p>
                  </CardContent>
                </Card>
              )}

              {cfg.vision && (
                <Card className="bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-950/10 border-blue-100/50 dark:border-blue-900/50">
                  <CardContent className="p-8 sm:p-10 flex flex-col h-full">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
                      <Lightbulb className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-foreground">Our Vision</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed flex-grow">
                      {cfg.vision}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </section>
        )}

        {/* ---------------------------- 5. Detailed Highlights ---------------------------- */}
        {cfg.highlights?.length > 0 && (
          <section className="mb-24">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">Operational Excellence</h2>
              <p className="text-muted-foreground">
                Our commitment to quality spans across every division of our business.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {cfg.highlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="space-y-6 p-8 rounded-2xl bg-muted/10 border border-border/50 hover:bg-muted/20 transition-colors"
                >
                  <div className="flex items-center gap-4 pb-4 border-b border-border/40">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
                      {idx + 1}
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{highlight.title}</h3>
                  </div>
                  <ul className="space-y-4">
                    {highlight.points?.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-3 text-muted-foreground">
                        <CheckCircle2 className="w-5 h-5 text-primary/60 shrink-0 mt-0.5" />
                        <span className="text-sm sm:text-base leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ---------------------------- 6. Values & Stats (Redesigned) ---------------------------- */}
        {cfg.values?.length > 0 && (
          <section className="mb-24">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-foreground">By The Numbers</h2>
            </div>

            <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border">
                {cfg.values.map((val, idx) => (
                  <div
                    key={idx}
                    className="group p-8 sm:p-10 flex flex-col items-center justify-center text-center hover:bg-muted/30 transition-colors duration-300"
                  >
                    {/* Decorative accent line */}
                    <div className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-3">
                      {val.stat}
                    </div>

                    <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
                      {val.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ---------------------------- 7. CTA ---------------------------- */}
        {cfg.cta?.primary && (
          <section className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Ready to Transform Your Supply Chain?
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="w-full sm:w-auto h-12 px-8 text-base font-bold shadow-lg"
                asChild
              >
                <a href={cfg.cta.primary.href}>{cfg.cta.primary.label}</a>
              </Button>

              {cfg.cta.secondary && (
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto h-12 px-8 text-base font-semibold"
                  asChild
                >
                  <a href={cfg.cta.secondary.href}>{cfg.cta.secondary.label}</a>
                </Button>
              )}
            </div>
          </section>
        )}
      </Container>

      <FooterSection />
    </div>
  );
}
