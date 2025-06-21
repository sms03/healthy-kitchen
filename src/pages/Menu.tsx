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
      <div className="min-h-screen professional-gradient">
        <Navigation />
        <div className="container mx-auto px-6 lg:px-8 pt-24">
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
  };

  return (
    <div className="min-h-screen professional-gradient">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <section className="section-spacing">
          <div className="container mx-auto container-padding">
            {/* Header */}
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <ChefHat className="w-8 h-8 text-slate-600" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight text-balance">
                Our Menu
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                Each dish is crafted with passion and precision using time-honored techniques and the finest ingredients.
              </p>
            </div>

            {/* Category Filter */}
            <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full mb-16">
              <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-2 lg:grid-cols-4 h-auto p-2 bg-white border border-slate-200">
                {categoryOptions.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="py-3 px-4 text-sm font-medium data-[state=active]:bg-slate-900 data-[state=active]:text-white rounded-md"
                  >
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value={activeCategory} className="mt-12">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredRecipes.map((recipe) => {
                    const dish = convertRecipeToDish(recipe);
                    return (
                      <DishCard key={`recipe-${recipe.id}`} dish={dish} />
                    );
                  })}
                </div>

                {filteredRecipes.length === 0 && (
                  <div className="text-center py-16">
                    <div className="minimal-card p-12 max-w-md mx-auto">
                      <ChefHat className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-600 text-lg">No dishes found in this category.</p>
                      <p className="text-sm text-slate-500 mt-2">Please try another category.</p>
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
