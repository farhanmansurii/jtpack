import { Container } from "@/components/ui/container";
import { SectionHeader } from "../ui/section-header";
import { QuoteRequest } from "../quote-request";

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 sm:py-24 lg:py-28">
      <Container>
        <SectionHeader
          badge={{
            text: "Contact",
            className: "bg-blue-100 text-blue-800",
          }}
          title="Get in Touch"
          description="Tell us about your requirements and we'll get back soon."
          className="mb-8"
          variant="left"
        />

        <QuoteRequest useModal={false} colorScheme="blue">
          <div className="w-full">
            <button
              type="button"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Get a Quote
            </button>
          </div>
        </QuoteRequest>
      </Container>
    </section>
  );
}
