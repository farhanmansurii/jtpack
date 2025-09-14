import React, { JSX } from "react";
import { Separator } from "@/components/ui/separator";
import { Container } from "@/components/ui/container";
import { FileText, Recycle, Package, Shield, Globe, Snowflake, Layers } from "lucide-react";
import ProductCard from "./product-card";
import Link from "next/link";
import { SCRAP_AND_PACKAGING_CONFIG } from "@/lib/config";

type Product = {
  category: string;
  title: string;
  subtitle: string;
  image: string;
  features: string[];
  applications: string[];
  icon: JSX.Element;
  ctaText: string;
};

type ColorScheme = "blue" | "green";

type SectionGridProps = {
  id: string;
  heading: string;
  badge: string;
  description: string;
  items: Product[];
  viewAllLabel: string;
  bulkQuoteLabel: string;
  colorScheme?: ColorScheme;
};

// Helper function to get icon component
const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "FileText":
      return <FileText className="h-4 w-4" />;
    case "Recycle":
      return <Recycle className="h-4 w-4" />;
    case "Shield":
      return <Shield className="h-4 w-4" />;
    case "Package":
      return <Package className="h-4 w-4" />;
    case "Snowflake":
      return <Snowflake className="h-4 w-4" />;
    case "Globe":
      return <Globe className="h-4 w-4" />;
    default:
      return <Package className="h-4 w-4" />;
  }
};

const scrapMaterials: Product[] = SCRAP_AND_PACKAGING_CONFIG.scrapMaterials.products.map(
  (product) => ({
    ...product,
    icon: getIconComponent(product.icon),
  }),
);

const packagingProducts: Product[] = SCRAP_AND_PACKAGING_CONFIG.packagingProducts.products.map(
  (product) => ({
    ...product,
    icon: getIconComponent(product.icon),
  }),
);

const SectionGrid = ({
  id,
  heading,
  badge,
  description,
  items,
  viewAllLabel,
  bulkQuoteLabel,
  colorScheme = "blue",
}: SectionGridProps) => {
  const colors = {
    blue: {
      badge: "bg-blue-100 text-blue-800",
      button: "bg-blue-600 hover:bg-blue-700",
      buttonSecondary: "bg-white hover:bg-gray-50 text-gray-900 border border-gray-300",
    },
    green: {
      badge: "bg-green-100 text-green-800",
      button: "bg-green-600 hover:bg-green-700",
      buttonSecondary: "bg-white hover:bg-gray-50 text-gray-900 border border-gray-300",
    },
  };

  const colorClass = colors[colorScheme];

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="bg-gray-50 py-16 sm:py-24 lg:py-28"
    >
      <Container>
        <div className="text-center mb-12">
          <span
            className={`inline-flex items-center rounded-full ${colorClass.badge} px-3 py-1 text-xs font-medium`}
          >
            {badge}
          </span>
          <h2
            id={`${id}-heading`}
            className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
          >
            {heading}
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">{description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.slice(0, 3).map((product, index) => (
            <ProductCard key={index} {...product} colorScheme={colorScheme} />
          ))}
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <button
            aria-label={`View all ${badge.toLowerCase()}`}
            className={`${colorClass.button} text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200`}
          >
            {viewAllLabel}
          </button>
          <button
            aria-label={`Request bulk quote for ${badge.toLowerCase()}`}
            className={`${colorClass.buttonSecondary} px-8 py-3 rounded-lg font-medium transition-colors duration-200`}
          >
            {bulkQuoteLabel}
          </button>
        </div>
      </Container>
    </section>
  );
};

export default function ScrapAndPackagingSections(): JSX.Element {
  return (
    <section id="products" className="py-16 lg:py-24">
      <Container>
        <div className="text-center mb-12">
          <span
            className={`inline-flex items-center rounded-full ${SCRAP_AND_PACKAGING_CONFIG.scrapMaterials.badge.className} px-3 py-1 text-xs font-medium`}
          >
            {SCRAP_AND_PACKAGING_CONFIG.scrapMaterials.badge.text}
          </span>
          <h2
            id="scrap-materials-trading-heading"
            className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
          >
            {SCRAP_AND_PACKAGING_CONFIG.scrapMaterials.title}
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
            {SCRAP_AND_PACKAGING_CONFIG.scrapMaterials.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {scrapMaterials.slice(0, 3).map((product, index) => (
            <ProductCard key={index} {...product} colorScheme="green" />
          ))}
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link
            aria-label={`View all ${SCRAP_AND_PACKAGING_CONFIG.scrapMaterials.badge.text}`}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
            href="/products/scrap"
          >
            {SCRAP_AND_PACKAGING_CONFIG.scrapMaterials.cta.primary}
          </Link>
          <Link
            aria-label={`Request bulk quote for ${SCRAP_AND_PACKAGING_CONFIG.scrapMaterials.badge.text}`}
            className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 px-8 py-3 rounded-lg font-medium transition-colors duration-200"
            href="/contact"
          >
            {SCRAP_AND_PACKAGING_CONFIG.scrapMaterials.cta.secondary}
          </Link>
        </div>
      </Container>

      <Separator />
      <Container>
        <div className="text-center mb-12">
          <span className={`inline-flex items-center rounded-full ${SCRAP_AND_PACKAGING_CONFIG.packagingProducts.badge.className} px-3 py-1 text-xs font-medium`}>
            {SCRAP_AND_PACKAGING_CONFIG.packagingProducts.badge.text}
          </span>
          <h2
            id="packaging-manufacturing-heading"
            className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
          >
            {SCRAP_AND_PACKAGING_CONFIG.packagingProducts.title}
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
            {SCRAP_AND_PACKAGING_CONFIG.packagingProducts.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {packagingProducts.slice(0, 3).map((product, index) => (
            <ProductCard key={index} {...product} colorScheme="blue" />
          ))}
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link
            aria-label={`View all ${SCRAP_AND_PACKAGING_CONFIG.packagingProducts.badge.text}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
            href="/products/packaging"
          >
            {SCRAP_AND_PACKAGING_CONFIG.packagingProducts.cta.primary}
          </Link>
          <Link
            aria-label={`Request bulk quote for ${SCRAP_AND_PACKAGING_CONFIG.packagingProducts.badge.text}`}
            className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 px-8 py-3 rounded-lg font-medium transition-colors duration-200"
            href="/contact"
          >
            {SCRAP_AND_PACKAGING_CONFIG.packagingProducts.cta.secondary}
          </Link>
        </div>
      </Container>
    </section>
  );
}
