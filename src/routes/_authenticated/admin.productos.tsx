import { createFileRoute } from "@tanstack/react-router";
import { CrudPage, type Field } from "@/components/admin/CrudPage";

type Product = {
  id: string; slug: string; name: string; description: string | null;
  category: string; price: number | null; currency: string; image_url: string | null;
  is_published: boolean; sort_order: number;
};

const fields: Field<Product>[] = [
  { name: "name", label: "Nombre", kind: "text", required: true },
  { name: "slug", label: "Slug", kind: "text", required: true },
  { name: "category", label: "Categoría", kind: "text", placeholder: "grips, palos, accesorios…" },
  { name: "price", label: "Precio (EUR)", kind: "number" },
  { name: "image_url", label: "Imagen (URL)", kind: "url", showInList: false },
  { name: "description", label: "Descripción", kind: "textarea", showInList: false },
  { name: "sort_order", label: "Orden", kind: "number", showInList: false },
  { name: "is_published", label: "Publicado", kind: "switch" },
];

export const Route = createFileRoute("/_authenticated/admin/productos")({
  component: () => (
    <CrudPage<Product>
      title="Productos"
      description="Catálogo de la tienda."
      table="products"
      orderBy={{ col: "sort_order" }}
      fields={fields}
      emptyRecord={{ currency: "EUR", is_published: true, sort_order: 0 }}
    />
  ),
});
