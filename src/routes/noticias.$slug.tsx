import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/noticias/$slug")({
  component: NewsDetail,
});

type NewsFull = {
  id: string;
  title: string;
  content: string | null;
  excerpt: string | null;
  cover_url: string | null;
  gallery_images: string[] | null;
  published_at: string | null;
};

function NewsDetail() {
  const { slug } = Route.useParams();
  const { lang } = useI18n();

  const { data, isLoading, error } = useQuery({
    queryKey: ["news", "detail", slug],
    queryFn: async () => {
      // try by slug first, then by id
      let q = await supabase
        .from("news")
        .select("id,title,content,excerpt,cover_url,gallery_images,published_at,is_published")
        .eq("slug", slug)
        .maybeSingle();
      if (!q.data) {
        q = await supabase
          .from("news")
          .select("id,title,content,excerpt,cover_url,gallery_images,published_at,is_published")
          .eq("id", slug)
          .maybeSingle();
      }
      if (q.error) throw q.error;
      if (!q.data || !q.data.is_published) throw notFound();
      return q.data as NewsFull;
    },
  });

  return (
    <section className="py-16 md:py-24">
      <div className="container-fortux max-w-4xl">
        <Link to="/noticias" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="h-4 w-4" /> Volver a noticias
        </Link>

        {isLoading && <p className="mt-10 text-muted-foreground">Cargando…</p>}
        {error && <p className="mt-10 text-destructive">No se pudo cargar la noticia.</p>}

        {data && (
          <article className="mt-8">
            {data.published_at && (
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                {new Date(data.published_at).toLocaleDateString(lang === "ca" ? "ca-ES" : "es-ES", { day: "2-digit", month: "long", year: "numeric" })}
              </p>
            )}
            <h1 className="mt-3 font-display text-3xl md:text-5xl font-bold">{data.title}</h1>
            {data.excerpt && <p className="mt-4 text-lg text-muted-foreground">{data.excerpt}</p>}

            {data.cover_url && (
              <div className="mt-8 overflow-hidden rounded-2xl border border-border">
                <img src={data.cover_url} alt={data.title} className="w-full h-auto object-cover" />
              </div>
            )}

            {data.content && (
              <div className="prose prose-lg dark:prose-invert mt-8 max-w-none whitespace-pre-wrap">
                {data.content}
              </div>
            )}

            {data.gallery_images && data.gallery_images.length > 0 && (
              <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-3">
                {data.gallery_images.map((url, i) => (
                  <img key={i} src={url} alt={`${data.title} ${i + 1}`} className="rounded-xl border border-border w-full aspect-square object-cover" loading="lazy" />
                ))}
              </div>
            )}
          </article>
        )}
      </div>
    </section>
  );
}
