import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Package, Newspaper, Star, ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: Dashboard,
});

function useCount(table: "products" | "news" | "reviews" | "media") {
  return useQuery({
    queryKey: ["count", table],
    queryFn: async () => {
      const { count, error } = await supabase.from(table).select("*", { count: "exact", head: true });
      if (error) throw error;
      return count ?? 0;
    },
  });
}

function Dashboard() {
  const products = useCount("products");
  const news = useCount("news");
  const reviews = useCount("reviews");
  const media = useCount("media");

  const cards = [
    { label: "Productos", value: products.data, icon: Package },
    { label: "Noticias", value: news.data, icon: Newspaper },
    { label: "Reseñas", value: reviews.data, icon: Star },
    { label: "Galería", value: media.data, icon: ImageIcon },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Resumen de contenido publicado en la web.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Card key={c.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{c.label}</CardTitle>
              <c.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{c.value ?? "…"}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
