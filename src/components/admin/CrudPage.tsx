import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

export type FieldKind = "text" | "textarea" | "number" | "switch" | "url";
export type Field<T> = {
  name: keyof T & string;
  label: string;
  kind: FieldKind;
  placeholder?: string;
  required?: boolean;
  showInList?: boolean;
};

type Props<T extends { id: string }> = {
  title: string;
  description?: string;
  table: string;
  orderBy?: { col: string; ascending?: boolean };
  fields: Field<T>[];
  emptyRecord: Partial<T>;
  renderRow?: (row: T) => Partial<Record<keyof T & string, React.ReactNode>>;
};

export function CrudPage<T extends { id: string }>({
  title, description, table, orderBy, fields, emptyRecord, renderRow,
}: Props<T>) {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Partial<T> | null>(null);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const { data = [], isLoading } = useQuery({
    queryKey: ["admin", table],
    queryFn: async () => {
      let q = supabase.from(table as never).select("*");
      if (orderBy) q = q.order(orderBy.col, { ascending: orderBy.ascending ?? true });
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as T[];
    },
  });

  const openNew = () => { setEditing({ ...emptyRecord }); setOpen(true); };
  const openEdit = (row: T) => { setEditing({ ...row }); setOpen(true); };

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    const payload: Record<string, unknown> = { ...editing };
    let error;
    if ("id" in payload && payload.id) {
      const id = payload.id;
      delete payload.id;
      delete payload.created_at;
      delete payload.updated_at;
      ({ error } = await supabase.from(table as never).update(payload as never).eq("id", id as string));
    } else {
      delete payload.id;
      ({ error } = await supabase.from(table as never).insert(payload as never));
    }
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Guardado");
    setOpen(false);
    qc.invalidateQueries({ queryKey: ["admin", table] });
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from(table as never).delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Eliminado");
    qc.invalidateQueries({ queryKey: ["admin", table] });
  };

  const listFields = fields.filter((f) => f.showInList !== false).slice(0, 4);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">{title}</h1>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNew} className="bg-primary hover:bg-primary-glow">
              <Plus className="mr-2 h-4 w-4" /> Nuevo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editing && "id" in editing && editing.id ? "Editar" : "Crear"}</DialogTitle>
              <DialogDescription>Completa los datos y guarda.</DialogDescription>
            </DialogHeader>
            <div className="space-y-3 py-2">
              {fields.map((f) => (
                <div key={f.name} className="space-y-1.5">
                  <Label htmlFor={f.name}>{f.label}</Label>
                  {f.kind === "textarea" ? (
                    <Textarea
                      id={f.name}
                      value={(editing?.[f.name] as string) ?? ""}
                      onChange={(e) => setEditing((s) => ({ ...s!, [f.name]: e.target.value }))}
                      placeholder={f.placeholder}
                      rows={4}
                    />
                  ) : f.kind === "switch" ? (
                    <div className="flex items-center gap-2">
                      <Switch
                        id={f.name}
                        checked={Boolean(editing?.[f.name])}
                        onCheckedChange={(v) => setEditing((s) => ({ ...s!, [f.name]: v as never }))}
                      />
                    </div>
                  ) : (
                    <Input
                      id={f.name}
                      type={f.kind === "number" ? "number" : f.kind === "url" ? "url" : "text"}
                      value={(editing?.[f.name] as string | number | undefined) ?? ""}
                      onChange={(e) =>
                        setEditing((s) => ({
                          ...s!,
                          [f.name]: f.kind === "number" ? (e.target.value === "" ? null : Number(e.target.value)) : e.target.value,
                        }))
                      }
                      placeholder={f.placeholder}
                    />
                  )}
                </div>
              ))}
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

      <div className="rounded-md border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              {listFields.map((f) => <TableHead key={f.name}>{f.label}</TableHead>)}
              <TableHead className="w-[120px] text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow><TableCell colSpan={listFields.length + 1} className="text-center text-muted-foreground py-8">Cargando…</TableCell></TableRow>
            )}
            {!isLoading && data.length === 0 && (
              <TableRow><TableCell colSpan={listFields.length + 1} className="text-center text-muted-foreground py-8">Sin registros</TableCell></TableRow>
            )}
            {data.map((row) => {
              const overrides = (renderRow?.(row) ?? {}) as Record<string, React.ReactNode>;
              return (
                <TableRow key={row.id}>
                  {listFields.map((f) => (
                    <TableCell key={f.name} className="max-w-xs truncate">
                      {overrides[f.name] ?? formatCell(row[f.name as keyof T], f.kind)}
                    </TableCell>
                  ))}
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button size="icon" variant="ghost" onClick={() => openEdit(row)}>
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
                            <AlertDialogTitle>¿Eliminar?</AlertDialogTitle>
                            <AlertDialogDescription>Esta acción no se puede deshacer.</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => remove(row.id)}>Eliminar</AlertDialogAction>
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

function formatCell(v: unknown, kind: FieldKind) {
  if (v === null || v === undefined) return "—";
  if (kind === "switch") return v ? "Sí" : "No";
  if (typeof v === "string" && v.startsWith("http")) {
    return <a href={v} target="_blank" rel="noopener" className="text-primary underline truncate inline-block max-w-[200px]">{v}</a>;
  }
  return String(v);
}
