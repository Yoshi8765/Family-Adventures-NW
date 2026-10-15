import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import JotFormEmbed from "@/components/JotFormEmbed";
import { CONTACT_EMAIL, FORMS } from "@/content/site";
import { fadeUp } from "@/lib/motion";

export default function MediaRelease() {
  return (
    <div className="min-h-screen bg-background pt-24">
      <PageHeader icon={Camera} eyebrow="For Adventure Participants" title="Risk Acknowledgement & Media Release">
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
      </section>
    </div>
  );
}
