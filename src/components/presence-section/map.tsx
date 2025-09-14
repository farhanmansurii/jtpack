"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type Location = {
  id: string;
  name: string;
  x: number; // SVG percentage coordinates
  y: number;
  type: "plant" | "hq";
};

const LOCATIONS: Location[] = [
  { id: "nadiad", name: "Nadiad", x: 34, y: 44, type: "plant" },
  { id: "vapi", name: "Vapi (HQ)", x: 33, y: 50, type: "hq" },
  { id: "goa", name: "Goa", x: 30, y: 58, type: "plant" },
  { id: "guwahati", name: "Guwahati", x: 82, y: 35, type: "plant" },
];

export default function IndiaPresenceSVG() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Card className="w-full border-none shadow-none">
      <CardContent className="flex flex-col items-center gap-6 p-6">
        <h2 className="text-3xl font-semibold">Our Presence</h2>

        <div className="relative w-full max-w-4xl">
          <div className="relative">
            {/* India SVG as background */}
            <Image
              src="/hero/india.svg"
              alt="India Map"
              width={611}
              height={696}
              className="w-full h-auto rounded-2xl border text-blue-50"
            />

            {/* Location markers overlaid on the SVG */}
            <div className="absolute inset-0">
              {LOCATIONS.map((loc) => (
                <div
                  key={loc.id}
                  className="absolute cursor-pointer"
                  style={{
                    left: `${loc.x}%`,
                    top: `${loc.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  onClick={() => setSelected(loc.id)}
                >
                  <div
                    className={`w-3 h-3 rounded-full border-2 border-white shadow-lg ${
                      loc.type === "hq" ? "bg-[#f59e0b]" : "bg-[#3b3b6d]"
                    }`}
                  />
                  {selected === loc.id && (
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-slate-700 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      {loc.name}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-sm bg-[#3b3b6d]" />
            <span className="text-sm text-muted-foreground">Our Plants</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-sm bg-[#f59e0b]" />
            <span className="text-sm text-muted-foreground">Our Head Office</span>
          </div>
        </div>

        {selected && (
          <Badge variant="secondary" className="mt-2">
            Selected: {LOCATIONS.find((l) => l.id === selected)?.name}
          </Badge>
        )}
      </CardContent>
    </Card>
  );
}
