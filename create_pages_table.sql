-- Create the club_pages table for dynamic text content
CREATE TABLE IF NOT EXISTS public.club_pages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.club_pages ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public read access for club_pages"
    ON public.club_pages
    FOR SELECT
    USING (true);

-- Allow authenticated users (admin) full access
CREATE POLICY "Admin full access for club_pages"
    ON public.club_pages
    FOR ALL
    USING (auth.role() = 'authenticated');

-- Insert the initial rows for the requested pages
INSERT INTO public.club_pages (slug, title, content) VALUES
('about', 'About Eastern Creek SC', 'Welcome to Eastern Creek Soccer Club. \n\nPlease use the Admin Dashboard to edit the contents of this page. This text area supports multiple paragraphs and formatting structure.'),
('policies', 'Club Policies', 'Eastern Creek SC Official Club Policies.\n\nPlease use the Admin Dashboard to input your Code of Conduct, grading policies, and other club rules here.')
ON CONFLICT (slug) DO NOTHING;
