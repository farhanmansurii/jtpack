import { MapPin } from "lucide-react";
import { LocationCategory } from "@/types/location";
import { cn } from "@/lib/utils";

interface LocationPinProps {
  category: LocationCategory;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const getCategoryColors = (category: LocationCategory) => {
  switch (category) {
    case "plant":
      return "bg-map-plant text-map-plant-foreground hover:bg-map-plant/90";
    case "hq":
      return "bg-map-hq text-map-hq-foreground hover:bg-map-hq/90";
    case "other":
      return "bg-map-other text-map-other-foreground hover:bg-map-other/90";
  }
};
function SvgPin({ category }: { category: LocationCategory }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      className={`h-5 w-5 ${getCategoryColors(category)}`}
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7"
      ></path>
    </svg>
  );
}
export const LocationPin = ({ category, label, isSelected, onClick }: LocationPinProps) => {
  const colors = getCategoryColors(category);

  return (
    <button
      onClick={onClick}
      className={cn(
        "absolute flex flex-col items-center gap-1 transition-all duration-300 z-10 group",
        "hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        isSelected && "scale-110 z-20"
      )}
      style={{
        transform: "translate(-50%, -100%)",
        minWidth: "44px",
        minHeight: "44px",
      }}
    >
     s
    </button>
  );
};
