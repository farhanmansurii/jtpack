"use client";
import React, { memo } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/logo";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { FOOTER_CONFIG } from "@/lib/config";
import { usePathname } from "next/navigation";

function FooterSection() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
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
    } else if (href.startsWith("/")) {
      if (isHomePage && (href === "/about" || href === "/products")) {
        const sectionMap: Record<string, string> = {
          "/about": "#about",
          "/products": "#products",
        };
        const sectionHref = sectionMap[href];
        if (sectionHref) {
          const element = document.querySelector(sectionHref);
          if (element) {
            const navbarHeight = 64;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - navbarHeight;
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
            return;
          }
        }
      }
      window.location.href = href;
    }
  };

  const getQuickLinkHref = (link: string): string => {
    const linkMap: Record<string, string> = {
      "About Us": "/about",
      Services: "#services",
      Products: "/products",
      Contact: "#contact",
    };
    return linkMap[link] || "#";
  };

  const getServiceLinkHref = (service: string): string => {
    // Map services to sections or pages
    const serviceMap: Record<string, string> = {
      "Scrap Trading": "#products",
      "Packaging Solutions": "#products",
      "Metal Processing": "#products",
      Recycling: "#products",
    };
    return serviceMap[service] || "#";
  };

  const getSocialLinkHref = (platform: string): string => {
    // Placeholder URLs - replace with actual social media links
    const socialMap: Record<string, string> = {
      Facebook: "https://facebook.com/jtpack",
      Twitter: "https://twitter.com/jtpack",
      Instagram: "https://www.instagram.com/aymaaan.in",
      LinkedIn: "https://www.linkedin.com/in/aymaan-siddiqui-a760851b2",
    };
    return socialMap[platform] || "#";
  };

  https: return (
    <footer id="contact" className="bg-background border-t">
      <Container className="py-16 space-y-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div>
              <Logo variant="dark" size={200} showBadge={false} className="mb-3" />
              <p className="text-muted-foreground text-sm leading-relaxed">
                {FOOTER_CONFIG.company.description}
              </p>
            </div>
            <div className="flex space-x-2">
              {FOOTER_CONFIG.company.badges.map((badge) => (
                <Badge key={badge} variant="secondary">
                  {badge}
                </Badge>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-base font-medium">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              {FOOTER_CONFIG.quickLinks.map((link) => {
                const href = getQuickLinkHref(link);
                return (
                  <Button
                    key={link}
                    variant="link"
                    size="sm"
                    onClick={() => scrollToSection(href)}
                    className="justify-start text-muted-foreground hover:text-foreground"
                  >
                    {link}
                  </Button>
                );
              })}
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-base font-medium">Our Services</h4>
            <nav className="flex flex-col space-y-2">
              {FOOTER_CONFIG.services.map((service) => {
                const href = getServiceLinkHref(service);
                return (
                  <Button
                    key={service}
                    variant="link"
                    size="sm"
                    onClick={() => scrollToSection(href)}
                    className="justify-start text-muted-foreground hover:text-foreground"
                  >
                    {service}
                  </Button>
                );
              })}
            </nav>
          </div>

          {/* Contact Info */}
          <Card className="border-none shadow-none bg-muted/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{FOOTER_CONFIG.contact.title}</CardTitle>
              <CardDescription>{FOOTER_CONFIG.contact.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">{FOOTER_CONFIG.contact.phone}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">{FOOTER_CONFIG.contact.email}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">{FOOTER_CONFIG.contact.address}</span>
              </div>
              <Button size="sm" className="w-full mt-4" onClick={() => scrollToSection("#contact")}>
                Contact Us
              </Button>
            </CardContent>
          </Card>
        </div>

        <Separator />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © {currentYear} {FOOTER_CONFIG.company.name}. All rights reserved.
          </div>

          {/* Social Links */}
          <div className="flex space-x-2">
            {FOOTER_CONFIG.socialLinks.map(({ icon, label }) => {
              const iconMap = {
                Facebook,
                Twitter,
                Instagram,
                Linkedin,
              } as const;

              const IconComponent = iconMap[icon as keyof typeof iconMap];
              const socialHref = getSocialLinkHref(label);

              return (
                <Button
                  key={label}
                  variant="link"
                  size="icon"
                  asChild
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  aria-label={label}
                >
                  <a href={socialHref} target="_blank" rel="noopener noreferrer">
                    <IconComponent className="w-4 h-4" />
                  </a>
                </Button>
              );
            })}
          </div>

          {/* Legal Links - Placeholders for now */}
          <div className="flex space-x-4 text-sm">
            {FOOTER_CONFIG.legal.map((link) => (
              <Button
                key={link}
                variant="link"
                size="sm"
                className="p-0 h-auto text-muted-foreground hover:text-foreground cursor-not-allowed opacity-50"
                disabled
                aria-label={`${link} - Coming soon`}
              >
                {link}
              </Button>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default memo(FooterSection);
