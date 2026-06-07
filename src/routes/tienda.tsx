import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { waLink } from "@/lib/site";
import { supabase } from "@/integrations/supabase/client";
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

type Product = {
  id: string;
  name: string;
  description: string | null;
  category: string;
  image_url: string | null;
};

function Page() {
  const [active, setActive] = useState<string>("Todos");

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("id,name,description,category,image_url")
        .eq("is_published", true)
        .order("sort_order");
      if (error) throw error;
      return data as Product[];
    },
  });

  const categories = useMemo(
    () => ["Todos", ...Array.from(new Set(products.map((p) => p.category)))],
    [products]
  );
  const list = active === "Todos" ? products : products.filter((p) => p.category === active);

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
            {categories.map((c) => (
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

          {isLoading ? (
            <p className="mt-10 text-muted-foreground">Cargando productos…</p>
          ) : (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {list.map((p) => (
                <article key={p.id} className="group rounded-2xl border border-border bg-card overflow-hidden transition-all hover:-translate-y-1 hover:shadow-elegant">
                  <div className="aspect-[4/3] bg-gradient-hero relative">
                    {p.image_url ? (
                      <img src={p.image_url} alt={p.name} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                    ) : (
                      <div className="absolute inset-0 grid place-items-center font-display text-primary-foreground/60 text-5xl">
                        {p.name[0]}
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">{p.category}</span>
                    <h3 className="mt-1 font-display text-lg font-bold">{p.name}</h3>
                    {p.description && <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>}
                    <Button asChild size="sm" className="mt-4 w-full bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90">
                      <a href={waLink(`Hola, me interesa el producto: ${p.name}.`)} target="_blank" rel="noopener">
                        <MessageCircle className="mr-1.5 h-4 w-4" /> Consultar
                      </a>
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
