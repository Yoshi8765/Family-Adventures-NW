import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import JotFormEmbed from "@/components/JotFormEmbed";
import { FORMS } from "@/content/site";
import { fadeUp } from "@/lib/motion";

export default function MediaRelease() {
  return (
    <div className="min-h-screen bg-background pt-24">
      <PageHeader icon={Camera} eyebrow="For Adventure Participants" title="Media Release">
        <p>
          We love capturing the joy of families adventuring together. If you're joining one of our adventures, please
          complete the media release below so we can share photos and videos from the day.
        </p>
        <p className="text-base">
          One form per family is all we need. Thank you for helping us tell the story of Family Adventures Northwest!
        </p>
      </PageHeader>

      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl mx-auto">
          <JotFormEmbed url={FORMS.mediaRelease} title="Media release form" fallbackSubject="Media release form" />
        </motion.div>
      </section>
    </div>
  );
}
