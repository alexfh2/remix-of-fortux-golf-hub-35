
CREATE POLICY "Public read review avatars" ON storage.objects FOR SELECT USING (bucket_id = 'review-avatars');
CREATE POLICY "Editors upload review avatars" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'review-avatars' AND (has_role(auth.uid(), 'super_admin'::app_role) OR has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role)));
CREATE POLICY "Editors update review avatars" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'review-avatars' AND (has_role(auth.uid(), 'super_admin'::app_role) OR has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role)));
CREATE POLICY "Editors delete review avatars" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'review-avatars' AND (has_role(auth.uid(), 'super_admin'::app_role) OR has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role)));
