
import { Button } from "@/components/ui/button";
import { Play, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section id="home" className="pt-8 pb-16 relative overflow-hidden font-lora">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-red-50 to-pink-100"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-red-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-6">
              <h1 className="text-6xl lg:text-7xl font-bold text-gray-800 leading-tight font-playfair">
                Taste the
                <span className="text-gradient bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent"> Magic</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-lg leading-relaxed font-lora">
                Experience authentic flavors crafted by expert chef Sharvari Salunkhe. 
                From traditional bakery delights to innovative healthy recipes.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <Link to="/menu">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-10 py-7 text-lg font-lora font-medium"
                >
                  Order Now
                  <ArrowDown className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              
              <Link to="/recipes">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-orange-300 text-orange-600 hover:bg-orange-50 px-10 py-7 text-lg font-lora font-medium"
                >
                  <Play className="mr-2 w-5 h-5" />
                  Watch Recipes
                </Button>
              </Link>
            </div>

            {/* YouTube Channels */}
            <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-600 font-lora">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                Sharvari's Healthy Kitchen Hindi
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                Sharvari's Healthy Kitchen Marathi
              </div>
            </div>
          </div>

          {/* Right Content - Food Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Main Featured Dish */}
              <div className="col-span-2 relative group">
                <div className="bg-white rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="w-full h-64 bg-gradient-to-br from-orange-200 to-red-200 rounded-xl mb-4 flex items-center justify-center">
                    <span className="text-4xl">🧁</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 font-playfair">Signature Bakery</h3>
                  <p className="text-gray-600 font-lora">Fresh daily specialties</p>
                </div>
              </div>

              {/* Secondary Dishes */}
              <div className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-full h-32 bg-gradient-to-br from-green-200 to-teal-200 rounded-lg mb-3 flex items-center justify-center">
                  <span className="text-2xl">🥗</span>
                </div>
                <h4 className="font-medium text-gray-800 font-playfair">Healthy Specials</h4>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-full h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-lg mb-3 flex items-center justify-center">
                  <span className="text-2xl">🍛</span>
                </div>
                <h4 className="font-medium text-gray-800 font-playfair">Gourmet Meals</h4>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-orange-400 rounded-full opacity-20 animate-bounce"></div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-red-400 rounded-full opacity-20 animate-bounce delay-500"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
