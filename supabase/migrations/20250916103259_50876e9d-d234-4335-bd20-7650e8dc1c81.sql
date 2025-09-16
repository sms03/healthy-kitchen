-- Update vegetarian serving options to match non-veg pattern
UPDATE recipe_servings 
SET 
  serving_name = 'Serves 2',
  serving_description = 'Half portion - perfect for 1-2 people'
WHERE recipe_id IN (SELECT id FROM recipes WHERE category_id = 12)
  AND serving_name = 'Half Portion';

UPDATE recipe_servings 
SET 
  serving_name = 'Serves 4', 
  serving_description = 'Full portion - perfect for 3-4 people'
WHERE recipe_id IN (SELECT id FROM recipes WHERE category_id = 12)
  AND serving_name = 'Full Portion';