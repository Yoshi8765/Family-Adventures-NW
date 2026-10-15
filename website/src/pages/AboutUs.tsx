import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Compass, GraduationCap, HandCoins, HeartHandshake, Route, Users } from "lucide-react";
import { BLURB, EDUCATIONAL_PARTNER, MISSION, VISION } from "@/content/site";
import { fadeUp, stagger } from "@/lib/motion";

const approach = [
  {
    icon: HandCoins,
    title: "Affordable",
    desc: "Discounted costs and fee grants mean finances never stand between a family and a shared adventure.",
  },
  {
    icon: Route,
    title: "Simple",
    desc: "We handle the planning, gear, and logistics so families can simply show up and be present with one another.",
  },
  {
    icon: Users,
    title: "For Every Family",
    desc: "Ethnically diverse and multigenerational families — kids, parents, and grandparents — are all welcome.",
  },
];

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-background pt-24">

      {/* Vision */}
      <section className="pt-16 pb-10 md:pt-20 px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-4xl mx-auto text-center">
          <motion.div variants={fadeUp}>
            <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mb-8 mx-auto rotate-3">
              <Compass className="w-8 h-8 text-primary" aria-hidden="true" />
            </div>
            <h1 className="text-sm font-bold font-display tracking-widest uppercase text-accent mb-6">Our Vision</h1>
            <p className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground leading-tight">
              {VISION}
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Mission */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-5xl mx-auto">
          <div className="relative bg-card rounded-3xl p-8 md:p-16 shadow-xl shadow-black/5 border border-border/50 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
            <motion.div variants={fadeUp} className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mb-8 rotate-3">
                <HeartHandshake className="w-8 h-8 text-primary" aria-hidden="true" />
              </div>
              <h2 className="text-sm font-bold font-display tracking-widest uppercase text-accent mb-6">Our Mission</h2>
              <blockquote className="text-lg md:text-xl lg:text-2xl font-display font-medium leading-snug text-foreground text-center">
                {MISSION}
              </blockquote>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Approach */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-muted/20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={fadeUp} className="text-center mb-12">
            <h2 className="text-sm font-bold font-display tracking-widest uppercase text-accent mb-4">How We Work</h2>
            <p className="text-2xl md:text-3xl font-display font-bold text-foreground max-w-3xl mx-auto">{BLURB}</p>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-3">
            {approach.map(({ icon: Icon, title, desc }) => (
              <motion.div key={title} variants={fadeUp} className="bg-card rounded-3xl p-8 border border-border/50 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-3">{title}</h3>
                <p className="font-sans text-muted-foreground leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Partner */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 mx-auto">
            <GraduationCap className="w-7 h-7 text-primary" aria-hidden="true" />
          </div>
          <h2 className="text-sm font-bold font-display tracking-widest uppercase text-accent mb-4">Core Educational Partner</h2>
          <p className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">{EDUCATIONAL_PARTNER}</p>
          <p className="text-lg text-muted-foreground font-sans leading-relaxed mb-10">
            We work alongside the {EDUCATIONAL_PARTNER} to bring a family-centered approach to character education into
            every experience, so the lessons learned outdoors carry over into everyday family life.
          </p>
          <Link
            href="/adventures"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold font-sans text-sm bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            See upcoming adventures
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
