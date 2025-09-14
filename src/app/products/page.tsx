/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import Navbar from "@/components/navbar";
import FooterSection from "@/components/footer-section";
import { Container } from "@/components/ui/container";
import ProductCard from "@/components/scrap-and-packaging-section/product-card";
import { SCRAP_AND_PACKAGING_CONFIG } from "@/lib/config";
import { FileText, Recycle, Shield, Package, Snowflake, Globe, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function getIcon(name: string) {
  switch (name) {
    case "FileText":
      return <FileText className="h-4 w-4" />;
    case "Recycle":
      return <Recycle className="h-4 w-4" />;
    case "Shield":
      return <Shield className="h-4 w-4" />;
    case "Package":
      return <Package className="h-4 w-4" />;
    case "Snowflake":
      return <Snowflake className="h-4 w-4" />;
    case "Globe":
      return <Globe className="h-4 w-4" />;
    default:
      return <Package className="h-4 w-4" />;
  }
}

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const scrap = React.useMemo(
    () =>
      SCRAP_AND_PACKAGING_CONFIG.scrapMaterials.products.map((p: any) => ({
        ...p,
        icon: getIcon(p.icon),
        division: "recycling" as const,
      })),
    [],
  );

  const packaging = React.useMemo(
    () =>
      SCRAP_AND_PACKAGING_CONFIG.packagingProducts.products.map((p: any) => ({
        ...p,
        icon: getIcon(p.icon),
        division: "packaging" as const,
      })),
    [],
  );

  const all = React.useMemo(() => [...scrap, ...packaging], [scrap, packaging]);

  const [tab, setTab] = React.useState<"all" | "recycling" | "packaging">(() => {
    const t = (searchParams.get("tab") as "all" | "recycling" | "packaging") || "all";
    return t === "recycling" || t === "packaging" ? t : "all";
  });
  const [query, setQuery] = React.useState<string>(() => searchParams.get("q") ?? "");

  // Keep URL in sync with state
  React.useEffect(() => {
    const current = searchParams.toString();
    const params = new URLSearchParams(current);
    params.set("tab", tab);
    if (query) params.set("q", query);
    else params.delete("q");
    const next = params.toString();
    if (next !== current) {
      router.replace(`${pathname}?${next}`, { scroll: false });
    }
  }, [tab, query, router, pathname, searchParams]);

  // Respond to back/forward changes
  React.useEffect(() => {
    const t = searchParams.get("tab");
    const q = searchParams.get("q") ?? "";
    const normalized = t === "recycling" || t === "packaging" ? t : "all";
    if (normalized !== tab) setTab(normalized);
    if (q !== query) setQuery(q);
  }, [searchParams]); // eslint-disable-line react-hooks/exhaustive-deps

  const items = React.useMemo(() => {
    const base = tab === "all" ? all : tab === "recycling" ? scrap : packaging;
    const q = query.trim().toLowerCase();
    if (!q) return base;
    return base.filter((p: any) =>
      [p.title, p.subtitle, p.description, p.category]
        .filter(Boolean)
        .some((t: string) => String(t).toLowerCase().includes(q)),
    );
  }, [tab, query, all, scrap, packaging]);

  const { heading, subheading } = React.useMemo(() => {
    switch (tab) {
      case "recycling":
        return {
          heading: "Recycling Division",
          subheading: "All materials in our scrap trading portfolio.",
        };
      case "packaging":
        return {
          heading: "Packaging Division",
          subheading: "All products in our packaging catalog.",
        };
      default:
        return {
          heading: "All Products",
          subheading: "Browse our complete catalog across Recycling and Packaging.",
        };
    }
  }, [tab]);

  return (
    <div>
      <Navbar />
      <section className="py-16 lg:py-24">
        <Container>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">{heading}</h1>
          <p className="mt-3 text-muted-foreground">{subheading}</p>

          {/* Search + Tabs */}
          <div className="mt-6 flex flex-col gap-4">
            <div className="relative max-w-xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, categories…"
                className="pl-9"
                aria-label="Search products"
              />
            </div>

            <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
              <TabsList className="flex-wrap">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="recycling">Recycling</TabsTrigger>
                <TabsTrigger value="packaging">Packaging</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                <Grid items={items} />
              </TabsContent>
              <TabsContent value="recycling" className="mt-6">
                <Grid items={items} colorScheme="green" />
              </TabsContent>
              <TabsContent value="packaging" className="mt-6">
                <Grid items={items} colorScheme="blue" />
              </TabsContent>
            </Tabs>
          </div>
        </Container>
      </section>
      <FooterSection />
    </div>
  );
}

function Grid({ items, colorScheme }: { items: any[]; colorScheme?: "green" | "blue" }) {
  if (!items?.length) {
    return (
      <div className="rounded-2xl border bg-card p-10 text-center">
        <p className="text-base">No results</p>
        <p className="mt-1 text-sm text-muted-foreground">Try a different search.</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((product: any, i: number) => (
        <ProductCard
          key={`${product?.id ?? product?.title}-${i}`}
          {...product}
          colorScheme={colorScheme || (product.division === "recycling" ? "green" : "blue")}
        />
      ))}
    </div>
  );
}
