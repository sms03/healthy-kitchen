
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Award, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-white via-blue-50/30 to-pink-50/30">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main Content */}
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight text-balance">
              Culinary Excellence
              <span className="block text-slate-600 text-4xl lg:text-5xl mt-2">
                Redefined
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Experience authentic flavors crafted by expert chef Sharvari Salunkhe. 
              From traditional delights to premium specialties.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/menu">
              <Button 
                size="lg" 
                className="professional-button px-8 py-6 text-base"
              >
                View Menu
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            
            <Link to="/about">
              <Button 
                variant="outline" 
                size="lg"
                className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-6 text-base"
              >
                Our Story
              </Button>
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-900">Fresh Daily</h3>
              <p className="text-sm text-slate-600">Made to order with finest ingredients</p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto">
                <Award className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="font-semibold text-slate-900">Premium Quality</h3>
              <p className="text-sm text-slate-600">Exceptional standards in every dish</p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-slate-900">Healthy Choice</h3>
              <p className="text-sm text-slate-600">Nutritious recipes, crafted with care</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
