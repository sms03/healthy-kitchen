
-- Remove cart-related tables since we're switching to contact-based ordering
DROP TABLE IF EXISTS public.cart_items;

-- Create a contact_inquiries table to track pre-order inquiries
CREATE TABLE public.contact_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  user_phone TEXT,
  dish_name TEXT NOT NULL,
  dish_id UUID REFERENCES public.recipes(id),
  serving_size TEXT,
  quantity INTEGER NOT NULL DEFAULT 1,
  special_requests TEXT,
  inquiry_type TEXT DEFAULT 'pre_order',
  status TEXT DEFAULT 'pending', -- pending, contacted, confirmed, cancelled
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS for contact inquiries
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Policy for users to view their own inquiries
CREATE POLICY "Users can view own inquiries" ON public.contact_inquiries
  FOR SELECT USING (auth.uid() = user_id);

-- Policy for users to create inquiries
CREATE POLICY "Users can create inquiries" ON public.contact_inquiries
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Add image gallery to recipes table for multiple dish images
ALTER TABLE public.recipes 
ADD COLUMN IF NOT EXISTS image_gallery TEXT[] DEFAULT '{}';

-- Add more detailed fields to recipes
ALTER TABLE public.recipes 
ADD COLUMN IF NOT EXISTS detailed_description TEXT,
ADD COLUMN IF NOT EXISTS nutritional_info JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS spice_level INTEGER DEFAULT 1, -- 1-5 scale
ADD COLUMN IF NOT EXISTS cooking_method TEXT,
ADD COLUMN IF NOT EXISTS chef_notes TEXT;
