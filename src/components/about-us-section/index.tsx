import React, { JSX } from "react";
import { Leaf, Package, Recycle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { ABOUT_US_CONFIG } from "@/lib/config";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutUsSection(): JSX.Element {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-background py-16 sm:py-24 lg:py-28"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 gap-x-16 items-center">
          {/* Left Column */}
          <div className="lg:col-span-6">
            <SectionHeader
              badge={{
                text: ABOUT_US_CONFIG.badge.text,
                variant: ABOUT_US_CONFIG.badge.variant,
              }}
              title={ABOUT_US_CONFIG.title}
              variant="left"
              className="mb-6"
            />

            <p className="mt-6 text-muted-foreground max-w-prose">
              {ABOUT_US_CONFIG.description.first}
            </p>
            <p className="mt-4 text-muted-foreground max-w-prose">
              {ABOUT_US_CONFIG.description.second}
            </p>

            {/* Features */}
            <ul className="mt-8 space-y-4">
              {ABOUT_US_CONFIG.features.map(({ icon, label }) => {
                const IconComponent =
                  icon === "Recycle" ? Recycle : icon === "Package" ? Package : Leaf;
                return (
                  <li key={label} className="flex items-start gap-3">
                    <IconComponent className="h-5 w-5 text-primary mt-0.5" aria-hidden />
                    <span className="text-sm text-foreground">{label}</span>
                  </li>
                );
              })}
            </ul>
            <div className="mt-8">
              <Button asChild>
                <Link href="/about">Learn more</Link>
              </Button>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-6">
            <Card className="relative overflow-hidden rounded-2xl shadow-lg bg-gradient-to-br from-primary/10 via-background to-secondary/10">
              <div className="aspect-video bg-muted flex items-center justify-center rounded-t-2xl">
                <span className="text-sm text-muted-foreground">Company / Product Visual</span>
              </div>
              {/* KPI Floating Card */}
              <div className="absolute top-4 right-4 bg-background/90 backdrop-blur rounded-lg p-3 shadow">
                <p className="text-xs text-muted-foreground">{ABOUT_US_CONFIG.kpi.label}</p>
                <p className="text-lg font-semibold text-primary">{ABOUT_US_CONFIG.kpi.value}</p>
              </div>
            </Card>
          </div>
        </div>

        {/* Separator */}
        <Separator className="my-12" />

        {/* Values Row */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 text-center">
          {ABOUT_US_CONFIG.values.map(({ stat, label }) => (
            <div key={label}>
              <p className="text-2xl font-bold text-foreground">{stat}</p>
              <p className="mt-1 text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
