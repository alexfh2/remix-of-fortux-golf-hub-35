import { createFileRoute } from "@tanstack/react-router";
import { CrudPage, type Field } from "@/components/admin/CrudPage";

type Media = {
  id: string; title: string | null; description: string | null;
  url: string; media_type: string; category: string | null;
  is_published: boolean; sort_order: number;
};

const fields: Field<Media>[] = [
  { name: "title", label: "Título", kind: "text" },
  { name: "url", label: "URL", kind: "url" },
  { name: "media_type", label: "Tipo (image/video)", kind: "text" },
  { name: "category", label: "Categoría", kind: "text" },
  { name: "description", label: "Descripción", kind: "textarea", showInList: false },
  { name: "sort_order", label: "Orden", kind: "number", showInList: false },
  { name: "is_published", label: "Publicado", kind: "switch" },
];

export const Route = createFileRoute("/_authenticated/admin/galeria")({
  component: () => (
    <CrudPage<Media>
      title="Galería"
      description="Imágenes y vídeos del sitio."
      table="media"
      orderBy={{ col: "sort_order" }}
      fields={fields}
      emptyRecord={{ media_type: "image", is_published: true, sort_order: 0 }}
    />
  ),
});
