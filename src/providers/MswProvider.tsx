"use client";

import { useEffect, useState } from "react";

export default function MswProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMockingEnabled =
    process.env.NEXT_PUBLIC_API_MOCKING === "enabled";
  const [ready, setReady] = useState(!isMockingEnabled);

  useEffect(() => {
    if (!isMockingEnabled) return;

    import("@/mocks/browser")
      .then(({ worker }) => {
        return worker.start({
          onUnhandledRequest: "bypass",
        });
      })
      .then(() => {
        setReady(true);
      })
      .catch((err) => {
        console.error("MSW failed to start", err);
        setReady(true);
      });
  }, [isMockingEnabled]);

  if (!ready) {
    return null;
  }

  return <>{children}</>;
}
