import { motion } from "framer-motion";
import { HandCoins } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import JotFormEmbed from "@/components/JotFormEmbed";
import { FORMS } from "@/content/site";
import { fadeUp } from "@/lib/motion";

export default function FeeGrant() {
  return (
    <div className="min-h-screen bg-background pt-24">
      <PageHeader icon={HandCoins} eyebrow="Removing Barriers" title="Apply for a Fee Grant">
        <p>
          Cost should never keep a family from sharing an adventure together. Fee grants reduce or cover Adventures for families who need support. Funded by our partners and grants, they
          help lower the wall that fees can put between families and the outdoors.
        </p>
        <p>
          Fill out the short application below. We review every application with care and will follow up with you by
          email.
        </p>
      </PageHeader>

      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl mx-auto">
          <JotFormEmbed url={FORMS.feeGrant} title="Fee grant application" fallbackSubject="Fee grant application" />
        </motion.div>
      </section>
    </div>
  );
}
