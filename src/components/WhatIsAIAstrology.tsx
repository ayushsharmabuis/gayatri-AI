import { Brain, BookOpen, Sparkles } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const WhatIsAIAstrology = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="what-is-ai-astrology" className="py-24 bg-secondary">
      <div className="container mx-auto px-4 max-w-5xl" ref={ref}>
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-semibold uppercase tracking-wider mb-4">
            Learn
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-3">
            AI Astrology <span className="text-gradient-saffron">Kya Hai?</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            Traditional Vedic Jyotish + modern Artificial Intelligence — dono ka powerful combination.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {[
            { icon: BookOpen, title: "Vedic Foundation", desc: "5,000+ saal purani Jyotish Shastra — Brihat Parashara Hora Shastra, Phaladeepika jaise classical granthon par based." },
            { icon: Brain, title: "AI Engine", desc: "Modern Large Language Models jo aapki kundali, dasha, transit aur yogas ko seconds mein analyze karte hain." },
            { icon: Sparkles, title: "Personalized Output", desc: "Generic horoscope nahi — aapke exact birth chart se nikla hua personal, situational guidance." },
          ].map((c, i) => (
            <div
              key={c.title}
              className={`p-6 rounded-2xl bg-card border border-border hover:border-saffron/40 hover:shadow-lg transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 120 + 200}ms` }}
            >
              <div className="w-12 h-12 rounded-xl gradient-saffron flex items-center justify-center mb-4 shadow-md">
                <c.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-heading font-bold text-lg text-foreground mb-2">{c.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>

        <div className={`prose prose-sm md:prose-base max-w-none text-muted-foreground space-y-4 transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "500ms" }}>
          <p>
            <strong className="text-foreground">AI Astrology</strong> ka matlab hai — artificial intelligence ka use karke Vedic astrology principles ko apply karna. Pehle ek pandit ji ghanton baith ke kundali calculate karte the, planetary positions dekhte the, dasha periods nikalte the. Aaj AI yeh sab kaam <strong className="text-foreground">milliseconds</strong> mein kar deta hai — bina ek bhi calculation galti ke.
          </p>
          <p>
            GayatriAI ke andar do cheezein milti hain: <strong className="text-foreground">Swiss Ephemeris</strong> (NASA-grade planetary calculation engine) jo aapki exact birth chart banata hai using Lahiri Ayanamsa, aur ek <strong className="text-foreground">specially trained AI model</strong> jo us chart ko classical Vedic texts ke logic se interpret karta hai. Result — ek conversational astrologer jo 24/7 available hai, judgment-free hai, aur Hindi-English-Hinglish teeno mein baat kar sakta hai.
          </p>
          <p>
            Yeh replacement nahi hai pandit ji ka — yeh ek <strong className="text-foreground">accessible first layer</strong> hai jahan aap apne sawaal puch sakte hain bina paisa, time, ya judgment ki tension ke. Complex life decisions ke liye hum hamesha recommend karte hain ki AI insight ke saath ek experienced acharya se bhi consult karein.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhatIsAIAstrology;
