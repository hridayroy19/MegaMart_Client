import { CustomerForm } from "@/types/checkout";

export function StepBadge({ n }: { n: number }) {
  return (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-secondary border border-border text-background text- font-bold shrink-0">
      {n}
    </span>
  );
}

export function SectionCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-secondary border border-border rounded-2xl backdrop-blur-md p-6 md:p-8">
      {children}
    </div>
  );
}

export function Divider() {
  return (
    <div className="h-px bg-gradient-to-r from-transparent via-slate-700/60 to-transparent my-5" />
  );
}

export function validate(c: CustomerForm): Record<string, string> {
  const e: Record<string, string> = {};
  if (!c.firstName.trim()) e.firstName = "First name is required";
  if (!c.lastName.trim()) e.lastName = "Last name is required";
  if (!c.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email))
    e.email = "Valid email required";
  if (!c.phone || c.phone.replace(/\D/g, "").length < 6)
    e.phone = "Valid phone required";
  if (!c.address.trim()) e.address = "Address is required";
  if (!c.city.trim()) e.city = "City is required";
  if (!c.state.trim()) e.state = "State is required";
  if (!c.zip.trim()) e.zip = "ZIP code is required";
  return e;
}
