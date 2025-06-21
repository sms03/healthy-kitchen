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
      <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-50/30">
        <Navigation />
        <div className="container mx-auto px-6 lg:px-8 pt-32">
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-slate-600" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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

  const targetDishes = [
    'Egg Bhurji', 'Egg Masala', 
    'Chicken Masala', 'Chicken Handi', 
    'Mutton Masala', 'Mutton Handi',
    'Fish Curry', 'Fish Fry'
  ];

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

  const allRecipes = [...(recipes || [])];
  
  staticFishDishes.forEach(staticDish => {
    const exists = recipes?.some(recipe => 
      recipe.name.toLowerCase() === staticDish.name.toLowerCase()
    );
    if (!exists) {
      allRecipes.push(staticDish);
    }
  });

  const filteredRecipes = allRecipes.filter(recipe => 
    (targetDishes.includes(recipe.name) || recipe.name.toLowerCase().includes('fish')) &&
    (activeCategory === "all" || recipe.category_id === activeCategory)
  );

  const categoryOptions = [
    { id: "all", name: "All Dishes" },
    ...(categories?.map(cat => ({
      id: cat.id,
      name: cat.name,
    })) || [])
  ];

  const convertRecipeToDish = (recipe: any) => {
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
    
    let adjustedSpiceLevel = recipe.spice_level;
    if (recipe.name?.includes("Chicken Handi") || recipe.name?.includes("Mutton Handi")) {
      adjustedSpiceLevel = 2;
    }

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
      spiceLevel: adjustedSpiceLevel,
      cookingMethod: recipe.cooking_method,
      chefNotes: chefNotes,
      nutritionalInfo: recipe.nutritional_info
    };
  };  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-50/30">
      <Navigation />
        <main className="pt-32 pb-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"></div>
          <div className="relative container mx-auto px-6 lg:px-8 py-10">
            <div className="text-center max-w-3xl mx-auto">              <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-white/20 mb-6">
                <ChefHat className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-medium text-slate-700">Signature Collection</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
                Our 
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Menu</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Each dish is a masterpiece, crafted with passion and precision using time-honored techniques and the finest ingredients.
              </p>
            </div>
          </div>
        </section>

        {/* Menu Section */}
        <section className="py-12">
          <div className="container mx-auto px-6 lg:px-8">
            {/* Category Filter */}
            <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full mb-8">
              <div className="flex justify-center mb-6">
                <TabsList className="grid grid-cols-2 lg:grid-cols-4 h-auto p-2 bg-white/70 backdrop-blur-md border border-white/20 shadow-lg rounded-xl">
                  {categoryOptions.map((category) => (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="py-3 px-5 text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg transition-all duration-300"
                    >
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <TabsContent value={activeCategory} className="mt-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredRecipes.map((recipe) => {
                    const dish = convertRecipeToDish(recipe);
                    return (
                      <div key={`recipe-${recipe.id}`} className="transform hover:scale-105 transition-all duration-300">
                        <DishCard dish={dish} />
                      </div>
                    );
                  })}
                </div>

                {filteredRecipes.length === 0 && (
                  <div className="text-center py-16">
                    <div className="modern-card p-12 max-w-md mx-auto">
                      <ChefHat className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-slate-900 mb-3">No dishes found</h3>
                      <p className="text-slate-600 leading-relaxed">
                        No dishes found in this category. Please try another category to explore our delicious offerings.
                      </p>
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
