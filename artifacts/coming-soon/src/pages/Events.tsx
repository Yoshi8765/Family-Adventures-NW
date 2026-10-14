import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import EventCalendar from "@/components/EventCalendar";
import EventCard from "@/components/EventCard";
import { pastEvents, upcomingEvents } from "@/content/events";
import { fadeUp, stagger } from "@/lib/motion";

export default function Events() {
  const upcoming = upcomingEvents();
  const past = pastEvents();

  return (
    <div className="min-h-screen bg-background pt-24">
      <PageHeader icon={CalendarDays} eyebrow="Join Us" title="Events">
        <p>
          We host a family adventure every month. Each event is designed so families of every background and generation
          can show up, connect, and grow together — we take care of the logistics and keep costs low.
        </p>
      </PageHeader>

      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[1fr_minmax(0,420px)] items-start"
        >
          <motion.div variants={fadeUp}>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-6">Upcoming Events</h2>
            {upcoming.length > 0 ? (
              <div className="flex flex-col gap-6">
                {upcoming.map((e) => (
                  <EventCard key={e.slug} event={e} />
                ))}
              </div>
            ) : (
              <p className="font-sans text-muted-foreground">
                Our next monthly adventure will be posted here shortly.
              </p>
            )}
          </motion.div>

          <motion.div variants={fadeUp}>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-6">Calendar</h2>
            <EventCalendar />
          </motion.div>
        </motion.div>
      </section>

      {past.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20 border-t border-border/50">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="max-w-6xl mx-auto"
          >
            <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-display font-bold text-foreground mb-6">
              Past Events
            </motion.h2>
            <div className="grid gap-6 md:grid-cols-2">
              {past.map((e) => (
                <motion.div key={e.slug} variants={fadeUp}>
                  <EventCard event={e} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      )}
    </div>
  );
}
