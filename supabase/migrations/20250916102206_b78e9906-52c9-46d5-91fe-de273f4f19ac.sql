-- Add default serving options for vegetarian dishes that don't have any
INSERT INTO recipe_servings (recipe_id, serving_name, serving_description, price_multiplier, additional_price)
SELECT 
  r.id,
  'Regular Serving',
  'Standard portion size',
  1.0,
  0
FROM recipes r
WHERE r.category_id = 12 
  AND NOT EXISTS (
    SELECT 1 FROM recipe_servings rs 
    WHERE rs.recipe_id = r.id
  );