import { Link } from "@tanstack/react-router";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { waLink } from "@/lib/site";
import { BRAND } from "@/assets/brand";
import { useI18n } from "@/lib/i18n";

type NavItem = {
  to: string;
  label: string;
  children?: { to: string; label: string }[];
};

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const { t } = useI18n();
  const NAV: NavItem[] = [
    { to: "/", label: t("nav.home") },
    {
      to: "/servicios",
      label: t("nav.services"),
      children: [{ to: "/servicios/reemplazo-del-grip", label: "Reemplazo del Grip" }],
    },
    { to: "/tienda", label: t("nav.shop") },
    { to: "/academia", label: t("nav.academy") },
    { to: "/circuito", label: t("nav.circuit") },
    { to: "/noticias", label: t("nav.news") },
    { to: "/contacto", label: t("nav.contact") },
  ];
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container-fortux flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center" onClick={() => setOpen(false)} aria-label="Fortux — Inicio">
          <img src={BRAND.horizontal} alt="Fortux" className="h-9 md:h-10 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((item) =>
            item.children ? (
              <div key={item.to} className="relative group">
                <Link
                  to={item.to}
                  className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium uppercase text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                  activeProps={{ className: "text-primary bg-muted" }}
                >
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                </Link>
                <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                  <div className="min-w-[220px] rounded-xl border border-border bg-background shadow-elegant p-2">
                    {item.children.map((c) => (
                      <Link
                        key={c.to}
                        to={c.to}
                        className="block rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-muted hover:text-foreground"
                        activeProps={{ className: "text-primary bg-muted" }}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="rounded-md px-3 py-2 text-sm font-medium uppercase text-foreground/80 transition-colors hover:bg-muted hover:text-foreground whitespace-pre-line text-center"
                activeProps={{ className: "text-primary bg-muted" }}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Button asChild variant="default" className="bg-primary hover:bg-primary-glow uppercase">
            <a href={waLink("Hola, querría solicitar un presupuesto.")} target="_blank" rel="noopener">
              {t("cta.quote")}
            </a>
          </Button>
          <LanguageSwitcher />
        </div>

        <button
          aria-label="Menu"
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground hover:bg-muted"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container-fortux py-4 flex flex-col gap-1">
            {NAV.map((item) =>
              item.children ? (
                <div key={item.to} className="flex flex-col">
                  <button
                    type="button"
                    onClick={() => setMobileServicesOpen((v) => !v)}
                    className="flex items-center justify-between rounded-md px-3 py-3 text-base font-medium uppercase text-foreground/90 hover:bg-muted"
                  >
                    {item.label}
                    <ChevronDown className={`h-4 w-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
                  </button>
                  {mobileServicesOpen && (
                    <div className="ml-3 flex flex-col border-l border-border pl-3">
                      <Link
                        to={item.to}
                        onClick={() => setOpen(false)}
                        className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-muted"
                        activeProps={{ className: "text-primary bg-muted" }}
                      >
                        Todos los servicios
                      </Link>
                      {item.children.map((c) => (
                        <Link
                          key={c.to}
                          to={c.to}
                          onClick={() => setOpen(false)}
                          className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-muted"
                          activeProps={{ className: "text-primary bg-muted" }}
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-base font-medium uppercase text-foreground/90 hover:bg-muted whitespace-pre-line"
                  activeProps={{ className: "text-primary bg-muted" }}
                >
                  {item.label}
                </Link>
              ),
            )}
            <div className="mt-3 flex items-center justify-between gap-2">
              <Button asChild className="flex-1 bg-primary hover:bg-primary-glow uppercase">
                <a href={waLink("Hola, querría solicitar un presupuesto.")} target="_blank" rel="noopener">
                  {t("cta.quote")}
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
