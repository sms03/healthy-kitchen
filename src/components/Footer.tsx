
import { Heart, Phone, Mail, Instagram, Facebook, Twitter, ChefHat } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="relative">
      {/* Gradient transition from content to footer */}
      <div className="h-32 bg-gradient-to-b from-transparent via-slate-50/50 to-slate-100"></div>
      
      {/* Main footer */}
      <div className="bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50/30">
        <div className="container mx-auto px-6 lg:px-8 py-16">
          {/* Main Footer Content */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <ChefHat className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold text-slate-900">Healthy Kitchen</span>
              </div>
              <p className="text-slate-600 text-base leading-relaxed max-w-md">
                Fresh, healthy, and delicious dishes crafted with passion. 
                Experience the perfect blend of nutrition and flavor in every bite.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-slate-700">
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-4 h-4 text-indigo-600" />
                  </div>
                  <span className="text-sm font-medium">+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-700">
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-4 h-4 text-indigo-600" />
                  </div>
                  <span className="text-sm font-medium">hello@healthykitchen.com</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-slate-900">Quick Links</h4>
              <div className="space-y-3">
                {[
                  { path: "/", label: "Home" },
                  { path: "/menu", label: "Menu" },
                  { path: "/recipes", label: "Recipes" },
                  { path: "/about", label: "About" },
                  { path: "/contact", label: "Contact" },
                ].map((link) => (
                  <Link 
                    key={link.path}
                    to={link.path}
                    className="block text-slate-600 hover:text-indigo-600 transition-colors text-sm font-medium hover:translate-x-1 transform duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Social & Newsletter */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-slate-900">Stay Connected</h4>
              
              {/* Social Links */}
              <div className="flex space-x-3">
                <a href="#" className="w-10 h-10 bg-white hover:bg-indigo-600 rounded-xl flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg group border border-slate-200">
                  <Instagram className="w-4 h-4 text-slate-600 group-hover:text-white" />
                </a>
                <a href="#" className="w-10 h-10 bg-white hover:bg-indigo-600 rounded-xl flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg group border border-slate-200">
                  <Facebook className="w-4 h-4 text-slate-600 group-hover:text-white" />
                </a>
                <a href="#" className="w-10 h-10 bg-white hover:bg-indigo-600 rounded-xl flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg group border border-slate-200">
                  <Twitter className="w-4 h-4 text-slate-600 group-hover:text-white" />
                </a>
              </div>

              {/* Newsletter */}
              <div className="space-y-4">
                <p className="text-sm text-slate-600 font-medium">Get weekly recipes & updates</p>
                <div className="space-y-3">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-sm"
                  />
                  <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                    Subscribe Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 flex items-center space-x-2 text-sm">
              <span>© 2024 Healthy Kitchen. Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>in India</span>
            </p>
            <div className="flex space-x-6 text-slate-500 text-sm">
              <a href="#" className="hover:text-indigo-600 transition-colors font-medium">Privacy Policy</a>
              <a href="#" className="hover:text-indigo-600 transition-colors font-medium">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
