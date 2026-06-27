import { Link } from "@tanstack/react-router";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { waLink } from "@/lib/site";
import { BRAND } from "@/assets/brand";
import { useI18n } from "@/lib/i18n";

type NavItem = {
  to?: string;
  href?: string;
  label: string;
  children?: { to: string; label: string }[];
};

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const { t } = useI18n();
  const NAV: NavItem[] = [
    {
      to: "/servicios",
      label: "Servicios",
      children: [
        { to: "/servicios/reemplazo-del-grip", label: "Reemplazo del Grip" },
        { to: "/servicios/ajustes-de-varillas", label: "Ajustes de Varillas" },
        { to: "/servicios/swing-weight", label: "Swing Weight" },
        { to: "/servicios/lie-loft", label: "Lie & Loft" },
      ],
    },
    { to: "/tienda", label: "Grips" },
    { to: "/academia", label: "Academy" },
    { to: "/circuito", label: "Torneos" },
    { href: "/#nosotros", label: "Nosotros" },
    { to: "/contacto", label: "Contacto" },
  ];
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-primary-deep/90 text-primary-foreground backdrop-blur-md">
      <div className="container-fortux flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center" onClick={() => setOpen(false)} aria-label="Fortux — Inicio">
          <img src={BRAND.horizontalWhite} alt="Fortux" className="h-9 md:h-10 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((item) =>
            item.children && item.to ? (
              <div key={item.to} className="relative group">
                <Link
                  to={item.to}
                  className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold tracking-wide uppercase text-primary-foreground/85 transition-colors hover:text-secondary"
                  activeProps={{ className: "text-secondary" }}
                >
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                </Link>
                <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                  <div className="min-w-[240px] rounded-xl border border-white/10 bg-primary-deep shadow-elegant p-2">
                    {item.children.map((c) => (
                      <Link
                        key={c.to}
                        to={c.to}
                        className="block rounded-md px-3 py-2 text-sm font-medium text-primary-foreground/85 hover:bg-white/5 hover:text-secondary"
                        activeProps={{ className: "text-secondary bg-white/5" }}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : item.href ? (
              <a
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-semibold tracking-wide uppercase text-primary-foreground/85 transition-colors hover:text-secondary"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.to!}
                to={item.to!}
                activeOptions={{ exact: item.to === "/" }}
                className="rounded-md px-3 py-2 text-sm font-semibold tracking-wide uppercase text-primary-foreground/85 transition-colors hover:text-secondary"
                activeProps={{ className: "text-secondary" }}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Button asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold uppercase tracking-wide">
            <a href={waLink("Hola, querría solicitar una revisión de mi equipo.")} target="_blank" rel="noopener">
              Solicitar revisión →
            </a>
          </Button>
          <LanguageSwitcher />
        </div>

        <button
          aria-label="Menu"
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-primary-foreground hover:bg-white/10"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-white/10 bg-primary-deep text-primary-foreground">
          <div className="container-fortux py-4 flex flex-col gap-1">
            {NAV.map((item) =>
              item.children && item.to ? (
                <div key={item.to} className="flex flex-col">
                  <button
                    type="button"
                    onClick={() => setMobileServicesOpen((v) => !v)}
                    className="flex items-center justify-between rounded-md px-3 py-3 text-base font-semibold uppercase text-primary-foreground/90 hover:bg-white/5"
                  >
                    {item.label}
                    <ChevronDown className={`h-4 w-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
                  </button>
                  {mobileServicesOpen && (
                    <div className="ml-3 flex flex-col border-l border-white/10 pl-3">
                      <Link
                        to={item.to}
                        onClick={() => setOpen(false)}
                        className="rounded-md px-3 py-2 text-sm font-medium text-primary-foreground/80 hover:text-secondary"
                        activeProps={{ className: "text-secondary" }}
                      >
                        Todos los servicios
                      </Link>
                      {item.children.map((c) => (
                        <Link
                          key={c.to}
                          to={c.to}
                          onClick={() => setOpen(false)}
                          className="rounded-md px-3 py-2 text-sm font-medium text-primary-foreground/80 hover:text-secondary"
                          activeProps={{ className: "text-secondary" }}
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : item.href ? (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-base font-semibold uppercase text-primary-foreground/90 hover:bg-white/5"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.to!}
                  to={item.to!}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-base font-semibold uppercase text-primary-foreground/90 hover:bg-white/5"
                  activeProps={{ className: "text-secondary" }}
                >
                  {item.label}
                </Link>
              ),
            )}
            <div className="mt-3 flex items-center justify-between gap-2">
              <Button asChild className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold uppercase">
                <a href={waLink("Hola, querría solicitar una revisión de mi equipo.")} target="_blank" rel="noopener">
                  Solicitar revisión
                </a>
              </Button>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
