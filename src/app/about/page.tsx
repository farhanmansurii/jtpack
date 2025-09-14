import Navbar from "@/components/navbar";
import FooterSection from "@/components/footer-section";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Separator as ShadcnSeparator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ABOUT_US_CONFIG } from "@/lib/config";
import { Leaf, Recycle, Package, Shield, Globe, Layers } from "lucide-react";

const Separator = () => <div className={`my-10`} />;

export default function AboutPage() {
  return (
    <div>
      <Navbar />

      {/* Page header */}
      <section
        aria-labelledby="about-page-heading"
        className="relative overflow-hidden  bg-gradient-to-b from-muted/40 to-background"
      >
        <Container className="py-12 mt-20 sm:py-16 lg:py-20 text-center">
          <Badge variant={ABOUT_US_CONFIG.badge.variant} className="rounded-full px-3 py-1 text-xs">
            {ABOUT_US_CONFIG.badge.text}
          </Badge>
          <h1
            id="about-page-heading"
            className="mt-4 max-w-2xl mx-auto text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            {ABOUT_US_CONFIG.title}
          </h1>
          <p className="mt-5 max-w-3xl mx-auto text-base sm:text-lg text-muted-foreground">
            {ABOUT_US_CONFIG.description.first}
          </p>
          <p className="mt-3 max-w-3xl mx-auto text-base sm:text-lg text-muted-foreground">
            {ABOUT_US_CONFIG.description.second}
          </p>
        </Container>
      </section>

      <Separator />

      {/* Stats from config */}
      <section aria-label="company-stats">
        <Container className="pb-6">
          <Card className="bg-card/80">
            <CardContent className="py-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                {ABOUT_US_CONFIG.values.map(({ stat, label }) => (
                  <div key={label}>
                    <p className="text-3xl font-semibold text-foreground">{stat}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </Container>
      </section>

      <Separator />

      {/* Our Story & Purpose */}
      <section aria-labelledby="story-purpose">
        <Container className="py-4">
          <h2 id="story-purpose" className="text-2xl sm:text-3xl font-bold tracking-tight">
            Our Story & Purpose
          </h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>
              J T PACK PRIVATE LIMITED was founded with a simple conviction: responsible recycling
              and high‑performance packaging can coexist to make supply chains cleaner, safer, and
              more resilient. What started as a focused effort to streamline scrap sourcing has
              grown into an integrated operation spanning bulk recycling and advanced Controlled
              Foam Core (CFC) packaging.
            </p>
            <p>
              Today, we partner with manufacturers, exporters, logistics providers, and MSMEs to
              reduce waste at the source, elevate material recovery, and ship products in packaging
              engineered for durability and thermal performance—without compromising sustainability.
            </p>
            <blockquote className="border-l-2 pl-4 italic text-foreground">
              “We exist to make circularity practical—grounded in data, quality, and operational
              discipline.”
            </blockquote>
          </div>
        </Container>
      </section>

      <Separator />

      {/* Recycling Operations */}
      <section aria-labelledby="recycling-operations">
        <Container className="py-4">
          <div className="flex items-center gap-3">
            <Recycle className="h-5 w-5 text-green-600" aria-hidden />
            <h2 id="recycling-operations" className="text-2xl sm:text-3xl font-bold tracking-tight">
              End‑to‑End Recycling Operations
            </h2>
          </div>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>
              We trade and process high‑quality scrap materials—including paper, plastic, and metal—
              with standardized intake, grading, and documentation. Our sourcing network spans
              pan‑India suppliers, allowing reliable volume aggregation with consistent quality.
            </p>
            <p>
              Materials are inspected against category‑specific criteria such as moisture content,
              contamination thresholds, fiber integrity, resin type, and alloy composition. We apply
              traceable lot IDs and maintain movement records to support compliance and
              auditability.
            </p>
            <ul className="mt-2 grid gap-2">
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-green-500" />
                <span>
                  Paper: kraft waste, OCC/cardboard, newsprint, mixed paper—sorted and baled for
                  domestic use and export.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-green-500" />
                <span>
                  Plastic: LD/LLD and HD grades, FBBD boards, post‑shred streams—segregated,
                  cleaned, and prepared for reprocessing.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-green-500" />
                <span>
                  Metal: LCC and common aluminum grades—controlled sorting and packaging for
                  smelters and rolling mills.
                </span>
              </li>
            </ul>
            <p>
              Our logistics workflows are designed for low dwell time: optimized pickups, route
              planning, and yard operations reduce turnaround and loading delays while improving
              cost efficiency.
            </p>
          </div>
        </Container>
      </section>

      <Separator />

      {/* CFC Packaging Manufacturing */}
      <section aria-labelledby="cfc-packaging">
        <Container className="py-4">
          <div className="flex items-center gap-3">
            <Package className="h-5 w-5 text-blue-600" aria-hidden />
            <h2 id="cfc-packaging" className="text-2xl sm:text-3xl font-bold tracking-tight">
              CFC Packaging Manufacturing
            </h2>
          </div>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>
              We manufacture Controlled Foam Core (CFC) boxes engineered for insulation, shock
              resistance, and dimensional stability. Each box is designed for repeatable performance
              in demanding lanes—from pharma cold‑chain to electronics.
            </p>
            <p>
              Our builds balance thermal performance with strength‑to‑weight ratios, offering
              typical thermal R‑values in the R3.2–R5.0 range depending on configuration, wall
              thickness, and liner materials. We support custom sizes, closures, and interior
              dunnage.
            </p>
            <ul className="mt-2 grid gap-2">
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-500" />
                <span>
                  Precision‑cut cores and consistent density for predictable thermal profiles.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-500" />
                <span>Shock‑absorbing construction to protect sensitive payloads.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-500" />
                <span>
                  Export‑grade finishing with labeling, documentation, and lot traceability.
                </span>
              </li>
            </ul>
          </div>
        </Container>
      </section>

      <Separator />

      {/* Sustainability & Compliance */}
      <section aria-labelledby="sustainability">
        <Container className="py-4">
          <div className="flex items-center gap-3">
            <Leaf className="h-5 w-5 text-emerald-600" aria-hidden />
            <h2 id="sustainability" className="text-2xl sm:text-3xl font-bold tracking-tight">
              Sustainability, Quality & Compliance
            </h2>
          </div>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            <Card>
              <CardContent className="pt-6 space-y-3 text-muted-foreground">
                <p className="text-foreground font-medium flex items-center gap-2">
                  <Shield className="h-4 w-4 text-emerald-600" /> Compliance Foundations
                </p>
                <p>
                  We operate with audit‑ready documentation, lot traceability, and standardized SOPs
                  across intake, storage, and dispatch. Customer‑specific compliance (incl. export
                  paperwork) is supported as needed.
                </p>
                <p>
                  Our quality philosophy is simple: measure, record, and continuously improve across
                  yield, rejection, and turnaround metrics.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 space-y-3 text-muted-foreground">
                <p className="text-foreground font-medium flex items-center gap-2">
                  <Globe className="h-4 w-4 text-emerald-600" /> Circularity in Practice
                </p>
                <p>
                  We increase recycled input where feasible, reduce packaging weight without
                  sacrificing performance, and design for reuse. Our teams collaborate with
                  customers to align material choices with end‑of‑life recovery.
                </p>
                <p>
                  Continuous training ensures safety, segregation discipline, and environment‑first
                  operating behavior at the yard and on the floor.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      <Separator />

      {/* Reach, Capacity & Partnerships */}
      <section aria-labelledby="reach-capacity">
        <Container className="py-4">
          <div className="flex items-center gap-3">
            <Layers className="h-5 w-5 text-indigo-600" aria-hidden />
            <h2 id="reach-capacity" className="text-2xl sm:text-3xl font-bold tracking-tight">
              Pan‑India Reach, Capacity & Partnerships
            </h2>
          </div>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>
              Our network enables consistent sourcing and distribution across major industrial hubs
              in India. We maintain flexible capacity buffers to absorb seasonal spikes, supported
              by predictable loading, documentation, and dispatch windows.
            </p>
            <p>
              We work with vendors and customers on long‑term contracts, standardizing specs and
              packaging to minimize variability. For export lanes, we handle labeling,
              palletization, and paperwork to reduce friction and delays.
            </p>
            <p>
              As a partner, expect transparent communication, clear SLAs, and measurable performance
              against agreed KPIs.
            </p>
          </div>
        </Container>
      </section>

      <Separator />

      {/* Who We Serve */}
      <section aria-labelledby="who-we-serve">
        <Container className="py-4">
          <h2 id="who-we-serve" className="text-2xl sm:text-3xl font-bold tracking-tight">
            Who We Serve
          </h2>
          <div className="mt-4 grid gap-3 text-muted-foreground">
            <p>• Manufacturers and converters seeking reliable scrap procurement.</p>
            <p>• Exporters requiring compliant, durable, and lightweight packaging.</p>
            <p>• Cold‑chain pharma and food companies needing thermal control.</p>
            <p>• Electronics and precision components needing shock protection.</p>
            <p>• Logistics partners optimizing turnaround and material recovery.</p>
          </div>
        </Container>
      </section>

      <Separator />

      {/* CTA */}
      <section aria-labelledby="cta">
        <Container className="py-10 text-center">
          <h2 id="cta" className="text-2xl sm:text-3xl font-bold tracking-tight">
            Ready to work with a partner who blends sustainability with performance?
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-muted-foreground">
            Tell us about your recycling and packaging requirements. We’ll recommend a practical,
            cost‑effective approach tailored to your lanes and constraints.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
              <a href="#contact">Contact Our Team</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/products">Explore Products</a>
            </Button>
          </div>
        </Container>
      </section>

      <FooterSection />
    </div>
  );
}
