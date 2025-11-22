/* eslint-disable @next/next/no-img-element */
"use client";

import { notFound } from "next/navigation";
import Navbar from "@/components/navbar";
import FooterSection from "@/components/footer-section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { getCatalogProductBySlug, type CatalogDivision } from "@/lib/catalog";
import {
  ChevronLeft,
  ChevronRight,
  Box,
  Layers,
  ShieldCheck,
  Globe,
  ArrowRight,
  Factory,
  Tag,
} from "lucide-react";
import { useState, use, useCallback, useMemo } from "react";
import Link from "next/link";
import { QuoteRequest } from "@/components/quote-request";
import { cn } from "@/lib/utils";

// --- SEO Component ---
function ProductJSONLD({ product }: { product: any }) {
  // Helper to extract single image URL
  const getImageUrl = (imgData: any) => {
    if (Array.isArray(imgData)) {
      return imgData.length > 0
        ? typeof imgData[0] === "string"
          ? imgData[0]
          : imgData[0].url
        : "";
    }
    return imgData;
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.subtitle,
    image: getImageUrl(product.image),
    brand: { "@type": "Brand", name: "JTPack" },
    offers: { "@type": "Offer", availability: "https://schema.org/InStock" },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// --- Gallery Component ---
function ImageGallery({ images }: { images: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const normalizedImages = useMemo(() => {
    return (Array.isArray(images) ? images : [images]).map((img) =>
      typeof img === "string" ? { url: img, description: "Product View" } : img,
    );
  }, [images]);

  const nextImage = useCallback(
    () => setCurrentIndex((p) => (p + 1) % normalizedImages.length),
    [normalizedImages.length],
  );
  const prevImage = useCallback(
    () => setCurrentIndex((p) => (p - 1 + normalizedImages.length) % normalizedImages.length),
    [normalizedImages.length],
  );

  // Touch logic
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    if (touchStart - touchEnd > 50) nextImage();
    if (touchStart - touchEnd < -50) prevImage();
  };

  return (
    <div className="space-y-4">
      <div
        className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted border border-border shadow-sm select-none touch-pan-y"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <img
          src={normalizedImages[currentIndex].url}
          alt={normalizedImages[currentIndex].description}
          className="w-full h-full object-cover"
        />
        {normalizedImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur p-2 rounded-md border shadow-sm hover:bg-background transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur p-2 rounded-md border shadow-sm hover:bg-background transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
        {normalizedImages[currentIndex].description && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm px-4 py-3">
            <p className="text-white text-sm font-medium">
              {normalizedImages[currentIndex].description}
            </p>
          </div>
        )}
      </div>
      {normalizedImages.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {normalizedImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={cn(
                "aspect-square rounded-md overflow-hidden border-2 transition-all",
                idx === currentIndex
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-transparent opacity-60 hover:opacity-100",
              )}
            >
              <img src={img.url} className="w-full h-full object-cover" alt="thumbnail" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProductPage({
  params,
}: {
  params: Promise<{ category: CatalogDivision; slug: string }>;
}) {
  const { category, slug } = use(params);
  const product = getCatalogProductBySlug(category, slug);
  if (!product) return notFound();

  // Determine Theme based on category (Scrap = Green, Packaging = Blue)
  // Note: CatalogDivision type usually helps here. Assuming 'scrap-materials' vs 'packaging-products'
  const isRecycling = category === "scrap";
  const accentColor = isRecycling ? "text-green-600" : "text-blue-600";
  const badgeColor = isRecycling
    ? "bg-green-100 text-green-800 border-green-200"
    : "bg-blue-100 text-blue-800 border-blue-200";

  const images = Array.isArray(product.image) ? product.image : [product.image];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Container className="pt-[150px]">
        <ProductJSONLD product={product} />

        {/* Breadcrumbs */}
        <nav className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/products" className="hover:text-foreground transition-colors">
            Products
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link
            href={`/products/${category}`}
            className="hover:text-foreground transition-colors capitalize"
          >
            {category.replace("-", " ")}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium truncate max-w-[200px] sm:max-w-none">
            {product.title}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Gallery Section */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <ImageGallery images={images} />
          </div>

          {/* Content Section */}
          <div className="lg:col-span-7 flex flex-col h-full">
            <div className="mb-8 border-b border-border pb-8">
              <div
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider border mb-4",
                  badgeColor,
                )}
              >
                <Box className="w-3.5 h-3.5" />
                {isRecycling ? "Recycling Division" : "Manufacturing Division"}
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-3">
                {product.title}
              </h1>
              {product.subtitle && (
                <p className="text-lg text-muted-foreground leading-relaxed">{product.subtitle}</p>
              )}
            </div>

            {/* Product Grades / Variants */}
            {product.features?.length ? (
              <div className=" border-b border-border pb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Layers className={cn("w-5 h-5", accentColor)} />
                  <h3 className="text-sm font-bold text-foreground uppercase tracking-widest">
                    Available Grades & Variants
                  </h3>
                </div>
                <div className="bg-card border border-border rounded-xl overflow-hidden">
                  <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border">
                    {product.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="p-4 flex items-start gap-3 hover:bg-muted/30 transition-colors border-b border-border sm:border-b-0 last:border-0"
                      >
                        <div
                          className={cn(
                            "mt-1.5 w-2 h-2 rounded-full shrink-0",
                            isRecycling ? "bg-green-500" : "bg-blue-500",
                          )}
                        />
                        <span className="text-sm font-medium text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}

            {/* CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto ">
              <QuoteRequest product={product.title} colorScheme={isRecycling ? "green" : "blue"}>
                <Button
                  size="lg"
                  className={cn(
                    "w-full text-base font-bold h-12 shadow-md",
                    isRecycling
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-blue-600 hover:bg-blue-700 text-white",
                  )}
                >
                  Get Bulk Quote
                </Button>
              </QuoteRequest>
              <Link href="/contact" className="w-full">
                <Button variant="outline" size="lg" className="w-full text-base font-semibold h-12">
                  Talk to Expert
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Info Section */}
        <div className="mt-20 lg:mt-32 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-card rounded-xl border border-border p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Why choose our {product.title}?
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-muted-foreground text-lg">
                Our {product.title.toLowerCase()} meets rigorous industrial standards for
                {isRecycling
                  ? " purity, melt-flow consistency, and sustainability"
                  : " durability, stack-strength, and thermal protection"}
                . Whether you are looking for export-grade materials or domestic supply chain
                solutions, JTPack ensures quality assurance with every batch.
              </p>
            </div>
          </div>
          <div className="lg:col-span-1 space-y-4">
            <div
              className={cn(
                "rounded-xl p-6 border",
                isRecycling ? "bg-green-50/50 border-green-100" : "bg-blue-50/50 border-blue-100",
              )}
            >
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <ShieldCheck className={cn("w-5 h-5", accentColor)} />
                JTPack Promise
              </h3>
              <ul className="space-y-3">
                <li className="text-sm text-muted-foreground flex gap-2">
                  <div
                    className={cn(
                      "w-1.5 h-1.5 rounded-full mt-2 shrink-0",
                      isRecycling ? "bg-green-500" : "bg-blue-500",
                    )}
                  />
                  Verified Quality
                </li>
                <li className="text-sm text-muted-foreground flex gap-2">
                  <div
                    className={cn(
                      "w-1.5 h-1.5 rounded-full mt-2 shrink-0",
                      isRecycling ? "bg-green-500" : "bg-blue-500",
                    )}
                  />
                  Bulk Volume Support
                </li>
                <li className="text-sm text-muted-foreground flex gap-2">
                  <div
                    className={cn(
                      "w-1.5 h-1.5 rounded-full mt-2 shrink-0",
                      isRecycling ? "bg-green-500" : "bg-blue-500",
                    )}
                  />
                  Global Export Ready
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
      <FooterSection />
    </div>
  );
}
