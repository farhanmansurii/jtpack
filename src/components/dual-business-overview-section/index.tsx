/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { Recycle, Package } from "lucide-react";
import { Container } from "@/components/ui/container";
import { DUAL_BUSINESS_CONFIG } from "@/lib/config";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QuoteRequest } from "@/components/quote-request";
import { FeatureIcon } from "@/lib/config";
import {
  Recycle as RecycleIcon,
  Package as PackageIcon,
  Shield,
  Zap,
  Globe,
  Award,
  TrendingUp,
  Users,
} from "lucide-react";

// Icon mapping function
function getIconComponent(icon: FeatureIcon) {
  const icons = {
    Recycle,
    Package,
    Shield,
    Zap,
    Globe,
    Award,
    TrendingUp,
    Users,
  } as const;
  const IconComponent = icons[icon as keyof typeof icons];
  return IconComponent ? <IconComponent className="h-8 w-8" /> : <Package className="h-8 w-8" />;
}

export default function DualBusinessOverview() {
  const businesses = DUAL_BUSINESS_CONFIG.businesses.map((business) => ({
    ...business,
    icon: getIconComponent(business.icon),
  }));

  return (
    <section id="expertise" className="py-16 lg:py-24 bg-gray-50">
      <Container>
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className={DUAL_BUSINESS_CONFIG.badge.className}>
            {DUAL_BUSINESS_CONFIG.badge.text}
          </Badge>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {DUAL_BUSINESS_CONFIG.title}
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
            {DUAL_BUSINESS_CONFIG.description}
          </p>
        </div>

        {/* Business Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {businesses.map((business, index) => (
            <Card
              key={index}
              className={`relative overflow-hidden bg-gradient-to-br ${business.gradient} border-0 shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0">
                    <div
                      className={`w-12 h-12 rounded-lg ${
                        business.badge === "Recycling"
                          ? "bg-green-100 text-green-600"
                          : "bg-blue-100 text-blue-600"
                      } flex items-center justify-center`}
                    >
                      {business.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <Badge
                      variant="secondary"
                      className={
                        business.badge === "Recycling"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }
                    >
                      {business.badge}
                    </Badge>
                    <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3">{business.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{business.description}</p>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-6">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2">
                    {business.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            business.badge === "Recycling" ? "bg-green-500" : "bg-blue-500"
                          }`}
                        />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Business Image */}
                <div className="rounded-lg overflow-hidden mb-4">
                  <img
                    src={business.image}
                    alt={business.title}
                    className="w-full h-40 object-cover"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {DUAL_BUSINESS_CONFIG.cta.title}
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              {DUAL_BUSINESS_CONFIG.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {DUAL_BUSINESS_CONFIG.cta.buttons.map((button, index) => (
                <QuoteRequest
                  key={index}
                  product={button.variant === "green" ? "paper-scrap" : "cfc-packaging"}
                  colorScheme={button.variant as "green" | "blue"}
                >
                  <Button
                    className={`${
                      button.variant === "green"
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-blue-600 hover:bg-blue-700"
                    } text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200`}
                  >
                    {button.text}
                  </Button>
                </QuoteRequest>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
