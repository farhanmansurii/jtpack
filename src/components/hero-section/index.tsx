'use client'
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { CheckCircle2, Leaf, Recycle, PackageSearch } from "lucide-react";
import React, { useState, useEffect } from "react";

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

const HERO_SLIDES: {
  videoSrc: string;
  posterSrc: string;
  badge: { variant: BadgeVariant; text: string };
  title: string;
  subtitle: string;
  features: { icon: string; label: string }[];
  cta: {
    primary: { text: string; href: string };
    secondary: { text: string; href: string };
  };
}[] = [
  {
    videoSrc: "/hero/hero-video.webp",
    posterSrc: "/hero/hero-video.webp",
    badge: { variant: "default", text: "Eco-Friendly" },
    title: "Sustainable Solutions for a Greener Tomorrow",
    subtitle: "Join us in making a positive impact on the environment",
    features: [
      { icon: "Leaf", label: "100% Organic Materials" },
      { icon: "PackageSearch", label: "Transparent Sourcing" },
      { icon: "Recycle", label: "Zero Waste Process" },
      { icon: "CheckCircle2", label: "Certified Green" },
    ],
    cta: {
      primary: { text: "Our Services", href: "#services" },
      secondary: { text: "Learn More", href: "#about" },
    },
  },
  {
    videoSrc: "/hero/hero-video-2.webp",
    posterSrc: "/hero/hero-video-2.webp",
    badge: { variant: "secondary", text: "Innovation" },
    title: "Transforming Ideas Into Reality",
    subtitle: "Cutting-edge technology meets environmental responsibility",
    features: [
      { icon: "CheckCircle2", label: "Award-Winning Design" },
      { icon: "Leaf", label: "Carbon Neutral" },
      { icon: "PackageSearch", label: "Quality Guaranteed" },
      { icon: "Recycle", label: "Circular Economy" },
    ],
    cta: {
      primary: { text: "Get Started", href: "#services" },
      secondary: { text: "Our Story", href: "#about" },
    },
  },
  {
    videoSrc: "/hero/hero-video-3.webp",
    posterSrc: "/hero/hero-video-3.webp",
    badge: { variant: "default", text: "Community" },
    title: "Building a Better Future Together",
    subtitle: "Empowering communities through sustainable practices",
    features: [
      { icon: "Recycle", label: "Local Partnerships" },
      { icon: "Leaf", label: "Renewable Energy" },
      { icon: "CheckCircle2", label: "Impact Verified" },
      { icon: "PackageSearch", label: "Full Traceability" },
    ],
    cta: {
      primary: { text: "Join Us", href: "#services" },
      secondary: { text: "Our Impact", href: "#about" },
    },
  },
];

type Props = {
  interval?: number;
};

export default function HeroSection({ interval = 10000 }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
        setIsTransitioning(false);
      }, 500);
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  const currentConfig = HERO_SLIDES[currentSlide];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Leaf":
        return Leaf;
      case "PackageSearch":
        return PackageSearch;
      case "Recycle":
        return Recycle;
      case "CheckCircle2":
        return CheckCircle2;
      default:
        return Leaf;
    }
  };

  return (
    <section id="home" className="relative h-[85vh] w-full overflow-hidden">
      {/* Background video with crossfade */}
      <div className="absolute inset-0 -z-10">
        {HERO_SLIDES.map((slide, index) => (
          <video
            key={index}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            autoPlay
            loop
            muted
            playsInline
            poster={slide.posterSrc}
            aria-hidden
          >
            <source src={slide.videoSrc} type="video/mp4" />
          </video>
        ))}
        {/* Overlays for readability */}
        <div className="pointer-events-none absolute inset-0 bg-black/60 mix-blend-multiply" />
      </div>

      {/* Foreground content */}
      <div className="flex flex-col justify-center h-full py-16 sm:py-20 lg:py-28">
        <Container className="flex flex-col justify-center h-full">
          <div
            className={`transition-opacity duration-500 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="mb-4 flex items-center gap-3">
              <Badge variant={currentConfig.badge.variant ?? "outline"}>
                {currentConfig.badge.text}
              </Badge>
              <div className="hidden h-px flex-1 bg-white/30 sm:block" />
            </div>

            <h1 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              {currentConfig.title}
            </h1>

            <p className="mt-4 max-w-2xl text-slate-200">
              {currentConfig.subtitle}
            </p>

            <ul className="mt-6 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
              {currentConfig.features.map((item) => {
                const IconComponent = getIcon(item.icon);
                return (
                  <li key={item.label} className="flex items-center gap-2 text-sm text-white">
                    <IconComponent className="h-4 w-4 text-accent" aria-hidden />
                    <span>{item.label}</span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg" variant="secondary" asChild>
                <Link href={currentConfig.cta.primary.href}>
                  {currentConfig.cta.primary.text}
                </Link>
              </Button>

              <Button size="lg" asChild>
                <Link href={currentConfig.cta.secondary.href}>
                  {currentConfig.cta.secondary.text}
                </Link>
              </Button>
            </div>
          </div>

          {/* Slide indicators */}
          <div className="mt-8 flex items-center gap-2">
            {HERO_SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsTransitioning(true);
                  setTimeout(() => {
                    setCurrentSlide(index);
                    setIsTransitioning(false);
                  }, 500);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "w-8 bg-white"
                    : "w-1.5 bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Spacer for visual balance on tall screens */}
          <div className="h-8 sm:h-10" />
        </Container>
      </div>
    </section>
  );
}
