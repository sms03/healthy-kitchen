
import { Button } from "@/components/ui/button";
import { Play, ArrowDown, Clock, Award, Heart, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section id="home" className="pt-32 pb-16 relative overflow-hidden font-lora">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-red-50 to-pink-100 dark:from-orange-950 dark:via-red-950 dark:to-pink-950"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-orange-200/30 dark:bg-orange-800/30 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-red-200/30 dark:bg-red-800/30 rounded-full animate-pulse delay-1000"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-6">
              <h1 className="text-6xl lg:text-7xl font-bold text-gray-800 dark:text-gray-200 leading-tight font-playfair">
                Taste the
                <span className="text-gradient bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent"> Magic</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed font-lora">
                Experience authentic flavors crafted by expert chef Sharvari Salunkhe. 
                From traditional bakery delights to premium chicken & mutton specialties.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <Link to="/menu">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-10 py-7 text-lg font-lora font-medium transition-all duration-300 hover:scale-105"
                >
                  Order Now
                  <ArrowDown className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              
              <Link to="/recipes">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-orange-300 dark:border-orange-600 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950 px-10 py-7 text-lg font-lora font-medium transition-all duration-300 hover:scale-105"
                >
                  <Play className="mr-2 w-5 h-5" />
                  Watch Recipes
                </Button>
              </Link>
            </div>

            {/* Special Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110">
                  <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="font-semibold text-sm font-playfair">Fresh Daily</p>
                  <p className="text-xs">Made to order</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110">
                  <Award className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="font-semibold text-sm font-playfair">Premium Quality</p>
                  <p className="text-xs">Finest ingredients</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110">
                  <Heart className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-semibold text-sm font-playfair">Healthy Choice</p>
                  <p className="text-xs">Nutritious recipes</p>
                </div>
              </div>
            </div>

            {/* YouTube Channels */}
            <div className="flex flex-col sm:flex-row gap-4 text-sm font-lora">
              <a 
                href="https://www.youtube.com/@SHK-Hindi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-300 group"
              >
                <Youtube className="w-4 h-4 text-red-500 mr-2 group-hover:scale-110 transition-transform" />
                <span className="group-hover:underline">Sharvari's Healthy Kitchen Hindi</span>
              </a>
              <a 
                href="https://www.youtube.com/@SHK-Marathi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-300 group"
              >
                <Youtube className="w-4 h-4 text-orange-500 mr-2 group-hover:scale-110 transition-transform" />
                <span className="group-hover:underline">Sharvari's Healthy Kitchen Marathi</span>
              </a>
            </div>
          </div>

          {/* Right Content - Food Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Main Featured Dish - Chicken Special */}
              <div className="col-span-2 relative group">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105">
                  <div className="w-full h-64 bg-gradient-to-br from-yellow-200 to-orange-200 dark:from-yellow-800 dark:to-orange-800 rounded-xl mb-4 flex items-center justify-center">
                    <span className="text-4xl">🍗</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2 font-playfair">Signature Chicken Masala</h3>
                  <p className="text-gray-600 dark:text-gray-400 font-lora">Rich, aromatic spices with tender chicken</p>
                  <div className="mt-3 flex items-center text-sm text-orange-600 dark:text-orange-400">
                    <span className="font-semibold">₹299</span>
                    <span className="ml-2 text-gray-500 dark:text-gray-400">• 30 mins</span>
                  </div>
                </div>
              </div>

              {/* Secondary Dishes */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 hover:scale-105">
                <div className="w-full h-32 bg-gradient-to-br from-red-200 to-pink-200 dark:from-red-800 dark:to-pink-800 rounded-lg mb-3 flex items-center justify-center">
                  <span className="text-2xl">🍖</span>
                </div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 font-playfair">Mutton Handi</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Slow-cooked perfection</p>
                <div className="mt-2 text-sm text-orange-600 dark:text-orange-400 font-semibold">₹399</div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 hover:scale-105">
                <div className="w-full h-32 bg-gradient-to-br from-green-200 to-teal-200 dark:from-green-800 dark:to-teal-800 rounded-lg mb-3 flex items-center justify-center">
                  <span className="text-2xl">🥗</span>
                </div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 font-playfair">Healthy Specials</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Nutritious & delicious</p>
                <div className="mt-2 text-sm text-orange-600 dark:text-orange-400 font-semibold">₹199</div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-orange-400/30 dark:bg-orange-600/30 rounded-full animate-bounce"></div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-red-400/30 dark:bg-red-600/30 rounded-full animate-bounce delay-500"></div>
            
            {/* Special Badge */}
            <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
              Chef's Special
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
