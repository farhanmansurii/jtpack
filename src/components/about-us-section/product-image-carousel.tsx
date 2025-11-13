"use client";

import React, { memo, useEffect, useMemo, useState, type JSX } from "react";
import Image from "next/image";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ABOUT_US_CONFIG, SCRAP_AND_PACKAGING_CONFIG } from "@/lib/config";

type ProductImageCarouselProps = {
  className?: string;
  kpiLabel?: string;
  kpiValue?: string;
};

type CarouselImage = {
  url: string;
  alt: string;
};

function ProductImageCarouselComponent({
  className,
  kpiLabel = ABOUT_US_CONFIG.kpi.label,
  kpiValue = ABOUT_US_CONFIG.kpi.value,
}: ProductImageCarouselProps): JSX.Element {
  const productImages = useMemo<CarouselImage[]>(() => buildCarouselImages(), []);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (productImages.length <= 1) return;

    const intervalId = window.setInterval(() => {
      setActiveIndex((previousIndex) => (previousIndex + 1) % productImages.length);
    }, 4000);

    return () => window.clearInterval(intervalId);
  }, [productImages.length]);

  if (productImages.length === 0) {
    return (
      <Card className={cn("relative overflow-hidden rounded-2xl border-0 p-0 shadow-lg bg-background", className)}>
        <div className="aspect-video bg-muted flex items-center justify-center rounded-t-2xl">
          <span className="text-sm text-muted-foreground">Product visuals coming soon</span>
        </div>
        {(kpiLabel || kpiValue) && (
          <div className="absolute top-4 right-4 bg-background/90 backdrop-blur rounded-lg p-3 shadow">
            {kpiLabel ? <p className="text-xs text-muted-foreground">{kpiLabel}</p> : null}
            {kpiValue ? <p className="text-lg font-semibold text-primary">{kpiValue}</p> : null}
          </div>
        )}
      </Card>
    );
  }

  return (
    <Card className={cn("relative overflow-hidden rounded-2xl border-0 p-0 shadow-lg bg-background", className)}>
      <div
        className="relative aspect-video bg-muted rounded-t-2xl overflow-hidden"
        role="group"
        aria-roledescription="carousel"
        aria-label="Product imagery"
      >
        {productImages.map(({ url, alt }, index) => (
          <Image
            key={url}
            src={url}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 480px, 100vw"
            priority={index === 0}
            className={`object-cover transition-opacity duration-700 ${index === activeIndex ? "opacity-100" : "opacity-0"}`}
          />
        ))}

        <span className="sr-only">
          Showing image {activeIndex + 1} of {productImages.length}
        </span>
      </div>
      {(kpiLabel || kpiValue) && (
        <div className="absolute top-4 right-4 bg-background/90 backdrop-blur rounded-lg p-3 shadow">
          {kpiLabel ? <p className="text-xs text-muted-foreground">{kpiLabel}</p> : null}
          {kpiValue ? <p className="text-lg font-semibold text-primary">{kpiValue}</p> : null}
        </div>
      )}
    </Card>
  );
}

function buildCarouselImages(): CarouselImage[] {
  const collectedImages: CarouselImage[] = [];
  const seenUrls = new Set<string>();

  const registerImage = (url: string | undefined, alt: string) => {
    if (!url || seenUrls.has(url)) return;
    seenUrls.add(url);
    collectedImages.push({ url, alt });
  };

  const collectFromProducts = (
    products: Array<{ title: string; image?: string | Array<{ url: string; description?: string }> }>
  ) => {
    products.forEach(({ title, image }) => {
      if (!image) return;

      if (Array.isArray(image)) {
        image.forEach((entry, index) => {
          if (typeof entry === "string") {
            registerImage(entry, `${title} visual ${index + 1}`);
            return;
          }
          registerImage(entry.url, entry.description || `${title} visual ${index + 1}`);
        });
        return;
      }

      registerImage(image, `${title} visual`);
    });
  };

  collectFromProducts(SCRAP_AND_PACKAGING_CONFIG.scrapMaterials.products);
  collectFromProducts(SCRAP_AND_PACKAGING_CONFIG.packagingProducts.products);

  return collectedImages;
}

export const ProductImageCarousel = memo(ProductImageCarouselComponent);

