import { Link } from "react-router-dom";
import { ScrollText, Star, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const tools = [
  {
    icon: ScrollText,
    title: "Free Kundali Generator",
    desc: "Generate your complete Vedic birth chart instantly — Lagna, Rashi, Nakshatra, planetary positions & dasha. 100% free.",
    href: "/free-kundali",
    cta: "Generate Kundali",
  },
  {
    icon: Star,
    title: "Rashi Calculator",
    desc: "Find your accurate Moon sign (Chandra Rashi) and Nakshatra using Vedic sidereal calculation. Different from Western sun sign!",
    href: "/rashi-calculator",
    cta: "Find My Rashi",
  },
];

const FreeToolsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="free-tools" className="py-24 bg-secondary">
      <div className="container mx-auto px-4 max-w-5xl" ref={ref}>
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-semibold uppercase tracking-wider mb-4">
            100% Free Tools
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-3">
            Free Vedic <span className="text-gradient-saffron">Astrology Tools</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg">
            Bina signup ke try karein — accurate Vedic calculations, instant results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {tools.map((t, i) => (
            <Link
              key={t.title}
              to={t.href}
              className={`group p-7 rounded-2xl bg-card border border-border hover:border-saffron/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${i * 150 + 200}ms` }}
            >
              <div className="w-12 h-12 rounded-xl gradient-saffron flex items-center justify-center mb-4 shadow-md group-hover:scale-110 group-hover:rotate-6 transition-transform">
                <t.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-heading font-bold text-foreground mb-2">{t.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{t.desc}</p>
              <div className="inline-flex items-center gap-2 text-saffron font-semibold text-sm">
                {t.cta} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FreeToolsSection;
