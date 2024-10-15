import { Loader2 } from "lucide-react";
import React, { type ReactNode } from "react";
import { ProgressBar } from "@/components/global/loader/progress-tab";

export default function LoadingOverlay({ children }: { children: ReactNode }) {
  return (
    <div className="text-sm bg-white/80 py-3 text-center backdrop-blur text-black  flex flex-col gap-2 items-center justify-center h-full rounded-lg">
      <Loader2 className="animate-spin size-4" />
      {children}
      <ProgressBar/>
    </div>
  );
}