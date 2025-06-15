
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Clock, Plus, Minus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface DishCardProps {
  dish: {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    rating: number;
    prepTime: string;
  };
  onAddToCart: (dish: any) => void;
}

export const DishCard = ({ dish, onAddToCart }: DishCardProps) => {
  const { items, updateQuantity } = useCart();
  
  // Find if this dish is already in cart
  const cartItem = items.find(item => item.id === dish.id);
  const quantity = cartItem?.quantity || 0;

  const handleIncrease = () => {
    if (quantity === 0) {
      onAddToCart(dish);
    } else {
      updateQuantity(dish.id, quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      updateQuantity(dish.id, quantity - 1);
    }
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-orange-100">
      <CardContent className="p-6">
        {/* Dish Image */}
        <div className="w-full h-48 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl mb-4 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-300">
          {dish.image}
        </div>

        {/* Dish Info */}
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
              {dish.name}
            </h3>
            <span className="text-2xl font-bold text-orange-600">
              ₹{dish.price}
            </span>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed">
            {dish.description}
          </p>

          {/* Rating and Prep Time */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{dish.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{dish.prepTime}</span>
            </div>
          </div>

          {/* Add to Cart Button or Quantity Controls */}
          {quantity === 0 ? (
            <Button
              onClick={handleIncrease}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white py-3 rounded-lg transition-all duration-300"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          ) : (
            <div className="flex items-center justify-between">
              <Button
                onClick={handleDecrease}
                variant="outline"
                size="sm"
                className="w-10 h-10 p-0 rounded-full border-orange-200 hover:bg-orange-50 transition-colors duration-200"
              >
                <Minus className="w-4 h-4" />
              </Button>
              
              <span className="text-lg font-semibold text-orange-600 bg-orange-50 px-4 py-2 rounded-full">
                {quantity} in cart
              </span>
              
              <Button
                onClick={handleIncrease}
                variant="outline"
                size="sm"
                className="w-10 h-10 p-0 rounded-full border-orange-200 hover:bg-orange-50 transition-colors duration-200"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
