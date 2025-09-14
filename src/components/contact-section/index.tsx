import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 sm:py-24 lg:py-28">
      <Container>
        <div className="text-center mb-8">
          <span className="inline-flex items-center rounded-full bg-blue-100 text-blue-800 px-3 py-1 text-xs font-medium">Contact</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Get in Touch</h2>
          <p className="mt-3 text-muted-foreground">Tell us about your requirements and we’ll get back soon.</p>
        </div>
        <form className="max-w-2xl mx-auto grid grid-cols-1 gap-4">
          <input className="w-full rounded-md border border-input bg-background px-3 py-2" placeholder="Name" required />
          <input className="w-full rounded-md border border-input bg-background px-3 py-2" placeholder="Email" type="email" required />
          <input className="w-full rounded-md border border-input bg-background px-3 py-2" placeholder="Phone" />
          <textarea className="w-full rounded-md border border-input bg-background px-3 py-2 min-h-32" placeholder="How can we help?" />
          <div className="flex justify-center">
            <Button type="submit">Send message</Button>
          </div>
        </form>
      </Container>
    </section>
  );
}

