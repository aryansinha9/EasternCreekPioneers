-- 1. Create 'results' table
CREATE TABLE results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  home_team TEXT NOT NULL,
  away_team TEXT NOT NULL,
  home_score INTEGER NOT NULL,
  away_score INTEGER NOT NULL,
  date TEXT NOT NULL,
  division TEXT NOT NULL,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create 'news' table
CREATE TABLE news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  date TEXT NOT NULL,
  image_url TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create 'gallery' table
CREATE TABLE gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  alt_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE results ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- 5. Create Policies for 'results'
CREATE POLICY "Public read access" ON results FOR SELECT USING (true);
CREATE POLICY "Admins can insert" ON results FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admins can update" ON results FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admins can delete" ON results FOR DELETE TO authenticated USING (true);

-- 6. Create Policies for 'news'
CREATE POLICY "Public read access" ON news FOR SELECT USING (true);
CREATE POLICY "Admins can insert" ON news FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admins can update" ON news FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admins can delete" ON news FOR DELETE TO authenticated USING (true);

-- 7. Create Policies for 'gallery'
CREATE POLICY "Public read access" ON gallery FOR SELECT USING (true);
CREATE POLICY "Admins can insert" ON gallery FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admins can update" ON gallery FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admins can delete" ON gallery FOR DELETE TO authenticated USING (true);
