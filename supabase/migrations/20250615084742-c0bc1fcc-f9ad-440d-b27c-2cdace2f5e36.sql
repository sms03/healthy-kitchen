
-- Add demo personal recipes with YouTube links and detailed information
INSERT INTO public.personal_recipes (title, description, ingredients, instructions, prep_time, cook_time, servings, difficulty, category, is_secret) VALUES
  ('Classic Butter Chicken', 'Creamy and rich butter chicken recipe that melts in your mouth', 
   ARRAY['chicken breast', 'butter', 'heavy cream', 'tomato puree', 'garam masala', 'ginger-garlic paste', 'onions', 'cashews'],
   'Marinate chicken in yogurt and spices for 2 hours. Cook chicken until golden. Prepare tomato-based gravy with butter and cream. Combine chicken with gravy and simmer for 10 minutes.',
   30, 45, 4, 'Medium', 'Non-Vegetarian', false),
   
  ('Homemade Paneer Tikka', 'Smoky and flavorful paneer tikka made at home without a tandoor',
   ARRAY['paneer', 'yogurt', 'red chili powder', 'turmeric', 'garam masala', 'bell peppers', 'onions', 'lemon juice'],
   'Cut paneer into cubes. Marinate with yogurt and spices for 1 hour. Thread on skewers with vegetables. Cook on tawa or grill until charred.',
   20, 15, 3, 'Easy', 'Vegetarian', false),
   
  ('Secret Family Dal Recipe', 'A century-old family recipe for the most delicious dal you will ever taste',
   ARRAY['mixed lentils', 'ghee', 'cumin seeds', 'hing', 'turmeric', 'red chili powder', 'garam masala', 'tomatoes', 'onions'],
   'This is a secret family recipe passed down through generations. The key is in the tempering and the specific blend of lentils.',
   15, 30, 6, 'Easy', 'Vegetarian', true),
   
  ('Healthy Quinoa Salad Bowl', 'Nutritious and colorful quinoa salad perfect for weight management',
   ARRAY['quinoa', 'cucumber', 'tomatoes', 'bell peppers', 'corn', 'black beans', 'olive oil', 'lemon juice', 'herbs'],
   'Cook quinoa until fluffy. Chop all vegetables finely. Mix everything with olive oil and lemon dressing. Chill and serve.',
   15, 15, 2, 'Easy', 'Healthy', false),
   
  ('Grandmas Biryani Secret', 'The authentic biryani recipe with a secret ingredient that makes all the difference',
   ARRAY['basmati rice', 'mutton', 'yogurt', 'saffron', 'secret spice blend', 'fried onions', 'mint leaves', 'ghee'],
   'The secret ingredient and technique have been in our family for generations. This creates the most aromatic and flavorful biryani.',
   60, 90, 8, 'Hard', 'Non-Vegetarian', true),
   
  ('Chocolate Chip Cookies', 'Soft and chewy chocolate chip cookies that everyone will love',
   ARRAY['flour', 'butter', 'brown sugar', 'white sugar', 'eggs', 'vanilla extract', 'chocolate chips', 'baking soda'],
   'Cream butter and sugars. Add eggs and vanilla. Mix in dry ingredients and chocolate chips. Bake at 375F for 9-11 minutes.',
   15, 11, 24, 'Easy', 'Dessert', false);
