import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "es" | "ca";

export const LANGS: { code: Lang; label: string }[] = [
  { code: "es", label: "Español" },
  { code: "ca", label: "Català" },
];

type Dict = Record<string, string>;

const es: Dict = {
  // Nav
  "nav.home": "Inicio",
  "nav.services": "Servicios",
  "nav.shop": "Tienda",
  "nav.academy": "Academia",
  "nav.circuit": "CIRCUIT FORTUX\nX MULLIGAN 2026",
  "nav.news": "Noticias",
  "nav.gallery": "Galería",
  "nav.contact": "Contacto",
  "cta.quote": "Solicitar Presupuesto",
  "cta.repair": "Reparar Equipo",
  "cta.whatsapp": "WhatsApp",
  "cta.contact": "Contactar",
  "cta.viewAll": "Ver todos los servicios",
  "cta.bookClass": "Reservar Clase",
  "cta.moreInfo": "Solicitar Información",
  "cta.accessCircuit": "Acceder al Circuito",
  "cta.viewRankings": "Ver Clasificaciones",
  "cta.viewFullRanking": "Ver ranking completo",
  "cta.consult": "Consultar",
  "cta.requestWa": "Solicitar por WhatsApp",
  // Footer
  "footer.tagline": "Reparación, mantenimiento, personalización, venta de material y formación. La referencia integral para todo lo que rodea al golf.",
  "footer.nav": "Navegación",
  "footer.contact": "Contacto",
  "footer.rights": "Todos los derechos reservados.",
  "footer.legal": "Aviso legal",
  "footer.privacy": "Privacidad",
  "footer.cookies": "Cookies",
  "footer.admin": "Admin",
  // 404
  "404.title": "Página no encontrada",
  "404.desc": "La página que buscas no existe o ha sido movida.",
  "404.back": "Volver al inicio",
  // Home
  "home.hero.eyebrow": "Servicios integrales de golf",
  "home.hero.title": "Expertos en reparación, mantenimiento y soluciones para golfistas",
  "home.hero.subtitle": "Reparación, fitting, personalización, clases y venta de material. Todo lo que necesitas en un único lugar.",
  "home.services.eyebrow": "Servicios destacados",
  "home.services.title": "Todo el cuidado que tu equipo merece",
  "home.services.subtitle": "Trabajamos cada palo como si fuese nuestro. Materiales premium, técnicas profesionales y resultados garantizados.",
  "home.circuit.eyebrow": "Circuito Pitch & Putt",
  "home.circuit.title": "El circuito de referencia para amateurs y federados",
  "home.circuit.subtitle": "Pruebas en los mejores campos, ranking actualizado, clasificaciones y la mejor experiencia competitiva.",
  "home.upcoming.eyebrow": "Próximas competiciones",
  "home.upcoming.title": "Calendario del circuito",
  "home.upcoming.subtitle": "Información en directo desde la plataforma del circuito.",
  "home.reviews.eyebrow": "Opiniones",
  "home.reviews.title": "Lo que dicen nuestros clientes",
  "home.cta.title": "¿Listo para devolverle vida a tu equipo?",
  "home.cta.subtitle": "Pide tu presupuesto sin compromiso. Te respondemos en menos de 24 h.",
  "home.stat.tests": "Pruebas",
  "home.stat.players": "Jugadores",
  "home.stat.courses": "Campos",
  // Services
  "svc.eyebrow": "Servicios",
  "svc.title": "Todo el cuidado que tu equipo necesita",
  "svc.subtitle": "Desde una reparación puntual hasta un mantenimiento integral anual.",
  // Academy
  "aca.badge": "Academia",
  "aca.hero": "Mejora tu juego con los mejores profesionales",
  "aca.eyebrow": "Formación",
  "aca.title": "Programas para todos los niveles",
  // Circuit
  "cir.hero.title": "El circuito Pitch & Putt de referencia",
  "cir.hero.subtitle": "Pruebas en los mejores campos, ranking actualizado y experiencia competitiva premium.",
  "cir.ranking.eyebrow": "Ranking",
  "cir.ranking.title": "Top 5 actual",
  "cir.ranking.subtitle": "Clasificación actualizada desde la plataforma del circuito.",
  "cir.cal.eyebrow": "Calendario",
  "cir.cal.title": "Próximos torneos",
  // Shop
  "shop.title": "Tienda Fortux Golf",
  "shop.subtitle": "Material seleccionado por golfistas, para golfistas. Consulta cualquier producto por WhatsApp.",
  "shop.all": "Todos",
  "shop.loading": "Cargando productos…",
  // News
  "news.eyebrow": "Noticias",
  "news.title": "Actualidad de Fortux",
  "news.subtitle": "Lo último del taller, la academia, los productos y el circuito.",
  "news.loading": "Cargando noticias…",
  // Gallery
  "gal.eyebrow": "Galería",
  "gal.title": "Momentos Fortux",
  "gal.loading": "Cargando galería…",
  // Contact
  "con.eyebrow": "Contacto",
  "con.title": "Hablemos",
  "con.subtitle": "Cuéntanos tu consulta y te responderemos en menos de 24 h.",
  "con.wa": "WhatsApp",
  "con.wa.desc": "Respuesta inmediata",
  "con.phone.desc": "L–V de 9:00 a 19:00",
  "con.email.desc": "Para consultas detalladas",
  "con.form.name": "Nombre",
  "con.form.email": "Email",
  "con.form.phone": "Teléfono",
  "con.form.subject": "Asunto",
  "con.form.message": "Mensaje",
  "con.form.sending": "Enviando…",
  "con.form.send": "Enviar mensaje",
  "con.form.ok": "Mensaje enviado",
  "con.form.okDesc": "Te responderemos en menos de 24 h.",
  // Hero pills
  "pill.repair": "Reparación",
  "pill.maintenance": "Mantenimiento",
  "pill.custom": "Personalización",
  "pill.classes": "Clases",
  "pill.sale": "Venta",
  // Home services cards
  "home.svc.1.t": "Reparación de palos",
  "home.svc.1.d": "Reparaciones expertas que devuelven el rendimiento a tu equipo.",
  "home.svc.2.t": "Cambio de grips",
  "home.svc.2.d": "Grips nuevos en minutos con materiales premium.",
  "home.svc.3.t": "Fitting y ajustes",
  "home.svc.3.d": "Lie, loft, longitud y swingweight ajustados a tu juego.",
  "home.svc.4.t": "Personalización",
  "home.svc.4.d": "Stamping, pintura y acabados únicos.",
  "home.svc.5.t": "Clases de golf",
  "home.svc.5.d": "Formación individual y grupal en nuestra academia.",
  "home.svc.6.t": "CIRCUIT FORTUX\nX MULLIGAN 2026",
  "home.svc.6.d": "Compite en el circuito Pitch & Putt de referencia.",
  // Upcoming competitions (home + circuito)
  "comp.1.name": "Open de Otoño",
  "comp.1.place": "P&P Vall d'Or",
  "comp.1.status": "Inscripciones abiertas",
  "comp.2.name": "Trofeo Fortux",
  "comp.2.place": "P&P Llavaneres",
  "comp.2.status": "Próximamente",
  "comp.3.name": "Final de Circuito",
  "comp.3.place": "P&P Papalús",
  "comp.3.status": "Final",
  "comp.1.date": "12 OCT",
  "comp.2.date": "02 NOV",
  "comp.3.date": "23 NOV",
  // Servicios page
  "svc.1.t": "Reparación de palos",
  "svc.1.d": "Pegado de cabezas, reparación de shafts, soldaduras y restauraciones.",
  "svc.2.t": "Cambio de grips",
  "svc.2.d": "Amplio catálogo de grips premium. Cambio mientras esperas.",
  "svc.3.t": "Ajustes y fitting",
  "svc.3.d": "Lie, loft, longitud, swingweight y análisis de bola.",
  "svc.4.t": "Personalización",
  "svc.4.d": "Stamping, pintura, customización completa de wedges y putters.",
  "svc.5.t": "Mantenimiento integral",
  "svc.5.d": "Limpieza profunda, regrooving y puesta a punto estacional.",
  "svc.6.t": "Clases de golf",
  "svc.6.d": "Formación individual, grupal y de iniciación.",
  "svc.7.t": "Venta de material",
  "svc.7.d": "Palos, grips, bolas, accesorios y material técnico.",
  // Academia plans
  "aca.1.t": "Clase individual",
  "aca.1.d": "Sesión 1 a 1 con plan de mejora personalizado.",
  "aca.2.t": "Clase grupal",
  "aca.2.d": "Aprende en grupo, entrenamiento dinámico y económico.",
  "aca.3.t": "Formación técnica",
  "aca.3.d": "Análisis de swing, control de bola y juego corto.",
  "aca.4.t": "Entrenamiento competitivo",
  "aca.4.d": "Plan personalizado para jugadores federados.",
  "unit.pts": "pts",
};

const ca: Dict = {
  "nav.home": "Inici",
  "nav.services": "Serveis",
  "nav.shop": "Botiga",
  "nav.academy": "Acadèmia",
  "nav.circuit": "CIRCUIT FORTUX\nX MULLIGAN 2026",
  "nav.news": "Notícies",
  "nav.gallery": "Galeria",
  "nav.contact": "Contacte",
  "cta.quote": "Demanar Pressupost",
  "cta.repair": "Reparar Equip",
  "cta.whatsapp": "WhatsApp",
  "cta.contact": "Contactar",
  "cta.viewAll": "Veure tots els serveis",
  "cta.bookClass": "Reservar Classe",
  "cta.moreInfo": "Demanar Informació",
  "cta.accessCircuit": "Accedir al Circuit",
  "cta.viewRankings": "Veure Classificacions",
  "cta.viewFullRanking": "Veure rànquing complet",
  "cta.consult": "Consultar",
  "cta.requestWa": "Demanar per WhatsApp",
  "footer.tagline": "Reparació, manteniment, personalització, venda de material i formació. La referència integral per a tot el que envolta el golf.",
  "footer.nav": "Navegació",
  "footer.contact": "Contacte",
  "footer.rights": "Tots els drets reservats.",
  "footer.legal": "Avís legal",
  "footer.privacy": "Privacitat",
  "footer.cookies": "Galetes",
  "footer.admin": "Admin",
  "404.title": "Pàgina no trobada",
  "404.desc": "La pàgina que cerques no existeix o ha estat moguda.",
  "404.back": "Tornar a l'inici",
  "home.hero.eyebrow": "Serveis integrals de golf",
  "home.hero.title": "Experts en reparació, manteniment i solucions per a golfistes",
  "home.hero.subtitle": "Reparació, fitting, personalització, classes i venda de material. Tot el que necessites en un únic lloc.",
  "home.services.eyebrow": "Serveis destacats",
  "home.services.title": "Tota la cura que el teu equip mereix",
  "home.services.subtitle": "Treballem cada pal com si fos nostre. Materials premium, tècniques professionals i resultats garantits.",
  "home.circuit.eyebrow": "Circuit Pitch & Putt",
  "home.circuit.title": "El circuit de referència per a amateurs i federats",
  "home.circuit.subtitle": "Proves als millors camps, rànquing actualitzat, classificacions i la millor experiència competitiva.",
  "home.upcoming.eyebrow": "Pròximes competicions",
  "home.upcoming.title": "Calendari del circuit",
  "home.upcoming.subtitle": "Informació en directe des de la plataforma del circuit.",
  "home.reviews.eyebrow": "Opinions",
  "home.reviews.title": "El que diuen els nostres clients",
  "home.cta.title": "Preparat per tornar a donar vida al teu equip?",
  "home.cta.subtitle": "Demana el teu pressupost sense compromís. Et responem en menys de 24 h.",
  "home.stat.tests": "Proves",
  "home.stat.players": "Jugadors",
  "home.stat.courses": "Camps",
  "svc.eyebrow": "Serveis",
  "svc.title": "Tota la cura que el teu equip necessita",
  "svc.subtitle": "Des d'una reparació puntual fins a un manteniment integral anual.",
  "aca.badge": "Acadèmia",
  "aca.hero": "Millora el teu joc amb els millors professionals",
  "aca.eyebrow": "Formació",
  "aca.title": "Programes per a tots els nivells",
  "cir.hero.title": "El circuit Pitch & Putt de referència",
  "cir.hero.subtitle": "Proves als millors camps, rànquing actualitzat i experiència competitiva premium.",
  "cir.ranking.eyebrow": "Rànquing",
  "cir.ranking.title": "Top 5 actual",
  "cir.ranking.subtitle": "Classificació actualitzada des de la plataforma del circuit.",
  "cir.cal.eyebrow": "Calendari",
  "cir.cal.title": "Pròxims tornejos",
  "shop.title": "Botiga Fortux Golf",
  "shop.subtitle": "Material seleccionat per golfistes, per a golfistes. Consulta qualsevol producte per WhatsApp.",
  "shop.all": "Tots",
  "shop.loading": "Carregant productes…",
  "news.eyebrow": "Notícies",
  "news.title": "Actualitat de Fortux",
  "news.subtitle": "L'últim del taller, l'acadèmia, els productes i el circuit.",
  "news.loading": "Carregant notícies…",
  "gal.eyebrow": "Galeria",
  "gal.title": "Moments Fortux",
  "gal.loading": "Carregant galeria…",
  "con.eyebrow": "Contacte",
  "con.title": "Parlem",
  "con.subtitle": "Explica'ns la teva consulta i et respondrem en menys de 24 h.",
  "con.wa": "WhatsApp",
  "con.wa.desc": "Resposta immediata",
  "con.phone.desc": "Dl–Dv de 9:00 a 19:00",
  "con.email.desc": "Per a consultes detallades",
  "con.form.name": "Nom",
  "con.form.email": "Correu",
  "con.form.phone": "Telèfon",
  "con.form.subject": "Assumpte",
  "con.form.message": "Missatge",
  "con.form.sending": "Enviant…",
  "con.form.send": "Enviar missatge",
  "con.form.ok": "Missatge enviat",
  "con.form.okDesc": "Et respondrem en menys de 24 h.",
};

const DICTS: Record<Lang, Dict> = { es, ca };

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (key: string) => string };
const I18nCtx = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("fortux:lang") as Lang | null;
      if (stored === "es" || stored === "ca") setLangState(stored);
    } catch {}
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("fortux:lang", l);
      document.documentElement.lang = l;
    } catch {}
  };

  const t = (key: string) => DICTS[lang][key] ?? DICTS.es[key] ?? key;

  return <I18nCtx.Provider value={{ lang, setLang, t }}>{children}</I18nCtx.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nCtx);
  if (!ctx) return { lang: "es" as Lang, setLang: () => {}, t: (k: string) => DICTS.es[k] ?? k };
  return ctx;
}
