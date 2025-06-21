import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Youtube, ChefHat } from "lucide-react";

const Recipes = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-50/30">
      <Navigation />
      
      <main className="pt-32 pb-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-pink-50/20"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-indigo-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"></div>
          
          <div className="relative container mx-auto px-6 lg:px-8">
            <div className="text-center max-w-5xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-white/70 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-white/40 mb-8">
                <ChefHat className="w-5 h-5 text-indigo-600" />
                <span className="text-sm font-semibold text-slate-700">YouTube Channels</span>
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-slate-500">Live Content</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
                My 
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"> Culinary</span>
                <br />
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Journey</span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl mx-auto mb-12">
                Discover authentic recipes and cooking secrets through my 
                <span className="font-semibold text-indigo-600"> Hindi</span> and 
                <span className="font-semibold text-purple-600"> Marathi</span> YouTube channels.
              </p>

              {/* Channel Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-16">
                <div className="bg-white/60 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/40 hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-xl mb-4 mx-auto">
                    <Youtube className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Hindi Recipes</h3>
                  <p className="text-slate-600 text-sm mb-4">Traditional and modern Indian recipes in Hindi</p>
                  <a 
                    href="https://www.youtube.com/@SHK-Hindi" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-full font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <Youtube className="w-5 h-5 mr-2" />
                    Visit Hindi Channel
                  </a>
                </div>
                
                <div className="bg-white/60 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/40 hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-xl mb-4 mx-auto">
                    <Youtube className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Marathi Recipes</h3>
                  <p className="text-slate-600 text-sm mb-4">Authentic Maharashtrian cuisine in Marathi</p>
                  <a 
                    href="https://www.youtube.com/@SHK-Marathi" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <Youtube className="w-5 h-5 mr-2" />
                    Visit Marathi Channel
                  </a>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white/40 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-white/30 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Welcome to My Kitchen</h2>
                <p className="text-slate-700 leading-relaxed text-lg">
                  Join me on a flavorful journey as I share traditional family recipes, modern cooking techniques, 
                  and the stories behind each dish. Whether you're craving authentic Indian comfort food or 
                  looking to explore regional Maharashtrian specialties, my channels offer step-by-step guidance 
                  for cooks of all skill levels.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Recipes;
