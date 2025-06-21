
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
      <Card className="modern-card group overflow-hidden">
        <CardContent className="p-0">          {/* Image */}
          <div className="relative overflow-hidden">
            <ImageCarousel
              images={allImages}
              dishName={dish.name}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            
            {/* Price Badge */}
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg border border-white/20">
              <span className="text-base font-bold text-slate-900">₹{finalPrice}</span>
            </div>

            {/* Spice Level Indicator */}
            {dish.spiceLevel && (
              <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                {Array.from({ length: spiceInfo.flames }, (_, i) => (
                  <Flame key={i} className="w-3 h-3 inline-block fill-current" />
                ))}
                <span className="ml-1">{spiceInfo.text}</span>
              </div>
            )}
          </div>{/* Content */}
          <div className="p-5 space-y-3">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {dish.name}
              </h3>
              
              {/* Badges */}
              <div className="flex items-center gap-2 flex-wrap">
                {dish.cookingMethod && (
                  <Badge variant="outline" className="border-indigo-200 text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors text-xs">
                    <ChefHat className="w-3 h-3 mr-1" />
                    {dish.cookingMethod}
                  </Badge>
                )}
              </div>
            </div>

            <p className="text-slate-600 leading-relaxed line-clamp-3 text-sm">
              {dish.detailedDescription || dish.description}
            </p>

            {/* Chef's Notes */}
            {dish.chefNotes && (
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 p-3 rounded-xl">
                <div className="flex items-center mb-2">
                  <div className="w-5 h-5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mr-2">
                    <ChefHat className="w-3 h-3 text-white" />
                  </div>
                  <p className="text-xs font-semibold text-indigo-900">Chef's Special Note</p>
                </div>
                <p className="text-xs text-indigo-800 leading-relaxed">{dish.chefNotes}</p>
              </div>
            )}

            {/* Fish availability note */}
            {isFishDish && (
              <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl">
                <div className="flex items-center mb-1">
                  <Info className="w-4 h-4 text-amber-600 mr-2" />
                  <p className="text-xs font-semibold text-amber-900">Fresh Catch Notice</p>
                </div>
                <p className="text-xs text-amber-800">
                  Daily selection based on freshest catch. Pricing varies with market availability.
                </p>
              </div>
            )}

            {/* Serving Options */}
            {currentServings && currentServings.length > 1 && (
              <Tabs value={selectedServing} onValueChange={setSelectedServing} className="w-full">
                <TabsList className="grid w-full grid-cols-2 h-auto p-1 bg-slate-100 rounded-lg">
                  {currentServings.map((serving) => (
                    <TabsTrigger 
                      key={serving.id} 
                      value={serving.id}
                      className="py-2 text-xs data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-indigo-600 rounded-md transition-all duration-300"
                    >
                      {serving.serving_name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {currentServings.map((serving) => (
                  <TabsContent key={serving.id} value={serving.id} className="mt-2">
                    <div className="text-xs text-slate-700 text-center bg-slate-50 p-3 rounded-lg border border-slate-200">
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
              className="w-full cta-button py-3 text-sm font-medium"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Reserve This Dish
            </Button>

            {/* Reservation Info */}
            <div className="text-xs text-center text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-200">
              <strong>50% advance</strong> • Balance on delivery • Limited daily preparation
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
