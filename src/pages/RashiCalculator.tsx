import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader2, Star, MapPin, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { searchPlaces, type PlaceResult } from "@/lib/geocode";
import { computeVedicChart, type VedicChart } from "@/lib/astrology";
import { toast } from "@/hooks/use-toast";

const rashiInfo: Record<string, { lord: string; element: string; trait: string }> = {
  "Mesha (Aries)": { lord: "Mars", element: "Fire", trait: "Bold, energetic, pioneering" },
  "Vrishabha (Taurus)": { lord: "Venus", element: "Earth", trait: "Patient, sensual, grounded" },
  "Mithuna (Gemini)": { lord: "Mercury", element: "Air", trait: "Curious, witty, adaptable" },
  "Karka (Cancer)": { lord: "Moon", element: "Water", trait: "Emotional, nurturing, intuitive" },
  "Simha (Leo)": { lord: "Sun", element: "Fire", trait: "Confident, regal, generous" },
  "Kanya (Virgo)": { lord: "Mercury", element: "Earth", trait: "Analytical, precise, helpful" },
  "Tula (Libra)": { lord: "Venus", element: "Air", trait: "Diplomatic, balanced, charming" },
  "Vrischika (Scorpio)": { lord: "Mars", element: "Water", trait: "Intense, mysterious, transformative" },
  "Dhanu (Sagittarius)": { lord: "Jupiter", element: "Fire", trait: "Optimistic, philosophical, adventurous" },
  "Makara (Capricorn)": { lord: "Saturn", element: "Earth", trait: "Disciplined, ambitious, practical" },
  "Kumbha (Aquarius)": { lord: "Saturn", element: "Air", trait: "Innovative, humanitarian, independent" },
  "Meena (Pisces)": { lord: "Jupiter", element: "Water", trait: "Compassionate, dreamy, spiritual" },
};

const RashiCalculator = () => {
  const [form, setForm] = useState({ date: "", time: "", placeQuery: "", place: null as PlaceResult | null });
  const [results, setResults] = useState<PlaceResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [open, setOpen] = useState(false);
  const [computing, setComputing] = useState(false);
  const [chart, setChart] = useState<VedicChart | null>(null);
  const debounce = useRef<number | null>(null);

  useEffect(() => {
    if (debounce.current) window.clearTimeout(debounce.current);
    if (form.place && form.place.formatted === form.placeQuery) { setResults([]); setOpen(false); return; }
    if (form.placeQuery.trim().length < 2) { setResults([]); return; }
    debounce.current = window.setTimeout(async () => {
      setSearching(true);
      try { setResults(await searchPlaces(form.placeQuery)); setOpen(true); } catch {}
      finally { setSearching(false); }
    }, 350);
  }, [form.placeQuery, form.place]);

  useEffect(() => {
    document.title = "Free Rashi Calculator — Find Your Vedic Moon Sign & Nakshatra | GayatriAI";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Free Rashi Calculator — find your accurate Vedic Moon sign (Chandra Rashi) and Nakshatra. Different from Western Sun sign. Sidereal calculation with Lahiri Ayanamsa.");
  }, []);

  const handleCalc = async () => {
    if (!form.date || !form.time || !form.place) {
      toast({ title: "Missing details", description: "Date, time, place teeno chahiye." });
      return;
    }
    setComputing(true);
    try {
      const c = await computeVedicChart({
        date: form.date, time: form.time, place: form.place.formatted,
        lat: form.place.lat, lng: form.place.lng, tzOffsetHours: form.place.tzOffsetHours,
      });
      setChart(c);
      setTimeout(() => document.getElementById("rashi-result")?.scrollIntoView({ behavior: "smooth" }), 100);
    } catch { toast({ title: "Error", description: "Calculate nahi ho saka.", variant: "destructive" }); }
    finally { setComputing(false); }
  };

  const info = chart ? rashiInfo[chart.moon.rashi] : null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>

          <header className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-semibold uppercase tracking-wider mb-4">
              Free Vedic Tool
            </span>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-3">
              Free <span className="text-gradient-saffron">Rashi Calculator</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg">
              Find your accurate Vedic Moon sign (Chandra Rashi) aur Nakshatra. Note: Yeh aapki Western Sun sign se alag ho sakta hai!
            </p>
          </header>

          <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="date" className="text-sm">Date of Birth</Label>
                  <Input id="date" type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="time" className="text-sm">Time of Birth</Label>
                  <Input id="time" type="time" value={form.time} onChange={e => setForm({...form, time: e.target.value})} className="mt-1.5" />
                </div>
              </div>
              <div className="relative">
                <Label htmlFor="place" className="text-sm">Place of Birth</Label>
                <div className="relative mt-1.5">
                  <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input id="place" value={form.placeQuery} onChange={e => setForm({...form, placeQuery: e.target.value, place: null})} placeholder="City, country" className="pl-9" autoComplete="off" />
                  {searching && <Loader2 className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-muted-foreground" />}
                </div>
                {open && results.length > 0 && (
                  <div className="absolute z-20 mt-1 w-full bg-popover border border-border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {results.map((r, i) => (
                      <button key={i} onClick={() => setForm({...form, place: r, placeQuery: r.formatted})} className="w-full text-left px-3 py-2 text-sm hover:bg-accent border-b border-border last:border-0">
                        {r.formatted}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <Button onClick={handleCalc} disabled={computing} size="lg" className="w-full gradient-saffron text-primary-foreground font-semibold">
                {computing ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Calculating...</> : <><Star className="w-4 h-4 mr-2" />Find My Rashi</>}
              </Button>
            </div>
          </div>

          {chart && info && (
            <div id="rashi-result" className="mt-10 space-y-6">
              <div className="p-6 md:p-8 rounded-2xl gradient-saffron text-primary-foreground text-center shadow-xl">
                <p className="text-xs uppercase tracking-wider opacity-80 font-semibold mb-2">Your Vedic Moon Sign (Chandra Rashi)</p>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2">{chart.moon.rashi}</h2>
                <p className="text-sm opacity-90">{info.trait}</p>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-card border border-border text-center">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Rashi Lord</p>
                  <p className="font-heading font-bold text-foreground">{info.lord}</p>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border text-center">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Element</p>
                  <p className="font-heading font-bold text-foreground">{info.element}</p>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border text-center">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Nakshatra</p>
                  <p className="font-heading font-bold text-foreground">{chart.nakshatra.name}</p>
                  <p className="text-xs text-muted-foreground">Pada {chart.nakshatra.pada}</p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-secondary border border-border text-center">
                <Sparkles className="w-8 h-8 text-saffron mx-auto mb-3" />
                <h3 className="font-heading font-bold text-foreground mb-2">Want full chart analysis?</h3>
                <p className="text-sm text-muted-foreground mb-4">Get your complete Vedic kundali with all 9 grahas, dasha & remedies.</p>
                <Link to="/free-kundali">
                  <Button className="gradient-saffron text-primary-foreground">Generate Full Kundali</Button>
                </Link>
              </div>
            </div>
          )}

          {/* SEO content */}
          <article className="mt-16 prose prose-sm md:prose-base max-w-none text-muted-foreground">
            <h2 className="text-2xl font-heading font-bold text-foreground">Vedic Rashi vs Western Sun Sign</h2>
            <p>Western astrology mein "zodiac sign" aapki <strong>Sun sign</strong> hoti hai. Vedic astrology mein "Rashi" aapki <strong>Moon sign</strong> hoti hai — aur dono ki calculation method bhi alag hai (sidereal vs tropical). Isiliye aapki Vedic Rashi aksar Western sign se ek step peeche hoti hai.</p>
            <h3 className="text-xl font-heading font-bold text-foreground mt-6">Rashi kyun important hai?</h3>
            <p>Vedic Jyotish mein Chandra Rashi mind, emotions, aur subconscious patterns ko represent karti hai. Daily horoscope, dasha calculations, aur muhurat — sab Moon sign ke base par hote hain, na ki Sun sign par.</p>
            <h3 className="text-xl font-heading font-bold text-foreground mt-6">Nakshatra ka role</h3>
            <p>27 nakshatras (lunar mansions) mein se aapka birth nakshatra aapki Vimshottari Mahadasha decide karta hai. Yeh aapki personality ke deeper layers aur life ke timing patterns batata hai.</p>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RashiCalculator;
