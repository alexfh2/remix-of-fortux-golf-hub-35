import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { waLink } from "@/lib/site";

import g_Grips01GolfPrideCp2ProRedBlackJumbo from "@/assets/grips/grips-01-golf-pride-cp2-pro-red-black-jumbo.jpg.asset.json";
import g_Grips01GolfPrideCp2ProWrapStandardRed from "@/assets/grips/grips-01-golf-pride-cp2-pro-wrap-standard-red.jpg.asset.json";
import g_Grips01GolfPrideCp2WrapLadieBlack from "@/assets/grips/grips-01-golf-pride-cp2-wrap-ladie-black.jpg.asset.json";
import g_Grips01GolfPrideCpxStand from "@/assets/grips/grips-01-golf-pride-cpx-stand.jpg.asset.json";
import g_Grips01GolfPrideMcMultiCompoundRedWhiteMidsize from "@/assets/grips/grips-01-golf-pride-mc-multi-compound-red-white-midsize.jpg.asset.json";
import g_Grips01GolfPrideNewDecadeMultiCompoundAlignWhiteLineaRojaStand from "@/assets/grips/grips-01-golf-pride-new-decade-multi-compound-align-white-linea-roja-stand.jpg.asset.json";
import g_Grips01GolfPrideNewDecadeMultiCompoundMidsizeAlignWhiteLineaR from "@/assets/grips/grips-01-golf-pride-new-decade-multi-compound-midsize-align-white-linea-r.jpg.asset.json";
import g_Grips01GolfPrideNewDecadeMultiCompoundPlus4GreyJumbo from "@/assets/grips/grips-01-golf-pride-new-decade-multi-compound-plus-4-grey-jumbo.jpg.asset.json";
import g_Grips01GolfPrideNewDecadeMultiCompoundPlus4OrangeStandard from "@/assets/grips/grips-01-golf-pride-new-decade-multi-compound-plus-4-orange-standard.jpg.asset.json";
import g_Grips01GolfPrideNewDecadeMultiCompoundPlus4RedStandard from "@/assets/grips/grips-01-golf-pride-new-decade-multi-compound-plus-4-red-standard.jpg.asset.json";
import g_Grips01GolfPrideNewDecadeMultiCompoundPlusAlignStandYMidsizeGrey from "@/assets/grips/grips-01-golf-pride-new-decade-multi-compound-plus-align-stand-y-midsize-grey.jpg.asset.json";
import g_Grips01GolfPridePlus4BlueBlackStand from "@/assets/grips/grips-01-golf-pride-plus-4-blue-black-stand.jpg.asset.json";
import g_Grips01GolfPridePlus4MidsizeBlue from "@/assets/grips/grips-01-golf-pride-plus-4-midsize-blue.jpg.asset.json";
import g_Grips01GolfPrideTourVelvetJuniorStandMidsizeJumbo from "@/assets/grips/grips-01-golf-pride-tour-velvet-junior-stand-midsize-jumbo.jpg.asset.json";
import g_Grips01GolfPrideZGripAlignStand from "@/assets/grips/grips-01-golf-pride-z-grip-align-stand.jpg.asset.json";
import g_Grips01GolfPrideZGripStandYMidsize from "@/assets/grips/grips-01-golf-pride-z-grip-stand-y-midsize.jpg.asset.json";
import g_Grips01LamkinCrossline360StandCord from "@/assets/grips/grips-01-lamkin-crossline-360-stand-cord.jpg.asset.json";
import g_Grips01LamkinCrossline360StandardWhiteBlack from "@/assets/grips/grips-01-lamkin-crossline-360-standard-white-black.jpg.asset.json";
import g_Grips01LamkinOversizeJumbo from "@/assets/grips/grips-01-lamkin-oversize-jumbo.jpg.asset.json";
import g_Grips01SuperstrokeCrossComfortStandBlack from "@/assets/grips/grips-01-superstroke-cross-comfort-stand-black.jpg.asset.json";
import g_Grips024LessWinn2020VsnJumboLitePutterGrip1 from "@/assets/grips/grips-02-4-less-winn-2020-vsn-jumbo-lite-putter-grip-1.jpg.asset.json";
import g_Grips02GolfPrideProOnly from "@/assets/grips/grips-02-golf-pride-pro-only.jpg.asset.json";
import g_Grips02SuperStroke10Pt from "@/assets/grips/grips-02-super-stroke-10-pt.jpg.asset.json";
import g_Grips02SuperStrokeTraxionClaw10 from "@/assets/grips/grips-02-super-stroke-traxion-claw-10.jpg.asset.json";
import g_Grips02SuperStrokeTraxionClaw20 from "@/assets/grips/grips-02-super-stroke-traxion-claw-20.jpg.asset.json";
import g_Grips02SuperStrokeTraxionFlatso10BlackWhite from "@/assets/grips/grips-02-super-stroke-traxion-flatso-10-black-white.jpg.asset.json";
import g_Grips02SuperStrokeTraxionFlatso20E1731351413180 from "@/assets/grips/grips-02-super-stroke-traxion-flatso-20-e1731351413180.jpg.asset.json";
import g_Grips02SuperStrokeTraxionFlatso20Xl20 from "@/assets/grips/grips-02-super-stroke-traxion-flatso-20-xl-20.jpg.asset.json";
import g_Grips02SuperStrokeTraxionFlatso30 from "@/assets/grips/grips-02-super-stroke-traxion-flatso-30.jpg.asset.json";
import g_Grips02SuperStrokeTraxionPistolGt10 from "@/assets/grips/grips-02-super-stroke-traxion-pistol-gt-10.jpg.asset.json";
import g_Grips02SuperStrokeTraxionSs2rSquareRed from "@/assets/grips/grips-02-super-stroke-traxion-ss2r-square-red.jpg.asset.json";
import g_Grips02SuperStrokeTraxionTour10 from "@/assets/grips/grips-02-super-stroke-traxion-tour-10.jpg.asset.json";
import g_Grips02SuperStrokeTraxionTour20 from "@/assets/grips/grips-02-super-stroke-traxion-tour-20.jpg.asset.json";
import g_Grips02SuperStrokeTraxionTour30 from "@/assets/grips/grips-02-super-stroke-traxion-tour-30.jpg.asset.json";
import g_Grips02SuperStrokeTraxionWristlockBlackGreenOrange from "@/assets/grips/grips-02-super-stroke-traxion-wristlock-black-green-orange.jpg.asset.json";
import g_Grips02SuperstrokesTraxionTour50 from "@/assets/grips/grips-02-superstrokes-traxion-tour-50.jpg.asset.json";
import g_Grips02WinnDritacJumboLite from "@/assets/grips/grips-02-winn-dritac-jumbo-lite.jpg.asset.json";
import g_Grips02WinnExcelVisionMedallistRedBlackBlackBlue1 from "@/assets/grips/grips-02-winn-excel-vision-medallist-red-black-black-blue-1.jpg.asset.json";
import g_Grips02WinnNtpBlackBlue from "@/assets/grips/grips-02-winn-ntp-black-blue.jpg.asset.json";
import g_Grips02WinnProJumboGripCool160GreyYBlack from "@/assets/grips/grips-02-winn-pro-jumbo-grip-cool-160-grey-y-black.jpg.asset.json";
import g_Grips02WinnProStandarPutterGrip116118120132 from "@/assets/grips/grips-02-winn-pro-standar-putter-grip-116-118-120-132.jpg.asset.json";
import g_Grips02WinnTourPistolVsnBlackBlackRed from "@/assets/grips/grips-02-winn-tour-pistol-vsn-black-black-red.jpg.asset.json";
import g_Grips02WinnWrapLongBlack from "@/assets/grips/grips-02-winn-wrap-long-black.jpg.asset.json";
import g_Grips02WinnWrapLongRedBlack from "@/assets/grips/grips-02-winn-wrap-long-red-black.jpg.asset.json";
import g_LamkinUtxGreenCordStandard from "@/assets/grips/lamkin-utx-green-cord-standard.jpg.asset.json";
import g_TourWrap2gRojoAzul from "@/assets/grips/tour-wrap-2g-rojo-azul.jpg.asset.json";
import m_Garsen from "@/assets/marcas/garsen.jpg.asset.json";
import m_GolfPride from "@/assets/marcas/golf-pride.jpg.asset.json";
import m_Lamkin from "@/assets/marcas/lamkin.jpg.asset.json";
import m_Odissey from "@/assets/marcas/odissey.jpg.asset.json";
import m_P2 from "@/assets/marcas/p2.jpg.asset.json";
import m_WinGrips from "@/assets/marcas/win-grips.jpg.asset.json";
import m_SuperStroke from "@/assets/marcas/super-stroke.jpg.asset.json";

const IRONS = [
  { name: "Lamkin Crossline 360 Standard White Black", price: "16.00€", img: g_Grips01LamkinCrossline360StandardWhiteBlack.url },
  { name: "Golf Pride Cp2 Wrap Ladie Black", price: "16.00€", img: g_Grips01GolfPrideCp2WrapLadieBlack.url },
  { name: "Winn Wrap Long Black", price: "16.00€", img: g_Grips02WinnWrapLongBlack.url },
  { name: "Golf Pride Tour Velvet Junior Stand Midsize Jumbo", price: "17.00€", img: g_Grips01GolfPrideTourVelvetJuniorStandMidsizeJumbo.url },
  { name: "Golf Pride Tour Velvet Stand y Midsize Align", price: "13.00 – 19.00€", img: g_Grips01GolfPrideTourVelvetJuniorStandMidsizeJumbo.url },
  { name: "Lamkin Oversize Jumbo", price: "19.00€", img: g_Grips01LamkinOversizeJumbo.url },
  { name: "Golf Pride Cp2 Pro Wrap Standard Red", price: "19.00€", img: g_Grips01GolfPrideCp2ProWrapStandardRed.url },
  { name: "Super Stroke Cross Comfort Stand Black", price: "18.00€", img: g_Grips01SuperstrokeCrossComfortStandBlack.url },
  { name: "Tour Wrap 2G disponibles en rojo y azul", price: "18.00€", img: g_TourWrap2gRojoAzul.url },
  { name: "Golf Pride Mcc Teams Light Blue White", price: "21.00€", img: g_Grips01GolfPridePlus4MidsizeBlue.url },
  { name: "Golf Pride Mc Multi Compound Stand Red White Midsize", price: "21.00€", img: g_Grips01GolfPrideMcMultiCompoundRedWhiteMidsize.url },
  { name: "Lamkin Crossline 360 Stand Cord", price: "20.00€", img: g_Grips01LamkinCrossline360StandCord.url },
  { name: "Golf pride Cpx stand", price: "20.00€", img: g_Grips01GolfPrideCpxStand.url },
  { name: "Golf Pride New Decade Multi Compound Plus 4 Orange Standard", price: "21.00€", img: g_Grips01GolfPrideNewDecadeMultiCompoundPlus4OrangeStandard.url },
  { name: "Golf Pride New Decade Multi Compound Plus 4 Red Stand", price: "21.00€", img: g_Grips01GolfPrideNewDecadeMultiCompoundPlus4RedStandard.url },
  { name: "Golf Pride Plus 4 Blue Black Stand", price: "21.00€", img: g_Grips01GolfPridePlus4BlueBlackStand.url },
  { name: "Lamkin UTx green cord standard", price: "20.00€", img: g_LamkinUtxGreenCordStandard.url },
  { name: "Golf Pride New Decade Multi Compound Align White – Línea Roja Stand", price: "21.00€", img: g_Grips01GolfPrideNewDecadeMultiCompoundAlignWhiteLineaRojaStand.url },
  { name: "Golf Pride Cp2 Pro Red Black Jumbo", price: "22.00€", img: g_Grips01GolfPrideCp2ProRedBlackJumbo.url },
  { name: "Golf Pride New Decade Multi Compound Plus 4 Grey Jumbo", price: "22.00€", img: g_Grips01GolfPrideNewDecadeMultiCompoundPlus4GreyJumbo.url },
  { name: "Golf Pride Plus Midsize Blue", price: "21.00€", img: g_Grips01GolfPridePlus4MidsizeBlue.url },
  { name: "Golf Pride Z Grip Stand y Midsize", price: "22.00€", img: g_Grips01GolfPrideZGripStandYMidsize.url },
  { name: "Golf Pride Z Grip Align Stand", price: "22.00€", img: g_Grips01GolfPrideZGripAlignStand.url },
  { name: "Golf Pride New Decade Multi Compound Plus 4 Align Stand y Midsize Grey", price: "22.00€", img: g_Grips01GolfPrideNewDecadeMultiCompoundPlusAlignStandYMidsizeGrey.url },
  { name: "Golf Pride New Decade Multi Compound Midsize Align White Linea R", price: "22.00€", img: g_Grips01GolfPrideNewDecadeMultiCompoundMidsizeAlignWhiteLineaR.url },
];

const PUTTERS = [
  { name: "Winn Tour Pistol Vsn Black / Black Red", price: "32.00€", img: g_Grips02WinnTourPistolVsnBlackBlackRed.url },
  { name: "Winn Excel Vision Medallist Red Black Blue", price: "32.00€", img: g_Grips02WinnExcelVisionMedallistRedBlackBlackBlue1.url },
  { name: "Winn Dritac Pistol Dark Grey Mid Size", price: "35.00€", img: g_Grips02WinnDritacJumboLite.url },
  { name: "Golf Pride Pro Only", price: "32.00€", img: g_Grips02GolfPrideProOnly.url },
  { name: "Winn Dritac Jumbo Lite", price: "38.00€", img: g_Grips02WinnDritacJumboLite.url },
  { name: "Winn Ntp Black y Blue", price: "38.00€", img: g_Grips02WinnNtpBlackBlue.url },
  { name: "Super Stroke Traxion Tour 1.0", price: "38.00€", img: g_Grips02SuperStrokeTraxionTour10.url },
  { name: "Winn Wrap Long Red Black", price: "50.00€", img: g_Grips02WinnWrapLongRedBlack.url },
  { name: "Winn Pro Standars Putter Grip (1.16-1.18-1.20-1.32)", price: "38.00€", img: g_Grips02WinnProStandarPutterGrip116118120132.url },
  { name: "Super Stroke Traxion Flatso 1.0 Black White", price: "38.00€", img: g_Grips02SuperStrokeTraxionFlatso10BlackWhite.url },
  { name: "Super Stroke Traxion Claw 1.0", price: "38.00€", img: g_Grips02SuperStrokeTraxionClaw10.url },
  { name: "Super Stroke 1.0 PT", price: "35.00€", img: g_Grips02SuperStroke10Pt.url },
  { name: "4 Less Winn 2020 VSN Jumbo Lite Putter Grip (Todos los colores)", price: "38.00€", img: g_Grips024LessWinn2020VsnJumboLitePutterGrip1.url },
  { name: "Super Stroke Traxion Flatso 2.0", price: "40.00€", img: g_Grips02SuperStrokeTraxionFlatso20E1731351413180.url },
  { name: "Super Stroke Traxion Pistol GT 1.0", price: "38.00€", img: g_Grips02SuperStrokeTraxionPistolGt10.url },
  { name: "Super Stroke Traxion Claw 2.0", price: "38.00€", img: g_Grips02SuperStrokeTraxionClaw20.url },
  { name: "Super Stroke Traxion Tour 3.0", price: "40.00€", img: g_Grips02SuperStrokeTraxionTour30.url },
  { name: "Super Stroke Traxion Tour 2.0", price: "40.00€", img: g_Grips02SuperStrokeTraxionTour20.url },
  { name: "Super Stroke Traxion Pistol GT 2.0", price: "40.00€", img: g_Grips02SuperStrokeTraxionClaw10.url },
  { name: "Super Stroke Traxion SS2R Square Red", price: "40.00€", img: g_Grips02SuperStrokeTraxionSs2rSquareRed.url },
  { name: "Super Stroke Traxion Flatso 3.0", price: "40.00€", img: g_Grips02SuperStrokeTraxionFlatso30.url },
  { name: "Winn Pro Jumbo Grip Cool 1.60 Grey y Black", price: "45.00€", img: g_Grips02WinnProJumboGripCool160GreyYBlack.url },
  { name: "Superstrokes Traxion Tour 5.0", price: "45.00€", img: g_Grips02SuperstrokesTraxionTour50.url },
  { name: "Super Stroke Traxion Flatso 2.0 XL + 2.0", price: "50.00€", img: g_Grips02SuperStrokeTraxionFlatso20Xl20.url },
  { name: "Super Stroke Traxion Wristlock Black / Green / Orange", price: "50.00€", img: g_Grips02SuperStrokeTraxionWristlockBlackGreenOrange.url },
];

const BRANDS = [
  { name: "Garsen", img: m_Garsen.url },
  { name: "Golf Pride", img: m_GolfPride.url },
  { name: "Lamkin", img: m_Lamkin.url },
  { name: "Odyssey", img: m_Odissey.url },
  { name: "P2", img: m_P2.url },
  { name: "Winn", img: m_WinGrips.url },
  { name: "Super Stroke", img: m_SuperStroke.url },
];

export const Route = createFileRoute("/tienda")({
  head: () => ({
    meta: [
      { title: "Comprar grips de golf — Fortux" },
      {
        name: "description",
        content:
          "Catálogo de grips para hierro, madera y putter de Golf Pride, Lamkin, Winn y Super Stroke. Mano de obra incluida en el precio.",
      },
      { property: "og:title", content: "Comprar grips de golf — Fortux" },
      {
        property: "og:description",
        content: "Más de 45 modelos de grips con instalación incluida.",
      },
      { property: "og:url", content: "/tienda" },
      { property: "og:image", content: IRONS[0].img },
    ],
    links: [{ rel: "canonical", href: "/tienda" }],
  }),
  component: Page,
});

const TABS = [
  { id: "iron", label: "Hierro y Madera", count: IRONS.length },
  { id: "putter", label: "Putters", count: PUTTERS.length },
] as const;

type TabId = (typeof TABS)[number]["id"];

function ProductGrid({ items }: { items: { name: string; price: string; img: string }[] }) {
  return (
    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((p, i) => (
        <article
          key={`${p.name}-${i}`}
          className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-elegant"
        >
          <div className="relative aspect-square overflow-hidden bg-secondary/20">
            <img
              src={p.img}
              alt={p.name}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="p-5">
            <h3 className="font-display text-base font-bold leading-snug min-h-[2.6rem]">{p.name}</h3>
            <div className="mt-3 flex items-center justify-between gap-2">
              <span className="font-display text-lg font-bold text-primary">{p.price}</span>
              <Button
                asChild
                size="sm"
                className="bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90"
              >
                <a
                  href={waLink(`Hola, querría información del grip: ${p.name} (${p.price}).`)}
                  target="_blank"
                  rel="noopener"
                >
                  <MessageCircle className="mr-1.5 h-4 w-4" /> Pide info
                </a>
              </Button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function Page() {
  const [tab, setTab] = useState<TabId>("iron");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", accept: false });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.accept) {
      toast.error("Debes aceptar la Política de Privacidad");
      return;
    }
    setSending(true);
    const msg = `Hola, soy ${form.name} (${form.email} · ${form.phone}).\n\n${form.message}`;
    window.open(waLink(msg), "_blank");
    setTimeout(() => {
      toast.success("Consulta preparada", { description: "Te hemos abierto WhatsApp para enviarla." });
      setForm({ name: "", email: "", phone: "", message: "", accept: false });
      setSending(false);
    }, 400);
  };

  const items = tab === "iron" ? IRONS : PUTTERS;

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-primary/90 to-primary">
        <div className="container-fortux relative py-20 md:py-28 text-primary-foreground">
          <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary-foreground">
            Tienda Fortux
          </span>
          <h1 className="mt-4 font-display text-4xl md:text-6xl font-bold text-balance max-w-3xl">
            Nuestro catálogo de grips disponibles
          </h1>
          <p className="mt-5 max-w-2xl text-lg md:text-xl text-primary-foreground/90 leading-relaxed">
            Mejora tu rendimiento en el campo con grips renovados y de calidad. Nuestro servicio de reparación de{" "}
            <strong>grips para palos de golf</strong> asegura el mejor agarre y confort, adaptado a tu juego.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="secondary">
              <a href="#contacto">Contáctanos</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10">
              <a href="#catalogo">Ver catálogo</a>
            </Button>
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalogo" className="py-20 md:py-28">
        <div className="container-fortux">
          <SectionHeading
            eyebrow={tab === "iron" ? "Hierro y Madera" : "Putters"}
            title={tab === "iron" ? "Grips para Hierro y Madera" : "Grips para Putters"}
            subtitle="La mano de obra está incluida en el precio."
            align="center"
          />

          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-full border border-border bg-card p-1 shadow-sm">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                    tab === t.id
                      ? "bg-primary text-primary-foreground shadow"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t.label}
                  <span className="ml-2 text-xs opacity-70">{t.count}</span>
                </button>
              ))}
            </div>
          </div>

          <ProductGrid items={items} />
        </div>
      </section>

      {/* MARCAS */}
      <section className="py-20 md:py-28 bg-secondary/20">
        <div className="container-fortux">
          <SectionHeading eyebrow="Partners" title="Marcas colaboradoras" align="center" />
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
            {BRANDS.map((b) => (
              <div
                key={b.name}
                className="flex aspect-square items-center justify-center rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:shadow-elegant"
              >
                <img
                  src={b.img}
                  alt={`Marca ${b.name}`}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section id="contacto" className="py-20 md:py-28">
        <div className="container-fortux max-w-3xl">
          <SectionHeading
            eyebrow="Contacto"
            title="¿Necesitas un grip nuevo? Déjanos un mensaje y te asesoramos"
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
    </>
  );
}
