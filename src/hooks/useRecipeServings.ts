
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface RecipeServing {
  id: number;
  recipe_id: number;
  serving_name: string;
  serving_description: string | null;
  price_multiplier: number;
  additional_price: number | null;
  created_at: string;
}

export const useRecipeServings = (recipeId?: number | string) => {
  return useQuery({
    queryKey: ['recipe-servings', recipeId],
    queryFn: async () => {
      if (!recipeId) return [];
      
      const { data, error } = await supabase
        .from('recipe_servings')
        .select('*')
        .eq('recipe_id', parseInt(recipeId.toString()))
        .order('price_multiplier');
      
      if (error) {
        throw error;
      }
      
      return data as RecipeServing[];
    },
    enabled: !!recipeId,
  });
};
