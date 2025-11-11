import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export const MapLegend = () => {
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Legend
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-map-plant text-map-plant-foreground">
            <MapPin className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium">Plant</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-map-hq text-map-hq-foreground">
            <MapPin className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium">Head Office</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-map-other text-map-other-foreground">
            <MapPin className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium">Other</span>
        </div>
      </CardContent>
    </Card>
  );
};
