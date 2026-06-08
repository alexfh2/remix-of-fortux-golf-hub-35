
ALTER TABLE public.news
  ADD COLUMN IF NOT EXISTS gallery_images text[] DEFAULT '{}'::text[],
  ADD COLUMN IF NOT EXISTS whatsapp_text text,
  ADD COLUMN IF NOT EXISTS instagram_text text,
  ADD COLUMN IF NOT EXISTS scheduled_at timestamptz;
