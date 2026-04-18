CREATE TABLE IF NOT EXISTS public.posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT,
    tags TEXT[],
    image_url TEXT,
    author_id TEXT,
    likes INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);


ALTER TABLE public.posts DISABLE ROW LEVEL SECURITY;


DROP POLICY IF EXISTS "Allow public access to posts" ON public.posts;
CREATE POLICY "Allow public access to posts" ON public.posts
    FOR ALL
    USING (true)
    WITH CHECK (true);
