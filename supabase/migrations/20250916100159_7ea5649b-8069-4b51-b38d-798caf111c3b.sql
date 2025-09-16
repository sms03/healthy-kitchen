-- First, let's create the proper categories
INSERT INTO categories (name, description, sort_order) VALUES 
('Vegetarian', 'Pure vegetarian dishes available daily', 1),
('Eggiterian', 'Egg-based dishes available on weekends', 2),
('Non-Vegetarian', 'Chicken, mutton and fish dishes - Sunday special', 3)
ON CONFLICT (name) DO NOTHING;

-- Get the category IDs for reference
DO $$
DECLARE
    veg_cat_id INTEGER;
    egg_cat_id INTEGER;
    nonveg_cat_id INTEGER;
BEGIN
    SELECT id INTO veg_cat_id FROM categories WHERE name = 'Vegetarian';
    SELECT id INTO egg_cat_id FROM categories WHERE name = 'Eggiterian';
    SELECT id INTO nonveg_cat_id FROM categories WHERE name = 'Non-Vegetarian';

    -- Update existing egg dishes
    UPDATE recipes SET 
        category_id = egg_cat_id,
        availability_type = 'weekly_special',
        available_days = ARRAY['sunday'],
        preorder_opens_on = 'saturday',
        special_order_surcharge = 20,
        requires_preorder = true
    WHERE name IN ('Egg Bhurji', 'Egg Masala');

    -- Update existing non-veg dishes  
    UPDATE recipes SET 
        category_id = nonveg_cat_id,
        availability_type = 'weekly_special', 
        available_days = ARRAY['sunday'],
        preorder_opens_on = 'saturday',
        special_order_surcharge = 50,
        requires_preorder = true
    WHERE name IN ('Chicken Masala', 'Chicken Handi', 'Mutton Masala', 'Mutton Handi', 'Fish Curry', 'Fish Fry');

    -- Add vegetarian dishes for daily availability
    INSERT INTO recipes (name, description, detailed_description, price, category_id, availability_type, available_days, is_available, is_featured, spice_level, cooking_method, chef_notes) VALUES
    ('Chana Masala', 'Spiced chickpea curry with aromatic blend of spices', 'Traditional North Indian chickpea curry cooked with onions, tomatoes, and a perfect blend of aromatic spices. Rich, flavorful and protein-packed.', 120, veg_cat_id, 'daily', ARRAY['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'], true, true, 2, 'Slow Cooked', 'Best enjoyed with rice or roti'),
    
    ('Chole', 'Punjabi-style spicy chickpea curry', 'Authentic Punjabi chole made with white chickpeas in a thick, spicy tomato-based gravy with traditional spices and fresh herbs.', 130, veg_cat_id, 'daily', ARRAY['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'], true, false, 3, 'Pressure Cooked', 'Pairs perfectly with bhature or rice'),
    
    ('Aloo Gobi', 'Dry curry of potatoes and cauliflower', 'Classic combination of tender potatoes and cauliflower cooked with turmeric, cumin, and fresh coriander. Light yet satisfying.', 100, veg_cat_id, 'daily', ARRAY['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'], true, false, 1, 'Stir Fried', 'Great as a side dish or with rotis'),
    
    ('Palak Paneer', 'Cottage cheese in creamy spinach gravy', 'Fresh paneer cubes swimming in a rich, creamy spinach gravy infused with garlic, ginger, and aromatic spices.', 150, veg_cat_id, 'daily', ARRAY['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'], true, true, 2, 'Simmered', 'Made with fresh spinach and homemade paneer'),
    
    ('Rajma', 'Red kidney beans in rich tomato curry', 'Comfort food at its best - red kidney beans slow-cooked in a thick, flavorful tomato and onion gravy with warming spices.', 125, veg_cat_id, 'daily', ARRAY['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'], true, true, 2, 'Slow Cooked', 'Authentic Punjabi style preparation'),
    
    ('Dal Tadka', 'Tempered yellow lentils with aromatic spices', 'Yellow lentils cooked to perfection and tempered with cumin, garlic, and fresh herbs. Simple yet incredibly flavorful.', 90, veg_cat_id, 'daily', ARRAY['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'], true, false, 1, 'Boiled & Tempered', 'Perfect comfort food with rice'),
    
    ('Paneer Butter Masala', 'Rich and creamy tomato-based paneer curry', 'Soft paneer cubes in a luscious tomato and cashew-based gravy with butter and cream. Mildly spiced and absolutely delicious.', 160, veg_cat_id, 'daily', ARRAY['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'], true, true, 1, 'Simmered', 'Restaurant-style preparation with fresh cream'),
    
    ('Mixed Vegetable Curry', 'Seasonal vegetables in aromatic curry', 'Fresh seasonal vegetables cooked in a flavorful onion-tomato gravy with traditional spices. Healthy and delicious.', 110, veg_cat_id, 'daily', ARRAY['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'], true, false, 2, 'Simmered', 'Made with fresh seasonal vegetables');

END $$;