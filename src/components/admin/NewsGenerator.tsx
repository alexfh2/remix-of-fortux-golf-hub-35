import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import {
  Sparkles, Loader2, Copy, Check, ChevronLeft, Send, Clock,
  MessageCircle, Instagram, RefreshCw, PenLine, Wand2, X, Plus, Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { generateNews } from "@/lib/news.functions";

type Style = "animado" | "casual" | "cronica";
type GeneratedContent = {
  title: string; excerpt: string; content: string;
  whatsapp: string; instagram: string;
};

const STYLES: { key: Style; label: string; emoji: string; desc: string }[] = [
  { key: "animado", label: "Animado", emoji: "🎉", desc: "Entusiasta y festivo" },
  { key: "casual", label: "Casual", emoji: "😊", desc: "Cercano y amigable" },
  { key: "cronica", label: "Crónica", emoji: "📰", desc: "Estilo diario deportivo" },
];

function slugify(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").slice(0, 80) || `noticia-${Date.now()}`;
}

export function NewsGenerator({ onSaved, onBack }: { onSaved: () => void; onBack: () => void }) {
  const generateFn = useServerFn(generateNews);
  const [mode, setMode] = useState<"ai" | "manual">("ai");
  const [step, setStep] = useState<"input" | "preview">("input");
  const [topic, setTopic] = useState("");
  const [details, setDetails] = useState("");
  const [style, setStyle] = useState<Style>("casual");
  const [coverUrl, setCoverUrl] = useState("");
  const [galleryInput, setGalleryInput] = useState("");
  const [gallery, setGallery] = useState<string[]>([]);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState<GeneratedContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [publishMode, setPublishMode] = useState<"draft" | "now" | "schedule">("now");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("09:00");

  const [editTitle, setEditTitle] = useState("");
  const [editExcerpt, setEditExcerpt] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editWhats, setEditWhats] = useState("");
  const [editIg, setEditIg] = useState("");

  const [uploading, setUploading] = useState<"cover" | "gallery" | null>(null);

  const uploadFile = async (file: File): Promise<string> => {
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await supabase.storage.from("news-images").upload(path, file, {
      cacheControl: "31536000", upsert: false, contentType: file.type,
    });
    if (error) throw error;
    const { data, error: sErr } = await supabase.storage.from("news-images")
      .createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
    if (sErr || !data) throw sErr ?? new Error("No URL");
    return data.signedUrl;
  };

  const handleCoverFile = async (file: File | null) => {
    if (!file) return;
    setUploading("cover");
    try { setCoverUrl(await uploadFile(file)); toast.success("Portada subida"); }
    catch (e) { toast.error("Error subiendo: " + (e instanceof Error ? e.message : "")); }
    finally { setUploading(null); }
  };

  const handleGalleryFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading("gallery");
    try {
      const urls = await Promise.all(Array.from(files).map(uploadFile));
      setGallery((g) => [...g, ...urls]);
      toast.success(`${urls.length} imagen(es) subida(s)`);
    } catch (e) { toast.error("Error subiendo: " + (e instanceof Error ? e.message : "")); }
    finally { setUploading(null); }
  };

  const addGallery = () => {
    const url = galleryInput.trim();
    if (!url) return;
    setGallery((g) => [...g, url]);
    setGalleryInput("");
  };
  const removeGallery = (i: number) => setGallery((g) => g.filter((_, idx) => idx !== i));

  const generate = async () => {
    if (!topic.trim() && !coverUrl && gallery.length === 0) {
      toast.error("Escribe un tema o añade una imagen");
      return;
    }
    setGenerating(true);
    try {
      const photos = [coverUrl, ...gallery].filter((u) => /^https?:\/\//i.test(u));
      const data = await generateFn({ data: { topic, details, style, photos } });
      setGenerated(data);
      setEditTitle(data.title);
      setEditExcerpt(data.excerpt);
      setEditContent(data.content);
      setEditWhats(data.whatsapp);
      setEditIg(data.instagram);
      setStep("preview");
    } catch (e) {
      toast.error("Error generando: " + (e instanceof Error ? e.message : "desconocido"));
    } finally {
      setGenerating(false);
    }
  };

  const goManualPreview = () => {
    if (!editTitle.trim() || !editContent.trim()) {
      toast.error("Como mínimo necesitas título y contenido");
      return;
    }
    setStep("preview");
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    toast.success("Copiado");
    setTimeout(() => setCopied(null), 2000);
  };

  const save = async () => {
    if (publishMode === "schedule" && !scheduleDate) {
      toast.error("Selecciona una fecha para programar");
      return;
    }
    setSaving(true);
    try {
      const isNow = publishMode === "now";
      const isDraft = publishMode === "draft";
      const scheduledAt = publishMode === "schedule"
        ? new Date(`${scheduleDate}T${scheduleTime}`).toISOString() : null;

      const record = {
        slug: slugify(editTitle),
        title: editTitle,
        excerpt: editExcerpt || null,
        content: editContent || null,
        cover_url: coverUrl || null,
        gallery_images: gallery,
        whatsapp_text: editWhats || null,
        instagram_text: editIg || null,
        is_published: isNow,
        published_at: isNow ? new Date().toISOString() : null,
        scheduled_at: scheduledAt,
      };

      const { error } = await supabase.from("news").insert(record as never);
      if (error) throw error;

      toast.success(
        isDraft ? "Borrador guardado"
        : isNow ? "Noticia publicada"
        : `Programada para ${scheduleDate} a las ${scheduleTime}`,
      );
      onSaved();
    } catch (e) {
      toast.error("Error guardando: " + (e instanceof Error ? e.message : "desconocido"));
    } finally {
      setSaving(false);
    }
  };

  if (step === "preview") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-4 w-4" /> Volver
          </button>
          <div className="flex gap-2">
            {generated ? (
              <Button variant="outline" size="sm" onClick={() => setStep("input")}>
                <RefreshCw className="mr-1.5 h-3.5 w-3.5" /> Regenerar
              </Button>
            ) : (
              <Button variant="outline" size="sm" onClick={() => setStep("input")}>
                <PenLine className="mr-1.5 h-3.5 w-3.5" /> Editar entrada
              </Button>
            )}
          </div>
        </div>

        <h2 className="font-display text-2xl font-bold">📝 Vista previa</h2>

        <div className="rounded-xl border border-border bg-card p-5 space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">🌐 Versión Web</h3>
          <div className="space-y-1.5">
            <Label>Título</Label>
            <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Extracto</Label>
            <Input value={editExcerpt} onChange={(e) => setEditExcerpt(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Contenido (Markdown)</Label>
            <Textarea rows={10} value={editContent} onChange={(e) => setEditContent(e.target.value)} />
          </div>
          {coverUrl && <img src={coverUrl} alt="" className="w-full max-h-64 object-cover rounded-lg" />}
          {gallery.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {gallery.map((g, i) => <img key={i} src={g} alt="" className="h-20 w-full object-cover rounded" />)}
            </div>
          )}
        </div>

        {(generated || editWhats || editIg) && (
          <>
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#25D366] flex items-center gap-1.5">
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </h3>
                <Button size="sm" variant="outline" onClick={() => copyToClipboard(editWhats, "wa")}>
                  {copied === "wa" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                </Button>
              </div>
              <Textarea rows={6} value={editWhats} onChange={(e) => setEditWhats(e.target.value)} />
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#E1306C] flex items-center gap-1.5">
                  <Instagram className="h-4 w-4" /> Instagram
                </h3>
                <Button size="sm" variant="outline" onClick={() => copyToClipboard(editIg, "ig")}>
                  {copied === "ig" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                </Button>
              </div>
              <Textarea rows={6} value={editIg} onChange={(e) => setEditIg(e.target.value)} />
            </div>
          </>
        )}

        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">📅 ¿Cuándo publicar?</h3>
          <div className="grid grid-cols-3 gap-3">
            {([
              { k: "now", icon: Send, label: "Publicar ya", desc: "Visible inmediatamente" },
              { k: "schedule", icon: Clock, label: "Programar", desc: "Elige fecha y hora" },
              { k: "draft", icon: PenLine, label: "Borrador", desc: "No publicar" },
            ] as const).map(({ k, icon: Icon, label, desc }) => (
              <button key={k} type="button" onClick={() => setPublishMode(k)}
                className={`p-3 rounded-xl border-2 text-left transition-all ${publishMode === k ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}>
                <Icon className="h-5 w-5 text-primary mb-1" />
                <p className="text-sm font-semibold">{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </button>
            ))}
          </div>
          {publishMode === "schedule" && (
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Fecha</Label>
                <Input type="date" value={scheduleDate} onChange={(e) => setScheduleDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]} />
              </div>
              <div className="space-y-1.5">
                <Label>Hora</Label>
                <Input type="time" value={scheduleTime} onChange={(e) => setScheduleTime(e.target.value)} />
              </div>
            </div>
          )}
        </div>

        <Button onClick={save} disabled={saving} className="w-full bg-primary hover:bg-primary-glow">
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {publishMode === "now" ? "Publicar noticia" : publishMode === "schedule" ? "Programar" : "Guardar borrador"}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ChevronLeft className="h-4 w-4" /> Volver al listado
      </button>

      <div className="flex gap-2">
        <button onClick={() => setMode("ai")}
          className={`flex-1 p-3 rounded-xl border-2 text-left transition-all ${mode === "ai" ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}>
          <Wand2 className="h-5 w-5 text-primary mb-1" />
          <p className="font-semibold text-sm">Generar con IA</p>
          <p className="text-xs text-muted-foreground">Título, contenido, WhatsApp e Instagram</p>
        </button>
        <button onClick={() => setMode("manual")}
          className={`flex-1 p-3 rounded-xl border-2 text-left transition-all ${mode === "manual" ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}>
          <PenLine className="h-5 w-5 text-primary mb-1" />
          <p className="font-semibold text-sm">Manual</p>
          <p className="text-xs text-muted-foreground">Escribe tú la noticia</p>
        </button>
      </div>

      {mode === "ai" ? (
        <>
          <div className="space-y-1.5">
            <Label>Tema de la noticia</Label>
            <Input value={topic} onChange={(e) => setTopic(e.target.value)}
              placeholder="Ej: Resultados de la 3ª prueba del Circuito Pitch & Putt" />
          </div>
          <div className="space-y-1.5">
            <Label>Detalles adicionales (opcional)</Label>
            <Textarea rows={4} value={details} onChange={(e) => setDetails(e.target.value)}
              placeholder="Datos, nombres de ganadores, fechas, lugar, contexto…" />
          </div>
          <div className="space-y-2">
            <Label>Estilo</Label>
            <div className="grid grid-cols-3 gap-2">
              {STYLES.map((s) => (
                <button key={s.key} type="button" onClick={() => setStyle(s.key)}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${style === s.key ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}>
                  <div className="text-xl mb-1">{s.emoji}</div>
                  <p className="text-sm font-semibold">{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="space-y-1.5">
            <Label>Título *</Label>
            <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Extracto</Label>
            <Input value={editExcerpt} onChange={(e) => setEditExcerpt(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Contenido (Markdown) *</Label>
            <Textarea rows={8} value={editContent} onChange={(e) => setEditContent(e.target.value)} />
          </div>
        </>
      )}

      <div className="space-y-1.5">
        <Label>Imagen de portada</Label>
        <div className="flex gap-2">
          <Input type="url" value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)}
            placeholder="Pega una URL o sube un archivo" />
          <label className="inline-flex items-center justify-center gap-1.5 px-3 rounded-md border border-input bg-background hover:bg-accent cursor-pointer text-sm whitespace-nowrap">
            {uploading === "cover" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            <span>Subir</span>
            <input type="file" accept="image/*" className="hidden"
              onChange={(e) => { handleCoverFile(e.target.files?.[0] ?? null); e.target.value = ""; }} />
          </label>
        </div>
        {coverUrl && <img src={coverUrl} alt="" className="mt-2 h-32 rounded-md object-cover" />}
      </div>

      <div className="space-y-2">
        <Label>Galería de imágenes</Label>
        <div className="flex gap-2">
          <Input type="url" value={galleryInput} onChange={(e) => setGalleryInput(e.target.value)}
            placeholder="Pega una URL…"
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addGallery(); } }} />
          <Button type="button" variant="outline" onClick={addGallery}><Plus className="h-4 w-4" /></Button>
          <label className="inline-flex items-center justify-center gap-1.5 px-3 rounded-md border border-input bg-background hover:bg-accent cursor-pointer text-sm whitespace-nowrap">
            {uploading === "gallery" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            <span>Subir</span>
            <input type="file" accept="image/*" multiple className="hidden"
              onChange={(e) => { handleGalleryFiles(e.target.files); e.target.value = ""; }} />
          </label>
        </div>
        {gallery.length > 0 && (
          <div className="grid grid-cols-4 gap-2">
            {gallery.map((g, i) => (
              <div key={i} className="relative group">
                <img src={g} alt="" className="h-20 w-full object-cover rounded" />
                <button type="button" onClick={() => removeGallery(i)}
                  className="absolute top-1 right-1 rounded-full bg-background/90 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {mode === "ai" ? (
        <Button onClick={generate} disabled={generating} className="w-full bg-primary hover:bg-primary-glow">
          {generating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
          {generating ? "Generando…" : "Generar noticia con IA"}
        </Button>
      ) : (
        <Button onClick={goManualPreview} className="w-full bg-primary hover:bg-primary-glow">
          Continuar a vista previa
        </Button>
      )}
    </div>
  );
}
