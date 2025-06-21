
import { Heart, Phone, Mail, MapPin, Instagram, Facebook, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (    <footer className="relative bg-gradient-to-br from-orange-50 via-red-50 to-pink-100 text-gray-700 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-5 left-10 w-20 h-20 bg-orange-300 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-20 w-24 h-24 bg-red-300 rounded-full blur-2xl"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg font-roboto">HK</span>
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent font-roboto">
                  Healthy Kitchen
                </h3>                <p className="text-gray-600 text-xs font-roboto">Delicious & Nutritious</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed font-roboto">
              Serving fresh, healthy, and delicious dishes with love.
            </p>
          </div>

          {/* Quick Links */}          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-700 relative font-roboto">
              Quick Links
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-orange-400 to-red-500"></div>
            </h4>
            <div className="space-y-2">
              {[
                { path: "/", label: "Home" },
                { path: "/menu", label: "Menu" },
                { path: "/recipes", label: "Recipes" }
              ].map((link) => (
                <Link 
                  key={link.path}
                  to={link.path}
                  className="block text-gray-600 hover:text-orange-500 transition-colors duration-300 font-roboto text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* About & Contact Links */}          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-700 relative font-roboto">
              More Info
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-orange-400 to-red-500"></div>
            </h4>
            <div className="space-y-2">
              <Link 
                to="/about"
                className="block text-gray-600 hover:text-orange-500 transition-colors duration-300 font-roboto text-sm"
              >
                About Us
              </Link>
              <Link 
                to="/contact"
                className="block text-gray-600 hover:text-orange-500 transition-colors duration-300 font-roboto text-sm"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Contact Info */}          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-700 relative font-roboto">
              Get In Touch
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-orange-400 to-red-500"></div>
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-600 text-sm">
                <div className="w-6 h-6 bg-orange-200 rounded-lg flex items-center justify-center">
                  <Phone className="w-3 h-3 text-orange-600" />
                </div>
                <span className="font-roboto">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 text-sm">
                <div className="w-6 h-6 bg-orange-200 rounded-lg flex items-center justify-center">
                  <Mail className="w-3 h-3 text-orange-600" />
                </div>
                <span className="font-roboto">hello@healthykitchen.com</span>
              </div>
            </div>
              {/* Social Media Links */}
            <div className="flex space-x-3">
              <a href="#" className="w-8 h-8 bg-white/60 rounded-full flex items-center justify-center hover:bg-orange-400 hover:text-white transition-all duration-300">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-white/60 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all duration-300">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-white/60 rounded-full flex items-center justify-center hover:bg-blue-400 hover:text-white transition-all duration-300">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>        {/* Bottom Bar */}
        <div className="border-t border-gray-300 pt-6 text-center">
          <p className="text-gray-600 flex items-center justify-center space-x-2 text-sm font-roboto">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
            <span>by Healthy Kitchen © 2024. All rights reserved.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

