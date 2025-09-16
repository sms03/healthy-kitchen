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

  // Filter recipes based on selected category
  const filteredRecipes = recipes?.filter(recipe => {
    if (activeCategory === "all") return true;
    return recipe.category_id?.toString() === activeCategory;
  }) || [];

  // Create categories with emojis for display
  const categoryOptions = [
    { id: "all", name: "All Items", emoji: "🍽️" },
    ...(categories?.map(cat => ({
      id: cat.id.toString(),
      name: cat.name,
      emoji: cat.name === "Vegetarian" ? "🥬" : 
             cat.name === "Eggiterian" ? "🥚" : 
             cat.name === "Non-Vegetarian" ? "🍖" : "🍽️"
    })) || [])
  ];

  // Convert recipe to dish format for compatibility with existing DishCard
  const convertRecipeToDish = (recipe: any) => {
    return {
      id: recipe.id,
      originalId: recipe.id.toString(),
      name: recipe.name || "Unknown Item",
      description: recipe.description || "",
      detailedDescription: recipe.detailed_description,
      price: typeof recipe.price === 'string' ? parseFloat(recipe.price) : (recipe.price || 0),
      image: recipe.name?.includes("Egg") ? "🥚" :
             recipe.name?.includes("Chicken") ? "🍗" :
             recipe.name?.includes("Mutton") ? "🍖" :
             recipe.name?.includes("Fish") ? "🐟" :
             recipe.name?.includes("Chana") || recipe.name?.includes("Chole") ? "🫘" :
             recipe.name?.includes("Paneer") ? "🧀" :
             recipe.name?.includes("Aloo") ? "🥔" :
             recipe.name?.includes("Palak") ? "🥬" :
             recipe.name?.includes("Dal") ? "🍛" : "🥘",
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
                Our <span className="text-gradient bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">Delicious</span> Menu
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Explore our diverse range of vegetarian, eggitarian, and non-vegetarian dishes
              </p>
            </div>

            {/* Category Filter using Tabs */}
            <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full mb-12">
              <div className="overflow-x-auto pb-2">
                <TabsList className={`flex w-max min-w-full h-auto p-2 bg-white/80 backdrop-blur-sm border border-orange-100 rounded-full gap-2 ${categoryOptions.length <= 4 ? `lg:grid lg:grid-cols-${categoryOptions.length}` : ''} lg:gap-0`}>
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
                         category.name === "Vegetarian" ? "Veg" :
                         category.name === "Eggiterian" ? "Egg" :
                         category.name === "Non-Vegetarian" ? "Non-Veg" : category.name}
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