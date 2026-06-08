import { createFileRoute } from "@tanstack/react-router";
import { Wrench, Hammer, Sparkles, ShoppingBag, GraduationCap, ShieldCheck, Settings2 } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import { waLink } from "@/lib/site";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/servicios")({
  head: () => ({
    meta: [
      { title: "Servicios — Fortux" },
      { name: "description", content: "Reparación, cambio de grips, fitting, personalización, mantenimiento integral, clases y asesoramiento técnico." },
      { property: "og:title", content: "Servicios — Fortux" },
      { property: "og:description", content: "Reparación, fitting, personalización, mantenimiento y formación de golf." },
      { property: "og:url", content: "/servicios" },
    ],
    links: [{ rel: "canonical", href: "/servicios" }],
  }),
  component: Page,
});

const ITEMS = [
  { icon: Wrench, k: "1" },
  { icon: Hammer, k: "2" },
  { icon: Settings2, k: "3" },
  { icon: Sparkles, k: "4" },
  { icon: ShieldCheck, k: "5" },
  { icon: GraduationCap, k: "6" },
  { icon: ShoppingBag, k: "7" },
];

function Page() {
  const { t } = useI18n();
  return (
    <section className="py-20 md:py-28">
      <div className="container-fortux">
        <SectionHeading eyebrow={t("svc.eyebrow")} title={t("svc.title")} subtitle={t("svc.subtitle")} />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((s) => (
            <article key={s.k} className="rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:shadow-elegant">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/40 text-primary">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold">{t(`svc.${s.k}.t`)}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t(`svc.${s.k}.d`)}</p>
              <Button asChild variant="link" className="mt-4 px-0 text-primary">
                <a href={waLink(`Hola, me interesa: ${t(`svc.${s.k}.t`)}.`)} target="_blank" rel="noopener">{t("cta.requestWa")}</a>
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
