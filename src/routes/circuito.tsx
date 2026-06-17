import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import circuitoImg from "@/assets/circuito-hero.jpg";

export const Route = createFileRoute("/circuito")({
  head: () => ({
    meta: [
      { title: "Circuito Fortux — Pitch & Putt" },
      { name: "description", content: "Plataforma oficial del Circuito Fortux Pitch & Putt: competiciones, ranking, resultados e inscripciones." },
      { property: "og:title", content: "Circuito Fortux — Pitch & Putt" },
      { property: "og:description", content: "Accede a la plataforma oficial del Circuito Fortux." },
      { property: "og:url", content: "/circuito" },
      { property: "og:image", content: circuitoImg },
    ],
    links: [{ rel: "canonical", href: "/circuito" }],
  }),
  component: Page,
});

function Page() {
  return (
    <section className="relative">
      <div className="container-fortux flex flex-wrap items-center justify-between gap-3 py-3 border-b border-border">
        <div>
          <h1 className="font-display text-lg md:text-xl font-bold text-foreground">
            Circuito Fortux Pitch &amp; Putt
          </h1>
          <p className="text-xs text-muted-foreground">
            Plataforma oficial integrada · fortux.fairwaystudio.ai
          </p>
        </div>
        <Button asChild size="sm" variant="outline">
          <a href={SITE.circuitUrl} target="_blank" rel="noopener">
            Abrir en pestaña nueva <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
          </a>
        </Button>
      </div>

      <div className="bg-primary/10 border-b border-primary/20">
        <div className="container-fortux py-3">
          <p className="text-sm md:text-base font-medium text-foreground text-center">
            👉 Clica en qualsevol prova per veure resultats i detalls del circuit.
          </p>
        </div>
      </div>

      <div className="w-full bg-muted" style={{ height: "calc(100vh - 4rem - 60px)" }}>
        <iframe
          src={SITE.circuitUrl}
          title="Circuito Fortux"
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allow="fullscreen; clipboard-read; clipboard-write"
        />
      </div>

      <noscript>
        <div className="container-fortux py-8">
          <Button asChild>
            <a href={SITE.circuitUrl} target="_blank" rel="noopener">
              Acceder al circuito <ArrowRight className="ml-1.5 h-4 w-4" />
            </a>
          </Button>
        </div>
      </noscript>
    </section>
  );
}
