import React, { useMemo, memo } from "react";
import {
  Leaf,
  Package,
  Recycle,
  Factory,
  Boxes,
  FlaskConical,
  CheckCircle2,
  ArrowRight,
  Target,
  ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ABOUT_US_CONFIG } from "@/lib/config";
import Link from "next/link";
import { ProductImageCarousel } from "./product-image-carousel";
import { cn } from "@/lib/utils";

// Map string names from config to actual Lucide components
const ICON_MAP: Record<string, React.ElementType> = {
  Leaf,
  Package,
  Recycle,
  Factory,
  Boxes,
  FlaskConical,
  CheckCircle2,
};

function AboutUsSection() {
  const { badge, title, description, features, values } = ABOUT_US_CONFIG;

  const mappedFeatures = useMemo(() => {
    return features.map((f) => ({
      ...f,
      Icon: ICON_MAP[f.icon] || CheckCircle2,
    }));
  }, [features]);

  return (
    <section id="about" className="relative bg-background py-12 lg:py-24 overflow-hidden">
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* --- Left Column: Content --- */}
          <div className="lg:col-span-6 flex flex-col order-2 lg:order-1">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 mb-6">
                <Badge
                  variant="outline"
                  className="px-3 py-1 text-xs font-bold uppercase tracking-widest border-green-200 text-green-700 bg-green-50"
                >
                  {badge.text}
                </Badge>
                <span className="h-px w-8 bg-green-200" />
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6 leading-tight">
                {title}
              </h2>

              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p className="leading-relaxed">{description.first}</p>
                {description.second && <p className="leading-relaxed">{description.second}</p>}
              </div>
            </div>

            {/* Industrial Capabilities Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {mappedFeatures.map(({ label, Icon }, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-lg border border-border bg-card shadow-sm hover:border-primary/30 transition-colors"
                >
                  <div className="mt-0.5 text-primary">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-semibold text-foreground leading-tight">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-4">
              <Button
                asChild
                size="lg"
                className="h-12 px-8 font-bold shadow-md bg-primary text-white hover:bg-primary/90"
              >
                <Link href="/about">
                  Company Profile <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground px-4">
                <ShieldCheck className="w-4 h-4 text-primary" /> ISO Certified
              </div>
            </div>
          </div>

          {/* --- Right Column: Visuals (Fixed) --- */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative">
              {/* Abstract Background Blob */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-slate-100 to-slate-50 rounded-[2rem] -z-10 transform rotate-2" />

              {/* Image Container - No fixed aspect ratio, lets image size itself */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-white">
                <ProductImageCarousel />

                {/* Inner Shadow for depth */}
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* --- Bottom: Performance Metrics --- */}
        <div className="mt-24  border border-t border-dashed border-slate-200">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {values.map(({ stat, label }, idx) => (
              <div key={idx} className="flex flex-col  items-center text-center ">
                <p className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight mb-2">
                  {stat}
                </p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide max-w-[200px]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default memo(AboutUsSection);
