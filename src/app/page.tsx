import AboutUsSection from "@/components/about-us-section";
import DualBusinessOverview from "@/components/dual-business-overview-section";
import HeroSection from "@/components/hero-section";
import ScrapAndPackagingSections from "@/components/scrap-and-packaging-section";
import TestimonialsSection from "@/components/testimonials-section";
import ContactSection from "@/components/contact-section";
import FooterSection from "@/components/footer-section";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <AboutUsSection />
      <DualBusinessOverview />
      <ScrapAndPackagingSections />
      <TestimonialsSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
}
