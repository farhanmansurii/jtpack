"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAVBAR_CONFIG } from "@/lib/config";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
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
        scrolled ? "bg-background/95 backdrop-blur-sm border-b shadow-sm" : "bg-transparent",
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="text-xl font-bold text-primary">{NAVBAR_CONFIG.logo.text}</div>
            <Badge variant="secondary" className="text-xs">
              {NAVBAR_CONFIG.logo.badge}
            </Badge>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {NAVBAR_CONFIG.navigation.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                onClick={() => scrollToSection(item.href)}
                className="text-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </Button>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection(NAVBAR_CONFIG.cta.secondary.href)}
            >
              {NAVBAR_CONFIG.cta.secondary.text}
            </Button>
            <Button size="sm" onClick={() => scrollToSection(NAVBAR_CONFIG.cta.primary.href)}>
              {NAVBAR_CONFIG.cta.primary.text}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-sm border-t">
              {NAVBAR_CONFIG.navigation.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  onClick={() => scrollToSection(item.href)}
                  className="w-full justify-start text-foreground hover:text-primary"
                >
                  {item.name}
                </Button>
              ))}
              <div className="pt-4 space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => scrollToSection(NAVBAR_CONFIG.cta.secondary.href)}
                  className="w-full justify-start"
                >
                  {NAVBAR_CONFIG.cta.secondary.text}
                </Button>
                <Button
                  size="sm"
                  onClick={() => scrollToSection(NAVBAR_CONFIG.cta.primary.href)}
                  className="w-full"
                >
                  {NAVBAR_CONFIG.cta.primary.text}
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
}
