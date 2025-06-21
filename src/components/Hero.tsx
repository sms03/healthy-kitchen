
import { Button } from "@/components/ui/button";
import { ChefHat, Utensils, Clock, Award } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center">
      <div className="container mx-auto px-6 lg:px-8 pt-20 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-white/20 mb-8">
            <ChefHat className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-medium text-slate-700">Premium Healthy Kitchen</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            Discover the Art of
            <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Healthy Cooking
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Experience authentic flavors and traditional recipes crafted with the finest ingredients. 
            Every dish tells a story of culinary excellence and healthy living.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/menu">
              <Button className="cta-button px-8 py-4 text-base font-medium">
                <Utensils className="w-5 h-5 mr-2" />
                Explore Menu
              </Button>
            </Link>
            <Link to="/recipes">
              <Button variant="outline" className="outline-button px-8 py-4 text-base font-medium">
                <ChefHat className="w-5 h-5 mr-2" />
                View Recipes
              </Button>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="modern-card p-6 text-center group hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Expert Recipes</h3>
              <p className="text-sm text-slate-600">Carefully curated recipes with detailed cooking instructions</p>
            </div>

            <div className="modern-card p-6 text-center group hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Quick & Easy</h3>
              <p className="text-sm text-slate-600">Simple recipes that fit into your busy lifestyle</p>
            </div>

            <div className="modern-card p-6 text-center group hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-600 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Premium Quality</h3>
              <p className="text-sm text-slate-600">Only the finest ingredients and authentic flavors</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
