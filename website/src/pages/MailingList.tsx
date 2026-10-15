import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import JotFormEmbed from "@/components/JotFormEmbed";
import { FORMS } from "@/content/site";
import { fadeUp } from "@/lib/motion";

export default function MailingList() {
  return (
    <div className="min-h-screen bg-background pt-24">
      <PageHeader icon={Mail} eyebrow="Stay Connected" title="Join Our Mailing List">
        <p>
          Sign up and we'll let you know about upcoming adventures for parents and children to do together.
        </p>
      </PageHeader>

      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl mx-auto">
          <JotFormEmbed url={FORMS.mailingList} title="Mailing list sign-up form" fallbackSubject="Add me to the mailing list" />
        </motion.div>
      </section>
    </div>
  );
}
