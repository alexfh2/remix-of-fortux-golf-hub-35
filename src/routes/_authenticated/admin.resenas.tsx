import { useState, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, Loader2, Star, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

type Review = {
  id: string;
  author_name: string;
  author_location: string | null;
  rating: number;
  content: string;
  is_published: boolean;
  sort_order: number;
  avatar_url: string | null;
  review_date: string | null;
};

const empty: Partial<Review> = {
  author_name: "", author_location: "", rating: 5, content: "",
  is_published: true, sort_order: 0, avatar_url: null, review_date: null,
};

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

function ResenasAdmin() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Partial<Review> | null>(null);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const { data = [], isLoading } = useQuery({
    queryKey: ["admin", "reviews"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Review[];
    },
  });

  const openNew = () => { setEditing({ ...empty, review_date: new Date().toISOString().slice(0, 10) }); setOpen(true); };
  const openEdit = (r: Review) => { setEditing({ ...r }); setOpen(true); };

  const save = async () => {
    if (!editing) return;
    if (!editing.author_name?.trim() || !editing.content?.trim()) {
      toast.error("Autor y reseña son obligatorios");
      return;
    }
    setSaving(true);
    const payload = { ...editing };
    const id = payload.id;
    delete (payload as Partial<Review> & { created_at?: string }).created_at;
    delete (payload as Partial<Review> & { updated_at?: string }).updated_at;
    delete payload.id;
    const { error } = id
      ? await supabase.from("reviews").update(payload).eq("id", id)
      : await supabase.from("reviews").insert(payload as never);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Guardado");
    setOpen(false);
    qc.invalidateQueries({ queryKey: ["admin", "reviews"] });
    qc.invalidateQueries({ queryKey: ["reviews-home"] });
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Eliminado");
    qc.invalidateQueries({ queryKey: ["admin", "reviews"] });
    qc.invalidateQueries({ queryKey: ["reviews-home"] });
  };

  const handleFile = async (file: File) => {
    if (file.size > 2 * 1024 * 1024) {
      toast.error("La imagen es demasiado grande (máx. 2 MB)");
      return;
    }
    setUploading(true);
    try {
      const dataUrl = await fileToDataUrl(file);
      setEditing((s) => ({ ...s!, avatar_url: dataUrl }));
    } catch {
      toast.error("No se pudo leer la imagen");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">Reseñas</h1>
          <p className="text-sm text-muted-foreground">Opiniones de clientes (Google y otras).</p>
        </div>
        <Button onClick={openNew} className="bg-primary hover:bg-primary-glow">
          <Plus className="mr-2 h-4 w-4" /> Nueva reseña
        </Button>
      </div>

      <div className="rounded-md border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">Foto</TableHead>
              <TableHead>Autor</TableHead>
              <TableHead>⭐</TableHead>
              <TableHead>Reseña</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Publicada</TableHead>
              <TableHead className="w-[120px] text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-8">Cargando…</TableCell></TableRow>
            )}
            {!isLoading && data.length === 0 && (
              <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-8">Sin reseñas</TableCell></TableRow>
            )}
            {data.map((r) => (
              <TableRow key={r.id}>
                <TableCell>
                  <Avatar className="h-9 w-9">
                    {r.avatar_url ? <AvatarImage src={r.avatar_url} alt={r.author_name} /> : null}
                    <AvatarFallback>{r.author_name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">{r.author_name}</TableCell>
                <TableCell>{r.rating}</TableCell>
                <TableCell className="max-w-xs truncate">{r.content}</TableCell>
                <TableCell className="text-muted-foreground text-sm">{r.review_date ?? "—"}</TableCell>
                <TableCell>{r.is_published ? "Sí" : "No"}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button size="icon" variant="ghost" onClick={() => openEdit(r)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Eliminar reseña?</AlertDialogTitle>
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
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing?.id ? "Editar reseña" : "Nueva reseña"}</DialogTitle>
            <DialogDescription>
              Copia los datos desde Google: nombre, texto, fecha y, si quieres, la foto del autor.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Avatar */}
            <div className="space-y-1.5">
              <Label>Foto del autor</Label>
              <div className="flex items-center gap-3">
                <Avatar className="h-14 w-14">
                  {editing?.avatar_url ? <AvatarImage src={editing.avatar_url} alt="" /> : null}
                  <AvatarFallback>{(editing?.author_name ?? "?").slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleFile(f);
                    e.target.value = "";
                  }}
                />
                <Button type="button" variant="outline" size="sm" onClick={() => fileRef.current?.click()} disabled={uploading}>
                  {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                  Subir foto
                </Button>
                {editing?.avatar_url && (
                  <Button type="button" variant="ghost" size="sm" onClick={() => setEditing((s) => ({ ...s!, avatar_url: null }))}>
                    Quitar
                  </Button>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Tip: en Google, haz clic derecho en la foto del autor → "Guardar imagen como…" → súbela aquí. Máx. 2 MB.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="author_name">Autor *</Label>
                <Input
                  id="author_name"
                  value={editing?.author_name ?? ""}
                  onChange={(e) => setEditing((s) => ({ ...s!, author_name: e.target.value }))}
                  placeholder="Juan Pérez"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="author_location">Ubicación</Label>
                <Input
                  id="author_location"
                  value={editing?.author_location ?? ""}
                  onChange={(e) => setEditing((s) => ({ ...s!, author_location: e.target.value }))}
                  placeholder="Local Guide · 12 reseñas"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="review_date">Fecha</Label>
                <Input
                  id="review_date"
                  type="date"
                  value={editing?.review_date ?? ""}
                  onChange={(e) => setEditing((s) => ({ ...s!, review_date: e.target.value || null }))}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Puntuación</Label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setEditing((s) => ({ ...s!, rating: n }))}
                      className="p-1"
                    >
                      <Star
                        className={`h-6 w-6 ${n <= (editing?.rating ?? 0) ? "fill-secondary text-secondary" : "text-muted-foreground"}`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="content">Reseña *</Label>
              <Textarea
                id="content"
                rows={5}
                value={editing?.content ?? ""}
                onChange={(e) => setEditing((s) => ({ ...s!, content: e.target.value }))}
                placeholder="Pega aquí el texto copiado de Google…"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="sort_order">Orden</Label>
                <Input
                  id="sort_order"
                  type="number"
                  value={editing?.sort_order ?? 0}
                  onChange={(e) => setEditing((s) => ({ ...s!, sort_order: Number(e.target.value) || 0 }))}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Publicada</Label>
                <div className="flex items-center h-9">
                  <Switch
                    checked={Boolean(editing?.is_published)}
                    onCheckedChange={(v) => setEditing((s) => ({ ...s!, is_published: v }))}
                  />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={save} disabled={saving} className="bg-primary hover:bg-primary-glow">
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export const Route = createFileRoute("/_authenticated/admin/resenas")({
  component: ResenasAdmin,
});
