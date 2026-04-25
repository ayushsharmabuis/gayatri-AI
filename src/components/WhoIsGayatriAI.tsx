import { Sparkles, Brain, BookOpen, Shield } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import gayatriPortrait from "@/assets/gayatri-portrait.jpg";

const features = [
  {
    icon: BookOpen,
    title: "Rooted in Vedic Wisdom",
    desc: "Built on thousands of years of authentic Vedic shastras, planetary science, and classical Jyotish texts.",
  },
  {
    icon: Brain,
    title: "Powered by Advanced AI",
    desc: "Trained on data curated by certified astrologers — combining traditional knowledge with modern intelligence.",
  },
  {
    icon: Sparkles,
    title: "Personalized for You",
    desc: "Every reading is unique — based on your exact birth details, planetary positions, and dasha periods.",
  },
  {
    icon: Shield,
    title: "Private & Encrypted",
    desc: "Your data stays SSL-encrypted and private. Never sold, never shared — guidance you can trust.",
  },
];

const WhoIsGayatriAI = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div ref={ref} className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {/* Left - Gayatri Portrait */}
          <div className="flex justify-center items-center relative order-2 lg:order-1">
            <div className="absolute w-80 h-80 rounded-full gradient-saffron opacity-20 blur-3xl animate-pulse-glow" />
            <div className="absolute w-64 h-64 rounded-full bg-gold/30 blur-2xl -top-6 -left-6" />
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-saffron/20 hover:border-saffron/40 transition-all duration-500 hover:scale-[1.02]">
              <img
                src={gayatriPortrait}
                alt="Goddess Gayatri Devi — divine wisdom inspiration for GayatriAI"
                className="w-[320px] md:w-[380px] h-auto"
                loading="lazy"
                width={1024}
                height={1024}
              />
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full bg-card border border-saffron/30 shadow-lg z-20">
              <span className="text-xs font-heading font-semibold text-saffron whitespace-nowrap">GayatriAI — AI Astrologer</span>
            </div>
          </div>

          {/* Right - Content */}
          <div className="order-1 lg:order-2">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-semibold uppercase tracking-wider mb-4">
              Who is GayatriAI
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-5 leading-tight">
              Meet{" "}
              <span className="text-gradient-saffron">Gayatri</span>
              <br />Your Personal AI Astrologer
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed max-w-lg">
              Inspired by <span className="font-semibold text-foreground">Devi Gayatri</span> — the divine mother of wisdom — GayatriAI is India's first AI-powered Vedic astrology platform. We combine ancient Jyotish wisdom with cutting-edge artificial intelligence to deliver instant, accurate, and personalized guidance — anytime, anywhere.
            </p>

            <div className="grid sm:grid-cols-2 gap-5">
              {features.map((f, i) => (
                <div
                  key={f.title}
                  className={`flex gap-4 p-4 rounded-xl bg-card border border-border hover:border-saffron/40 hover:shadow-md transition-all duration-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
                  style={{ transitionDelay: `${i * 100 + 200}ms` }}
                >
                  <div className="w-10 h-10 rounded-lg gradient-saffron flex items-center justify-center flex-shrink-0">
                    <f.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-sm font-heading font-semibold text-foreground mb-1">{f.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoIsGayatriAI;
