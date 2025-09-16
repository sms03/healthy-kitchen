
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface RecipeServing {
  id: string;
  recipe_id: string;
  serving_name: string;
  serving_description: string | null;
  price_multiplier: number;
  additional_price: number | null;
  created_at: string;
}

export const useRecipeServings = (recipeId?: string) => {
  return useQuery({
    queryKey: ['recipe-servings', recipeId],
    queryFn: async () => {
      let query = supabase
        .from('recipe_servings')
        .select('*')
        .order('price_multiplier');
      
      if (recipeId) {
        query = query.eq('recipe_id', recipeId);
      }
      
      const { data, error } = await query;
      
      if (error) {
        throw error;
      }
      
      return data as RecipeServing[];
    },
    enabled: !!recipeId,
  });
};
