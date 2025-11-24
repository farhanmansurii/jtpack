"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Mail, Globe, ArrowRight, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAVBAR_CONFIG, FOOTER_CONFIG } from "@/lib/config";
import { QuoteRequest } from "@/components/quote-request";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}

export default function Navbar({ isOnPage = false }: { isOnPage?: boolean }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isMobile = useMediaQuery("(max-width: 768px)");
  // --- Scroll Logic ---
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logoSizeForMobile = useMemo(() => {
    return isScrolled ? (isMobile ? 80 : 64) : isMobile ? 90 : 128;
  }, [isMobile, isScrolled]);
  // --- Lock Body Scroll on Mobile Menu ---
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  // --- Navigation Handler ---
  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);

    // Handle smooth scroll for hash links on homepage
    if (href.startsWith("#") && isHomePage) {
      const element = document.querySelector(href);
      if (element) {
        const offset = 100;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  // --- Visual State Variables ---
  const isTransparent = isHomePage && !isScrolled;
  const textColorClass = isTransparent ? "text-white" : "text-slate-900";
  const hoverColorClass = isTransparent ? "hover:bg-white/10" : "hover:bg-slate-100";

  return (
    <>
      {/* ==================== 1. Utility Top Bar (Desktop Only) ==================== */}
      {/* High-value trust signals (Phone/Email) - Disappears on scroll */}
      <div
        className={cn(
          "hidden lg:block fixed top-0 w-full z-[60] transition-transform duration-500 ease-in-out",
          isScrolled ? "-translate-y-full" : "translate-y-0",
          isHomePage ? "bg-transparent border-b border-white/10" : "bg-secondary-800 text-white",
        )}
      >
        <Container className="py-2.5">
          <div
            className={cn(
              "flex justify-between items-center text-xs font-medium tracking-wide",
              isHomePage ? "text-white/90" : "text-slate-300",
            )}
          >
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 opacity-70" />
                Global Import/Export Certified
              </span>
            </div>
            <div className="flex items-center gap-6">
              <a
                href={`mailto:${FOOTER_CONFIG.contact.email}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 opacity-70" />
                {FOOTER_CONFIG.contact.email}
              </a>
              <span className="w-px h-3 bg-current opacity-20" />
              <a
                href={`tel:${FOOTER_CONFIG.contact.phone}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 opacity-70" />
                {FOOTER_CONFIG.contact.phone}
              </a>
            </div>
          </div>
        </Container>
      </div>

      {/* ==================== 2. Main Navbar ==================== */}
      <header
        className={cn(
          "fixed left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
          // Layout Positioning based on scroll and top bar presence
          isScrolled ? "top-0 py-3" : "top-0 lg:top-10 py-4 lg:py-5",
        )}
      >
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <nav
            className={cn(
              "flex items-center justify-between rounded-2xl px-4 pr-2 py-2.5 transition-all duration-500",
              // Glassmorphism Logic
              isScrolled
                ? "bg-white/90 backdrop-blur-md shadow-lg shadow-slate-200/20 border border-white/20"
                : isHomePage
                ? "bg-transparent border border-transparent"
                : "bg-white/90 backdrop-blur-md border border-slate-200 shadow-sm",
            )}
          >
            {/* --- Logo Section --- */}

            <Logo
              variant={isTransparent ? "light" : "dark"}
              size={logoSizeForMobile}
              showBadge={false}
            />

            {/* --- Desktop Links --- */}
            <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
              {NAVBAR_CONFIG.navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    if (item.href.startsWith("#") && isHomePage) {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }
                  }}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                    textColorClass,
                    hoverColorClass,
                    "hover:scale-105 active:scale-95",
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* --- Right Actions --- */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* Phone Number Icon (Visible on Tablet/Desktop) */}
              <a
                href={`tel:${FOOTER_CONFIG.contact.phone}`}
                className={cn(
                  "hidden lg:flex items-center gap-2 text-sm font-semibold px-3 py-2 rounded-full transition-colors mr-1",
                  isTransparent
                    ? "text-white hover:bg-white/10"
                    : "text-slate-600 hover:bg-slate-100",
                )}
                title="Call Us"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden ">{FOOTER_CONFIG.contact.phone}</span>
              </a>

              {/* Quote Button */}
              <QuoteRequest colorScheme="green">
                <Button
                  size={isScrolled ? "sm" : "default"}
                  className={cn(
                    "font-bold shadow-lg transition-all duration-300",
                    isTransparent
                      ? "bg-white text-slate-900 hover:bg-primary-50 border-none"
                      : "text-white hover:bg-slate-800",
                  )}
                >
                  {NAVBAR_CONFIG.cta.primary.text}
                </Button>
              </QuoteRequest>

              {/* Mobile Toggle */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className={cn(
                  "md:hidden p-2 rounded-full transition-colors",
                  isTransparent
                    ? "text-white hover:bg-white/20"
                    : "text-slate-900 hover:bg-slate-100",
                )}
                aria-label="Open Menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* ==================== 3. Mobile Menu Drawer (Right Side) ==================== */}
      <div
        className={cn(
          "fixed inset-0 z-[100] md:hidden transition-visibility duration-300",
          mobileMenuOpen ? "visible" : "invisible delay-300",
        )}
      >
        {/* Backdrop */}
        <div
          className={cn(
            "absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300",
            mobileMenuOpen ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Sidebar Content */}
        <div
          className={cn(
            "absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-out transform flex flex-col",
            mobileMenuOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          {/* Drawer Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <Logo variant="dark" size={50} showBadge={false} />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-red-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Links */}
          <div className="flex-1 overflow-y-auto p-6 space-y-2">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
              Navigation
            </div>
            {NAVBAR_CONFIG.navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  if (item.href.startsWith("#") && isHomePage) {
                    e.preventDefault();
                    handleNavClick(item.href);
                  } else {
                    setMobileMenuOpen(false);
                  }
                }}
                className="group flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-200"
              >
                <span className="text-lg font-medium text-slate-700 group-hover:text-slate-900">
                  {item.name}
                </span>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary-600 transition-colors" />
              </Link>
            ))}
          </div>

          {/* Drawer Footer */}
          <div className="p-6 border-t border-slate-100 bg-slate-50">
            <QuoteRequest colorScheme="green">
              <Button className="w-full h-12 text-base font-bold bg-primary-600 hover:bg-primary-700 shadow-primary-200 shadow-lg mb-4">
                {NAVBAR_CONFIG.cta.primary.text} <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </QuoteRequest>

            <div className="grid grid-cols-1 gap-3">
              <a
                href={`tel:${FOOTER_CONFIG.contact.phone}`}
                className="flex items-center gap-3 p-3 rounded-lg bg-white border border-slate-200 text-slate-600 hover:border-primary-300 transition-colors"
              >
                <div className="p-2 bg-primary-50 text-primary-600 rounded-md">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Call Us</span>
                  <span className="text-sm font-semibold text-slate-900">
                    {FOOTER_CONFIG.contact.phone}
                  </span>
                </div>
              </a>
              <a
                href={`mailto:${FOOTER_CONFIG.contact.email}`}
                className="flex items-center gap-3 p-3 rounded-lg bg-white border border-slate-200 text-slate-600 hover:border-primary-300 transition-colors"
              >
                <div className="p-2 bg-primary-50 text-primary-600 rounded-md">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Email Us</span>
                  <span className="text-sm font-semibold text-slate-900">
                    {FOOTER_CONFIG.contact.email}
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
