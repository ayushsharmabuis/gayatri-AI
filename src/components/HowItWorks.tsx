import { CalendarDays, MessageCircle, Sparkles, ArrowRight, Lock, Brain, Scroll } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const steps = [
  {
    icon: CalendarDays,
    step: "01",
    title: "Share Your Birth Details",
    desc: "Enter your date of birth, exact time of birth (to the minute), and birthplace city. These three pieces of information are the foundation of every accurate Vedic kundali — they let us calculate your exact Lagna (ascendant), planetary degrees, and dasha periods.",
    bullet: "Birth time accuracy se Lagna change ho sakti hai — isliye exact time zaroori hai. Agar exact time pata nahi, approximate bhi chalega.",
    highlight: "30 seconds",
  },
  {
    icon: Brain,
    step: "02",
    title: "AI Engine Calculates Your Chart",
    desc: "Our system uses NASA-grade Swiss Ephemeris with Lahiri Ayanamsa to generate your complete Vedic chart — all 9 grahas, 27 nakshatras, 12 bhavas, current Mahadasha aur Antardasha. Calculations precise to the second hain, koi mathematical galti nahi.",
    bullet: "Swiss Ephemeris wahi standard engine hai jo professional astrologers aur observatories use karte hain.",
    highlight: "Real-time",
  },
  {
    icon: Scroll,
    step: "03",
    title: "Vedic AI Interprets the Chart",
    desc: "Hamara specially trained AI model — fine-tuned on Brihat Parashara Hora Shastra, Phaladeepika aur Saravali — aapke chart ko classical Jyotish principles se interpret karta hai. Generic horoscope nahi, aapke specific yogas, dasha, aur transit ke hisaab se personalized analysis.",
    bullet: "Har response shastra-based logic se aata hai — generic chatbot answers nahi.",
    highlight: "Shastra-based",
  },
  {
    icon: MessageCircle,
    step: "04",
    title: "Ask Anything — Hindi or English",
    desc: "Conversational interface mein freely puchein — career, marriage, health, finance, education, travel — kuch bhi. AI aapke chart aur current dasha ke context mein answer deta hai. Hinglish bhi chalega, judgment-free zone hai.",
    bullet: "Examples: 'Job change ka time sahi hai?', 'Shaadi kab hogi?', 'Mangal dosha hai kya?'",
    highlight: "24/7 available",
  },
  {
    icon: Sparkles,
    step: "05",
    title: "Get Predictions, Remedies & Muhurat",
    desc: "Sirf prediction nahi — practical remedies bhi milte hain (mantras, gemstones, donations, fasts), aur shubh muhurat for important events (marriage, business launch, naya ghar). Sab kuch downloadable PDF format mein bhi.",
    bullet: "Premium users ko full 30-page detailed birth report bhi milta hai.",
    highlight: "Actionable",
  },
  {
    icon: Lock,
    step: "06",
    title: "Your Data Stays Private",
    desc: "Aapki birth details aur chats SSL encrypted hain, server pe encrypted at rest hain, aur kabhi kisi third party ko share nahi hote. Account delete karte hi sab data permanent erase ho jata hai.",
    bullet: "Bank-grade security. We never sell your data — wo hamara permanent commitment hai.",
    highlight: "100% private",
  },
];

const HowItWorks = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="how-it-works" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full gradient-saffron blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative" ref={ref}>
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-semibold uppercase tracking-wider mb-4">
            Kaise Kaam Karta Hai
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-3">
            How <span className="text-gradient-saffron">GayatriAI</span> Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            Birth details se lekar personalized Vedic guidance tak — 6 detailed steps mein samjhein hamara process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {steps.map((s, i) => (
            <div
              key={s.step}
              className={`relative group transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${i * 100 + 200}ms` }}
            >
              <div className="relative h-full p-7 rounded-3xl bg-card border border-border hover:border-saffron/40 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 overflow-hidden">
                <span className="absolute -top-4 -right-2 text-[110px] font-heading font-bold text-saffron/5 leading-none select-none">
                  {s.step}
                </span>

                <div className="relative w-14 h-14 rounded-2xl gradient-saffron flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 mb-5">
                  <s.icon className="w-7 h-7 text-primary-foreground" />
                </div>

                <div className="relative flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-xs font-bold uppercase tracking-wider text-saffron">Step {s.step}</span>
                  <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-accent text-accent-foreground uppercase tracking-wider">
                    {s.highlight}
                  </span>
                </div>

                <h3 className="relative text-lg font-heading font-bold text-foreground mb-2 leading-tight">
                  {s.title}
                </h3>
                <p className="relative text-sm text-muted-foreground leading-relaxed mb-3">
                  {s.desc}
                </p>
                <p className="relative text-xs text-muted-foreground/80 italic border-l-2 border-saffron/40 pl-3">
                  {s.bullet}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-3xl mx-auto p-6 md:p-8 rounded-2xl bg-secondary border border-border text-center">
          <h3 className="font-heading font-bold text-foreground text-xl mb-3">Pure process under 60 seconds</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Birth details enter karne se lekar pehla AI response milne tak — 1 minute se kam. No appointments, no waiting rooms, no expensive fees. Bas pure Vedic Jyotish, instant access.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
