import { useEffect, useMemo } from "react";
import { ExternalLink, Mail } from "lucide-react";
import { CONTACT_EMAIL } from "@/content/site";

const EMBED_HANDLER_SRC = "https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js";

type Props = {
  url: string;
  title: string;
  fallbackSubject: string;
};

declare global {
  interface Window {
    jotformEmbedHandler?: (selector: string, base: string) => void;
  }
}

function loadEmbedHandler(): Promise<void> {
  if (window.jotformEmbedHandler) return Promise.resolve();
  return new Promise((resolve, reject) => {
    let script = document.querySelector<HTMLScriptElement>(`script[src="${EMBED_HANDLER_SRC}"]`);
    if (!script) {
      script = document.createElement("script");
      script.src = EMBED_HANDLER_SRC;
      script.async = true;
      document.body.appendChild(script);
    }
    script.addEventListener("load", () => resolve(), { once: true });
    script.addEventListener("error", () => reject(), { once: true });
  });
}

// Embeds a JotForm form and auto-resizes it to fit its content.
export default function JotFormEmbed({ url, title, fallbackSubject }: Props) {
  const form = useMemo(() => {
    const id = url.match(/(\d{10,})/)?.[1];
    if (!id) return null;
    const { origin } = new URL(url);
    return { id, origin, src: url };
  }, [url]);

  useEffect(() => {
    if (!form) return;
    loadEmbedHandler()
      .then(() => window.jotformEmbedHandler?.(`iframe[id='JotFormIFrame-${form.id}']`, `${form.origin}/`))
      .catch(() => {
        // Without the resize script the form still works at its default height.
      });
  }, [form]);

  if (!form) {
    return (
      <div className="bg-card rounded-3xl p-8 md:p-10 border border-border/50 shadow-sm text-center">
        <p className="font-sans text-muted-foreground mb-6">
          Please email us and we'll send you the form directly.
        </p>
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(fallbackSubject)}`}
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold font-sans text-sm bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:-translate-y-0.5 transition-all duration-300"
        >
          <Mail className="w-4 h-4" aria-hidden="true" />
          {CONTACT_EMAIL}
        </a>
      </div>
    );
  }

  return (
    <div>
      <a
        href={form.src}
        target="_blank"
        rel="noopener noreferrer"
        className="sm:hidden flex items-center justify-center gap-2 w-full mb-4 px-6 py-3.5 rounded-xl font-semibold font-sans text-sm bg-card text-foreground border-2 border-border hover:border-primary/30"
      >
        Open the form full screen
        <ExternalLink className="w-4 h-4 text-primary" aria-hidden="true" />
      </a>
      <div className="bg-card rounded-3xl border border-border/50 shadow-sm overflow-hidden">
        <iframe
          id={`JotFormIFrame-${form.id}`}
          title={title}
          src={form.src}
          allow="geolocation; microphone; camera; fullscreen; payment"
          className="w-full min-h-[700px] border-0"
        />
      </div>
      <p className="text-center text-sm text-muted-foreground font-sans mt-4">
        Trouble viewing the form?{" "}
        <a
          href={form.src}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
        >
          Open it in a new tab
          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
        </a>
      </p>
    </div>
  );
}
