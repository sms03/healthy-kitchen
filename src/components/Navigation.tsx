
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/menu", label: "Menu" },
    { path: "/recipes", label: "Recipes" },
  ];

  return (
    <nav className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-in-out font-lora ${
      isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
    }`}>
      <div className={`bg-white/95 backdrop-blur-lg border border-orange-200/50 shadow-xl transition-all duration-300 ${
        isScrolled 
          ? 'rounded-full px-8 py-3 mx-4' 
          : 'rounded-3xl px-12 py-6 mx-2'
      }`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className={`flex items-center transition-all duration-300 ${
            isScrolled ? 'scale-90' : 'scale-100'
          }`}>
            <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
              <span className="text-white font-bold text-xl font-playfair">HK</span>
            </div>
            {!isScrolled && (
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-gray-800 leading-tight font-playfair">Healthy Kitchen</h1>
                <p className="text-sm text-gray-600 leading-tight font-lora">Delicious & Nutritious</p>
              </div>
            )}
            {isScrolled && (
              <span className="text-xl font-bold text-gray-800 ml-2 font-playfair">Healthy Kitchen</span>
            )}
          </Link>

          {/* Desktop Menu */}
          <div className={`hidden md:flex items-center transition-all duration-300 ${
            isScrolled ? 'space-x-6' : 'space-x-10'
          }`}>
            {navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path}
                className={`text-lg font-medium transition-colors font-lora ${
                  location.pathname === item.path 
                    ? 'text-orange-600' 
                    : 'text-gray-700 hover:text-orange-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Link to="/cart">
              <Button
                variant="outline"
                size={isScrolled ? "default" : "lg"}
                className="relative border-orange-200 hover:bg-orange-50 rounded-full font-lora"
              >
                <ShoppingCart className="w-5 h-5" />
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
          <div className="md:hidden mt-6 pt-6 border-t border-orange-100">
            <div className="flex flex-col space-y-4">
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
