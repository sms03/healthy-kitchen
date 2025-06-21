
import { Button } from "@/components/ui/button";
import { Play, ArrowRight, Clock, Award, Heart, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section id="home" className="pt-32 pb-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100/40 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-pink-100/40 rounded-full animate-pulse delay-1000"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-6">
              <h1 className="text-6xl lg:text-7xl font-bold text-slate-800 leading-tight font-playfair">
                Culinary
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> Excellence</span>
              </h1>
              <p className="text-xl text-slate-600 max-w-lg leading-relaxed">
                Experience authentic flavors crafted by expert chef Sharvari Salunkhe. 
                From traditional bakery delights to premium chicken & mutton specialties.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <Link to="/menu">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-12 py-8 text-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Explore Menu
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              
              <Link to="/recipes">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50 px-12 py-8 text-lg font-medium transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm"
                >
                  <Play className="mr-2 w-5 h-5" />
                  Watch Recipes
                </Button>
              </Link>
            </div>

            {/* Special Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
              <div className="flex items-center space-x-4 text-slate-600 bg-white/60 backdrop-blur-sm p-4 rounded-xl">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm font-playfair text-slate-800">Fresh Daily</p>
                  <p className="text-xs text-slate-500">Made to order</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-slate-600 bg-white/60 backdrop-blur-sm p-4 rounded-xl">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110">
                  <Award className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm font-playfair text-slate-800">Premium Quality</p>
                  <p className="text-xs text-slate-500">Finest ingredients</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-slate-600 bg-white/60 backdrop-blur-sm p-4 rounded-xl">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110">
                  <Heart className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm font-playfair text-slate-800">Healthy Choice</p>
                  <p className="text-xs text-slate-500">Nutritious recipes</p>
                </div>
              </div>
            </div>

            {/* YouTube Channels */}
            <div className="flex flex-col sm:flex-row gap-4 text-sm">
              <a 
                href="https://www.youtube.com/@SHK-Hindi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-slate-600 hover:text-red-600 transition-colors duration-300 group bg-white/50 backdrop-blur-sm px-4 py-2 rounded-lg"
              >
                <Youtube className="w-4 h-4 text-red-500 mr-2 group-hover:scale-110 transition-transform" />
                <span className="group-hover:underline">Sharvari's Healthy Kitchen Hindi</span>
              </a>
              <a 
                href="https://www.youtube.com/@SHK-Marathi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-slate-600 hover:text-red-600 transition-colors duration-300 group bg-white/50 backdrop-blur-sm px-4 py-2 rounded-lg"
              >
                <Youtube className="w-4 h-4 text-red-500 mr-2 group-hover:scale-110 transition-transform" />
                <span className="group-hover:underline">Sharvari's Healthy Kitchen Marathi</span>
              </a>
            </div>
          </div>

          {/* Right Content - Elegant Food Showcase */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              {/* Main Featured Dish */}
              <div className="col-span-2 relative group">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 border border-slate-200">
                  <div className="w-full h-64 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl mb-6 flex items-center justify-center">
                    <span className="text-5xl">🍗</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-800 mb-3 font-playfair">Signature Chicken Masala</h3>
                  <p className="text-slate-600 leading-relaxed">Rich, aromatic spices with tender chicken prepared to perfection</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-semibold text-blue-600">₹299</span>
                    <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">30 mins</span>
                  </div>
                </div>
              </div>

              {/* Secondary Dishes */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border border-slate-200">
                <div className="w-full h-32 bg-gradient-to-br from-pink-50 to-rose-100 rounded-xl mb-4 flex items-center justify-center">
                  <span className="text-3xl">🍖</span>
                </div>
                <h4 className="font-semibold text-slate-800 font-playfair mb-2">Mutton Handi</h4>
                <p className="text-xs text-slate-600 mb-3">Slow-cooked perfection</p>
                <div className="text-sm text-pink-600 font-semibold">₹399</div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border border-slate-200">
                <div className="w-full h-32 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl mb-4 flex items-center justify-center">
                  <span className="text-3xl">🐟</span>
                </div>
                <h4 className="font-semibold text-slate-800 font-playfair mb-2">Fresh Fish</h4>
                <p className="text-xs text-slate-600 mb-3">Daily catch specials</p>
                <div className="text-sm text-green-600 font-semibold">Market Price</div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-200/30 rounded-full animate-bounce"></div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-pink-200/30 rounded-full animate-bounce delay-500"></div>
            
            {/* Special Badge */}
            <div className="absolute top-6 left-6 bg-gradient-to-r from-indigo-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              Chef's Special
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
