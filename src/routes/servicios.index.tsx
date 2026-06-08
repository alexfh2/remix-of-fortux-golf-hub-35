import { createFileRoute, Link } from "@tanstack/react-router";
import { Wrench, ArrowRight, Cog, Scale, Ruler } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import heroImg from "@/assets/servicios/reemplazo-del-grip.png.asset.json";
import varillasImg from "@/assets/servicios/ajustes-de-varillas.png.asset.json";
import swingWeightImg from "@/assets/servicios/swing-weight.png.asset.json";
import lieLoftImg from "@/assets/servicios/lie-loft.png.asset.json";

export const Route = createFileRoute("/servicios/")({
  head: () => ({
    meta: [
      { title: "Servicios — Fortux" },
      { name: "description", content: "Servicios profesionales para tus palos de golf en Fortux." },
    ],
    links: [{ rel: "canonical", href: "/servicios" }],
  }),
  component: Page,
});

const SERVICES = [
  {
    to: "/servicios/reemplazo-del-grip" as const,
    title: "Reemplazo del grip",
    desc: "Servicio profesional de cambio de grips para recuperar control y sensación en cada swing.",
    img: heroImg.url,
    icon: Wrench,
  },
  {
    to: "/servicios/ajustes-de-varillas" as const,
    title: "Ajustes de varillas",
    desc: "Reparamos, ajustamos y cambiamos varillas de driver, hierros y putters — grafito o acero.",
    img: varillasImg.url,
    icon: Cog,
  },
  {
    to: "/servicios/swing-weight" as const,
    title: "Swing Weight",
    desc: "Ajustamos el equilibrio de tus palos para mejorar control, ritmo y prevenir lesiones.",
    img: swingWeightImg.url,
    icon: Scale,
  },
];

function Page() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-fortux">
        <SectionHeading
          eyebrow="Servicios"
          title="Cuidamos tus palos de golf"
          subtitle="Servicios profesionales pensados para que disfrutes al máximo de tu juego."
          align="center"
        />
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
          {SERVICES.map((s) => (
            <Link
              key={s.to}
              to={s.to}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/40 text-primary">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-xl font-bold">{s.title}</h3>
                </div>
                <p className="mt-3 text-muted-foreground leading-relaxed">{s.desc}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-primary font-semibold">
                  Ver más <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
