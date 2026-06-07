import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/_authenticated/admin/cambiar-contrasena")({
  component: ChangePassword,
});

function ChangePassword() {
  const { user } = Route.useRouteContext() as { user: { id: string } };
  const navigate = useNavigate();
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (p1.length < 6) return toast.error("Mínimo 6 caracteres");
    if (p1 !== p2) return toast.error("Las contraseñas no coinciden");
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: p1 });
    if (error) { setLoading(false); return toast.error(error.message); }
    await supabase.from("profiles").update({ must_change_password: false }).eq("id", user.id);
    setLoading(false);
    toast.success("Contraseña actualizada");
    navigate({ to: "/admin" });
  };

  return (
    <div className="max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Cambiar contraseña</CardTitle>
          <CardDescription>Establece una nueva contraseña para tu cuenta.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="p1">Nueva contraseña</Label>
              <Input id="p1" type="password" value={p1} onChange={(e) => setP1(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="p2">Repite la contraseña</Label>
              <Input id="p2" type="password" value={p2} onChange={(e) => setP2(e.target.value)} required />
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary-glow">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Guardar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
