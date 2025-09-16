
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Recipe } from "@/types/database";

export const useRecipes = () => {
  return useQuery({
    queryKey: ['recipes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('is_available', true)
        .order('created_at');
      
      if (error) {
        throw error;
      }
      
      return data;
    },
  });
};
