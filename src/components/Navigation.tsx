
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface NavigationProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

export const Navigation = ({ cartItemsCount, onCartClick }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/menu", label: "Menu" },
    { path: "/recipes", label: "Recipes" },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 font-lora">
      <div className="container mx-auto px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl font-playfair">HK</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-gray-800 leading-tight font-playfair">Healthy Kitchen</h1>
              <p className="text-sm text-gray-600 leading-tight font-lora">Delicious & Nutritious</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-12">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path}
                className={`text-lg font-medium transition-colors font-lora ${
                  location.pathname === item.path 
                    ? 'text-orange-600 border-b-2 border-orange-600 pb-1' 
                    : 'text-gray-700 hover:text-orange-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center space-x-6">
            <Link to="/cart">
              <Button
                variant="outline"
                size="lg"
                className="relative border-orange-200 hover:bg-orange-50 rounded-full font-lora px-6 py-3"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Cart
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden rounded-full"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-6 border-t border-gray-100">
            <div className="flex flex-col space-y-4 pt-6">
              {navItems.map((item) => (
                <Link 
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-left py-3 text-lg transition-colors font-lora ${
                    location.pathname === item.path 
                      ? 'text-orange-600 font-semibold' 
                      : 'text-gray-700 hover:text-orange-600'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
