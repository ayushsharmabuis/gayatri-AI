import { Link } from "react-router-dom";
import { Check, Sparkles, ArrowLeft, Zap, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Free",
    price: "₹0",
    cadence: "/forever",
    icon: Sparkles,
    tokens: "20 chats / month",
    features: ["Basic chart (Lagna, Rashi, Nakshatra)", "Daily Panchang snapshot", "20 AI chats per month", "Hindi & English"],
    cta: "Current plan",
    highlight: false,
  },
  {
    name: "Sadhak",
    price: "₹299",
    cadence: "/month",
    icon: Zap,
    tokens: "500 chats / month",
    features: ["Everything in Free", "Full Vimshottari Dasha", "10-year forecast PDF", "Marriage compatibility (Guna Milan)", "Priority responses", "Email support"],
    cta: "Upgrade to Sadhak",
    highlight: true,
  },
  {
    name: "Guru",
    price: "₹899",
    cadence: "/month",
    icon: Crown,
    tokens: "Unlimited chats",
    features: ["Everything in Sadhak", "Unlimited AI conversations", "Full 30-page birth report", "Voice consultations (4/mo)", "1-on-1 with human Jyotishi", "Custom remedies & rituals"],
    cta: "Upgrade to Guru",
    highlight: false,
  },
];

const Pricing = () => (
  <div className="min-h-[100dvh] bg-background p-4 md:p-8">
    <div className="max-w-6xl mx-auto">
      <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to chat
      </Link>
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
          Choose your <span className="text-gradient-saffron">spiritual journey</span>
        </h1>
        <p className="text-sm text-muted-foreground">Cancel anytime. All plans include SSL-secure data & 100% privacy.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`relative rounded-3xl p-6 md:p-8 border transition-all ${
              p.highlight
                ? "border-saffron/60 bg-card shadow-2xl shadow-saffron/10 md:-translate-y-2"
                : "border-border bg-card hover:border-saffron/30"
            }`}
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
            <div className="flex items-baseline gap-1 mt-2 mb-1">
              <span className="text-3xl font-heading font-bold text-foreground">{p.price}</span>
              <span className="text-sm text-muted-foreground">{p.cadence}</span>
            </div>
            <p className="text-xs text-saffron font-semibold mb-5">{p.tokens}</p>
            <Button
              className={`w-full mb-6 ${
                p.highlight ? "gradient-saffron text-primary-foreground" : "bg-secondary text-foreground hover:bg-accent"
              }`}
              disabled={!p.highlight && p.name === "Free"}
            >
              {p.cta}
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
  </div>
);

export default Pricing;
