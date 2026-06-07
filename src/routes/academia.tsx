import { createFileRoute } from "@tanstack/react-router";
import { User, Users, Target, Trophy } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import { waLink } from "@/lib/site";
import academiaImg from "@/assets/academia.jpg";

export const Route = createFileRoute("/academia")({
  head: () => ({
    meta: [
      { title: "Academia — Fortux" },
      { name: "description", content: "Clases individuales, grupales, formación técnica y entrenamiento personalizado." },
      { property: "og:title", content: "Academia Fortux" },
      { property: "og:description", content: "Clases y formación de golf para todos los niveles." },
      { property: "og:url", content: "/academia" },
      { property: "og:image", content: academiaImg },
    ],
    links: [{ rel: "canonical", href: "/academia" }],
  }),
  component: Page,
});

const PLANS = [
  { icon: User, t: "Clase individual", d: "Sesión 1 a 1 con plan de mejora personalizado." },
  { icon: Users, t: "Clase grupal", d: "Aprende en grupo, entrenamiento dinámico y económico." },
  { icon: Target, t: "Formación técnica", d: "Análisis de swing, control de bola y juego corto." },
  { icon: Trophy, t: "Entrenamiento competitivo", d: "Plan personalizado para jugadores federados." },
];

function Page() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img src={academiaImg} alt="Clase de golf en la academia Fortux" width={1600} height={600} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-overlay" />
        <div className="container-fortux relative py-20 md:py-28 text-primary-foreground">
          <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary-foreground">Academia</span>
          <h1 className="mt-4 font-display text-4xl md:text-6xl font-bold text-balance max-w-2xl">Mejora tu juego con los mejores profesionales</h1>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-fortux">
          <SectionHeading eyebrow="Formación" title="Programas para todos los niveles" />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {PLANS.map((p) => (
              <article key={p.t} className="rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:shadow-elegant">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/40 text-primary">
                  <p.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold">{p.t}</h3>
                <p className="mt-2 text-muted-foreground">{p.d}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild className="bg-primary hover:bg-primary-glow">
              <a href={waLink("Hola, querría reservar una clase.")} target="_blank" rel="noopener">Reservar Clase</a>
            </Button>
            <Button asChild variant="outline">
              <a href={waLink("Hola, querría más información sobre la academia.")} target="_blank" rel="noopener">Solicitar Información</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
