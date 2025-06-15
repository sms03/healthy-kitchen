
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X, User, Loader2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCartPersistence } from "@/hooks/useCartPersistence";

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
        ? 'mt-2 md:mt-3 lg:mt-4 w-[95%] md:w-[92%] lg:w-[90%] max-w-3xl md:max-w-4xl lg:max-w-4xl' 
        : 'mt-1 md:mt-2 lg:mt-2 w-[98%] md:w-[96%] lg:w-[95%] max-w-4xl md:max-w-5xl lg:max-w-5xl'
    }`}>
      <div className={`bg-white/95 backdrop-blur-md shadow-lg border border-white/20 transition-all duration-300 ${
        isScrolled 
          ? 'rounded-2xl md:rounded-3xl lg:rounded-full px-3 md:px-5 lg:px-6 py-2 md:py-2.5 lg:py-3' 
          : 'rounded-2xl md:rounded-3xl lg:rounded-3xl px-4 md:px-6 lg:px-8 py-3 md:py-3.5 lg:py-4'
      }`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 md:space-x-2.5 lg:space-x-3">
            <div className={`bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
              isScrolled ? 'w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10' : 'w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12'
            }`}>
              <span className={`text-white font-bold font-playfair transition-all duration-300 ${
                isScrolled ? 'text-sm md:text-base lg:text-lg' : 'text-lg md:text-xl lg:text-xl'
              }`}>HK</span>
            </div>
            <div className="flex flex-col">
              <h1 className={`font-bold text-gray-800 leading-tight font-playfair transition-all duration-300 ${
                isScrolled ? 'text-lg md:text-xl lg:text-xl' : 'text-xl md:text-2xl lg:text-2xl'
              }`}>Healthy Kitchen</h1>
              <p className={`text-gray-600 leading-tight font-lora transition-all duration-300 ${
                isScrolled ? 'text-xs md:text-xs' : 'text-xs md:text-sm lg:text-sm'
              }`}>Delicious & Nutritious</p>
            </div>
          </Link>

          {/* Desktop & Tablet Menu */}
          <div className="hidden md:flex lg:flex items-center space-x-3 md:space-x-4 lg:space-x-4 xl:space-x-6">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path}
                className={`font-medium transition-all duration-300 font-lora px-2.5 md:px-3 lg:px-3 xl:px-4 py-1.5 md:py-2 lg:py-2 rounded-full border-2 text-sm md:text-sm lg:text-base xl:text-base ${
                  location.pathname === item.path 
                    ? 'text-white bg-gradient-to-r from-orange-500 to-red-600 border-orange-500 shadow-md' 
                    : 'text-gray-700 hover:text-orange-600 border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Cart and Auth */}
          <div className="flex items-center space-x-2 md:space-x-2.5 lg:space-x-3">
            <Link to="/cart">
              <Button
                variant="outline"
                size="icon"
                className={`relative rounded-full font-lora transition-all duration-300 ${
                  isScrolled ? 'w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10' : 'w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12'
                } ${
                  location.pathname === '/cart'
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 border-orange-500 text-white hover:from-orange-600 hover:to-red-700'
                    : 'border-orange-200 hover:bg-orange-50'
                }`}
              >
                <ShoppingCart className={`transition-all duration-300 ${
                  isScrolled ? 'w-3 h-3 md:w-4 md:h-4 lg:w-4 lg:h-4' : 'w-4 h-4 md:w-4 md:h-4 lg:w-5 lg:h-5'
                }`} />
                {cartItemsCount > 0 && (
                  <span className={`absolute -top-1 -right-1 md:-top-1.5 md:-right-1.5 lg:-top-2 lg:-right-2 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                    isScrolled ? 'w-4 h-4 md:w-5 md:h-5 lg:w-5 lg:h-5' : 'w-5 h-5 md:w-5 md:h-5 lg:w-6 lg:h-6'
                  }`}>
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Auth Button */}
            {!loading && (
              user && !signingOut ? (
                <Link to="/profile" className="hidden sm:block">
                  <Button
                    variant="outline"
                    size="icon"
                    className={`rounded-full font-lora transition-all duration-300 ${
                      isScrolled ? 'w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10' : 'w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12'
                    } ${
                      location.pathname === '/profile'
                        ? 'bg-gradient-to-r from-orange-500 to-red-600 border-orange-500 text-white hover:from-orange-600 hover:to-red-700'
                        : 'border-orange-200 hover:bg-orange-50'
                    }`}
                  >
                    <User className={`transition-all duration-300 ${
                      isScrolled ? 'w-3 h-3 md:w-4 md:h-4 lg:w-4 lg:h-4' : 'w-4 h-4 md:w-4 md:h-4 lg:w-5 lg:h-5'
                    }`} />
                  </Button>
                </Link>
              ) : signingOut ? (
                <Button
                  size="sm"
                  disabled
                  className="hidden sm:flex bg-gradient-to-r from-gray-400 to-gray-500 rounded-full font-lora transition-all duration-300 text-sm md:text-sm px-2 md:px-3"
                >
                  <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                  <span className="hidden md:inline lg:inline">Signing Out...</span>
                </Button>
              ) : (
                <Link to="/auth" className="hidden sm:block">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 rounded-full font-lora transition-all duration-300 text-sm md:text-sm px-2.5 md:px-3 py-1"
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
              className="md:hidden rounded-full p-1 sm:p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pt-3 sm:pt-4 border-t border-gray-100 mt-3 sm:mt-4">
            <div className="flex flex-col space-y-2 sm:space-y-3">
              {navItems.map((item) => (
                <Link 
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-left py-2 sm:py-3 px-3 sm:px-4 transition-all duration-300 font-lora rounded-lg border-2 text-sm sm:text-base ${
                    location.pathname === item.path 
                      ? 'text-white bg-gradient-to-r from-orange-500 to-red-600 border-orange-500 shadow-md font-semibold' 
                      : 'text-gray-700 hover:text-orange-600 border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              {!loading && !user && !signingOut && (
                <Link 
                  to="/auth"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-left py-2 sm:py-3 px-3 sm:px-4 transition-all duration-300 font-lora rounded-lg bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold text-sm sm:text-base"
                >
                  Sign In
                </Link>
              )}
              {user && !signingOut && (
                <Link 
                  to="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-left py-2 sm:py-3 px-3 sm:px-4 transition-all duration-300 font-lora rounded-lg border-2 text-sm sm:text-base ${
                    location.pathname === '/profile'
                      ? 'text-white bg-gradient-to-r from-orange-500 to-red-600 border-orange-500 shadow-md font-semibold' 
                      : 'text-gray-700 hover:text-orange-600 border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                  }`}
                >
                  Profile
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
