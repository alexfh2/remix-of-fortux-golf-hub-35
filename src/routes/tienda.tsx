import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import { waLink } from "@/lib/site";
import tiendaImg from "@/assets/tienda.jpg";

export const Route = createFileRoute("/tienda")({
  head: () => ({
    meta: [
      { title: "Tienda — Fortux" },
      { name: "description", content: "Catálogo de grips, palos, accesorios, material técnico y productos de mantenimiento. Consulta directa por WhatsApp." },
      { property: "og:title", content: "Tienda — Fortux" },
      { property: "og:description", content: "Catálogo Fortux Golf: grips, palos, accesorios y más." },
      { property: "og:url", content: "/tienda" },
      { property: "og:image", content: tiendaImg },
    ],
    links: [{ rel: "canonical", href: "/tienda" }],
  }),
  component: Page,
});

const CATEGORIES = ["Todos", "Grips", "Palos", "Accesorios", "Material técnico", "Mantenimiento"] as const;
type Cat = (typeof CATEGORIES)[number];

const PRODUCTS: { name: string; cat: Exclude<Cat, "Todos">; desc: string }[] = [
  { name: "Grip Tour Velvet", cat: "Grips", desc: "Grip clásico de máxima durabilidad." },
  { name: "Grip MCC Plus4", cat: "Grips", desc: "Capa inferior más gruesa para mejor control." },
  { name: "Hierro Forjado Pro", cat: "Palos", desc: "Hierro forjado para jugadores avanzados." },
  { name: "Wedge 56°", cat: "Palos", desc: "Wedge versátil para juego corto." },
  { name: "Guante premium", cat: "Accesorios", desc: "Piel cabretta de alta calidad." },
  { name: "Bolsa Stand Pro", cat: "Accesorios", desc: "Ligera, resistente y elegante." },
  { name: "Launch monitor", cat: "Material técnico", desc: "Análisis de bola y swing." },
  { name: "Solvente para grips", cat: "Mantenimiento", desc: "Para regripping profesional." },
];

function Page() {
  const [active, setActive] = useState<Cat>("Todos");
  const list = active === "Todos" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === active);

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img src={tiendaImg} alt="Catálogo Fortux Golf" width={1600} height={600} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-overlay" />
        <div className="container-fortux relative py-20 md:py-28 text-primary-foreground">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-balance max-w-2xl">Tienda Fortux Golf</h1>
          <p className="mt-4 max-w-xl text-primary-foreground/85">Material seleccionado por golfistas, para golfistas. Consulta cualquier producto por WhatsApp.</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-fortux">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  active === c ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border hover:bg-muted"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((p) => (
              <article key={p.name} className="group rounded-2xl border border-border bg-card overflow-hidden transition-all hover:-translate-y-1 hover:shadow-elegant">
                <div className="aspect-[4/3] bg-gradient-hero relative">
                  <div className="absolute inset-0 grid place-items-center font-display text-primary-foreground/60 text-5xl">
                    {p.name[0]}
                  </div>
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">{p.cat}</span>
                  <h3 className="mt-1 font-display text-lg font-bold">{p.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                  <Button asChild size="sm" className="mt-4 w-full bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90">
                    <a href={waLink(`Hola, me interesa el producto: ${p.name}.`)} target="_blank" rel="noopener">
                      <MessageCircle className="mr-1.5 h-4 w-4" /> Consultar
                    </a>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
