
import { useState } from "react";
import { DishCard } from "@/components/DishCard";
import { Button } from "@/components/ui/button";

interface MenuSectionProps {
  onAddToCart: (dish: any) => void;
}

export const MenuSection = ({ onAddToCart }: MenuSectionProps) => {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Items", emoji: "🍽️" },
    { id: "bakery", name: "Bakery", emoji: "🧁" },
    { id: "veg", name: "Vegetarian", emoji: "🥗" },
    { id: "nonveg", name: "Non-Veg", emoji: "🍛" },
    { id: "healthy", name: "Healthy Specials", emoji: "🥑" }
  ];

  const menuItems = [
    {
      id: 1,
      name: "Chocolate Cupcakes",
      description: "Rich, moist chocolate cupcakes with creamy frosting",
      price: 150,
      category: "bakery",
      image: "🧁",
      rating: 4.8,
      prepTime: "30 mins"
    },
    {
      id: 2,
      name: "Fresh Garden Salad",
      description: "Crisp vegetables with homemade dressing",
      price: 180,
      category: "veg",
      image: "🥗",
      rating: 4.6,
      prepTime: "15 mins"
    },
    {
      id: 3,
      name: "Grilled Chicken Bowl",
      description: "Tender grilled chicken with quinoa and vegetables",
      price: 320,
      category: "nonveg",
      image: "🍛",
      rating: 4.9,
      prepTime: "45 mins"
    },
    {
      id: 4,
      name: "Avocado Toast",
      description: "Multigrain bread topped with fresh avocado and seeds",
      price: 200,
      category: "healthy",
      image: "🥑",
      rating: 4.7,
      prepTime: "10 mins"
    },
    {
      id: 5,
      name: "Red Velvet Cake",
      description: "Classic red velvet with cream cheese frosting",
      price: 400,
      category: "bakery",
      image: "🎂",
      rating: 4.9,
      prepTime: "60 mins"
    },
    {
      id: 6,
      name: "Paneer Tikka Bowl",
      description: "Marinated cottage cheese with aromatic spices",
      price: 280,
      category: "veg",
      image: "🍲",
      rating: 4.5,
      prepTime: "35 mins"
    }
  ];

  const filteredItems = activeCategory === "all" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="py-20 bg-gradient-to-br from-gray-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Our <span className="text-gradient bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">Delicious</span> Menu
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our carefully crafted selection of dishes, from traditional favorites to healthy innovations
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
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
          {filteredItems.map((dish) => (
            <DishCard 
              key={dish.id} 
              dish={dish} 
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
