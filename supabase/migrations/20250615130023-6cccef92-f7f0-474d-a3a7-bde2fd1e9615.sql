
-- First, let's clear the existing recipes and restructure them
DELETE FROM public.recipes;

-- Insert the 6 main dishes without serving size in the name
INSERT INTO public.recipes (name, description, price, category_id, ingredients, preparation_time, is_featured) VALUES
  -- Egg Dishes
  ('Egg Bhurji', 'Spiced scrambled eggs with onions and tomatoes', 180.00, 
   (SELECT id FROM public.categories WHERE name = 'Egg Dishes'), 
   ARRAY['eggs', 'onions', 'tomatoes', 'spices', 'oil'], 15, true),
  ('Egg Masala', 'Boiled eggs in rich masala gravy', 220.00,
   (SELECT id FROM public.categories WHERE name = 'Egg Dishes'),
   ARRAY['boiled eggs', 'onions', 'tomatoes', 'spices', 'cream'], 25, true),
   
  -- Chicken Dishes
  ('Chicken Masala', 'Tender chicken pieces in aromatic masala', 450.00,
   (SELECT id FROM public.categories WHERE name = 'Chicken Dishes'),
   ARRAY['chicken', 'onions', 'tomatoes', 'yogurt', 'spices'], 40, true),
  ('Chicken Handi', 'Rich chicken handi preparation', 480.00,
   (SELECT id FROM public.categories WHERE name = 'Chicken Dishes'),
   ARRAY['chicken', 'cream', 'cashews', 'spices', 'butter'], 45, true),
   
  -- Mutton Dishes
  ('Mutton Masala', 'Succulent mutton in traditional masala', 650.00,
   (SELECT id FROM public.categories WHERE name = 'Mutton Dishes'),
   ARRAY['mutton', 'onions', 'tomatoes', 'yogurt', 'spices'], 60, true),
  ('Mutton Handi', 'Premium mutton handi preparation', 680.00,
   (SELECT id FROM public.categories WHERE name = 'Mutton Dishes'),
   ARRAY['mutton', 'cream', 'cashews', 'spices', 'ghee'], 65, true);

-- Add serving options table to handle different serving sizes and prices
CREATE TABLE public.recipe_servings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  recipe_id UUID NOT NULL REFERENCES public.recipes(id) ON DELETE CASCADE,
  serving_name TEXT NOT NULL, -- e.g., "Serves 2", "Serves 4"
  serving_description TEXT, -- e.g., "8 pieces", "16 pieces"
  price_multiplier DECIMAL NOT NULL DEFAULT 1.0, -- multiplier for base price
  additional_price DECIMAL DEFAULT 0, -- additional price on top of base
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert serving options for all recipes
INSERT INTO public.recipe_servings (recipe_id, serving_name, serving_description, price_multiplier, additional_price)
SELECT 
  r.id,
  'Serves 2',
  CASE 
    WHEN r.name LIKE '%Egg%' THEN 'Regular portion'
    ELSE 'Half portion (8 pieces)'
  END,
  1.0,
  0
FROM public.recipes r;

INSERT INTO public.recipe_servings (recipe_id, serving_name, serving_description, price_multiplier, additional_price)
SELECT 
  r.id,
  'Serves 4',
  CASE 
    WHEN r.name LIKE '%Egg%' THEN 'Large portion'
    ELSE 'Full portion (16 pieces)'
  END,
  CASE 
    WHEN r.name LIKE '%Egg%' THEN 1.78 -- 320/180 = 1.78, 380/220 = 1.73
    WHEN r.name = 'Chicken Masala' THEN 1.82 -- 820/450 = 1.82
    WHEN r.name = 'Chicken Handi' THEN 1.83 -- 880/480 = 1.83
    WHEN r.name = 'Mutton Masala' THEN 1.85 -- 1200/650 = 1.85
    WHEN r.name = 'Mutton Handi' THEN 1.88 -- 1280/680 = 1.88
    ELSE 1.8
  END,
  0
FROM public.recipes r;

-- Enable RLS for recipe_servings
ALTER TABLE public.recipe_servings ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to recipe servings
CREATE POLICY "Anyone can view recipe servings" ON public.recipe_servings FOR SELECT USING (true);
