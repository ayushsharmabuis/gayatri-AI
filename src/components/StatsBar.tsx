import { MessageSquare, Star, Globe, Clock } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useEffect, useState } from "react";

const stats = [
  { icon: MessageSquare, value: 10000, suffix: "+", label: "Questions Answered" },
  { icon: Star, value: 4.8, suffix: "★", label: "User Rating", isDecimal: true },
  { icon: Globe, value: 0, suffix: "", label: "Hindi & English", text: "Hindi & English" },
  { icon: Clock, value: 0, suffix: "", label: "Available", text: "24/7" },
];

const AnimatedNumber = ({ target, suffix, isDecimal, text }: { target: number; suffix: string; isDecimal?: boolean; text?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (text) return;
    const duration = 1500;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target, text]);

  if (text) return <>{text}</>;
  return <>{isDecimal ? count.toFixed(1) : Math.floor(count).toLocaleString()}{suffix}</>;
};

const StatsBar = () => {
  const { ref, isVisible } = useScrollAnimation(0.3);

  return (
    <section ref={ref} className="py-10 gradient-saffron">
      <div className="container mx-auto px-4">
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center text-center text-primary-foreground">
              <s.icon className="w-6 h-6 mb-2 opacity-90" />
              <span className="text-2xl md:text-3xl font-heading font-bold">
                {isVisible && <AnimatedNumber target={s.value} suffix={s.suffix} isDecimal={s.isDecimal} text={s.text} />}
              </span>
              <span className="text-sm opacity-80">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
