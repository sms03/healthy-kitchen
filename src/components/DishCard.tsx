
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Flame, ChefHat, Info, Star } from "lucide-react";
import { useRecipeServings } from "@/hooks/useRecipeServings";
import { useFishServings } from "@/hooks/useFishServings";
import { ContactInquiry } from "@/components/ContactInquiry";
import { ImageCarousel } from "@/components/ImageCarousel";

interface DishCardProps {
  dish: {
    id: number;
    originalId?: string;
    name: string;
    description: string;
    detailedDescription?: string;
    price: number;
    image: string;
    imageGallery?: string[];
    rating: number;
    spiceLevel?: number;
    cookingMethod?: string;
    chefNotes?: string;
    nutritionalInfo?: any;
  };
  onAddToCart?: (dish: any) => void;
}

export const DishCard = ({ dish }: DishCardProps) => {
  const [selectedServing, setSelectedServing] = useState<string>("");
  const [isContactOpen, setIsContactOpen] = useState(false);
  
  // Check if it's a fish dish
  const isFishDish = dish.name.toLowerCase().includes('fish');
  
  // Fetch appropriate serving options
  const { data: servings, isLoading: servingsLoading } = useRecipeServings(
    !isFishDish ? dish.originalId : undefined
  );
  const { data: fishServings, isLoading: fishServingsLoading } = useFishServings();
  
  // Use appropriate servings based on dish type
  const currentServings = isFishDish ? fishServings : servings;
  const isLoading = isFishDish ? fishServingsLoading : servingsLoading;
  
  // Set default serving when servings are loaded
  useEffect(() => {
    if (currentServings && currentServings.length > 0 && !selectedServing) {
      setSelectedServing(currentServings[0].id);
    }
  }, [currentServings, selectedServing]);

  // Find the current serving option
  const currentServing = currentServings?.find(s => s.id === selectedServing) || currentServings?.[0];
  
  // Calculate the price based on selected serving
  const finalPrice = currentServing 
    ? Math.round(dish.price * currentServing.price_multiplier + (currentServing.additional_price || 0))
    : dish.price;

  const handleContactUs = () => {
    const dishWithServing = {
      ...dish,
      price: finalPrice,
    };
    setIsContactOpen(true);
  };

  // Prepare image gallery
  const allImages = [
    dish.image,
    ...(dish.imageGallery || [])
  ].filter(Boolean);

  // Get spice level display
  const getSpiceLevel = (level?: number) => {
    if (!level) return { text: "Mild", flames: 1 };
    const spiceLevels = [
      { text: "Mild", flames: 1 },
      { text: "Medium", flames: 2 },
      { text: "Hot", flames: 3 },
      { text: "Very Hot", flames: 4 },
      { text: "Extremely Hot", flames: 5 }
    ];
    return spiceLevels[level - 1] || spiceLevels[0];
  };

  const spiceInfo = getSpiceLevel(dish.spiceLevel);

  if (isLoading) {
    return (
      <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 elegant-card">
        <CardContent className="p-8">
          <div className="animate-pulse space-y-4">
            <div className="w-full h-56 bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl"></div>
            <div className="h-4 bg-amber-100 rounded w-3/4"></div>
            <div className="h-4 bg-amber-100 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 elegant-card border-amber-100">
        <CardContent className="p-8">
          {/* Image Carousel */}
          <ImageCarousel
            images={allImages}
            dishName={dish.name}
            className="w-full h-56 mb-6 group-hover:scale-105 transition-transform duration-500 rounded-2xl overflow-hidden shadow-lg"
          />

          {/* Dish Info */}
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-bold text-deep-charcoal group-hover:text-amber-600 transition-colors font-playfair">
                  {dish.name}
                </h3>
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(dish.rating) 
                            ? 'text-amber-400 fill-amber-400' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600 font-medium">
                    {dish.rating.toFixed(1)}
                  </span>
                </div>
              </div>
              <span className="text-3xl font-bold text-amber-600 font-playfair">
                ₹{finalPrice}
              </span>
            </div>

            {/* Spice Level and Cooking Method */}
            <div className="flex items-center gap-3 flex-wrap">
              {dish.spiceLevel && (
                <Badge variant="outline" className="border-amber-200 text-amber-700 bg-amber-50">
                  <Flame className="w-3 h-3 mr-1" />
                  {spiceInfo.text}
                  <span className="ml-1">
                    {'🔥'.repeat(spiceInfo.flames)}
                  </span>
                </Badge>
              )}
              {dish.cookingMethod && (
                <Badge variant="outline" className="border-orange-200 text-orange-700 bg-orange-50">
                  <ChefHat className="w-3 h-3 mr-1" />
                  {dish.cookingMethod}
                </Badge>
              )}
            </div>

            <p className="text-gray-700 leading-relaxed">
              {dish.detailedDescription || dish.description}
            </p>

            {/* Chef's Notes - Always shown */}
            {dish.chefNotes && (
              <div className="chef-signature p-4 rounded-xl">
                <div className="flex items-center mb-2">
                  <ChefHat className="w-4 h-4 text-amber-600 mr-2" />
                  <p className="text-sm font-semibold text-amber-800">Chef's Signature Note</p>
                </div>
                <p className="text-sm text-amber-700 italic leading-relaxed">{dish.chefNotes}</p>
              </div>
            )}

            {/* Fish availability note */}
            {isFishDish && (
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl">
                <div className="flex items-center mb-2">
                  <Info className="w-4 h-4 text-blue-600 mr-2" />
                  <p className="text-sm font-semibold text-blue-800">Fresh Catch Notice</p>
                </div>
                <p className="text-sm text-blue-700">
                  Our fish dishes are prepared with the day's freshest catch. Availability and pricing depend on market conditions and seasonal availability.
                </p>
              </div>
            )}

            {/* Serving Size Tabs */}
            {currentServings && currentServings.length > 1 && (
              <Tabs value={selectedServing} onValueChange={setSelectedServing} className="w-full">
                <TabsList className="grid w-full grid-cols-2 h-auto p-1 bg-amber-50 border border-amber-200">
                  {currentServings.map((serving) => (
                    <TabsTrigger 
                      key={serving.id} 
                      value={serving.id}
                      className="py-3 text-sm data-[state=active]:bg-amber-500 data-[state=active]:text-white font-medium rounded-lg"
                    >
                      {serving.serving_name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {currentServings.map((serving) => (
                  <TabsContent key={serving.id} value={serving.id} className="mt-3">
                    <div className="text-sm text-gray-600 text-center bg-gray-50 p-3 rounded-lg">
                      {serving.serving_description}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            )}

            {/* Contact Us Button */}
            <Button
              onClick={handleContactUs}
              disabled={!currentServing}
              className="w-full restaurant-button py-4 rounded-xl transition-all duration-300 transform hover:scale-105 font-medium text-lg"
            >
              <MessageCircle className="w-5 h-5 mr-3" />
              Reserve Your Experience
            </Button>

            {/* Pre-order Info */}
            <div className="text-sm text-center text-gray-600 bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl border border-amber-100">
              <div className="flex items-center justify-center mb-1">
                <Star className="w-4 h-4 text-amber-500 mr-1" />
                <span className="font-medium">Exclusive Dining Experience</span>
                <Star className="w-4 h-4 text-amber-500 ml-1" />
              </div>
              <p>50% advance reservation • Balance on delivery • Limited daily preparations</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <ContactInquiry
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        dish={dish}
        servingSize={currentServing?.serving_name}
      />
    </>
  );
};
