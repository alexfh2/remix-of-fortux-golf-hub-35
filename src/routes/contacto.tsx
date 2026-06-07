import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SectionHeading } from "@/components/site/SectionHeading";
import { toast } from "sonner";
import { SITE, waLink } from "@/lib/site";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — Fortux" },
      { name: "description", content: "Contacta con Fortux: formulario, WhatsApp, teléfono y email." },
      { property: "og:title", content: "Contacto — Fortux" },
      { property: "og:description", content: "Estamos a tu disposición para cualquier consulta." },
      { property: "og:url", content: "/contacto" },
    ],
    links: [{ rel: "canonical", href: "/contacto" }],
  }),
  component: Page,
});

function Page() {
  const [sending, setSending] = useState(false);
  const { t } = useI18n();

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      (e.target as HTMLFormElement).reset();
      toast.success(t("con.form.ok"), { description: t("con.form.okDesc") });
    }, 700);
  };

  return (
    <section className="py-20 md:py-28">
      <div className="container-fortux grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow={t("con.eyebrow")} title={t("con.title")} subtitle={t("con.subtitle")} />
          <div className="mt-8 space-y-4">
            <a href={waLink()} target="_blank" rel="noopener" className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 hover:bg-muted transition-colors">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-whatsapp text-whatsapp-foreground"><MessageCircle className="h-5 w-5" /></span>
              <div>
                <div className="font-semibold">{t("con.wa")}</div>
                <div className="text-sm text-muted-foreground">{t("con.wa.desc")}</div>
              </div>
            </a>
            <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 hover:bg-muted transition-colors">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary text-primary-foreground"><Phone className="h-5 w-5" /></span>
              <div>
                <div className="font-semibold">{SITE.phone}</div>
                <div className="text-sm text-muted-foreground">{t("con.phone.desc")}</div>
              </div>
            </a>
            <a href={`mailto:${SITE.email}`} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 hover:bg-muted transition-colors">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary text-primary-foreground"><Mail className="h-5 w-5" /></span>
              <div>
                <div className="font-semibold">{SITE.email}</div>
                <div className="text-sm text-muted-foreground">{t("con.email.desc")}</div>
              </div>
            </a>
          </div>
        </div>

        <form onSubmit={submit} className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-soft space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="name">{t("con.form.name")}</Label>
              <Input id="name" name="name" required maxLength={100} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="email">{t("con.form.email")}</Label>
              <Input id="email" name="email" type="email" required maxLength={255} className="mt-1.5" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="phone">{t("con.form.phone")}</Label>
              <Input id="phone" name="phone" type="tel" maxLength={20} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="subject">{t("con.form.subject")}</Label>
              <Input id="subject" name="subject" required maxLength={120} className="mt-1.5" />
            </div>
          </div>
          <div>
            <Label htmlFor="message">{t("con.form.message")}</Label>
            <Textarea id="message" name="message" required maxLength={1000} rows={5} className="mt-1.5" />
          </div>
          <Button type="submit" disabled={sending} className="w-full bg-primary hover:bg-primary-glow">
            {sending ? t("con.form.sending") : t("con.form.send")}
          </Button>
        </form>
      </div>
    </section>
  );
}
