import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { events, parseEventDate, type FamilyEvent } from "@/content/events";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function monthKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export default function EventCalendar() {
  const today = new Date();
  const [month, setMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const eventsByDay = useMemo(() => {
    const map = new Map<string, FamilyEvent[]>();
    for (const e of events) {
      if (!e.date) continue;
      map.set(e.date, [...(map.get(e.date) ?? []), e]);
    }
    return map;
  }, []);

  const year = month.getFullYear();
  const m = month.getMonth();
  const daysInMonth = new Date(year, m + 1, 0).getDate();
  const leadingBlanks = new Date(year, m, 1).getDay();
  const prefix = monthKey(month);
  const isCurrentMonth = monthKey(today) === prefix;

  const monthEvents = events
    .filter((e) => e.date?.startsWith(prefix))
    .sort((a, b) => a.date!.localeCompare(b.date!));

  const cells: (number | null)[] = [
    ...Array<null>(leadingBlanks).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="bg-card rounded-3xl border border-border/50 shadow-sm p-5 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={() => setMonth(new Date(year, m - 1, 1))}
          aria-label="Previous month"
          className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-primary/10 text-foreground transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h3 className="font-display font-bold text-xl md:text-2xl text-foreground" aria-live="polite">
          {month.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </h3>
        <button
          type="button"
          onClick={() => setMonth(new Date(year, m + 1, 1))}
          aria-label="Next month"
          className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-primary/10 text-foreground transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 md:gap-2 text-center">
        {WEEKDAYS.map((d) => (
          <div key={d} className="text-xs font-semibold uppercase tracking-wide text-muted-foreground pb-2">
            {d}
          </div>
        ))}
        {cells.map((day, i) => {
          if (day === null) return <div key={`blank-${i}`} />;
          const iso = `${prefix}-${String(day).padStart(2, "0")}`;
          const dayEvents = eventsByDay.get(iso);
          const isToday = isCurrentMonth && day === today.getDate();
          const base = "aspect-square rounded-xl flex items-center justify-center text-sm md:text-base font-sans";
          if (dayEvents) {
            return (
              <Link
                key={iso}
                href={`/events/${dayEvents[0].slug}`}
                aria-label={`${day}: ${dayEvents.map((e) => e.title).join(", ")}`}
                className={`${base} bg-primary text-primary-foreground font-bold shadow-md shadow-primary/20 hover:-translate-y-0.5 transition-transform`}
              >
                {day}
              </Link>
            );
          }
          return (
            <div
              key={iso}
              className={`${base} ${isToday ? "ring-2 ring-accent text-foreground font-semibold" : "text-foreground/80"}`}
            >
              {day}
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-5 border-t border-border/60">
        {monthEvents.length > 0 ? (
          <ul className="space-y-2">
            {monthEvents.map((e) => (
              <li key={e.slug}>
                <Link href={`/events/${e.slug}`} className="flex items-baseline gap-3 font-sans text-sm group">
                  <span className="font-semibold text-primary shrink-0">
                    {parseEventDate(e.date!).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                  <span className="text-foreground group-hover:text-primary transition-colors">{e.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground font-sans">
            No events scheduled this month yet. We host a family adventure every month — check back soon!
          </p>
        )}
      </div>
    </div>
  );
}
