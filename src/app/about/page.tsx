import Navbar from "@/components/navbar";
import FooterSection from "@/components/footer-section";
import AboutUsSection from "@/components/about-us-section";
import { Container } from "@/components/ui/container";

export default function AboutPage() {
  return (
    <div>
      <Navbar />
      <AboutUsSection />
      <section className="py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-2xl font-semibold">Our Mission</h3>
              <p className="mt-3 text-muted-foreground">
                We advance a circular economy by connecting high-quality scrap sourcing with
                world-class packaging manufacturing. Sustainability, traceability, and reliability
                are core to every engagement.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold">Why Choose Us</h3>
              <ul className="mt-3 list-disc pl-5 text-muted-foreground space-y-2">
                <li>Pan-India sourcing network and export-ready ops</li>
                <li>Premium CFC packaging with consistent performance</li>
                <li>Customer-first approach and fast turnaround</li>
              </ul>
            </div>
          </div>
        </Container>
      </section>
      <FooterSection />
    </div>
  );
}

