import type { Metadata } from "next";
import { Inter, Roboto_Slab, JetBrains_Mono } from "next/font/google";
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
export const metadata: Metadata = {
  title: {
    default: "JTPack — Sustainable Scrap Trading & CFC Packaging",
    template: "%s | JTPack",
  },
  description:
    "J T PACK PRIVATE LIMITED specializes in trading paper, plastic, and metal scrap and manufacturing Controlled Foam Core (CFC) boxes — durable, insulation-ready, export-grade packaging solutions.",
  keywords: [
    "scrap trading",
    "recycling",
    "paper scrap",
    "plastic scrap",
    "metal scrap",
    "CFC boxes",
    "packaging",
    "export packaging",
    "sustainable packaging",
    "India",
  ],
  authors: [{ name: "J T PACK PRIVATE LIMITED" }],
  creator: "JTPack",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "JTPack — Sustainable Scrap Trading & CFC Packaging",
    description:
      "Combining end-to-end recycling operations with industry-leading CFC packaging manufacturing to deliver sustainable, high-performance solutions.",
    siteName: "JTPack",
    images: [
      {
        url: "/hero/hero-video.webp",
        width: 1200,
        height: 630,
        alt: "JTPack - Recycling and Packaging",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JTPack — Sustainable Scrap Trading & CFC Packaging",
    description: "Sustainable scrap sourcing and premium CFC packaging.",
    images: ["/hero/hero-video.webp"],
  },
  alternates: {
    canonical: "/",
  },
  category: "business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${robotoSlab.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
