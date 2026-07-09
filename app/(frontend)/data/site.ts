import { getCms, toImg, type Img } from "@/lib/cms";
import type { SiteSetting } from "@/payload-types";
import { SALON, MAPS_URL, MAPS_EMBED_URL, SITE_URL } from "./salon";
import { HOURS, HOURS_SUMMARY, type HourEntry } from "./openingHours";

/** Shared, serializable site data passed to client sections (Hero, Contact, …). */
export type SiteData = {
  salon: {
    name: string;
    owner: string;
    tagline: string;
    street: string;
    postalCode: string;
    city: string;
    locality: string;
    phoneDisplay: string;
    phoneE164: string;
    geo: { latitude: number; longitude: number };
  };
  siteUrl: string;
  mapsUrl: string;
  mapsEmbedUrl: string;
  hours: HourEntry[];
  hoursSummary: { days: string; time: string }[];
  logo: Img | null;
};

/** The current hardcoded values — used whenever the CMS field is empty. */
export const DEFAULT_SITE: SiteData = {
  salon: {
    name: SALON.name,
    owner: SALON.owner,
    tagline: SALON.tagline,
    street: SALON.street,
    postalCode: SALON.postalCode,
    city: SALON.city,
    locality: SALON.locality,
    phoneDisplay: SALON.phoneDisplay,
    phoneE164: SALON.phoneE164,
    geo: { latitude: SALON.geo.latitude, longitude: SALON.geo.longitude },
  },
  siteUrl: SITE_URL,
  mapsUrl: MAPS_URL,
  mapsEmbedUrl: MAPS_EMBED_URL,
  hours: HOURS,
  hoursSummary: HOURS_SUMMARY,
  logo: { src: "/logo/anetta-wordmark.png", alt: "" },
};

/** Merge a CMS site-settings global with the hardcoded defaults. */
export function normalizeSettings(s: SiteSetting | null | undefined): SiteData {
  if (!s) return DEFAULT_SITE;
  const b = s.business;
  const hours: HourEntry[] =
    s.hours && s.hours.length === 7
      ? s.hours.map((h) => ({
          day: h.day,
          time: h.time,
          open:
            h.closed || h.openMinutes == null || h.closeMinutes == null
              ? null
              : [h.openMinutes, h.closeMinutes],
        }))
      : HOURS;

  return {
    salon: {
      name: b?.name ?? SALON.name,
      owner: b?.owner ?? SALON.owner,
      tagline: b?.tagline ?? SALON.tagline,
      street: b?.street ?? SALON.street,
      postalCode: b?.postalCode ?? SALON.postalCode,
      city: b?.city ?? SALON.city,
      locality: b?.locality ?? SALON.locality,
      phoneDisplay: b?.phoneDisplay ?? SALON.phoneDisplay,
      phoneE164: b?.phoneE164 ?? SALON.phoneE164,
      geo: {
        latitude: s.geo?.latitude ?? SALON.geo.latitude,
        longitude: s.geo?.longitude ?? SALON.geo.longitude,
      },
    },
    siteUrl: s.meta?.siteUrl ?? SITE_URL,
    mapsUrl: s.maps?.url ?? MAPS_URL,
    mapsEmbedUrl: s.maps?.embedUrl ?? MAPS_EMBED_URL,
    hours,
    hoursSummary:
      s.hoursSummary && s.hoursSummary.length
        ? s.hoursSummary.map((r) => ({ days: r.days, time: r.time }))
        : HOURS_SUMMARY,
    logo: toImg(b?.logo) ?? DEFAULT_SITE.logo,
  };
}

/** Fetch and normalize site settings (server only). */
export async function getSiteData(): Promise<{ site: SiteData; settings: SiteSetting }> {
  const payload = await getCms();
  const settings = await payload.findGlobal({ slug: "site-settings", depth: 1 });
  return { site: normalizeSettings(settings), settings };
}

export type { HourEntry };
