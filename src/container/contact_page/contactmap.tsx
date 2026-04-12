// components/contact/ContactMap.tsx

interface ContactMapProps {
  lat?: number;
  lng?: number;
  zoom?: number;
}

export default function ContactMap({
  lat = 51.509865,
  lng = -0.118092,
  zoom = 12,
}: ContactMapProps) {
  const src = `https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`;

  return (
    <div className="w-full h-48 rounded-md overflow-hidden border border-gray-200">
      <iframe
        title="Showroom location"
        src={src}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}