import { Link } from "@tanstack/react-router";
import { Menu, X, LogIn } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { waLink } from "@/lib/site";
import { useAuth } from "@/hooks/useAuth";
import { BRAND } from "@/assets/brand";


const NAV = [
  { to: "/", label: "Inicio" },
  { to: "/servicios", label: "Servicios" },
  { to: "/tienda", label: "Tienda" },
  { to: "/academia", label: "Academia" },
  { to: "/circuito", label: "Circuito P&P" },
  { to: "/noticias", label: "Noticias" },
  { to: "/contacto", label: "Contacto" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container-fortux flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center" onClick={() => setOpen(false)} aria-label="Fortux — Inicio">
          <img src={BRAND.horizontal} alt="Fortux" className="h-9 md:h-10 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
              activeProps={{ className: "text-primary bg-muted" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <LanguageSwitcher />
          {!user && (
            <Button asChild variant="ghost" size="sm">
              <Link to="/auth"><LogIn className="mr-2 h-4 w-4" /> Acceder</Link>
            </Button>
          )}
          <Button asChild variant="default" className="bg-primary hover:bg-primary-glow">
            <a href={waLink("Hola, querría solicitar un presupuesto.")} target="_blank" rel="noopener">
              Solicitar Presupuesto
            </a>
          </Button>
        </div>


        <button
          aria-label="Abrir menú"
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground hover:bg-muted"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container-fortux py-4 flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base font-medium text-foreground/90 hover:bg-muted"
                activeProps={{ className: "text-primary bg-muted" }}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex items-center justify-between gap-2">
              <LanguageSwitcher />
              <Button asChild className="flex-1 bg-primary hover:bg-primary-glow">
                <a href={waLink("Hola, querría solicitar un presupuesto.")} target="_blank" rel="noopener">
                  Solicitar Presupuesto
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
