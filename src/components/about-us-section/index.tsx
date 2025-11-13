import React, { JSX, memo } from "react";
import { Leaf, Package, Recycle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { ABOUT_US_CONFIG } from "@/lib/config";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ProductImageCarousel } from "./product-image-carousel";

function AboutUsSection(): JSX.Element {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-background pt-24 pb-16 sm:pt-28 sm:pb-24 lg:pt-32 lg:pb-28"
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
            <ProductImageCarousel />
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
export default memo(AboutUsSection);
