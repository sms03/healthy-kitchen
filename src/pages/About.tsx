
import { useEffect, useRef } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AnimatedPageWrapper } from "@/components/AnimatedPageWrapper";
import { useGSAPAnimations } from "@/hooks/useGSAPAnimations";

const About = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const { fadeInLeft, fadeInRight, staggerAnimation } = useGSAPAnimations();

  useEffect(() => {
    if (contentRef.current) {
      fadeInLeft(contentRef.current, 0.2);
    }
    if (imageRef.current) {
      fadeInRight(imageRef.current, 0.4);
    }
    staggerAnimation(".feature-item", 0.1);
  }, [fadeInLeft, fadeInRight, staggerAnimation]);

  return (
    <AnimatedPageWrapper className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <Navigation cartItemsCount={0} onCartClick={() => {}} />
      
      <main className="pt-32 pb-16">
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-8">
                Meet Chef <span className="text-gradient bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">Sharvari</span>
              </h1>
              
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div ref={contentRef} className="space-y-6 text-left opacity-0">
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Passionate bakery chef and culinary expert specializing in vegetarian, non-vegetarian, 
                    and innovative healthy recipes. With years of experience and a love for creating 
                    delicious, nutritious meals.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="feature-item flex items-center space-x-3 opacity-0">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-gray-700">Expert in Traditional & Modern Baking</span>
                    </div>
                    <div className="feature-item flex items-center space-x-3 opacity-0">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-gray-700">Specialist in Healthy Recipe Innovation</span>
                    </div>
                    <div className="feature-item flex items-center space-x-3 opacity-0">
                      <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                      <span className="text-gray-700">YouTube Content Creator</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl transition-all duration-300 hover:shadow-lg">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">My Mission</h3>
                    <p className="text-gray-600">
                      To share the joy of cooking through authentic flavors and healthy ingredients. 
                      Every dish I create tells a story of tradition, innovation, and love for good food.
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-xl transition-all duration-300 hover:shadow-lg">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">YouTube Channels</h3>
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-700">
                        <span className="text-red-500 mr-2">📺</span>
                        Sharvari's Healthy Kitchen Hindi
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span className="text-red-500 mr-2">📺</span>
                        Sharvari's Healthy Kitchen Marathi
                      </div>
                    </div>
                  </div>
                </div>
                
                <div ref={imageRef} className="relative opacity-0">
                  <div className="w-80 h-80 mx-auto bg-gradient-to-br from-orange-200 via-red-200 to-pink-200 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-105">
                    <span className="text-8xl">👩‍🍳</span>
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-orange-400 rounded-full opacity-20 animate-pulse"></div>
                  <div className="absolute -top-4 -left-4 w-16 h-16 bg-red-400 rounded-full opacity-20 animate-pulse delay-500"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </AnimatedPageWrapper>
  );
};

export default About;
