
import { useState } from "react";
import { DishCard } from "@/components/DishCard";
import { useCategories } from "@/hooks/useCategories";
import { useRecipes } from "@/hooks/useRecipes";
import { Loader2, ChefHat } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: recipes, isLoading: recipesLoading } = useRecipes();

  if (categoriesLoading || recipesLoading) {
    return (
      <div className="min-h-screen michelin-gradient">
        <Navigation />
        <div className="container mx-auto px-4 pt-32">
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Enhanced chef's notes for each dish
  const dishChefNotes = {
    'Egg Bhurji': 'Our signature scrambled eggs, delicately spiced with hand-ground masalas and finished with fresh herbs from our garden.',
    'Egg Masala': 'Farm-fresh eggs simmered in our aromatic tomato-onion gravy, a perfect harmony of spices that has been our family recipe for generations.',
    'Chicken Masala': 'Tender chicken pieces slow-cooked in our signature blend of roasted spices, creating layers of flavor that dance on your palate.',
    'Chicken Handi': 'Traditional clay pot cooking method that infuses the chicken with smoky flavors and keeps it incredibly tender. A true culinary masterpiece.',
    'Mutton Masala': 'Premium mutton cuts braised to perfection in our special masala blend, a dish that represents the pinnacle of Indian non-vegetarian cuisine.',
    'Mutton Handi': 'Slow-cooked in traditional clay pots, this mutton preparation is our chef\'s pride - succulent, aromatic, and deeply satisfying.',
    'Fish Curry': 'Fresh catch of the day prepared in our traditional coastal-style curry, with coconut and spices that transport you to seaside kitchens.',
    'Fish Fry': 'Expertly marinated fresh fish, pan-fried to golden perfection with our secret spice coating that creates the perfect crispy exterior.'
  };

  // Define the specific dishes we want to show including fish dishes
  const targetDishes = [
    'Egg Bhurji', 'Egg Masala', 
    'Chicken Masala', 'Chicken Handi', 
    'Mutton Masala', 'Mutton Handi',
    'Fish Curry', 'Fish Fry'
  ];

  // Enhanced static fish dishes
  const staticFishDishes = [
    {
      id: 'fish-curry-static',
      name: 'Fish Curry',
      description: 'Fresh catch prepared in traditional coastal spices',
      detailed_description: 'Our daily selection of the finest fish, gently simmered in a rich coconut-based curry with aromatic spices. Each preparation celebrates the natural flavors of the sea.',
      price: 280,
      category_id: null,
      image_url: null,
      ingredients: ['Fresh Fish', 'Coconut Milk', 'Traditional Spices', 'Curry Leaves', 'Tomatoes'],
      preparation_time: 30,
      is_available: true,
      is_featured: true,
      image_gallery: [],
      spice_level: 2,
      cooking_method: 'Traditional Simmering',
      chef_notes: dishChefNotes['Fish Curry'],
      nutritional_info: {},
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'fish-fry-static',
      name: 'Fish Fry',
      description: 'Perfectly seasoned and pan-fried to golden perfection',
      detailed_description: 'Premium fish selection, marinated in our signature spice blend and pan-fried to achieve the perfect balance of crispy exterior and tender, flaky interior.',
      price: 320,
      category_id: null,
      image_url: null,
      ingredients: ['Fresh Fish', 'Signature Spices', 'Premium Oil', 'Fresh Lemon', 'Herbs'],
      preparation_time: 25,
      is_available: true,
      is_featured: true,
      image_gallery: [],
      spice_level: 2,
      cooking_method: 'Pan-Seared',
      chef_notes: dishChefNotes['Fish Fry'],
      nutritional_info: {},
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  // Combine database recipes with static fish dishes
  const allRecipes = [...(recipes || [])];
  
  // Add static fish dishes if not found in database
  staticFishDishes.forEach(staticDish => {
    const exists = recipes?.some(recipe => 
      recipe.name.toLowerCase() === staticDish.name.toLowerCase()
    );
    if (!exists) {
      allRecipes.push(staticDish);
    }
  });

  // Filter to show the specific dishes plus any fish dishes
  const filteredRecipes = allRecipes.filter(recipe => 
    (targetDishes.includes(recipe.name) || recipe.name.toLowerCase().includes('fish')) &&
    (activeCategory === "all" || recipe.category_id === activeCategory)
  );

  // Create categories with refined display
  const categoryOptions = [
    { id: "all", name: "Signature Selection", emoji: "🍽️" },
    ...(categories?.map(cat => ({
      id: cat.id,
      name: cat.name,
      emoji: cat.name === "Egg Dishes" ? "🥚" : 
             cat.name === "Chicken Dishes" ? "🍗" : 
             cat.name === "Mutton Dishes" ? "🍖" :
             cat.name === "Fish Dishes" ? "🐟" : "🍽️"
    })) || [])
  ];

  // Convert recipe to dish format for compatibility with existing DishCard
  const convertRecipeToDish = (recipe: any) => {
    // Create a hash from the UUID string to get a consistent numeric ID
    const stringToHash = (str: string) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
      }
      return Math.abs(hash);
    };

    const numericId = stringToHash(recipe.id);
    
    // Set Chicken/Mutton Handi to medium spice level (2)
    let adjustedSpiceLevel = recipe.spice_level;
    if (recipe.name?.includes("Chicken Handi") || recipe.name?.includes("Mutton Handi")) {
      adjustedSpiceLevel = 2;
    }

    // Ensure all dishes have chef's notes
    const chefNotes = recipe.chef_notes || dishChefNotes[recipe.name] || 
      "Prepared with passion using traditional techniques and the finest ingredients, this dish represents our commitment to culinary excellence.";
    
    return {
      id: numericId,
      originalId: recipe.id,
      name: recipe.name || "Signature Dish",
      description: recipe.description || "",
      detailedDescription: recipe.detailed_description,
      price: typeof recipe.price === 'string' ? parseFloat(recipe.price) : (recipe.price || 0),
      image: recipe.name?.includes("Egg Bhurji") ? "🍳" :
             recipe.name?.includes("Egg Masala") ? "🥚" :
             recipe.name?.includes("Chicken Masala") ? "🍛" :
             recipe.name?.includes("Chicken Handi") ? "🍗" :
             recipe.name?.includes("Mutton Masala") ? "🍖" :
             recipe.name?.includes("Mutton Handi") ? "🥩" :
             recipe.name?.includes("Fish") ? "🐟" : "🍽️",
      imageGallery: recipe.image_gallery || [],
      rating: 4.7 + Math.random() * 0.3,
      spiceLevel: adjustedSpiceLevel,
      cookingMethod: recipe.cooking_method,
      chefNotes: chefNotes,
      nutritionalInfo: recipe.nutritional_info
    };
  };

  return (
    <div className="min-h-screen michelin-gradient">
      <Navigation />
      
      <main className="pt-32 pb-16">
        <section className="py-20">
          <div className="container mx-auto px-4">
            {/* Elegant Header */}
            <div className="text-center mb-16">
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
                <ChefHat className="mx-4 text-amber-600 w-8 h-8" />
                <div className="w-20 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
              </div>
              <h1 className="text-5xl font-bold text-deep-charcoal mb-6 font-playfair">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Culinary</span> Symphony
              </h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Each dish is a masterpiece, crafted with passion and precision using time-honored techniques and the finest ingredients sourced from trusted artisans.
              </p>
            </div>

            {/* Refined Category Filter using Tabs */}
            <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full mb-16">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto p-3 elegant-card border-amber-100">
                {categoryOptions.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="px-8 py-4 rounded-xl text-base font-medium transition-all duration-500 data-[state=active]:restaurant-button data-[state=active]:text-white data-[state=active]:shadow-amber-200 data-[state=active]:shadow-lg hover:bg-amber-50 text-gray-700"
                  >
                    <span className="mr-3 text-lg">{category.emoji}</span>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Elegant Menu Grid */}
              <TabsContent value={activeCategory} className="mt-12">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {filteredRecipes.map((recipe) => {
                    const dish = convertRecipeToDish(recipe);
                    return (
                      <div key={`recipe-${recipe.id}`} className="group">
                        <DishCard dish={dish} />
                      </div>
                    );
                  })}
                </div>

                {filteredRecipes.length === 0 && (
                  <div className="text-center py-16">
                    <div className="elegant-card p-12 max-w-md mx-auto">
                      <ChefHat className="w-16 h-16 text-amber-400 mx-auto mb-4" />
                      <p className="text-gray-600 text-lg">No culinary creations found in this selection.</p>
                      <p className="text-sm text-gray-500 mt-2">Please explore our other categories.</p>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Menu;
