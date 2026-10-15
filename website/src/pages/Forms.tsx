import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, ClipboardList, HandCoins, Mail } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import JotFormEmbed from "@/components/JotFormEmbed";
import { CONTACT_EMAIL, FORMS } from "@/content/site";
import { fadeUp } from "@/lib/motion";

const otherForms = [
  { icon: HandCoins, label: "Fee Grant Application", desc: "Help covering adventure fees", href: "/fee-grant" },
  { icon: Mail, label: "Mailing List", desc: "Hear about upcoming adventures", href: "/mailing-list" },
];

export default function Forms() {
  return (
    <div className="min-h-screen bg-background pt-24">
      <PageHeader icon={ClipboardList} eyebrow="Forms" title="Risk Acknowledgement & Media Release">
        <p>
          Before your family joins an adventure, please complete this form. It includes our risk acknowledgement and
          our media release, so we can share photos and videos of the joy of families adventuring together.
        </p>
        <p className="text-base">
          One form covers your whole household for all of our adventures. To change or revoke your media release
          later, email us at {CONTACT_EMAIL}.
        </p>
      </PageHeader>

      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl mx-auto">
          <JotFormEmbed url={FORMS.mediaRelease} title="Risk acknowledgement and media release form" fallbackSubject="Media release form" />
        </motion.div>

        <div className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-display font-bold text-foreground mb-5">Other Forms</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {otherForms.map(({ icon: Icon, label, desc, href }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-center gap-4 bg-card rounded-2xl px-5 py-4 border border-border/50 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display font-bold text-foreground">{label}</p>
                  <p className="text-sm text-muted-foreground font-sans">{desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-primary shrink-0 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
