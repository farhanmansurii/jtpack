/* eslint-disable @next/next/no-img-element */
import React, { JSX } from "react";
import { Package, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { QuoteRequest } from "../quote-request";

type ColorScheme = "blue" | "green";

type ProductCardProps = {
  category: string;
  title: string;
  subtitle: string;
  image: string;
  features: string[];
  applications: string[];
  icon: JSX.Element;
  ctaText: string;
  colorScheme?: ColorScheme;
};

const ProductCard = ({
  category,
  title,
  subtitle,
  image,
  features,
  applications,
  icon,
  ctaText,
  colorScheme = "blue",
}: ProductCardProps) => {
  const colors = {
    blue: {
      badge: "bg-blue-50 text-blue-700",
      iconText: "text-blue-600",
      button: "bg-blue-600 hover:bg-blue-700",
      accent: "text-blue-600",
    },
    green: {
      badge: "bg-green-50 text-green-700",
      iconText: "text-green-600",
      button: "bg-green-600 hover:bg-green-700",
      accent: "text-green-600",
    },
  };

  const colorClass = colors[colorScheme];

  // Map category to product value for the quote form
  const getProductValue = (category: string) => {
    const categoryMap: Record<string, string> = {
      "Paper Scrap": "paper-scrap",
      "Plastic Scrap": "plastic-scrap",
      "Metal Scrap": "metal-scrap",
      "CFC Packaging": "cfc-packaging",
      "Thermal Packaging": "thermal-packaging",
      "Custom Packaging": "custom-packaging",
    };
    return categoryMap[category] || "other";
  };

  return (
    <div className="group w-full bg-white border border-gray-200 rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span
            className={`flex items-center gap-2 ${colorClass.badge} px-3 py-1 rounded-full text-sm font-medium`}
          >
            {icon}
            <span>{category}</span>
          </span>
        </div>

        <div className="aspect-video w-full relative overflow-hidden rounded-lg bg-gray-100">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-900 leading-tight">{title}</h3>
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>
      </div>

      <div className="px-6 pb-4 space-y-4">
        <div className="space-y-3">
          <h4 className={`text-sm font-medium text-gray-900 flex items-center gap-2`}>
            <Package className={`w-4 h-4 ${colorClass.iconText}`} />
            Key Features
          </h4>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="p-6 pt-0">
        <QuoteRequest
          product={getProductValue(category)}
          colorScheme={colorScheme}
          className="w-full"
        >
          <Button className={`w-full group/btn ${colorClass.button}`}>
            <span>{ctaText}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </QuoteRequest>
      </div>
    </div>
  );
};

export default ProductCard;
