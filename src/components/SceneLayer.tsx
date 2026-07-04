import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const SceneLayer = forwardRef<
  HTMLDivElement,
  { ready: boolean; className?: string }
>(({ ready, className }, ref) => (
  <div
    ref={ref}
    aria-hidden="true"
    className={cn(
      "absolute inset-0 pointer-events-none transition-opacity",
      className,
      !ready && "opacity-0",
    )}
  />
));
SceneLayer.displayName = "SceneLayer";

export default SceneLayer;
