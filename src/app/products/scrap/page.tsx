import Navbar from "@/components/navbar";
import FooterSection from "@/components/footer-section";
import { Container } from "@/components/ui/container";
import ProductCard from "@/components/scrap-and-packaging-section/product-card";
import { SCRAP_AND_PACKAGING_CONFIG } from "@/lib/config";
import { FileText, Recycle, Shield } from "lucide-react";

function getIcon(name: string) {
  switch (name) {
    case "FileText":
      return <FileText className="h-4 w-4" />;
    case "Recycle":
      return <Recycle className="h-4 w-4" />;
    case "Shield":
      return <Shield className="h-4 w-4" />;
    default:
      return <Recycle className="h-4 w-4" />;
  }
}

export default function ScrapProductsPage() {
  const products = SCRAP_AND_PACKAGING_CONFIG.scrapMaterials.products.map((p) => ({ ...p, icon: getIcon(p.icon) }));
  return (
    <div>
      <Navbar />
      <section className="py-16 lg:py-24">
        <Container>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Recycling Division</h1>
          <p className="mt-3 text-muted-foreground">All materials in our scrap trading portfolio.</p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <ProductCard key={i} {...product} colorScheme="green" />
            ))}
          </div>
        </Container>
      </section>
      <FooterSection />
    </div>
  );
}

