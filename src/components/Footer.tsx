
import { Heart, Phone, Mail, MapPin, Instagram, Facebook, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 text-gray-800 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-orange-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-red-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-yellow-400 rounded-full blur-2xl"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">HK</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                  Healthy Kitchen
                </h3>
                <p className="text-gray-600 text-sm">Delicious & Nutritious Since 2020</p>
              </div>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed max-w-md">
              Serving fresh, healthy, and delicious dishes with love. From traditional recipes to our personal culinary secrets, every dish is crafted with care.
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-300/50 rounded-full flex items-center justify-center hover:bg-orange-400 hover:text-white transition-all duration-300 group">
                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-300/50 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all duration-300 group">
                <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-300/50 rounded-full flex items-center justify-center hover:bg-blue-400 hover:text-white transition-all duration-300 group">
                <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-gray-800 relative">
              Quick Links
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-orange-400 to-red-500"></div>
            </h4>
            <div className="space-y-3">
              {['Home', 'About', 'Menu', 'Recipes', 'Contact'].map((link) => (
                <a 
                  key={link}
                  href={`#${link.toLowerCase()}`} 
                  className="block text-gray-600 hover:text-orange-500 transition-colors duration-300 hover:translate-x-2 transform"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-gray-800 relative">
              Get In Touch
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-orange-400 to-red-500"></div>
            </h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-600">
                <div className="w-8 h-8 bg-orange-200 rounded-lg flex items-center justify-center">
                  <Phone className="w-4 h-4 text-orange-600" />
                </div>
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <div className="w-8 h-8 bg-orange-200 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4 text-orange-600" />
                </div>
                <span>hello@healthykitchen.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <div className="w-8 h-8 bg-orange-200 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-orange-600" />
                </div>
                <span>Local Area Delivery Available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-400 pt-8 mb-8">
          <div className="text-center space-y-4">
            <h4 className="text-xl font-semibold text-gray-800">Stay Updated with Our Latest Recipes</h4>
            <p className="text-gray-600">Subscribe to get weekly meal inspirations and special offers</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/70 border border-gray-400 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:border-orange-400 transition-colors"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-medium hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-400 pt-8 text-center">
          <p className="text-gray-600 flex items-center justify-center space-x-2 text-sm">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
            <span>by Healthy Kitchen © 2024. All rights reserved.</span>
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-6 text-xs text-gray-500">
            <a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
