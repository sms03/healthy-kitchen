
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X, User, Loader2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCartPersistence } from "@/hooks/useCartPersistence";
import { DarkModeToggle } from "@/components/DarkModeToggle";

interface NavigationProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

export const Navigation = ({ cartItemsCount, onCartClick }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, loading, signingOut } = useAuth();

  // Initialize cart persistence
  useCartPersistence();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/menu", label: "Menu" },
    { path: "/recipes", label: "Recipes" },
    { path: "/pricing", label: "Pricing" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-1/2 transform -translate-x-1/2 z-50 font-lora transition-all duration-300 ${
      isScrolled 
        ? 'mt-4 w-[90%] max-w-4xl' 
        : 'mt-2 w-[95%] max-w-5xl'
    }`}>
      <div className={`bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border border-white/20 dark:border-gray-700/20 transition-all duration-300 ${
        isScrolled 
          ? 'rounded-full px-6 py-3' 
          : 'rounded-3xl px-8 py-4'
      }`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className={`bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
              isScrolled ? 'w-10 h-10' : 'w-12 h-12'
            }`}>
              <span className={`text-white font-bold font-playfair transition-all duration-300 ${
                isScrolled ? 'text-lg' : 'text-xl'
              }`}>HK</span>
            </div>
            <div className="flex flex-col">
              <h1 className={`font-bold text-gray-800 dark:text-gray-200 leading-tight font-playfair transition-all duration-300 ${
                isScrolled ? 'text-xl' : 'text-2xl'
              }`}>Healthy Kitchen</h1>
              <p className={`text-gray-600 dark:text-gray-400 leading-tight font-lora transition-all duration-300 ${
                isScrolled ? 'text-xs' : 'text-sm'
              }`}>Delicious & Nutritious</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path}
                className={`font-medium transition-all duration-300 font-lora px-4 py-2 rounded-full border-2 text-base ${
                  location.pathname === item.path 
                    ? 'text-white bg-gradient-to-r from-orange-500 to-red-600 border-orange-500 shadow-md' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 border-gray-200 dark:border-gray-600 hover:border-orange-300 hover:bg-orange-50 dark:hover:bg-orange-950'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Cart, Theme, Auth */}
          <div className="flex items-center space-x-3">
            <Link to="/cart">
              <Button
                variant="outline"
                size="icon"
                className={`relative rounded-full font-lora transition-all duration-300 ${
                  isScrolled ? 'w-10 h-10' : 'w-12 h-12'
                } ${
                  location.pathname === '/cart'
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 border-orange-500 text-white hover:from-orange-600 hover:to-red-700'
                    : 'border-orange-200 dark:border-orange-300 hover:bg-orange-50 dark:hover:bg-orange-950'
                }`}
              >
                <ShoppingCart className={`transition-all duration-300 ${
                  isScrolled ? 'w-4 h-4' : 'w-5 h-5'
                }`} />
                {cartItemsCount > 0 && (
                  <span className={`absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                    isScrolled ? 'w-5 h-5' : 'w-6 h-6'
                  }`}>
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Dark Mode Toggle */}
            <DarkModeToggle isScrolled={isScrolled} />

            {/* Auth Button */}
            {!loading && (
              user && !signingOut ? (
                <Link to="/profile">
                  <Button
                    variant="outline"
                    size="icon"
                    className={`rounded-full font-lora transition-all duration-300 ${
                      isScrolled ? 'w-10 h-10' : 'w-12 h-12'
                    } ${
                      location.pathname === '/profile'
                        ? 'bg-gradient-to-r from-orange-500 to-red-600 border-orange-500 text-white hover:from-orange-600 hover:to-red-700'
                        : 'border-orange-200 dark:border-orange-300 hover:bg-orange-50 dark:hover:bg-orange-950'
                    }`}
                  >
                    <User className={`transition-all duration-300 ${
                      isScrolled ? 'w-4 h-4' : 'w-5 h-5'
                    }`} />
                  </Button>
                </Link>
              ) : signingOut ? (
                <Button
                  size={isScrolled ? "default" : "lg"}
                  disabled
                  className="bg-gradient-to-r from-gray-400 to-gray-500 rounded-full font-lora transition-all duration-300 text-base"
                >
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Signing Out...
                </Button>
              ) : (
                <Link to="/auth">
                  <Button
                    size={isScrolled ? "default" : "lg"}
                    className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 rounded-full font-lora transition-all duration-300 text-base"
                  >
                    Sign In
                  </Button>
                </Link>
              )
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden rounded-full dark:hover:bg-gray-800"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pt-4 border-t border-gray-100 dark:border-gray-700 mt-4">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link 
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-left py-3 px-4 transition-all duration-300 font-lora rounded-lg border-2 text-base ${
                    location.pathname === item.path 
                      ? 'text-white bg-gradient-to-r from-orange-500 to-red-600 border-orange-500 shadow-md font-semibold' 
                      : 'text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 border-gray-200 dark:border-gray-600 hover:border-orange-300 hover:bg-orange-50 dark:hover:bg-orange-950'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              {!loading && !user && !signingOut && (
                <Link 
                  to="/auth"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-left py-3 px-4 transition-all duration-300 font-lora rounded-lg bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
