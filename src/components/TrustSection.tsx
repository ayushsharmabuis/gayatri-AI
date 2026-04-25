import { ShieldCheck, Lock, BookOpenCheck, UserCheck, Sparkles } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const trustPillars = [
  {
    icon: Lock,
    title: "Data Privacy Shield",
    desc: "Your birth details are SSL-encrypted at rest and in transit. We never sell or share your data with third parties — ever.",
  },
  {
    icon: BookOpenCheck,
    title: "Authentic Methodology",
    desc: "Built on Vedic Jyotish principles — Parashari & KP system. Our AI is trained on data validated by certified astrologers.",
  },
  {
    icon: UserCheck,
    title: "Expert-Backed",
    desc: "Reviewed by Acharya Pandit Suresh Sharma (Banaras Hindu University) and a panel of practicing Jyotish experts.",
  },
  {
    icon: Sparkles,
    title: "Honest Guidance",
    desc: "We don't promise '100% accurate magic.' We deliver thoughtful AI-powered Vedic insights to help you reflect & decide.",
  },
];

const TrustSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="trust" className="py-24 bg-secondary relative overflow-hidden">
      <div className="container mx-auto px-4" ref={ref}>
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-semibold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            Trust & Transparency
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            Built on <span className="text-gradient-saffron">Trust</span>, Backed by Real Experts
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            Aapki personal details deni hai? Pehle jaaniye humari approach. Transparency hamari pehli priority hai.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {trustPillars.map((p, i) => (
            <div
              key={p.title}
              className={`flex gap-5 p-7 rounded-2xl bg-card border border-border hover:border-saffron/40 hover:shadow-xl transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${i * 100 + 200}ms` }}
            >
              <div className="w-12 h-12 rounded-xl gradient-saffron flex items-center justify-center flex-shrink-0 shadow-lg">
                <p.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-heading font-bold text-foreground mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Human-in-the-loop badge */}
        <div className={`mt-12 max-w-3xl mx-auto p-6 rounded-2xl bg-card border-2 border-saffron/20 text-center transition-all duration-700 delay-700 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-2xl">🕉️</span>
            <span className="text-xs font-bold uppercase tracking-wider text-saffron">Human-in-the-Loop AI</span>
          </div>
          <p className="text-sm md:text-base text-foreground font-medium">
            Behind every AI response is real Vedic wisdom — curated, reviewed, and refined by certified Jyotish acharyas. <span className="text-muted-foreground">Not just a text generator.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
