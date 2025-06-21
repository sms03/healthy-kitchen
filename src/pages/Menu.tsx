
import { useState } from "react";
import { DishCard } from "@/components/DishCard";
import { useCategories } from "@/hooks/useCategories";
import { useRecipes } from "@/hooks/useRecipes";
import { Loader2 } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: recipes, isLoading: recipesLoading } = useRecipes();

  if (categoriesLoading || recipesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
        <Navigation />
        <div className="container mx-auto px-4 pt-32">
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Define the specific dishes we want to show including fish dishes
  const targetDishes = [
    'Egg Bhurji', 'Egg Masala', 
    'Chicken Masala', 'Chicken Handi', 
    'Mutton Masala', 'Mutton Handi',
    'Fish Curry', 'Fish Fry'
  ];

  // Add static fish dishes if they don't exist in database
  const staticFishDishes = [
    {
      id: 'fish-curry-static',
      name: 'Fish Curry',
      description: 'Traditional fish curry with aromatic spices',
      detailed_description: 'Fresh fish cooked in rich coconut-based curry with traditional spices. Choice of fish type affects pricing.',
      price: 280,
      image_gallery: [],
      spice_level: 2,
      cooking_method: 'Curry',
      chef_notes: 'Best served with steamed rice. Fish selection depends on daily availability.',
      nutritional_info: {},
      category_id: null
    },
    {
      id: 'fish-fry-static',
      name: 'Fish Fry',
      description: 'Crispy fried fish with spice coating',
      detailed_description: 'Fresh fish marinated in spices and shallow fried to perfection. Crispy outside, tender inside.',
      price: 320,
      image_gallery: [],
      spice_level: 2,
      cooking_method: 'Fried',
      chef_notes: 'Served with lemon wedges and onions. Fish type selection available.',
      nutritional_info: {},
      category_id: null
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

  // Create categories with emojis for display
  const categoryOptions = [
    { id: "all", name: "All Items", emoji: "🍽️" },
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
    
    return {
      id: numericId,
      originalId: recipe.id, // Keep original UUID for database operations
      name: recipe.name || "Unknown Item",
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
      rating: 4.5 + Math.random() * 0.4,
      spiceLevel: recipe.spice_level,
      cookingMethod: recipe.cooking_method,
      chefNotes: recipe.chef_notes,
      nutritionalInfo: recipe.nutritional_info
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <Navigation />
      
      <main className="pt-32 pb-16">
        <section className="py-20 bg-gradient-to-br from-gray-50 to-orange-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Our <span className="text-gradient bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">Signature</span> Menu
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Carefully crafted dishes with authentic flavors, made fresh daily for your enjoyment
              </p>
            </div>

            {/* Category Filter using Tabs */}
            <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full mb-12">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto p-2 bg-white/80 backdrop-blur-sm border border-orange-100 rounded-2xl">
                {categoryOptions.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="px-6 py-3 rounded-xl text-base font-medium transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-orange-50 text-gray-700"
                  >
                    <span className="mr-2">{category.emoji}</span>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Menu Grid */}
              <TabsContent value={activeCategory} className="mt-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredRecipes.map((recipe) => {
                    const dish = convertRecipeToDish(recipe);
                    return (
                      <DishCard 
                        key={`recipe-${recipe.id}`}
                        dish={dish}
                      />
                    );
                  })}
                </div>

                {filteredRecipes.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No items found in this category.</p>
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
