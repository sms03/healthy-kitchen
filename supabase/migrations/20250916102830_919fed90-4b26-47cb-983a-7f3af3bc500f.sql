-- Delete the basic serving options for vegetarian dishes
DELETE FROM recipe_servings WHERE recipe_id IN (
  SELECT id FROM recipes WHERE category_id = 12
);

-- Add proper serving options for vegetarian dishes (Half/Full like non-veg)
INSERT INTO recipe_servings (recipe_id, serving_name, serving_description, price_multiplier, additional_price)
SELECT 
  r.id,
  'Half Portion',
  'Perfect for 1-2 people',
  0.6,
  0
FROM recipes r WHERE r.category_id = 12;

INSERT INTO recipe_servings (recipe_id, serving_name, serving_description, price_multiplier, additional_price)
SELECT 
  r.id,
  'Full Portion', 
  'Perfect for 3-4 people',
  1.0,
  0
FROM recipes r WHERE r.category_id = 12;