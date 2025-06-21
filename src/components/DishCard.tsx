
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Flame, ChefHat, Info } from "lucide-react";
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
    spiceLevel?: number;
    cookingMethod?: string;
    chefNotes?: string;
    nutritionalInfo?: any;
  };
}

export const DishCard = ({ dish }: DishCardProps) => {
  const [selectedServing, setSelectedServing] = useState<string>("");
  const [isContactOpen, setIsContactOpen] = useState(false);
  
  const isFishDish = dish.name.toLowerCase().includes('fish');
  
  const { data: servings, isLoading: servingsLoading } = useRecipeServings(
    !isFishDish ? dish.originalId : undefined
  );
  const { data: fishServings, isLoading: fishServingsLoading } = useFishServings();
  
  const currentServings = isFishDish ? fishServings : servings;
  const isLoading = isFishDish ? fishServingsLoading : servingsLoading;
  
  useEffect(() => {
    if (currentServings && currentServings.length > 0 && !selectedServing) {
      setSelectedServing(currentServings[0].id);
    }
  }, [currentServings, selectedServing]);

  const currentServing = currentServings?.find(s => s.id === selectedServing) || currentServings?.[0];
  
  const finalPrice = currentServing 
    ? Math.round(dish.price * currentServing.price_multiplier + (currentServing.additional_price || 0))
    : dish.price;

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

  const allImages = [dish.image, ...(dish.imageGallery || [])].filter(Boolean);

  if (isLoading) {
    return (
      <Card className="minimal-card">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="w-full h-48 bg-slate-100 rounded-lg"></div>
            <div className="h-4 bg-slate-100 rounded w-3/4"></div>
            <div className="h-4 bg-slate-100 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="minimal-card group hover:shadow-lg transition-all duration-300">
        <CardContent className="p-6">
          {/* Image */}
          <ImageCarousel
            images={allImages}
            dishName={dish.name}
            className="w-full h-48 mb-6 rounded-lg overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100"
          />

          {/* Content */}
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {dish.name}
                </h3>
                
                {/* Badges */}
                <div className="flex items-center gap-2 flex-wrap mb-3">
                  {dish.spiceLevel && (
                    <Badge variant="outline" className="border-slate-200 text-slate-600 bg-slate-50">
                      <Flame className="w-3 h-3 mr-1" />
                      {spiceInfo.text}
                    </Badge>
                  )}
                  {dish.cookingMethod && (
                    <Badge variant="outline" className="border-slate-200 text-slate-600 bg-slate-50">
                      <ChefHat className="w-3 h-3 mr-1" />
                      {dish.cookingMethod}
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="text-right ml-4">
                <span className="text-2xl font-bold text-slate-900">
                  ₹{finalPrice}
                </span>
              </div>
            </div>

            <p className="text-slate-600 leading-relaxed">
              {dish.detailedDescription || dish.description}
            </p>

            {/* Chef's Notes */}
            {dish.chefNotes && (
              <div className="bg-blue-50 border-l-4 border-blue-200 p-4 rounded-r-lg">
                <div className="flex items-center mb-2">
                  <ChefHat className="w-4 h-4 text-blue-600 mr-2" />
                  <p className="text-sm font-medium text-blue-900">Chef's Note</p>
                </div>
                <p className="text-sm text-blue-800 leading-relaxed">{dish.chefNotes}</p>
              </div>
            )}

            {/* Fish availability note */}
            {isFishDish && (
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Info className="w-4 h-4 text-slate-600 mr-2" />
                  <p className="text-sm font-medium text-slate-700">Availability Notice</p>
                </div>
                <p className="text-sm text-slate-600">
                  Fresh catch prepared daily. Availability and pricing depend on market conditions.
                </p>
              </div>
            )}

            {/* Serving Options */}
            {currentServings && currentServings.length > 1 && (
              <Tabs value={selectedServing} onValueChange={setSelectedServing} className="w-full">
                <TabsList className="grid w-full grid-cols-2 h-auto p-1 bg-slate-50">
                  {currentServings.map((serving) => (
                    <TabsTrigger 
                      key={serving.id} 
                      value={serving.id}
                      className="py-3 text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm"
                    >
                      {serving.serving_name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {currentServings.map((serving) => (
                  <TabsContent key={serving.id} value={serving.id} className="mt-3">
                    <div className="text-sm text-slate-600 text-center bg-slate-50 p-3 rounded-lg">
                      {serving.serving_description}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            )}

            {/* Order Button */}
            <Button
              onClick={() => setIsContactOpen(true)}
              disabled={!currentServing}
              className="w-full professional-button py-3"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Reserve This Dish
            </Button>

            {/* Reservation Info */}
            <div className="text-xs text-center text-slate-500 bg-slate-50 p-3 rounded-lg">
              50% advance • Balance on delivery • Limited daily preparation
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
