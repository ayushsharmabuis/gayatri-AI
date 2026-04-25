import { useState, useEffect } from "react";
import { Menu, X, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation, Link } from "react-router-dom";
import logo from "@/assets/gayatri-logo.png";

const STREAK_KEY = "gayatriai_streak_v1";

interface StreakData {
  count: number;
  lastVisit: string; // YYYY-MM-DD
}

const todayStr = () => new Date().toISOString().slice(0, 10);

const dayDiff = (a: string, b: string) => {
  const ms = new Date(b).getTime() - new Date(a).getTime();
  return Math.round(ms / 86_400_000);
};

const computeStreak = (): number => {
  try {
    const today = todayStr();
    const raw = localStorage.getItem(STREAK_KEY);
    const prev: StreakData | null = raw ? JSON.parse(raw) : null;

    if (!prev) {
      const fresh: StreakData = { count: 1, lastVisit: today };
      localStorage.setItem(STREAK_KEY, JSON.stringify(fresh));
      return 1;
    }
    if (prev.lastVisit === today) return prev.count;

    const diff = dayDiff(prev.lastVisit, today);
    const next: StreakData = {
      count: diff === 1 ? prev.count + 1 : 1,
      lastVisit: today,
    };
    localStorage.setItem(STREAK_KEY, JSON.stringify(next));
    return next.count;
  } catch {
    return 1;
  }
};

const navItems = [
  { label: "Home", target: "hero", isHash: true },
  { label: "How It Works", target: "how-it-works", isHash: true },
  { label: "Free Kundali", target: "/free-kundali", isHash: false },
  { label: "Rashi Calculator", target: "/rashi-calculator", isHash: false },
  { label: "Pricing", target: "pricing", isHash: true },
  { label: "FAQ", target: "faq", isHash: true },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [streak, setStreak] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const onLanding = location.pathname === "/";

  useEffect(() => {
    setStreak(computeStreak());
  }, []);

  const handleNav = (item: typeof navItems[number]) => {
    setIsOpen(false);
    if (item.isHash) {
      if (!onLanding) {
        navigate("/");
        setTimeout(() => document.getElementById(item.target)?.scrollIntoView({ behavior: "smooth" }), 100);
      } else {
        document.getElementById(item.target)?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(item.target);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="GayatriAI logo" className="w-14 h-14 md:w-16 md:h-16 object-contain" />
          <span className="text-2xl md:text-3xl font-heading font-bold text-gradient-saffron">GayatriAI</span>
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNav(item)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </button>
          ))}
          {streak > 0 && (
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-saffron/10 border border-saffron/30 text-saffron text-xs font-bold shadow-sm shadow-saffron/10"
              title={`${streak}-day visit streak — keep it going!`}
            >
              <Flame className="w-3.5 h-3.5 fill-saffron" />
              {streak}
            </div>
          )}
          <Button
            onClick={() => navigate("/signup")}
            className="gradient-saffron text-primary-foreground font-semibold px-6 hover:opacity-90 transition-opacity"
          >
            Try for Free
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          {streak > 0 && (
            <div
              className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-saffron/10 border border-saffron/30 text-saffron text-xs font-bold"
              title={`${streak}-day streak`}
            >
              <Flame className="w-3.5 h-3.5 fill-saffron" />
              {streak}
            </div>
          )}
          <button className="text-foreground" onClick={() => setIsOpen(!isOpen)} aria-label="Menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-background border-b border-border px-4 pb-4 space-y-3">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNav(item)}
              className="block w-full text-left text-sm font-medium text-muted-foreground hover:text-foreground py-1"
            >
              {item.label}
            </button>
          ))}
          <Button onClick={() => navigate("/signup")} className="w-full gradient-saffron text-primary-foreground font-semibold">
            Try for Free
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
