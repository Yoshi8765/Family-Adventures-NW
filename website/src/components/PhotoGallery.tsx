import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ImageIcon, X } from "lucide-react";
import type { EventPhoto } from "@/content/events";

// Responsive photo grid with a full-screen viewer. Photos without a `src`
// render as placeholder tiles until real images are added.
export default function PhotoGallery({ photos }: { photos: EventPhoto[] }) {
  const base = import.meta.env.BASE_URL;
  const real = photos.filter((p): p is Required<EventPhoto> => Boolean(p.src));
  const [open, setOpen] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const prev = useCallback(() => setOpen((i) => (i === null ? null : (i - 1 + real.length) % real.length)), [real.length]);
  const next = useCallback(() => setOpen((i) => (i === null ? null : (i + 1) % real.length)), [real.length]);

  useEffect(() => {
    if (open === null) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, prev, next, close]);

  const tile = "relative overflow-hidden rounded-xl md:rounded-2xl aspect-square sm:aspect-[4/3] border border-border/50";

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 md:gap-6">
        {photos.map((photo, i) => {
          if (!photo.src) {
            return (
              <div
                key={`placeholder-${i}`}
                className={`${tile} bg-muted flex items-center justify-center`}
                role="img"
                aria-label="Photo placeholder"
              >
                <ImageIcon className="w-8 h-8 md:w-10 md:h-10 text-muted-foreground/40" aria-hidden="true" />
              </div>
            );
          }
          const index = real.findIndex((p) => p.src === photo.src);
          return (
            <button
              key={photo.src}
              type="button"
              onClick={() => setOpen(index)}
              aria-label={`View photo: ${photo.alt}`}
              className={`${tile} bg-muted shadow-md group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
            >
              <img
                src={`${base}${photo.src}`}
                alt={photo.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </button>
          );
        })}
      </div>

      {open !== null && real[open] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90"
          onClick={close}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) (dx > 0 ? prev : next)();
            touchX.current = null;
          }}
        >
          <button
            ref={closeRef}
            onClick={close}
            aria-label="Close photo viewer"
            className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
          {real.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                aria-label="Previous photo"
                className="absolute left-2 md:left-6 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                aria-label="Next photo"
                className="absolute right-2 md:right-6 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
          <img
            src={`${base}${real[open].src}`}
            alt={real[open].alt}
            className="max-h-[85vh] max-w-[92vw] object-contain rounded-lg select-none"
            onClick={(e) => e.stopPropagation()}
            draggable={false}
          />
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/70 text-sm font-sans">
            {open + 1} / {real.length}
          </p>
        </div>
      )}
    </>
  );
}
