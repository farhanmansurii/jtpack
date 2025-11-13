"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowRight, Loader2 } from "lucide-react";
import { SCRAP_AND_PACKAGING_CONFIG, FOOTER_CONFIG } from "@/lib/config";

interface QuoteRequestProps {
  children: React.ReactNode;
  product?: string;
  colorScheme?: "green" | "blue";
  className?: string;
  useModal?: boolean; // new prop
  mode?: "submit" | "whatsapp";
}

interface QuoteFormData {
  name: string;
  contactMethod: "phone" | "email";
  contact: string;
  product: string;
  notes: string;
}

type ProductOption = { value: string; label: string };
const PRODUCT_OPTIONS: ProductOption[] = (
  [
    ...SCRAP_AND_PACKAGING_CONFIG.scrapMaterials.products,
    ...SCRAP_AND_PACKAGING_CONFIG.packagingProducts.products,
  ] as Array<{ title: string; slug?: string }>
)
  .map((p) => ({ value: p.slug || p.title, label: p.title }))
  .filter((option, index, self) => index === self.findIndex((o) => o.value === option.value));

export function QuoteRequest({
  children,
  product,
  colorScheme = "blue",
  className,
  useModal = true,
  mode = "whatsapp",
}: QuoteRequestProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const [formData, setFormData] = React.useState<QuoteFormData>({
    name: "",
    contactMethod: "phone",
    contact: "",
    product: product || "",
    notes: "",
  });

  const colors = {
    green: {
      button: "bg-green-600 hover:bg-green-700",
      focus: "focus:ring-green-500",
    },
    blue: {
      button: "bg-blue-600 hover:bg-blue-700",
      focus: "focus:ring-blue-500",
    },
  };

  const colorClass = colors[colorScheme];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.contact || !formData.product) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (mode === "whatsapp") {
        const toNumber = FOOTER_CONFIG.contact.phone.replace(/[^0-9]/g, "");

        // Try to find product by exact slug match first
        let productLabel = PRODUCT_OPTIONS.find((p) => p.value === formData.product)?.label;

        // If not found, try to find by title (case-insensitive partial match)
        if (!productLabel) {
          const foundProduct = PRODUCT_OPTIONS.find((p) =>
            p.label.toLowerCase().includes(formData.product.toLowerCase()) ||
            formData.product.toLowerCase().includes(p.label.toLowerCase())
          );
          productLabel = foundProduct?.label;
        }

        // If still not found, try to find by slug partial match
        if (!productLabel) {
          const foundProduct = PRODUCT_OPTIONS.find((p) =>
            p.value.toLowerCase().includes(formData.product.toLowerCase()) ||
            formData.product.toLowerCase().includes(p.value.toLowerCase())
          );
          productLabel = foundProduct?.label;
        }

        // Final fallback: format the product value nicely or use it as-is
        if (!productLabel) {
          productLabel = formData.product
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
        }

        const message = [
          "NEW QUOTE REQUEST",
          "----------------------------------------",
          "",
          "Customer Details",
          `   • Name: ${formData.name}`,
          `   • ${formData.contactMethod === "email" ? "Email" : "Phone"}: ${formData.contact}`,
          "",
          "Product Information",
          `   • Product: ${productLabel}`,
          "",
          formData.notes?.trim() ? "Additional Notes" : "",
          formData.notes?.trim() ? `   • ${formData.notes.trim()}` : "",
          "",
          "----------------------------------------",
          `Submitted On: ${new Date().toLocaleString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}`,
        ]
          .filter(Boolean)
          .join("\n");

        const url = `https://wa.me/${toNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank", "noopener,noreferrer");
      } else {
        const response = await fetch("/api/quote-request", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setIsSubmitted(true);
          setTimeout(() => {
            setIsOpen(false);
            setIsSubmitted(false);
            setFormData({
              name: "",
              contactMethod: "phone",
              contact: "",
              product: product || "",
              notes: "",
            });
          }, 2000);
        } else {
          throw new Error("failed to submit quote request");
        }
      }
    } catch (error) {
      console.error("Error submitting quote request:", error);
      alert("There was an error submitting your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof QuoteFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setIsSubmitted(false);
      setFormData({
        name: "",
        contactMethod: "phone",
        contact: "",
        product: product || "",
        notes: "",
      });
    }
  };

  const Form = (
    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
      <div>
        <Input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          placeholder="Your full name"
          required
          className={`w-full text-base sm:text-sm ${colorClass.focus}`}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <Select
          value={formData.contactMethod}
          onValueChange={(value: "phone" | "email") => handleInputChange("contactMethod", value)}
        >
          <SelectTrigger className="w-full sm:w-fit shadow-none border-slate-300 text-base sm:text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="phone">Phone</SelectItem>
            <SelectItem value="email">Email</SelectItem>
          </SelectContent>
        </Select>

        <Input
          id="contact"
          type={formData.contactMethod === "phone" ? "tel" : "email"}
          value={formData.contact}
          onChange={(e) => handleInputChange("contact", e.target.value)}
          placeholder={formData.contactMethod === "phone" ? "+91 9876543210" : "your@email.com"}
          required
          className={`w-full text-base sm:text-sm ${colorClass.focus}`}
        />
      </div>

      {!product && (
        <div>
          <Select
            value={formData.product}
            onValueChange={(value) => handleInputChange("product", value)}
            disabled={!!product}
          >
            <SelectTrigger className="w-full shadow-none border-slate-300 text-base sm:text-sm">
              <SelectValue placeholder="Select a product or service" />
            </SelectTrigger>
            <SelectContent>
              {PRODUCT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {product && (
            <p className="text-xs text-gray-500 mt-1">Pre-selected from the product page</p>
          )}
        </div>
      )}

      <div>
        <textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => handleInputChange("notes", e.target.value)}
          placeholder="Tell us about your specific requirements, quantities, timelines, etc."
          rows={4}
          className={`w-full rounded-md border border-slate-300 bg-background px-3 py-2.5 sm:py-2 text-base sm:text-sm transition-colors placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-[3px] focus:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 resize-none ${colorClass.focus}`}
        />
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-3 sm:pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsOpen(false)}
          disabled={isSubmitting}
          className="w-full sm:w-auto touch-manipulation min-h-[44px] sm:min-h-0"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting || !formData.name || !formData.contact || !formData.product}
          className={`w-full sm:w-auto ${colorClass.button} text-white touch-manipulation min-h-[44px] sm:min-h-0`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {mode === "whatsapp" ? "Opening WhatsApp..." : "Submitting..."}
            </>
          ) : (
            <>
              {mode === "whatsapp" ? "Send on WhatsApp" : "Submit Request"}
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  );

  if (!useModal) {
    return (
      <div className={className}>
        <h3 className="text-lg font-semibold mb-2">Request a Quote</h3>
        {isSubmitted ? (
          <p className="text-green-600">Your quote has been submitted successfully.</p>
        ) : (
          Form
        )}
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <div className={className}>{children}</div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Thank You!</DialogTitle>
            <DialogDescription>
              Your quote request has been submitted successfully.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <div className={className}>{children}</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Request a Quote</DialogTitle>
          <DialogDescription>
            Tell us about your requirements and we&apos;ll get back to you with a detailed quote.
          </DialogDescription>
        </DialogHeader>
        {Form}
      </DialogContent>
    </Dialog>
  );
}
