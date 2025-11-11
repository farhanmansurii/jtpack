export type LocationCategory = "plant" | "hq" | "other";

export interface Location {
  id: string;
  name: string;
  state: string;
  x: number;
  y: number;
  category: LocationCategory;
  label: string;
  address: string;
}
