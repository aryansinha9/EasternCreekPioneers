-- Create the registration_sections table
CREATE TABLE IF NOT EXISTS public.registration_sections (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    button_label TEXT NOT NULL,
    button_link TEXT NOT NULL,
    order_index INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.registration_sections ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public read access for registration_sections"
    ON public.registration_sections
    FOR SELECT
    USING (true);

-- Allow authenticated users (admin) full access
-- Adjust depending on how admin auth is handled in your Supabase project
CREATE POLICY "Admin full access for registration_sections"
    ON public.registration_sections
    FOR ALL
    USING (auth.role() = 'authenticated');

-- Insert initial data (merging bullet points into the description string)
INSERT INTO public.registration_sections (title, description, button_label, button_link, order_index) VALUES
('2026 PREMIERE LEAGUE', 'Represent Eastern Creek at the highest local level. We are building a competitive and dedicated squad for the upcoming season.', 'PREMIERE LEAGUE EOI', 'https://app.360player.com/registration/ecpsc/ede1b5e3-33b9-4b61-a299-0656575508e8', 1),
('YOUTH TEAMS', 'Elite Youth program overseen by Joga Bonito Football Academy director Carlos Ribeiro. We are seeking EOIs for positions in Division 1 teams for 2026. Age groups include: U5-U6, U7-U11, U12-U14, U15-U18.', 'YOUTH TEAM EOI', 'https://app.360player.com/registration/ecpsc/6d593602-518a-4192-8582-52f81ce93cef', 2),
('ELITE SQUAD (U13''s - U14''s)', 'Elite Youth program overseen by Joga Bonito Football Academy director Carlos Ribeiro. We are seeking EOIs for positions in Division 1 teams for 2026. Age groups include: U5-U6, U7-U11, U12-U14, U15-U18.', 'ELITE SQUAD EOI', 'https://app.360player.com/registration/ecpsc/6d593602-518a-4192-8582-52f81ce93cef', 3);
