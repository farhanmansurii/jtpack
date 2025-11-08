/* eslint-disable @next/next/no-img-element */
"use client";
import { notFound } from "next/navigation";
import Navbar from "@/components/navbar";
import FooterSection from "@/components/footer-section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { getCatalogProductBySlug, type CatalogDivision } from "@/lib/catalog";
import { type ProductImage } from "@/lib/config";
import { ChevronLeft, ChevronRight, CheckCircle2, Package, Zap } from "lucide-react";
import { useState, use } from "react";
import Link from "next/link";

interface PageParams {
  params: Promise<{ category: CatalogDivision; slug: string }>;
}

function ProductJSONLD({
  product,
}: {
  product: { title: string; subtitle?: string; image: string | ProductImage[] };
}) {
  // Extract first image URL for JSON-LD
  let imageUrl: string;
  if (Array.isArray(product.image)) {
    // If it's an array, check if it's ProductImage[] or string[]
    if (product.image.length > 0) {
      imageUrl = typeof product.image[0] === "string" ? product.image[0] : product.image[0].url;
    } else {
      imageUrl = "";
    }
  } else {
    imageUrl = product.image;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.subtitle,
    image: imageUrl,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function ImageGallery({ images }: { images: ProductImage[] | string[] | string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const normalizedImages: ProductImage[] = (Array.isArray(images) ? images : [images]).map(
    (img) => {
      if (typeof img === "string") {
        return { url: img, description: `Product image` };
      }
      return img;
    },
  );

  const nextImage = () => {
    setCurrentIndex((prev: number) => (prev + 1) % normalizedImages.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prev: number) => (prev - 1 + normalizedImages.length) % normalizedImages.length,
    );
  };

  const currentImage = normalizedImages[currentIndex];

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 shadow-2xl group">
        <img
          src={currentImage.url}
          alt={currentImage.description}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {normalizedImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm p-3 rounded-full shadow-xl hover:bg-white hover:scale-110 transition-all opacity-0 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-slate-700" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm p-3 rounded-full shadow-xl hover:bg-white hover:scale-110 transition-all opacity-0 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-slate-700" />
            </button>

            <div
              className={`absolute left-1/2 -translate-x-1/2 flex space-x-2 z-10 px-4 py-2 rounded-full bg-gradient-to-t from-black/60 via-black/40 to-black/20 ${
                currentImage.description && currentImage.description !== "Product image"
                  ? "bottom-10"
                  : "bottom-6"
              }`}
            >
              {normalizedImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`transition-all focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 ${
                    index === currentIndex
                      ? "bg-white w-8 h-2.5"
                      : "bg-white/60 border border-slate-200 hover:bg-white/90 w-2.5 h-2.5"
                  } rounded-full`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Image Description Caption */}
        {currentImage.description && currentImage.description !== "Product image" && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent px-4 py-3 text-white text-sm z-0">
            {currentImage.description}
          </div>
        )}
      </div>

      {/* Thumbnail Grid */}
      {normalizedImages.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {normalizedImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${
                index === currentIndex
                  ? "border-primary shadow-lg scale-105"
                  : "border-slate-200 hover:border-primary/50 opacity-60 hover:opacity-100"
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <img
                src={image.url}
                alt={image.description}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProductPage({ params }: PageParams) {
  const { category, slug } = use(params);
  const product = getCatalogProductBySlug(category, slug);
  if (!product) return notFound();

  // Support both single image (string) and array of images (ProductImage[] or string[])
  // Preserve the ProductImage[] type if it's already an array of ProductImage
  const images: ProductImage[] | string[] | string = Array.isArray(product.image)
    ? product.image
    : product.image;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50/50">
      <Navbar />
      <main className="pt-24 pb-16 lg:pt-28 lg:pb-24">
        <Container>
          <ProductJSONLD product={product} />

          {/* Breadcrumb */}
          <nav
            className="flex items-center space-x-2 text-sm text-muted-foreground mb-8 lg:mb-12"
            aria-label="Breadcrumb"
          >
            <Link href="/products" className="hover:text-primary transition-colors">
              Products
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link
              href={`/products/${category}`}
              className="hover:text-primary transition-colors capitalize"
            >
              {category}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium">{product.title}</span>
          </nav>

          <article className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Left Column - Image Gallery */}
            <div className="order-2 lg:order-1">
              <ImageGallery images={images} />
            </div>

            {/* Right Column - Product Details */}
            <div className="order-1 lg:order-2 space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Package className="w-4 h-4 mr-2" />
                Premium Quality
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-4">
                <h1 className="text-2xl sm:text-4xl font-bold text-foreground leading-tight tracking-tight">
                  {product.title}
                </h1>
                {product.subtitle && (
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {product.subtitle}
                  </p>
                )}
              </div>

              {/* Features Section */}
              {product.features?.length ? (
                <div className="bg-gradient-to-br from-slate-50 to-primary/5 rounded-2xl p-4 border border-slate-200 shadow-sm">
                  <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-primary" />
                    What We Offer
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start space-x-3 bg-white rounded-xl p-2 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-foreground font-medium text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="#contact" className="flex-1">
                  <Button className="w-full text-base font-semibold shadow-lg hover:shadow-xl transition-all">
                    Request a quote
                  </Button>
                </Link>
                <Link href="/contact" className="flex-1">
                  <Button
                    variant="outline"
                    className="w-full text-base font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
          </article>

          {/* Additional Product Information */}
          <div className="mt-20 lg:mt-32 bg-white rounded-2xl shadow-lg border border-slate-200 p-8 lg:p-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              About This Product
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-muted-foreground leading-relaxed text-lg">
                Our {product.title.toLowerCase()} represents the pinnacle of quality and innovation
                in the packaging industry. Designed with precision and built to last, this solution
                meets the demanding requirements of modern logistics and supply chain operations.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg mt-4">
                With years of expertise in the import-export sector, we ensure that every product
                meets international standards and exceeds customer expectations. Our commitment to
                sustainability and excellence drives everything we do.
              </p>
            </div>
          </div>
        </Container>
      </main>
      <FooterSection />
    </div>
  );
}
