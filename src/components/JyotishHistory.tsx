import { ScrollText } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const JyotishHistory = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="jyotish-history" className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-3xl text-center" ref={ref}>
        <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="w-14 h-14 rounded-2xl gradient-saffron flex items-center justify-center mx-auto mb-5 shadow-lg">
            <ScrollText className="w-7 h-7 text-primary-foreground" />
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
            Jyotish Shastra ka <span className="text-gradient-saffron">Itihas</span>
          </h2>
          <div className="text-muted-foreground leading-relaxed space-y-3 text-base md:text-lg">
            <p>
              <strong className="text-foreground">Jyotish</strong> — "the science of light" — is one of the six Vedangas (limbs of the Vedas), with its earliest references in the <strong className="text-foreground">Rigveda over 5,000 years ago</strong>.
            </p>
            <p>
              Maharshi <strong className="text-foreground">Parashara</strong> systematized it in <em>Brihat Parashara Hora Shastra</em>, while sages like Varahamihira, Jaimini, and Bhrigu refined predictive techniques across centuries.
            </p>
            <p>
              Today, this same shastra-based wisdom — preserved through generations of acharyas — powers GayatriAI's modern conversational interface.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JyotishHistory;
