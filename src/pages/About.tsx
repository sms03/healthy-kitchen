
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Youtube } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-orange-950 dark:via-red-950 dark:to-pink-950">
      <Navigation cartItemsCount={0} onCartClick={() => {}} />
      
      <main className="pt-32 pb-16">
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-8">
                Meet Chef <span className="text-gradient bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">Sharvari</span>
              </h1>
              
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6 text-left">
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    Passionate bakery chef and culinary expert specializing in vegetarian, non-vegetarian, 
                    and innovative healthy recipes. With years of experience and a love for creating 
                    delicious, nutritious meals.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-gray-700 dark:text-gray-300">Expert in Traditional & Modern Baking</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-gray-700 dark:text-gray-300">Specialist in Healthy Recipe Innovation</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                      <span className="text-gray-700 dark:text-gray-300">YouTube Content Creator</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 p-6 rounded-xl transition-all duration-300 hover:shadow-lg">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">My Mission</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      To share the joy of cooking through authentic flavors and healthy ingredients. 
                      Every dish I create tells a story of tradition, innovation, and love for good food.
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950 dark:to-pink-950 p-6 rounded-xl transition-all duration-300 hover:shadow-lg">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">YouTube Channels</h3>
                    <div className="space-y-3">
                      <a 
                        href="https://www.youtube.com/@SHK-Hindi" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-300 group"
                      >
                        <Youtube className="text-red-500 mr-3 w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span className="group-hover:underline">Sharvari's Healthy Kitchen Hindi</span>
                      </a>
                      <a 
                        href="https://www.youtube.com/@SHK-Marathi" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-300 group"
                      >
                        <Youtube className="text-red-500 mr-3 w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span className="group-hover:underline">Sharvari's Healthy Kitchen Marathi</span>
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="w-80 h-80 mx-auto bg-gradient-to-br from-orange-200 via-red-200 to-pink-200 dark:from-orange-800 dark:via-red-800 dark:to-pink-800 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-105">
                    <span className="text-8xl">👩‍🍳</span>
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-orange-400/20 dark:bg-orange-600/20 rounded-full animate-pulse"></div>
                  <div className="absolute -top-4 -left-4 w-16 h-16 bg-red-400/20 dark:bg-red-600/20 rounded-full animate-pulse delay-500"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
