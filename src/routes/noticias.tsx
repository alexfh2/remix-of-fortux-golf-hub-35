import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/noticias")({
  head: () => ({
    meta: [
      { title: "Noticias — Fortux" },
      { name: "description", content: "Actualidad del circuito, novedades de la academia, competiciones, productos y la familia Fortux." },
      { property: "og:title", content: "Noticias — Fortux" },
      { property: "og:description", content: "Toda la actualidad de Fortux y del circuito." },
      { property: "og:url", content: "/noticias" },
    ],
    links: [{ rel: "canonical", href: "/noticias" }],
  }),
  component: Page,
});

const NEWS = [
  { cat: "Circuito", title: "Arranca la nueva temporada del circuito P&P", date: "01 Oct 2026", excerpt: "Más pruebas, nuevos campos y un calendario lleno de competiciones." },
  { cat: "Academia", title: "Nuevo programa de iniciación para adultos", date: "22 Sep 2026", excerpt: "Aprende los fundamentos del golf en sesiones grupales semanales." },
  { cat: "Productos", title: "Llegan los nuevos grips Tour Velvet Pro", date: "10 Sep 2026", excerpt: "Disponibles en taller con cambio inmediato mientras esperas." },
  { cat: "Fortux", title: "Ampliamos taller con nuevas máquinas de fitting", date: "01 Sep 2026", excerpt: "Mejoramos nuestro servicio con tecnología de última generación." },
];

const CATS = ["Todos", "Fortux", "Circuito", "Academia", "Competiciones", "Productos"] as const;

function Page() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-fortux">
        <SectionHeading eyebrow="Noticias" title="Actualidad de Fortux" subtitle="Lo último del taller, la academia, los productos y el circuito." />
        <div className="mt-8 flex flex-wrap gap-2">
          {CATS.map((c) => (
            <span key={c} className="rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-foreground">{c}</span>
          ))}
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {NEWS.map((n) => (
            <article key={n.title} className="group rounded-2xl border border-border bg-card overflow-hidden transition-all hover:-translate-y-1 hover:shadow-elegant">
              <div className="aspect-[16/9] bg-gradient-hero" />
              <div className="p-7">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold uppercase tracking-wider text-primary">{n.cat}</span>
                  <span className="text-muted-foreground">{n.date}</span>
                </div>
                <h3 className="mt-3 font-display text-xl md:text-2xl font-bold">{n.title}</h3>
                <p className="mt-2 text-muted-foreground">{n.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
