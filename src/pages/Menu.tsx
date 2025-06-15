
import { useState } from "react";
import { DishCard } from "@/components/DishCard";
import { Button } from "@/components/ui/button";
import { useCategories } from "@/hooks/useCategories";
import { useRecipes } from "@/hooks/useRecipes";
import { Loader2 } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Cart } from "@/components/Cart";

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: recipes, isLoading: recipesLoading } = useRecipes();

  const addToCart = (dish) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === dish.id);
      if (existing) {
        return prev.map(item => 
          item.id === dish.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...dish, quantity: 1 }];
    });
  };

  const removeFromCart = (dishId) => {
    setCartItems(prev => prev.filter(item => item.id !== dishId));
  };

  const updateQuantity = (dishId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(dishId);
      return;
    }
    setCartItems(prev => 
      prev.map(item => 
        item.id === dishId ? { ...item, quantity } : item
      )
    );
  };

  if (categoriesLoading || recipesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
        <Navigation 
          cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          onCartClick={() => setIsCartOpen(true)}
        />
        <div className="container mx-auto px-4 pt-32">
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
          </div>
        </div>
        <Footer />
      </div>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <Navigation 
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
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
              {filteredRecipes.map((recipe) => (
                <DishCard 
                  key={recipe.id} 
                  dish={convertRecipeToDish(recipe)} 
                  onAddToCart={addToCart}
                />
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
    </div>
  );
};

export default Menu;
