
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Star, Clock, Plus, Minus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useRecipeServings } from "@/hooks/useRecipeServings";

interface DishCardProps {
  dish: {
    id: number;
    originalId?: string;
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
  const [selectedServing, setSelectedServing] = useState<string>("");
  
  // Fetch serving options for this dish
  const { data: servings, isLoading: servingsLoading } = useRecipeServings(dish.originalId);
  
  // Set default serving when servings are loaded
  useState(() => {
    if (servings && servings.length > 0 && !selectedServing) {
      setSelectedServing(servings[0].id);
    }
  }, [servings]);

  // Find the current serving option
  const currentServing = servings?.find(s => s.id === selectedServing) || servings?.[0];
  
  // Calculate the price based on selected serving
  const finalPrice = currentServing 
    ? Math.round(dish.price * currentServing.price_multiplier + (currentServing.additional_price || 0))
    : dish.price;

  // Create a unique cart item ID that includes serving info
  const cartItemId = selectedServing ? 
    parseInt(`${dish.id}${selectedServing.slice(-4)}`, 36) % 1000000 : dish.id;
  
  // Find if this specific dish+serving combo is in cart
  const cartItem = items.find(item => 
    item.id === cartItemId || 
    (item.originalId === dish.originalId && item.name.includes(currentServing?.serving_name || ''))
  );
  const quantity = cartItem?.quantity || 0;

  const handleIncrease = () => {
    if (!currentServing) return;
    
    const dishWithServing = {
      ...dish,
      id: cartItemId,
      name: `${dish.name} (${currentServing.serving_name})`,
      price: finalPrice,
      servingId: currentServing.id,
      servingName: currentServing.serving_name
    };

    if (quantity === 0) {
      onAddToCart(dishWithServing);
    } else {
      updateQuantity(cartItemId, quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      updateQuantity(cartItemId, quantity - 1);
    }
  };

  if (servingsLoading) {
    return (
      <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-orange-100">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="w-full h-48 bg-gray-200 rounded-xl"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

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
              ₹{finalPrice}
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

          {/* Serving Size Tabs */}
          {servings && servings.length > 1 && (
            <Tabs value={selectedServing} onValueChange={setSelectedServing} className="w-full">
              <TabsList className="grid w-full grid-cols-2 h-9">
                {servings.map((serving) => (
                  <TabsTrigger 
                    key={serving.id} 
                    value={serving.id}
                    className="text-xs data-[state=active]:bg-orange-500 data-[state=active]:text-white"
                  >
                    {serving.serving_name}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {servings.map((serving) => (
                <TabsContent key={serving.id} value={serving.id} className="mt-2">
                  <div className="text-xs text-gray-500 text-center">
                    {serving.serving_description}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          )}

          {/* Add to Cart Button or Quantity Controls */}
          {quantity === 0 ? (
            <Button
              onClick={handleIncrease}
              disabled={!currentServing}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
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
                className="w-10 h-10 p-0 rounded-full border-orange-200 hover:bg-orange-50"
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
                className="w-10 h-10 p-0 rounded-full border-orange-200 hover:bg-orange-50"
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
