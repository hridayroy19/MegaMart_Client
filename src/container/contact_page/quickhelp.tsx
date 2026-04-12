// components/contact/QuickHelp.tsx
import { Mail } from "lucide-react";

interface QuickHelpProps {
  description: string;
  emails: string[];
}

export default function QuickHelp({ description, emails }: QuickHelpProps) {
  return (
    <div>
      <h3 className="mb-3">Quick Help</h3>
      <p className=" mb-3">{description}</p>
      <div className="space-y-1">
        {emails.map((email, i) => (
          <div key={i} className="flex items-center gap-2">
            <Mail size={16} className=" shrink-0" />
            <a
              href={`mailto:${email}`}
              className="text-primary hover:underline"
            >
              {email}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
