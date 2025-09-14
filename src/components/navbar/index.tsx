"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAVBAR_CONFIG } from "@/lib/config";
import { QuoteRequest } from "@/components/quote-request";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHomePage, setIsHomePage] = useState(false);

  useEffect(() => {
    // Check if we're on the home page
    setIsHomePage(window?.location.pathname === "/");

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
        return;
      }
    }
    if (href.startsWith("/")) {
      window.location.href = href;
      setIsOpen(false);
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

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
          <div className="flex items-center space-x-2">
            <div
              className={cn(
                "text-xl font-bold transition-colors duration-300",
                scrolled || !isHomePage ? "text-primary" : "text-white",
              )}
            >
              {NAVBAR_CONFIG.logo.text}
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {NAVBAR_CONFIG.navigation.map((item) => (
              <Button
                key={item.name}
                variant="link"
                onClick={() => scrollToSection(item.href)}
                className={cn(
                  "transition-colors duration-300",
                  scrolled || !isHomePage
                    ? "text-foreground hover:text-primary"
                    : "text-white hover:text-white/80",
                )}
              >
                {item.name}
              </Button>
            ))}
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
