
-- Drop unwanted tables (keeping only what we need)
DROP TABLE IF EXISTS public.order_items CASCADE;
DROP TABLE IF EXISTS public.orders CASCADE;
DROP TABLE IF EXISTS public.payments CASCADE;
DROP TABLE IF EXISTS public.addresses CASCADE;

-- Clear existing data and update categories
DELETE FROM public.recipes;
DELETE FROM public.categories;

-- Insert new categories for the food ordering system
INSERT INTO public.categories (name, description, sort_order) VALUES
  ('Egg Dishes', 'Fresh egg preparations', 1),
  ('Chicken Dishes', 'Delicious chicken preparations', 2),
  ('Mutton Dishes', 'Premium mutton preparations', 3);

-- Insert the 12 specific dishes (6 types with 2 serving sizes each)
INSERT INTO public.recipes (name, description, price, category_id, ingredients, preparation_time, is_featured) VALUES
  -- Egg Dishes
  ('Egg Bhurji (Serves 2)', 'Spiced scrambled eggs perfect for 2 people', 180.00, 
   (SELECT id FROM public.categories WHERE name = 'Egg Dishes'), 
   ARRAY['eggs', 'onions', 'tomatoes', 'spices', 'oil'], 15, true),
  ('Egg Bhurji (Serves 4)', 'Spiced scrambled eggs perfect for 4 people', 320.00,
   (SELECT id FROM public.categories WHERE name = 'Egg Dishes'),
   ARRAY['eggs', 'onions', 'tomatoes', 'spices', 'oil'], 20, false),
  ('Egg Masala (Serves 2)', 'Boiled eggs in rich masala gravy for 2 people', 220.00,
   (SELECT id FROM public.categories WHERE name = 'Egg Dishes'),
   ARRAY['boiled eggs', 'onions', 'tomatoes', 'spices', 'cream'], 25, true),
  ('Egg Masala (Serves 4)', 'Boiled eggs in rich masala gravy for 4 people', 380.00,
   (SELECT id FROM public.categories WHERE name = 'Egg Dishes'),
   ARRAY['boiled eggs', 'onions', 'tomatoes', 'spices', 'cream'], 30, false),
   
  -- Chicken Dishes
  ('Chicken Masala Half (8 pieces)', 'Tender chicken pieces in aromatic masala - serves 2', 450.00,
   (SELECT id FROM public.categories WHERE name = 'Chicken Dishes'),
   ARRAY['chicken', 'onions', 'tomatoes', 'yogurt', 'spices'], 40, true),
  ('Chicken Masala Full (16 pieces)', 'Tender chicken pieces in aromatic masala - serves 4', 820.00,
   (SELECT id FROM public.categories WHERE name = 'Chicken Dishes'),
   ARRAY['chicken', 'onions', 'tomatoes', 'yogurt', 'spices'], 50, false),
  ('Chicken Handi Half (8 pieces)', 'Rich chicken handi preparation - serves 2', 480.00,
   (SELECT id FROM public.categories WHERE name = 'Chicken Dishes'),
   ARRAY['chicken', 'cream', 'cashews', 'spices', 'butter'], 45, true),
  ('Chicken Handi Full (16 pieces)', 'Rich chicken handi preparation - serves 4', 880.00,
   (SELECT id FROM public.categories WHERE name = 'Chicken Dishes'),
   ARRAY['chicken', 'cream', 'cashews', 'spices', 'butter'], 55, false),
   
  -- Mutton Dishes
  ('Mutton Masala Half (8 pieces)', 'Succulent mutton in traditional masala - serves 2', 650.00,
   (SELECT id FROM public.categories WHERE name = 'Mutton Dishes'),
   ARRAY['mutton', 'onions', 'tomatoes', 'yogurt', 'spices'], 60, true),
  ('Mutton Masala Full (16 pieces)', 'Succulent mutton in traditional masala - serves 4', 1200.00,
   (SELECT id FROM public.categories WHERE name = 'Mutton Dishes'),
   ARRAY['mutton', 'onions', 'tomatoes', 'yogurt', 'spices'], 75, false),
  ('Mutton Handi Half (8 pieces)', 'Premium mutton handi preparation - serves 2', 680.00,
   (SELECT id FROM public.categories WHERE name = 'Mutton Dishes'),
   ARRAY['mutton', 'cream', 'cashews', 'spices', 'ghee'], 65, true),
  ('Mutton Handi Full (16 pieces)', 'Premium mutton handi preparation - serves 4', 1280.00,
   (SELECT id FROM public.categories WHERE name = 'Mutton Dishes'),
   ARRAY['mutton', 'cream', 'cashews', 'spices', 'ghee'], 80, false);

-- Create a new table for personal recipes
CREATE TABLE public.personal_recipes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  ingredients TEXT[] NOT NULL,
  instructions TEXT NOT NULL,
  prep_time INTEGER, -- in minutes
  cook_time INTEGER, -- in minutes
  servings INTEGER,
  difficulty TEXT CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  category TEXT,
  image_url TEXT,
  is_secret BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for personal recipes (public read access)
ALTER TABLE public.personal_recipes ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to personal recipes
CREATE POLICY "Anyone can view personal recipes" ON public.personal_recipes FOR SELECT USING (true);
