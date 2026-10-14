import { motion } from "framer-motion";
import { Building2, GraduationCap, Handshake, HeartHandshake, Landmark, Mail, Users } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { BLURB, CONTACT_EMAIL, EDUCATIONAL_PARTNER } from "@/content/site";
import { fadeUp, stagger } from "@/lib/motion";

const sponsorMailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Sponsorship / grant inquiry")}`;

const ways = [
  {
    icon: Building2,
    title: "Businesses",
    desc: "Sponsor an event, a season of adventures, or in-kind gear and services. Sponsors can be recognized at our events, our website, and our social media! Please inquire to discuss sponsorships and promotion partnering with FANW!",
  },
  {
    icon: Landmark,
    title: "Foundations & Grantmakers",
    desc: "Fund programs that strengthen families through experiential learning, with a focus on diverse and multigenerational families in the Pacific Northwest.",
  },
  {
    icon: Users,
    title: "Community Organizations",
    desc: "Partner with us to host events, share expertise, or connect the families you serve with our monthly adventures.",
  },
];

const impact = [
  "Fee grants so families can attend regardless of income",
  "Transportation and logistics that make outings simple",
  "Equipment, permits, and guided activities",
  "Character-building curriculum woven into every experience",
];

export default function Sponsors() {
  return (
    <div className="min-h-screen bg-background pt-24">
      <PageHeader icon={Handshake} eyebrow="Support Our Work" title="Sponsors & Grants">
        <p>{BLURB}</p>
        <p>
          We invite businesses, foundations, and community partners to join us in removing financial and logistical
          barriers so more families can share meaningful experiences together.
        </p>
      </PageHeader>

      {/* Ways to partner */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="max-w-5xl mx-auto"
        >
          <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-display font-bold text-foreground text-center mb-10">
            Ways to Partner
          </motion.h2>
          <div className="grid gap-6 md:grid-cols-3">
            {ways.map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className="bg-card rounded-3xl p-8 border border-border/50 shadow-sm"
              >
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

      {/* Impact */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="max-w-5xl mx-auto grid gap-10 md:grid-cols-2 items-start"
        >
          <motion.div variants={fadeUp}>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
              <HeartHandshake className="w-6 h-6 text-primary" aria-hidden="true" />
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">What Your Support Makes Possible</h2>
            <ul className="space-y-3">
              {impact.map((item) => (
                <li key={item} className="flex items-start gap-3 font-sans text-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2.5" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-card rounded-3xl p-8 border border-border/50 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
              <GraduationCap className="w-6 h-6 text-primary" aria-hidden="true" />
            </div>
            <p className="text-sm font-bold font-display tracking-widest uppercase text-accent mb-2">Core Educational Partner</p>
            <h3 className="font-display font-bold text-xl text-foreground mb-3">{EDUCATIONAL_PARTNER}</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              The {EDUCATIONAL_PARTNER} brings a family-centered approach to character education, helping every adventure
              become a lasting lesson.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30 border-t border-border/50">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">Let's talk.</h2>
          <p className="text-lg text-muted-foreground font-sans mb-8">
            To discuss sponsorship, grants, or partnership opportunities, email us and we'll be in touch.
          </p>
          <a
            href={sponsorMailto}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-primary-foreground bg-primary shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 break-all"
          >
            <Mail className="w-5 h-5 shrink-0" aria-hidden="true" />
            {CONTACT_EMAIL}
          </a>
        </motion.div>
      </section>
    </div>
  );
}
