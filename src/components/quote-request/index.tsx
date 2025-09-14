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

interface QuoteRequestProps {
  children: React.ReactNode;
  product?: string;
  colorScheme?: "green" | "blue";
  className?: string;
  useModal?: boolean; // new prop
}

interface QuoteFormData {
  name: string;
  contactMethod: "phone" | "email";
  contact: string;
  product: string;
  notes: string;
}

const PRODUCT_OPTIONS = [
  { value: "paper-scrap", label: "Paper Scrap Recycling" },
  { value: "plastic-scrap", label: "Plastic Scrap Recycling" },
  { value: "metal-scrap", label: "Metal Scrap Recycling" },
  { value: "cfc-packaging", label: "CFC Packaging Solutions" },
  { value: "thermal-packaging", label: "Thermal Packaging" },
  { value: "custom-packaging", label: "Custom Packaging Solutions" },
  { value: "other", label: "Other" },
];

export function QuoteRequest({
  children,
  product,
  colorScheme = "blue",
  className,
  useModal = true,
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
      const response = await fetch("/api/quote-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
        throw new Error("Failed to submit quote request");
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          placeholder="Your full name"
          required
          className={`w-full ${colorClass.focus}`}
        />
      </div>

      <div className="flex flex-row gap-4">
        <Select
          value={formData.contactMethod}
          onValueChange={(value: "phone" | "email") => handleInputChange("contactMethod", value)}
        >
          <SelectTrigger className="w-fit shadow-none border-slate-300">
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
          className={`w-full  ${colorClass.focus}`}
        />
      </div>

      {!product && (
        <div>
          <Select
            value={formData.product}
            onValueChange={(value) => handleInputChange("product", value)}
            disabled={!!product}
          >
            <SelectTrigger className="w-full shadow-none border-slate-300">
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
          rows={3}
          className={`w-full rounded-md border border-slate-300 bg-background px-3 py-2 text-sm  transition-colors placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-[3px] focus:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 ${colorClass.focus}`}
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsOpen(false)}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting || !formData.name || !formData.contact || !formData.product}
          className={`${colorClass.button} text-white`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              Submit Request
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
