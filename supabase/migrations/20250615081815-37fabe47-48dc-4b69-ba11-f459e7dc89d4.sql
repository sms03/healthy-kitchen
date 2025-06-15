
-- Create enum types for better data consistency
CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');

-- Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create recipes table
CREATE TABLE public.recipes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL CHECK (price > 0),
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  image_url TEXT,
  ingredients TEXT[],
  preparation_time INTEGER, -- in minutes
  is_available BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create customer profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create customer addresses table
CREATE TABLE public.addresses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  address_line1 TEXT NOT NULL,
  address_line2 TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  address_id UUID REFERENCES public.addresses(id) ON DELETE SET NULL,
  total_amount DECIMAL(10,2) NOT NULL CHECK (total_amount > 0),
  status order_status DEFAULT 'pending',
  special_instructions TEXT,
  delivery_fee DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create order items table
CREATE TABLE public.order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  recipe_id UUID REFERENCES public.recipes(id) ON DELETE CASCADE NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(10,2) NOT NULL CHECK (unit_price > 0),
  total_price DECIMAL(10,2) NOT NULL CHECK (total_price > 0),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create payments table
CREATE TABLE public.payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  amount DECIMAL(10,2) NOT NULL CHECK (amount > 0),
  payment_method TEXT,
  payment_status payment_status DEFAULT 'pending',
  transaction_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for categories (public read access)
CREATE POLICY "Anyone can view categories" ON public.categories FOR SELECT USING (true);

-- Create RLS policies for recipes (public read access)
CREATE POLICY "Anyone can view available recipes" ON public.recipes FOR SELECT USING (is_available = true);

-- Create RLS policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Create RLS policies for addresses
CREATE POLICY "Users can view own addresses" ON public.addresses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own addresses" ON public.addresses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own addresses" ON public.addresses FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own addresses" ON public.addresses FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for orders
CREATE POLICY "Users can view own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own orders" ON public.orders FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for order items
CREATE POLICY "Users can view own order items" ON public.order_items 
  FOR SELECT USING (auth.uid() IN (SELECT user_id FROM public.orders WHERE id = order_id));
CREATE POLICY "Users can insert own order items" ON public.order_items 
  FOR INSERT WITH CHECK (auth.uid() IN (SELECT user_id FROM public.orders WHERE id = order_id));

-- Create RLS policies for payments
CREATE POLICY "Users can view own payments" ON public.payments 
  FOR SELECT USING (auth.uid() IN (SELECT user_id FROM public.orders WHERE id = order_id));
CREATE POLICY "Users can insert own payments" ON public.payments 
  FOR INSERT WITH CHECK (auth.uid() IN (SELECT user_id FROM public.orders WHERE id = order_id));

-- Create function to handle new user profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (new.id, new.raw_user_meta_data ->> 'full_name');
  RETURN new;
END;
$$;

-- Create trigger to automatically create profile for new users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Insert default categories
INSERT INTO public.categories (name, description, sort_order) VALUES
  ('Bakery', 'Fresh baked goods and pastries', 1),
  ('Veg', 'Vegetarian dishes and specialties', 2),
  ('Non-Veg', 'Non-vegetarian dishes and meat preparations', 3),
  ('Healthy Specials', 'Nutritious and health-focused meals', 4);

-- Insert sample recipes
INSERT INTO public.recipes (name, description, price, category_id, ingredients, preparation_time, is_featured) VALUES
  ('Fresh Croissant', 'Buttery, flaky pastry perfect for breakfast', 3.50, 
   (SELECT id FROM public.categories WHERE name = 'Bakery'), 
   ARRAY['flour', 'butter', 'yeast', 'milk'], 45, true),
  ('Chocolate Muffin', 'Rich chocolate muffin with chocolate chips', 4.00,
   (SELECT id FROM public.categories WHERE name = 'Bakery'),
   ARRAY['flour', 'cocoa powder', 'chocolate chips', 'eggs'], 30, false),
  ('Vegetable Biryani', 'Aromatic basmati rice with mixed vegetables', 12.99,
   (SELECT id FROM public.categories WHERE name = 'Veg'),
   ARRAY['basmati rice', 'mixed vegetables', 'spices', 'saffron'], 60, true),
  ('Paneer Butter Masala', 'Creamy tomato curry with cottage cheese', 14.50,
   (SELECT id FROM public.categories WHERE name = 'Veg'),
   ARRAY['paneer', 'tomatoes', 'cream', 'spices'], 40, false),
  ('Chicken Tikka Masala', 'Grilled chicken in creamy tomato sauce', 16.99,
   (SELECT id FROM public.categories WHERE name = 'Non-Veg'),
   ARRAY['chicken', 'yogurt', 'tomatoes', 'cream', 'spices'], 50, true),
  ('Quinoa Salad Bowl', 'Nutritious quinoa with fresh vegetables', 11.99,
   (SELECT id FROM public.categories WHERE name = 'Healthy Specials'),
   ARRAY['quinoa', 'cucumber', 'tomatoes', 'avocado', 'olive oil'], 15, true);
