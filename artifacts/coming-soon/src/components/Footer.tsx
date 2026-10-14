import { Link } from "wouter";
import { Mail, MapPin, Trees } from "lucide-react";
import { ADDRESS, BLURB, CONTACT_EMAIL } from "@/content/site";

const footerLinks = [
  { label: "About Us", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Events", href: "/events" },
  { label: "Fee Grants", href: "/fee-grant" },
  { label: "Media Release", href: "/media-release" },
  { label: "Sponsors & Grants", href: "/sponsors" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-border bg-background py-12 px-6">
      <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 text-foreground mb-3">
            <Trees className="w-5 h-5 text-primary/80" aria-hidden="true" />
            <span className="font-display font-semibold text-lg">Family Adventures NW</span>
          </div>
          <p className="text-sm text-muted-foreground font-sans leading-relaxed max-w-xs">{BLURB}</p>
        </div>

        <nav aria-label="Footer navigation">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm font-sans">
            {footerLinks.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className="text-muted-foreground hover:text-primary transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-3 text-sm font-sans text-muted-foreground">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="flex items-center gap-2 hover:text-primary transition-colors break-all"
          >
            <Mail className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
            {CONTACT_EMAIL}
          </a>
          <p className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
            {ADDRESS}
          </p>
        </div>
      </div>

      <p className="max-w-7xl mx-auto mt-10 pt-6 border-t border-border/60 text-xs text-muted-foreground text-center md:text-left">
        &copy; {new Date().getFullYear()} Family Adventures Northwest. All rights reserved.
      </p>
    </footer>
  );
}
