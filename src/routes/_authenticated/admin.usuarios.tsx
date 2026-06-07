import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Plus, Trash2, KeyRound, Loader2 } from "lucide-react";
import {
  listUsers, createUser, setUserRole, deleteUser, resetUserPassword,
} from "@/lib/admin-users.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_authenticated/admin/usuarios")({
  component: UsersPage,
});

const ROLES = ["super_admin", "admin", "editor", "manager", "viewer"] as const;

function UsersPage() {
  const qc = useQueryClient();
  const fetchList = useServerFn(listUsers);
  const fnCreate = useServerFn(createUser);
  const fnSetRole = useServerFn(setUserRole);
  const fnDelete = useServerFn(deleteUser);
  const fnReset = useServerFn(resetUserPassword);

  const { data = [], isLoading } = useQuery({
    queryKey: ["admin", "users"],
    queryFn: () => fetchList(),
  });

  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ username: "", email: "", password: "", full_name: "", role: "editor" });
  const [pwUser, setPwUser] = useState<{ id: string; email?: string } | null>(null);
  const [newPw, setNewPw] = useState("");

  const reload = () => qc.invalidateQueries({ queryKey: ["admin", "users"] });

  const submitCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const email = form.email.includes("@") ? form.email : `${form.email || form.username}@fortux.local`;
      await fnCreate({ data: { ...form, email, role: form.role as typeof ROLES[number] } });
      toast.success("Usuario creado");
      setOpen(false);
      setForm({ username: "", email: "", password: "", full_name: "", role: "editor" });
      reload();
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const changeRole = async (user_id: string, role: string) => {
    try {
      await fnSetRole({ data: { user_id, role: role as typeof ROLES[number] } });
      toast.success("Rol actualizado");
      reload();
    } catch (err) { toast.error((err as Error).message); }
  };

  const doDelete = async (user_id: string) => {
    try { await fnDelete({ data: { user_id } }); toast.success("Eliminado"); reload(); }
    catch (err) { toast.error((err as Error).message); }
  };

  const doResetPw = async () => {
    if (!pwUser || newPw.length < 6) return toast.error("Contraseña mínima 6 caracteres");
    try {
      await fnReset({ data: { user_id: pwUser.id, password: newPw } });
      toast.success("Contraseña restablecida");
      setPwUser(null); setNewPw("");
    } catch (err) { toast.error((err as Error).message); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Usuarios</h1>
          <p className="text-sm text-muted-foreground">Gestión de cuentas y roles del panel.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary-glow"><Plus className="mr-2 h-4 w-4" /> Nuevo usuario</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear usuario</DialogTitle>
              <DialogDescription>Se le pedirá cambiar la contraseña al primer acceso.</DialogDescription>
            </DialogHeader>
            <form onSubmit={submitCreate} className="space-y-3">
              <div className="space-y-1.5">
                <Label>Usuario</Label>
                <Input value={form.username} onChange={(e) => setForm((s) => ({ ...s, username: e.target.value }))} required />
              </div>
              <div className="space-y-1.5">
                <Label>Email</Label>
                <Input type="text" placeholder="usuario o email" value={form.email} onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))} />
              </div>
              <div className="space-y-1.5">
                <Label>Nombre completo</Label>
                <Input value={form.full_name} onChange={(e) => setForm((s) => ({ ...s, full_name: e.target.value }))} />
              </div>
              <div className="space-y-1.5">
                <Label>Contraseña inicial</Label>
                <Input type="text" value={form.password} onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))} required minLength={6} />
              </div>
              <div className="space-y-1.5">
                <Label>Rol</Label>
                <Select value={form.role} onValueChange={(v) => setForm((s) => ({ ...s, role: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{ROLES.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
                <Button type="submit" disabled={saving} className="bg-primary hover:bg-primary-glow">
                  {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Crear
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuario</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">Cargando…</TableCell></TableRow>}
            {!isLoading && data.length === 0 && <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">Sin usuarios</TableCell></TableRow>}
            {data.map((u) => (
              <TableRow key={u.id}>
                <TableCell className="font-medium">{u.profile?.username || u.profile?.full_name || "—"}</TableCell>
                <TableCell className="text-muted-foreground">{u.email}</TableCell>
                <TableCell>
                  <Select value={u.roles[0] ?? "viewer"} onValueChange={(v) => changeRole(u.id, v)}>
                    <SelectTrigger className="h-8 w-[140px]"><SelectValue /></SelectTrigger>
                    <SelectContent>{ROLES.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  {u.profile?.must_change_password ? <Badge variant="secondary">Debe cambiar pwd</Badge> : <Badge>Activo</Badge>}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button size="icon" variant="ghost" onClick={() => setPwUser({ id: u.id, email: u.email })}>
                      <KeyRound className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="icon" variant="ghost"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Eliminar usuario?</AlertDialogTitle>
                          <AlertDialogDescription>Esta acción no se puede deshacer.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => doDelete(u.id)}>Eliminar</AlertDialogAction>
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

      <Dialog open={!!pwUser} onOpenChange={(o) => !o && setPwUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Restablecer contraseña</DialogTitle>
            <DialogDescription>{pwUser?.email}</DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label>Nueva contraseña</Label>
            <Input type="text" value={newPw} onChange={(e) => setNewPw(e.target.value)} minLength={6} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPwUser(null)}>Cancelar</Button>
            <Button onClick={doResetPw} className="bg-primary hover:bg-primary-glow">Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
