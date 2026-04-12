// components/faq/AlertBanner.tsx

interface AlertBannerProps {
  message: string;
}

export default function AlertBanner({ message }: AlertBannerProps) {
  return (
    <div className="bg-error/4 border border-destructive/50 text-destructive px-5 py-4 rounded-md mb-6">
      <p>{message}</p>
    </div>
  );
}
