-- Run this in the Supabase SQL Editor to set up Storage Policies for public_assets

-- 1. Give public access to read any file (so images show up on the website)
CREATE POLICY "Public Access" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'public_assets');

-- 2. Give authenticated users (your admin) access to upload files
CREATE POLICY "Admin Upload Access" ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'public_assets');

-- 3. Give authenticated users (your admin) access to update files
CREATE POLICY "Admin Update Access" ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'public_assets');

-- 4. Give authenticated users (your admin) access to delete files
CREATE POLICY "Admin Delete Access" ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'public_assets');
