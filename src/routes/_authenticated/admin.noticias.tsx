import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Trash2, Sparkles, Eye, EyeOff, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { NewsGenerator } from "@/components/admin/NewsGenerator";

type NewsRow = {
  id: string;
  title: string;
  excerpt: string | null;
  is_published: boolean;
  published_at: string | null;
  scheduled_at: string | null;
  created_at: string;
};

export const Route = createFileRoute("/_authenticated/admin/noticias")({
  component: AdminNoticias,
});

function AdminNoticias() {
  const qc = useQueryClient();
  const [view, setView] = useState<"list" | "generator">("list");

  const { data = [], isLoading } = useQuery({
    queryKey: ["admin", "news"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news")
        .select("id,title,excerpt,is_published,published_at,scheduled_at,created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as NewsRow[];
    },
  });

  const togglePublish = async (row: NewsRow) => {
    const next = !row.is_published;
    const { error } = await supabase.from("news").update({
      is_published: next,
      published_at: next ? (row.published_at ?? new Date().toISOString()) : null,
    } as never).eq("id", row.id);
    if (error) return toast.error(error.message);
    toast.success(next ? "Publicada" : "Despublicada");
    qc.invalidateQueries({ queryKey: ["admin", "news"] });
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from("news").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Eliminada");
    qc.invalidateQueries({ queryKey: ["admin", "news"] });
  };

  if (view === "generator") {
    return (
      <NewsGenerator
        onBack={() => setView("list")}
        onSaved={() => { setView("list"); qc.invalidateQueries({ queryKey: ["admin", "news"] }); qc.invalidateQueries({ queryKey: ["news"] }); }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">Noticias</h1>
          <p className="text-sm text-muted-foreground">Genera noticias con IA o créalas manualmente.</p>
        </div>
        <Button onClick={() => setView("generator")} className="bg-primary hover:bg-primary-glow">
          <Sparkles className="mr-2 h-4 w-4" /> Nueva noticia
        </Button>
      </div>

      <div className="rounded-md border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead className="w-[140px] text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-8">Cargando…</TableCell></TableRow>}
            {!isLoading && data.length === 0 && (
              <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-8">Sin noticias todavía</TableCell></TableRow>
            )}
            {data.map((r) => {
              const scheduled = r.scheduled_at && new Date(r.scheduled_at) > new Date();
              return (
                <TableRow key={r.id}>
                  <TableCell className="max-w-md">
                    <div className="font-medium truncate">{r.title}</div>
                    {r.excerpt && <div className="text-xs text-muted-foreground truncate">{r.excerpt}</div>}
                  </TableCell>
                  <TableCell>
                    {r.is_published ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                        <Eye className="h-3.5 w-3.5" /> Publicada
                      </span>
                    ) : scheduled ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600">
                        <Clock className="h-3.5 w-3.5" /> Programada
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <EyeOff className="h-3.5 w-3.5" /> Borrador
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {(r.published_at || r.scheduled_at || r.created_at) &&
                      new Date(r.published_at || r.scheduled_at || r.created_at).toLocaleString("es-ES", {
                        day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
                      })}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button size="sm" variant="ghost" onClick={() => togglePublish(r)}>
                        {r.is_published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="icon" variant="ghost"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>¿Eliminar noticia?</AlertDialogTitle>
                            <AlertDialogDescription>Esta acción no se puede deshacer.</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => remove(r.id)}>Eliminar</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
