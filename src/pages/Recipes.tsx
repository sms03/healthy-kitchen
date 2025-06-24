import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, ExternalLink, Users, Video, Play } from "lucide-react";

const channelLinks = [
  {
    name: "Sharvari's Healthy Kitchen Hindi",
    description: "Delicious and healthy recipes in Hindi for traditional Indian cooking with a modern twist.",
    url: "https://www.youtube.com/@SHK-Hindi",
    subscribers: "1K+",
    videoCount: "200+",
    language: "Hindi",
    bgGradient: "from-orange-400 to-red-500"
  },
  {
    name: "Sharvari's Healthy Kitchen Marathi",
    description: "Authentic Marathi recipes with healthy ingredients and traditional cooking methods.",
    url: "https://www.youtube.com/@SHK-Marathi",
    subscribers: "200+",
    videoCount: "150+",
    language: "Marathi",
    bgGradient: "from-red-400 to-pink-500"
  }
];

const Recipes = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <Navigation />
      
      <main className="pt-32 pb-16">
        <section className="py-20 bg-gradient-to-br from-gray-50 to-orange-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Our YouTube <span className="text-gradient bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">Channels</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover delicious healthy recipes, cooking tips, and culinary inspiration in multiple languages
              </p>
            </div>

            {/* Channels Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-24 px-16">
              {channelLinks.map((channel, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-orange-100">
                  <CardContent className="p-6">
                    {/* Channel Thumbnail */}
                    <div className={`relative h-48 bg-gradient-to-br ${channel.bgGradient} flex items-center justify-center mb-4 rounded-xl group-hover:scale-105 transition-transform duration-300`}>
                      <Camera className="w-16 h-16 text-white" />
                      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                        <span className="text-white text-sm font-medium">{channel.language}</span>
                      </div>
                      <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                        <div className="flex items-center space-x-2 text-white text-sm">
                          <Play className="w-4 h-4" />
                          <span>Watch Now</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Channel Info */}
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <h3 className="text-xl font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
                          {channel.name}
                        </h3>
                      </div>
                      
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {channel.description}
                      </p>
                      
                      {/* Stats */}
                      <div className="flex items-center gap-3 flex-wrap">
                        <div className="flex items-center space-x-2 text-gray-500">
                          <Users className="w-4 h-4" />
                          <span className="text-sm font-medium">{channel.subscribers} Subscribers</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-500">
                          <Video className="w-4 h-4" />
                          <span className="text-sm font-medium">{channel.videoCount} Videos</span>
                        </div>
                      </div>
                      
                      {/* Visit Button */}
                      <Button 
                        asChild
                        className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                      >
                        <a 
                          href={channel.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          <Camera className="w-4 h-4 mr-2" />
                          Visit Channel
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                      
                      {/* Pre-order style info */}
                      <div className="text-xs text-center text-gray-500 bg-gray-50 p-2 rounded">
                        🎥 New videos every week • Subscribe for updates
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Recipes;
