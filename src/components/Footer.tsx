
import { Heart, Phone, Mail, Instagram, Facebook, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">HK</span>
              </div>
              <span className="text-xl font-semibold text-slate-900">Healthy Kitchen</span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              Serving fresh, healthy, and delicious dishes crafted with passion and precision.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-slate-900">Quick Links</h4>
            <div className="space-y-2">
              {[
                { path: "/", label: "Home" },
                { path: "/menu", label: "Menu" },
                { path: "/recipes", label: "Recipes" },
                { path: "/about", label: "About" },
              ].map((link) => (
                <Link 
                  key={link.path}
                  to={link.path}
                  className="block text-slate-600 hover:text-slate-900 transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-slate-900">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-slate-600 text-sm">
                <Phone className="w-4 h-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-600 text-sm">
                <Mail className="w-4 h-4" />
                <span>hello@healthykitchen.com</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="font-semibold text-slate-900">Follow Us</h4>
            <div className="flex space-x-3">
              <a href="#" className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center hover:bg-slate-50 transition-colors">
                <Instagram className="w-4 h-4 text-slate-600" />
              </a>
              <a href="#" className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center hover:bg-slate-50 transition-colors">
                <Facebook className="w-4 h-4 text-slate-600" />
              </a>
              <a href="#" className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center hover:bg-slate-50 transition-colors">
                <Twitter className="w-4 h-4 text-slate-600" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 pt-6 text-center">
          <p className="text-slate-600 flex items-center justify-center space-x-2 text-sm">
            <span>© 2024 Healthy Kitchen. Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>in India</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
