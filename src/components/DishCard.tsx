import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Flame, ChefHat, Info } from "lucide-react";
import { useRecipeServings } from "@/hooks/useRecipeServings";
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
    nutritionalInfo?: any;  };
}

export const DishCard = ({ dish }: DishCardProps) => {
  const [selectedServing, setSelectedServing] = useState<string>("");
  const [isContactOpen, setIsContactOpen] = useState(false);
  
  // Fetch serving options for this dish
  const { data: servings, isLoading: servingsLoading } = useRecipeServings(dish.originalId);
  
  // Set default serving when servings are loaded
  useEffect(() => {
    if (servings && servings.length > 0 && !selectedServing) {
      setSelectedServing(servings[0].id);
    }
  }, [servings, selectedServing]);

  // Find the current serving option
  const currentServing = servings?.find(s => s.id === selectedServing) || servings?.[0];
  
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

  // Prepare image gallery - combine main image with gallery
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
    <>
      <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-orange-100">
        <CardContent className="p-6">
          {/* Image Carousel */}
          <ImageCarousel
            images={allImages}
            dishName={dish.name}
            className="w-full h-48 mb-4 group-hover:scale-105 transition-transform duration-300"
          />

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

            {/* Spice Level and Cooking Method */}
            <div className="flex items-center gap-3 flex-wrap">
              {dish.spiceLevel && (
                <Badge variant="outline" className="text-xs">
                  <Flame className="w-3 h-3 mr-1" />
                  {spiceInfo.text}
                  <span className="ml-1">
                    {'🔥'.repeat(spiceInfo.flames)}
                  </span>
                </Badge>
              )}
              {dish.cookingMethod && (
                <Badge variant="outline" className="text-xs">
                  <ChefHat className="w-3 h-3 mr-1" />
                  {dish.cookingMethod}
                </Badge>
              )}
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">
              {dish.detailedDescription || dish.description}
            </p>

            {/* Chef's Notes */}
            {dish.chefNotes && (
              <div className="bg-orange-50 p-3 rounded-lg">
                <p className="text-xs font-medium text-orange-800 mb-1">👨‍🍳 Chef's Note:</p>
                <p className="text-xs text-orange-700">{dish.chefNotes}</p>
              </div>
            )}

            {/* Serving Size Tabs */}
            {servings && servings.length > 1 && (
              <Tabs value={selectedServing} onValueChange={setSelectedServing} className="w-full">
                <TabsList className="grid w-full grid-cols-2 h-9 rounded-full">
                  {servings.map((serving) => (
                    <TabsTrigger 
                      key={serving.id} 
                      value={serving.id}
                      className="text-xs data-[state=active]:bg-orange-500 data-[state=active]:text-white rounded-full"
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

            {/* Contact Us Button */}
            <Button
              onClick={handleContactUs}
              disabled={!currentServing}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white py-3 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Contact for Pre-Order
            </Button>

            {/* Pre-order Info */}
            <div className="text-xs text-center text-gray-500 bg-gray-50 p-2 rounded">
              💡 Limited orders only • 50% advance • Remaining on delivery
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

