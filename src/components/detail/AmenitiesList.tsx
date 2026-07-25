import type { LucideIcon } from "lucide-react";
import {
  Car,
  CheckCircle2,
  Dumbbell,
  Flame,
  Leaf,
  Shield,
  Waves,
  Wifi,
  Wind,
  Zap,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  parking: Car,
  gym: Dumbbell,
  pool: Waves,
  "swimming pool": Waves,
  security: Shield,
  "24/7 security": Shield,
  cctv: Shield,
  generator: Zap,
  "generator backup": Zap,
  lift: Wind,
  elevator: Wind,
  gas: Flame,
  internet: Wifi,
  "high-speed internet": Wifi,
  garden: Leaf,
  "rooftop access": Leaf,
};

function iconFor(label: string): LucideIcon {
  return ICON_MAP[label.toLowerCase()] ?? CheckCircle2;
}

export function AmenitiesList({ amenities }: { amenities: string[] }) {
  if (amenities.length === 0) return null;

  return (
    <div>
      <h3 className="mb-3 font-display text-xl font-semibold text-navy">
        Amenities
      </h3>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {amenities.map((item) => {
          const Icon = iconFor(item);
          return (
            <li
              key={item}
              className="flex items-center gap-2 rounded-lg border border-navy/10 bg-white px-3 py-2.5 text-sm text-charcoal"
            >
              <Icon className="h-4 w-4 shrink-0 text-sage" aria-hidden />
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
