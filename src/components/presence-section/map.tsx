"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Building2, Crosshair, Minimize2 } from "lucide-react";
import { Container } from "../ui/container";
import { SectionHeader } from "../ui/section-header";
import { cn } from "@/lib/utils";

// --- Types ---
export type PresenceCategory = "plant" | "hq" | "office";

export type PresenceLocation = {
  id: string;
  name: string;
  state: string;
  top: number; // Percentage from top (0-100)
  left: number; // Percentage from left (0-100)
  category: PresenceCategory;
  label?: string;
  address?: string;
};

// --- Config (Strictly Green/Emerald Theme as requested) ---
const CATEGORY_META: Record<
  PresenceCategory,
  { label: string; color: string; bg: string; border: string; pinColor: string }
> = {
  plant: {
    label: "Plants",
    color: "text-primary-600",
    bg: "bg-primary-50",
    border: "border-primary-200",
    pinColor: "#10b981", // primary-500
  },
  hq: {
    label: "Headquarters",
    color: "text-secondary-600",
    bg: "bg-secondary-50",
    border: "border-secondary-200",
    pinColor: "#3b82f6", // secondary-500
  },
  office: {
    label: "Regional Hub",
    color: "text-primary-700",
    bg: "bg-primary-50",
    border: "border-primary-200",
    pinColor: "#059669", // primary-600
  },
};

// --- Map Pin Component ---
function MapPinMarker({
  kind,
  label,
  isActive,
  onClick,
}: {
  kind: PresenceCategory;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  const meta = CATEGORY_META[kind];

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      // FIX: High Z-index (50) when active prevents it from being covered by other pins
      className={cn(
        "absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group",
        isActive ? "z-50" : "z-10 hover:z-40",
      )}
    >
      {/* Pulse Ring */}
      <div
        className={cn(
          "absolute inset-0 rounded-full opacity-20 animate-ping",
          isActive ? "bg-current" : "hidden",
        )}
        style={{ color: meta.pinColor, width: "250%", height: "250%", margin: "-75%" }}
      />

      {/* Pin Body */}
      <div
        className={cn(
          "relative flex items-center justify-center transition-all duration-300 shadow-md",
          isActive ? "w-8 h-8 scale-110" : "w-4 h-4 hover:w-6 hover:h-6",
        )}
      >
        <div
          className="w-full h-full rounded-full border-2 border-white transition-colors"
          style={{ backgroundColor: meta.pinColor }}
        />
        {isActive && <div className="absolute w-2.5 h-2.5 bg-white rounded-full" />}
      </div>

      {/* Tooltip Label */}
      <div
        className={cn(
          "absolute left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide rounded shadow-sm pointer-events-none transition-all whitespace-nowrap border backdrop-blur-sm",
          isActive
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0",
          meta.bg,
          meta.color,
          meta.border,
        )}
      >
        {label}
      </div>
    </div>
  );
}

// --- Main Component ---
type PresenceMapProps = {
  backgroundSrc: string;
  locations: PresenceLocation[];
  debug?: boolean;
};

export function PresenceMap({ backgroundSrc, locations, debug = false }: PresenceMapProps) {
  const [activeId, setActiveId] = useState<string>(locations[0]?.id);
  const [isZoomed, setIsZoomed] = useState(false); // New state for zoom
  const mapRef = useRef<HTMLDivElement>(null);

  const active = locations.find((l) => l.id === activeId) || locations[0];

  const handlePinClick = (id: string) => {
    setActiveId(id);
    setIsZoomed(true); // Trigger zoom when a pin is clicked
    const el = document.getElementById(`loc-item-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  // Reset zoom when clicking outside or on button
  const handleResetView = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsZoomed(false);
  };

  const handleMapClick = (e: React.MouseEvent) => {
    // If already zoomed, reset view on map click? Optional.
    // For now, let's keep debug logic
    if (!debug || !mapRef.current) return;
    const rect = mapRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const leftPct = (x / rect.width) * 100;
    const topPct = (y / rect.height) * 100;
    const coordsText = `top: ${topPct.toFixed(1)}, left: ${leftPct.toFixed(1)}`;
    navigator.clipboard.writeText(coordsText);
    alert(`Copied: ${coordsText}`);
  };

  return (
    <section className="bg-background py-16 lg:py-24">
      <Container>
        <SectionHeader
          badge={{
            text: "Our Reach",
            className: "bg-primary-100 text-primary-800 border-primary-200",
          }}
          title="Strategic Industrial Footprint"
          description="Our integrated manufacturing and logistics network ensures rapid delivery across the country."
        />

        {/* Layout:
           On Desktop: Grid 1fr (Map) _ 380px (List)
           On Mobile: Flex Col.
           The height is controlled to ensure map isn't tiny.
        */}
        <div className="grid lg:grid-cols-[1fr_380px] gap-0 rounded-2xl border border-primary-100/50 bg-white shadow-xl overflow-hidden">
          {/* ==================== LEFT: MAP VIEW ==================== */}
          <div className="relative bg-slate-50/30 overflow-hidden flex items-center justify-center group border-b lg:border-b-0 lg:border-r border-primary-100 min-h-[400px] lg:min-h-[600px]">
            {/* Tech Grid Background */}
            <div
              className="absolute inset-0 opacity-[0.3] pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(#065f46 1px, transparent 1px)`,
                backgroundSize: "30px 30px",
              }}
            />

            {/* Reset Zoom Button (Visible when zoomed) */}
            <div
              className={cn(
                "absolute top-4 right-4 z-[60] transition-opacity duration-300",
                isZoomed ? "opacity-100" : "opacity-0 pointer-events-none",
              )}
            >
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/90 shadow-sm text-xs border border-primary-100 text-primary-800 hover:bg-primary-50"
                onClick={handleResetView}
              >
                <Minimize2 className="w-3 h-3 mr-1" /> Reset View
              </Button>
            </div>

            {/* MAP WRAPPER
               1. Uses aspect-ratio to ensure coordinates (top/left %) NEVER shift regardless of screen size.
               2. Handles the 3x Scale Transform.
               3. Transforms origin based on the ACTIVE PIN location.
            */}
            <div
              ref={mapRef}
              className="relative w-full max-w-[800px] aspect-[1.4/1] transition-transform duration-700 ease-in-out will-change-transform"
              onClick={handleMapClick}
              style={{
                transform: isZoomed ? "scale(1.5)" : "scale(1)",
                // Crucial: This centers the zoom exactly on the active pin
                transformOrigin: `${active.left}% ${active.top}%`,
              }}
            >
              <img
                src={backgroundSrc}
                alt="Map"
                className="w-full h-full object-contain"
                style={{ color: "#1F4FE0" }}
              />

              {locations.map((loc) => (
                <div
                  key={loc.id}
                  style={{ top: `${loc.top}%`, left: `${loc.left}%` }}
                  className="absolute w-0 h-0"
                >
                  <MapPinMarker
                    kind={loc.category}
                    label={loc.name}
                    isActive={activeId === loc.id}
                    onClick={() => handlePinClick(loc.id)}
                  />
                </div>
              ))}

              {/* Debug Overlay */}
              {debug && (
                <div className="absolute top-4 left-4 bg-red-100 text-red-600 px-2 py-1 text-xs font-mono border border-red-200 rounded z-50">
                  <Crosshair className="w-3 h-3 inline mr-1" /> Debug Mode
                </div>
              )}
            </div>
          </div>

          {/* ==================== RIGHT: LIST VIEW ==================== */}
          <div className="flex flex-col bg-white h-[400px] lg:h-auto">
            {/* Header */}
            <div className="p-5 border-b border-primary-100 bg-primary-50/30">
              <h3 className="text-xs font-bold text-primary-800 uppercase tracking-widest flex items-center gap-2">
                <Navigation className="w-3.5 h-3.5" /> Locations ({locations.length})
              </h3>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-primary-100">
              {locations.map((loc) => {
                const isActive = activeId === loc.id;
                const meta = CATEGORY_META[loc.category];

                return (
                  <div
                    key={loc.id}
                    id={`loc-item-${loc.id}`}
                    onClick={() => handlePinClick(loc.id)}
                    className={cn(
                      "px-5 py-4 cursor-pointer border-b border-slate-50 transition-all duration-200 group",
                      isActive
                        ? "bg-primary-50/60 border-l-4 border-l-primary-600"
                        : "hover:bg-slate-50 border-l-4 border-l-transparent",
                    )}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center gap-2">
                        <h4
                          className={cn(
                            "font-bold text-sm",
                            isActive ? "text-primary-900" : "text-slate-700",
                          )}
                        >
                          {loc.name}
                        </h4>
                        <span
                          className={cn(
                            "text-[9px] px-1.5 py-0.5 rounded font-medium uppercase tracking-wide border",
                            meta.bg,
                            meta.color,
                            meta.border,
                          )}
                        >
                          {meta.label}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 font-medium mb-2 ml-0.5">
                      {loc.state}, India
                    </p>

                    <div
                      className={cn(
                        "grid transition-all duration-300 ease-in-out overflow-hidden",
                        isActive ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <div className="min-h-0 space-y-3">
                        <div className="flex gap-3 items-start p-3 rounded-lg bg-white border border-primary-100/50 shadow-sm">
                          <Building2 className="w-3.5 h-3.5 text-primary-600 mt-0.5 shrink-0" />
                          <p className="text-[11px] text-slate-600 leading-relaxed">
                            {loc.address || "Address details available on request."}
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="w-full h-8 text-xs bg-primary-700 hover:bg-primary-800 text-white shadow-sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(
                                `http://googleusercontent.com/maps.google.com/2{loc.address}`,
                                "_blank",
                              );
                            }}
                          >
                            <MapPin className="w-3 h-3 mr-1.5" /> Get Directions
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
export default function PresencePage() {
  const locations: PresenceLocation[] = [
    {
      id: "vapi-hq",
      name: "Vapi",
      state: "Gujarat",
      top: 56.9,
      left: 31.4,
      category: "hq",
      label: "Corporate HQ",
      address: "Plot No. 57/A/1 & 2, 1st Phase Industrial Road, G.I.D.C., Vapi - 396 195, Gujarat",
    },
    {
      id: "nadiad",
      name: "Nadiad",
      state: "Gujarat",
      top: 49.9,
      left: 30.6,
      category: "plant",
      label: "Formulations",
      address: "R. S. No 139 NA, B/h ITC Limited Silod, Nadiad, Kheda-387320, Gujarat",
    },
    {
      id: "goa",
      name: "Goa",
      state: "Goa",
      top: 71.4,
      left: 32.4,
      category: "plant",
      label: "APIs & Intermediates",
      address: "Plot No. 51 A, Kundaim Industrial Estate, Kundaim, North Goa, Goa 403115",
    },
    {
      id: "guwahati",
      name: "Guwahati",
      state: "Assam",
      top: 38.3,
      left: 70.4,
      category: "plant",
      label: "Northeast Hub",
      address:
        "Plot No. 25/26, AIIDC IGC Phase 1, Chattabari Chaygoan, P.O. Bipra, Kamrup, Assam 781123",
    },
    {
      id: "tamil-nadu",
      name: "Tiruvallur",
      state: "Tamil Nadu",
      top: 82.1,
      left: 43.0,
      category: "plant",
      label: "Manufacturing Plant",
      address: "Plot No. 116 & 117, Sri Saibaba Nagar, Vengal, Tiruvallur, Tamil Nadu 601103",
    },
  ];

  return (
    <main className="mx-auto max-w-7xl pt-24 pb-16 px-4 md:pt-28 md:pb-24 md:px-8">
      <PresenceMap backgroundSrc="/hero/india.svg" locations={locations} />
    </main>
  );
}
