import { Instagram, Twitter, MessageCircle } from "lucide-react";

interface SocialLink {
  name: string;
  href: string;
}

const iconMap: Record<string, React.ReactNode> = {
  Instagram: <Instagram size={18} />,
  Twitter: <Twitter size={18} />,
  Whatsapp: <MessageCircle size={18} />,
};

interface SocialLinksProps {
  links: SocialLink[];
}

export default function SocialLinks({ links }: SocialLinksProps) {
  return (
    <div className="mt-8">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">
        Social Media Accounts
      </h3>
      <div className="flex items-center gap-2">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            aria-label={link.name}
            className="w-9 h-9 rounded-full bg-secondary hover:bg-primary text-background flex items-center justify-center transition-colors"
          >
            {iconMap[link.name] ?? (
              <span className="text-xs">{link.name[0]}</span>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
