
-- Ensure trigger on auth.users for profile creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create admin user if not exists
DO $$
DECLARE
  admin_id uuid;
BEGIN
  SELECT id INTO admin_id FROM auth.users WHERE email = 'admin@fortux.local';
  IF admin_id IS NULL THEN
    admin_id := gen_random_uuid();
    INSERT INTO auth.users (
      instance_id, id, aud, role, email, encrypted_password,
      email_confirmed_at, created_at, updated_at,
      raw_user_meta_data, raw_app_meta_data,
      confirmation_token, email_change, email_change_token_new, recovery_token
    ) VALUES (
      '00000000-0000-0000-0000-000000000000', admin_id, 'authenticated', 'authenticated',
      'admin@fortux.local', crypt('123456', gen_salt('bf')),
      now(), now(), now(),
      '{"username":"admin","full_name":"Super Admin"}'::jsonb,
      '{"provider":"email","providers":["email"]}'::jsonb,
      '', '', '', ''
    );
    INSERT INTO auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at)
    VALUES (gen_random_uuid(), admin_id, jsonb_build_object('sub', admin_id::text, 'email', 'admin@fortux.local'), 'email', admin_id::text, now(), now(), now());
  END IF;

  -- Ensure profile exists with must_change_password true
  INSERT INTO public.profiles (id, username, full_name, must_change_password)
  VALUES (admin_id, 'admin', 'Super Admin', true)
  ON CONFLICT (id) DO UPDATE SET must_change_password = true, username = 'admin';

  -- Assign super_admin role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (admin_id, 'super_admin')
  ON CONFLICT (user_id, role) DO NOTHING;
END $$;

-- Allow users to insert their own profile (fallback)
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
