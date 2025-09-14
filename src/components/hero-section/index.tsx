import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { CheckCircle2, Leaf, Recycle, PackageSearch } from "lucide-react";
import React from "react";
import { HERO_CONFIG } from "@/lib/config";

type Props = { videoSrc?: string; posterSrc?: string };

export default function HeroSection({
  videoSrc = "/hero/hero-video.webp",
  posterSrc = "/hero/hero-video.webp",
}: Props) {
  return (
    <section id="home" className="relative h-[85vh] w-full overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0 -z-10">
        <video
          className="h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster={posterSrc}
          aria-hidden
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        {/* Overlays for readability */}
        <div className="pointer-events-none absolute inset-0 bg-primary/60 mix-blend-multiply" />
      </div>
      {/* Foreground content */}
      <div className="flex flex-col justify-center h-full py-16 sm:py-20 lg:py-28">
        <Container className="flex flex-col justify-center h-full">
          <div className="mb-4 flex items-center gap-3">
            <Badge variant={HERO_CONFIG.badge.variant}>{HERO_CONFIG.badge.text}</Badge>
            <div className="hidden h-px flex-1 bg-white/30 sm:block" />
          </div>
          <h1 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            {HERO_CONFIG.title}
          </h1>
          <p className="mt-4 max-w-2xl text-slate-200">{HERO_CONFIG.subtitle}</p>
          <ul className="mt-6 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
            {HERO_CONFIG.features.map((item) => {
              let IconComponent;
              switch (item.icon) {
                case "Leaf":
                  IconComponent = Leaf;
                  break;
                case "PackageSearch":
                  IconComponent = PackageSearch;
                  break;
                case "Recycle":
                  IconComponent = Recycle;
                  break;
                case "CheckCircle2":
                  IconComponent = CheckCircle2;
                  break;
                default:
                  IconComponent = Leaf;
              }
              return (
                <li key={item.label} className="flex items-center gap-2 text-sm text-white">
                  <IconComponent className="h-4 w-4 text-accent" aria-hidden />
                  <span>{item.label}</span>
                </li>
              );
            })}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button size={"lg"} variant={"secondary"}>
              {HERO_CONFIG.cta.primary.text}
            </Button>

            <Button size={"lg"}>{HERO_CONFIG.cta.secondary.text}</Button>
          </div>
          {/* Spacer for visual balance on tall screens */}
          <div className="h-8 sm:h-10" />
        </Container>
      </div>
    </section>
  );
}
