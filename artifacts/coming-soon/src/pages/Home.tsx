import { motion } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { Mountain, Mail, Compass, ArrowRight, MapPin, Backpack, Users, X, ChevronLeft, ChevronRight, CalendarDays, HandCoins, Handshake } from "lucide-react";
import { Link } from "wouter";
import EventCard from "@/components/EventCard";
import { upcomingEvents } from "@/content/events";
import { ADDRESS, BLURB, CONTACT_EMAIL } from "@/content/site";
import { fadeUp, stagger as staggerContainer } from "@/lib/motion";

const getInvolved = [
  {
    icon: CalendarDays,
    title: "Join an Adventure",
    desc: "We host a family event every month. Find the next one and reserve your spot.",
    href: "/events",
    cta: "See events",
  },
  {
    icon: HandCoins,
    title: "Apply for a Fee Grant",
    desc: "Cost shouldn't keep any family home. Apply for help covering event fees.",
    href: "/fee-grant",
    cta: "Apply now",
  },
  {
    icon: Handshake,
    title: "Sponsor or Give a Grant",
    desc: "Businesses and foundations can help more families share meaningful experiences.",
    href: "/sponsors",
    cta: "Learn more",
  },
];

export default function Home() {
  const heroImageUrl = `${import.meta.env.BASE_URL}images/photo-mountain.jpg`;
  const galleryImages = [
    {
      src: `${import.meta.env.BASE_URL}images/photo-jingoo.jpg`,
      alt: "A child hanging fearlessly over a creek on a rope traverse",
      pos: "50% 30%",
    },
    {
      src: `${import.meta.env.BASE_URL}images/photo-sean.jpg`,
      alt: "A child swinging over a creek with family cheering from the bank",
      pos: "50% 35%",
    },
    {
      src: `${import.meta.env.BASE_URL}images/photo-lake.jpg`,
      alt: "Stunning alpine lake with driftwood and mountain cliffs in Washington",
      pos: "center",
    },
    {
      src: `${import.meta.env.BASE_URL}images/photo-mountain.jpg`,
      alt: "Hiker on a rocky ridge with dramatic Pacific Northwest mountain peaks",
      pos: "50% 65%",
    },
    {
      src: `${import.meta.env.BASE_URL}images/photo-sunset.jpg`,
      alt: "Serene sunset reflection of evergreens on a calm alpine lake",
      pos: "center",
    },
    {
      src: `${import.meta.env.BASE_URL}images/photo-rope-climb.jpg`,
      alt: "A child joyfully climbing a rope in a Pacific Northwest forest",
      pos: "50% 80%",
    },
    {
      src: `${import.meta.env.BASE_URL}images/photo-tree-planting-1.jpg`,
      alt: "A father and two children planting a young tree together in the forest",
      pos: "50% 25%",
    },
    {
      src: `${import.meta.env.BASE_URL}images/photo-tree-planting-2.jpg`,
      alt: "A family of five volunteers smiling while planting a tree outdoors",
      pos: "50% 20%",
    },
  ];

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevPhoto = useCallback(() =>
    setLightboxIndex((i) => (i === null ? null : (i - 1 + galleryImages.length) % galleryImages.length)),
    [galleryImages.length]
  );
  const nextPhoto = useCallback(() =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % galleryImages.length)),
    [galleryImages.length]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); prevPhoto(); }
      if (e.key === "ArrowRight") { e.preventDefault(); nextPhoto(); }
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, prevPhoto, nextPhoto, closeLightbox]);

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  const handleFocusTrap = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab" || lightboxRef.current === null) return;
    const focusable = Array.from(
      lightboxRef.current.querySelectorAll<HTMLElement>("button")
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  };

  const nextEvent = upcomingEvents()[0];

  return (
    <div className="min-h-screen flex flex-col w-full overflow-hidden bg-background">

      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={heroImageUrl}
            alt="Hiker on a rocky ridge with dramatic Pacific Northwest mountain peaks behind"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-background"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-4xl mx-auto text-center mt-20"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white mb-8 shadow-sm">
            <Compass className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wide uppercase font-sans">Monthly Family Adventures</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.1] md:leading-[1.05] tracking-tight mb-6 drop-shadow-lg"
          >
            Empowering Families Through{" "}
            <span className="text-accent relative inline-block drop-shadow-lg">
              Everyday Adventures
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-accent/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-white/85 max-w-prose mx-auto leading-relaxed mb-10 font-sans drop-shadow"
          >
            {BLURB}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/events"
              className="group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-primary-foreground bg-primary shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300"
            >
              <CalendarDays className="w-5 h-5" aria-hidden="true" />
              <span>Upcoming events</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
            <Link
              href="/fee-grant"
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-white bg-white/15 border border-white/30 backdrop-blur-md hover:bg-white/25 hover:-translate-y-1 transition-all duration-300"
            >
              <HandCoins className="w-5 h-5" aria-hidden="true" />
              <span>Apply for a fee grant</span>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* NEXT ADVENTURE */}
      {nextEvent && (
        <section className="relative z-10 pt-16 pb-8 px-4 sm:px-6 lg:px-8 bg-background">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeUp} className="text-center mb-10">
              <h2 className="text-sm font-bold font-display tracking-widest uppercase text-accent mb-4">Next Adventure</h2>
              <p className="text-3xl md:text-4xl font-display font-bold text-foreground">Join us this month</p>
            </motion.div>
            <motion.div variants={fadeUp}>
              <EventCard event={nextEvent} />
            </motion.div>
          </motion.div>
        </section>
      )}

      {/* PHOTO GALLERY — Adventures Await */}
      <section className="relative z-10 py-28 md:py-36 px-4 sm:px-6 lg:px-8 bg-muted/20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={fadeUp} className="text-center mb-14">
            <h2 className="text-sm font-bold font-display tracking-widest uppercase text-accent mb-4">Adventures Await</h2>
            <p className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Life is better outdoors, together.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col gap-4 md:gap-6">
            {/* Row 1: 2 large photos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {galleryImages.slice(0, 2).map((img, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay: i * 0.08 } }
                  }}
                  className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-muted border border-border/50 shadow-md group cursor-pointer"
                  onClick={() => openLightbox(i)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox(i); } }}
                  tabIndex={0}
                  role="button"
                  aria-label={`View photo: ${img.alt}`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ objectPosition: img.pos }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </div>
            {/* Row 2: 3 photos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {galleryImages.slice(2, 5).map((img, i) => (
                <motion.div
                  key={i + 2}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay: (i + 2) * 0.08 } }
                  }}
                  className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-muted border border-border/50 shadow-md group cursor-pointer"
                  onClick={() => openLightbox(i + 2)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox(i + 2); } }}
                  tabIndex={0}
                  role="button"
                  aria-label={`View photo: ${img.alt}`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ objectPosition: img.pos }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </div>
            {/* Row 3: 3 photos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {galleryImages.slice(5).map((img, i) => (
                <motion.div
                  key={i + 5}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay: (i + 5) * 0.08 } }
                  }}
                  className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-muted border border-border/50 shadow-md group cursor-pointer"
                  onClick={() => openLightbox(i + 5)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox(i + 5); } }}
                  tabIndex={0}
                  role="button"
                  aria-label={`View photo: ${img.alt}`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ objectPosition: img.pos }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* PROGRAMS OVERVIEW */}
      <section className="relative z-10 py-28 md:py-36 px-4 sm:px-6 lg:px-8 bg-background">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={fadeUp} className="text-center mb-16">
            <h2 className="text-sm font-bold font-display tracking-widest uppercase text-accent mb-4">What We Do</h2>
            <p className="text-3xl md:text-4xl font-display font-bold text-foreground">Our Programs</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <motion.div
              variants={fadeUp}
              className="bg-card rounded-3xl p-8 md:p-10 border border-border/50 shadow-sm overflow-hidden relative"
            >
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-primary/5 rounded-full blur-2xl" />
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 rotate-2">
                <Backpack className="w-7 h-7 text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-display font-bold text-xl md:text-2xl text-foreground mb-3">
                Family Outdoor Adventures
              </h3>
              <p className="font-sans text-muted-foreground leading-relaxed mb-5">
                We take families into the field for hands-on challenges that build strength, trust, and joy together in the Pacific Northwest wilderness.
              </p>
              <ul className="space-y-2">
                {["Challenge hikes", "Obstacle courses", "Trust-building activities", "Orienteering courses"].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 font-sans text-sm text-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="bg-card rounded-3xl p-8 md:p-10 border border-border/50 shadow-sm overflow-hidden relative"
            >
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-accent/5 rounded-full blur-2xl" />
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 -rotate-2">
                <Users className="w-7 h-7 text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-display font-bold text-xl md:text-2xl text-foreground mb-3">
                Families Serving, Learning, and Growing Together
              </h3>
              <p className="font-sans text-muted-foreground leading-relaxed">
                Beyond adventure, we cultivate servant leadership, community connection, and experiential learning that supports the whole family — across every generation.
              </p>
            </motion.div>
          </div>

          <motion.div variants={fadeUp} className="text-center mt-10">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold font-sans text-sm bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              View All Programs
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* GET INVOLVED */}
      <section className="relative z-10 py-28 md:py-36 px-4 sm:px-6 lg:px-8 bg-muted/30 border-t border-border/50">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={fadeUp} className="text-center mb-14">
            <Mountain className="w-12 h-12 text-primary mx-auto mb-6 opacity-80" aria-hidden="true" />
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">
              Join us on this journey.
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto font-sans">
              Whether you're a family looking for your next adventure or an organization that wants to help, there's a place for you.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3 mb-12">
            {getInvolved.map(({ icon: Icon, title, desc, href, cta }) => (
              <motion.div key={href} variants={fadeUp}>
                <Link
                  href={href}
                  className="group flex flex-col h-full bg-card rounded-3xl p-8 border border-border/50 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-foreground mb-3">{title}</h3>
                  <p className="font-sans text-muted-foreground leading-relaxed mb-5 flex-1">{desc}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    {cta}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-stretch justify-center gap-4">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold bg-card text-foreground border-2 border-border shadow-sm hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 break-all"
            >
              <Mail className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
              <span>{CONTACT_EMAIL}</span>
            </a>
            <div className="flex items-center gap-3 px-6 py-4 rounded-xl bg-card border-2 border-border shadow-sm">
              <MapPin className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
              <span className="text-sm font-sans text-foreground">{ADDRESS}</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* LIGHTBOX */}
      {lightboxIndex !== null && (
        <div
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-label="Photo lightbox"
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90"
          onClick={closeLightbox}
          onKeyDown={handleFocusTrap}
        >
          {/* Close button */}
          <button
            ref={closeButtonRef}
            onClick={closeLightbox}
            aria-label="Close lightbox"
            className="absolute top-4 right-4 z-10 flex items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/60"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Prev arrow */}
          <button
            onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
            aria-label="Previous photo"
            className="absolute left-3 md:left-6 z-10 flex items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/60"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Photo */}
          <img
            src={galleryImages[lightboxIndex].src}
            alt={galleryImages[lightboxIndex].alt}
            className="max-h-[88vh] max-w-[88vw] object-contain rounded-lg shadow-2xl select-none"
            onClick={(e) => e.stopPropagation()}
            draggable={false}
          />

          {/* Next arrow */}
          <button
            onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
            aria-label="Next photo"
            className="absolute right-3 md:right-6 z-10 flex items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/60"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Counter */}
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/60 text-sm font-sans select-none">
            {lightboxIndex + 1} / {galleryImages.length}
          </p>
        </div>
      )}

    </div>
  );
}
