"use client";

import { useEffect, useState } from "react";

export type HourEntry = {
  day: string;
  time: string;
  open: [number, number] | null;
};

// index 0 = Sonntag (matches Date.getDay()).
// Quelle: knowledge-base/data/salon.json — Zeiten UNVERIFIED (11880-Snippet),
// vor Go-Live mit der Kundin bestätigen.
export const HOURS: HourEntry[] = [
  { day: "Sonntag", time: "Geschlossen", open: null },
  { day: "Montag", time: "Geschlossen", open: null },
  { day: "Dienstag", time: "09:00 – 18:00", open: [9 * 60, 18 * 60] },
  { day: "Mittwoch", time: "09:00 – 18:00", open: [9 * 60, 18 * 60] },
  { day: "Donnerstag", time: "09:00 – 18:00", open: [9 * 60, 18 * 60] },
  { day: "Freitag", time: "09:00 – 18:00", open: [9 * 60, 18 * 60] },
  { day: "Samstag", time: "08:00 – 13:00", open: [8 * 60, 13 * 60] },
];

export const DISPLAY_ORDER = [1, 2, 3, 4, 5, 6, 0];

/** Condensed rows for the footer. */
export const HOURS_SUMMARY = [
  { days: "Dienstag – Freitag", time: "09:00 – 18:00" },
  { days: "Samstag", time: "08:00 – 13:00" },
  { days: "Sonntag & Montag", time: "Geschlossen" },
];

/** Current weekday + minutes in the salon's timezone (Europe/Berlin). */
export function berlinNow(): { day: number; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Berlin",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (type: string) =>
    parts.find((p) => p.type === type)?.value ?? "";
  const dayIndex = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(
    get("weekday"),
  );
  return {
    day: dayIndex,
    minutes: parseInt(get("hour"), 10) * 60 + parseInt(get("minute"), 10),
  };
}

export function useOpenState(hours: HourEntry[] = HOURS) {
  const [state, setState] = useState<{ day: number; isOpen: boolean } | null>(
    null,
  );

  const key = hours.map((h) => (h.open ? h.open.join("-") : "x")).join("|");

  useEffect(() => {
    const update = () => {
      const { day, minutes } = berlinNow();
      const range = hours[day]?.open ?? null;
      setState({
        day,
        isOpen: range !== null && minutes >= range[0] && minutes < range[1],
      });
    };
    update();
    const interval = setInterval(update, 60_000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return state;
}
