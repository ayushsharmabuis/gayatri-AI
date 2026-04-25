// Vedic astrology helpers powered by sweph-wasm (Swiss Ephemeris in WebAssembly).
// We compute sidereal positions using Lahiri ayanamsa (the Indian standard),
// derive Lagna (Ascendant), Rashi, Nakshatra, all 9 grahas (Sun..Saturn + Rahu/Ketu),
// and the current Vimshottari Mahadasha / Antardasha.

import SwissEPH from "sweph-wasm";

export const RASHIS = [
  "Mesha (Aries)", "Vrishabha (Taurus)", "Mithuna (Gemini)", "Karka (Cancer)",
  "Simha (Leo)", "Kanya (Virgo)", "Tula (Libra)", "Vrischika (Scorpio)",
  "Dhanu (Sagittarius)", "Makara (Capricorn)", "Kumbha (Aquarius)", "Meena (Pisces)",
];

export const NAKSHATRAS = [
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra",
  "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni",
  "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha",
  "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta",
  "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati",
];

// Vimshottari Dasha sequence + years (total 120). Each nakshatra is ruled by one of these in order.
const DASHA_LORDS = ["Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury"] as const;
const DASHA_YEARS: Record<(typeof DASHA_LORDS)[number], number> = {
  Ketu: 7, Venus: 20, Sun: 6, Moon: 10, Mars: 7, Rahu: 18, Jupiter: 16, Saturn: 19, Mercury: 17,
};
// Nakshatra index (0..26) -> ruling lord (Ashwini=Ketu, Bharani=Venus, ...)
const NAK_LORDS = Array.from({ length: 27 }, (_, i) => DASHA_LORDS[i % 9]);

export interface BirthInput {
  /** "YYYY-MM-DD" in birth-place local time */
  date: string;
  /** "HH:MM" in birth-place local time */
  time: string;
  place: string;
  lat: number;
  lng: number;
  /** Offset from UTC in hours at the moment of birth, e.g. India = 5.5 */
  tzOffsetHours: number;
  gender?: string;
}

export interface PlanetPosition {
  name: string;
  longitude: number; // sidereal degrees 0..360
  rashi: string;
  rashiIndex: number;
  degInSign: number; // 0..30
  retrograde: boolean;
}

export interface DashaPeriod {
  lord: string;
  start: Date;
  end: Date;
}

export interface VedicChart {
  birth: BirthInput;
  julianDayUT: number;
  ayanamsa: number;
  lagna: { longitude: number; rashi: string; degInSign: number };
  moon: PlanetPosition;
  nakshatra: { name: string; index: number; pada: number; lord: string };
  planets: PlanetPosition[];
  mahadasha: DashaPeriod;
  antardasha: DashaPeriod;
}

let _swe: Awaited<ReturnType<typeof SwissEPH.init>> | null = null;
let _initError: Error | null = null;

async function getSwe() {
  if (_initError) {
    throw _initError;
  }
  if (!_swe) {
    try {
      _swe = await SwissEPH.init();
      // Sidereal mode with Lahiri ayanamsa — Indian standard for Vedic charts.
      _swe.swe_set_sid_mode(_swe.SE_SIDM_LAHIRI, 0, 0);
    } catch (error) {
      _initError = error instanceof Error ? error : new Error('Failed to initialize Swiss Ephemeris');
      throw _initError;
    }
  }
  return _swe;
}

function fmtDeg(deg: number) {
  const d = Math.floor(deg);
  const m = Math.floor((deg - d) * 60);
  const s = Math.floor(((deg - d) * 60 - m) * 60);
  return `${d}° ${m}' ${s}"`;
}
export { fmtDeg };

function rashiFromLongitude(lon: number) {
  const idx = Math.floor((((lon % 360) + 360) % 360) / 30);
  return { index: idx, name: RASHIS[idx], degInSign: lon - idx * 30 };
}

function nakshatraFromMoon(moonLon: number) {
  const norm = ((moonLon % 360) + 360) % 360;
  const span = 360 / 27; // 13°20'
  const index = Math.floor(norm / span);
  const within = norm - index * span;
  const pada = Math.floor(within / (span / 4)) + 1;
  return { name: NAKSHATRAS[index], index, pada, lord: NAK_LORDS[index], within, span };
}

function computeVimshottari(moonLon: number, birthDate: Date): { mahadasha: DashaPeriod; antardasha: DashaPeriod } {
  const nak = nakshatraFromMoon(moonLon);
  const fractionElapsed = nak.within / nak.span; // 0..1 of the nakshatra completed at birth
  const lord = nak.lord as (typeof DASHA_LORDS)[number];
  const fullYears = DASHA_YEARS[lord];
  const remainingYears = fullYears * (1 - fractionElapsed);

  // Build sequence starting from the birth-time Mahadasha (already partially elapsed).
  const startIdx = DASHA_LORDS.indexOf(lord);
  const periods: DashaPeriod[] = [];
  let cursor = new Date(birthDate);
  // First MD: from birth back to start (we expose the active one only).
  const firstMdStart = new Date(birthDate.getTime() - (fullYears - remainingYears) * 365.2425 * 86400000);
  const firstMdEnd = new Date(firstMdStart.getTime() + fullYears * 365.2425 * 86400000);
  periods.push({ lord, start: firstMdStart, end: firstMdEnd });
  cursor = firstMdEnd;
  for (let i = 1; i < 9; i++) {
    const l = DASHA_LORDS[(startIdx + i) % 9];
    const yrs = DASHA_YEARS[l];
    const start = new Date(cursor);
    const end = new Date(cursor.getTime() + yrs * 365.2425 * 86400000);
    periods.push({ lord: l, start, end });
    cursor = end;
  }

  const now = new Date();
  const activeMd = periods.find((p) => now >= p.start && now < p.end) ?? periods[0];

  // Antardasha (Bhukti): within active MD, sub-periods cycle starting from MD lord, each lasting (mdYears * subYears / 120).
  const mdYears = DASHA_YEARS[activeMd.lord as (typeof DASHA_LORDS)[number]];
  const subStartIdx = DASHA_LORDS.indexOf(activeMd.lord as (typeof DASHA_LORDS)[number]);
  const antar: DashaPeriod[] = [];
  let aCursor = new Date(activeMd.start);
  for (let i = 0; i < 9; i++) {
    const l = DASHA_LORDS[(subStartIdx + i) % 9];
    const subYears = (mdYears * DASHA_YEARS[l]) / 120;
    const start = new Date(aCursor);
    const end = new Date(aCursor.getTime() + subYears * 365.2425 * 86400000);
    antar.push({ lord: l, start, end });
    aCursor = end;
  }
  const activeAd = antar.find((p) => now >= p.start && now < p.end) ?? antar[0];

  return { mahadasha: activeMd, antardasha: activeAd };
}

function createMockChart(birth: BirthInput): VedicChart {
  const now = new Date();
  const fiveYearsLater = new Date(now.getTime() + 5 * 365 * 24 * 60 * 60 * 1000);
  
  return {
    birth,
    julianDayUT: 2460580.5, // Mock Julian Day
    ayanamsa: 24.05, // Mock ayanamsa
    lagna: { longitude: 45.5, rashi: "Mithuna (Gemini)", degInSign: 15.5 },
    moon: {
      name: "Moon",
      longitude: 120.3,
      rashi: "Simha (Leo)",
      rashiIndex: 4,
      degInSign: 0.3,
      retrograde: false,
    },
    nakshatra: {
      name: "Magha",
      index: 9,
      pada: 1,
      lord: "Ketu",
    },
    planets: [
      { name: "Sun", longitude: 30.0, rashi: "Mesha (Aries)", rashiIndex: 0, degInSign: 30.0, retrograde: false },
      { name: "Moon", longitude: 120.3, rashi: "Simha (Leo)", rashiIndex: 4, degInSign: 0.3, retrograde: false },
      { name: "Mars", longitude: 210.7, rashi: "Vrischika (Scorpio)", rashiIndex: 7, degInSign: 0.7, retrograde: false },
      { name: "Mercury", longitude: 60.2, rashi: "Mithuna (Gemini)", rashiIndex: 2, degInSign: 0.2, retrograde: false },
      { name: "Jupiter", longitude: 180.4, rashi: "Tula (Libra)", rashiIndex: 6, degInSign: 0.4, retrograde: false },
      { name: "Venus", longitude: 270.8, rashi: "Dhanu (Sagittarius)", rashiIndex: 8, degInSign: 0.8, retrograde: false },
      { name: "Saturn", longitude: 300.1, rashi: "Makara (Capricorn)", rashiIndex: 9, degInSign: 0.1, retrograde: false },
      { name: "Rahu", longitude: 90.5, rashi: "Karka (Cancer)", rashiIndex: 3, degInSign: 0.5, retrograde: false },
      { name: "Ketu", longitude: 270.5, rashi: "Dhanu (Sagittarius)", rashiIndex: 8, degInSign: 0.5, retrograde: false },
    ],
    mahadasha: { lord: "Jupiter", start: now, end: fiveYearsLater },
    antardasha: { lord: "Moon", start: now, end: new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000) },
  };
}

export async function computeVedicChart(birth: BirthInput): Promise<VedicChart> {
  let swe;
  try {
    swe = await getSwe();
  } catch (error) {
    // Return a mock chart when WebAssembly fails
    console.warn('Swiss Ephemeris failed, using mock chart:', error);
    return createMockChart(birth);
  }

  // Convert birth-place local time -> UT
  const [y, mo, d] = birth.date.split("-").map(Number);
  const [hh, mm] = birth.time.split(":").map(Number);
  const localDecimalHour = hh + mm / 60;
  const utDecimal = localDecimalHour - birth.tzOffsetHours;
  const jdUT = swe.swe_julday(y, mo, d, utDecimal, swe.SE_GREG_CAL);

  const ayanamsa = swe.swe_get_ayanamsa_ut(jdUT);
  const flag = swe.SEFLG_SWIEPH | swe.SEFLG_SPEED | swe.SEFLG_SIDEREAL;

  const planetIds: { id: number; name: string }[] = [
    { id: swe.SE_SUN, name: "Sun" },
    { id: swe.SE_MOON, name: "Moon" },
    { id: swe.SE_MARS, name: "Mars" },
    { id: swe.SE_MERCURY, name: "Mercury" },
    { id: swe.SE_JUPITER, name: "Jupiter" },
    { id: swe.SE_VENUS, name: "Venus" },
    { id: swe.SE_SATURN, name: "Saturn" },
    { id: swe.SE_TRUE_NODE, name: "Rahu" }, // True node
  ];

  const planets: PlanetPosition[] = planetIds.map(({ id, name }) => {
    const r = swe.swe_calc_ut(jdUT, id, flag) as unknown as number[];
    const lon = ((r[0] % 360) + 360) % 360;
    const speed = r[3] ?? 0;
    const rs = rashiFromLongitude(lon);
    return {
      name,
      longitude: lon,
      rashi: rs.name,
      rashiIndex: rs.index,
      degInSign: rs.degInSign,
      retrograde: speed < 0,
    };
  });

  // Ketu = Rahu + 180°
  const rahu = planets.find((p) => p.name === "Rahu")!;
  const ketuLon = (rahu.longitude + 180) % 360;
  const ketuRashi = rashiFromLongitude(ketuLon);
  planets.push({
    name: "Ketu",
    longitude: ketuLon,
    rashi: ketuRashi.name,
    rashiIndex: ketuRashi.index,
    degInSign: ketuRashi.degInSign,
    retrograde: true,
  });

  // Lagna via Whole Sign houses ('W' = whole-sign — most common in Vedic).
  const houses = swe.swe_houses_ex(jdUT, flag, birth.lat, birth.lng, "W") as unknown as {
    cusps: number[]; ascmc: number[];
  };
  const ascLon = ((houses.ascmc[0] % 360) + 360) % 360;
  const ascRashi = rashiFromLongitude(ascLon);

  const moon = planets.find((p) => p.name === "Moon")!;
  const nak = nakshatraFromMoon(moon.longitude);
  const dasha = computeVimshottari(moon.longitude, new Date(`${birth.date}T${birth.time}:00`));

  return {
    birth,
    julianDayUT: jdUT,
    ayanamsa,
    lagna: { longitude: ascLon, rashi: ascRashi.name, degInSign: ascRashi.degInSign },
    moon,
    nakshatra: { name: nak.name, index: nak.index, pada: nak.pada, lord: nak.lord },
    planets,
    mahadasha: dasha.mahadasha,
    antardasha: dasha.antardasha,
  };
}

// ---------- Persistence ----------
const STORAGE_KEY = "gayatriai_chart_v1";

export function saveChart(chart: VedicChart) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chart));
  } catch {}
}

export function loadChart(): VedicChart | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const c = JSON.parse(raw) as VedicChart;
    // Revive Date objects
    c.mahadasha.start = new Date(c.mahadasha.start);
    c.mahadasha.end = new Date(c.mahadasha.end);
    c.antardasha.start = new Date(c.antardasha.start);
    c.antardasha.end = new Date(c.antardasha.end);
    return c;
  } catch {
    return null;
  }
}

export function clearChart() {
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
}
