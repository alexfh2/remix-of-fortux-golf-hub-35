import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/servicios")({
  head: () => ({
    meta: [
      { title: "Servicios — Fortux" },
      { name: "description", content: "Servicios de Fortux Golf." },
    ],
    links: [{ rel: "canonical", href: "/servicios" }],
  }),
  component: Page,
});

function Page() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-fortux">
        <SectionHeading eyebrow="Servicios" title="Próximamente" subtitle="Estamos preparando el contenido de esta sección." align="center" />
      </div>
    </section>
  );
}
