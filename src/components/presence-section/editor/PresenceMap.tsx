import { useState, useMemo } from "react";
import { Location } from "@/types/location";
import { LocationDetails } from "./LocationDetails";
import { LocationList } from "./LocationList";
import { MapLegend } from "./MapLegend";
import { EditMode } from "./EditMode";
import { SvgPin } from "./SvgPin";
import { Button } from "@/components/ui/button";
import { Edit, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface PresenceMapProps {
  locations: Location[];
  editable?: boolean;
}

export const PresenceMap = ({ locations, editable = false }: PresenceMapProps) => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [zoomLocation, setZoomLocation] = useState<Location | null>(null);
  const [isEditMode, setIsEditMode] = useState(editable);
  const [tempLocation, setTempLocation] = useState<{ x: number; y: number } | null>(null);
  const [editingLocations, setEditingLocations] = useState<Location[]>(locations);

  const SVG_WIDTH = 611.86;
  const SVG_HEIGHT = 695.70;

  // Convert percentage coordinates to pixel coordinates
  const convertToPixelCoords = (location: Location) => {
    return {
      x: (location.x / 100) * SVG_WIDTH,
      y: (location.y / 100) * SVG_HEIGHT,
    };
  };

  // Convert locations to pixel coordinates for display
  const displayLocations = useMemo(() => {
    const locs = isEditMode ? editingLocations : locations;
    return locs;
  }, [isEditMode, editingLocations, locations]);

  const handleLocationClick = (location: Location) => {
    if (isEditMode) return;
    setSelectedLocation(location);
    setZoomLocation(location);
  };

  const handleCloseDetails = () => {
    setSelectedLocation(null);
    setZoomLocation(null);
  };

  const handleMapClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isEditMode) return;

    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const viewBox = svg.viewBox.baseVal;

    // Calculate the scale factor
    const scaleX = viewBox.width / rect.width;
    const scaleY = viewBox.height / rect.height;

    // Get click position relative to SVG
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Convert to SVG coordinates
    const x = clickX * scaleX;
    const y = clickY * scaleY;

    setTempLocation({ x, y });
  };

  // Convert pixel coordinates to percentage coordinates
  const convertToPercentageCoords = (pixelX: number, pixelY: number) => {
    return {
      x: (pixelX / SVG_WIDTH) * 100,
      y: (pixelY / SVG_HEIGHT) * 100,
    };
  };

  const handleAddLocation = (location: Location) => {
    // Convert pixel coordinates to percentage if needed
    const percentageCoords = convertToPercentageCoords(location.x, location.y);
    const locationWithPercentage: Location = {
      ...location,
      x: percentageCoords.x,
      y: percentageCoords.y,
    };
    setEditingLocations([...editingLocations, locationWithPercentage]);
    setTempLocation(null);
  };

  const handleRemoveLocation = (id: string) => {
    setEditingLocations(editingLocations.filter((loc) => loc.id !== id));
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="w-full space-y-6">
        <div className="flex items-center justify-between mb-8 max-w-7xl mx-auto">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Our Presence</h1>
            <p className="text-lg text-muted-foreground">
              {isEditMode ? "Click on the map to add locations" : "Discover our locations across India"}
            </p>
          </div>
          <Button
            onClick={() => {
              setIsEditMode(!isEditMode);
              setTempLocation(null);
              setSelectedLocation(null);
              setZoomLocation(null);
            }}
            variant={isEditMode ? "default" : "outline"}
            size="lg"
            className="gap-2"
          >
            {isEditMode ? (
              <>
                <Eye className="w-4 h-4" />
                View Mode
              </>
            ) : (
              <>
                <Edit className="w-4 h-4" />
                Edit Mode
              </>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 w-full lg:max-w-none">
          {/* Map Section */}
          <div className="flex flex-col w-full">
            <div className="relative w-full bg-slate-50 rounded-2xl shadow-2xl overflow-hidden border border-slate-200" style={{ aspectRatio: "16 / 9" }}>
              <div className="absolute inset-0 " />
              <div className="relative w-full h-full p-2 md:p-4">
                <svg
                  viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
                  preserveAspectRatio="xMidYMid meet"
                  className={cn(
                    "w-full h-full min-h-0 transition-all duration-700 ease-in-out",
                    zoomLocation && !isEditMode && "scale-110",
                    isEditMode && "cursor-crosshair"
                  )}
                  style={{
                    filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))",
                    transformOrigin: zoomLocation
                      ? `${convertToPixelCoords(zoomLocation).x}px ${convertToPixelCoords(zoomLocation).y}px`
                      : "center",
                  }}
                  onClick={handleMapClick}
                >

                  {/* India Map Background */}

                  <image
                    href="/hero/india.svg"
                    width={SVG_WIDTH}
                    height={SVG_HEIGHT}
                    x="0"
                    y="0"
                    opacity="0.6"
                    filter="url(#mapFilter)"
                    style={{ mixBlendMode: "multiply" }}
                  />

                  {/* Location Pins */}
                  {displayLocations.map((location) => {
                    const pixelCoords = convertToPixelCoords(location);
                    return (
                      <g
                        key={location.id}
                        transform={`translate(${pixelCoords.x}, ${pixelCoords.y})`}
                        className="cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLocationClick(location);
                        }}
                      >
                        {/* Pin Icon using SvgPin component */}
                        <foreignObject
                          x="-12"
                          y="-40"
                          width="24"
                          height="24"
                          className={cn(
                            "transition-all duration-300",
                            selectedLocation?.id === location.id && "scale-110"
                          )}
                        >
                          <div className="w-full h-full flex items-center justify-center">
                            <SvgPin category={location.category} />
                          </div>
                        </foreignObject>

                        {/* Label */}
                        <g className={cn(
                          "transition-opacity duration-300",
                          selectedLocation?.id === location.id ? "opacity-100" : "opacity-0 hover:opacity-100"
                        )}>
                          <rect
                            x="-30"
                            y="-50"
                            width="60"
                            height="24"
                            rx="12"
                            className={cn(
                              location.category === "plant" && "fill-map-plant",
                              location.category === "hq" && "fill-map-hq",
                              location.category === "other" && "fill-map-other"
                            )}
                            style={{ filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))" }}
                          />
                          <text
                            x="0"
                            y="-33"
                            textAnchor="middle"
                            className={cn(
                              "text-xs font-medium pointer-events-none",
                              location.category === "plant" && "fill-map-plant-foreground",
                              location.category === "hq" && "fill-map-hq-foreground",
                              location.category === "other" && "fill-map-other-foreground"
                            )}
                          >
                            {location.label}
                          </text>
                        </g>
                      </g>
                    );
                  })}

                {/* Temporary Pin */}
                {tempLocation && (
                  <g transform={`translate(${tempLocation.x}, ${tempLocation.y})`}>
                    <circle
                      cx="0"
                      cy="-15"
                      r="12"
                      className="fill-primary animate-pulse"
                      style={{ filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))" }}
                    />
                    <text
                      x="0"
                      y="-10"
                      textAnchor="middle"
                      className="text-lg pointer-events-none"
                    >
                      📍
                    </text>
                  </g>
                )}
                </svg>
              </div>
            </div>
          </div>

          {/* Sidebar Section */}
          <div className="space-y-6 order-2 lg:order-2">
            {isEditMode ? (
              <EditMode
                tempLocation={tempLocation}
                onAddLocation={handleAddLocation}
                onClearTemp={() => setTempLocation(null)}
                editingLocations={editingLocations}
                onRemoveLocation={handleRemoveLocation}
              />
            ) : (
              <>
                <MapLegend />

                {selectedLocation ? (
                  <LocationDetails location={selectedLocation} onClose={handleCloseDetails} />
                ) : (
                  <div className="bg-card rounded-lg p-6 border text-center text-muted-foreground text-sm">
                    Select a marker to view details.
                  </div>
                )}

                <LocationList
                  locations={displayLocations}
                  selectedLocation={selectedLocation}
                  onLocationSelect={handleLocationClick}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
