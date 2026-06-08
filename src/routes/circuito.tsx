import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Trophy, Calendar, MapPin, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SITE } from "@/lib/site";
import { useI18n } from "@/lib/i18n";
import circuitoImg from "@/assets/circuito-hero.jpg";

export const Route = createFileRoute("/circuito")({
  head: () => ({
    meta: [
      { title: "Circuito Pitch & Putt — Fortux" },
      { name: "description", content: "Información del circuito Pitch & Putt: próximas competiciones, ranking, resultados y acceso a la plataforma oficial." },
      { property: "og:title", content: "Circuito Pitch & Putt — Fortux" },
      { property: "og:description", content: "El circuito de referencia para amateurs y federados." },
      { property: "og:url", content: "/circuito" },
      { property: "og:image", content: circuitoImg },
    ],
    links: [{ rel: "canonical", href: "/circuito" }],
  }),
  component: Page,
});

const RANKING = [
  { pos: 1, name: "Marc Vidal", pts: 1240 },
  { pos: 2, name: "Anna Roca", pts: 1185 },
  { pos: 3, name: "Jordi Pons", pts: 1142 },
  { pos: 4, name: "Laura Camps", pts: 1080 },
  { pos: 5, name: "Pol Serra", pts: 1035 },
];

const UPCOMING = ["1", "2", "3"];

function Page() {
  const { t } = useI18n();
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img src={circuitoImg} alt="Circuito Pitch & Putt" width={1920} height={1080} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-overlay" />
        <div className="container-fortux relative py-24 md:py-32 text-primary-foreground">
          <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary-foreground">
            <Trophy className="inline mr-1 h-3.5 w-3.5" /> {t("nav.circuit")}
          </span>
          <h1 className="mt-4 font-display text-4xl md:text-6xl lg:text-7xl font-bold text-balance max-w-3xl">
            {t("cir.hero.title")}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-primary-foreground/85">
            {t("cir.hero.subtitle")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <a href={SITE.circuitUrl} target="_blank" rel="noopener">{t("cta.accessCircuit")} <ArrowRight className="ml-1.5 h-4 w-4" /></a>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-fortux grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow={t("cir.ranking.eyebrow")} title={t("cir.ranking.title")} subtitle={t("cir.ranking.subtitle")} />
            <ol className="mt-8 divide-y divide-border rounded-2xl border border-border bg-card overflow-hidden">
              {RANKING.map((r) => (
                <li key={r.pos} className="flex items-center justify-between gap-4 px-5 py-4">
                  <div className="flex items-center gap-4">
                    <span className={`grid h-9 w-9 place-items-center rounded-full font-bold text-sm ${r.pos === 1 ? "bg-secondary text-secondary-foreground" : "bg-muted text-foreground"}`}>
                      {r.pos}
                    </span>
                    <span className="font-medium">{r.name}</span>
                  </div>
                  <span className="font-display font-bold text-primary">{r.pts} pts</span>
                </li>
              ))}
            </ol>
            <Button asChild variant="link" className="mt-4 px-0">
              <a href={SITE.circuitUrl} target="_blank" rel="noopener">{t("cta.viewFullRanking")} <TrendingUp className="ml-1.5 h-4 w-4" /></a>
            </Button>
          </div>

          <div>
            <SectionHeading eyebrow={t("cir.cal.eyebrow")} title={t("cir.cal.title")} />
            <div className="mt-8 space-y-3">
              {UPCOMING.map((k) => (
                <article key={k} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
                  <div className="rounded-lg bg-primary text-primary-foreground px-3 py-2 text-center min-w-16">
                    <Calendar className="mx-auto h-4 w-4 mb-1 text-secondary" />
                    <div className="text-xs font-bold">{t(`comp.${k}.date`)}</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-bold">{t(`comp.${k}.name`)}</h3>
                    <p className="text-sm text-muted-foreground inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{t(`comp.${k}.place`)}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
