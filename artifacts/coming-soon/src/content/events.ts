// All adventures shown on the Adventures page, the calendar, and the home page.
//
// To add a new event, copy one of the entries below and fill it in.
// - `date` is "YYYY-MM-DD". Adventures whose date has passed move to "Past Adventures"
//   automatically. Leave it out if the date isn't set yet.
// - Images go in `public/images/events/<slug>/` and are referenced as
//   "images/events/<slug>/<file>.jpg" (no leading slash).

export type EventFaq = { q: string; a: string };

export type EventPhoto = { src?: string; alt: string };

export type FamilyEvent = {
  slug: string;
  title: string;
  date?: string;
  time?: string;
  location?: string;
  cost?: string;
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
    slug: "family-orienteering",
    title: "Family Orienteering Adventure",
    date: "2026-10-24",
    time: "10:00 AM – 12:00 PM",
    location: "Park in Central Lynnwood",
    cost: "$30 per family (fee grants available)",
    summary:
      "A park offers so much more if you look at it from an \"adventure\" perspective! Spend a morning learning how to do adventure family orienteering! Appropriate for ages 6–14 and parents. Includes instruction, maps, compasses, activities and optional lunch afterward. Build real-life skills like reading a map, using a compass, identifying natural features, practicing teamwork, and exploring a park together while completing fun challenges!",
    // TODO: upload the flyer and uncomment these lines.
    // flyer: "images/events/family-orienteering/flyer.jpg",
    // flyerAlt: "Flyer for the Family Orienteering Adventure",
    rsvpUrl: "https://pci.jotform.com/form/262596721046158",
    faq: [
      {
        q: "What does the $30 fee cover?",
        a: "The $30 fee is per family, not per person, so it covers every participating parent and child. The fee includes orienteering instruction, maps, compasses, course materials, activities throughout the course, and lunch afterward.",
      },
      {
        q: "Is the fee really per family, no matter how many kids we bring?",
        a: "Yes. It is one flat $30 fee per family, regardless of how many children participate.",
      },
      {
        q: "Is lunch included?",
        a: "Yes. We'll have an optional Asian-themed lunch after the activity at no additional cost. The specific menu is still being determined. We'll also have hot coffee available before we begin.",
      },
      {
        q: "How do I sign up?",
        a: "Use the Register / RSVP button on this page to reserve your family's spot.",
      },
      {
        q: "Is there a deadline to register?",
        a: "We encourage families to register early. Keeping the groups relatively small helps us provide better instruction and gives kids and parents more opportunities to participate.",
      },
      {
        q: "What if I need to cancel?",
        a: "Just reach out to us at familyadventuresnw@gmail.com or (425) 780-5534 and we'll take care of it with you directly.",
      },
      {
        q: "What is orienteering?",
        a: "Orienteering is navigating from point to point using a map, compass, landmarks, and your surroundings. It's a practical outdoor skill, but it's also a great way for families to practice communication, decision-making, teamwork, and problem-solving together.",
      },
      {
        q: "How will the course work?",
        a: "Each team will receive a map, compass, and orienteering course sheet. We'll begin with a short lesson covering the basic skills you'll need. Families will then head onto the course in small groups, potentially with two families working together as one team.",
      },
      {
        q: "What will we learn?",
        a: "We'll cover the basic skills needed to begin orienteering, including how to read and orient a map, understand a compass, determine direction, recognize landmarks and terrain features, and use those tools together to navigate from point to point.",
      },
      {
        q: "Are there activities along the course?",
        a: "Yes. This isn't just about finding checkpoints. Families will encounter simple challenges at different points along the course. These may include activities such as completing a knot challenge, identifying a tree, or solving another outdoor or teamwork task.",
      },
      {
        q: "Is it a race?",
        a: "No. This is not a competitive adventure and teams will not be racing against one another. The goal is to learn, explore, solve problems, and successfully navigate the course together.",
      },
      {
        q: "Do we need any previous experience?",
        a: "No. This adventure is designed for beginners. We'll teach the basic skills before families start the course, and the goal is for both kids and parents to learn as they go.",
      },
      {
        q: "What ages is this appropriate for?",
        a: "The activity is designed primarily for children ages 6–14. We'll have different course options appropriate for ages 6–10 and 11–14, allowing older kids to take on a greater navigation challenge.",
      },
      {
        q: "Can younger siblings come?",
        a: "Yes. Younger siblings are welcome to come with the family even if they're too young to fully participate in the orienteering course.",
      },
      {
        q: "Do parents have to participate?",
        a: "Yes. This is a family activity, not a drop-off program. Parents will navigate the course alongside their children.\n\nIn fact, that's an important part of the experience. We want parents and kids communicating, making decisions, solving problems, and figuring things out together. Parents aren't just there to supervise—they're part of the team.",
      },
      {
        q: "Are both boys and girls welcome?",
        a: "Absolutely. Boys and girls ages 6–14 are welcome to participate.",
      },
      {
        q: "Could we get lost?",
        a: "The entire course is contained within the park. Before starting, we'll clearly explain the boundaries of the activity area and how to recognize them. Families will also be navigating in small groups rather than children heading into the park on their own.",
      },
      {
        q: "Will staff be available if we need help?",
        a: "Yes. FANW staff will be on site throughout the adventure to provide instruction, answer questions, and assist families as needed.",
      },
      {
        q: "Is there medical support on site?",
        a: "Yes. We'll have a first aid kit and a Wilderness First Aid-certified staff member on site for the entire adventure.",
      },
      {
        q: "What happens if it rains?",
        a: "The adventure is rain or shine. Orienteering is an outdoor activity, and learning to work together when conditions aren't perfect is part of the experience. Dress for the weather and come with a positive attitude!",
      },
      {
        q: "Do we need to bring a compass or map?",
        a: "No. FANW will provide the compasses, maps, and course materials needed for the activity.",
      },
      {
        q: "What should we wear?",
        a: "Wear comfortable outdoor clothing and shoes appropriate for walking through a wooded park. Since the adventure is rain or shine, check the forecast and bring rain gear or warm layers if needed.",
      },
      {
        q: "Do we need to bring anything else?",
        a: "No special equipment is required. FANW will provide the navigation equipment and materials. A personal water bottle is always a good idea.",
      },
      {
        q: "Is this mainly an orienteering class?",
        a: "Learning navigation skills is part of it, but the bigger goal is learning together as a family.\n\nOrienteering naturally creates moments where families have to stop, communicate, make a decision, sometimes make a mistake, and figure out what to do next. Rather than parents simply giving their kids the answer, we want children to have opportunities to think, contribute, and help lead their family through the course.\n\nThe goal isn't to finish first. It's for kids and parents to walk away with a new outdoor skill, greater confidence, and the experience of accomplishing something together as a family.",
      },
    ],
  },
  {
    slug: "one-rope-bridge",
    title: "One-Rope Bridge Adventure",
    date: "2026-09-05",
    time: "9:00 AM – 11:00 AM",
    location: "Wilcox Park, Lynnwood",
    cost: "$30 for the entire family",
    // TODO: replace this summary with the recap blurb.
    summary:
      "Our first adventure! Kids ages 6–12 and their parents built a one-rope bridge together at Wilcox Park — gaining technical skills, learning new knots, problem solving, practicing teamwork, and overcoming fears — followed by a complimentary Labor Day weekend BBQ lunch.",
    flyer: "images/events/one-rope-bridge/flyer.jpg",
    flyerAlt:
      "Flyer for the One Rope Bridge adventure: September 5, 2026, 9am to 11am at Wilcox Park, Lynnwood, for 6–12 year olds and parents. Gain technical skills, learn new knots, problem solve, practice teamwork, and overcome fears. $30 for the entire family, with a complimentary Labor Day weekend BBQ lunch.",
    // TODO: upload photos to public/images/events/one-rope-bridge/ and add a
    // `src` to each entry (e.g. src: "images/events/one-rope-bridge/photo-1.jpg").
    // Entries without a `src` show as placeholder tiles.
    photos: [
      { alt: "Photo from the One-Rope Bridge Adventure" },
      { alt: "Photo from the One-Rope Bridge Adventure" },
      { alt: "Photo from the One-Rope Bridge Adventure" },
      { alt: "Photo from the One-Rope Bridge Adventure" },
      { alt: "Photo from the One-Rope Bridge Adventure" },
      { alt: "Photo from the One-Rope Bridge Adventure" },
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
