
export interface Category {
  id: number;
  name: string;
  description: string | null;
  image_url: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Recipe {
  id: number;
  name: string;
  description: string | null;
  price: number;
  category_id: number | null;
  image_url: string | null;
  ingredients: string[] | null;
  preparation_time: number | null;
  is_available: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  // New availability fields
  availability_type?: string;
  available_days?: string[];
  preorder_opens_on?: string;
  requires_preorder?: boolean;
  special_order_surcharge?: number;
  detailed_description?: string;
  spice_level?: number;
  cooking_method?: string;
  chef_notes?: string;
  nutritional_info?: any;
  image_gallery?: string[];
}

export interface RecipeServing {
  id: number;
  recipe_id: number;
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
