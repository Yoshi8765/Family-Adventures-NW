import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, Trees, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Adventures", href: "/adventures" },
  { label: "Sponsors & Grants", href: "/sponsors" },
  { label: "Media Release", href: "/media-release" },
];

const ctaLink = { label: "Fee Grants", href: "/fee-grant" };

function isActivePath(location: string, href: string) {
  return href === "/" ? location === "/" : location === href || location.startsWith(`${href}/`);
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();
  const isHome = location === "/";
  const isTransparent = isHome && !scrolled && !menuOpen;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const linkClass = (active: boolean) =>
    `px-3 xl:px-4 py-2 rounded-lg text-sm font-semibold font-sans transition-all duration-200 whitespace-nowrap ${
      isTransparent
        ? active
          ? "text-white bg-white/25 backdrop-blur-sm"
          : "text-white/90 hover:text-white hover:bg-white/15 drop-shadow"
        : active
        ? "text-primary bg-primary/10"
        : "text-foreground hover:text-primary hover:bg-primary/5"
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent
          ? ""
          : "backdrop-blur-md bg-background/95 shadow-sm border-b border-border/40"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-4 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link
          href="/"
          aria-label="Family Adventures Northwest — Home"
          className="flex items-center gap-3 no-underline"
        >
          <div
            className={`p-2.5 rounded-xl border transition-all duration-300 ${
              isTransparent
                ? "bg-white/15 border-white/25 text-white backdrop-blur-sm"
                : "bg-primary/10 border-primary/10 text-primary"
            }`}
          >
            <Trees className="w-5 h-5" />
          </div>
          <span
            className={`font-display font-bold text-lg md:text-xl tracking-tight transition-colors duration-300 ${
              isTransparent ? "text-white drop-shadow-md" : "text-foreground"
            }`}
          >
            <span className="hidden sm:inline">Family Adventures Northwest</span>
            <span className="sm:hidden">Family Adventures NW</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
          {navLinks.map(({ label, href }) => {
            const active = isActivePath(location, href);
            return (
              <Link key={href} href={href} aria-current={active ? "page" : undefined} className={linkClass(active)}>
                {label}
              </Link>
            );
          })}
          <Link
            href={ctaLink.href}
            aria-current={isActivePath(location, ctaLink.href) ? "page" : undefined}
            className="ml-2 px-4 py-2 rounded-lg text-sm font-semibold font-sans bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap"
          >
            {ctaLink.label}
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className={`lg:hidden w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
            isTransparent ? "text-white bg-white/15 hover:bg-white/25" : "text-foreground hover:bg-primary/10"
          }`}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav id="mobile-menu" className="lg:hidden border-t border-border/40 px-4 sm:px-6 pb-6 pt-2" aria-label="Main navigation">
          <ul className="flex flex-col gap-1">
            {[...navLinks, ctaLink].map(({ label, href }) => {
              const active = isActivePath(location, href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`block px-4 py-3 rounded-lg text-base font-semibold font-sans ${
                      active ? "text-primary bg-primary/10" : "text-foreground hover:bg-primary/5"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
