import { Star, X } from "lucide-react";
import { useEffect, useRef } from "react";
import ChartCard from "./ChartCard";
import type { VedicChart } from "@/lib/astrology";

interface Props {
  chart: VedicChart | null;
  open: boolean;
  onClose: () => void;
}

/** Floating popover that anchors above the input and shows the full Vedic profile. */
const VedicProfilePopover = ({ chart, open, onClose }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="absolute bottom-full left-0 right-0 mb-3 px-2 z-30 animate-fade-in-up">
      <div
        ref={ref}
        className="mx-auto max-w-xl bg-card border border-border rounded-3xl shadow-2xl shadow-saffron/10 overflow-hidden"
      >
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-secondary/40">
          <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-saffron" /> Your Vedic Profile
          </span>
          <button onClick={onClose} className="p-1 rounded-md hover:bg-secondary text-muted-foreground" aria-label="Close">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-3 max-h-[60vh] overflow-y-auto">
          {chart ? (
            <ChartCard chart={chart} />
          ) : (
            <p className="text-sm text-muted-foreground text-center py-6">
              No chart yet. Complete onboarding first.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VedicProfilePopover;
