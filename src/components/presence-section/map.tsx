"use client";

import React, { useMemo, useRef, useState, useLayoutEffect } from "react";
import { Badge } from "@/components/ui/badge";

export type PresenceCategory = "plant" | "hq" | "other";

export type PresenceLocation = {
  id: string;
  name: string;
  state?: string;
  leftPct: number; // 0..100
  topPct: number; // 0..100
  category: PresenceCategory;
  label?: string;
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

  return (
    <section className={`w-full ${className ?? ""}`}>
      <div className="text-center mb-10">
        <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-800 px-3 py-1 text-xs font-medium">
          Our Reach
        </span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{title}</h2>
        <p className="mt-3 text-muted-foreground">
          Explore our locations across the country, from headquarters to manufacturing plants and
          regional hubs.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        {/* Map panel */}
        <div className="relative w-full">
          <div
            ref={viewportRef}
            className="relative w-full overflow-hidden rounded-2xl bg-slate-50  aspect-[16/10]"
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
                      className="absolute top-0 left-0 -translate-x-1/2 -translate-y-full"
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
        <aside className="self-start">
          <div className="space-y-4 rounded-2xl border border-slate-200 p-4 shadow-sm bg-white">
            {/* Legend */}
            <div>
              <div className="text-xs uppercase tracking-wider text-slate-500 mb-2">Legend</div>
              <div className="flex flex-wrap gap-3">
                {(["plant", "hq", "other"] as PresenceCategory[]).map((c) => (
                  <div key={c} className="flex items-center gap-2">
                    <span className={`inline-block h-3 w-3 rounded-sm ${CATEGORY_META[c].dot}`} />
                    <span className="text-sm font-medium">{CATEGORY_META[c].label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Details */}
            <div>
              <div className="text-xs uppercase tracking-wider text-slate-500 mb-2">Details</div>
              {active ? (
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge className={CATEGORY_META[active.category].pill}>
                      {CATEGORY_META[active.category].label}
                    </Badge>
                    <span className="text-sm font-medium">{active.name}</span>
                  </div>
                  {active.state && <div className="text-sm text-slate-600">{active.state}</div>}
                  {active.label && <div className="text-sm text-slate-500">{active.label}</div>}
                  <button
                    onClick={() => setActiveId(null)}
                    className="text-xs text-slate-500 hover:text-slate-700 underline"
                  >
                    Clear selection
                  </button>
                </div>
              ) : (
                <div className="text-sm text-slate-600">Select a marker to view details.</div>
              )}
            </div>

            {/* List */}
            <div>
              <div className="text-xs uppercase tracking-wider text-slate-500 mb-2">Locations</div>
              <div className="space-y-2">
                {locations.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => toggleActive(l.id)}
                    className={`w-full text-left rounded-xl border px-3 py-2 transition ${
                      activeId === l.id
                        ? "border-indigo-600 bg-indigo-50"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{l.name}</div>
                      <Badge className={`${CATEGORY_META[l.category].pill} border-none`}>
                        {CATEGORY_META[l.category].label}
                      </Badge>
                    </div>
                    {l.state && <div className="text-xs text-slate-600">{l.state}</div>}
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
    },
    {
      id: "nadiad",
      name: "Nadiad",
      state: "Gujarat",
      leftPct: 34.1,
      topPct: 49.6,
      category: "plant",
      label: "Formulations",
    },
    {
      id: "goa",
      name: "Goa",
      state: "Goa",
      leftPct: 35.2,
      topPct: 71,
      category: "plant",
      label: "APIs & Intermediates",
    },
    {
      id: "guwahati",
      name: "Guwahati",
      state: "Assam",
      leftPct: 67.4,
      topPct: 40,
      category: "plant",
      label: "Northeast Hub",
    },
  ];

  return (
    <main className="mx-auto max-w-7xl p-4 md:p-8">
      <PresenceMap
        title="Our Presence"
        backgroundSrc="/hero/india.svg"
        locations={locations}
        zoomScale={2}
      />
    </main>
  );
}
