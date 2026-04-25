import { Check, X } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const rows = [
  { feature: "Availability", traditional: "Appointment needed", gayatri: "Instant access" },
  { feature: "Cost", traditional: "₹500 - ₹5000", gayatri: "Free to start" },
  { feature: "Time Limit", traditional: "30 min session", gayatri: "Unlimited questions" },
  { feature: "Language", traditional: "1 language only", gayatri: "Hindi + English" },
  { feature: "Night Access", traditional: "Not available", gayatri: "24/7 anytime" },
  { feature: "Privacy", traditional: "Face-to-face", gayatri: "100% anonymous" },
];

const ComparisonTable = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-4" ref={ref}>
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-semibold uppercase tracking-wider mb-4">
            Compare
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-3">
            Traditional Astrologer vs <span className="text-gradient-saffron">GayatriAI</span>
          </h2>
        </div>
        <div className={`max-w-3xl mx-auto rounded-2xl overflow-hidden border border-border bg-card shadow-xl transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="grid grid-cols-3 gradient-saffron p-5 text-primary-foreground font-heading font-semibold text-sm md:text-base">
            <span>Feature</span>
            <span className="text-center">Traditional</span>
            <span className="text-center">GayatriAI ✨</span>
          </div>
          {rows.map((r, i) => (
            <div key={r.feature} className={`grid grid-cols-3 p-5 text-sm items-center border-b border-border/50 last:border-0 ${i % 2 === 0 ? "bg-card" : "bg-secondary/50"} hover:bg-accent/30 transition-colors`}>
              <span className="font-medium text-foreground">{r.feature}</span>
              <span className="text-center text-muted-foreground flex items-center justify-center gap-2">
                <X className="w-4 h-4 text-destructive flex-shrink-0" /> <span className="hidden sm:inline">{r.traditional}</span>
              </span>
              <span className="text-center text-foreground flex items-center justify-center gap-2 font-medium">
                <Check className="w-4 h-4 text-saffron flex-shrink-0" /> <span className="hidden sm:inline">{r.gayatri}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
