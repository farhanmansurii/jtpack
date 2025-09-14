import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-muted/30 py-16 sm:py-24 lg:py-28">
      <Container>
        <div className="text-center mb-10">
          <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-800 px-3 py-1 text-xs font-medium">What clients say</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Testimonials</h2>
          <p className="mt-3 text-muted-foreground">Trusted by partners across recycling and packaging industries.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3].map((i) => (
            <Card key={i} className="p-6">
              <p className="text-sm text-muted-foreground">“Great quality and on-time deliveries. The team is responsive and reliable.”</p>
              <div className="mt-4 text-sm font-medium">Operations Lead, FMCG</div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

