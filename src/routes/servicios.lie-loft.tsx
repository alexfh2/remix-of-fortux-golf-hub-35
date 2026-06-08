import { createFileRoute } from "@tanstack/react-router";
import { Phone, Check, Ruler } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import { waLink } from "@/lib/site";
import heroImg from "@/assets/servicios/lie-loft.png.asset.json";

export const Route = createFileRoute("/servicios/lie-loft")({
  head: () => ({
    meta: [
      { title: "Lie & Loft — Fortux" },
      {
        name: "description",
        content:
          "Ajuste profesional de lie y loft para tus palos de golf. Precisión, control y distancia en Fortux.",
      },
      { property: "og:title", content: "Lie & Loft — Fortux" },
      {
        property: "og:description",
        content:
          "Ajustamos el lie y loft de tus palos de golf para que la bola impacte en el centro de la cara del palo.",
      },
      { property: "og:url", content: "/servicios/lie-loft" },
      { property: "og:image", content: heroImg.url },
    ],
    links: [{ rel: "canonical", href: "/servicios/lie-loft" }],
  }),
  component: Page,
});

const ASESORAMIENTO = [
  {
    t: "Análisis de postura y swing",
    d: "Evaluamos tu postura, swing y el impacto de la cabeza del palo para determinar el lie y loft óptimos.",
  },
  {
    t: "Ajuste de lie al milímetro",
    d: "Corregimos el ángulo entre la varilla y el suelo para que el palo se adapte perfectamente a tu juego.",
  },
  {
    t: "Ajuste de loft personalizado",
    d: "Modificamos el ángulo de la cara del palo para lograr la altura y distancia que necesitas.",
  },
  {
    t: "Coherencia en todo el set",
    d: "Nos aseguramos de que los gaps entre hierros sean correctos y consistentes en toda tu bolsa.",
  },
];

function Page() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImg.url}
          alt="Lie & Loft — Fortux Golf"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-overlay" />
        <div className="container-fortux relative py-20 md:py-28 text-primary-foreground">
          <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary-foreground">
            Servicios Fortux
          </span>
          <h1 className="mt-4 font-display text-4xl md:text-6xl font-bold text-balance max-w-3xl">
            Lie & Loft
          </h1>
          <p className="mt-5 max-w-2xl text-lg md:text-xl text-primary-foreground/90 leading-relaxed">
            Si buscas precisión en cada golpe, hay dos ajustes que no puedes pasar por alto en tus palos de golf:
            el lie y el loft. Dos detalles que, aunque parezcan menores, marcan una gran diferencia en la trayectoria,
            el control y la distancia de la bola.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="secondary">
              <a href={waLink("Hola, necesito ajustar el lie y loft de mis palos.")} target="_blank" rel="noopener">
                Solicitar ajuste de Lie & Loft
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

      {/* ¿QUÉ ES EL LIE? */}
      <section className="py-20 md:py-28">
        <div className="container-fortux max-w-4xl">
          <SectionHeading
            eyebrow="¿Qué es el Lie?"
            title="¿Qué es el Lie en golf y cuándo deberías revisarlo?"
            subtitle="El lie en golf es el ángulo entre la varilla del palo y el suelo cuando el palo está en posición de impacto. Si este ángulo no es el adecuado para tu postura y tu swing, el resultado puede ser desastroso."
          />
          <div className="mt-8 space-y-4 text-muted-foreground leading-relaxed">
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                Si el <strong className="text-foreground">lie del palo de golf</strong> es demasiado alto, la punta del palo se levanta y la bola tiende a salir hacia la izquierda (para diestros).
              </li>
              <li>
                Si el <strong className="text-foreground">lie es muy bajo</strong>, el talón se levanta y la bola suele desviarse a la derecha.
              </li>
            </ul>
            <p className="mt-4">
              Por eso es fundamental ajustar el lie de tus palos, ya sea en un driver, en los hierros o en el <strong className="text-foreground">sandwedge</strong>.
            </p>
            <p>
              En <strong className="text-foreground">Fortux</strong>, analizamos tu postura, tu swing y el impacto de la cabeza del palo para ajustar el <strong className="text-foreground">lie</strong> al milímetro. Especialmente importante si has cambiado la forma de jugar o si has modificado tu equipo.
            </p>
          </div>
        </div>
      </section>

      {/* LOFT */}
      <section className="py-20 md:py-28 bg-secondary/20">
        <div className="container-fortux max-w-4xl">
          <SectionHeading
            eyebrow="Loft en golf"
            title="Loft en golf: cómo influye en tus palos y tu juego"
            subtitle="El loft en golf es el ángulo de la cara del palo respecto al suelo y determina la altura y distancia que puede alcanzar la bola."
          />
          <div className="mt-8 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Un <strong className="text-foreground">loft driver golf</strong> bajo, como un <strong className="text-foreground">std loft driver</strong> de 9 grados, te dará menos altura, pero más distancia si tienes un swing rápido. Mientras que un <strong className="text-foreground">loft driver de golf</strong> más alto, como 12 grados, puede ayudarte si buscas más control y facilidad de vuelo.
            </p>
            <p>
              También ajustamos el <strong className="text-foreground">loft en palos de golf</strong> como el <strong className="text-foreground">loft sandwedge</strong> o el <strong className="text-foreground">loft pw golf</strong>, para que haya coherencia en tu set de palos.
            </p>
            <p>
              Por ejemplo, si juegas con un <strong className="text-foreground">loft p790</strong> o un <strong className="text-foreground">loft ping i500</strong>, te ayudamos a mantener los gaps correctos entre hierros para que no pierdas metros entre uno y otro.
            </p>
            <p>
              Además, no te olvides que, si has modificado el <strong className="text-foreground">swing weight</strong> o el <strong className="text-foreground">peso del palo de golf</strong>, es posible que el loft y el lie necesiten revisión. Por eso, en <strong className="text-foreground">Fortux</strong>, analizamos siempre el conjunto para asegurarnos de que cada detalle encaje.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICIO FORTUX */}
      <section className="py-20 md:py-28">
        <div className="container-fortux max-w-4xl">
          <SectionHeading
            eyebrow="Ajuste de Lie y Loft"
            title="Ajuste de Lie y Loft en Fortux: Precisión y confianza en cada golpe"
            subtitle="En Fortux, ofrecemos un servicio de ajuste de lie y loft preciso y personalizado. No se trata solo de doblar un palo aquí o allá, es un trabajo delicado que requiere experiencia y maquinaria específica para que el resultado sea exacto."
          />
          <div className="mt-8 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Ya sea que uses un <strong className="text-foreground">loft ping g425</strong>, busques ajustar el <strong className="text-foreground">lie del driver de golf</strong> o quieras personalizar el <strong className="text-foreground">loft pw</strong>, en <strong className="text-foreground">Fortux</strong> te ayudamos a sacarle el máximo partido a tus <strong className="text-foreground">palos de golf</strong>.
            </p>
            <p>
              Recuerda, además que, con nuestro <strong className="text-foreground">Servicio a Domicilio</strong> te recogemos los palos donde nos indiques.
            </p>
            <p>
              Si sientes que la bola no vuela como debería o hay inconsistencias en tus golpes, contáctanos. Una revisión del <strong className="text-foreground">loft y el lie</strong> puede cambiar por completo tu confianza en el campo.
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
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container-fortux">
          <div className="rounded-3xl bg-gradient-to-br from-primary to-primary-glow p-10 md:p-14 text-primary-foreground text-center shadow-elegant">
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              ¿Sientes que la bola no vuela como debería?
            </h2>
            <p className="mt-3 text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              Una revisión del loft y el lie puede cambiar por completo tu confianza en el campo.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" variant="secondary">
                <a href={waLink("Hola, querría información sobre el ajuste de lie y loft.")} target="_blank" rel="noopener">
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
