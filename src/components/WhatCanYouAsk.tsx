import { Briefcase, Heart, Gem, Wallet, Activity, CalendarCheck, GraduationCap, Plane } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const topics = [
  { icon: Briefcase, title: "Career & Job", desc: "Job changes, promotions, business success, right career path", color: "from-orange-500 to-amber-500" },
  { icon: Heart, title: "Love & Relationships", desc: "Compatibility, timing for love, relationship guidance & healing", color: "from-rose-500 to-pink-500" },
  { icon: Gem, title: "Marriage & Kundali Milan", desc: "Kundali matching, marriage timing, spouse predictions", color: "from-purple-500 to-violet-500" },
  { icon: Wallet, title: "Finance & Wealth", desc: "Investments, wealth growth, financial stability & prosperity", color: "from-emerald-500 to-green-500" },
  { icon: Activity, title: "Health & Wellness", desc: "Health predictions, dosha analysis, Ayurvedic remedies", color: "from-cyan-500 to-teal-500" },
  { icon: CalendarCheck, title: "Shubh Muhurat", desc: "Auspicious dates for marriage, business, travel & more", color: "from-amber-500 to-yellow-500" },
  { icon: GraduationCap, title: "Education & Studies", desc: "Best streams, exam success, higher education timing", color: "from-blue-500 to-indigo-500" },
  { icon: Plane, title: "Travel & Foreign Settlement", desc: "Foreign travel yoga, settlement abroad, visa timing", color: "from-sky-500 to-blue-500" },
];

const WhatCanYouAsk = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-24 bg-secondary relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-semibold uppercase tracking-wider mb-4">
            Explore Topics
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            What Can You <span className="text-gradient-saffron">Ask Gayatri?</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg">
            Get detailed Vedic astrology insights on every important aspect of your life — in Hindi or English
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {topics.map((t, i) => (
            <div
              key={t.title}
              className={`group p-6 rounded-2xl bg-card border border-border hover:border-saffron/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 cursor-default ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${i * 80 + 200}ms` }}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${t.color} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg`}>
                <t.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-base font-heading font-semibold text-foreground mb-2">{t.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatCanYouAsk;
