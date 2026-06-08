import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { waLink } from "@/lib/site";
import { BRAND } from "@/assets/brand";
import { useI18n } from "@/lib/i18n";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { t } = useI18n();
  const NAV = [
    { to: "/", label: t("nav.home") },
    { to: "/servicios", label: t("nav.services") },
    { to: "/tienda", label: t("nav.shop") },
    { to: "/academia", label: t("nav.academy") },
    { to: "/circuito", label: t("nav.circuit") },
    { to: "/noticias", label: t("nav.news") },
    { to: "/contacto", label: t("nav.contact") },
  ] as const;
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
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground whitespace-pre-line text-center"
              activeProps={{ className: "text-primary bg-muted" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <LanguageSwitcher />
          <Button asChild variant="default" className="bg-primary hover:bg-primary-glow">
            <a href={waLink("Hola, querría solicitar un presupuesto.")} target="_blank" rel="noopener">
              {t("cta.quote")}
            </a>
          </Button>
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
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base font-medium text-foreground/90 hover:bg-muted whitespace-pre-line"
                activeProps={{ className: "text-primary bg-muted" }}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex items-center justify-between gap-2">
              <LanguageSwitcher />
              <Button asChild className="flex-1 bg-primary hover:bg-primary-glow">
                <a href={waLink("Hola, querría solicitar un presupuesto.")} target="_blank" rel="noopener">
                  {t("cta.quote")}
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
