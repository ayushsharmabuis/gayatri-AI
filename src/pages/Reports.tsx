import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText, Sparkles, ArrowLeft, Mail, Clock, ShieldCheck,
  Check, Lock, Star, Crown, FileSignature, IndianRupee,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ChartCard from "@/components/ChartCard";
import { loadChart, type VedicChart } from "@/lib/astrology";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface Report {
  id: string;
  title: string;
  desc: string;
  pages: number;
  price: number;       // INR
  oldPrice?: number;
  highlights: string[];
  badge?: "popular" | "best-value";
  icon: typeof FileText;
}

const REPORTS: Report[] = [
  {
    id: "birth-chart-360",
    title: "Birth Chart 360° Report",
    desc: "Complete Parashari analysis of your D1 + D9 — lagna, bhavas, planets, yogas, dashas and remedies.",
    pages: 35,
    price: 499,
    oldPrice: 999,
    badge: "popular",
    icon: FileText,
    highlights: [
      "Full Lagna, Rashi & Nakshatra interpretation",
      "All 12 bhavas analysed with bhava lords",
      "Raj, Dhana & Vipreet Yogas detected",
      "Personalised remedies (mantra + charity)",
    ],
  },
  {
    id: "dasha-10yr",
    title: "10-Year Dasha Forecast",
    desc: "Year-by-year Vimshottari Mahadasha + Antardasha predictions with key Jupiter & Saturn transits.",
    pages: 28,
    price: 599,
    oldPrice: 1199,
    icon: Clock,
    highlights: [
      "Month-wise dasha activation timeline",
      "Career, finance & relationship windows",
      "Caution periods & opportunity peaks",
      "Transit overlay for next 10 years",
    ],
  },
  {
    id: "guna-milan",
    title: "Marriage Compatibility (36-Guna Milan)",
    desc: "Classical Ashtakoota match against your partner's chart with Mangal Dosha & Navamsa cross-check.",
    pages: 22,
    price: 699,
    oldPrice: 1399,
    badge: "best-value",
    icon: Star,
    highlights: [
      "Full 36-point Ashtakoota score",
      "Mangal Dosha & cancellation analysis",
      "Navamsa (D9) compatibility deep dive",
      "Honest verdict — not blanket positive",
    ],
  },
  {
    id: "career-money",
    title: "Career & Money Blueprint",
    desc: "Best industries, lucky years, business vs job verdict and wealth-yoga based financial windows.",
    pages: 25,
    price: 549,
    oldPrice: 1099,
    icon: Crown,
    highlights: [
      "10th, 2nd & 11th house deep analysis",
      "Best 3 career fields for your chart",
      "Job vs business — clear recommendation",
      "Top 5 financial windows in next 7 years",
    ],
  },
];

const STORAGE_ORDERS = "gayatriai_report_orders_v1";

interface Order {
  id: string;
  reportId: string;
  reportTitle: string;
  email: string;
  amount: number;
  createdAt: string;
  status: "queued" | "processing" | "delivered";
  deliverBy: string;
}

const Reports = () => {
  const [chart, setChart] = useState<VedicChart | null>(null);
  const [selected, setSelected] = useState<Report | null>(null);
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setChart(loadChart());
    try {
      const raw = localStorage.getItem(STORAGE_ORDERS);
      if (raw) setOrders(JSON.parse(raw));
    } catch {}
  }, []);

  const placeOrder = () => {
    if (!selected) return;
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast({ title: "Invalid email", description: "Please enter a valid email so we can deliver your PDF." });
      return;
    }
    if (!chart) {
      toast({ title: "Chart missing", description: "Generate your birth chart first via onboarding." });
      return;
    }
    const order: Order = {
      id: "ord_" + Date.now(),
      reportId: selected.id,
      reportTitle: selected.title,
      email,
      amount: selected.price,
      createdAt: new Date().toISOString(),
      status: "queued",
      deliverBy: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };
    const next = [order, ...orders];
    setOrders(next);
    try { localStorage.setItem(STORAGE_ORDERS, JSON.stringify(next)); } catch {}
    setSelected(null);
    setEmail("");
    toast({
      title: "Order placed ✨",
      description: `Your ${order.reportTitle} will arrive at ${order.email} within 24 hours.`,
    });
  };

  const fmtINR = (n: number) => "₹" + n.toLocaleString("en-IN");

  const heroSubtitle = useMemo(
    () => "Premium Vedic reports — hand-prepared by our Jyotish team using your exact chart, delivered as PDF to your email within 24 hours.",
    []
  );

  return (
    <div className="min-h-[100dvh] bg-background">
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {/* Top bar */}
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to chat
        </Link>

        {/* Hero */}
        <section className="rounded-3xl bg-gradient-to-br from-accent/40 via-card to-card border border-saffron/20 p-6 md:p-10 mb-8 shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-saffron/15 text-saffron text-[10px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3" /> Premium Reports
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary text-foreground text-[10px] font-semibold">
              <Mail className="w-3 h-3" /> Delivered to your email in 24h
            </span>
          </div>
          <h1 className="text-2xl md:text-4xl font-heading font-bold text-foreground mb-2">
            Vedic <span className="text-gradient-saffron">PDF Reports</span> — built for your exact chart
          </h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl">{heroSubtitle}</p>

          {/* Trust row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            {[
              { icon: ShieldCheck, label: "100% Lahiri Sidereal" },
              { icon: FileSignature, label: "Hand-checked by Jyotishi" },
              { icon: Mail, label: "PDF in your inbox" },
              { icon: Clock, label: "24-hour delivery promise" },
            ].map((t) => (
              <div key={t.label} className="flex items-center gap-2 rounded-xl bg-card/70 border border-border px-3 py-2">
                <t.icon className="w-4 h-4 text-saffron flex-shrink-0" />
                <span className="text-xs font-medium text-foreground">{t.label}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Report grid */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-heading font-bold text-foreground">Choose your report</h2>

            <div className="grid sm:grid-cols-2 gap-4">
              {REPORTS.map((r) => (
                <article
                  key={r.id}
                  className={cn(
                    "relative flex flex-col rounded-2xl bg-card border border-border p-5 hover:border-saffron/50 hover:shadow-lg transition-all",
                    r.badge === "popular" && "ring-2 ring-saffron/40",
                  )}
                >
                  {r.badge && (
                    <span
                      className={cn(
                        "absolute -top-2.5 left-4 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                        r.badge === "popular" ? "gradient-saffron text-primary-foreground" : "bg-foreground text-background"
                      )}
                    >
                      {r.badge === "popular" ? "Most popular" : "Best value"}
                    </span>
                  )}

                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl gradient-saffron flex items-center justify-center flex-shrink-0 shadow-md shadow-saffron/30">
                      <r.icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-heading font-bold text-foreground leading-tight">{r.title}</h3>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{r.pages}-page PDF • Email delivery</p>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{r.desc}</p>

                  <ul className="space-y-1.5 mb-4 flex-1">
                    {r.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-xs text-foreground">
                        <Check className="w-3.5 h-3.5 text-saffron mt-0.5 flex-shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-end justify-between gap-2 pt-3 border-t border-border">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl font-heading font-bold text-foreground">{fmtINR(r.price)}</span>
                        {r.oldPrice && (
                          <span className="text-xs text-muted-foreground line-through">{fmtINR(r.oldPrice)}</span>
                        )}
                      </div>
                      <span className="text-[10px] text-saffron font-semibold uppercase tracking-wider">
                        Limited launch price
                      </span>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => setSelected(r)}
                      className="gradient-saffron text-primary-foreground shadow-md shadow-saffron/30 hover:opacity-90"
                    >
                      <IndianRupee className="w-3.5 h-3.5 mr-1" /> Buy now
                    </Button>
                  </div>
                </article>
              ))}
            </div>

            {/* How it works */}
            <div className="rounded-2xl border border-border bg-card p-5 mt-6">
              <h3 className="text-sm font-heading font-bold text-foreground mb-4">How report delivery works</h3>
              <ol className="grid md:grid-cols-3 gap-4">
                {[
                  { n: 1, t: "Choose report & pay", d: "Pick a report, enter your email, complete secure payment." },
                  { n: 2, t: "Our Jyotishi prepares it", d: "Your saved chart is analysed manually + AI-assisted." },
                  { n: 3, t: "PDF in your inbox in 24h", d: "Beautifully designed PDF report sent to your email." },
                ].map((s) => (
                  <li key={s.n} className="flex gap-3">
                    <div className="w-7 h-7 rounded-full gradient-saffron text-primary-foreground text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {s.n}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">{s.t}</div>
                      <p className="text-xs text-muted-foreground mt-0.5">{s.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Past orders */}
            {orders.length > 0 && (
              <div className="rounded-2xl border border-border bg-card p-5 mt-2">
                <h3 className="text-sm font-heading font-bold text-foreground mb-3">Your orders</h3>
                <div className="space-y-2">
                  {orders.map((o) => (
                    <div key={o.id} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/60">
                      <div className="w-9 h-9 rounded-lg bg-card flex items-center justify-center">
                        <FileText className="w-4 h-4 text-saffron" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-foreground truncate">{o.reportTitle}</div>
                        <div className="text-[11px] text-muted-foreground truncate">
                          {o.email} • Order {o.id.slice(-6)} • {fmtINR(o.amount)}
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-saffron">
                        <Clock className="w-3 h-3" />
                        Delivers by {new Date(o.deliverBy).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right column — chart preview */}
          <aside className="space-y-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
              Reports use this chart
            </div>
            {chart ? (
              <ChartCard chart={chart} />
            ) : (
              <div className="p-6 rounded-2xl bg-card border border-border text-center">
                <Lock className="w-6 h-6 text-saffron mx-auto mb-2" />
                <p className="text-sm text-foreground font-semibold mb-1">No chart on file</p>
                <p className="text-xs text-muted-foreground mb-4">
                  Generate your Vedic chart first — reports are built from it.
                </p>
                <Link to="/onboarding">
                  <Button size="sm" className="gradient-saffron text-primary-foreground w-full">
                    Set up profile
                  </Button>
                </Link>
              </div>
            )}
          </aside>
        </div>
      </div>

      {/* Checkout modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm p-0 md:p-4 animate-fade-in-up">
          <div className="w-full md:max-w-md bg-card border border-border rounded-t-3xl md:rounded-3xl p-6 shadow-2xl">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl gradient-saffron flex items-center justify-center flex-shrink-0">
                <selected.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-bold text-foreground">{selected.title}</h3>
                <p className="text-[11px] text-muted-foreground">
                  {selected.pages}-page PDF • Delivered in 24 hours
                </p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-muted-foreground hover:text-foreground text-sm"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="rounded-xl bg-secondary p-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Report price</span>
                <span className="font-semibold text-foreground">{fmtINR(selected.price)}</span>
              </div>
              {selected.oldPrice && (
                <div className="flex items-center justify-between text-xs mt-1">
                  <span className="text-muted-foreground">Launch discount</span>
                  <span className="text-saffron font-semibold">
                    – {fmtINR(selected.oldPrice - selected.price)}
                  </span>
                </div>
              )}
              <div className="border-t border-border my-2" />
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-foreground">Total</span>
                <span className="font-heading font-bold text-foreground text-lg">{fmtINR(selected.price)}</span>
              </div>
            </div>

            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Delivery email
            </label>
            <div className="relative mb-4">
              <Mail className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground text-sm border border-border focus:outline-none focus:border-saffron"
              />
            </div>

            <Button
              onClick={placeOrder}
              className="w-full gradient-saffron text-primary-foreground h-11 text-sm font-semibold shadow-md shadow-saffron/30"
            >
              <Lock className="w-4 h-4 mr-2" /> Pay {fmtINR(selected.price)} & order report
            </Button>
            <p className="text-[10px] text-center text-muted-foreground mt-3">
              Secure payment • Refund if not delivered in 24 hours
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
