"use client";

import React, { useMemo, useRef, useState, useLayoutEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Share2, X } from "lucide-react";

export type PresenceCategory = "plant" | "hq" | "other";

export type PresenceLocation = {
  id: string;
  name: string;
  state?: string;
  leftPct: number; // 0..100
  topPct: number; // 0..100
  category: PresenceCategory;
  label?: string;
  address?: string;
};

const CATEGORY_META: Record<
  PresenceCategory,
  { label: string; dot: string; pin: string; pill: string }
> = {
  plant: {
    label: "Plant",
    dot: "bg-indigo-700",
    pin: "text-indigo-700",
    pill: "bg-indigo-700 text-white",
  },
  hq: {
    label: "Head Office",
    dot: "bg-amber-500",
    pin: "text-amber-500",
    pill: "bg-amber-500 text-white",
  },
  other: {
    label: "Other",
    dot: "bg-slate-600",
    pin: "text-slate-600",
    pill: "bg-slate-600 text-white",
  },
};

function SvgPin({ kind }: { kind: PresenceCategory }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      className={`h-5 w-5 ${CATEGORY_META[kind].pin}`}
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7"
      ></path>
    </svg>
  );
}

type PresenceMapProps = {
  title?: string;
  backgroundSrc: string;
  locations: PresenceLocation[];
  className?: string;
  mapTintClass?: string;
  /** Zoom factor when a plant is active */
  zoomScale?: number; // default 2
};

export function PresenceMap({
  title = "Our Presence",
  backgroundSrc,
  locations,
  className,
  mapTintClass = "bg-blue-200 dark:bg-slate-300",
  zoomScale = 2,
}: PresenceMapProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const active = locations.find((l) => l.id === activeId) ?? null;

  // Container for the map viewport (the element with fixed aspect ratio)
  const viewportRef = useRef<HTMLDivElement | null>(null);

  // Set client-side flag
  useLayoutEffect(() => {
    setIsClient(true);
  }, []);

  // Compute transform to center the active location and zoom.
  const transformStyle = useMemo(() => {
    if (!active || !viewportRef.current || !isClient) {
      return {
        transform: "translate3d(0,0,0) scale(1)",
      } as React.CSSProperties;
    }
    const el = viewportRef.current;
    const rect = el.getBoundingClientRect();
    const vw = rect.width;
    const vh = rect.height;

    // Account for padding in the inner content (p-4 md:p-6)
    const padding = window.innerWidth >= 768 ? 24 : 16; // 6 * 4px = 24px, 4 * 4px = 16px
    const contentWidth = vw - padding * 2;
    const contentHeight = vh - padding * 2;

    // Target position of the pin anchor (in px) inside the inner content
    const targetX = (active.leftPct / 100) * contentWidth + padding;
    const targetY = (active.topPct / 100) * contentHeight + padding;

    // We scale the entire content around the origin (0,0). To keep the target
    // centered after scaling, compute translation so that the scaled point lands at viewport center.
    const s = zoomScale;
    const centerX = vw;
    const centerY = vh;

    // After scaling, the point moves to (targetX*s, targetY*s).
    // We need translation (tx, ty) so that: targetX*s + tx = centerX, same for Y.
    const tx = centerX - targetX * s;
    const ty = centerY - targetY * s;

    return {
      transform: `translate3d(${tx}px, ${ty}px, 0) scale(${s})`,
    } as React.CSSProperties;
  }, [active, zoomScale, isClient]);

  // Ensure transform recalculates on resize
  useLayoutEffect(() => {
    if (!isClient) return;

    const onResize = () => {
      // Trigger recompute by updating state via a no-op (force re-render)
      setActiveId((prev) => (prev === null ? null : prev));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [isClient]);

  const toggleActive = (id: string) => setActiveId((prev) => (prev === id ? null : id));

  // Format address to sentence case
  const formatAddress = (address: string): string => {
    return address
      .toLowerCase()
      .split(/[,\s]+/)
      .map((word) => {
        // Capitalize first letter of each word, but handle special cases
        if (word === "no" || word === "no.") return word.toUpperCase();
        if (word === "opp" || word === "p.o") return word.toUpperCase();
        if (word.match(/^\d+[a-z]?$/)) return word.toUpperCase(); // Plot numbers
        if (word.match(/^\d+$/)) return word; // PIN codes stay as is
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ")
      .replace(/\s+/g, " ")
      .replace(/,\s*/g, ", ")
      .trim();
  };

  // Generate Google Maps URL
  const getGoogleMapsUrl = (location: PresenceLocation): string => {
    const query = location.address
      ? encodeURIComponent(`${location.address}, ${location.state || ""}`)
      : encodeURIComponent(`${location.name}, ${location.state || ""}`);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  };

  // Share location
  const handleShare = async (location: PresenceLocation) => {
    const shareData = {
      title: `${location.name} - ${location.state || ""}`,
      text: location.address || `${location.name}, ${location.state || ""}`,
      url: getGoogleMapsUrl(location),
    };

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(
          `${shareData.title}\n${shareData.text}\n${shareData.url}`
        );
        // You could show a toast notification here
      }
    } catch (error) {
      // User cancelled or error occurred
      console.error("Error sharing:", error);
    }
  };

  return (
    <section className={`w-full ${className ?? ""}`}>
      <div className="text-center mb-10">
        <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-800 px-3 py-1 text-xs font-medium">
          Our Reach
        </span>
        <h2 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">{title}</h2>
        <p className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground">
          Explore our locations across the country, from headquarters to manufacturing plants and
          regional hubs.
        </p>
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1fr_300px]">
        {/* Map panel */}
        <div className="relative w-full">
          <div
            ref={viewportRef}
            className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl bg-slate-50 shadow-lg border border-slate-200 aspect-[16/10] sm:aspect-[16/10]"
            aria-label="Presence map"
            onClick={(e) => {
              // Only clear selection if clicking on the background container itself
              if (e.target === e.currentTarget) {
                setActiveId(null);
              }
            }}
          >
            {/* Inner content that gets translated + scaled */}
            <div
              className="absolute inset-0 will-change-transform transition-transform duration-500 ease-out"
              style={transformStyle}
            >
              {/* Masked background */}
              <div className="absolute inset-0 p-4 md:p-6">
                <div
                  className={`h-full w-full ${mapTintClass}`}
                  style={{
                    WebkitMaskImage: `url(${backgroundSrc})`,
                    maskImage: `url(${backgroundSrc})`,
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskSize: "contain",
                    maskSize: "contain",
                    WebkitMaskPosition: "center",
                    maskPosition: "center",
                  }}
                />
              </div>

              {/* Pins + labels */}
              {locations.map((loc) => {
                const left = `${loc.leftPct}%`;
                const top = `${loc.topPct}%`;
                return (
                  <div key={loc.id} className="absolute" style={{ left, top }}>
                    <button
                      onClick={() => toggleActive(loc.id)}
                      className="absolute top-0 left-0 -translate-x-1/2 -translate-y-full touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center p-2 -m-2 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 focus-visible:z-30"
                      aria-label={loc.name}
                    >
                      <SvgPin kind={loc.category} />
                    </button>

                    {/* label to the right of the anchor, not affecting pin */}
                    <Badge
                      className={`absolute top-0 left-0 -translate-y-full translate-x-3 text-xs ${
                        CATEGORY_META[loc.category].dot
                      } px-2 rounded-md pointer-events-none whitespace-nowrap`}
                    >
                      {loc.name}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="self-start order-first lg:order-last">
          <div className="space-y-4 sm:space-y-5 rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm bg-white">
            {/* Legend */}
            <div>
              <div className="text-xs uppercase tracking-wider text-slate-500 mb-3 font-semibold">
                Legend
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {(["plant", "hq", "other"] as PresenceCategory[]).map((category) => (
                  <div key={category} className="flex items-center gap-1.5 sm:gap-2">
                    <span
                      className={`inline-block h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-sm ${CATEGORY_META[category].dot}`}
                    />
                    <span className="text-xs sm:text-sm font-medium text-slate-700">
                      {CATEGORY_META[category].label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Details */}
            <div>
              <div className="text-xs uppercase tracking-wider text-slate-500 mb-3 font-semibold">
                Details
              </div>
              {active ? (
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className={CATEGORY_META[active.category].pill}>
                          {CATEGORY_META[active.category].label}
                        </Badge>
                        <span className="text-base font-semibold text-slate-900">{active.name}</span>
                      </div>
                      {active.label && (
                        <div className="text-sm font-medium text-slate-700">{active.label}</div>
                      )}
                      {active.state && (
                        <div className="flex items-center gap-1.5 text-sm text-slate-600">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>{active.state}</span>
                        </div>
                      )}
                      {active.address && (
                        <div className="text-sm text-slate-600 leading-relaxed pt-1 border-t border-slate-100">
                          {formatAddress(active.address)}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => setActiveId(null)}
                      className="p-2 sm:p-1.5 hover:bg-slate-100 active:bg-slate-200 rounded-md transition-colors touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                      aria-label="Close details"
                    >
                      <X className="h-4 w-4 sm:h-4 sm:w-4 text-slate-500" />
                    </button>
                  </div>
                  <div className="flex gap-2 sm:gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs sm:text-xs touch-manipulation min-h-[44px]"
                      onClick={() => window.open(getGoogleMapsUrl(active), "_blank")}
                    >
                      <MapPin className="h-3.5 w-3.5 sm:h-3.5 sm:w-3.5" />
                      <span className="hidden sm:inline">View on Maps</span>
                      <span className="sm:hidden">Maps</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs touch-manipulation min-w-[44px] min-h-[44px]"
                      onClick={() => handleShare(active)}
                      aria-label="Share location"
                    >
                      <Share2 className="h-3.5 w-3.5 sm:h-3.5 sm:w-3.5" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-slate-500 italic py-2">
                  Select a marker to view details.
                </div>
              )}
            </div>

            {/* List */}
            <div>
              <div className="text-xs uppercase tracking-wider text-slate-500 mb-3 font-semibold">
                All Locations
              </div>
              <div className="space-y-2 sm:space-y-2">
                {locations.map((location) => (
                  <button
                    key={location.id}
                    onClick={() => toggleActive(location.id)}
                    className={`w-full text-left rounded-lg sm:rounded-xl border px-3 sm:px-3 py-3 sm:py-2.5 transition-all touch-manipulation min-h-[56px] sm:min-h-0 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${
                      activeId === location.id
                        ? "border-indigo-600 bg-indigo-50 shadow-sm"
                        : "border-slate-200 hover:bg-slate-50 active:bg-slate-100 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm sm:text-sm text-slate-900">{location.name}</div>
                        {location.state && (
                          <div className="text-xs text-slate-600 mt-0.5">{location.state}</div>
                        )}
                      </div>
                      <Badge
                        className={`${CATEGORY_META[location.category].pill} border-none shrink-0 text-xs`}
                      >
                        {CATEGORY_META[location.category].label}
                      </Badge>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

/** Example page */
export default function PresencePage() {
  const locations: PresenceLocation[] = [
    {
      id: "vapi-hq",
      name: "Vapi",
      state: "Gujarat",
      leftPct: 33.6,
      topPct: 56.3,
      category: "hq",
      label: "Corporate HQ",
      address: "Plot No. 57/A/1 & 2, 1st Phase Industrial Road, G.I.D.C., Vapi - 396 195, Gujarat",
    },
    {
      id: "nadiad",
      name: "Nadiad",
      state: "Gujarat",
      leftPct: 34.1,
      topPct: 49.6,
      category: "plant",
      label: "Formulations",
      address: "R. S. No 139 NA, B/h ITC Limited Silod, Nadiad, Kheda-387320, Gujarat",
    },
    {
      id: "goa",
      name: "Goa",
      state: "Goa",
      leftPct: 35.2,
      topPct: 71,
      category: "plant",
      label: "APIs & Intermediates",
      address: "Plot No. 51 A, Kundaim Industrial Estate, Kundaim, North Goa, Goa 403115",
    },
    {
      id: "guwahati",
      name: "Guwahati",
      state: "Assam",
      leftPct: 67.4,
      topPct: 40,
      category: "plant",
      label: "Northeast Hub",
      address: "Plot No. 25/26, AIIDC IGC Phase 1, Chattabari Chaygoan, P.O. Bipra, Kamrup, Assam 781123",
    },
    {
      id: "tamil-nadu",
      name: "Tiruvallur",
      state: "Tamil Nadu",
      leftPct: 38.5,
      topPct: 75.2,
      category: "plant",
      label: "Manufacturing Plant",
      address: "Plot No. 116 & 117, Sri Saibaba Nagar, Vengal, Tiruvallur, Tamil Nadu 601103",
    },
  ];

  return (
    <main className="mx-auto max-w-7xl pt-24 pb-16 px-4 md:pt-28 md:pb-24 md:px-8">
      <PresenceMap
        title="Our Presence"
        backgroundSrc="/hero/india.svg"
        locations={locations}
        zoomScale={2}
      />
    </main>
  );
}
