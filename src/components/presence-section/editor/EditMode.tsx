import { useState } from "react";
import { Location, LocationCategory } from "@/types/location";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Copy, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface EditModeProps {
  tempLocation: { x: number; y: number } | null;
  onAddLocation: (location: Location) => void;
  onClearTemp: () => void;
  editingLocations: Location[];
  onRemoveLocation: (id: string) => void;
}

export const EditMode = ({
  tempLocation,
  onAddLocation,
  onClearTemp,
  editingLocations,
  onRemoveLocation,
}: EditModeProps) => {
  const [formData, setFormData] = useState({
    name: "",
    state: "",
    category: "plant" as LocationCategory,
    label: "",
    address: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempLocation) {
      toast.error("Please click on the map to set a location");
      return;
    }

    // Generate unique ID by checking existing locations
    const baseId = formData.name.toLowerCase().replace(/\s+/g, "-");
    let uniqueId = baseId;
    let counter = 1;
    while (editingLocations.some((loc) => loc.id === uniqueId)) {
      uniqueId = `${baseId}-${counter}`;
      counter++;
    }

    const newLocation: Location = {
      id: uniqueId,
      name: formData.name,
      state: formData.state,
      x: Number(tempLocation.x.toFixed(2)),
      y: Number(tempLocation.y.toFixed(2)),
      category: formData.category,
      label: formData.label,
      address: formData.address,
    };

    onAddLocation(newLocation);
    setFormData({
      name: "",
      state: "",
      category: "plant",
      label: "",
      address: "",
    });
    toast.success("Location added successfully");
  };

  const copyAllLocations = () => {
    const json = JSON.stringify(editingLocations, null, 2);
    navigator.clipboard.writeText(json);
    toast.success("All locations copied to clipboard");
  };

  const copyLocation = (location: Location) => {
    const json = JSON.stringify(location, null, 2);
    navigator.clipboard.writeText(json);
    toast.success(`${location.name} copied to clipboard`);
  };

  return (
    <div className="space-y-4">
      <Card className="border-2 border-primary">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Edit Mode - Click on map to add location
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {tempLocation && (
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm font-medium">
                Selected Position (pixels): x: {tempLocation.x.toFixed(2)}, y: {tempLocation.y.toFixed(2)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Percentage: x: {((tempLocation.x / 611.86) * 100).toFixed(2)}%, y: {((tempLocation.y / 695.70) * 100).toFixed(2)}%
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Vapi"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State *</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                placeholder="Gujarat"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="label">Label *</Label>
              <Input
                id="label"
                value={formData.label}
                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                placeholder="Vapi"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value as LocationCategory })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="plant">Plant</SelectItem>
                  <SelectItem value="hq">Head Office</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Full address here"
                required
                rows={3}
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="flex-1" disabled={!tempLocation}>
                Add Location
              </Button>
              {tempLocation && (
                <Button type="button" variant="outline" onClick={onClearTemp}>
                  Clear
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {editingLocations.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                Added Locations ({editingLocations.length})
              </CardTitle>
              <Button onClick={copyAllLocations} variant="outline" size="sm">
                <Copy className="w-4 h-4 mr-2" />
                Copy All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {editingLocations.map((location) => (
              <div
                key={location.id}
                className="flex items-center justify-between p-3 bg-muted rounded-lg"
              >
                <div className="flex-1 space-y-1">
                  <p className="font-medium text-sm">{location.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {location.state} • x: {location.x}, y: {location.y}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => copyLocation(location)}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => onRemoveLocation(location.id)}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {editingLocations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Generated JSON</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="p-4 bg-muted rounded-lg text-xs overflow-x-auto max-h-96 overflow-y-auto">
              {JSON.stringify(editingLocations, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
