
import { useState } from "react";
import { DishCard } from "@/components/DishCard";
import { Button } from "@/components/ui/button";
import { useCategories } from "@/hooks/useCategories";
import { useRecipes } from "@/hooks/useRecipes";
import { Loader2 } from "lucide-react";

export const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: recipes, isLoading: recipesLoading } = useRecipes();

  if (categoriesLoading || recipesLoading) {
    return (
      <section id="menu" className="py-20 bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
          </div>
        </div>
      </section>
    );
  }

  // Define the specific dishes we want to show
  const targetDishes = [
    'Egg Bhurji', 'Egg Masala', 
    'Chicken Masala', 'Chicken Handi', 
    'Mutton Masala', 'Mutton Handi',
    'Fish Curry', 'Fish Fry'
  ];

  // Create categories with emojis for display
  const categoryOptions = [
    { id: "all", name: "All Items", emoji: "🍽️" },
    ...(categories?.map(cat => ({
      id: cat.id.toString(),
      name: cat.name,
      emoji: cat.name === "Egg Dishes" ? "🥚" : 
             cat.name === "Chicken Dishes" ? "🍗" : 
             cat.name === "Mutton Dishes" ? "🍖" :
             cat.name === "Fish Dishes" ? "🐟" : 
             cat.name === "Vegetarian Dishes" ? "🥬" : "🍽️"
    })) || [])
  ];

  // Filter to show the specific dishes
  const filteredRecipes = recipes?.filter(recipe => 
    targetDishes.includes(recipe.name) &&
    (activeCategory === "all" || recipe.category_id?.toString() === activeCategory)
  ) || [];

  // Convert recipe to dish format for compatibility with existing DishCard
  const convertRecipeToDish = (recipe: any) => {
    // Create a hash from the ID string to get a consistent numeric ID
    const stringToHash = (str: string) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
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
      rating: 4.5 + Math.random() * 0.4, // Random rating between 4.5-4.9
      spiceLevel: adjustedSpiceLevel,
      cookingMethod: recipe.name?.includes("Fish") ? null : recipe.cooking_method,
      chefNotes: recipe.chef_notes,
      nutritionalInfo: recipe.nutritional_info
    };
  };

  return (
    <section id="menu" className="py-20 bg-gradient-to-br from-gray-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Our <span className="text-gradient bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">Signature</span> Menu
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Carefully crafted dishes with authentic flavors, made fresh daily for your enjoyment
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categoryOptions.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg"
                  : "border-orange-200 text-gray-700 hover:bg-orange-50"
              }`}
            >
              <span className="mr-2">{category.emoji}</span>
              {category.name}
            </Button>
          ))}
        </div>

        {/* Menu Grid */}
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
      </div>
    </section>
  );
};
