import { createFileRoute, Outlet, Link, useNavigate, useRouterState, redirect } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  LayoutDashboard, Package, Newspaper, Star, ImageIcon, Users, LogOut, KeyRound,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarTrigger,
  SidebarHeader, SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin · Fortux" }, { name: "robots", content: "noindex" }] }),
  component: AdminLayout,
});

type NavItem = { to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean; roles?: string[] };
const ITEMS: NavItem[] = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/productos", label: "Productos", icon: Package },
  { to: "/admin/noticias", label: "Noticias", icon: Newspaper },
  { to: "/admin/resenas", label: "Reseñas", icon: Star },
  { to: "/admin/galeria", label: "Galería", icon: ImageIcon },
  { to: "/admin/usuarios", label: "Usuarios", icon: Users, roles: ["super_admin"] },
];

function AdminLayout() {
  const { user } = Route.useRouteContext() as { user: { id: string; email?: string } };
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { data: profile } = useQuery({
    queryKey: ["profile", user.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles").select("*").eq("id", user.id).maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const { data: roles = [] } = useQuery({
    queryKey: ["roles", user.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_roles").select("role").eq("user_id", user.id);
      if (error) throw error;
      return data.map((r) => r.role);
    },
  });

  const path = useRouterState({ select: (s) => s.location.pathname });

  // Force password change
  useEffect(() => {
    if (profile?.must_change_password && path !== "/admin/cambiar-contrasena") {
      navigate({ to: "/admin/cambiar-contrasena" });
    }
  }, [profile, path, navigate]);

  const handleLogout = async () => {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  const visible = ITEMS.filter((i) => !i.roles || i.roles.some((r) => (roles as string[]).includes(r)));

  return (
    <SidebarProvider>
      <div className="flex min-h-[calc(100vh-8rem)] w-full">
        <Sidebar collapsible="icon">
          <SidebarHeader>
            <div className="flex items-center gap-2 px-2 py-1">
              <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground font-display font-bold">F</span>
              <span className="font-display font-semibold">Fortux Admin</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Gestión</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {visible.map((item) => {
                    const active = item.exact ? path === item.to : path.startsWith(item.to);
                    return (
                      <SidebarMenuItem key={item.to}>
                        <SidebarMenuButton asChild isActive={active}>
                          <Link to={item.to} className="flex items-center gap-2">
                            <item.icon className="h-4 w-4" />
                            <span>{item.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Cuenta</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={path === "/admin/cambiar-contrasena"}>
                      <Link to="/admin/cambiar-contrasena" className="flex items-center gap-2">
                        <KeyRound className="h-4 w-4" />
                        <span>Contraseña</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <div className="px-2 py-1 text-xs text-muted-foreground truncate">{user.email}</div>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="justify-start">
              <LogOut className="mr-2 h-4 w-4" /> Salir
            </Button>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center gap-2 border-b border-border px-4 sticky top-16 bg-background z-30">
            <SidebarTrigger />
            <div className="ml-auto text-sm text-muted-foreground">
              {roles.length > 0 && <span className="rounded-full bg-muted px-3 py-1">{roles.join(", ")}</span>}
            </div>
          </header>
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
