import { ShieldCheck, AlertCircle, TrendingUp } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const IsAIAstrologyAccurate = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="ai-astrology-accuracy" className="py-24 bg-secondary">
      <div className="container mx-auto px-4 max-w-4xl" ref={ref}>
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-semibold uppercase tracking-wider mb-4">
            Honest Answer
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-3">
            AI Astrology <span className="text-gradient-saffron">Accurate Hai Kya?</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            Yeh sabka pehla sawaal hota hai. Hum honestly answer dete hain.
          </p>
        </div>

        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <div className="p-6 rounded-2xl bg-card border border-border">
            <div className="flex items-start gap-4 mb-3">
              <div className="w-10 h-10 rounded-xl bg-saffron/10 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-saffron" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-foreground mb-2">Calculations: 100% Accurate</h3>
                <p className="text-sm">
                  GayatriAI Swiss Ephemeris use karta hai — wahi engine NASA aur professional astrologers use karte hain. Aapki Lagna, planetary degrees, nakshatra, dasha — sab mathematically <strong className="text-foreground">precise to the second</strong> hain.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border">
            <div className="flex items-start gap-4 mb-3">
              <div className="w-10 h-10 rounded-xl bg-saffron/10 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5 text-saffron" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-foreground mb-2">Interpretation: Highly Reliable</h3>
                <p className="text-sm">
                  Hamara AI specifically classical Jyotish granthon par train hua hai (Brihat Parashara Hora Shastra, Phaladeepika, Saravali). Generic ChatGPT-style answers nahi — har response shastra-based logic se aata hai aur certified Jyotish acharyas ke validation se gujarta hai.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border">
            <div className="flex items-start gap-4 mb-3">
              <div className="w-10 h-10 rounded-xl bg-saffron/10 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-saffron" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-foreground mb-2">Predictions: Reflective, Not Deterministic</h3>
                <p className="text-sm">
                  Honest baat — <strong className="text-foreground">koi bhi astrology, human ya AI, 100% future predict nahi kar sakti.</strong> Astrology probability aur tendency batati hai, fixed destiny nahi. GayatriAI aapko meaningful patterns, favorable time windows, aur practical remedies deta hai jo aapki decisions mein clarity laa sake.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl gradient-saffron text-primary-foreground text-center">
            <p className="font-heading font-semibold text-lg mb-1">Bottom line</p>
            <p className="text-sm opacity-95">
              Calculations precise hain, interpretation authentic hai, aur predictions reflective hain. Decisions hamesha aapke haath mein hain — astrology ek <em>guidance</em> hai, dictation nahi.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IsAIAstrologyAccurate;
