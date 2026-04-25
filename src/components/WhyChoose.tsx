import { Shield, Globe, Zap, DollarSign, BookOpen } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const reasons = [
  { icon: BookOpen, title: "Authentic Vedic Texts", desc: "Based on ancient shastras & planetary science" },
  { icon: Shield, title: "100% Private & Secure", desc: "End-to-end encrypted conversations" },
  { icon: Globe, title: "Hindi & English", desc: "Ask in your preferred language" },
  { icon: Zap, title: "Instant Answers", desc: "No waiting, no appointments needed" },
  { icon: DollarSign, title: "Free to Start", desc: "Try without any payment or commitment" },
];

const WhyChoose = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4" ref={ref}>
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-semibold uppercase tracking-wider mb-4">
            Why GayatriAI
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-3">
            Why Choose <span className="text-gradient-saffron">GayatriAI?</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 max-w-5xl mx-auto">
          {reasons.map((r, i) => (
            <div
              key={r.title}
              className={`text-center p-6 rounded-2xl bg-card border border-border hover:border-saffron/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 100 + 200}ms` }}
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl gradient-saffron flex items-center justify-center">
                <r.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-sm font-heading font-semibold text-foreground mb-1">{r.title}</h3>
              <p className="text-xs text-muted-foreground">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
