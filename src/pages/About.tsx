import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Youtube, Award, Heart, Users, Star, ChefHat } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-50/30">
      <Navigation />
        <main className="pt-32 pb-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"></div>
          <div className="relative container mx-auto px-6 lg:px-8 py-16">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-white/20 mb-6">
                  <ChefHat className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm font-medium text-slate-700">Meet Our Chef</span>
                </div>                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-8 tracking-tight">
                  Chef 
                  <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"> Sharvari</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
                  Passionate culinary artist specializing in healthy, innovative recipes that celebrate tradition while embracing modern wellness.
                </p>
              </div>              
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
                      <span className="text-sm text-slate-700 font-medium">Expert in Traditional & Modern Cuisine</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
                      <span className="text-sm text-slate-700 font-medium">Specialist in Healthy Recipe Innovation</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-pink-600 to-red-500 rounded-full"></div>
                      <span className="text-sm text-slate-700 font-medium">YouTube Content Creator & Educator</span>
                    </div>
                  </div>

                  <div className="modern-card p-6">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                        <Heart className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">My Mission</h3>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-sm">
                      To share the joy of cooking through authentic flavors and healthy ingredients. 
                      Every dish I create tells a story of tradition, innovation, and love for good food 
                      that nourishes both body and soul.
                    </p>
                  </div>

                  <div className="modern-card p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg flex items-center justify-center mr-3">
                        <Youtube className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">YouTube Channels</h3>
                    </div>
                    <div className="space-y-3">
                      <a 
                        href="https://www.youtube.com/@SHK-Hindi" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-all duration-300 group"
                      >
                        <Youtube className="text-red-500 mr-3 w-4 h-4 group-hover:scale-110 transition-transform" />
                        <div>
                          <div className="font-semibold text-slate-900 group-hover:text-red-600 transition-colors text-sm">
                            Sharvari's Healthy Kitchen Hindi
                          </div>
                          <div className="text-xs text-slate-600">Traditional recipes in Hindi</div>
                        </div>
                      </a>
                      <a 
                        href="https://www.youtube.com/@SHK-Marathi" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-all duration-300 group"
                      >
                        <Youtube className="text-red-500 mr-3 w-4 h-4 group-hover:scale-110 transition-transform" />
                        <div>
                          <div className="font-semibold text-slate-900 group-hover:text-red-600 transition-colors text-sm">
                            Sharvari's Healthy Kitchen Marathi
                          </div>
                          <div className="text-xs text-slate-600">Regional specialties in Marathi</div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="relative flex justify-center">
                  <div className="relative">
                    <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 rounded-full flex items-center justify-center shadow-xl transition-all duration-500 hover:scale-105">
                      <span className="text-6xl md:text-7xl">👩‍🍳</span>
                    </div>
                    
                    {/* Floating elements */}
                    <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg animate-bounce delay-1000">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute top-1/2 -left-8 w-10 h-10 bg-gradient-to-r from-pink-600 to-red-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>        {/* Stats Section */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">500+</div>
                <div className="text-slate-600 font-medium text-sm">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">100+</div>
                <div className="text-slate-600 font-medium text-sm">Recipes Created</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">3+</div>
                <div className="text-slate-600 font-medium text-sm">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">10K+</div>
                <div className="text-slate-600 font-medium text-sm">YouTube Subscribers</div>
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
