// components/contact/ShowroomInfo.tsx
import { MapPin, Phone } from "lucide-react";

interface ShowroomInfoProps {
  address: string;
  phones: string[];
}

export default function ShowroomInfo({ address, phones }: ShowroomInfoProps) {
  return (
    <div>
      <h3 className="mb-3">Our Showroom</h3>
      <div className="flex items-start gap-2  mb-3">
        <MapPin size={14} className="text-foreground mt-0.5 shrink-0" />
        <span>{address}</span>
      </div>
      <div className="space-y-1">
        {phones.map((phone, i) => (
          <div key={i} className="flex items-center gap-2">
            <Phone size={16} className="text-foreground shrink-0" />
            <span>{phone}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
