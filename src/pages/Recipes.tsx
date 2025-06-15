
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Users, ChefHat, Lock, Loader2, Youtube, Play } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

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

// Demo YouTube data for recipes
const recipeYouTubeData = {
  "Classic Butter Chicken": {
    videoId: "a03c6J_1nfc",
    thumbnail: "https://img.youtube.com/vi/a03c6J_1nfc/maxresdefault.jpg",
    channelName: "Sharvari's Healthy Kitchen Hindi"
  },
  "Homemade Paneer Tikka": {
    videoId: "QgdBc9uOTh4",
    thumbnail: "https://img.youtube.com/vi/QgdBc9uOTh4/maxresdefault.jpg",
    channelName: "Sharvari's Healthy Kitchen Marathi"
  },
  "Healthy Quinoa Salad Bowl": {
    videoId: "P1CokHHDbNw",
    thumbnail: "https://img.youtube.com/vi/P1CokHHDbNw/maxresdefault.jpg",
    channelName: "Sharvari's Healthy Kitchen Hindi"
  },
  "Chocolate Chip Cookies": {
    videoId: "WSzIDaQyCQE",
    thumbnail: "https://img.youtube.com/vi/WSzIDaQyCQE/maxresdefault.jpg",
    channelName: "Sharvari's Healthy Kitchen Marathi"
  }
};

const Recipes = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedRecipe, setSelectedRecipe] = useState<PersonalRecipe | null>(null);
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to view recipes",
        variant: "destructive"
      });
      navigate('/auth');
    }
  }, [user, loading, navigate, toast]);

  const { data: recipes, isLoading } = useQuery({
    queryKey: ['personalRecipes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('personal_recipes')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      return data as PersonalRecipe[];
    },
    enabled: !!user, // Only run query if user is authenticated
  });

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

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
        <Navigation cartItemsCount={0} onCartClick={() => {}} />
        <div className="container mx-auto px-4 pt-32">
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Don't render if not authenticated (will redirect)
  if (!user) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
        <Navigation cartItemsCount={0} onCartClick={() => {}} />
        <div className="container mx-auto px-4 pt-32">
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <Navigation cartItemsCount={0} onCartClick={() => {}} />
      
      <main className="pt-32 pb-16">
        <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                My <span className="text-gradient bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">Personal</span> Recipes
              </h1>
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
              {filteredRecipes.map((recipe) => {
                const youtubeData = recipeYouTubeData[recipe.title as keyof typeof recipeYouTubeData];
                return (
                  <Card key={recipe.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-orange-100">
                    <CardContent className="p-6">
                      {/* YouTube Video Preview */}
                      {youtubeData && (
                        <div className="relative mb-4 rounded-xl overflow-hidden">
                          <img 
                            src={youtubeData.thumbnail} 
                            alt={recipe.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/40 transition-colors cursor-pointer"
                               onClick={() => window.open(`https://youtube.com/watch?v=${youtubeData.videoId}`, '_blank')}>
                            <div className="bg-red-600 rounded-full p-3 group-hover:scale-110 transition-transform">
                              <Play className="w-6 h-6 text-white fill-white" />
                            </div>
                          </div>
                          <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs flex items-center">
                            <Youtube className="w-3 h-3 mr-1" />
                            Watch
                          </div>
                          {recipe.is_secret && (
                            <div className="absolute top-2 left-2 bg-red-500 text-white p-1 rounded-full">
                              <Lock className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                      )}

                      {/* Recipe without video */}
                      {!youtubeData && (
                        <div className="w-full h-48 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl mb-4 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-300 relative">
                          {recipe.is_secret && (
                            <div className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full">
                              <Lock className="w-4 h-4" />
                            </div>
                          )}
                          <ChefHat className="w-16 h-16 text-orange-500" />
                        </div>
                      )}

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

                        {/* YouTube Channel Info */}
                        {youtubeData && (
                          <div className="flex items-center text-sm text-red-600 font-medium">
                            <Youtube className="w-4 h-4 mr-1" />
                            {youtubeData.channelName}
                          </div>
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

                        {/* View Recipe Button */}
                        <Button 
                          onClick={() => setSelectedRecipe(recipe)}
                          className="w-full mt-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
                        >
                          {recipe.is_secret ? "View Secret Recipe" : "View Recipe"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {filteredRecipes.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No recipes found in this category.</p>
                <p className="text-gray-400 text-sm mt-2">Check back soon for new recipes!</p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{selectedRecipe.title}</h2>
                <Button variant="ghost" onClick={() => setSelectedRecipe(null)}>✕</Button>
              </div>
              
              {selectedRecipe.description && (
                <p className="text-gray-600 mb-4">{selectedRecipe.description}</p>
              )}
              
              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                {selectedRecipe.prep_time && (
                  <div><strong>Prep Time:</strong> {selectedRecipe.prep_time} mins</div>
                )}
                {selectedRecipe.cook_time && (
                  <div><strong>Cook Time:</strong> {selectedRecipe.cook_time} mins</div>
                )}
                {selectedRecipe.servings && (
                  <div><strong>Servings:</strong> {selectedRecipe.servings}</div>
                )}
                {selectedRecipe.difficulty && (
                  <div><strong>Difficulty:</strong> {selectedRecipe.difficulty}</div>
                )}
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Ingredients:</h3>
                <ul className="list-disc list-inside space-y-1">
                  {selectedRecipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="text-gray-700">{ingredient}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Instructions:</h3>
                <p className="text-gray-700 leading-relaxed">{selectedRecipe.instructions}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recipes;
