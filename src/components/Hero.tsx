
import { Button } from "@/components/ui/button";
import { Play, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section id="home" className="pt-32 pb-20 relative overflow-hidden font-roboto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center max-w-4xl mx-auto">
          <div className="space-y-8">
            <h1 className="text-6xl lg:text-7xl font-bold text-gray-800 leading-tight font-roboto">
              Taste the
              <span className="text-gradient bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent"> Magic</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed font-roboto max-w-2xl mx-auto">
              Experience authentic flavors crafted by expert chef Sharvari Salunkhe. 
              From traditional bakery delights to premium chicken & mutton specialties.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
              <Link to="/menu">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-7 text-lg font-roboto font-medium transition-all duration-300 hover:scale-105 rounded-full w-[200px] justify-center"
                >
                  Order Now
                  <ArrowDown className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              
              <Link to="/recipes">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-orange-300 text-orange-600 hover:bg-orange-50 px-8 py-7 text-lg font-roboto font-medium transition-all duration-300 hover:scale-105 rounded-full w-[200px] justify-center"
                >
                  <Play className="mr-2 w-5 h-5" />
                  Watch Recipes
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

