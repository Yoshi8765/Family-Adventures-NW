import { Link } from "wouter";
import { ArrowRight, CalendarDays, Clock, MapPin } from "lucide-react";
import { formatEventDate, type FamilyEvent } from "@/content/events";

export default function EventCard({ event }: { event: FamilyEvent }) {
  const cover = event.flyer ?? event.photos?.[0]?.src;
  return (
    <Link
      href={`/events/${event.slug}`}
      className="group flex flex-col sm:flex-row bg-card rounded-3xl border border-border/50 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
    >
      {cover && (
        <div className="sm:w-48 shrink-0 bg-muted aspect-[4/3] sm:aspect-auto overflow-hidden">
          <img
            src={`${import.meta.env.BASE_URL}${cover}`}
            alt=""
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-6 md:p-8 flex-1">
        <h3 className="font-display font-bold text-xl md:text-2xl text-foreground mb-3 group-hover:text-primary transition-colors">
          {event.title}
        </h3>
        <ul className="space-y-1.5 mb-4 text-sm font-sans text-foreground">
          {event.date && (
            <li className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
              {formatEventDate(event.date)}
            </li>
          )}
          {event.time && (
            <li className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
              {event.time}
            </li>
          )}
          {event.location && (
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
              {event.location}
            </li>
          )}
        </ul>
        <p className="font-sans text-muted-foreground leading-relaxed mb-4">{event.summary}</p>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          Details{event.rsvpUrl ? " & RSVP" : ""}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
