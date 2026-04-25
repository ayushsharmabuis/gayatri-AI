import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Sparkles, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const highlights = [
  "60,000+ AI Consultations",
  "1.5 Lakh+ Users",
  "100% Private & Encrypted",
];

const quickQuestions = [
  "Mera aaj ka din kaisa rahega?",
  "When will I meet my life partner?",
  "Why do I feel stuck in my career?",
  "Is 2026 good for marriage?",
];

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-24 pb-16 bg-background overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <div className="absolute top-20 right-20 w-[500px] h-[500px] rounded-full bg-saffron blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-gold blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-saffron/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-saffron animate-pulse" />
            <span className="text-xs md:text-sm font-medium text-accent-foreground uppercase tracking-wide">
              AI-Powered Vedic Astrology — Trusted by 1.5 Lakh+ Users
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-foreground leading-tight mb-6">
            Free AI Vedic Astrology{" "}
            <span className="text-gradient-saffron">in Hindi & English</span>
          </h1>

          <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
            GayatriAI is your personal AI astrologer — get instant kundali analysis, dasha predictions, kundali milan & remedies online. 24/7 free Vedic Jyotish guidance for career, love, marriage & life decisions.
          </p>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8">
            {highlights.map((h) => (
              <div key={h} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-saffron" />
                <span className="text-sm text-muted-foreground">{h}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex justify-center mb-6">
            <Button
              onClick={() => navigate("/signup")}
              size="lg"
              className="gradient-saffron text-primary-foreground font-semibold text-base px-8 py-6 hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-saffron/20"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Get Free Kundali & Ask AI Astrologer
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Privacy note */}
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mb-10">
            <Lock className="w-3 h-3" />
            <span>SSL Encrypted • No signup required to try • Data never sold</span>
          </div>

          {/* Quick question pills */}
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Try asking</p>
            <div className="flex flex-wrap justify-center gap-2">
              {quickQuestions.map((q, i) => (
                <button
                  key={q}
                  onClick={() => navigate("/signup")}
                  className="px-4 py-2 text-xs md:text-sm font-medium text-muted-foreground bg-card border border-border rounded-full hover:border-saffron/40 hover:text-foreground hover:shadow-md transition-all animate-fade-in-up"
                  style={{ animationDelay: `${i * 100 + 300}ms` }}
                >
                  "{q}"
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
