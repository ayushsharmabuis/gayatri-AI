import { Check, X } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const rows = [
  { feature: "Zodiac System", vedic: "Sidereal (fixed stars)", western: "Tropical (sun-seasons)" },
  { feature: "Origin", vedic: "India, 5,000+ years (Vedas)", western: "Babylonian / Greek, ~2,000 years" },
  { feature: "Number of Signs", vedic: "12 Rashis + 27 Nakshatras", western: "12 Sun signs only" },
  { feature: "Primary Reference", vedic: "Moon sign (Rashi) & Lagna", western: "Sun sign" },
  { feature: "Prediction Method", vedic: "Vimshottari Dasha (time-based)", western: "Transits & progressions" },
  { feature: "Accuracy of Timing", vedic: "Specific year/month windows", western: "Broad themes" },
  { feature: "Remedies", vedic: "Mantras, gemstones, donations", western: "Generally no remedies" },
  { feature: "Marriage Matching", vedic: "Ashtakoot Guna Milan (36 points)", western: "Synastry charts" },
];

const VedicVsWestern = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="vedic-vs-western" className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-5xl" ref={ref}>
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-semibold uppercase tracking-wider mb-4">
            Comparison
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-3">
            Vedic vs <span className="text-gradient-saffron">Western Astrology</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            Dono systems alag hain — calculations, predictions aur philosophy mein. GayatriAI uses authentic Vedic system.
          </p>
        </div>

        <div className={`overflow-x-auto rounded-2xl border border-border bg-card shadow-sm transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ transitionDelay: "200ms" }}>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-secondary border-b border-border">
                <th className="text-left p-4 font-heading font-semibold text-foreground">Feature</th>
                <th className="text-left p-4 font-heading font-semibold text-saffron">Vedic Astrology (Jyotish)</th>
                <th className="text-left p-4 font-heading font-semibold text-muted-foreground">Western Astrology</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.feature} className={i % 2 === 0 ? "bg-card" : "bg-secondary/40"}>
                  <td className="p-4 font-medium text-foreground border-b border-border">{r.feature}</td>
                  <td className="p-4 text-foreground border-b border-border">
                    <span className="inline-flex items-start gap-2">
                      <Check className="w-4 h-4 text-saffron flex-shrink-0 mt-0.5" />
                      {r.vedic}
                    </span>
                  </td>
                  <td className="p-4 text-muted-foreground border-b border-border">
                    <span className="inline-flex items-start gap-2">
                      <X className="w-4 h-4 text-muted-foreground/50 flex-shrink-0 mt-0.5" />
                      {r.western}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-sm text-muted-foreground mt-6 text-center max-w-3xl mx-auto leading-relaxed">
          GayatriAI uses <strong className="text-foreground">Vedic (sidereal) astrology with Lahiri Ayanamsa</strong> — the same standard followed by India's official astronomical calendar (Drik Panchang) and traditional Jyotishis for thousands of years.
        </p>
      </div>
    </section>
  );
};

export default VedicVsWestern;
