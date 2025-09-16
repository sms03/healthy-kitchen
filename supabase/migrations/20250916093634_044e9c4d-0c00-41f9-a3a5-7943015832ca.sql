-- Add availability scheduling columns to recipes table
ALTER TABLE recipes 
ADD COLUMN availability_type TEXT DEFAULT 'daily' CHECK (availability_type IN ('daily', 'weekly_special', 'preorder_only')),
ADD COLUMN available_days TEXT[] DEFAULT ARRAY['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
ADD COLUMN preorder_opens_on TEXT CHECK (preorder_opens_on IN ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday')),
ADD COLUMN special_order_surcharge NUMERIC DEFAULT 0,
ADD COLUMN requires_preorder BOOLEAN DEFAULT false;

-- Create Vegetarian Dishes category
DO $$
DECLARE
    veg_category_id INTEGER;
BEGIN
    -- Insert Vegetarian Dishes category
    INSERT INTO categories (name, description, sort_order) 
    VALUES ('Vegetarian Dishes', 'Fresh vegetarian dishes available daily', 5)
    RETURNING id INTO veg_category_id;
    
    -- Insert Chana Masala
    INSERT INTO recipes (
        name, description, detailed_description, price, category_id, 
        ingredients, preparation_time, spice_level, chef_notes,
        is_available, is_featured, availability_type, available_days,
        requires_preorder, special_order_surcharge
    ) VALUES (
        'Chana Masala',
        'Spicy chickpea curry with aromatic spices',
        'Rich and flavorful chickpea curry cooked with onions, tomatoes and traditional spices. A protein-rich vegetarian delight.',
        180,
        veg_category_id,
        ARRAY['Chickpeas', 'Onions', 'Tomatoes', 'Spices', 'Ginger-Garlic'],
        25,
        2,
        'Best served with rice or roti. Rich in protein and fiber.',
        true,
        false,
        'daily',
        ARRAY['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
        false,
        0
    );
    
    -- Insert Chole
    INSERT INTO recipes (
        name, description, detailed_description, price, category_id, 
        ingredients, preparation_time, spice_level, chef_notes,
        is_available, is_featured, availability_type, available_days,
        requires_preorder, special_order_surcharge
    ) VALUES (
        'Chole',
        'Punjabi-style spiced chickpeas',
        'Authentic Punjabi chole with rich gravy and bold spices. A North Indian classic that pairs perfectly with bhature or rice.',
        200,
        veg_category_id,
        ARRAY['Chickpeas', 'Onions', 'Tomatoes', 'Punjabi Spices', 'Tea Leaves'],
        30,
        3,
        'Traditional recipe with tea leaves for authentic color. Served with pickled onions.',
        true,
        false,
        'daily',
        ARRAY['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
        false,
        0
    );
    
    -- Insert Aloo Gobi
    INSERT INTO recipes (
        name, description, detailed_description, price, category_id, 
        ingredients, preparation_time, spice_level, chef_notes,
        is_available, is_featured, availability_type, available_days,
        requires_preorder, special_order_surcharge
    ) VALUES (
        'Aloo Gobi',
        'Dry curry with potatoes and cauliflower',
        'Classic combination of potatoes and cauliflower cooked with turmeric and spices. A comforting dry curry perfect for any meal.',
        160,
        veg_category_id,
        ARRAY['Potatoes', 'Cauliflower', 'Turmeric', 'Cumin', 'Coriander'],
        20,
        1,
        'Cooked without onions and garlic. Perfect for Jain dietary preferences.',
        true,
        false,
        'daily',
        ARRAY['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
        false,
        0
    );
    
    -- Insert Palak Paneer
    INSERT INTO recipes (
        name, description, detailed_description, price, category_id, 
        ingredients, preparation_time, spice_level, chef_notes,
        is_available, is_featured, availability_type, available_days,
        requires_preorder, special_order_surcharge
    ) VALUES (
        'Palak Paneer',
        'Cottage cheese in creamy spinach gravy',
        'Fresh cottage cheese cubes in rich, creamy spinach gravy. Packed with iron and protein, this is comfort food at its finest.',
        220,
        veg_category_id,
        ARRAY['Fresh Spinach', 'Paneer', 'Cream', 'Spices', 'Ginger-Garlic'],
        25,
        2,
        'Made with fresh spinach and homemade paneer. Rich in iron and calcium.',
        true,
        true,
        'daily',
        ARRAY['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
        false,
        0
    );
    
    -- Insert Rajma
    INSERT INTO recipes (
        name, description, detailed_description, price, category_id, 
        ingredients, preparation_time, spice_level, chef_notes,
        is_available, is_featured, availability_type, available_days,
        requires_preorder, special_order_surcharge
    ) VALUES (
        'Rajma',
        'Red kidney beans in rich tomato gravy',
        'Slow-cooked red kidney beans in rich, spiced tomato gravy. A North Indian favorite that is both hearty and nutritious.',
        190,
        veg_category_id,
        ARRAY['Red Kidney Beans', 'Tomatoes', 'Onions', 'Spices', 'Ginger-Garlic'],
        35,
        2,
        'Beans are soaked overnight and slow-cooked for perfect texture. High in protein and fiber.',
        true,
        false,
        'daily',
        ARRAY['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
        false,
        0
    );
END $$;

-- Update all existing non-veg dishes (egg, chicken, mutton, fish) for Sunday-only with preorder
UPDATE recipes 
SET 
    availability_type = 'weekly_special',
    available_days = ARRAY['sunday'],
    preorder_opens_on = 'saturday',
    requires_preorder = true,
    special_order_surcharge = CASE 
        WHEN name LIKE '%Egg%' THEN 30
        WHEN name LIKE '%Chicken%' THEN 50
        WHEN name LIKE '%Mutton%' THEN 80
        WHEN name LIKE '%Fish%' THEN 60
        ELSE 50
    END
WHERE category_id IN (
    SELECT id FROM categories 
    WHERE name IN ('Egg Dishes', 'Chicken Dishes', 'Mutton Dishes', 'Fish Dishes')
);

-- Add serving options for vegetarian dishes
DO $$
DECLARE
    recipe_record RECORD;
BEGIN
    FOR recipe_record IN 
        SELECT id FROM recipes 
        WHERE category_id = (SELECT id FROM categories WHERE name = 'Vegetarian Dishes')
    LOOP
        -- Single Portion
        INSERT INTO recipe_servings (recipe_id, serving_name, serving_description, price_multiplier, additional_price)
        VALUES (recipe_record.id, 'Single Portion', 'Perfect for one person', 1.0, 0);
        
        -- Family Pack
        INSERT INTO recipe_servings (recipe_id, serving_name, serving_description, price_multiplier, additional_price)
        VALUES (recipe_record.id, 'Family Pack', 'Serves 3-4 people', 2.5, 40);
    END LOOP;
END $$;