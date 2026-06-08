import { createFileRoute } from "@tanstack/react-router";
import { Phone, Check, Scale } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import { waLink } from "@/lib/site";
import heroImg from "@/assets/servicios/swing-weight.png.asset.json";

export const Route = createFileRoute("/servicios/swing-weight")({
  head: () => ({
    meta: [
      { title: "Swing Weight — Fortux" },
      {
        name: "description",
        content:
          "Ajuste y personalización del swing weight de tus palos de golf. Equilibrio, control y prevención de lesiones en Fortux.",
      },
      { property: "og:title", content: "Swing Weight — Fortux" },
      {
        property: "og:description",
        content:
          "Modificamos el swing weight de tus palos para sacarles el máximo rendimiento y prevenir lesiones. Equilibrio perfecto en cada swing.",
      },
      { property: "og:url", content: "/servicios/swing-weight" },
      { property: "og:image", content: heroImg.url },
    ],
    links: [{ rel: "canonical", href: "/servicios/swing-weight" }],
  }),
  component: Page,
});

const ASESORAMIENTO = [
  {
    t: "Evaluación precisa",
    d: "Evaluamos el estado actual del swing weight de cada palo con instrumentos profesionales.",
  },
  {
    t: "Ajuste de peso",
    d: "Añadimos o quitamos peso donde sea necesario: cabeza, grip o varilla, para lograr el equilibrio ideal.",
  },
  {
    t: "Asesoramiento personalizado",
    d: "Te recomendamos el swingweight D2, D3 o el que mejor se adapte a tu físico y estilo de juego.",
  },
  {
    t: "Coherencia en el set",
    d: "Nos aseguramos de que todos tus palos tengan el mismo equilibrio, para un juego consistente.",
  },
];

function Page() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImg.url}
          alt="Swing Weight — Fortux Golf"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-overlay" />
        <div className="container-fortux relative py-20 md:py-28 text-primary-foreground">
          <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary-foreground">
            Servicios Fortux
          </span>
          <h1 className="mt-4 font-display text-4xl md:text-6xl font-bold text-balance max-w-3xl">
            Swing Weight
          </h1>
          <p className="mt-5 max-w-2xl text-lg md:text-xl text-primary-foreground/90 leading-relaxed">
            Modificamos el swing weight de tus palos para sacarles el máximo rendimiento y prevenir lesiones. 
            Porque no solo se trata del peso total, sino de cómo está distribuido a lo largo del palo.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="secondary">
              <a href={waLink("Hola, necesito ajustar el swing weight de mis palos.")} target="_blank" rel="noopener">
                ¿Necesitas ajustar el swing weight?
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <a href="tel:+34635112656">
                <Phone className="mr-2 h-4 w-4" /> Llámanos 635 112 656
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* ¿QUÉ ES? */}
      <section className="py-20 md:py-28">
        <div className="container-fortux max-w-4xl">
          <SectionHeading
            eyebrow="¿Qué es el Swing Weight?"
            title="¿Qué es el Swing Weight y por qué importa en tus palos de golf?"
            subtitle="El swing weight mide cómo se siente el peso del palo cuando haces el swing. No es el peso en gramos, sino cómo se reparte el peso entre la cabeza del palo y el grip."
          />
          <div className="mt-8 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Piensa en el <strong className="text-foreground">swingweight golf</strong> como el equilibrio que hace que el palo se sienta cómodo en tu mano y, lo más importante, que el swing sea fluido.
            </p>
            <p>
              Por ejemplo:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                Un <strong className="text-foreground">swingweight D2</strong> es una de las configuraciones más habituales para jugadores que buscan control y potencia equilibrados.
              </li>
              <li>
                Si el <strong className="text-foreground">peso del palo de golf</strong> está mal distribuido, puedes perder velocidad, consistencia y hasta arriesgarte a alguna lesión.
              </li>
            </ul>
            <p className="mt-4">
              En <strong className="text-foreground">Fortux</strong> ajustamos el swing weight de tus palos de golf con precisión, para que cada uno se adapte perfectamente a tu swing natural. Tanto si usas drivers, hierros o putters, la sensación tiene que ser la misma: control total y confianza en cada golpe.
            </p>
          </div>
        </div>
      </section>

      {/* REPARACIÓN Y AJUSTE */}
      <section className="py-20 md:py-28 bg-secondary/20">
        <div className="container-fortux max-w-4xl">
          <SectionHeading
            eyebrow="Reparación y ajuste"
            title="Reparación y ajuste de swing weight en palos de golf"
            subtitle="En nuestro taller especializado en la reparación de palos de golf, uno de los trabajos más solicitados es el ajuste de swing weight. Y no es casualidad."
          />
          <div className="mt-8 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Cada vez más jugadores entienden que el <strong className="text-foreground">swingweight golf</strong> es clave para mantener un juego consistente.
            </p>
            <p>
              Un <strong className="text-foreground">cambio de grip</strong>, una <strong className="text-foreground">nueva varilla</strong>, o incluso el desgaste natural del material puede alterar el equilibrio del palo. Por eso es importante revisarlo.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {ASESORAMIENTO.map((f) => (
              <div
                key={f.t}
                className="rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-elegant"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/40 text-primary">
                    <Check className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg font-bold">{f.t}</h3>
                </div>
                <p className="mt-3 text-muted-foreground leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Si tienes dudas sobre cómo influye el <strong className="text-foreground">peso del palo de golf</strong> en tu juego, contáctanos. A veces, pequeños cambios marcan grandes diferencias. Y nuestro equipo se encarga de que cada reparación o ajuste esté hecha al milímetro.
            </p>
            <p>
              En <strong className="text-foreground">Fortux</strong> nos tomamos en serio cada detalle en la <strong className="text-foreground">reparación de palos de golf</strong>. Y el <strong className="text-foreground">swing weight</strong> es una de esas cosas que puede parecer pequeña, pero que cambia radicalmente la sensación y los resultados en el campo.
            </p>
            <p>
              Recuerda, además que, con nuestro <strong className="text-foreground">Servicio a Domicilio</strong> te recogemos los palos donde nos indiques.
            </p>
            <p>
              Así que si sientes que tu swing ya no es el mismo o quieres comprobar que tus <strong className="text-foreground">palos de golf</strong> están perfectamente ajustados, escríbenos. Estamos aquí para que vuelvas a disfrutar del juego al máximo.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container-fortux">
          <div className="rounded-3xl bg-gradient-to-br from-primary to-primary-glow p-10 md:p-14 text-primary-foreground text-center shadow-elegant">
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              ¿Sientes que tu swing ya no es el mismo?
            </h2>
            <p className="mt-3 text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              Escríbenos y comprobamos que tus palos de golf están perfectamente ajustados.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" variant="secondary">
                <a href={waLink("Hola, querría información sobre el ajuste de swing weight.")} target="_blank" rel="noopener">
                  WhatsApp
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <a href="tel:+34635112656">
                  <Phone className="mr-2 h-4 w-4" /> 635 112 656
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
