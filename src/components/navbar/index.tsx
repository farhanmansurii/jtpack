"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAVBAR_CONFIG } from "@/lib/config";
import { QuoteRequest } from "@/components/quote-request";
import { Logo } from "@/components/logo";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const newScrolled = window.scrollY > 10;
          setScrolled((prev) => {
            if (prev !== newScrolled) {
              return newScrolled;
            }
            return prev;
          });

          // Scroll spy - detect active section
          if (isHomePage) {
            const sections = ["home", "about", "services", "products", "contact"];
            const navbarHeight = 64;

            for (let i = sections.length - 1; i >= 0; i--) {
              const section = sections[i];
              const element = document.getElementById(section);
              if (element) {
                const rect = element.getBoundingClientRect();
                const elementTop = rect.top + window.pageYOffset;
                const scrollPosition = window.pageYOffset + navbarHeight + 100;

                if (scrollPosition >= elementTop) {
                  setActiveSection((prev) => {
                    if (prev !== section) {
                      return section;
                    }
                    return prev;
                  });
                  break;
                }
              }
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const scrollToSection = useCallback((href: string) => {
    if (href.startsWith("#")) {
      // If we're on the home page, try to scroll to the section
      if (isHomePage) {
        const element = document.querySelector(href);
        if (element) {
          const navbarHeight = 64;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navbarHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
          setIsOpen(false);
          return;
        }
      } else {
        // If we're not on the home page, navigate to home page with hash
        setIsOpen(false);
        const url = `${window.location.origin}/${href}`;
        window.location.href = url;
        return;
      }
    }
    if (href.startsWith("/")) {
      if (isHomePage) {
        const sectionMap: Record<string, string> = {
          "/about": "#about",
          "/products": "#products",
        };

        if (sectionMap[href]) {
          const element = document.querySelector(sectionMap[href]);
          if (element) {
            const navbarHeight = 64;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - navbarHeight;
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
            setIsOpen(false);
            return;
          }
        }
      }
      window.location.href = href;
      setIsOpen(false);
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      const navbarHeight = 64;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  }, [isHomePage]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || !isHomePage
          ? "bg-background/95 backdrop-blur-sm border-b shadow-sm"
          : "bg-transparent",
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Logo
            variant={(scrolled || !isHomePage ? "dark" : "light") as "dark" | "light"}
            size="xl"
            showBadge={false}
          />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {NAVBAR_CONFIG.navigation.map((item) => {
              const isActive = isHomePage && (
                (item.href === "/" && activeSection === "home") ||
                (item.href === "/about" && activeSection === "about") ||
                (item.href === "#services" && activeSection === "services") ||
                (item.href === "/products" && activeSection === "products")
              );

              return (
                <Button
                  key={item.name}
                  variant="link"
                  onClick={() => scrollToSection(item.href)}
                  className={cn(
                    "transition-colors duration-300",
                    scrolled || !isHomePage
                      ? isActive
                        ? "text-primary font-semibold"
                        : "text-foreground hover:text-primary"
                      : isActive
                        ? "text-white font-semibold"
                        : "text-white hover:text-white/80",
                  )}
                >
                  {item.name}
                </Button>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <QuoteRequest colorScheme="blue">
              <Button
                size="sm"
                className={cn(
                  "transition-colors duration-300",
                  scrolled || !isHomePage ? "" : "bg-white text-black hover:bg-white/90",
                )}
              >
                {NAVBAR_CONFIG.cta.primary.text}
              </Button>
            </QuoteRequest>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "transition-colors duration-300",
                scrolled || !isHomePage ? "text-foreground" : "text-white",
              )}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div
              className={cn(
                "px-2 pt-2 pb-3 space-y-1 border-t transition-colors duration-300",
                scrolled || !isHomePage
                  ? "bg-background/95 backdrop-blur-sm"
                  : "bg-black/95 backdrop-blur-sm",
              )}
            >
              {NAVBAR_CONFIG.navigation.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  onClick={() => scrollToSection(item.href)}
                  className={cn(
                    "w-full justify-start transition-colors duration-300",
                    scrolled
                      ? "text-foreground hover:text-primary"
                      : "text-white hover:text-white/80",
                  )}
                >
                  {item.name}
                </Button>
              ))}
              <div className="pt-4 space-y-2">
                <QuoteRequest colorScheme="blue">
                  <Button
                    size="sm"
                    className={cn(
                      "w-full transition-colors duration-300",
                      scrolled || !isHomePage ? "" : "bg-white text-black hover:bg-white/90",
                    )}
                  >
                    {NAVBAR_CONFIG.cta.primary.text}
                  </Button>
                </QuoteRequest>
              </div>
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
}
