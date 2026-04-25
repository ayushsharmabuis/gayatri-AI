import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader2, Sparkles, MapPin, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { searchPlaces, type PlaceResult } from "@/lib/geocode";
import { computeVedicChart, fmtDeg, type VedicChart } from "@/lib/astrology";
import { toast } from "@/hooks/use-toast";

const FreeKundali = () => {
  const [form, setForm] = useState({ name: "", date: "", time: "", placeQuery: "", place: null as PlaceResult | null });
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

  // SEO: page-specific title + meta
  useEffect(() => {
    document.title = "Free Kundali Generator Online — Vedic Birth Chart in Hindi | GayatriAI";
    const meta = document.querySelector('meta[name="description"]');
    meta?.setAttribute("content", "Free online Kundali generator — get your accurate Vedic birth chart with Lagna, Rashi, Nakshatra, planetary positions & current Mahadasha. Powered by Swiss Ephemeris.");
  }, []);

  const handleGenerate = async () => {
    if (!form.date || !form.time || !form.place) {
      toast({ title: "Missing details", description: "Date, time aur place — teeno chahiye." });
      return;
    }
    setComputing(true);
    try {
      const c = await computeVedicChart({
        date: form.date, time: form.time, place: form.place.formatted,
        lat: form.place.lat, lng: form.place.lng, tzOffsetHours: form.place.tzOffsetHours,
      });
      setChart(c);
      setTimeout(() => document.getElementById("kundali-result")?.scrollIntoView({ behavior: "smooth" }), 100);
    } catch (e) {
      toast({ title: "Error", description: "Chart generate nahi ho saka. Try again.", variant: "destructive" });
    } finally { setComputing(false); }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>

          <header className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-semibold uppercase tracking-wider mb-4">
              100% Free • No Signup
            </span>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-3">
              Free <span className="text-gradient-saffron">Kundali Generator</span> Online
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              Generate your accurate Vedic birth chart instantly — Lagna, Rashi, Nakshatra, all 9 grahas aur current Mahadasha. Powered by NASA-grade Swiss Ephemeris.
            </p>
          </header>

          <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
            <h2 className="text-xl font-heading font-bold text-foreground mb-6">Enter your birth details</h2>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="name" className="text-sm">Name (optional)</Label>
                <Input id="name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Aapka naam" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="date" className="text-sm">Date of Birth *</Label>
                <Input id="date" type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="time" className="text-sm">Time of Birth *</Label>
                <Input id="time" type="time" value={form.time} onChange={e => setForm({...form, time: e.target.value})} className="mt-1.5" />
                <p className="text-xs text-muted-foreground mt-1">Exact time se Lagna calculate hoti hai</p>
              </div>
              <div className="relative">
                <Label htmlFor="place" className="text-sm">Place of Birth *</Label>
                <div className="relative mt-1.5">
                  <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="place"
                    value={form.placeQuery}
                    onChange={e => setForm({...form, placeQuery: e.target.value, place: null})}
                    placeholder="City, country"
                    className="pl-9"
                    autoComplete="off"
                  />
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
            </div>

            <Button onClick={handleGenerate} disabled={computing} size="lg" className="w-full mt-6 gradient-saffron text-primary-foreground font-semibold">
              {computing ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Calculating chart...</> : <><Sparkles className="w-4 h-4 mr-2" /> Generate My Free Kundali</>}
            </Button>
          </div>

          {chart && (
            <div id="kundali-result" className="mt-10 space-y-6">
              <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
                <h2 className="text-xl font-heading font-bold text-foreground mb-1">Aapki Kundali {form.name && `— ${form.name}`}</h2>
                <p className="text-xs text-muted-foreground mb-6">Born {form.date} at {form.time}, {form.place?.formatted}</p>

                <div className="grid sm:grid-cols-3 gap-4 mb-6">
                  {[
                    { label: "Lagna (Ascendant)", value: chart.lagna.rashi, sub: fmtDeg(chart.lagna.degInSign) },
                    { label: "Chandra Rashi", value: chart.moon.rashi, sub: fmtDeg(chart.moon.degInSign) },
                    { label: "Nakshatra", value: chart.nakshatra.name, sub: `Pada ${chart.nakshatra.pada} • ${chart.nakshatra.lord}` },
                  ].map(c => (
                    <div key={c.label} className="p-4 rounded-xl bg-secondary border border-border">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">{c.label}</p>
                      <p className="font-heading font-bold text-foreground">{c.value}</p>
                      <p className="text-xs text-muted-foreground">{c.sub}</p>
                    </div>
                  ))}
                </div>

                <h3 className="font-heading font-semibold text-foreground mb-3">Planetary Positions (9 Grahas)</h3>
                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full text-sm">
                    <thead className="bg-secondary">
                      <tr>
                        <th className="text-left p-3 font-semibold">Graha</th>
                        <th className="text-left p-3 font-semibold">Rashi</th>
                        <th className="text-left p-3 font-semibold">Degrees</th>
                        <th className="text-left p-3 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {chart.planets.map(p => (
                        <tr key={p.name} className="border-t border-border">
                          <td className="p-3 font-medium text-foreground">{p.name}</td>
                          <td className="p-3 text-muted-foreground">{p.rashi}</td>
                          <td className="p-3 text-muted-foreground">{fmtDeg(p.degInSign)}</td>
                          <td className="p-3 text-xs">{p.retrograde ? <span className="text-saffron font-semibold">Retrograde (R)</span> : <span className="text-muted-foreground">Direct</span>}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mt-6">
                  <div className="p-4 rounded-xl gradient-saffron text-primary-foreground">
                    <p className="text-[10px] uppercase tracking-wider opacity-80 font-semibold mb-1">Current Mahadasha</p>
                    <p className="font-heading font-bold text-lg">{chart.mahadasha.lord}</p>
                    <p className="text-xs opacity-90">Until {chart.mahadasha.end.toLocaleDateString()}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-card border border-saffron/30">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Current Antardasha</p>
                    <p className="font-heading font-bold text-foreground text-lg">{chart.antardasha.lord}</p>
                    <p className="text-xs text-muted-foreground">Until {chart.antardasha.end.toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              <div className="text-center p-6 rounded-2xl bg-secondary border border-border">
                <Star className="w-8 h-8 text-saffron mx-auto mb-3" />
                <h3 className="font-heading font-bold text-foreground mb-2">Want detailed predictions on this chart?</h3>
                <p className="text-sm text-muted-foreground mb-4">Sign up free and ask GayatriAI anything about your kundali — career, marriage, dasha effects, remedies.</p>
                <Link to="/signup">
                  <Button className="gradient-saffron text-primary-foreground">Ask AI About My Chart</Button>
                </Link>
              </div>
            </div>
          )}

          {/* SEO content */}
          <article className="mt-16 prose prose-sm md:prose-base max-w-none text-muted-foreground">
            <h2 className="text-2xl font-heading font-bold text-foreground">About this Free Kundali Generator</h2>
            <p>Hamara free online kundali generator authentic Vedic Jyotish principles aur NASA-grade Swiss Ephemeris use karta hai aapki accurate birth chart calculate karne ke liye. Sirf 3 details chahiye — date of birth, time of birth, aur place of birth.</p>
            <h3 className="text-xl font-heading font-bold text-foreground mt-6">Aapko kya milega?</h3>
            <ul>
              <li><strong>Lagna (Ascendant):</strong> Birth ke samay east horizon par jo rashi udh rahi thi</li>
              <li><strong>Chandra Rashi:</strong> Aapka Vedic Moon sign — personality aur emotional nature</li>
              <li><strong>Nakshatra:</strong> 27 lunar mansions mein se aapka nakshatra aur pada</li>
              <li><strong>9 Grahas:</strong> Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu — exact positions</li>
              <li><strong>Mahadasha & Antardasha:</strong> Current planetary period — kis grah ka time chal raha hai</li>
            </ul>
            <p>100% free, no signup required, aur calculations same hain jo professional Jyotish acharyas use karte hain.</p>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FreeKundali;
