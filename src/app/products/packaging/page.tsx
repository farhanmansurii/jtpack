import Navbar from "@/components/navbar";
import FooterSection from "@/components/footer-section";
import { Container } from "@/components/ui/container";
import ProductCard from "@/components/scrap-and-packaging-section/product-card";
import { SCRAP_AND_PACKAGING_CONFIG } from "@/lib/config";
import { Package, Snowflake, Globe } from "lucide-react";

function getIcon(name: string) {
  switch (name) {
    case "Package":
      return <Package className="h-4 w-4" />;
    case "Snowflake":
      return <Snowflake className="h-4 w-4" />;
    case "Globe":
      return <Globe className="h-4 w-4" />;
    default:
      return <Package className="h-4 w-4" />;
  }
}

export default function PackagingProductsPage() {
  const products = SCRAP_AND_PACKAGING_CONFIG.packagingProducts.products.map((p) => ({ ...p, icon: getIcon(p.icon) }));
  return (
    <div>
      <Navbar />
      <section className="py-16 lg:py-24">
        <Container>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Packaging Division</h1>
          <p className="mt-3 text-muted-foreground">All products in our packaging catalog.</p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <ProductCard key={i} {...product} colorScheme="blue" />
            ))}
          </div>
        </Container>
      </section>
      <FooterSection />
    </div>
  );
}

