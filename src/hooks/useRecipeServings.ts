
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

export const useRecipeServings = (recipeId?: string | number) => {
  return useQuery({
    queryKey: ['recipe-servings', recipeId],
    queryFn: async () => {
      let query = supabase
        .from('recipe_servings')
        .select('*')
        .order('price_multiplier');
      
      if (recipeId) {
        query = query.eq('recipe_id', typeof recipeId === 'string' ? parseInt(recipeId) : recipeId);
      }
      
      const { data, error } = await query;
      
      if (error) {
        throw error;
      }
      
      return data;
    },
    enabled: !!recipeId,
  });
};
