El alcance que describes es muy grande (web pública + multidioma + panel admin completo + auth + roles + CRUDs + integración con la plataforma del circuito). Construirlo todo de una vez resultaría en un MVP a medias y difícil de iterar. Propongo dividirlo en fases y empezar ya con la **Fase 1**, que es la que da valor visible inmediato.

## Fase 1 — Web corporativa pública (lo que voy a construir ahora)

Marketing site premium, mobile-first, con la identidad Fortux (#002F5F primario, #B9D986 secundario, neutros). Contenido estático/hardcodeado pero estructurado para conectarse a Supabase después sin rehacer UI.

Rutas (cada una con su `head()` SEO):
- `/` — Hero con headline, 3 CTAs (Reparar / Presupuesto / WhatsApp), bloques de servicios destacados, hero especial Circuito Pitch & Putt, próximas competiciones (mock), reseñas, noticias recientes, CTA final.
- `/servicios` — Cards de reparación, grips, fitting, personalización, mantenimiento, asesoramiento.
- `/tienda` — Catálogo con categorías (grips, palos, accesorios, material técnico, mantenimiento). Cada producto con CTA WhatsApp. Sin carrito.
- `/academia` — Clases individuales/grupales, formación, CTA reservar.
- `/circuito` — Sección premium con presentación, ranking mock, próximos torneos, botón externo a https://fortux.fairwaystudio.ai/
- `/noticias` — Listado de noticias mock.
- `/galeria` — Grid filtrable.
- `/contacto` — Formulario + WhatsApp/teléfono/email.

Extras Fase 1:
- Navbar sticky con selector de idioma (UI funcional, traducciones reales en Fase 2).
- Footer corporativo con legal/redes.
- Botón flotante de WhatsApp.
- `robots.txt` y `sitemap.xml`.
- Diseño con `oklch` tokens en `src/styles.css`, animaciones suaves, hover en cards, parallax ligero en el hero del circuito.

## Fase 2 — Backend y datos dinámicos
- Activar Lovable Cloud (Supabase).
- Esquema: `products`, `news`, `reviews`, `media`, `translations`, `app_role`, `user_roles`.
- RLS + función `has_role`.
- Conectar tienda, noticias, reseñas y galería a la base de datos.
- Integración con la plataforma del circuito para próximos torneos/ranking (necesito que me confirmes si expone API/JSON o si scrapeamos).

## Fase 3 — Auth y panel admin
- Supabase Auth (email/password).
- Roles: Super Admin / Admin / Editor / Organizador / Usuario.
- Seed del usuario `admin` con forzado de cambio de contraseña.
- Panel `/admin` con CRUDs de noticias, productos, reseñas, media, usuarios.

## Fase 4 — i18n completo
- ES / CAT / EN / FR alimentados desde tabla `translations` editable desde admin.
- Persistencia en `localStorage`.

## Preguntas que necesito resolver antes de Fase 2/3 (no bloquean Fase 1)
1. ¿La plataforma del circuito (fortux.fairwaystudio.ai) expone API/JSON pública para próximos torneos y ranking, o tendremos que hacer scraping / introducirlos manualmente?
2. Número de WhatsApp, email de contacto, teléfono y redes sociales reales para el footer y CTAs.
3. ¿Tienes logo de Fortux para subir, o lo represento tipográficamente en Fase 1?

## Lo que NO entra en ningún caso (confirmado por ti)
Ecommerce, pasarela de pago, inscripciones, CRM, app nativa, Google Maps, gestión interna del circuito.

---

Si te parece bien, **arranco ya con la Fase 1**. Puedes responderme las 3 preguntas en paralelo y las aplico en cuanto las tenga. Cuando Fase 1 esté lista y la valides, activo Lovable Cloud y empezamos Fase 2.