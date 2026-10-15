import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { fadeUp, stagger } from "@/lib/motion";

type Props = {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
};

export default function PageHeader({ icon: Icon, eyebrow, title, children }: Props) {
  return (
    <section className="pt-16 pb-12 md:pt-20 md:pb-16 px-4 sm:px-6 lg:px-8 text-center">
      <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl mx-auto">
        <motion.div variants={fadeUp}>
          <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mb-8 mx-auto rotate-3">
            <Icon className="w-8 h-8 text-primary" aria-hidden="true" />
          </div>
          <p className="text-sm font-bold font-display tracking-widest uppercase text-accent mb-4">{eyebrow}</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
            {title}
          </h1>
          {children && (
            <div className="text-lg text-muted-foreground font-sans leading-relaxed space-y-4">{children}</div>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
