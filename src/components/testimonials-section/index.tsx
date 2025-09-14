import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-muted/30 py-16 sm:py-24 lg:py-28">
      <Container>
        <SectionHeader
          badge={{
            text: "What clients say",
            className: "bg-amber-100 text-amber-800",
          }}
          title="Testimonials"
          description="Trusted by partners across recycling and packaging industries."
          className="mb-10"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-6">
              <p className="text-sm text-muted-foreground">
                Great quality and on-time deliveries. The team is responsive and reliable
              </p>
              <div className="mt-4 text-sm font-medium">Operations Lead, FMCG</div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
