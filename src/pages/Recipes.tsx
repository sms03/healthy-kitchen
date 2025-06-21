import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, ChefHat, Lock, Loader2, Youtube, Play } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

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
    return recipe.difficulty?.toLowerCase() === activeFilter;  }) || [];
  
  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-50/30">
        <Navigation />
        <div className="container mx-auto px-6 lg:px-8 pt-32">
          <div className="flex items-center justify-center min-h-[300px]">
            <div className="flex items-center space-x-2">
              <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />
              <span className="text-slate-600 text-sm">Loading...</span>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  // Show blurry preview for unauthenticated users
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-50/30">
        <Navigation />
          <main className="pt-32 pb-12 relative">
          {/* Auth overlay */}
          <div className="absolute inset-0 z-40 bg-black/20 backdrop-blur-sm flex items-center justify-center">
            <div className="modern-card p-6 max-w-md mx-4 text-center">
              <Lock className="w-10 h-10 text-indigo-600 mx-auto mb-3" />
              <h2 className="text-lg font-bold text-slate-900 mb-3">
                Unlock <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Premium</span> Recipes
              </h2>
              <p className="text-slate-600 mb-4 text-sm">
                Sign in to access our collection of exclusive family recipes and cooking secrets
              </p>
              <div className="space-y-2">
                <Button 
                  onClick={() => navigate('/auth')}
                  className="w-full cta-button text-sm h-9"
                >
                  Sign In to View Recipes
                </Button>
                <p className="text-xs text-slate-500">
                  Don't have an account? Sign up for free!
                </p>
              </div>
            </div>
          </div>

          {/* Blurred content */}
          <section className="py-12 bg-gradient-to-br from-slate-50 to-slate-100 blur-sm">
            <div className="container mx-auto px-6 lg:px-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-white/20 mb-4">
                  <ChefHat className="w-3.5 h-3.5 text-indigo-600" />
                  <span className="text-xs font-medium text-slate-700">Personal Collection</span>
                </div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
                  My <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Personal</span> Recipes
                </h1>
                <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
                  Discover my collection of cherished family recipes and culinary secrets passed down through generations
                </p>
              </div>

              {/* Filter Buttons */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {filterOptions.map((filter) => (
                  <Button
                    key={filter.id}
                    variant="outline"
                    className="px-3 py-1.5 rounded-full border-slate-200 text-slate-700 text-xs h-8"
                  >
                    <span className="mr-1.5">{filter.emoji}</span>
                    {filter.name}
                  </Button>
                ))}
              </div>

              {/* Sample recipes grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <Card key={index} className="modern-card">
                    <CardContent className="p-0">
                      <div className="w-full h-32 bg-gradient-to-br from-slate-100 to-slate-200 rounded-t-2xl flex items-center justify-center relative">
                        <ChefHat className="w-8 h-8 text-slate-400" />
                        <div className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full">
                          <Lock className="w-2.5 h-2.5" />
                        </div>
                      </div>
                      <div className="p-4 space-y-2">
                        <h3 className="text-base font-semibold text-slate-900">
                          Premium Recipe #{index}
                        </h3>
                        <p className="text-slate-600 text-xs">
                          Exclusive family recipe with detailed instructions and chef tips
                        </p>
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>30m</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-3 h-3" />
                            <span>4</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-50/30">
        <Navigation />
        <div className="container mx-auto px-6 lg:px-8 pt-32">
          <div className="flex items-center justify-center min-h-[300px]">
            <div className="flex items-center space-x-2">
              <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />
              <span className="text-slate-600 text-sm">Loading recipes...</span>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-50/30">
      <Navigation />
      
      <main className="pt-32 pb-16">        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"></div>
          <div className="relative container mx-auto px-6 lg:px-8 py-10">
            <div className="text-center max-w-3xl mx-auto">              <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-white/20 mb-6">
                <ChefHat className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-medium text-slate-700">Personal Collection</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
                My <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Personal</span> Recipes
              </h1>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Discover my collection of cherished family recipes and culinary secrets passed down through generations
              </p>
            </div>
          </div>
        </section>

        {/* Recipes Section */}
        <section className="py-12">
          <div className="container mx-auto px-6 lg:px-8">            {/* Filter using Tabs */}
            <Tabs value={activeFilter} onValueChange={setActiveFilter} className="w-full mb-8">
              <div className="flex justify-center mb-6">
                <TabsList className="grid grid-cols-2 lg:grid-cols-5 h-auto p-2 bg-white/70 backdrop-blur-md border border-white/20 shadow-lg rounded-xl">
                  {filterOptions.map((filter) => (
                    <TabsTrigger
                      key={filter.id}
                      value={filter.id}
                      className="py-3 px-5 text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg transition-all duration-300"
                    >
                      <span className="mr-2">{filter.emoji}</span>
                      {filter.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>              {/* Recipes Grid */}
              <TabsContent value={activeFilter} className="mt-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredRecipes.map((recipe) => {
                    const youtubeData = recipeYouTubeData[recipe.title as keyof typeof recipeYouTubeData];
                    return (
                      <Card key={recipe.id} className="modern-card group overflow-hidden transform hover:scale-105 transition-all duration-300">
                        <CardContent className="p-0">
                          {/* YouTube Video Preview */}
                          {youtubeData && (
                            <div className="relative overflow-hidden">
                              <img 
                                src={youtubeData.thumbnail} 
                                alt={recipe.title}
                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/40 transition-colors cursor-pointer"
                                   onClick={() => window.open(`https://youtube.com/watch?v=${youtubeData.videoId}`, '_blank')}>
                                <div className="bg-red-600 rounded-full p-3 group-hover:scale-110 transition-transform">
                                  <Play className="w-4 h-4 text-white fill-white" />
                                </div>
                              </div>
                              <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs flex items-center">
                                <Youtube className="w-3 h-3 mr-1" />
                                Watch
                              </div>
                              {recipe.is_secret && (
                                <div className="absolute top-3 left-3 bg-red-500 text-white p-1.5 rounded-full">
                                  <Lock className="w-3 h-3" />
                                </div>
                              )}
                            </div>
                          )}

                          {/* Recipe without video */}
                          {!youtubeData && (
                            <div className="w-full h-48 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center group-hover:scale-105 transition-transform duration-500 relative overflow-hidden">
                              {recipe.is_secret && (
                                <div className="absolute top-3 right-3 bg-red-500 text-white p-1.5 rounded-full">
                                  <Lock className="w-3 h-3" />
                                </div>
                              )}
                              <ChefHat className="w-12 h-12 text-slate-400" />
                            </div>
                          )}

                          {/* Recipe Info */}
                          <div className="p-5 space-y-3">
                            <div className="flex items-start justify-between">
                              <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                                {recipe.title}
                                {recipe.is_secret && <span className="ml-1 text-red-500">🔒</span>}
                              </h3>
                              {recipe.difficulty && (
                                <Badge className={`text-xs ${
                                  recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-800 border-green-200' :
                                  recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                                  'bg-red-100 text-red-800 border-red-200'
                                }`}>
                                  {recipe.difficulty}
                                </Badge>
                              )}
                            </div>

                            {recipe.description && (
                              <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                                {recipe.description}
                              </p>
                            )}

                            {/* YouTube Channel Info */}
                            {youtubeData && (
                              <div className="bg-red-50 border border-red-100 p-3 rounded-lg">
                                <div className="flex items-center text-xs text-red-600 font-medium">
                                  <Youtube className="w-3 h-3 mr-2" />
                                  {youtubeData.channelName}
                                </div>
                              </div>
                            )}

                            {/* Recipe Stats */}
                            <div className="flex items-center justify-between text-xs text-slate-500">
                              {recipe.prep_time && (
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{recipe.prep_time}m</span>
                                </div>
                              )}
                              {recipe.servings && (
                                <div className="flex items-center space-x-1">
                                  <Users className="w-3 h-3" />
                                  <span>{recipe.servings}</span>
                                </div>
                              )}
                            </div>

                            {/* Category */}
                            {recipe.category && (
                              <Badge variant="outline" className="border-indigo-200 text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors text-xs">
                                {recipe.category}
                              </Badge>
                            )}

                            {/* View Recipe Button */}
                            <Button 
                              onClick={() => setSelectedRecipe(recipe)}
                              className="w-full cta-button py-3 text-sm font-medium"
                            >
                              <Play className="w-4 h-4 mr-2" />
                              {recipe.is_secret ? "View Secret Recipe" : "View Recipe"}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>                {filteredRecipes.length === 0 && (
                  <div className="text-center py-16">
                    <div className="modern-card p-12 max-w-md mx-auto">
                      <ChefHat className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-slate-900 mb-3">No recipes found</h3>
                      <p className="text-slate-600 leading-relaxed">
                        No recipes found in this category. Check back soon for new recipes!
                      </p>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto custom-scrollbar">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-slate-900">{selectedRecipe.title}</h2>
                <Button variant="ghost" size="sm" onClick={() => setSelectedRecipe(null)} className="h-8 w-8 p-0 hover:bg-slate-100">
                  ✕
                </Button>
              </div>
              
              {selectedRecipe.description && (
                <p className="text-slate-600 mb-5 text-sm leading-relaxed">{selectedRecipe.description}</p>
              )}
              
              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                {selectedRecipe.prep_time && (
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <span className="font-semibold text-slate-900">Prep Time:</span>
                    <span className="text-slate-600 ml-2">{selectedRecipe.prep_time} mins</span>
                  </div>
                )}
                {selectedRecipe.cook_time && (
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <span className="font-semibold text-slate-900">Cook Time:</span>
                    <span className="text-slate-600 ml-2">{selectedRecipe.cook_time} mins</span>
                  </div>
                )}
                {selectedRecipe.servings && (
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <span className="font-semibold text-slate-900">Servings:</span>
                    <span className="text-slate-600 ml-2">{selectedRecipe.servings}</span>
                  </div>
                )}
                {selectedRecipe.difficulty && (
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <span className="font-semibold text-slate-900">Difficulty:</span>
                    <span className="text-slate-600 ml-2">{selectedRecipe.difficulty}</span>
                  </div>
                )}
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-slate-900">Ingredients:</h3>
                <ul className="list-disc list-inside space-y-2 bg-slate-50 p-4 rounded-lg">
                  {selectedRecipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="text-slate-700 text-sm">{ingredient}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3 text-slate-900">Instructions:</h3>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-slate-700 leading-relaxed text-sm">{selectedRecipe.instructions}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recipes;
