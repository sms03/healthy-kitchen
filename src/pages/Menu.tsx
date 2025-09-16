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
  // Show all available dishes from database
  const targetDishes = recipes?.map(recipe => recipe.name) || [];

  // Define category order: Veg=1, Egg=2, Chicken=3, Mutton=4, Fish=5
  const categoryOrder: Record<string, number> = {
    '5': 1, // Vegetarian Dishes  
    '1': 2, // Egg Dishes
    '2': 3, // Chicken Dishes  
    '3': 4, // Mutton Dishes
    '4': 5  // Fish Dishes
  };

  // Define dish order within each category
  const dishOrder = {
    'Egg Bhurji': 1,
    'Egg Masala': 2,
    'Chicken Masala': 1,
    'Chicken Handi': 2,
    'Mutton Masala': 1,
    'Mutton Handi': 2,
    'Fish Curry': 1,
    'Fish Fry': 2
  };

  // Filter and sort the recipes
  const filteredRecipes = recipes?.filter(recipe => {
    if (activeCategory === "all") {
      return true;
    } else {
      return recipe.category_id?.toString() === activeCategory;
    }
  }).sort((a, b) => {
    // First sort by category order
    const categoryA = categoryOrder[a.category_id?.toString() || ''] || 999;
    const categoryB = categoryOrder[b.category_id?.toString() || ''] || 999;
    
    if (categoryA !== categoryB) {
      return categoryA - categoryB;
    }
    
    // Then sort by name within the category
    return a.name.localeCompare(b.name);
  }) || [];
  // Create categories with emojis for display, sorted by category order
  const categoryOptions = [
    { id: "all", name: "All Items", emoji: "🍽️" },
    ...(categories?.sort((a, b) => {
      const orderA = categoryOrder[a.id.toString()] || 999;
      const orderB = categoryOrder[b.id.toString()] || 999;
      return orderA - orderB;
    }).map(cat => ({
      id: cat.id.toString(),
      name: cat.name,
      emoji: cat.name === "Vegetarian Dishes" ? "🥬" :
             cat.name === "Egg Dishes" ? "🥚" : 
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
    
    // Adjust spice level for Chicken/Mutton Handi to medium (2)
    let adjustedSpiceLevel = recipe.spice_level;
    if (recipe.name?.includes("Chicken Handi") || recipe.name?.includes("Mutton Handi")) {
      adjustedSpiceLevel = 2;
    }
    
    return {
      id: numericId,
      originalId: recipe.id,
      name: recipe.name || "Unknown Item",
      description: recipe.description || "",
      detailedDescription: recipe.detailed_description,
      price: typeof recipe.price === 'string' ? parseFloat(recipe.price) : (recipe.price || 0),
      image: getRecipeEmoji(recipe.name),
      imageGallery: recipe.image_gallery || [],
      rating: 4.5 + Math.random() * 0.4,
      spiceLevel: adjustedSpiceLevel,
      cookingMethod: recipe.cooking_method,
      chefNotes: recipe.chef_notes,
      nutritionalInfo: recipe.nutritional_info,
      // Add availability fields
      availability_type: recipe.availability_type,
      available_days: recipe.available_days,
      preorder_opens_on: recipe.preorder_opens_on,
      requires_preorder: recipe.requires_preorder,
      special_order_surcharge: recipe.special_order_surcharge
    };
  };

  const getRecipeEmoji = (name: string) => {
    if (name?.includes("Chana Masala")) return "🫘";
    if (name?.includes("Chole")) return "🫘";
    if (name?.includes("Aloo Gobi")) return "🥔";
    if (name?.includes("Palak Paneer")) return "🟢";
    if (name?.includes("Rajma")) return "🫘";
    if (name?.includes("Egg Bhurji")) return "🍳";
    if (name?.includes("Egg Masala")) return "🥚";
    if (name?.includes("Chicken Masala")) return "🍛";
    if (name?.includes("Chicken Handi")) return "🍗";
    if (name?.includes("Mutton Masala")) return "🍖";
    if (name?.includes("Mutton Handi")) return "🥩";
    if (name?.includes("Fish")) return "🐟";
    return "🍽️";
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
              <div className="overflow-x-auto pb-2">
                <TabsList className="flex w-max min-w-full lg:grid lg:grid-cols-5 h-auto p-2 bg-white/80 backdrop-blur-sm border border-orange-100 rounded-full gap-2 lg:gap-0">
                  {categoryOptions.map((category) => (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="px-4 py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-orange-50 text-gray-700 whitespace-nowrap flex-shrink-0"
                    >
                      <span className="mr-1 md:mr-2">{category.emoji}</span>
                      <span className="hidden sm:inline">{category.name}</span>
                       <span className="sm:hidden">
                         {category.name === "All Items" ? "All" :
                          category.name === "Vegetarian Dishes" ? "Veg" :
                          category.name === "Egg Dishes" ? "Egg" :
                          category.name === "Chicken Dishes" ? "Chicken" :
                          category.name === "Mutton Dishes" ? "Mutton" :
                          category.name === "Fish Dishes" ? "Fish" : category.name}
                       </span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

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
