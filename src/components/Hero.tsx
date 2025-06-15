
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, ArrowDown, Clock, Award, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useGSAPAnimations } from "@/hooks/useGSAPAnimations";

export const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const dishesRef = useRef<HTMLDivElement>(null);

  const { fadeInUp, fadeInLeft, fadeInRight, staggerAnimation, scrollTriggerAnimation } = useGSAPAnimations();

  useEffect(() => {
    // Initial page load animations
    if (titleRef.current) fadeInUp(titleRef.current, 0.2);
    if (subtitleRef.current) fadeInUp(subtitleRef.current, 0.4);
    if (buttonsRef.current) fadeInUp(buttonsRef.current, 0.6);
    if (featuresRef.current) staggerAnimation(".feature-item", 0.15);
    if (dishesRef.current) fadeInRight(dishesRef.current, 0.8);

    // Scroll trigger animations
    scrollTriggerAnimation(".floating-element");
  }, [fadeInUp, fadeInLeft, fadeInRight, staggerAnimation, scrollTriggerAnimation]);

  return (
    <section ref={heroRef} id="home" className="pt-32 pb-16 relative overflow-hidden font-lora">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-red-50 to-pink-100"></div>
      <div className="floating-element absolute top-20 left-10 w-32 h-32 bg-orange-200/30 rounded-full animate-pulse"></div>
      <div className="floating-element absolute bottom-20 right-10 w-24 h-24 bg-red-200/30 rounded-full animate-pulse delay-1000"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-6">
              <h1 ref={titleRef} className="text-6xl lg:text-7xl font-bold text-gray-800 leading-tight font-playfair opacity-0">
                Taste the
                <span className="text-gradient bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent"> Magic</span>
              </h1>
              <p ref={subtitleRef} className="text-xl text-gray-600 max-w-lg leading-relaxed font-lora opacity-0">
                Experience authentic flavors crafted by expert chef Sharvari Salunkhe. 
                From traditional bakery delights to premium chicken & mutton specialties.
              </p>
            </div>

            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start opacity-0">
              <Link to="/menu">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-10 py-7 text-lg font-lora font-medium transition-all duration-300 hover:scale-105"
                  onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                >
                  Order Now
                  <ArrowDown className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              
              <Link to="/recipes">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-orange-300 text-orange-600 hover:bg-orange-50 px-10 py-7 text-lg font-lora font-medium transition-all duration-300 hover:scale-105"
                  onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                >
                  <Play className="mr-2 w-5 h-5" />
                  Watch Recipes
                </Button>
              </Link>
            </div>

            {/* Special Features */}
            <div ref={featuresRef} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <div className="feature-item flex items-center space-x-3 text-gray-600 opacity-0">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm font-playfair">Fresh Daily</p>
                  <p className="text-xs">Made to order</p>
                </div>
              </div>
              
              <div className="feature-item flex items-center space-x-3 text-gray-600 opacity-0">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110">
                  <Award className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm font-playfair">Premium Quality</p>
                  <p className="text-xs">Finest ingredients</p>
                </div>
              </div>
              
              <div className="feature-item flex items-center space-x-3 text-gray-600 opacity-0">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110">
                  <Heart className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm font-playfair">Healthy Choice</p>
                  <p className="text-xs">Nutritious recipes</p>
                </div>
              </div>
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
          <div ref={dishesRef} className="relative opacity-0">
            <div className="grid grid-cols-2 gap-4">
              {/* Main Featured Dish - Chicken Special */}
              <div className="col-span-2 relative group">
                <div className="bg-white rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105">
                  <div className="w-full h-64 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-xl mb-4 flex items-center justify-center">
                    <span className="text-4xl">🍗</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 font-playfair">Signature Chicken Masala</h3>
                  <p className="text-gray-600 font-lora">Rich, aromatic spices with tender chicken</p>
                  <div className="mt-3 flex items-center text-sm text-orange-600">
                    <span className="font-semibold">₹299</span>
                    <span className="ml-2 text-gray-500">• 30 mins</span>
                  </div>
                </div>
              </div>

              {/* Secondary Dishes */}
              <div className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 hover:scale-105">
                <div className="w-full h-32 bg-gradient-to-br from-red-200 to-pink-200 rounded-lg mb-3 flex items-center justify-center">
                  <span className="text-2xl">🍖</span>
                </div>
                <h4 className="font-medium text-gray-800 font-playfair">Mutton Handi</h4>
                <p className="text-xs text-gray-600 mt-1">Slow-cooked perfection</p>
                <div className="mt-2 text-sm text-orange-600 font-semibold">₹399</div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 hover:scale-105">
                <div className="w-full h-32 bg-gradient-to-br from-green-200 to-teal-200 rounded-lg mb-3 flex items-center justify-center">
                  <span className="text-2xl">🥗</span>
                </div>
                <h4 className="font-medium text-gray-800 font-playfair">Healthy Specials</h4>
                <p className="text-xs text-gray-600 mt-1">Nutritious & delicious</p>
                <div className="mt-2 text-sm text-orange-600 font-semibold">₹199</div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="floating-element absolute -top-4 -right-4 w-16 h-16 bg-orange-400/30 rounded-full animate-bounce"></div>
            <div className="floating-element absolute -bottom-4 -left-4 w-12 h-12 bg-red-400/30 rounded-full animate-bounce delay-500"></div>
            
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
