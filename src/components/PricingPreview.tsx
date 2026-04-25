import { Check, Sparkles, Zap, Crown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const plans = [
  {
    name: "Free",
    price: "₹0",
    cadence: "/forever",
    icon: Sparkles,
    tagline: "Start your journey",
    features: ["Basic kundali (Lagna, Rashi, Nakshatra)", "Daily Panchang & rashifal", "20 AI chats per month", "Hindi & English support"],
    cta: "Start Free",
    highlight: false,
  },
  {
    name: "Sadhak",
    price: "₹299",
    cadence: "/month",
    icon: Zap,
    tagline: "Most popular",
    features: ["Everything in Free", "Full Vimshottari Dasha analysis", "10-year forecast PDF", "Kundali Milan (Guna Milan)", "500 AI chats / month", "Priority responses"],
    cta: "Choose Sadhak",
    highlight: true,
  },
  {
    name: "Guru",
    price: "₹899",
    cadence: "/month",
    icon: Crown,
    tagline: "Complete guidance",
    features: ["Everything in Sadhak", "Unlimited AI conversations", "30-page detailed birth report", "Voice consultations (4/mo)", "1-on-1 with human Jyotishi", "Custom remedies & rituals"],
    cta: "Choose Guru",
    highlight: false,
  },
];

const PricingPreview = () => {
  const navigate = useNavigate();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl" ref={ref}>
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-semibold uppercase tracking-wider mb-4">
            Simple Pricing
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-3">
            Free & Premium <span className="text-gradient-saffron">Plans</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg">
            Start free. Upgrade only if you need deeper reports. No hidden charges, cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((p, i) => (
            <div
              key={p.name}
              className={`relative rounded-3xl p-6 md:p-8 border transition-all duration-500 ${
                p.highlight
                  ? "border-saffron/60 bg-card shadow-2xl shadow-saffron/10 md:-translate-y-2"
                  : "border-border bg-card hover:border-saffron/30 hover:-translate-y-1"
              } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${i * 120 + 200}ms` }}
            >
              {p.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full gradient-saffron text-primary-foreground text-[10px] font-bold tracking-wider uppercase shadow-lg">
                  Most popular
                </div>
              )}
              <div className="w-11 h-11 rounded-xl gradient-saffron flex items-center justify-center mb-4 shadow-md shadow-saffron/30">
                <p.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-heading font-bold text-foreground">{p.name}</h3>
              <p className="text-xs text-saffron font-semibold mb-2">{p.tagline}</p>
              <div className="flex items-baseline gap-1 mt-2 mb-5">
                <span className="text-3xl font-heading font-bold text-foreground">{p.price}</span>
                <span className="text-sm text-muted-foreground">{p.cadence}</span>
              </div>
              <Button
                onClick={() => navigate("/signup")}
                className={`w-full mb-6 ${
                  p.highlight ? "gradient-saffron text-primary-foreground" : "bg-secondary text-foreground hover:bg-accent"
                }`}
              >
                {p.cta} <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              <ul className="space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-saffron flex-shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingPreview;
