import React, { JSX } from "react";
import { Separator } from "@/components/ui/separator";
import { Container } from "@/components/ui/container";
import { FileText, Recycle, Package, Shield, Globe, Snowflake, Layers } from "lucide-react";
import ProductCard from "./product-card";
import Link from "next/link";
import { SCRAP_AND_PACKAGING_CONFIG } from "@/lib/config";
import { Button } from "../ui/button";
import { SectionHeader } from "@/components/ui/section-header";

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

export default function ScrapAndPackagingSections(): JSX.Element {
  return (
    <section id="products" className="py-16 lg:py-24">
      <Container>
        <SectionHeader
          badge={{
            text: SCRAP_AND_PACKAGING_CONFIG.scrapMaterials.badge.text,
            className: SCRAP_AND_PACKAGING_CONFIG.scrapMaterials.badge.className,
          }}
          title={SCRAP_AND_PACKAGING_CONFIG.scrapMaterials.title}
          description={SCRAP_AND_PACKAGING_CONFIG.scrapMaterials.description ?? undefined}
          className="mb-12"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {scrapMaterials.slice(0, 3).map((product, index) => (
            <ProductCard key={index} {...product} colorScheme="green" />
          ))}
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link
            aria-label={`View all ${SCRAP_AND_PACKAGING_CONFIG.scrapMaterials.badge.text}`}
            href="/products?tab=recycling"
          >
            <Button className={`${colors.green.button} h-12  `}>
              <span>{SCRAP_AND_PACKAGING_CONFIG.scrapMaterials.cta.primary}</span>
            </Button>
          </Link>
          <Link
            aria-label={`Request bulk quote for ${SCRAP_AND_PACKAGING_CONFIG.scrapMaterials.badge.text}`}
            href="#contact"
          >
            <Button className={`${colors.green.buttonSecondary} h-12  `}>
              <span>{SCRAP_AND_PACKAGING_CONFIG.scrapMaterials.cta.secondary}</span>
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
