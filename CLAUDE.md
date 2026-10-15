# Family Adventures Northwest website

The site is a React + Vite + Tailwind app in `website/`, deployed by Cloudflare Pages.
See `README.md` for build and deployment settings.

## Rules

- **Mobile first, always.** About 80% of visitors arrive on phones (we share the site in person).
  Every change must work and look good at phone width (test at 390px wide): no sideways
  scrolling, tap targets at least 44px, readable text, and nothing that only works on hover.
- **We run "adventures", not "events".** Use "adventure(s)" in all visitor-facing text.
- **Contact email:** `info@familyadventuresnw.org` (set once in `website/src/content/site.ts`).
- **Never publish** the phone number or the exact location of an upcoming adventure.
  Upcoming adventures list only a general area (e.g. "Park in Central Lynnwood"); the exact
  location goes to registered families via the RSVP form.
- **Production branch is `master`.** Do not merge or push to `master` without the owner's
  explicit approval.

## Where things live

- `website/src/content/events.ts`: adventures (date, details, flyer, FAQ, photos).
- `website/src/content/site.ts`: mission, vision, blurb, email, JotForm links.
- `website/public/images/events/<slug>/`: flyers and photos for each adventure.

## Before pushing

From `website/`: `pnpm run typecheck` and `pnpm run build` must pass. Check changed pages at
phone width as well as desktop.
