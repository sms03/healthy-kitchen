
-- Insert Fish Dishes category only if it doesn't exist
DO $$
DECLARE
    fish_category_id UUID;
BEGIN
    -- Check if Fish Dishes category exists, if not create it
    SELECT id INTO fish_category_id FROM categories WHERE name = 'Fish Dishes';
    
    IF fish_category_id IS NULL THEN
        INSERT INTO categories (name, description, sort_order) 
        VALUES ('Fish Dishes', 'Fresh fish preparations with traditional spices', 4)
        RETURNING id INTO fish_category_id;
    END IF;
    
    -- Insert Fish Curry if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM recipes WHERE name = 'Fish Curry') THEN
        INSERT INTO recipes (
            name, 
            description, 
            detailed_description, 
            price, 
            category_id, 
            ingredients, 
            preparation_time, 
            spice_level, 
            chef_notes,
            is_available,
            is_featured
        ) VALUES (
            'Fish Curry',
            'Traditional fish curry with aromatic spices',
            'Fresh fish cooked in rich coconut-based curry with traditional spices. Choice of fish type affects pricing.',
            280,
            fish_category_id,
            ARRAY['Fish', 'Coconut', 'Spices', 'Onions', 'Tomatoes'],
            30,
            2,
            'Best served with steamed rice. Fish selection depends on daily availability.',
            true,
            false
        );
    END IF;
    
    -- Insert Fish Fry if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM recipes WHERE name = 'Fish Fry') THEN
        INSERT INTO recipes (
            name, 
            description, 
            detailed_description, 
            price, 
            category_id, 
            ingredients, 
            preparation_time, 
            spice_level, 
            chef_notes,
            is_available,
            is_featured
        ) VALUES (
            'Fish Fry',
            'Crispy fried fish with spice coating',
            'Fresh fish marinated in spices and shallow fried to perfection. Crispy outside, tender inside.',
            320,
            fish_category_id,
            ARRAY['Fish', 'Spices', 'Oil', 'Lemon', 'Onions'],
            25,
            2,
            'Served with lemon wedges and onions. Fish type selection available.',
            true,
            false
        );
    END IF;
END $$;

-- Add serving options for Fish Curry
DO $$
DECLARE
    fish_curry_id UUID;
BEGIN
    SELECT id INTO fish_curry_id FROM recipes WHERE name = 'Fish Curry';
    
    IF fish_curry_id IS NOT NULL THEN
        -- Insert Single Portion if it doesn't exist
        IF NOT EXISTS (SELECT 1 FROM recipe_servings WHERE recipe_id = fish_curry_id AND serving_name = 'Single Portion') THEN
            INSERT INTO recipe_servings (recipe_id, serving_name, serving_description, price_multiplier, additional_price)
            VALUES (fish_curry_id, 'Single Portion', 'Perfect for one person', 1.0, 0);
        END IF;
        
        -- Insert Family Pack if it doesn't exist
        IF NOT EXISTS (SELECT 1 FROM recipe_servings WHERE recipe_id = fish_curry_id AND serving_name = 'Family Pack') THEN
            INSERT INTO recipe_servings (recipe_id, serving_name, serving_description, price_multiplier, additional_price)
            VALUES (fish_curry_id, 'Family Pack', 'Serves 3-4 people', 2.5, 50);
        END IF;
    END IF;
END $$;

-- Add serving options for Fish Fry
DO $$
DECLARE
    fish_fry_id UUID;
BEGIN
    SELECT id INTO fish_fry_id FROM recipes WHERE name = 'Fish Fry';
    
    IF fish_fry_id IS NOT NULL THEN
        -- Insert Single Portion if it doesn't exist
        IF NOT EXISTS (SELECT 1 FROM recipe_servings WHERE recipe_id = fish_fry_id AND serving_name = 'Single Portion') THEN
            INSERT INTO recipe_servings (recipe_id, serving_name, serving_description, price_multiplier, additional_price)
            VALUES (fish_fry_id, 'Single Portion', 'Perfect for one person', 1.0, 0);
        END IF;
        
        -- Insert Family Pack if it doesn't exist
        IF NOT EXISTS (SELECT 1 FROM recipe_servings WHERE recipe_id = fish_fry_id AND serving_name = 'Family Pack') THEN
            INSERT INTO recipe_servings (recipe_id, serving_name, serving_description, price_multiplier, additional_price)
            VALUES (fish_fry_id, 'Family Pack', 'Serves 3-4 people', 2.8, 70);
        END IF;
    END IF;
END $$;
