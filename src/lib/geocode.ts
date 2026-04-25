// OpenCage geocoding — used in onboarding so the user can pick their exact birth place
// (with latitude, longitude, and timezone offset needed for Vedic chart calculations).

const OPENCAGE_KEY = "e6856ce2163d420dbae7d5adb0a104ec";

export interface PlaceResult {
  formatted: string;
  lat: number;
  lng: number;
  /** Offset from UTC in hours, e.g. India = 5.5 */
  tzOffsetHours: number;
  tzName?: string;
  countryCode?: string;
}

interface OpenCageResponse {
  results: Array<{
    formatted: string;
    geometry: { lat: number; lng: number };
    annotations?: {
      timezone?: { name?: string; offset_sec?: number };
    };
    components?: { country_code?: string };
  }>;
}

export async function searchPlaces(query: string, signal?: AbortSignal): Promise<PlaceResult[]> {
  const q = query.trim();
  if (q.length < 2) return [];
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(q)}&key=${OPENCAGE_KEY}&limit=6&no_annotations=0`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`OpenCage error ${res.status}`);
  const data: OpenCageResponse = await res.json();
  return data.results.map((r) => ({
    formatted: r.formatted,
    lat: r.geometry.lat,
    lng: r.geometry.lng,
    tzOffsetHours: (r.annotations?.timezone?.offset_sec ?? 0) / 3600,
    tzName: r.annotations?.timezone?.name,
    countryCode: r.components?.country_code,
  }));
}
