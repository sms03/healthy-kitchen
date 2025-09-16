import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Users, ChefHat, Lock } from "lucide-react";

interface PersonalRecipe {
  id: string;
  title: string;
  description: string | null;
  ingredients: string[];
  instructions: string;
  prep_time: number | null;
  cook_time: number | null;
  servings: number | null;
  difficulty: string | null;
  category: string | null;
  image_url: string | null;
  is_secret: boolean;
  created_at: string;
}

export const PersonalRecipes = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  // Personal recipes functionality is not implemented yet
  // Using empty array for now to avoid database errors
  const recipes: PersonalRecipe[] = [];
  const isLoading = false;

  const filterOptions = [
    { id: "all", name: "All Recipes", emoji: "📚" },
    { id: "easy", name: "Easy", emoji: "👶" },
    { id: "medium", name: "Medium", emoji: "👨‍🍳" },
    { id: "hard", name: "Hard", emoji: "🎯" },
    { id: "secret", name: "Secret Recipes", emoji: "🔒" }
  ];

  const filteredRecipes = recipes?.filter(recipe => {
    if (activeFilter === "all") return true;
    if (activeFilter === "secret") return recipe.is_secret;
    return recipe.difficulty?.toLowerCase() === activeFilter;
  }) || [];

  return (
    <section id="recipes" className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            My <span className="text-gradient bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">Personal</span> Recipes
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover my collection of cherished family recipes and culinary secrets passed down through generations
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filterOptions.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                activeFilter === filter.id
                  ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg"
                  : "border-orange-200 text-gray-700 hover:bg-orange-50"
              }`}
            >
              <span className="mr-2">{filter.emoji}</span>
              {filter.name}
            </Button>
          ))}
        </div>

        {/* Recipes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecipes.map((recipe) => (
            <Card key={recipe.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-orange-100">
              <CardContent className="p-6">
                {/* Recipe Image/Icon */}
                <div className="w-full h-48 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl mb-4 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-300 relative">
                  {recipe.is_secret && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full">
                      <Lock className="w-4 h-4" />
                    </div>
                  )}
                  <ChefHat className="w-16 h-16 text-orange-500" />
                </div>

                {/* Recipe Info */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
                      {recipe.title}
                      {recipe.is_secret && <span className="ml-2 text-red-500">🔒</span>}
                    </h3>
                    {recipe.difficulty && (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                        recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {recipe.difficulty}
                      </span>
                    )}
                  </div>

                  {recipe.description && (
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {recipe.description}
                    </p>
                  )}

                  {/* Recipe Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    {recipe.prep_time && (
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{recipe.prep_time}m prep</span>
                      </div>
                    )}
                    {recipe.servings && (
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>Serves {recipe.servings}</span>
                      </div>
                    )}
                  </div>

                  {/* Category */}
                  {recipe.category && (
                    <div className="text-xs text-orange-600 font-medium">
                      {recipe.category}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">👨‍🍳</div>
            <p className="text-gray-500 text-lg">Personal Recipes Coming Soon!</p>
            <p className="text-gray-400 text-sm mt-2">This feature will allow you to store and manage your own recipe collection.</p>
          </div>
        )}
      </div>
    </section>
  );
};

