/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { Recycle, Package } from "lucide-react";
import { Container } from "@/components/ui/container";
import { DUAL_BUSINESS_CONFIG } from "@/lib/config";

export default function DualBusinessOverview() {
  const businesses = DUAL_BUSINESS_CONFIG.businesses.map((business) => ({
    ...business,
    icon: business.icon === "Recycle" ? Recycle : Package,
  }));

  return (
    <section id="services" className="py-16 lg:py-24">
      <Container>
        <div className="mb-12 text-center">
          <span
            className={`inline-flex items-center rounded-full ${DUAL_BUSINESS_CONFIG.badge.className} px-3 py-1 text-xs font-medium`}
          >
            {DUAL_BUSINESS_CONFIG.badge.text}
          </span>
          <h2
            id="business-overview-heading"
            className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
          >
            {DUAL_BUSINESS_CONFIG.title}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            {DUAL_BUSINESS_CONFIG.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {businesses.map((biz, index) => (
            <div
              key={biz.title}
              className={`relative overflow-hidden rounded-2xl shadow-xl bg-gradient-to-br ${biz.gradient} border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]`}
            >
              {/* Header */}
              <div className="p-6 pb-0">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${index === 0 ? "bg-green-100" : "bg-blue-100"}`}
                    >
                      <biz.icon
                        className={`h-6 w-6 ${index === 0 ? "text-green-600" : "text-blue-600"}`}
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{biz.title}</h3>
                  </div>
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                      index === 0 ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {biz.badge}
                  </span>
                </div>
              </div>

              {/* Image */}
              <div className="px-6 pb-4">
                <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-200">
                  <img
                    src={biz.image}
                    alt={`${biz.title} operations`}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 pt-0">
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">{biz.description}</p>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-4"></div>

                <ul className="space-y-3">
                  {biz.highlights.map((highlight) => (
                    <li key={highlight} className="text-sm text-gray-700 flex items-center gap-3">
                      <span
                        className={`inline-block h-2 w-2 rounded-full ${
                          index === 0 ? "bg-green-500" : "bg-blue-500"
                        }`}
                      ></span>
                      <span className="font-medium">{highlight}</span>
                    </li>
                  ))}
                </ul>

                {/* Call to Action */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <Link
                    href={index === 0 ? "/products/scrap" : "/products/packaging"}
                    className={`w-full block text-center py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
                      index === 0
                        ? "bg-green-600 hover:bg-green-700 text-white hover:shadow-lg"
                        : "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg"
                    }`}
                  >
                    Learn More About {biz.badge}
                  </Link>
                </div>
              </div>
            </div>
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
                <Link
                  key={index}
                  href={button.variant === "green" ? "/products/scrap" : "/products/packaging"}
                  className={`${
                    button.variant === "green"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  } text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200`}
                >
                  {button.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
