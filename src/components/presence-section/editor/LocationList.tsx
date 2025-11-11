import { Location } from "@/types/location";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface LocationListProps {
  locations: Location[];
  selectedLocation: Location | null;
  onLocationSelect: (location: Location) => void;
}

const getCategoryBadgeClass = (category: string) => {
  switch (category) {
    case "plant":
      return "bg-map-plant text-map-plant-foreground";
    case "hq":
      return "bg-map-hq text-map-hq-foreground";
    case "other":
      return "bg-map-other text-map-other-foreground";
    default:
      return "";
  }
};

const getCategoryLabel = (category: string) => {
  switch (category) {
    case "plant":
      return "Plant";
    case "hq":
      return "Head Office";
    case "other":
      return "Other";
    default:
      return category;
  }
};

export const LocationList = ({
  locations,
  selectedLocation,
  onLocationSelect,
}: LocationListProps) => {
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          All Locations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {locations.map((location) => (
          <button
            key={location.id}
            onClick={() => onLocationSelect(location)}
            className={cn(
              "w-full flex items-center justify-between p-3 rounded-lg",
              "transition-all duration-200 text-left",
              "hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary",
              selectedLocation?.id === location.id &&
                "bg-primary/5 ring-2 ring-primary"
            )}
          >
            <div className="flex-1 space-y-1">
              <p className="font-medium text-sm">{location.name}</p>
              <p className="text-xs text-muted-foreground">{location.state}</p>
            </div>
            <Badge className={cn("font-medium text-xs", getCategoryBadgeClass(location.category))}>
              {getCategoryLabel(location.category)}
            </Badge>
          </button>
        ))}
      </CardContent>
    </Card>
  );
};
