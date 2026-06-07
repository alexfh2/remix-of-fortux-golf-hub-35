import { createFileRoute } from "@tanstack/react-router";
import { CrudPage, type Field } from "@/components/admin/CrudPage";

type News = {
  id: string; slug: string; title: string; excerpt: string | null; content: string | null;
  cover_url: string | null; is_published: boolean; published_at: string | null;
};

const fields: Field<News>[] = [
  { name: "title", label: "Título", kind: "text" },
  { name: "slug", label: "Slug", kind: "text" },
  { name: "excerpt", label: "Extracto", kind: "textarea" },
  { name: "content", label: "Contenido", kind: "textarea", showInList: false },
  { name: "cover_url", label: "Portada (URL)", kind: "url", showInList: false },
  { name: "is_published", label: "Publicado", kind: "switch" },
];

export const Route = createFileRoute("/_authenticated/admin/noticias")({
  component: () => (
    <CrudPage<News>
      title="Noticias"
      description="Artículos y novedades."
      table="news"
      orderBy={{ col: "published_at", ascending: false }}
      fields={fields}
      emptyRecord={{ is_published: false }}
    />
  ),
});
