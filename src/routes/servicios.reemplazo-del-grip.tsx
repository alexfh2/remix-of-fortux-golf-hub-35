import { createFileRoute } from "@tanstack/react-router";
import { Phone, Check, AlertTriangle } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import { waLink } from "@/lib/site";
import heroImg from "@/assets/servicios/reemplazo-del-grip.png.asset.json";
import gripsImg from "@/assets/servicios/grips-palos-golf-fortux.jpg.asset.json";

export const Route = createFileRoute("/servicios/reemplazo-del-grip")({
  head: () => ({
    meta: [
      { title: "Reemplazo del grip — Fortux" },
      {
        name: "description",
        content:
          "Servicio profesional de reemplazo de grips de palos de golf. Recuperá control, sensación y comodidad en cada swing.",
      },
      { property: "og:title", content: "Reemplazo del grip — Fortux" },
      {
        property: "og:description",
        content: "Cambia el grip de tus palos con Fortux: rápido, profesional y adaptado a tu juego.",
      },
      { property: "og:url", content: "/servicios/reemplazo-del-grip" },
      { property: "og:image", content: heroImg.url },
    ],
    links: [{ rel: "canonical", href: "/servicios/reemplazo-del-grip" }],
  }),
  component: Page,
});

const SIGNS = [
  "Sientes que el palo se te resbala incluso con guantes.",
  "El grip está liso, duro o agrietado.",
  "No tienes el mismo control en los golpes cortos.",
  "Has notado molestias en las manos después de jugar.",
  "Necesitas asesoramiento sobre el grip ideal — incluido el del putter.",
];

function Page() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImg.url}
          alt="Reemplazo del grip — Fortux Golf"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-overlay" />
        <div className="container-fortux relative py-20 md:py-28 text-primary-foreground">
          <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary-foreground">
            Servicios Fortux
          </span>
          <h1 className="mt-4 font-display text-4xl md:text-6xl font-bold text-balance max-w-3xl">
            Reemplazo del grip
          </h1>
          <p className="mt-5 max-w-2xl text-lg md:text-xl text-primary-foreground/90 leading-relaxed">
            Recupera el control, la sensación y la comodidad de tus palos con un reemplazo de grips profesional,
            rápido y adaptado a tu juego.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="secondary">
              <a href={waLink("Hola, necesito un reemplazo de grips.")} target="_blank" rel="noopener">
                ¿Necesitas un reemplazo de grips?
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

      {/* INTRO */}
      <section className="py-20 md:py-28">
        <div className="container-fortux grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="¿Por qué cambiarlo?"
              title="El grip de tus palos también se desgasta"
              subtitle="Humedad, sudor, polvo del campo… con el tiempo el grip pierde adherencia y sensación. Si el palo se te resbala o pierdes control en el golpeo, ha llegado el momento de cambiarlo."
            />
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                En <strong className="text-foreground">Fortux</strong> lo sabemos bien. Por eso te ofrecemos un servicio
                de <strong className="text-foreground">reemplazo de grips</strong> profesional, rápido y adaptado a
                tus necesidades. Para que vuelvas a sentir seguridad en cada swing.
              </p>
              <p>
                Un grip desgastado puede afectar mucho más de lo que crees: si está resbaladizo o demasiado duro, tus
                manos harán más fuerza de la cuenta y eso terminará perjudicando tu swing, tu precisión y tu comodidad
                en el campo. Además, un <strong className="text-foreground">grip débil</strong> puede provocar lesiones
                en manos o muñecas por la tensión extra que aplicas sin darte cuenta.
              </p>
            </div>
          </div>
          <div>
            <img
              src={gripsImg.url}
              alt="Grips para palos de golf — Fortux"
              loading="lazy"
              className="w-full rounded-2xl shadow-elegant"
            />
          </div>
        </div>
      </section>

      {/* SIGNS */}
      <section className="py-20 md:py-28 bg-secondary/20">
        <div className="container-fortux">
          <SectionHeading
            eyebrow="Señales claras"
            title="¿Cuándo cambiar el grip de un palo de golf?"
            subtitle="Si te identificas con alguna de estas situaciones, es momento de pasar por Fortux."
            align="center"
          />
          <div className="mx-auto mt-12 grid max-w-4xl gap-4 md:grid-cols-2">
            {SIGNS.map((s) => (
              <article
                key={s}
                className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-elegant"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/40 text-primary">
                  <AlertTriangle className="h-5 w-5" />
                </span>
                <p className="text-base leading-relaxed">{s}</p>
              </article>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-3xl text-center text-muted-foreground italic">
            Cambiar el grip de un putter también puede marcar la diferencia entre embocar o quedarte corto.
          </p>
        </div>
      </section>

      {/* PRECIO + DETALLES */}
      <section className="py-20 md:py-28">
        <div className="container-fortux max-w-4xl">
          <SectionHeading
            eyebrow="Servicio completo"
            title="Cuánto cuesta cambiar el grip y otros detalles"
            subtitle="En Fortux nos adaptamos a cada jugador. Trabajamos con marcas de calidad y materiales resistentes para que tu nuevo grip dure más tiempo en las mejores condiciones."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              {
                t: "Reparación completa",
                d: "Reparación de grips completa, incluyendo el resolado para devolver al palo su mejor condición.",
              },
              {
                t: "Mantenimiento de grips",
                d: "Servicio de mantenimiento periódico para que tus grips estén siempre a punto.",
              },
              {
                t: "Asesoramiento personalizado",
                d: "Te ayudamos a elegir el grip que mejor se adapta a tu mano, presión y sensaciones en el campo.",
              },
              {
                t: "Servicio a domicilio",
                d: "Recogemos tus palos donde nos indiques y te los devolvemos listos para el siguiente partido.",
              },
            ].map((f) => (
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
          <p className="mt-8 text-muted-foreground leading-relaxed">
            Puedes hacerte una idea echando un vistazo a nuestro{" "}
            <a href="/tienda" className="text-primary underline">
              catálogo de grips disponibles
            </a>
            . Tener los palos a punto es fundamental para disfrutar del juego.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container-fortux">
          <div className="rounded-3xl bg-gradient-to-br from-primary to-primary-glow p-10 md:p-14 text-primary-foreground text-center shadow-elegant">
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Si notas que es el momento, contáctanos
            </h2>
            <p className="mt-3 text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              ¡Te dejamos los palos listos para el siguiente partido!
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" variant="secondary">
                <a href={waLink("Hola, querría información sobre el reemplazo de grips.")} target="_blank" rel="noopener">
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
