import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const FinalCTA = () => {
  const navigate = useNavigate();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-28 gradient-saffron relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-primary-foreground blur-3xl" />
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-primary-foreground blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary-foreground blur-3xl" />
      </div>
      <div className="container mx-auto px-4 text-center relative z-10" ref={ref}>
        <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <Sparkles className="w-12 h-12 text-primary-foreground/60 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground mb-5 max-w-3xl mx-auto leading-tight">
            Still thinking? Your answer is just one question away
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-10 max-w-md mx-auto">Free. Instant. No signup required.</p>
          <Button
            onClick={() => navigate("/signup")}
            size="lg"
            className="bg-primary-foreground text-saffron font-heading font-semibold text-lg px-10 py-7 hover:bg-primary-foreground/90 transition-all hover:scale-105 duration-300"
          >
            Ask Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
