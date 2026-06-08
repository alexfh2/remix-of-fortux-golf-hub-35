import { createFileRoute } from "@tanstack/react-router";
import { Phone, Check, Wrench } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import { waLink } from "@/lib/site";
import heroImg from "@/assets/servicios/ajustes-de-varillas.png.asset.json";
import secondaryImg from "@/assets/alumnos/academia-fotos-10.jpg.asset.json";

export const Route = createFileRoute("/servicios/ajustes-de-varillas")({
  head: () => ({
    meta: [
      { title: "Ajuste de varillas — Fortux" },
      {
        name: "description",
        content:
          "Ajuste y cambio de varillas de palos de golf (driver, hierros y putters). Asesoramiento personalizado para grafito y acero en Fortux.",
      },
      { property: "og:title", content: "Ajuste de varillas — Fortux" },
      {
        property: "og:description",
        content:
          "Reparamos, ajustamos y cambiamos las varillas de tus palos de golf para que vuelvas a sentir control y distancia en cada golpe.",
      },
      { property: "og:url", content: "/servicios/ajustes-de-varillas" },
      { property: "og:image", content: heroImg.url },
    ],
    links: [{ rel: "canonical", href: "/servicios/ajustes-de-varillas" }],
  }),
  component: Page,
});

const TIPOS = [
  {
    t: "Varillas para seniors",
    d: "Opciones más ligeras y flexibles para ganar distancia sin exigirle tanto al cuerpo.",
  },
  {
    t: "Varillas para driver",
    d: "Potencia y precisión desde el tee. Incluye opciones stiff para swings rápidos que buscan controlar la dirección.",
  },
  {
    t: "Reemplazo por rotura o cambio de juego",
    d: "Si se te ha roto la varilla o ya no se ajusta a tu juego, te la reemplazamos por la que mejor se adapte a ti.",
  },
  {
    t: "Grafito o acero",
    d: "Te asesoramos en la elección entre varillas de grafito y de acero según tu experiencia y tipo de juego.",
  },
];

function Page() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImg.url}
          alt="Ajuste de varillas — Fortux Golf"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-overlay" />
        <div className="container-fortux relative py-20 md:py-28 text-primary-foreground">
          <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary-foreground">
            Servicios Fortux
          </span>
          <h1 className="mt-4 font-display text-4xl md:text-6xl font-bold text-balance max-w-3xl">
            Ajuste de varillas
          </h1>
          <p className="mt-5 max-w-2xl text-lg md:text-xl text-primary-foreground/90 leading-relaxed">
            Reparamos, ajustamos y cambiamos las varillas de tus palos de golf — grafito o acero — para que recuperes
            control, distancia y confianza en cada golpe.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="secondary">
              <a href={waLink("Hola, necesito un ajuste de varillas.")} target="_blank" rel="noopener">
                ¿Necesitas un ajuste de varillas?
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
              eyebrow="Reparamos tus varillas de golf"
              title="¿Es el momento de revisar tus varillas?"
              subtitle="Con el tiempo, el material de las varillas pierde propiedades — y, muchas veces, lo que necesitas ahora no es lo mismo que hace unos años."
            />
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                En <strong className="text-foreground">Fortux</strong> somos especialistas en el ajuste y cambio de
                varillas, tanto para <strong className="text-foreground">palos de golf de grafito</strong> como para
                varillas de acero. Si te cuesta controlar el golpe, la bola no alcanza la distancia que buscas o tu
                juego ha cambiado, es momento de revisar el equipo.
              </p>
              <p>
                Ajustar o cambiar la varilla de un palo no es solo una cuestión de desgaste:{" "}
                <strong className="text-foreground">es adaptar el palo a ti</strong>, a tu físico y a tu estilo de
                juego actual. El swing de hace 5 años no es el de ahora. Y si tienes dudas sobre el precio de cambiar
                la varilla del driver, te lo explicamos sin rodeos.
              </p>
            </div>
          </div>
          <div>
            <img
              src={secondaryImg.url}
              alt="Ajuste de varillas de palos de golf — Fortux"
              loading="lazy"
              className="w-full rounded-2xl shadow-elegant"
            />
          </div>
        </div>
      </section>

      {/* TIPOS */}
      <section className="py-20 md:py-28 bg-secondary/20">
        <div className="container-fortux">
          <SectionHeading
            eyebrow="Tipos de varillas"
            title="¿Por qué deberías cambiar la varilla de tu palo?"
            subtitle="Las varillas son fundamentales para la trayectoria y el control de cada golpe. No todas son iguales — elegir bien marca una gran diferencia."
            align="center"
          />
          <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
            {TIPOS.map((f) => (
              <article
                key={f.t}
                className="rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-elegant"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/40 text-primary">
                    <Wrench className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg font-bold">{f.t}</h3>
                </div>
                <p className="mt-3 text-muted-foreground leading-relaxed">{f.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ASESORAMIENTO */}
      <section className="py-20 md:py-28">
        <div className="container-fortux max-w-4xl">
          <SectionHeading
            eyebrow="Asesoramiento"
            title="¿Comprar varillas o cambiar las tuyas?"
            subtitle="Antes de renovar todo el equipo, habla con nosotros. Muchas veces un simple ajuste te devuelve las sensaciones que buscas."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              {
                t: "Drivers, hierros y putters",
                d: "Trabajamos con las mejores varillas para cada tipo de palo y nivel de jugador.",
              },
              {
                t: "Flex y peso adecuados",
                d: "Revisamos que el flex y el peso de tus varillas se ajustan a tu juego actual.",
              },
              {
                t: "Cambio puntual o juego completo",
                d: "Cambiamos la varilla del driver, las varillas de los hierros o solo lo que necesites.",
              },
              {
                t: "Servicio a domicilio",
                d: "Recogemos los palos donde nos indiques y te los devolvemos listos para jugar.",
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
            Un ajuste de varilla a tiempo mejora tu control, aumenta tu confianza y alarga la vida de tus palos. Si
            tienes dudas sobre el precio de cambiar la varilla del driver o cualquier otro ajuste, consúltanos sin
            compromiso.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container-fortux">
          <div className="rounded-3xl bg-gradient-to-br from-primary to-primary-glow p-10 md:p-14 text-primary-foreground text-center shadow-elegant">
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              ¿Listos para ajustar tus varillas?
            </h2>
            <p className="mt-3 text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              Cuéntanos qué necesitas y te devolvemos los palos listos para el siguiente partido.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" variant="secondary">
                <a href={waLink("Hola, querría información sobre el ajuste de varillas.")} target="_blank" rel="noopener">
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
