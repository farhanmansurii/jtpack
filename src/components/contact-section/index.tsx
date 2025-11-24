import { memo } from "react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "../ui/section-header";
import { QuoteRequest } from "../quote-request";
import { Button } from "../ui/button";

function ContactSection() {
  return (
    <section id="contact" className="pt-24 ">
      <Container className="flex flex-col w-full  max-w-7xl items-center">
        <SectionHeader
          badge={{
            text: "Contact",
            className: "bg-secondary-100 text-secondary-800",
          }}
          title="Get in Touch"
          description="Tell us about your requirements and we'll get back soon."
          variant="left"
          className="w-full"
        />

        <QuoteRequest
          useModal={false}
          colorScheme="green"
          className="flex justify-center   w-full gap-2 "
        >
          <Button className="w-full bg-secondary-600 hover:bg-secondary-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2">
            Get a Quote
          </Button>
        </QuoteRequest>
      </Container>
    </section>
  );
}

export default memo(ContactSection);
