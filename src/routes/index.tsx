import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowRight, Wrench, Hammer, Sparkles, GraduationCap, ShoppingBag, Trophy, MessageCircle, Star, Calendar, MapPin, ChevronDown, ExternalLink, BarChart3, ListChecks, Users } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SITE, waLink } from "@/lib/site";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/lib/i18n";
import teamPhoto from "@/assets/gerard-marc.png.asset.json";
import circuitoImg from "@/assets/circuito-hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fortux — Reparación, mantenimiento y soluciones para golfistas" },
      { name: "description", content: "Reparación y mantenimiento de palos, personalización, fitting, clases y venta de material. Hogar del Circuito Pitch & Putt." },
      { property: "og:title", content: "Fortux — Expertos en golf" },
      { property: "og:description", content: "Reparación, mantenimiento, personalización, clases y Circuito Pitch & Putt." },
      { property: "og:url", content: "/" },
      { property: "og:image", content: vanImg },
      { name: "twitter:image", content: vanImg },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const SERVICES = [
  { icon: Wrench, key: "1" },
  { icon: Hammer, key: "2" },
  { icon: Sparkles, key: "3" },
  { icon: ShoppingBag, key: "4" },
  { icon: GraduationCap, key: "5" },
  { icon: Trophy, key: "6" },
];

const UPCOMING = ["1", "2", "3"];
const PILLS = ["pill.repair", "pill.maintenance", "pill.custom", "pill.classes", "pill.sale"];

function Home() {
  const { t } = useI18n();
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews-home"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("id,author_name,rating,content")
        .eq("is_published", true)
        .order("sort_order")
        .limit(3);
      if (error) throw error;
      return data;
    },
  });
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-gradient-hero text-primary-foreground">
        {/* glow accents */}
        <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-secondary/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-0 h-[28rem] w-[28rem] rounded-full bg-primary-glow/20 blur-3xl" />

        <div className="container-fortux relative py-20 md:py-28 lg:py-32 animate-fade-up">
          <div className="relative grid items-center gap-12 lg:grid-cols-12">
            <div className="relative lg:col-span-7 z-10">
              <span className="inline-block rounded-full bg-secondary/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-secondary-foreground">
                {t("home.hero.eyebrow")}
              </span>
              <h1 className="mt-5 font-display text-5xl md:text-6xl lg:text-7xl font-bold text-balance">
                {t("home.hero.title")}
              </h1>
              <p className="mt-6 max-w-xl text-lg md:text-xl text-primary-foreground/85">
                {t("home.hero.subtitle")}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  <a href={waLink("Hola, querría reparar mi equipo.")} target="_blank" rel="noopener">
                    {t("cta.repair")} <ArrowRight className="ml-1.5 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20">
                  <a href={waLink("Hola, querría solicitar un presupuesto.")} target="_blank" rel="noopener">
                    {t("cta.quote")}
                  </a>
                </Button>
                <Button asChild size="lg" className="bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90">
                  <a href={waLink()} target="_blank" rel="noopener">
                    <MessageCircle className="mr-1.5 h-4 w-4" /> {t("cta.whatsapp")}
                  </a>
                </Button>
              </div>

              <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-3 max-w-3xl">
                {PILLS.map((b) => (
                  <div key={b} className="rounded-lg border border-primary-foreground/15 bg-primary-foreground/5 backdrop-blur px-3 py-2 text-center text-sm font-medium">
                    {t(b)}
                  </div>
                ))}
              </div>
            </div>

            {/* Team photo */}
            <div className="relative lg:col-span-5">
              <div className="relative mx-auto max-w-md">
                {/* decorative glow ring behind */}
                <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-secondary/40 via-primary-glow/20 to-transparent blur-2xl" />
                <div className="absolute -inset-2 rounded-full bg-secondary/20 blur-xl" />
                <img
                  src={teamPhoto.url}
                  alt="Gerard y Marc — equipo Fortux"
                  className="relative w-full h-auto drop-shadow-2xl animate-fade-up"
                />
              </div>
            </div>
          </div>
        </div>

        {/* angled divider to separate from next section */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-background [clip-path:polygon(0_100%,100%_100%,100%_0,0_60%)]" />
      </section>
      </section>

      {/* CIRCUIT EMBED — live external site, navbar cropped */}
      <section className="pb-12 md:pb-16">
        <div className="container-fortux">
          <div
            className="relative w-full overflow-hidden"
            style={{ height: "1380px" }}
          >
            <iframe
              src="https://fortux.fairwaystudio.ai/"
              title="Circuit Fortux x Mulligan 2026"
              loading="lazy"
              scrolling="no"
              className="absolute left-0 w-full border-0"
              style={{ top: "-90px", height: "calc(100% + 90px)" }}
            />
          </div>

          {/* Quick access tabs */}
          <CircuitTabs />
        </div>
      </section>



      {/* SERVICIOS */}
      <section className="py-20 md:py-28">
        <div className="container-fortux">
          <SectionHeading
            eyebrow={t("home.services.eyebrow")}
            title={t("home.services.title")}
            subtitle={t("home.services.subtitle")}
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <article
                key={s.key}
                className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-elegant"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/40 text-primary group-hover:bg-secondary transition-colors">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-foreground whitespace-pre-line">{t(`home.svc.${s.key}.t`)}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t(`home.svc.${s.key}.d`)}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="outline">
              <Link to="/servicios">{t("cta.viewAll")} <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CIRCUITO HERO */}
      <section className="relative isolate overflow-hidden">
        <img
          src={circuitoImg}
          alt="Campo de Pitch and Putt al atardecer"
          width={1920}
          height={1080}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-overlay" />
        <div className="container-fortux relative py-24 md:py-32 grid gap-10 lg:grid-cols-2 items-center text-primary-foreground">
          <div>
            <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary-foreground">
              {t("home.circuit.eyebrow")}
            </span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-bold text-balance">
              {t("home.circuit.title")}
            </h2>
            <p className="mt-5 max-w-xl text-lg text-primary-foreground/85">
              {t("home.circuit.subtitle")}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                <a href={SITE.circuitUrl} target="_blank" rel="noopener">{t("cta.accessCircuit")} <ArrowRight className="ml-1.5 h-4 w-4" /></a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20">
                <Link to="/circuito">{t("cta.viewRankings")}</Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { v: "+24", l: t("home.stat.tests") },
              { v: "+850", l: t("home.stat.players") },
              { v: "12", l: t("home.stat.courses") },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl border border-primary-foreground/15 bg-primary/40 backdrop-blur p-5 text-center">
                <div className="font-display text-3xl md:text-4xl font-bold text-secondary">{s.v}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-primary-foreground/70">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRÓXIMAS COMPETICIONES */}
      <section className="py-20 md:py-28 bg-muted/40">
        <div className="container-fortux">
          <SectionHeading
            eyebrow={t("home.upcoming.eyebrow")}
            title={t("home.upcoming.title")}
            subtitle={t("home.upcoming.subtitle")}
          />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {UPCOMING.map((k) => (
              <article key={k} className="rounded-2xl bg-card border border-border p-6 hover:shadow-soft transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="rounded-lg bg-primary text-primary-foreground px-3 py-2 text-center">
                    <Calendar className="mx-auto h-4 w-4 mb-1 text-secondary" />
                    <div className="text-xs font-bold">{t(`comp.${k}.date`)}</div>
                  </div>
                  <span className="text-xs font-semibold rounded-full bg-secondary/40 px-3 py-1 text-primary">{t(`comp.${k}.status`)}</span>
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-foreground">{t(`comp.${k}.name`)}</h3>
                <p className="mt-1 inline-flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-3.5 w-3.5" />{t(`comp.${k}.place`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* RESEÑAS */}
      <section className="py-20 md:py-28">
        <div className="container-fortux">
          <SectionHeading
            eyebrow={t("home.reviews.eyebrow")}
            title={t("home.reviews.title")}
            align="center"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {reviews.map((r) => (
              <article key={r.id} className="rounded-2xl border border-border bg-card p-7 shadow-soft">
                <div className="flex gap-0.5 text-secondary-foreground">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="mt-4 text-foreground/90 leading-relaxed">"{r.content}"</p>
                <div className="mt-5 font-semibold text-primary">{r.author_name}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 md:py-24">
        <div className="container-fortux">
          <div className="rounded-3xl bg-gradient-hero p-10 md:p-16 text-primary-foreground text-center shadow-elegant">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-balance">{t("home.cta.title")}</h2>
            <p className="mt-4 max-w-xl mx-auto text-primary-foreground/85">
              {t("home.cta.subtitle")}
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                <a href={waLink("Hola, querría solicitar un presupuesto.")} target="_blank" rel="noopener">{t("cta.quote")}</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20">
                <Link to="/contacto">{t("cta.contact")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
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
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:bg-muted"
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
            <div className="relative w-full overflow-hidden mt-4" style={{ height: "2000px" }}>
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
