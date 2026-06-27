import { Link } from "@tanstack/react-router";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
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
  const [scrolled, setScrolled] = useState(false);
  const { t } = useI18n();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
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
    <header
      className={
        "sticky top-0 z-50 w-full text-white/85 transition-all duration-500 " +
        (scrolled
          ? "bg-[#050606]/95 backdrop-blur-xl border-b border-white/[0.07]"
          : "bg-[#0B0C0E] border-b border-white/[0.05]")
      }
    >
      <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between gap-10 px-6 md:px-10 lg:px-14">
        <Link
          to="/"
          className="flex items-center shrink-0 py-3"
          onClick={() => setOpen(false)}
          aria-label="Fortux — Inicio"
        >
          <img src={BRAND.horizontalWhite} alt="Fortux" className="h-7 md:h-[30px] w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
          {NAV.map((item) =>
            item.children && item.to ? (
              <div key={item.to} className="relative group">
                <Link
                  to={item.to}
                  className="relative inline-flex items-center gap-1 py-2 text-[11.5px] font-medium uppercase tracking-[0.12em] text-white/[0.70] transition-colors hover:text-white [&.active]:text-white [&.active]:after:scale-x-100 after:absolute after:left-0 after:right-0 after:-bottom-1 after:mx-auto after:h-px after:w-5 after:scale-x-0 after:bg-[#B9D986] after:transition-transform after:duration-300"
                  activeProps={{ className: "active" }}
                >
                  {item.label}
                  <ChevronDown className="h-3 w-3 opacity-50 transition-transform group-hover:rotate-180" />
                </Link>
                <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <div className="min-w-[240px] rounded-[4px] border border-white/[0.07] bg-[#050606]/95 backdrop-blur-xl p-2">
                    {item.children.map((c) => (
                      <Link
                        key={c.to}
                        to={c.to}
                        className="block rounded-[3px] px-3 py-2 text-[11.5px] font-medium uppercase tracking-[0.11em] text-white/[0.68] transition-colors hover:text-white hover:bg-white/[0.03]"
                        activeProps={{ className: "text-white" }}
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
                className="relative py-2 text-[11.5px] font-medium uppercase tracking-[0.12em] text-white/[0.70] transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.to!}
                to={item.to!}
                activeOptions={{ exact: item.to === "/" }}
                className="relative py-2 text-[11.5px] font-medium uppercase tracking-[0.12em] text-white/[0.70] transition-colors hover:text-white [&.active]:text-white [&.active]:after:scale-x-100 after:absolute after:left-0 after:right-0 after:-bottom-1 after:mx-auto after:h-px after:w-5 after:scale-x-0 after:bg-[#B9D986] after:transition-transform after:duration-300"
                activeProps={{ className: "active" }}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden lg:flex items-center gap-6 shrink-0">
          <LanguageSwitcher />
          <a
            href={waLink("Hola, querría solicitar una revisión de mi equipo.")}
            target="_blank"
            rel="noopener"
            className="group inline-flex h-[38px] items-center gap-2 rounded-[4px] border border-[#B9D986] bg-transparent px-[22px] text-[11px] font-medium uppercase tracking-[0.12em] text-[#B9D986] transition-colors duration-300 hover:bg-[#B9D986] hover:text-[#050606]"
          >
            Solicitar revisión
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
          </a>
        </div>

        <button
          aria-label="Menu"
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-white/80 hover:bg-white/[0.06]"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-white/[0.07] bg-[#050606] text-white/85">
          <div className="mx-auto max-w-[1440px] px-6 py-5 flex flex-col gap-1">
            {NAV.map((item) =>
              item.children && item.to ? (
                <div key={item.to} className="flex flex-col">
                  <button
                    type="button"
                    onClick={() => setMobileServicesOpen((v) => !v)}
                    className="flex items-center justify-between rounded-[3px] px-3 py-3 text-[12px] font-medium uppercase tracking-[0.11em] text-white/[0.78] hover:bg-white/[0.03]"
                  >
                    {item.label}
                    <ChevronDown className={`h-4 w-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
                  </button>
                  {mobileServicesOpen && (
                    <div className="ml-3 flex flex-col border-l border-white/[0.08] pl-3">
                      <Link
                        to={item.to}
                        onClick={() => setOpen(false)}
                        className="rounded-[3px] px-3 py-2 text-[12px] font-medium uppercase tracking-[0.11em] text-white/[0.68] hover:text-white"
                        activeProps={{ className: "text-white" }}
                      >
                        Todos los servicios
                      </Link>
                      {item.children.map((c) => (
                        <Link
                          key={c.to}
                          to={c.to}
                          onClick={() => setOpen(false)}
                          className="rounded-[3px] px-3 py-2 text-[12px] font-medium uppercase tracking-[0.11em] text-white/[0.68] hover:text-white"
                          activeProps={{ className: "text-white" }}
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
                  className="rounded-[3px] px-3 py-3 text-[12px] font-medium uppercase tracking-[0.11em] text-white/[0.78] hover:bg-white/[0.03]"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.to!}
                  to={item.to!}
                  onClick={() => setOpen(false)}
                  className="rounded-[3px] px-3 py-3 text-[12px] font-medium uppercase tracking-[0.11em] text-white/[0.78] hover:bg-white/[0.03]"
                  activeProps={{ className: "text-white" }}
                >
                  {item.label}
                </Link>
              ),
            )}
            <div className="mt-4 flex items-center justify-between gap-4 border-t border-white/[0.06] pt-4">
              <LanguageSwitcher />
              <a
                href={waLink("Hola, querría solicitar una revisión de mi equipo.")}
                target="_blank"
                rel="noopener"
                className="inline-flex h-[38px] items-center gap-2 rounded-[4px] border border-[#B9D986] bg-transparent px-6 text-[11px] font-medium uppercase tracking-[0.12em] text-[#B9D986]"
              >
                Solicitar revisión
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.25} />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
