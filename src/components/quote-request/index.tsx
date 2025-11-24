"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
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
import { ArrowRight, Loader2, Phone, Mail, MessageSquare, User, Package } from "lucide-react";
import { SCRAP_AND_PACKAGING_CONFIG, FOOTER_CONFIG } from "@/lib/config";
import { cn } from "@/lib/utils";

// --- Types ---
interface QuoteRequestProps {
  children: React.ReactNode;
  product?: string;
  colorScheme?: "green" | "blue";
  className?: string;
  useModal?: boolean;
  mode?: "submit" | "whatsapp";
}

interface QuoteFormData {
  name: string;
  contactMethod: "phone" | "email";
  contact: string;
  product: string;
  notes: string;
}

// --- Product Data ---
const PRODUCT_GROUPS = [
  {
    label: "Recycling Services",
    items: SCRAP_AND_PACKAGING_CONFIG.scrapMaterials.products.map((p) => ({
      value: p.slug || p.title,
      label: p.title,
    })),
  },
  {
    label: "Packaging Solutions",
    items: SCRAP_AND_PACKAGING_CONFIG.packagingProducts.products.map((p) => ({
      value: p.slug || p.title,
      label: p.title,
    })),
  },
];

export function QuoteRequest({
  children,
  product,
  colorScheme = "green",
  className,
  useModal = true,
  mode = "whatsapp",
}: QuoteRequestProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [formData, setFormData] = React.useState<QuoteFormData>({
    name: "",
    contactMethod: "phone",
    contact: "",
    product: product || "",
    notes: "",
  });

  // --- Handlers ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.contact || !formData.product) return;

    setIsSubmitting(true);

    try {
      if (mode === "whatsapp") {
        const toNumber = FOOTER_CONFIG.contact.phone.replace(/[^0-9]/g, "");

        // Clean Product Label
        let productLabel = PRODUCT_GROUPS.flatMap((g) => g.items).find(
          (p) => p.value === formData.product,
        )?.label;
        if (!productLabel) productLabel = formData.product; // Fallback

        const message = [
          `*New Inquiry*`,
          `👤 ${formData.name}`,
          `📞 ${formData.contact} (${formData.contactMethod})`,
          `📦 ${productLabel}`,
          formData.notes ? `📝 ${formData.notes}` : "",
        ]
          .filter(Boolean)
          .join("\n");

        const url = `https://wa.me/${toNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank", "noopener,noreferrer");

        setTimeout(() => setIsOpen(false), 1000);
      }
      // Add API logic here if needed later
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open && !product) {
      setTimeout(() => setFormData((prev) => ({ ...prev, product: "" })), 300);
    }
  };

  // --- Theme Colors ---
  const activeColor = colorScheme === "green" ? "text-primary-600" : "text-secondary-600";
  const buttonColor =
    colorScheme === "green"
      ? "bg-primary-600 hover:bg-primary-700"
      : "bg-secondary-600 hover:bg-secondary-700";

  // --- Form UI ---
  const FormContent = (
    <form onSubmit={handleSubmit} className="space-y-5  w-full pt-2">
      {/* Name Field */}
      <div className="space-y-2">
        <Label htmlFor="name">Name / Company</Label>
        <div className="relative">
          <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="name"
            placeholder="John Doe"
            className="pl-9"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
      </div>

      {/* Contact Field (Split) */}
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-1 space-y-2">
          <Label>Type</Label>
          <Select
            value={formData.contactMethod}
            onValueChange={(val: "phone" | "email") =>
              setFormData({ ...formData, contactMethod: val })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="phone">Phone</SelectItem>
              <SelectItem value="email">Email</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-2 space-y-2">
          <Label htmlFor="contact">Contact Details</Label>
          <div className="relative">
            {formData.contactMethod === "phone" ? (
              <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            ) : (
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            )}
            <Input
              id="contact"
              type={formData.contactMethod === "phone" ? "tel" : "email"}
              placeholder={
                formData.contactMethod === "phone" ? "+91 98765 43210" : "john@company.com"
              }
              className="pl-9"
              required
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Product Selector */}
      <div className="space-y-2">
        <Label>Interested In</Label>
        {product ? (
          <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-md border border-border/50 text-sm text-foreground font-medium">
            <Package className={cn("w-4 h-4", activeColor)} />
            {product}
          </div>
        ) : (
          <Select
            value={formData.product}
            onValueChange={(val) => setFormData({ ...formData, product: val })}
          >
            <SelectTrigger className="pl-3">
              <SelectValue placeholder="Select a product..." />
            </SelectTrigger>
            <SelectContent>
              {PRODUCT_GROUPS.map((group) => (
                <SelectGroup key={group.label}>
                  <SelectLabel className="pl-2 py-1.5 text-xs font-bold text-muted-foreground uppercase tracking-wider bg-muted/30">
                    {group.label}
                  </SelectLabel>
                  {group.items.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes">
          Message <span className="text-muted-foreground font-normal">(Optional)</span>
        </Label>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Textarea
            id="notes"
            placeholder="E.g. Quantity, delivery location..."
            className="pl-9 min-h-[80px] resize-none"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />
        </div>
      </div>

      <Button
        type="submit"
        className={cn("w-full font-bold text-base h-11 mt-2", buttonColor)}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
          </>
        ) : (
          <>
            Get Quote <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );

  if (!useModal) return <div className={className}>{FormContent}</div>;

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <div className={cn("cursor-pointer", className)}>{children}</div>
      </DialogTrigger>
      <DialogContent className=" p-6 gap-0">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-xl font-bold">Get a Quote</DialogTitle>
          <DialogDescription>
            Fill out the form below and we'll get back to you shortly.
          </DialogDescription>
        </DialogHeader>
        {FormContent}
      </DialogContent>
    </Dialog>
  );
}
