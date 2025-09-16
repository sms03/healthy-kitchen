-- First delete recipe_servings for duplicate recipes
DELETE FROM recipe_servings 
WHERE recipe_id IN (
  SELECT MIN(id) 
  FROM recipes 
  WHERE name IN ('Chana Masala', 'Palak Paneer', 'Aloo Gobi', 'Rajma', 'Chole')
  GROUP BY name 
  HAVING COUNT(*) > 1
);

-- Then delete the duplicate recipes
DELETE FROM recipes 
WHERE id IN (
  SELECT MIN(id) 
  FROM recipes 
  WHERE name IN ('Chana Masala', 'Palak Paneer', 'Aloo Gobi', 'Rajma', 'Chole')
  GROUP BY name 
  HAVING COUNT(*) > 1
);

-- Clean up old duplicate categories (keep the newer ones with proper names)
DELETE FROM categories WHERE id IN (1, 2, 3, 4, 5);

-- Update remaining categories sort order
UPDATE categories SET sort_order = 1 WHERE name = 'Vegetarian';
UPDATE categories SET sort_order = 2 WHERE name = 'Eggiterian'; 
UPDATE categories SET sort_order = 3 WHERE name = 'Non-Vegetarian';