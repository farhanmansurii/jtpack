import { Location } from "@/types/location";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, X, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface LocationDetailsProps {
  location: Location | null;
  onClose: () => void;
}

const getCategoryBadgeClass = (category: string) => {
  switch (category) {
    case "plant":
      return "bg-map-plant text-map-plant-foreground hover:bg-map-plant/90";
    case "hq":
      return "bg-map-hq text-map-hq-foreground hover:bg-map-hq/90";
    case "other":
      return "bg-map-other text-map-other-foreground hover:bg-map-other/90";
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

export const LocationDetails = ({ location, onClose }: LocationDetailsProps) => {
  if (!location) return null;

  const handleShare = () => {
    toast.success("Location details copied to clipboard");
  };

  const handleViewOnMap = () => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      location.address
    )}`;
    window.open(mapsUrl, "_blank");
  };

  return (
    <Card className="animate-fade-in shadow-lg">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
        <div className="space-y-2">
          <Badge className={cn("font-medium", getCategoryBadgeClass(location.category))}>
            {getCategoryLabel(location.category)}
          </Badge>
          <CardTitle className="text-2xl font-bold">{location.name}</CardTitle>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8 hover:bg-muted"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{location.state}</span>
          </div>
        </div>

        <div className="pt-2 border-t">
          <p className="text-sm text-foreground">{location.address}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          <Button
            onClick={handleViewOnMap}
            className="flex-1"
            variant="default"
          >
            <MapPin className="mr-2 h-4 w-4" />
            View on Maps
          </Button>
          <Button
            onClick={handleShare}
            variant="outline"
            size="icon"
            className="sm:w-auto"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
