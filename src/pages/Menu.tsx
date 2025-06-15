
import { useState, useEffect, useRef } from "react";
import { DishCard } from "@/components/DishCard";
import { Button } from "@/components/ui/button";
import { useCategories } from "@/hooks/useCategories";
import { useRecipes } from "@/hooks/useRecipes";
import { useCart } from "@/contexts/CartContext";
import { Loader2 } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Cart } from "@/components/Cart";
import { AnimatedPageWrapper } from "@/components/AnimatedPageWrapper";
import { useGSAPAnimations } from "@/hooks/useGSAPAnimations";

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const menuGridRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: recipes, isLoading: recipesLoading } = useRecipes();
  const { items: cartItems, addToCart, removeFromCart, updateQuantity, getCartItemsCount } = useCart();
  const { staggerAnimation, fadeInUp, scrollTriggerAnimation } = useGSAPAnimations();

  useEffect(() => {
    if (categoryRef.current) {
      fadeInUp(categoryRef.current, 0.2);
    }
  }, [fadeInUp]);

  useEffect(() => {
    if (menuGridRef.current && !categoriesLoading && !recipesLoading) {
      // Animate menu items when they load or when category changes
      staggerAnimation(".dish-card", 0.1);
      scrollTriggerAnimation(".dish-card");
    }
  }, [activeCategory, categoriesLoading, recipesLoading, staggerAnimation, scrollTriggerAnimation]);

  if (categoriesLoading || recipesLoading) {
    return (
      <AnimatedPageWrapper className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
        <Navigation 
          cartItemsCount={getCartItemsCount()}
          onCartClick={() => setIsCartOpen(true)}
        />
        <div className="container mx-auto px-4 pt-32">
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
          </div>
        </div>
        <Footer />
      </AnimatedPageWrapper>
    );
  }

  // Create categories with emojis for display
  const categoryOptions = [
    { id: "all", name: "All Items", emoji: "🍽️" },
    ...(categories?.map(cat => ({
      id: cat.id,
      name: cat.name,
      emoji: cat.name === "Egg Dishes" ? "🥚" : 
             cat.name === "Chicken Dishes" ? "🍗" : 
             cat.name === "Mutton Dishes" ? "🍖" : "🍽️"
    })) || [])
  ];

  // Filter recipes by category
  const filteredRecipes = activeCategory === "all" 
    ? recipes || []
    : recipes?.filter(recipe => recipe.category_id === activeCategory) || [];

  // Convert recipe to dish format for compatibility with existing DishCard
  const convertRecipeToDish = (recipe: any) => ({
    id: recipe.id,
    name: recipe.name,
    description: recipe.description || "",
    price: recipe.price,
    image: recipe.name.includes("Egg Bhurji") ? "🍳" :
           recipe.name.includes("Egg Masala") ? "🥚" :
           recipe.name.includes("Chicken Masala") ? "🍛" :
           recipe.name.includes("Chicken Handi") ? "🍗" :
           recipe.name.includes("Mutton Masala") ? "🍖" :
           recipe.name.includes("Mutton Handi") ? "🥩" : "🍽️",
    rating: 4.5 + Math.random() * 0.4,
    prepTime: recipe.preparation_time ? `${recipe.preparation_time} mins` : "30 mins"
  });

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    // Trigger animation for new items
    setTimeout(() => {
      if (menuGridRef.current) {
        staggerAnimation(".dish-card", 0.05);
      }
    }, 100);
  };

  return (
    <AnimatedPageWrapper className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <Navigation 
        cartItemsCount={getCartItemsCount()}
        onCartClick={() => setIsCartOpen(true)}
      />
      
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

            {/* Category Filter */}
            <div ref={categoryRef} className="flex flex-wrap justify-center gap-4 mb-12 opacity-0">
              {categoryOptions.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`px-6 py-3 rounded-full transition-all duration-500 hover:scale-105 ${
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
            <div ref={menuGridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRecipes.map((recipe) => (
                <div key={recipe.id} className="dish-card opacity-0">
                  <DishCard 
                    dish={convertRecipeToDish(recipe)} 
                    onAddToCart={addToCart}
                  />
                </div>
              ))}
            </div>

            {filteredRecipes.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No items found in this category.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
      
      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />
    </AnimatedPageWrapper>
  );
};

export default Menu;
