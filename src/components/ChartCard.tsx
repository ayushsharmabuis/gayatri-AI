import { Sparkles, Star, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import type { VedicChart } from "@/lib/astrology";
import { fmtDeg } from "@/lib/astrology";

const fmtDate = (d: Date) =>
  d.toLocaleDateString(undefined, { month: "short", year: "numeric" });

const ChartCard = ({ chart }: { chart: VedicChart }) => {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-4 h-4 text-saffron" />
        <h3 className="text-sm font-heading font-semibold text-foreground">Your Vedic Profile</h3>
        <span className="ml-auto text-[10px] uppercase tracking-wider text-muted-foreground">Lahiri Ayanamsa</span>
      </div>

      {/* Top row: Lagna / Moon / Sun */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="rounded-xl bg-secondary p-3 text-center">
          <div className="flex items-center justify-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
            <Star className="w-3 h-3 text-saffron" /> Lagna
          </div>
          <div className="text-xs font-semibold text-foreground">{chart.lagna.rashi.split(" ")[0]}</div>
          <div className="text-[10px] text-muted-foreground">{fmtDeg(chart.lagna.degInSign)}</div>
        </div>
        <div className="rounded-xl bg-secondary p-3 text-center">
          <div className="flex items-center justify-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
            <Moon className="w-3 h-3 text-saffron" /> Rashi
          </div>
          <div className="text-xs font-semibold text-foreground">{chart.moon.rashi.split(" ")[0]}</div>
          <div className="text-[10px] text-muted-foreground">{chart.nakshatra.name} • Pada {chart.nakshatra.pada}</div>
        </div>
        <div className="rounded-xl bg-secondary p-3 text-center">
          <div className="flex items-center justify-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
            <Sun className="w-3 h-3 text-saffron" /> Sun
          </div>
          <div className="text-xs font-semibold text-foreground">
            {chart.planets.find((p) => p.name === "Sun")?.rashi.split(" ")[0]}
          </div>
          <div className="text-[10px] text-muted-foreground">
            {fmtDeg(chart.planets.find((p) => p.name === "Sun")?.degInSign ?? 0)}
          </div>
        </div>
      </div>

      {/* Planet grid */}
      <div className="mb-5">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2 font-semibold">Grahas (sidereal)</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {chart.planets.map((p) => (
            <div key={p.name} className="flex items-center justify-between rounded-lg bg-secondary px-3 py-2">
              <div>
                <div className="text-xs font-medium text-foreground flex items-center gap-1">
                  {p.name}
                  {p.retrograde && <span className="text-[9px] text-saffron font-bold">℞</span>}
                </div>
                <div className="text-[10px] text-muted-foreground">{p.rashi.split(" ")[0]}</div>
              </div>
              <div className="text-[10px] text-muted-foreground tabular-nums">{fmtDeg(p.degInSign)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Dasha */}
      <div className="rounded-xl border border-saffron/30 bg-accent/30 p-3">
        <div className="text-[10px] uppercase tracking-wider text-saffron font-semibold mb-2">Current Vimshottari Dasha</div>
        <div className="flex items-center justify-between text-xs">
          <div>
            <div className="text-foreground font-semibold">{chart.mahadasha.lord} Mahadasha</div>
            <div className="text-[10px] text-muted-foreground">{fmtDate(chart.mahadasha.start)} → {fmtDate(chart.mahadasha.end)}</div>
          </div>
          <div className="text-right">
            <div className="text-foreground font-semibold">{chart.antardasha.lord} Antar</div>
            <div className="text-[10px] text-muted-foreground">{fmtDate(chart.antardasha.start)} → {fmtDate(chart.antardasha.end)}</div>
          </div>
        </div>
        <div className="mt-2 text-[10px] text-muted-foreground" suppressHydrationWarning>
          As of {now.toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default ChartCard;
