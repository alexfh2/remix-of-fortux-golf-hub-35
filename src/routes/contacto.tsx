import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent, type ReactNode } from "react";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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

const inputClass =
  "mt-1.5 h-11 bg-white/[0.04] border-white/[0.12] text-[#F4F5F0] placeholder:text-white/[0.38] rounded-lg px-4 transition-colors focus-visible:border-[#B9D986] focus-visible:ring-1 focus-visible:ring-[#B9D986]/20 focus-visible:outline-none";

const textareaClass =
  "mt-1.5 min-h-[120px] bg-white/[0.04] border-white/[0.12] text-[#F4F5F0] placeholder:text-white/[0.38] rounded-lg px-4 py-3 transition-colors focus-visible:border-[#B9D986] focus-visible:ring-1 focus-visible:ring-[#B9D986]/20 focus-visible:outline-none resize-y";

function ContactCard({
  href,
  icon,
  title,
  desc,
  external,
}: {
  href: string;
  icon: ReactNode;
  title: string;
  desc: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener" : undefined}
      className="group flex items-center gap-4 rounded-[10px] border border-white/10 bg-[#0B0D0E] p-4 transition-colors duration-300 hover:border-[#B9D986]/60"
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-white/10 bg-[#0B0D0E] text-[#B9D986] transition-colors duration-300 group-hover:border-[#B9D986]/40">
        {icon}
      </span>
      <div className="min-w-0">
        <div className="truncate font-semibold text-[#F4F5F0]">{title}</div>
        <div className="text-sm text-[#F4F5F0]/55">{desc}</div>
      </div>
    </a>
  );
}

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
    <section className="relative bg-[#050606] py-16 md:py-24">
      <div className="container-fortux relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#B9D986]">
              {t("con.eyebrow")}
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold text-[#F4F5F0] leading-[1.08] text-balance md:text-5xl">
              {t("con.title")}
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-[#F4F5F0]/60 md:text-lg">
              {t("con.subtitle")}
            </p>

            <div className="mt-10 space-y-4">
              <ContactCard
                href={waLink()}
                external
                icon={<MessageCircle className="h-5 w-5" />}
                title={t("con.wa")}
                desc={t("con.wa.desc")}
              />
              <ContactCard
                href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                icon={<Phone className="h-5 w-5" />}
                title={SITE.phone}
                desc={t("con.phone.desc")}
              />
              <ContactCard
                href={`mailto:${SITE.email}`}
                icon={<Mail className="h-5 w-5" />}
                title={SITE.email}
                desc={t("con.email.desc")}
              />
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0A0B0D] p-6 md:p-8">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#B9D986]/25 to-transparent" />
            <form onSubmit={submit} className="relative space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-[#F4F5F0]/75">
                    {t("con.form.name")}
                  </Label>
                  <Input id="name" name="name" required maxLength={100} className={inputClass} />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-[#F4F5F0]/75">
                    {t("con.form.email")}
                  </Label>
                  <Input id="email" name="email" type="email" required maxLength={255} className={inputClass} />
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-[#F4F5F0]/75">
                    {t("con.form.phone")}
                  </Label>
                  <Input id="phone" name="phone" type="tel" maxLength={20} className={inputClass} />
                </div>
                <div>
                  <Label htmlFor="subject" className="text-sm font-medium text-[#F4F5F0]/75">
                    {t("con.form.subject")}
                  </Label>
                  <Input id="subject" name="subject" required maxLength={120} className={inputClass} />
                </div>
              </div>
              <div>
                <Label htmlFor="message" className="text-sm font-medium text-[#F4F5F0]/75">
                  {t("con.form.message")}
                </Label>
                <Textarea id="message" name="message" required maxLength={1000} className={textareaClass} />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="h-11 w-full rounded-md bg-[#B9D986] px-5 text-sm font-semibold text-[#050606] transition-colors duration-300 hover:bg-[#c8e49e] disabled:opacity-60"
              >
                {sending ? t("con.form.sending") : t("con.form.send")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
