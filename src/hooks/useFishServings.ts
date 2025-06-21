
import { useQuery } from "@tanstack/react-query";

export interface FishServing {
  id: string;
  serving_name: string;
  serving_description: string | null;
  price_multiplier: number;
  additional_price: number | null;
}

export const useFishServings = () => {
  return useQuery({
    queryKey: ['fish-servings'],
    queryFn: async () => {
      // Static fish serving options
      const fishServings: FishServing[] = [
        {
          id: 'pompret',
          serving_name: 'Pompret',
          serving_description: 'Premium white fish, delicate flavor - Market Price',
          price_multiplier: 1.2,
          additional_price: 50
        },
        {
          id: 'surmai',
          serving_name: 'Surmai',
          serving_description: 'King Mackerel, firm texture - Market Price',
          price_multiplier: 1.3,
          additional_price: 80
        },
        {
          id: 'bangda',
          serving_name: 'Bangda',
          serving_description: 'Fresh Mackerel, rich in flavor - Market Price',
          price_multiplier: 1.0,
          additional_price: 20
        },
        {
          id: 'chef-choice',
          serving_name: 'Chef\'s Choice',
          serving_description: 'Daily fresh catch selected by our chef - Market Price',
          price_multiplier: 1.1,
          additional_price: 40
        }
      ];
      
      return fishServings;
    },
  });
};
