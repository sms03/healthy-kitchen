
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
    { path: "/about", label: "About" },
    { path: "/menu", label: "Menu" },
    { path: "/recipes", label: "Recipes" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-in-out ${
      isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
    }`}>
      <div className={`bg-white/90 backdrop-blur-lg border border-orange-200/50 shadow-lg transition-all duration-300 ${
        isScrolled 
          ? 'rounded-full px-6 py-2 mx-4' 
          : 'rounded-2xl px-8 py-4 mx-2'
      }`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className={`flex items-center transition-all duration-300 ${
            isScrolled ? 'scale-90' : 'scale-100'
          }`}>
            <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold text-lg">HK</span>
            </div>
            {!isScrolled && (
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-gray-800 leading-tight">Healthy Kitchen</h1>
                <p className="text-xs text-gray-600 leading-tight">Delicious & Nutritious</p>
              </div>
            )}
            {isScrolled && (
              <span className="text-lg font-bold text-gray-800 ml-1">Healthy Kitchen</span>
            )}
          </Link>

          {/* Desktop Menu */}
          <div className={`hidden md:flex items-center transition-all duration-300 ${
            isScrolled ? 'space-x-4' : 'space-x-6'
          }`}>
            {navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors ${
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
          <div className="flex items-center space-x-3">
            <Link to="/cart">
              <Button
                variant="outline"
                size={isScrolled ? "sm" : "sm"}
                className="relative border-orange-200 hover:bg-orange-50 rounded-full"
              >
                <ShoppingCart className="w-4 h-4" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
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
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-orange-100">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link 
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-left py-2 text-sm transition-colors ${
                    location.pathname === item.path 
                      ? 'text-orange-600 font-medium' 
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
