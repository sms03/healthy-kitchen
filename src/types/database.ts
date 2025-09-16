
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
  detailed_description: string | null;
  price: number;
  category_id: number | null;
  image_url: string | null;
  ingredients: string[] | null;
  preparation_time: number | null;
  is_available: boolean;
  is_featured: boolean;
  spice_level: number | null;
  cooking_method: string | null;
  chef_notes: string | null;
  availability_type: string | null;
  available_days: string[] | null;
  preorder_opens_on: string | null;
  special_order_surcharge: number | null;
  requires_preorder: boolean;
  nutritional_info: any;
  image_gallery: string[];
  created_at: string;
  updated_at: string;
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
