
import { Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="text-xl font-bold">Sharvari Salunkhe</span>
            </div>
            <p className="text-gray-300">
              Crafting delicious, healthy, and innovative recipes for food lovers everywhere.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <a href="#home" className="block text-gray-300 hover:text-orange-400 transition-colors">Home</a>
              <a href="#about" className="block text-gray-300 hover:text-orange-400 transition-colors">About</a>
              <a href="#menu" className="block text-gray-300 hover:text-orange-400 transition-colors">Menu</a>
              <a href="#contact" className="block text-gray-300 hover:text-orange-400 transition-colors">Contact</a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-2 text-gray-300">
              <p>📞 +91 98765 43210</p>
              <p>📧 sharvari@healthykitchen.com</p>
              <p>📍 Local Area Delivery</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 flex items-center justify-center space-x-1">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>by Sharvari Salunkhe © 2024</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
