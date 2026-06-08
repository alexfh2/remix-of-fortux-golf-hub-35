import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Check } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/sonner";
import { waLink } from "@/lib/site";

export const Route = createFileRoute("/servicios")({
  head: () => ({
    meta: [
      { title: "Clases de golf personalizadas — Fortux" },
      {
        name: "description",
        content:
          "Clases individuales y grupales de golf con Marc Fortuny y Gerard Rubio. Tarifas, bonos y formación adaptada a tu nivel.",
      },
      { property: "og:title", content: "Clases de golf personalizadas — Fortux" },
      {
        property: "og:description",
        content: "Aprende golf con instructores apasionados. Tarifas, bonos y experiencia única.",
      },
      { property: "og:url", content: "/servicios" },
      {
        property: "og:image",
        content: "https://fortuxgolf.com/wp-content/uploads/2024/11/academy-tarifas-bonos-fortux-golf.png",
      },
    ],
    links: [{ rel: "canonical", href: "/servicios" }],
  }),
  component: Page,
});

const CDN = "https://fortuxgolf.com/wp-content/uploads/2024/11";

const TARIFFS = [
  {
    name: "Tarifa Personal",
    detail: "1 Persona / 60 Min.",
    price: "45€",
    img: `${CDN}/academy-golf-fortux-1-persona.jpg`,
  },
  {
    name: "Tarifa Personal II",
    detail: "1 Persona / 30 Min.",
    price: "28€",
    img: `${CDN}/academy-golf-fortux-1-persona-30-min.jpg`,
  },
  {
    name: "Tarifa Dobles",
    detail: "2 Personas / 60 Min.",
    price: "60€",
    img: `${CDN}/academy-golf-fortux-2-personas.jpg`,
  },
  {
    name: "Tarifa Multi",
    detail: "A partir de 3 Personas / 60 Min.",
    price: "75€",
    img: `${CDN}/academy-golf-fortux-grupos-empresas.jpg`,
  },
  {
    name: "Bono 10 clases",
    detail: "Individual",
    price: "380€",
    img: `${CDN}/academy-golf-fortux-bono-10-clases.jpg`,
    highlight: true,
  },
  {
    name: "Group / Team Building",
    detail: "Clases para grupos / empresas",
    price: "Presupuesto a medida",
    img: `${CDN}/academy-golf-fortux-3-personas.jpg`,
  },
];

const STUDENTS = Array.from({ length: 10 }, (_, i) =>
  `${CDN}/academia-fotos-${String(i + 1).padStart(2, "0")}.jpg`,
);

const COURSES = [
  { name: "Badalona", file: "bdalona.png" },
  { name: "Can Cuyàs", file: "can-cuyas.png" },
  { name: "Can Rafel", file: "can-rafel.png" },
  { name: "Sant Cebrià", file: "st-cebria.png" },
  { name: "Daró", file: "daro.png" },
  { name: "Franciac", file: "franciac.png" },
  { name: "La Roca", file: "la-roca.png" },
  { name: "Par 3", file: "par-3.png" },
  { name: "La Garriga", file: "la-garriga.png" },
  { name: "Lloret", file: "lloret.png" },
  { name: "Can Mascaró", file: "can-mascaro.png" },
  { name: "Mora", file: "mora.png" },
  { name: "Pals", file: "pals.png" },
  { name: "Roc 3", file: "roc-3.png" },
  { name: "Teià", file: "teia.png" },
  { name: "Golf Square", file: "golfsquare.png" },
  { name: "Urgell", file: "urgell.png" },
  { name: "BonÀrea", file: "bonarea.png" },
  { name: "Sant Cugat", file: "sant-cugat.png" },
  { name: "Montseny", file: "montseny.png" },
];

function Page() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", accept: false });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.accept) {
      toast.error("Debes aceptar la Política de Privacidad");
      return;
    }
    setSending(true);
    const msg = `Hola, soy ${form.name} (${form.email} · ${form.phone}).%0A%0A${form.message}`;
    window.open(waLink(decodeURIComponent(msg)), "_blank");
    setTimeout(() => {
      toast.success("Consulta preparada", { description: "Te hemos abierto WhatsApp para enviarla." });
      setForm({ name: "", email: "", phone: "", message: "", accept: false });
      setSending(false);
    }, 400);
  };

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-primary/90 to-primary">
        <div className="container-fortux relative py-20 md:py-28 text-primary-foreground">
          <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary-foreground">
            Academia Fortux
          </span>
          <h1 className="mt-4 font-display text-4xl md:text-6xl font-bold text-balance max-w-3xl">
            Clases de golf personalizadas
          </h1>
          <p className="mt-5 max-w-2xl text-lg md:text-xl text-primary-foreground/90 leading-relaxed">
            Aprende de la mano de <strong>Marc Fortuny</strong> y <strong>Gerard Rubio</strong>, instructores apasionados y
            cualificados, con clases individuales adaptadas a tu nivel y objetivos en el golf.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="secondary">
              <a href="#contacto">Contáctanos</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10">
              <a href="#tarifas">Ver tarifas</a>
            </Button>
          </div>
        </div>
      </section>

      {/* INTRO BONOS */}
      <section className="py-20 md:py-28">
        <div className="container-fortux grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Bonos exclusivos"
              title="¡Reserva tu bono y descubre una experiencia de aprendizaje única!"
              subtitle="Explora el apasionante mundo del golf con nuestros bonos de clases exclusivas. Te ofrecemos una experiencia única y personalizada, diseñada para satisfacer tus necesidades y asegurar un aprendizaje excepcional."
            />
            <div className="mt-6 space-y-3 text-muted-foreground leading-relaxed">
              <p>
                Dedica tiempo a perfeccionar tu técnica y potencia tus habilidades en cada clase, descubriendo los secretos
                para lograr golpes precisos y efectivos mientras disfrutas de una experiencia enriquecedora y motivadora.
              </p>
              <p>
                <strong className="text-foreground">Elige tu tarifa</strong> y embárcate en esta aventura para descubrir el
                mundo del golf de la mejor manera posible.
              </p>
            </div>
            <Button asChild className="mt-8 bg-primary hover:bg-primary-glow">
              <a href="#contacto">Contáctanos</a>
            </Button>
          </div>
          <div className="relative">
            <img
              src={`${CDN}/academy-tarifas-bonos-fortux-golf.png`}
              alt="Bonos de clases de golf Fortux"
              loading="lazy"
              className="w-full rounded-2xl shadow-elegant"
            />
          </div>
        </div>
      </section>

      {/* TARIFAS */}
      <section id="tarifas" className="py-20 md:py-28 bg-secondary/20">
        <div className="container-fortux">
          <SectionHeading
            eyebrow="Tarifas"
            title="Tarifas y pack de clases"
            subtitle="Se incluyen bolas de prácticas y material."
            align="center"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {TARIFFS.map((t) => (
              <article
                key={t.name}
                className={`group overflow-hidden rounded-2xl border bg-card transition-all hover:-translate-y-1 hover:shadow-elegant ${
                  t.highlight ? "border-primary ring-2 ring-primary/40" : "border-border"
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={t.img}
                    alt={t.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {t.highlight && (
                    <span className="absolute top-3 right-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow">
                      Más popular
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold">{t.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{t.detail}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-display text-2xl font-bold text-primary">{t.price}</span>
                    <Button asChild size="sm" variant="outline">
                      <a href="#contacto">Reservar</a>
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM + LLAMADA */}
      <section className="py-20 md:py-28">
        <div className="container-fortux grid gap-12 lg:grid-cols-2 lg:items-center">
          <img
            src="https://fortuxgolf.com/wp-content/uploads/2024/10/team.png"
            alt="Equipo Fortux Golf — Marc Fortuny y Gerard Rubio"
            loading="lazy"
            className="w-full rounded-2xl shadow-elegant"
          />
          <div>
            <SectionHeading
              eyebrow="Contacto directo"
              title="Si prefieres, llámanos directamente"
              subtitle="Hablar con un instructor es la forma más rápida de resolver tus dudas y reservar tu primera clase."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { name: "Gerard Rubio", phone: "689 731 369" },
                { name: "Marc Fortuny", phone: "635 112 656" },
              ].map((p) => (
                <a
                  key={p.name}
                  href={`tel:+34${p.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:shadow-elegant"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/40 text-primary">
                    <Phone className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm text-muted-foreground">{p.name}</span>
                    <span className="block font-display text-lg font-bold">{p.phone}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FORM */}
      <section id="contacto" className="py-20 md:py-28 bg-secondary/20">
        <div className="container-fortux max-w-3xl">
          <SectionHeading
            eyebrow="Contacto"
            title="¡No esperes más para llevar tu juego al siguiente nivel!"
            subtitle="Contáctanos y descubre cómo nuestras clases personalizadas pueden ayudarte a mejorar en el campo de golf."
            align="center"
          />
          <form onSubmit={handleSubmit} className="mt-10 rounded-2xl border border-border bg-card p-6 md:p-8 shadow-elegant space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <Label htmlFor="name">Nombre *</Label>
                <Input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-2" />
              </div>
              <div>
                <Label htmlFor="email">E-mail *</Label>
                <Input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-2" />
              </div>
            </div>
            <div>
              <Label htmlFor="phone">Teléfono *</Label>
              <Input id="phone" type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-2" />
            </div>
            <div>
              <Label htmlFor="message">Consulta *</Label>
              <Textarea id="message" required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="mt-2" />
            </div>
            <div className="flex items-start gap-3">
              <Checkbox id="accept" checked={form.accept} onCheckedChange={(c) => setForm({ ...form, accept: Boolean(c) })} className="mt-1" />
              <Label htmlFor="accept" className="text-sm text-muted-foreground font-normal leading-relaxed">
                Acepto la{" "}
                <a href="https://fortuxgolf.com/politica-de-privacidad/" target="_blank" rel="noopener" className="text-primary underline">
                  Política de Privacidad
                </a>
              </Label>
            </div>
            <Button type="submit" size="lg" disabled={sending} className="w-full bg-primary hover:bg-primary-glow">
              {sending ? "Enviando…" : "ENVIAR"}
            </Button>
          </form>
        </div>
      </section>

      {/* ALUMNOS */}
      <section className="py-20 md:py-28">
        <div className="container-fortux">
          <SectionHeading eyebrow="Comunidad" title="Algunos de nuestros alumnos y alumnas" align="center" />
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {STUDENTS.map((src, i) => (
              <div key={src} className={`overflow-hidden rounded-xl shadow ${i === 9 ? "col-span-2 sm:col-span-1" : ""}`}>
                <img src={src} alt={`Alumno Fortux ${i + 1}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAMPOS */}
      <section className="py-20 md:py-28 bg-secondary/20">
        <div className="container-fortux">
          <SectionHeading eyebrow="Red de campos" title="Campos colaboradores" align="center" />
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {COURSES.map((c) => (
              <div
                key={c.file}
                className="flex aspect-square items-center justify-center rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:shadow-elegant"
              >
                <img
                  src={`${CDN}/${c.file}`}
                  alt={`Campo de golf ${c.name}`}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20">
        <div className="container-fortux">
          <div className="rounded-3xl bg-gradient-to-br from-primary to-primary-glow p-10 md:p-14 text-primary-foreground text-center shadow-elegant">
            <h2 className="font-display text-3xl md:text-4xl font-bold">¿Listo para empezar?</h2>
            <p className="mt-3 text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              Reserva tu primera clase y descubre por qué nuestros alumnos confían en Fortux Golf.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" variant="secondary">
                <a href="#contacto">
                  <Check className="mr-2 h-4 w-4" /> Reservar ahora
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10">
                <a href={waLink("Hola, querría información sobre las clases de golf.")} target="_blank" rel="noopener">
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
