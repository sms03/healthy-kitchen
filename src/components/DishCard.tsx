import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageCarousel } from "@/components/ImageCarousel";
import { ContactInquiry } from "@/components/ContactInquiry";
import { useRecipeServings } from "@/hooks/useRecipeServings";
import { useAvailability, getAvailabilityBadgeProps } from "@/hooks/useAvailability";
import { Loader2, Flame, ChefHat } from "lucide-react";

interface DishCardProps {
  dish: {
    id: number;
    originalId?: string | number;
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
    // Availability fields
    availability_type?: string;
    available_days?: string[];
    preorder_opens_on?: string;
    requires_preorder?: boolean;
    special_order_surcharge?: number;
  };
}

export const DishCard = ({ dish }: DishCardProps) => {
  const [selectedServing, setSelectedServing] = useState<string>("single");
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { data: servings, isLoading: servingsLoading } = useRecipeServings(dish.originalId);
  const availability = useAvailability(dish);
  const badgeProps = getAvailabilityBadgeProps(availability.status);

  // Calculate final price based on selected serving and availability
  const selectedServingData = servings?.find(s => 
    (selectedServing === "single" && s.serving_name === "Single Portion") ||
    (selectedServing === "family" && s.serving_name === "Family Pack")
  );
  
  let basePrice = selectedServingData 
    ? (dish.price * selectedServingData.price_multiplier) + (selectedServingData.additional_price || 0)
    : dish.price;

  // Add special order surcharge if applicable
  const finalPrice = availability.status === 'special_order' && availability.priceWithSurcharge
    ? availability.priceWithSurcharge + (selectedServingData?.additional_price || 0)
    : basePrice;

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

  // Prepare image gallery - combine main image with gallery
  const allImages = [
    dish.image,
    ...(dish.imageGallery || [])
  ].filter(Boolean);

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

          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold text-gray-800">{dish.name}</h3>
                  <Badge {...badgeProps}>
                    <span className="mr-1">{badgeProps.icon}</span>
                    {availability.status === 'available' ? 'Available' :
                     availability.status === 'preorder' ? 'Preorder' :
                     availability.status === 'special_order' ? 'Special Order' :
                     'Unavailable'}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-orange-600">₹{finalPrice}</p>
                  {availability.status === 'special_order' && dish.special_order_surcharge && dish.special_order_surcharge > 0 && (
                    <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700">
                      +₹{dish.special_order_surcharge} surcharge
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">{availability.message}</p>
              </div>
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
                  <TabsTrigger 
                    value="single"
                    className="text-xs data-[state=active]:bg-orange-500 data-[state=active]:text-white rounded-full"
                  >
                    Single Portion
                  </TabsTrigger>
                  <TabsTrigger 
                    value="family"
                    className="text-xs data-[state=active]:bg-orange-500 data-[state=active]:text-white rounded-full"
                  >
                    Family Pack
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="single" className="mt-2">
                  <div className="text-xs text-gray-500 text-center">
                    {servings.find(s => s.serving_name === "Single Portion")?.serving_description || "Perfect for one person"}
                  </div>
                </TabsContent>
                <TabsContent value="family" className="mt-2">
                  <div className="text-xs text-gray-500 text-center">
                    {servings.find(s => s.serving_name === "Family Pack")?.serving_description || "Serves 3-4 people"}
                  </div>
                </TabsContent>
              </Tabs>
            )}

            <Button 
              onClick={() => setIsContactOpen(true)}
              disabled={!availability.canOrder}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {availability.status === 'available' ? 'Order Now' :
               availability.status === 'preorder' ? 'Preorder for Sunday' :
               availability.status === 'special_order' ? 'Special Order' :
               'Contact for Pre-Order'}
            </Button>
          </div>
        </CardContent>
      </Card>

        <ContactInquiry 
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
          dishName={dish.name}
          dishId={dish.id}
          servingSize={selectedServing === "single" ? "Single Portion" : "Family Pack"}
          availabilityInfo={availability}
          finalPrice={finalPrice}
        />
    </>
  );
};