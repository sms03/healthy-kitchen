
export interface Category {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Recipe {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category_id: string | null;
  image_url: string | null;
  ingredients: string[] | null;
  preparation_time: number | null;
  is_available: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface RecipeServing {
  id: string;
  recipe_id: string;
  serving_name: string;
  serving_description: string | null;
  price_multiplier: number;
  additional_price: number | null;
  created_at: string;
}

export interface RecipeWithCategory extends Recipe {
  category?: Category;
}

export interface RecipeWithServings extends Recipe {
  servings?: RecipeServing[];
}
