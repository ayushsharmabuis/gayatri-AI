import { Clock } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const dashas = [
  { lord: "Ketu", years: 7 },
  { lord: "Venus (Shukra)", years: 20 },
  { lord: "Sun (Surya)", years: 6 },
  { lord: "Moon (Chandra)", years: 10 },
  { lord: "Mars (Mangal)", years: 7 },
  { lord: "Rahu", years: 18 },
  { lord: "Jupiter (Guru)", years: 16 },
  { lord: "Saturn (Shani)", years: 19 },
  { lord: "Mercury (Budh)", years: 17 },
];

const DashaSystem = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="dasha-system" className="py-24 bg-secondary">
      <div className="container mx-auto px-4 max-w-5xl" ref={ref}>
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-semibold uppercase tracking-wider mb-4">
            Time-Based Predictions
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-3">
            Dasha System <span className="text-gradient-saffron">Kya Hai?</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            Mahadasha, Antardasha — Vedic astrology ka woh secret jo timing predictions accurate banata hai.
          </p>
        </div>

        <div className="space-y-6 text-muted-foreground leading-relaxed mb-10">
          <p>
            <strong className="text-foreground">Vimshottari Dasha</strong> ek 120-year cycle hai jismein har grah ki ek specific time period hoti hai. Aapke janam ke samay Chandra (Moon) jis Nakshatra mein tha, uske ruling planet se aapki <strong className="text-foreground">Mahadasha</strong> shuru hoti hai.
          </p>
          <p>
            Har Mahadasha ke andar 9 <strong className="text-foreground">Antardasha (Bhukti)</strong> hoti hain — jo us bade period ko 9 sub-periods mein divide karti hain. Yahi reason hai ki ek Saturn Mahadasha (19 saal) ke bhi alag-alag time pe alag-alag results milte hain — kyunki Antardasha change hoti rehti hai.
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
          <div className="p-5 border-b border-border bg-secondary flex items-center gap-2">
            <Clock className="w-5 h-5 text-saffron" />
            <h3 className="font-heading font-bold text-foreground">Vimshottari Mahadasha — 120 Year Cycle</h3>
          </div>
          <div className="divide-y divide-border">
            {dashas.map((d, i) => (
              <div
                key={d.lord}
                className={`flex items-center gap-4 p-4 hover:bg-secondary/50 transition-colors ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
                style={{ transitionDelay: `${i * 60 + 200}ms`, transitionDuration: "500ms" }}
              >
                <span className="w-8 h-8 rounded-full gradient-saffron flex items-center justify-center text-primary-foreground font-bold text-xs flex-shrink-0">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <p className="font-heading font-semibold text-foreground">{d.lord}</p>
                </div>
                <div className="text-right">
                  <span className="font-heading font-bold text-saffron text-lg">{d.years}</span>
                  <span className="text-xs text-muted-foreground ml-1">years</span>
                </div>
                <div className="hidden md:block w-32 h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full gradient-saffron" style={{ width: `${(d.years / 20) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-card border border-border">
            <h3 className="font-heading font-bold text-foreground mb-2">Mahadasha (Major Period)</h3>
            <p className="text-sm text-muted-foreground">
              Aapki life ka current "chapter". 6 to 20 saal tak chalti hai. Yeh decide karti hai ki kaunsa grah aapki life ke is dauran sabse zyada influence rakhega.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-card border border-border">
            <h3 className="font-heading font-bold text-foreground mb-2">Antardasha (Sub-Period)</h3>
            <p className="text-sm text-muted-foreground">
              Mahadasha ke andar ki "scene". Months se kuch saalon tak chalti hai. Yeh fine-tune karti hai ki specific event kab hoga.
            </p>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          GayatriAI aapki current Mahadasha aur Antardasha automatically calculate karke detailed predictions deta hai. <strong className="text-foreground">Sign up karke apni dasha free dekhein.</strong>
        </p>
      </div>
    </section>
  );
};

export default DashaSystem;
