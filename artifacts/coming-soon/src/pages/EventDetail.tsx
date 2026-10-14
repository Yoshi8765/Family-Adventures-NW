import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, CalendarDays, Camera, Clock, ExternalLink, HandCoins, MapPin, Ticket } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { findEvent, formatEventDate, isPast } from "@/content/events";
import { fadeUp, stagger } from "@/lib/motion";

export default function EventDetail({ params }: { params: { slug: string } }) {
  const event = findEvent(params.slug);
  const base = import.meta.env.BASE_URL;

  if (!event) {
    return (
      <div className="min-h-screen bg-background pt-40 px-4 text-center">
        <h1 className="text-3xl font-display font-bold text-foreground mb-4">Adventure not found</h1>
        <Link href="/adventures" className="font-semibold text-primary hover:underline">
          See all adventures
        </Link>
      </div>
    );
  }

  const past = isPast(event);

  return (
    <div className="min-h-screen bg-background pt-24">
      <section className="pt-12 pb-16 md:pt-16 md:pb-24 px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-5xl mx-auto">
          <motion.div variants={fadeUp}>
            <Link
              href="/adventures"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline mb-8"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              All adventures
            </Link>
          </motion.div>

          <div className={`grid gap-10 ${event.flyer ? "md:grid-cols-[1fr_minmax(0,380px)]" : ""} items-start`}>
            <motion.div variants={fadeUp}>
              <p className="text-sm font-bold font-display tracking-widest uppercase text-accent mb-4">
                {past ? "Past Adventure" : "Upcoming Adventure"}
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
                {event.title}
              </h1>
              <ul className="space-y-2 mb-6 font-sans text-foreground">
                {event.date && (
                  <li className="flex items-center gap-2.5">
                    <CalendarDays className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
                    {formatEventDate(event.date)}
                  </li>
                )}
                {event.time && (
                  <li className="flex items-center gap-2.5">
                    <Clock className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
                    {event.time}
                  </li>
                )}
                {event.location && (
                  <li className="flex items-center gap-2.5">
                    <MapPin className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
                    {event.location}
                  </li>
                )}
                {event.cost && (
                  <li className="flex items-center gap-2.5">
                    <Ticket className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
                    {event.cost}
                  </li>
                )}
              </ul>
              <p className="text-lg text-muted-foreground font-sans leading-relaxed mb-8">{event.summary}</p>
              {event.recap && (
                <div className="font-sans text-foreground leading-relaxed space-y-4 mb-8">
                  {event.recap.split(/\n\s*\n/).map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              )}

              {!past && event.rsvpUrl && (
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={event.rsvpUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-primary-foreground bg-primary shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Register / RSVP
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  </a>
                  <Link
                    href="/fee-grant"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold bg-card text-foreground border-2 border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
                  >
                    <HandCoins className="w-4 h-4 text-primary" aria-hidden="true" />
                    Apply for a fee grant
                  </Link>
                </div>
              )}
            </motion.div>

            {event.flyer && (
              <motion.a
                variants={fadeUp}
                href={`${base}${event.flyer}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl overflow-hidden border border-border/50 shadow-md hover:shadow-lg transition-shadow"
              >
                <img
                  src={`${base}${event.flyer}`}
                  alt={event.flyerAlt ?? `Flyer for ${event.title}`}
                  className="w-full h-auto"
                />
              </motion.a>
            )}
          </div>
        </motion.div>
      </section>

      {event.photos && event.photos.length > 0 && (
        <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-muted/20 border-t border-border/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="flex items-center gap-3 text-2xl md:text-3xl font-display font-bold text-foreground mb-8">
              <Camera className="w-7 h-7 text-primary" aria-hidden="true" />
              Photos
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {event.photos.map((photo) => (
                <a
                  key={photo.src}
                  href={`${base}${photo.src}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-muted border border-border/50 shadow-md group"
                >
                  <img
                    src={`${base}${photo.src}`}
                    alt={photo.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {event.faq && event.faq.length > 0 && (
        <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 border-t border-border/50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-8">
              Frequently Asked Questions
            </h2>
            <Accordion type="multiple" className="bg-card rounded-3xl border border-border/50 shadow-sm px-6 md:px-8">
              {event.faq.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="last:border-b-0">
                  <AccordionTrigger className="font-display font-semibold text-base text-foreground py-5">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="font-sans text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}

      {!past && (
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/30 border-t border-border/50">
          <p className="max-w-3xl mx-auto text-center font-sans text-muted-foreground">
            Attending? Please also complete our{" "}
            <Link href="/media-release" className="font-semibold text-primary hover:underline">
              media release form
            </Link>{" "}
            so we can share photos from the day.
          </p>
        </section>
      )}
    </div>
  );
}
