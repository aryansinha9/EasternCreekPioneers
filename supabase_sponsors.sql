-- 1. Create 'sponsors' table
CREATE TABLE sponsors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE sponsors ENABLE ROW LEVEL SECURITY;

-- 3. Create Policies for 'sponsors'
CREATE POLICY "Public read access" ON sponsors FOR SELECT USING (true);
CREATE POLICY "Admins can insert" ON sponsors FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admins can update" ON sponsors FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admins can delete" ON sponsors FOR DELETE TO authenticated USING (true);
