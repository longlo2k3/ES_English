// components/TimeTrackerWrapper.tsx
"use client";
import { useHeartbeat } from "@/fer-framework/fe-cores/hooks/useActivityTracker";

export default function TimeTrackerWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  useHeartbeat({ intervalMs: 300000 });
  return <>{children}</>;
}
