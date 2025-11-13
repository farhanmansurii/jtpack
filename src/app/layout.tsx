import type { Metadata } from "next";
import { Inter, Roboto_Slab, JetBrains_Mono, League_Spartan } from "next/font/google";
import { FOOTER_CONFIG, DUAL_BUSINESS_CONFIG } from "@/lib/config";
import "./globals.css";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const robotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const leagueSpartan = League_Spartan({
  variable: "--font-title",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});
// Base URL for absolute image URLs in social sharing
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jtpack.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "JTPack — Sustainable Scrap Trading & CFC Packaging",
    template: "%s | JTPack",
  },
  description: DUAL_BUSINESS_CONFIG.description,
  keywords: [
    "scrap trading",
    "recycling",
    "paper scrap",
    "plastic scrap",
    "metal scrap",
    "CFC boxes",
    "CFC packaging",
    "corrugated packaging",
    "polymer granules",
    "packaging manufacturing",
    "export packaging",
    "sustainable packaging",
    "waste management",
    "circular economy",
    "India",
    "Gujarat",
    "Vapi",
  ],
  authors: [{ name: FOOTER_CONFIG.company.name }],
  creator: FOOTER_CONFIG.company.name,
  publisher: FOOTER_CONFIG.company.name,
  applicationName: FOOTER_CONFIG.company.name,
  category: "business",
  classification: "Manufacturing, Recycling, Packaging",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",

  openGraph: {
    type: "website",
    locale: "en_IN",
    alternateLocale: ["en_US"],
    url: siteUrl,
    siteName: FOOTER_CONFIG.company.name,
    title: "JTPack — Sustainable Scrap Trading & CFC Packaging",
    description: DUAL_BUSINESS_CONFIG.description,
    countryName: "India",
    emails: [FOOTER_CONFIG.contact.email],
    phoneNumbers: [FOOTER_CONFIG.contact.phone],
  },
  twitter: {
    card: "summary_large_image",
    title: "JTPack — Sustainable Scrap Trading & CFC Packaging",
    description: DUAL_BUSINESS_CONFIG.description,
    images: [`${siteUrl}/hero/hero-video.webp`],
    creator: "@jtpack",
    site: "@jtpack",
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "contact:phone_number": FOOTER_CONFIG.contact.phone,
    "contact:email": FOOTER_CONFIG.contact.email,
    "contact:street_address": FOOTER_CONFIG.contact.address,
    "business:contact_data:street_address": FOOTER_CONFIG.contact.address,
    "business:contact_data:locality": "Vapi",
    "business:contact_data:region": "Gujarat",
    "business:contact_data:postal_code": "396195",
    "business:contact_data:country_name": "India",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="https://progressier.app/koHyvc3FSRc4oKchdxLE/progressier.json" />
        <script defer src="https://progressier.app/koHyvc3FSRc4oKchdxLE/script.js"></script>
      </head>
      <body
        className={`${inter.variable} ${robotoSlab.variable} ${jetbrainsMono.variable} ${leagueSpartan.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
