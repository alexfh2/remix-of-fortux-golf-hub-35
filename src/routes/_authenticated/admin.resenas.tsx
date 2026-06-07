import { createFileRoute } from "@tanstack/react-router";
import { CrudPage, type Field } from "@/components/admin/CrudPage";

type Review = {
  id: string; author_name: string; author_location: string | null;
  rating: number; content: string; is_published: boolean; sort_order: number;
};

const fields: Field<Review>[] = [
  { name: "author_name", label: "Autor", kind: "text" },
  { name: "author_location", label: "Ubicación", kind: "text" },
  { name: "rating", label: "Puntuación (1-5)", kind: "number" },
  { name: "content", label: "Reseña", kind: "textarea" },
  { name: "sort_order", label: "Orden", kind: "number", showInList: false },
  { name: "is_published", label: "Publicada", kind: "switch" },
];

export const Route = createFileRoute("/_authenticated/admin/resenas")({
  component: () => (
    <CrudPage<Review>
      title="Reseñas"
      description="Opiniones de clientes."
      table="reviews"
      orderBy={{ col: "sort_order" }}
      fields={fields}
      emptyRecord={{ rating: 5, is_published: true, sort_order: 0 }}
    />
  ),
});
