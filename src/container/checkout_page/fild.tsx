import { FieldProps } from "@/types/checkout";

export function Field({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  colSpan,
}: FieldProps) {
  return (
    <div className={colSpan ? "md:col-span-2" : ""}>
      <label
        htmlFor={id}
        className="block text-xs font-semibold tracking-widest uppercase text-background mb-1.5"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        className={`w-full px-4 py-3 bg-secondary border rounded-xl text-background placeholder-text-black text-sm transition-all duration-200 outline-none focus:bg-secondary focus:border-primary/60 focus:ring-2 focus:ring-primary/20 ${
          error ? "border-red-400/60 bg-re  d-900/10" : "border-border"
        }`}
      />
      {error && (
        <p
          id={`${id}-err`}
          role="alert"
          className="mt-1.5 text-xs text-red-400 flex items-center gap-1"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="6" cy="6" r="5.5" stroke="currentColor" />
            <path
              d="M6 4v3M6 8.5v.5"
              stroke="currentColor"
              strokeLinecap="round"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
