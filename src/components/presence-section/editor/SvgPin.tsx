import { LocationCategory } from "@/types/location";

const getCategoryColors = (category: LocationCategory) => {
  switch (category) {
    case "plant":
      return "text-map-plant";
    case "hq":
      return "text-map-hq";
    case "other":
      return "text-map-other";
  }
};

export function SvgPin({ category }: { category: LocationCategory }) {
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
