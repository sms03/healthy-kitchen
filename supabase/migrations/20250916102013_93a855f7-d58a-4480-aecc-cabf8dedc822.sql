-- Remove duplicate vegetarian dishes (keep the ones with higher IDs)
DELETE FROM recipes 
WHERE id IN (
  SELECT MIN(id) 
  FROM recipes 
  WHERE name IN ('Chana Masala', 'Palak Paneer', 'Aloo Gobi', 'Rajma', 'Chole')
  GROUP BY name 
  HAVING COUNT(*) > 1
);