import React from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
} from "lucide-react";
import { FOOTER_CONFIG } from "@/lib/config";

export default function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-background border-t">
      <Container className="py-16 space-y-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-3">{FOOTER_CONFIG.company.name}</h3>
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
              {FOOTER_CONFIG.quickLinks.map((link) => (
                <Button
                  key={link}
                  variant="link"
                  size="sm"
                  className="justify-start   text-muted-foreground hover:text-foreground"
                >
                  {link}
                </Button>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-base font-medium">Our Services</h4>
            <nav className="flex flex-col space-y-2">
              {FOOTER_CONFIG.services.map((service) => (
                <Button
                  key={service}
                  variant="link"
                  size="sm"
                  className="justify-start   text-muted-foreground hover:text-foreground"
                >
                  {service}
                </Button>
              ))}
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
              <Button size="sm" className="w-full mt-4">
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

              return (
                <Button
                  key={label}
                  variant="link"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  aria-label={label}
                >
                  <IconComponent className="w-4 h-4" />
                </Button>
              );
            })}
          </div>

          {/* Legal Links */}
          <div className="flex space-x-4 text-sm">
            {FOOTER_CONFIG.legal.map((link) => (
              <Button
                key={link}
                variant="link"
                size="sm"
                className="p-0 h-auto text-muted-foreground hover:text-foreground"
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
