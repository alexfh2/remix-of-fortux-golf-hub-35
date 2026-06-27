import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowRight, Star, ChevronDown, ExternalLink, BarChart3, ListChecks, Users, Cpu, MessageSquare, Award, ShieldCheck } from "lucide-react";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { SITE, waLink } from "@/lib/site";
import { supabase } from "@/integrations/supabase/client";
import teamPhoto from "@/assets/gerard-marc-cutout.png";
import heroImg from "@/assets/hero-fitting-lab.jpg";
import repairImg from "@/assets/servicios-v2/01-reparacion.jpg.asset.json";
import varillasImg from "@/assets/servicios-v2/02-mantenimiento.jpg.asset.json";
import gripsImg from "@/assets/servicios-v2/03-grips.jpg.asset.json";
import swingWeightImg from "@/assets/servicios-v2/04-fitting.jpg.asset.json";
import lieLoftImg from "@/assets/servicios-v2/05-personalizacion.jpg.asset.json";
import academyImg from "@/assets/servicios-v2/06-academy.jpg.asset.json";
import cBdalona from "@/assets/campos/bdalona.png.asset.json";
import cCanCuyas from "@/assets/campos/can-cuyas.png.asset.json";
import cCanRafel from "@/assets/campos/can-rafel.png.asset.json";
import cStCebria from "@/assets/campos/st-cebria.png.asset.json";
import cDaro from "@/assets/campos/daro.png.asset.json";
import cFranciac from "@/assets/campos/franciac.png.asset.json";
import cLaRoca from "@/assets/campos/la-roca.png.asset.json";
import cPar3 from "@/assets/campos/par-3.png.asset.json";
import cLaGarriga from "@/assets/campos/la-garriga.png.asset.json";
import cLloret from "@/assets/campos/lloret.png.asset.json";
import cCanMascaro from "@/assets/campos/can-mascaro.png.asset.json";
import cMora from "@/assets/campos/mora.png.asset.json";
import cPals from "@/assets/campos/pals.png.asset.json";
import cRoc3 from "@/assets/campos/roc-3.png.asset.json";
import cTeia from "@/assets/campos/teia.png.asset.json";
import cGolfSquare from "@/assets/campos/golfsquare.png.asset.json";
import cUrgell from "@/assets/campos/urgell.png.asset.json";
import cBonarea from "@/assets/campos/bonarea.png.asset.json";
import cSantCugat from "@/assets/campos/sant-cugat.png.asset.json";
import cMontseny from "@/assets/campos/montseny.png.asset.json";
import cElVendrell from "@/assets/campos/el-vendrell.png.asset.json";

const PARTNER_COURSES = [
  { name: "Badalona", url: cBdalona.url },
  { name: "Can Cuyàs", url: cCanCuyas.url },
  { name: "Can Rafel", url: cCanRafel.url },
  { name: "Sant Cebrià", url: cStCebria.url },
  { name: "Daró", url: cDaro.url },
  { name: "Franciac", url: cFranciac.url },
  { name: "La Roca", url: cLaRoca.url },
  { name: "Par 3", url: cPar3.url },
  { name: "La Garriga", url: cLaGarriga.url },
  { name: "Lloret", url: cLloret.url },
  { name: "Can Mascaró", url: cCanMascaro.url },
  { name: "Mora", url: cMora.url },
  { name: "Pals", url: cPals.url },
  { name: "Roc 3", url: cRoc3.url },
  { name: "Teià", url: cTeia.url },
  { name: "El Vendrell", url: cElVendrell.url },

  { name: "Golf Square", url: cGolfSquare.url },
  { name: "Urgell", url: cUrgell.url },
  { name: "BonÀrea", url: cBonarea.url },
  { name: "Sant Cugat", url: cSantCugat.url },
  { name: "Montseny", url: cMontseny.url },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fortux — Precisión técnica para cuidar tu equipo" },
      { name: "description", content: "Reparamos, ajustamos y optimizamos tu material de golf con experiencia, asesoramiento y atención personalizada." },
      { property: "og:title", content: "Fortux — Precisión técnica para cuidar tu equipo" },
      { property: "og:description", content: "Reparación, mantenimiento, grips, fitting, personalización y academy. Servicios integrales de golf." },
      { property: "og:url", content: "/" },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const SERVICE_INDEX = [
  { n: "01", label: "Reparación" },
  { n: "02", label: "Mantenimiento" },
  { n: "03", label: "Grips" },
  { n: "04", label: "Fitting" },
  { n: "05", label: "Personalización" },
  { n: "06", label: "Academy" },
];

const SERVICES = [
  { title: "Reparación de palos", desc: "Devolvemos rendimiento y fiabilidad a tu material.", img: repairImg.url, to: "/servicios/reemplazo-del-grip" as const },
  { title: "Mantenimiento completo", desc: "Revisión, ajuste y puesta a punto profesional.", img: varillasImg.url, to: "/servicios/ajustes-de-varillas" as const },
  { title: "Grips premium", desc: "Mejora el agarre, el control y la confianza en cada golpe.", img: gripsImg.url, to: "/tienda" as const },
  { title: "Fitting personalizado", desc: "Ajustes técnicos según tu juego y tus necesidades.", img: swingWeightImg.url, to: "/servicios/swing-weight" as const },
  { title: "Personalización de palos", desc: "Adaptamos tu material a tu estilo de juego.", img: lieLoftImg.url, to: "/servicios/lie-loft" as const },
  { title: "Academy y clases", desc: "Mejora tu técnica con nuestros profesionales.", img: academyImg.url, to: "/academia" as const },
];

const PROCESS = [
  { n: "1", title: "Revisamos", desc: "Analizamos tu equipo y entendemos tus necesidades." },
  { n: "2", title: "Asesoramos", desc: "Te recomendamos las mejores soluciones para tu juego." },
  { n: "3", title: "Ajustamos", desc: "Realizamos los ajustes y reparaciones con precisión y materiales premium." },
  { n: "4", title: "Entregamos listo para jugar", desc: "Probamos y validamos para que juegues con total confianza." },
];

const VALUES = [
  { icon: Cpu, title: "Tecnología", desc: "Equipamiento avanzado para resultados precisos." },
  { icon: MessageSquare, title: "Asesoramiento", desc: "Te guiamos para que tomes las mejores decisiones." },
  { icon: Award, title: "Experiencia", desc: "Más de 20 años trabajando con golfistas exigentes." },
  { icon: ShieldCheck, title: "Confianza", desc: "Transparencia, honestidad y resultados comprobados." },
];

function Home() {
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews-home"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("id,author_name,author_location,rating,content,avatar_url,review_date,created_at")
        .eq("is_published", true)
        .eq("rating", 5)
        .order("created_at", { ascending: false })
        .limit(5);
      if (error) throw error;
      return data;
    },
  });
  return (
    <div className="bg-primary-deep text-primary-foreground">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#050606]">
        {/* Image as absolute background layer — outside the content grid */}
        <img
          src={heroImg}
          alt="Ajuste técnico de un hierro de golf en máquina de fitting Fortux"
          width={1536}
          height={1280}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            width: "58vw",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center right",
            zIndex: 0,
          }}
        />

        {/* Gradient overlays above the image and background */}
        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-[#141619] via-[#0A0B0D] via-[#050607] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-[55%] bg-gradient-to-r from-[#0A0B0D] via-[#0A0B0D]/80 to-transparent" />
        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#050606]/45 via-transparent to-[#050606]/35" />
        <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_55%_75%_at_100%_50%,rgba(185,217,134,0.02),transparent_60%)]" />

        {/* Text content inside the max-width container */}
        <div className="container-fortux relative z-[2] py-20 md:py-28 lg:py-32 animate-fade-up">
          <div className="relative max-w-xl">
            <span className="inline-block text-[12px] font-medium uppercase tracking-[0.22em] text-secondary">
              Servicios integrales de golf
            </span>
            <h1 className="mt-5 font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] text-balance">
              Precisión técnica para cuidar tu{" "}
              <span className="text-secondary">equipo.</span>
            </h1>
            <p className="mt-6 max-w-xl text-[15px] md:text-[16px] text-primary-foreground/70 leading-[1.6]">
              Reparamos, ajustamos y optimizamos tu material con experiencia,
              asesoramiento y atención personalizada.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={waLink("Hola, querría solicitar una revisión de mi equipo.")}
                target="_blank"
                rel="noopener"
                className="inline-flex h-11 items-center gap-2 rounded-[6px] bg-[#B9D986] px-6 text-[12px] font-medium uppercase tracking-[0.12em] text-[#050606] transition-colors hover:bg-[#c5e294]"
              >
                Solicitar revisión <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              </a>
              <Link
                to="/servicios"
                className="inline-flex h-11 items-center rounded-[6px] border border-white/[0.22] bg-transparent px-6 text-[12px] font-medium uppercase tracking-[0.12em] text-white/85 transition-colors hover:bg-white/[0.04] hover:text-white"
              >
                Ver servicios
              </Link>
            </div>
          </div>
        </div>

        {/* SERVICE INDEX STRIP */}
        <div className="relative z-[2] border-t border-white/[0.06] bg-gradient-to-r from-[#0A0B0D]/95 via-[#050607]/70 to-transparent">
          <div className="container-fortux grid grid-cols-3 gap-y-6 py-8 md:grid-cols-6">
            {SERVICE_INDEX.map((s) => (
              <div key={s.n} className="flex flex-col items-start">
                <span className="font-display text-2xl font-bold text-secondary">{s.n}</span>
                <span className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/80">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 md:py-28">
        <div className="container-fortux">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-balance">
              Nuestros servicios
            </h2>
            <Link to="/servicios" className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-secondary hover:text-secondary/80">
              Ver todos los servicios <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <Link
                key={s.title}
                to={s.to}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all hover:-translate-y-1 hover:border-secondary/40 hover:bg-white/[0.06]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary-deep via-primary-deep/40 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold leading-snug">{s.title}</h3>
                  <p className="mt-2 text-sm text-primary-foreground/70 leading-relaxed">{s.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="border-y border-white/10 bg-primary/40 py-20 md:py-28">
        <div className="container-fortux">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold">Así trabajamos</h2>
          <div className="relative mt-14 grid gap-10 md:grid-cols-4">
            <div className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent md:block" />
            {PROCESS.map((p) => (
              <div key={p.n} className="relative">
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-secondary/60 bg-primary-deep font-display text-lg font-bold text-secondary">
                  {p.n}
                </div>
                <h3 className="mt-5 font-display text-lg font-bold">{p.title}</h3>
                <p className="mt-2 text-sm text-primary-foreground/70 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERTS — Gerard y Marc */}
      <section id="nosotros" className="py-20 md:py-28">
        <div className="container-fortux grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary">
              Expertos en los que puedes confiar
            </span>
            <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-balance">
              Gerard y Marc, experiencia y pasión por el golf
            </h2>
            <p className="mt-5 max-w-xl text-primary-foreground/75 leading-relaxed">
              Más de 20 años de experiencia combinando conocimiento técnico,
              asesoramiento y atención personalizada para cuidar cada detalle
              de tu equipo.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" variant="outline" className="border-white/20 bg-white/5 text-primary-foreground hover:bg-white/10 font-semibold uppercase tracking-wide">
                <Link to="/contacto">Conócenos</Link>
              </Button>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-primary to-primary-deep">
            <img
              src={teamPhoto}
              alt="Gerard Rubio y Marc Fortuny — equipo Fortux"
              loading="lazy"
              className="relative mx-auto h-auto w-full max-w-xl object-contain"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-around px-[10%] pb-3 text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/80">
              <span>Gerard Rubio</span>
              <span>Marc Fortuny</span>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES ROW */}
      <section className="border-y border-white/10 bg-primary-deep/80 py-14">
        <div className="container-fortux grid gap-8 md:grid-cols-4">
          {VALUES.map((v) => (
            <div key={v.title} className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-secondary/40 text-secondary">
                <v.icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-sm font-bold uppercase tracking-wide text-secondary">{v.title}</h3>
                <p className="mt-1 text-sm text-primary-foreground/70 leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CIRCUIT */}
      <section className="py-20 md:py-24">
        <div className="container-fortux">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary">Torneos</span>
              <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold">Circuit Fortux × Mulligan 2026</h2>
            </div>
            <a href={SITE.circuitUrl} target="_blank" rel="noopener" className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-secondary hover:text-secondary/80">
              Ver web del circuito <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          <div className="relative mt-8 w-full overflow-hidden rounded-2xl border border-white/10" style={{ height: "1380px" }}>
            <iframe
              src="https://fortux.fairwaystudio.ai/"
              title="Circuit Fortux x Mulligan 2026"
              loading="lazy"
              scrolling="no"
              className="absolute left-0 w-full border-0"
              style={{ top: "-90px", height: "calc(100% + 90px)" }}
            />
          </div>
          <CircuitTabs />
        </div>
      </section>

      {/* PARTNER COURSES */}
      <section className="border-t border-white/10 py-20 md:py-24">
        <div className="container-fortux">
          <h2 className="text-center font-display text-3xl md:text-4xl font-bold">Camps Col·laboradors</h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm text-primary-foreground/65">
            Treballem amb una àmplia xarxa de camps de golf arreu de Catalunya.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {PARTNER_COURSES.map((c) => (
              <div
                key={c.name}
                className="group relative flex aspect-square w-[calc(50%-0.5rem)] items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-all hover:border-secondary/40 hover:bg-white/[0.06] sm:w-[calc(33.333%-0.75rem)] md:w-[calc(20%-0.75rem)] lg:w-[calc(14.2857%-0.75rem)]"
              >
                <img
                  src={c.url}
                  alt={`Camp de golf ${c.name}`}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain brightness-0 invert opacity-70 transition-all duration-300 group-hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      {reviews.length > 0 && (
        <section className="border-t border-white/10 py-20 md:py-24">
          <div className="container-fortux">
            <h2 className="text-center font-display text-3xl md:text-4xl font-bold">Lo que dicen nuestros clientes</h2>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {reviews.slice(0, 3).map((r) => (
                <article key={r.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <div className="flex items-center gap-3">
                    {r.avatar_url ? (
                      <img src={r.avatar_url} alt={r.author_name} className="h-10 w-10 rounded-full object-cover" />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-sm font-semibold">
                        {r.author_name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold truncate">{r.author_name}</div>
                      {r.author_location && (
                        <div className="text-xs text-primary-foreground/60 truncate">{r.author_location}</div>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 flex gap-0.5">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                    ))}
                  </div>
                  <p className="mt-3 text-primary-foreground/85 leading-relaxed">"{r.content}"</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FINAL CTA */}
      <section className="py-20 md:py-24">
        <div className="container-fortux">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-primary to-primary-deep p-10 md:p-16 text-center shadow-elegant">
            <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />
            <h2 className="relative font-display text-3xl md:text-5xl font-bold text-balance">
              ¿Listo para poner tu equipo a punto?
            </h2>
            <p className="relative mt-4 mx-auto max-w-xl text-primary-foreground/75">
              Te ayudamos a revisarlo, ajustarlo y dejarlo listo para jugar con total confianza.
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold uppercase tracking-wide">
                <a href={waLink("Hola, querría solicitar una revisión de mi equipo.")} target="_blank" rel="noopener">
                  Solicitar revisión <ArrowRight className="ml-1.5 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const TABS = [
  { key: "rankings", label: "Class. acumulades", icon: BarChart3, url: "https://fortux.fairwaystudio.ai/rankings" },
  { key: "proves", label: "Prova a prova", icon: ListChecks, url: "https://fortux.fairwaystudio.ai/proves" },
  { key: "jugadors", label: "Jugadors", icon: Users, url: "https://fortux.fairwaystudio.ai/jugadors" },
] as const;

function CircuitTabs() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="mt-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {TABS.map((tab) => {
          const isOpen = open === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setOpen(isOpen ? null : tab.key)}
              className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-4 text-sm font-semibold uppercase tracking-wider transition-colors ${
                isOpen
                  ? "border-secondary bg-secondary text-secondary-foreground"
                  : "border-white/10 bg-white/[0.04] text-primary-foreground hover:bg-white/[0.08]"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>
          );
        })}
        <a
          href="https://fortux.fairwaystudio.ai/"
          target="_blank"
          rel="noopener"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-secondary bg-secondary px-4 py-4 text-sm font-semibold uppercase tracking-wider text-secondary-foreground transition-colors hover:bg-secondary/90"
        >
          <ExternalLink className="h-4 w-4" />
          <span>Veure web del circuit</span>
        </a>
      </div>

      {TABS.map((tab) => (
        <Collapsible key={tab.key} open={open === tab.key}>
          <CollapsibleContent className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
            <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 mt-4" style={{ height: "2000px" }}>
              <iframe
                src={tab.url}
                title={tab.label}
                loading="lazy"
                scrolling="no"
                className="absolute left-0 w-full border-0"
                style={{ top: "-90px", height: "calc(100% + 90px)" }}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
}
