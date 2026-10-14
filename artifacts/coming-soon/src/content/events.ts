// All adventures shown on the Adventures page, the calendar, and the home page.
//
// To add a new event, copy one of the entries below and fill it in.
// - `date` is "YYYY-MM-DD". Adventures whose date has passed move to "Past Adventures"
//   automatically. Leave it out if the date isn't set yet.
// - Images go in `public/images/events/<slug>/` and are referenced as
//   "images/events/<slug>/<file>.jpg" (no leading slash).

export type EventFaq = { q: string; a: string };

export type EventPhoto = { src: string; alt: string };

export type FamilyEvent = {
  slug: string;
  title: string;
  date?: string;
  time?: string;
  location?: string;
  summary: string;
  // Set to true to list an event under "Past Adventures" even without a date.
  past?: boolean;
  flyer?: string;
  flyerAlt?: string;
  rsvpUrl?: string;
  faq?: EventFaq[];
  recap?: string;
  photos?: EventPhoto[];
};

export const events: FamilyEvent[] = [
  {
    // TODO: fill in the title, date, time, location and summary from the flyer,
    // add the flyer image, and paste the FAQ questions/answers below.
    slug: "october-2026",
    title: "October Family Adventure",
    // date: "2026-10-DD",
    // time: "10:00 AM – 2:00 PM",
    // location: "",
    summary:
      "Join us for our October family adventure! Families of all ages and backgrounds are welcome. Registration is required — reserve your family's spot below.",
    // flyer: "images/events/october-2026/flyer.jpg",
    // flyerAlt: "Flyer for the October Family Adventure",
    rsvpUrl: "https://pci.jotform.com/form/262596721046158",
    faq: [
      // { q: "Who can attend?", a: "..." },
    ],
  },
  {
    // TODO: fill in the date, title and recap for our first event, and add
    // photos once they're uploaded.
    slug: "first-adventure",
    title: "Our First Family Adventure",
    past: true,
    // date: "2026-MM-DD",
    summary:
      "Our very first Family Adventures Northwest adventure brought families together for a day of shared experiences outdoors.",
    // flyer: "images/events/first-adventure/flyer.jpg",
    // recap: "",
    photos: [
      // { src: "images/events/first-adventure/photo-1.jpg", alt: "Describe the photo" },
    ],
  },
];

function todayIso() {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function isPast(event: FamilyEvent) {
  if (event.past) return true;
  return event.date !== undefined && event.date < todayIso();
}

export function upcomingEvents() {
  return events
    .filter((e) => !isPast(e))
    .sort((a, b) => (a.date ?? "9999").localeCompare(b.date ?? "9999"));
}

export function pastEvents() {
  return events
    .filter(isPast)
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

export function findEvent(slug: string) {
  return events.find((e) => e.slug === slug);
}

// Parse "YYYY-MM-DD" as a local date (not UTC) so the day doesn't shift.
export function parseEventDate(date: string) {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function formatEventDate(date: string) {
  return parseEventDate(date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
