import Navbar from "@/components/navbar";
import FooterSection from "@/components/footer-section";
import { Container } from "@/components/ui/container";
import ProductCard from "@/components/scrap-and-packaging-section/product-card";
import { SCRAP_AND_PACKAGING_CONFIG } from "@/lib/config";
import { FileText, Recycle, Shield, Package, Snowflake, Globe } from "lucide-react";

function getIcon(name: string) {
  switch (name) {
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
}

export default function ProductsPage() {
  const scrap = SCRAP_AND_PACKAGING_CONFIG.scrapMaterials.products.map((p) => ({ ...p, icon: getIcon(p.icon) }));
  const packaging = SCRAP_AND_PACKAGING_CONFIG.packagingProducts.products.map((p) => ({ ...p, icon: getIcon(p.icon) }));
  return (
    <div>
      <Navbar />
      <section className="py-16 lg:py-24">
        <Container>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">All Products</h1>
          <p className="mt-3 text-muted-foreground">Browse our complete catalog across Recycling and Packaging.</p>

          <div className="mt-10">
            <h2 className="text-2xl font-semibold">Recycling Division</h2>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {scrap.map((product, i) => (
                <ProductCard key={`s-${i}`} {...product} colorScheme="green" />
              ))}
            </div>
          </div>

          <div className="mt-14">
            <h2 className="text-2xl font-semibold">Packaging Division</h2>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {packaging.map((product, i) => (
                <ProductCard key={`p-${i}`} {...product} colorScheme="blue" />
              ))}
            </div>
          </div>
        </Container>
      </section>
      <FooterSection />
    </div>
  );
}

