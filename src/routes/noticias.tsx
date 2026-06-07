import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SectionHeading } from "@/components/site/SectionHeading";
import { supabase } from "@/integrations/supabase/client";

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

type News = {
  id: string;
  title: string;
  excerpt: string | null;
  cover_url: string | null;
  published_at: string | null;
};

function Page() {
  const { data: news = [], isLoading } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news")
        .select("id,title,excerpt,cover_url,published_at")
        .eq("is_published", true)
        .order("published_at", { ascending: false });
      if (error) throw error;
      return data as News[];
    },
  });

  return (
    <section className="py-20 md:py-28">
      <div className="container-fortux">
        <SectionHeading eyebrow="Noticias" title="Actualidad de Fortux" subtitle="Lo último del taller, la academia, los productos y el circuito." />
        {isLoading ? (
          <p className="mt-10 text-muted-foreground">Cargando noticias…</p>
        ) : (
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {news.map((n) => (
              <article key={n.id} className="group rounded-2xl border border-border bg-card overflow-hidden transition-all hover:-translate-y-1 hover:shadow-elegant">
                <div className="aspect-[16/9] bg-gradient-hero">
                  {n.cover_url && <img src={n.cover_url} alt={n.title} className="h-full w-full object-cover" loading="lazy" />}
                </div>
                <div className="p-7">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold uppercase tracking-wider text-primary">Fortux</span>
                    {n.published_at && (
                      <span className="text-muted-foreground">
                        {new Date(n.published_at).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" })}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-3 font-display text-xl md:text-2xl font-bold">{n.title}</h3>
                  {n.excerpt && <p className="mt-2 text-muted-foreground">{n.excerpt}</p>}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
