import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/galeria")({
  head: () => ({
    meta: [
      { title: "Galería — Fortux" },
      { name: "description", content: "Fotografías y vídeos de reparaciones, eventos, academia, competiciones y productos." },
      { property: "og:title", content: "Galería — Fortux" },
      { property: "og:description", content: "Multimedia de Fortux: reparaciones, eventos, academia y competiciones." },
      { property: "og:url", content: "/galeria" },
    ],
    links: [{ rel: "canonical", href: "/galeria" }],
  }),
  component: Page,
});

const FILTERS = ["Todos", "Reparaciones", "Eventos", "Academia", "Competiciones", "Productos"] as const;
type F = (typeof FILTERS)[number];

const ITEMS: { cat: Exclude<F, "Todos">; label: string }[] = Array.from({ length: 12 }).map((_, i) => ({
  cat: (["Reparaciones", "Eventos", "Academia", "Competiciones", "Productos"] as const)[i % 5],
  label: `Imagen ${i + 1}`,
}));

function Page() {
  const [active, setActive] = useState<F>("Todos");
  const list = active === "Todos" ? ITEMS : ITEMS.filter((i) => i.cat === active);
  return (
    <section className="py-20 md:py-28">
      <div className="container-fortux">
        <SectionHeading eyebrow="Galería" title="Momentos Fortux" />
        <div className="mt-8 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${active === f ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:bg-muted"}`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="mt-10 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {list.map((m, idx) => (
            <div key={idx} className="aspect-square rounded-xl bg-gradient-hero relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-overlay opacity-0 group-hover:opacity-100 transition-opacity grid place-items-end p-3">
                <span className="text-primary-foreground text-xs font-semibold">{m.cat}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
