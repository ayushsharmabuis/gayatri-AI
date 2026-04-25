import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const houses = [
  { num: 1, name: "Lagna", meaning: "Self, body, personality" },
  { num: 2, name: "Dhana", meaning: "Wealth, family, speech" },
  { num: 3, name: "Sahaja", meaning: "Siblings, courage, efforts" },
  { num: 4, name: "Sukha", meaning: "Mother, home, happiness" },
  { num: 5, name: "Putra", meaning: "Children, intellect, romance" },
  { num: 6, name: "Ripu", meaning: "Enemies, debts, health" },
  { num: 7, name: "Yuvati", meaning: "Marriage, partnership" },
  { num: 8, name: "Randhra", meaning: "Longevity, transformation" },
  { num: 9, name: "Dharma", meaning: "Luck, father, religion" },
  { num: 10, name: "Karma", meaning: "Career, status, fame" },
  { num: 11, name: "Labha", meaning: "Gains, friends, income" },
  { num: 12, name: "Vyaya", meaning: "Loss, expenses, moksha" },
];

const KundaliExplainer = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="kundali-explainer" className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-5xl" ref={ref}>
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-semibold uppercase tracking-wider mb-4">
            Beginner Guide
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-3">
            Kundali <span className="text-gradient-saffron">Kya Hoti Hai?</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            Birth chart — aapke janam ke samay aakash ka snapshot. 12 houses, 9 planets, 12 rashis ka unique map.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Visual chart diagram */}
          <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="aspect-square bg-card border border-border rounded-2xl p-6 shadow-sm">
              <svg viewBox="0 0 300 300" className="w-full h-full">
                <rect x="20" y="20" width="260" height="260" fill="hsl(var(--secondary))" stroke="hsl(var(--saffron))" strokeWidth="2" />
                <line x1="20" y1="20" x2="280" y2="280" stroke="hsl(var(--saffron))" strokeWidth="1.5" />
                <line x1="280" y1="20" x2="20" y2="280" stroke="hsl(var(--saffron))" strokeWidth="1.5" />
                <line x1="150" y1="20" x2="20" y2="150" stroke="hsl(var(--saffron))" strokeWidth="1.5" />
                <line x1="20" y1="150" x2="150" y2="280" stroke="hsl(var(--saffron))" strokeWidth="1.5" />
                <line x1="150" y1="280" x2="280" y2="150" stroke="hsl(var(--saffron))" strokeWidth="1.5" />
                <line x1="280" y1="150" x2="150" y2="20" stroke="hsl(var(--saffron))" strokeWidth="1.5" />
                {/* House numbers */}
                {[
                  [150, 60, "1"], [85, 40, "12"], [40, 85, "11"], [60, 150, "10"],
                  [40, 215, "9"], [85, 260, "8"], [150, 240, "7"], [215, 260, "6"],
                  [260, 215, "5"], [240, 150, "4"], [260, 85, "3"], [215, 40, "2"],
                ].map(([x, y, n]) => (
                  <text key={n as string} x={x as number} y={y as number} textAnchor="middle" fontSize="14" fontWeight="700" fill="hsl(var(--foreground))">{n as string}</text>
                ))}
                <text x="150" y="155" textAnchor="middle" fontSize="11" fill="hsl(var(--muted-foreground))">North Indian</text>
                <text x="150" y="170" textAnchor="middle" fontSize="11" fill="hsl(var(--muted-foreground))">Kundali Style</text>
              </svg>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-3">
              North Indian diamond chart — har box ek "Bhava" (house) hai
            </p>
          </div>

          {/* Houses list */}
          <div className="space-y-4">
            <div>
              <h3 className="font-heading font-bold text-foreground mb-2">12 Bhavas (Houses)</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Har bhava life ke ek alag area ko represent karta hai. Jis bhava mein jo grah baitha hai, woh us area ko influence karta hai.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {houses.map((h) => (
                <div key={h.num} className="flex items-center gap-2 p-2.5 rounded-lg bg-card border border-border text-xs">
                  <span className="w-6 h-6 rounded-full gradient-saffron flex items-center justify-center text-primary-foreground font-bold text-[10px] flex-shrink-0">{h.num}</span>
                  <div>
                    <p className="font-semibold text-foreground">{h.name}</p>
                    <p className="text-muted-foreground text-[11px]">{h.meaning}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 p-6 rounded-2xl bg-secondary border border-border">
          <h3 className="font-heading font-bold text-foreground mb-3">9 Grahas (Planets) used in Vedic Kundali</h3>
          <div className="flex flex-wrap gap-2">
            {["Surya (Sun)", "Chandra (Moon)", "Mangal (Mars)", "Budh (Mercury)", "Guru (Jupiter)", "Shukra (Venus)", "Shani (Saturn)", "Rahu", "Ketu"].map((p) => (
              <span key={p} className="px-3 py-1.5 rounded-full bg-card border border-border text-xs font-medium text-foreground">{p}</span>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            In 9 grahas ki position aapke 12 bhavas mein decide karti hai aapki <strong className="text-foreground">prakriti, swabhav, jeevan ke events aur timing</strong>. Yahi science hai Vedic Jyotish ki.
          </p>
        </div>
      </div>
    </section>
  );
};

export default KundaliExplainer;
