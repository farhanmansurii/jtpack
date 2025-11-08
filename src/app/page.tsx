import type { Metadata } from "next";
import AboutUsSection from "@/components/about-us-section";
import DualBusinessOverview from "@/components/dual-business-overview-section";
import HeroSection from "@/components/hero-section";
import ScrapAndPackagingSections from "@/components/scrap-and-packaging-section";
import ContactSection from "@/components/contact-section";
import FooterSection from "@/components/footer-section";
import Navbar from "@/components/navbar";
import PresencePage from "@/components/presence-section/map";
import { FOOTER_CONFIG, DUAL_BUSINESS_CONFIG } from "@/lib/config";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jtpack.com";

export const metadata: Metadata = {
  title: "JTPack — Sustainable Scrap Trading & CFC Packaging",
  description: DUAL_BUSINESS_CONFIG.description,
  openGraph: {
    title: "JTPack — Sustainable Scrap Trading & CFC Packaging",
    description: DUAL_BUSINESS_CONFIG.description,
    url: siteUrl,
    siteName: FOOTER_CONFIG.company.name,
    images: [
      {
        url: `${siteUrl}/hero/hero-video.webp`,
        width: 1200,
        height: 630,
        alt: "JTPack - Sustainable Scrap Trading & CFC Packaging Solutions",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JTPack — Sustainable Scrap Trading & CFC Packaging",
    description: DUAL_BUSINESS_CONFIG.description,
    images: [`${siteUrl}/hero/hero-video.webp`],
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: FOOTER_CONFIG.company.name,
    description: DUAL_BUSINESS_CONFIG.description,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    image: `${siteUrl}/hero/hero-video.webp`,
    address: {
      "@type": "PostalAddress",
      streetAddress: FOOTER_CONFIG.contact.address,
      addressLocality: "Vapi",
      addressRegion: "Gujarat",
      postalCode: "396195",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: FOOTER_CONFIG.contact.phone,
      contactType: "Customer Service",
      email: FOOTER_CONFIG.contact.email,
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
    sameAs: [
      "https://facebook.com/jtpack",
      "https://twitter.com/jtpack",
      "https://instagram.com/jtpack",
      "https://linkedin.com/company/jtpack",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "150",
    },
    offers: {
      "@type": "Offer",
      category: "Scrap Trading & Packaging Solutions",
    },
  };

  return (
    <div className="font-title">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <HeroSection />
      <AboutUsSection />
      <DualBusinessOverview />
      <ScrapAndPackagingSections />
      <PresencePage />
      <ContactSection />
      <FooterSection />
    </div>
  );
}
