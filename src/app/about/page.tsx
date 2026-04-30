"use client";

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
  Target,
  Lightbulb,
  ArrowRight,
  Check,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";

import Navbar from "@/components/navbar";
import FooterSection from "@/components/footer-section";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ABOUT_US_CONFIG } from "@/lib/config";
import { ProductImageCarousel } from "@/components/about-us-section/product-image-carousel";

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

const expo = [0.16, 1, 0.3, 1] as [number, number, number, number];

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5, ease: expo, delay },
});

export default function AboutPage() {
  const cfg = ABOUT_US_CONFIG as unknown as AboutConfig;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-neutral-200 bg-background pt-[90px]">
        <Container className="relative z-10 max-w-7xl py-0">
          <div className="grid min-h-[620px] grid-cols-1 lg:grid-cols-12">
            <div
              className="order-2 flex flex-col justify-between py-12 lg:order-1 lg:col-span-6 lg:border-r lg:border-neutral-200 lg:py-16 lg:pr-12"
            >
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className="rounded-md border-primary-200 bg-primary-50 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-primary-700"
                  >
                    {cfg.badge?.text}
                  </Badge>
                  <span className="h-px w-8 bg-primary-200" aria-hidden />
                </div>

                <h1 className="mb-5 max-w-[20ch] text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3rem]">
                  {cfg.title}
                </h1>

                <div className="max-w-[60ch]">
                  {cfg.subtitle && (
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
                      {cfg.subtitle}
                    </p>
                  )}
                  <p className="text-sm leading-7 text-neutral-600 sm:text-base sm:leading-8">
                    {cfg.description.first}
                  </p>
                </div>

                <ul className="mt-8 divide-y divide-neutral-100">
                  {cfg.features?.map(({ icon, label }, idx) => {
                    const Icon = IconMap[icon] ?? Boxes;
                    return (
                      <li key={idx} className="flex items-center gap-3 py-2.5">
                        <Icon className="h-4 w-4 flex-shrink-0 text-primary-600" />
                        <span className="text-sm font-medium text-foreground">{label}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {cfg.cta?.primary && (
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Button size="lg" className="h-10 px-6 font-semibold shadow-sm" asChild>
                    <a href={cfg.cta.primary.href}>
                      {cfg.cta.primary.label}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  {cfg.cta.secondary && (
                    <Button variant="outline" size="lg" className="h-10 px-6 font-medium" asChild>
                      <a href={cfg.cta.secondary.href}>{cfg.cta.secondary.label}</a>
                    </Button>
                  )}
                </div>
              )}
            </div>

            <div
              className="order-1 overflow-hidden border-b border-neutral-200 lg:order-2 lg:col-span-6 lg:border-b-0"
            >
              <div className="h-full min-h-[320px] bg-neutral-50 lg:min-h-full">
                <ProductImageCarousel fillHeight imageFit="contain" className="bg-white" />
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-200 py-7">
            <div className="grid grid-cols-1 divide-y divide-neutral-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {cfg.values?.map(({ stat, label }, idx) => (
                <div key={idx} className="py-4 sm:px-10 sm:py-0 first:pl-0 last:pr-0">
                  <p className="mb-0.5 text-base font-bold tracking-tight text-foreground">{stat}</p>
                  <p className="max-w-[20ch] text-xs leading-snug text-neutral-500">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Capabilities */}
      <section className="border-b border-neutral-200">
        <Container className="max-w-7xl py-14 lg:py-16">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <motion.p {...inView(0)} className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-neutral-400">
                Core Capabilities
              </motion.p>
              <motion.h2 {...inView(0.04)} className="mt-4 max-w-md text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
                Built for reliable supply, recovery, and dispatch.
              </motion.h2>
            </div>

            <div className="lg:col-span-7">
              <div>
                {cfg.description.second && (
                  <motion.p {...inView(0.06)} className="mb-8 max-w-[64ch] text-base leading-8 text-neutral-600">
                    {cfg.description.second}
                  </motion.p>
                )}

                <motion.ul
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
                  className="grid gap-3 sm:grid-cols-2"
                >
                  {cfg.features?.map(({ icon, label }, idx) => {
                    const Icon = IconMap[icon] ?? Boxes;
                    return (
                      <motion.li
                        key={idx}
                        variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: expo } } }}
                        className="flex items-start gap-3 rounded-lg border border-neutral-200 bg-card p-4"
                      >
                        <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-primary-50">
                          <Icon className="h-4 w-4 text-primary-600" />
                        </span>
                        <span className="text-sm font-semibold leading-6 text-foreground">{label}</span>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </div>

              {cfg.cta?.primary && (
                <motion.div {...inView(0.2)} className="mt-8 flex flex-wrap gap-3">
                  <Button size="lg" className="h-10 px-6 font-semibold shadow-sm" asChild>
                    <a href={cfg.cta.primary.href}>
                      {cfg.cta.primary.label}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                  {cfg.cta.secondary && (
                    <Button variant="outline" size="lg" className="h-10 px-6 font-medium" asChild>
                      <a href={cfg.cta.secondary.href}>{cfg.cta.secondary.label}</a>
                    </Button>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Mission and vision */}
      {(cfg.mission || cfg.vision) && (
        <section className="border-b border-neutral-200">
          <Container className="max-w-7xl py-0">
            <div className="grid divide-y divide-neutral-200 md:grid-cols-2 md:divide-x md:divide-y-0">
              {cfg.mission && (
                <motion.div {...inView(0)} className="py-12 pr-0 md:pr-12">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 rounded-md bg-primary-50 border border-primary-100 flex items-center justify-center flex-shrink-0">
                      <Target className="w-4 h-4 text-primary-600" />
                    </div>
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-neutral-400">Mission</p>
                  </div>
                  <p className="max-w-[62ch] text-base leading-8 text-foreground">{cfg.mission}</p>
                </motion.div>
              )}

              {cfg.vision && (
                <motion.div {...inView(0.08)} className="py-12 pl-0 md:pl-12">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 rounded-md bg-secondary-50 border border-secondary-100 flex items-center justify-center flex-shrink-0">
                      <Lightbulb className="w-4 h-4 text-secondary-600" />
                    </div>
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-neutral-400">Vision</p>
                  </div>
                  <p className="max-w-[62ch] text-base leading-8 text-foreground">{cfg.vision}</p>
                </motion.div>
              )}
            </div>
          </Container>
        </section>
      )}

      {/* Operational highlights */}
      {cfg.highlights?.length > 0 && (
        <section className="border-b border-neutral-200">
          <Container className="max-w-7xl py-14 lg:py-16">
            <motion.div {...inView(0)} className="mb-10 grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(18rem,28rem)] sm:items-end">
              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-neutral-400">Divisions</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Operational Excellence</h2>
              </div>
              <p className="text-sm leading-6 text-neutral-600">
                Focused operating streams for corrugation, polymer granules, and material recovery.
              </p>
            </motion.div>

            <div className="grid gap-px overflow-hidden rounded-lg border border-neutral-200 bg-neutral-200">
              {cfg.highlights.map((highlight, idx) => (
                <motion.div
                  key={idx}
                  {...inView(idx * 0.05)}
                  className="grid grid-cols-1 gap-5 bg-card p-5 sm:grid-cols-12 sm:gap-8 sm:p-6"
                >
                  <div className="sm:col-span-3 flex items-start gap-3">
                    <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-neutral-100 text-[0.6rem] font-bold tabular-nums text-neutral-500">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-base font-bold leading-snug text-foreground">{highlight.title}</h3>
                  </div>
                  <ul className="grid grid-cols-1 gap-x-8 gap-y-3 sm:col-span-9 sm:grid-cols-2">
                    {highlight.points?.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5 text-sm leading-6 text-neutral-600">
                        <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-primary-600" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA */}
      {cfg.cta?.primary && (
        <section className="bg-neutral-50">
          <Container className="max-w-7xl py-12">
            <motion.div
              {...inView(0)}
              className="flex flex-col gap-6 rounded-lg border border-neutral-200 bg-card p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between lg:p-8"
            >
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                  Ready to work with us?
                </h2>
                <p className="mt-1 text-sm text-neutral-500">
                  Bulk procurement, custom packaging, or scrap collection — we handle it all.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 flex-shrink-0">
                <Button size="lg" className="h-10 px-6 font-semibold shadow-sm" asChild>
                  <a href={cfg.cta.primary.href}>{cfg.cta.primary.label}</a>
                </Button>
                {cfg.cta.secondary && (
                  <Button variant="outline" size="lg" className="h-10 px-6 font-medium" asChild>
                    <a href={cfg.cta.secondary.href}>{cfg.cta.secondary.label}</a>
                  </Button>
                )}
              </div>
            </motion.div>
          </Container>
        </section>
      )}

      <FooterSection />
    </div>
  );
}
