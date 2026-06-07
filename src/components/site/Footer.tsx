import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube, Mail, Phone } from "lucide-react";
import { SITE } from "@/lib/site";
import { BRAND } from "@/assets/brand";

export function Footer() {
  return (
    <footer className="mt-20 bg-primary text-primary-foreground">
      <div className="container-fortux py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/" className="inline-flex mb-5" aria-label="Fortux — Inicio">
            <img src={BRAND.horizontalWhite} alt="Fortux" className="h-12 w-auto" />
          </Link>
          <p className="max-w-md text-sm text-primary-foreground/80 leading-relaxed">
            Reparación, mantenimiento, personalización, venta de material y formación. La referencia integral para todo lo que rodea al golf.
          </p>
          <div className="mt-5 flex gap-3">
            <a href={SITE.social.instagram} aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-full border border-primary-foreground/20 hover:bg-primary-foreground/10 transition-colors">
              <Instagram className="h-4 w-4" />
            </a>
            <a href={SITE.social.facebook} aria-label="Facebook" className="grid h-9 w-9 place-items-center rounded-full border border-primary-foreground/20 hover:bg-primary-foreground/10 transition-colors">
              <Facebook className="h-4 w-4" />
            </a>
            <a href={SITE.social.youtube} aria-label="YouTube" className="grid h-9 w-9 place-items-center rounded-full border border-primary-foreground/20 hover:bg-primary-foreground/10 transition-colors">
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-3 text-secondary">Navegación</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/servicios" className="hover:text-secondary">Servicios</Link></li>
            <li><Link to="/tienda" className="hover:text-secondary">Tienda</Link></li>
            <li><Link to="/academia" className="hover:text-secondary">Academia</Link></li>
            <li><Link to="/circuito" className="hover:text-secondary">Circuito P&amp;P</Link></li>
            <li><Link to="/noticias" className="hover:text-secondary">Noticias</Link></li>
            <li><Link to="/galeria" className="hover:text-secondary">Galería</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-3 text-secondary">Contacto</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" />{SITE.phone}</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" />{SITE.email}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="container-fortux py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/70">
          <p>© {new Date().getFullYear()} Fortux. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-secondary">Aviso legal</a>
            <a href="#" className="hover:text-secondary">Privacidad</a>
            <a href="#" className="hover:text-secondary">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
