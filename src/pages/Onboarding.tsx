import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, CalendarDays, Clock, MapPin, Sparkles, Loader2, Check } from "lucide-react";
import { searchPlaces, type PlaceResult } from "@/lib/geocode";
import { computeVedicChart, saveChart } from "@/lib/astrology";
import { toast } from "@/hooks/use-toast";

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    date: "",
    time: "",
    placeQuery: "",
    place: null as PlaceResult | null,
    gender: "",
  });
  const [computing, setComputing] = useState(false);

  // ---- Place autocomplete ----
  const [results, setResults] = useState<PlaceResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const debounceRef = useRef<number | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    if (form.place && form.place.formatted === form.placeQuery) {
      setResults([]);
      setOpenDropdown(false);
      return;
    }
    if (form.placeQuery.trim().length < 2) {
      setResults([]);
      return;
    }
    debounceRef.current = window.setTimeout(async () => {
      abortRef.current?.abort();
      const ctrl = new AbortController();
      abortRef.current = ctrl;
      setSearching(true);
      try {
        const res = await searchPlaces(form.placeQuery, ctrl.signal);
        setResults(res);
        setOpenDropdown(true);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error(err);
        }
      } finally {
        setSearching(false);
      }
    }, 350);
    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, [form.placeQuery, form.place]);

  const steps = [
    { title: "When were you born?", subtitle: "Your birth date is the foundation of your Vedic chart", icon: CalendarDays, key: "date" as const },
    { title: "What time were you born?", subtitle: "Accurate time helps determine your ascendant (Lagna)", icon: Clock, key: "time" as const },
    { title: "Where were you born?", subtitle: "Birth location affects planetary positions in your chart", icon: MapPin, key: "place" as const },
    { title: "Select your gender", subtitle: "Some Vedic calculations differ based on gender", icon: Sparkles, key: "gender" as const },
  ];

  const current = steps[step];
  const isLast = step === steps.length - 1;
  const Icon = current.icon;

  const canProceed = (() => {
    if (current.key === "date") return !!form.date;
    if (current.key === "time") return !!form.time;
    if (current.key === "place") return !!form.place;
    if (current.key === "gender") return !!form.gender;
    return false;
  })();

  const handleFinish = async () => {
    if (!form.place) return;
    setComputing(true);
    try {
      const chart = await computeVedicChart({
        date: form.date,
        time: form.time,
        place: form.place.formatted,
        lat: form.place.lat,
        lng: form.place.lng,
        tzOffsetHours: form.place.tzOffsetHours,
        gender: form.gender,
      });
      saveChart(chart);
      toast({ title: "Your Vedic chart is ready ✨", description: `Lagna: ${chart.lagna.rashi.split(" ")[0]} • Moon: ${chart.moon.rashi.split(" ")[0]} • ${chart.nakshatra.name}` });
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast({ title: "Could not compute your chart", description: (err as Error).message ?? "Please try again.", variant: "destructive" });
    } finally {
      setComputing(false);
    }
  };

  const handleNext = () => {
    if (isLast) handleFinish();
    else setStep(step + 1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
      {/* Progress */}
      <div className="w-full max-w-md mb-10">
        <div className="flex gap-2">
          {steps.map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i <= step ? "gradient-saffron" : "bg-border"}`} />
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-2">Step {step + 1} of {steps.length}</p>
      </div>

      <div className="w-full max-w-md animate-fade-in-up">
        <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-accent flex items-center justify-center">
          <Icon className="w-7 h-7 text-saffron" />
        </div>

        <h1 className="text-2xl font-heading font-bold text-foreground text-center mb-2">{current.title}</h1>
        <p className="text-sm text-muted-foreground text-center mb-8">{current.subtitle}</p>

        <div className="mb-8">
          {current.key === "date" && (
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full px-4 py-4 rounded-xl bg-secondary text-foreground text-sm border border-border focus:outline-none focus:border-saffron transition-colors"
            />
          )}
          {current.key === "time" && (
            <input
              type="time"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              className="w-full px-4 py-4 rounded-xl bg-secondary text-foreground text-sm border border-border focus:outline-none focus:border-saffron transition-colors"
            />
          )}
          {current.key === "place" && (
            <div className="relative">
              <div className="relative">
                <input
                  type="text"
                  value={form.placeQuery}
                  onChange={(e) => setForm({ ...form, placeQuery: e.target.value, place: null })}
                  onFocus={() => results.length > 0 && setOpenDropdown(true)}
                  placeholder="Type your birth city — e.g. Mumbai, Jaipur, London"
                  className="w-full px-4 py-4 pr-10 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground text-sm border border-border focus:outline-none focus:border-saffron transition-colors"
                  autoComplete="off"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {searching ? (
                    <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />
                  ) : form.place ? (
                    <Check className="w-4 h-4 text-saffron" />
                  ) : (
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
              </div>

              {openDropdown && results.length > 0 && (
                <ul className="absolute z-30 w-full mt-2 bg-card border border-border rounded-xl shadow-xl max-h-64 overflow-y-auto">
                  {results.map((r, i) => (
                    <li key={`${r.lat}-${r.lng}-${i}`}>
                      <button
                        type="button"
                        onClick={() => {
                          setForm({ ...form, place: r, placeQuery: r.formatted });
                          setOpenDropdown(false);
                        }}
                        className="w-full text-left px-4 py-3 text-sm hover:bg-accent transition-colors flex items-start gap-2"
                      >
                        <MapPin className="w-3.5 h-3.5 text-saffron mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-foreground truncate">{r.formatted}</div>
                          <div className="text-[11px] text-muted-foreground">
                            {r.lat.toFixed(4)}°, {r.lng.toFixed(4)}° • {r.tzName ?? `UTC${r.tzOffsetHours >= 0 ? "+" : ""}${r.tzOffsetHours}`}
                          </div>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {form.place && (
                <p className="mt-2 text-[11px] text-muted-foreground">
                  ✓ {form.place.formatted} • UTC{form.place.tzOffsetHours >= 0 ? "+" : ""}{form.place.tzOffsetHours}h
                </p>
              )}
            </div>
          )}
          {current.key === "gender" && (
            <div className="grid grid-cols-3 gap-3">
              {["Male", "Female", "Other"].map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setForm({ ...form, gender: g })}
                  className={`px-4 py-4 rounded-xl border text-sm font-medium transition-all ${
                    form.gender === g
                      ? "border-saffron bg-accent text-accent-foreground"
                      : "border-border bg-secondary text-muted-foreground hover:border-saffron/40"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-3">
          {step > 0 && (
            <Button variant="outline" onClick={() => setStep(step - 1)} className="flex-1 py-6 border-border" disabled={computing}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={!canProceed || computing}
            className="flex-1 gradient-saffron text-primary-foreground font-semibold py-6 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {computing ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Calculating chart…</>
            ) : isLast ? (
              <>Generate My Chart <ArrowRight className="w-4 h-4 ml-2" /></>
            ) : (
              <>Continue <ArrowRight className="w-4 h-4 ml-2" /></>
            )}
          </Button>
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="block mx-auto mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
          disabled={computing}
        >
          Skip for now
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
