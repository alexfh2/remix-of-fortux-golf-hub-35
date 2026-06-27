
-- 1) Tighten news-images storage policies to editor/admin/super_admin (matching review-avatars pattern)
DROP POLICY IF EXISTS news_images_auth_insert ON storage.objects;
DROP POLICY IF EXISTS news_images_auth_update ON storage.objects;
DROP POLICY IF EXISTS news_images_auth_delete ON storage.objects;

CREATE POLICY news_images_auth_insert ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'news-images'
    AND (
      public.has_role(auth.uid(), 'editor'::public.app_role)
      OR public.has_role(auth.uid(), 'admin'::public.app_role)
      OR public.has_role(auth.uid(), 'super_admin'::public.app_role)
    )
  );

CREATE POLICY news_images_auth_update ON storage.objects
  FOR UPDATE TO authenticated
  USING (
    bucket_id = 'news-images'
    AND (
      public.has_role(auth.uid(), 'editor'::public.app_role)
      OR public.has_role(auth.uid(), 'admin'::public.app_role)
      OR public.has_role(auth.uid(), 'super_admin'::public.app_role)
    )
  );

CREATE POLICY news_images_auth_delete ON storage.objects
  FOR DELETE TO authenticated
  USING (
    bucket_id = 'news-images'
    AND (
      public.has_role(auth.uid(), 'editor'::public.app_role)
      OR public.has_role(auth.uid(), 'admin'::public.app_role)
      OR public.has_role(auth.uid(), 'super_admin'::public.app_role)
    )
  );

-- 2) Revoke public EXECUTE on SECURITY DEFINER functions to limit API exposure.
-- Trigger functions never need direct execution; revoke from all client roles.
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

-- has_role is used inside RLS policies; keep it callable by authenticated but block anon and PUBLIC.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
