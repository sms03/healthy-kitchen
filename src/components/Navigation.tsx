
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
        ? 'mt-1 sm:mt-2 md:mt-3 lg:mt-4 w-[96%] sm:w-[94%] md:w-[90%] lg:w-[88%] max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl' 
        : 'mt-0.5 sm:mt-1 md:mt-2 lg:mt-2 w-[98%] sm:w-[96%] md:w-[94%] lg:w-[92%] max-w-sm sm:max-w-lg md:max-w-3xl lg:max-w-5xl'
    }`}>
      <div className={`bg-white/95 backdrop-blur-md shadow-lg border border-white/20 transition-all duration-300 ${
        isScrolled 
          ? 'rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-full px-2 sm:px-3 md:px-4 lg:px-6 py-1.5 sm:py-2 md:py-2.5 lg:py-3' 
          : 'rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl px-3 sm:px-4 md:px-5 lg:px-8 py-2 sm:py-2.5 md:py-3 lg:py-4'
      }`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-2.5 lg:space-x-3">
            <div className={`bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
              isScrolled ? 'w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9' : 'w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10'
            }`}>
              <span className={`text-white font-bold font-playfair transition-all duration-300 ${
                isScrolled ? 'text-xs sm:text-sm md:text-sm lg:text-base' : 'text-sm sm:text-base md:text-lg lg:text-xl'
              }`}>HK</span>
            </div>
            <div className="flex flex-col">
              <h1 className={`font-bold text-gray-800 leading-tight font-playfair transition-all duration-300 ${
                isScrolled ? 'text-sm sm:text-base md:text-lg lg:text-xl' : 'text-base sm:text-lg md:text-xl lg:text-2xl'
              }`}>Healthy Kitchen</h1>
              <p className={`text-gray-600 leading-tight font-lora transition-all duration-300 ${
                isScrolled ? 'text-xs sm:text-xs md:text-xs lg:text-sm' : 'text-xs sm:text-sm md:text-sm lg:text-sm'
              }`}>Delicious & Nutritious</p>
            </div>
          </Link>

          {/* Desktop & Tablet Menu */}
          <div className="hidden md:flex lg:flex items-center space-x-1 sm:space-x-2 md:space-x-2 lg:space-x-3 xl:space-x-4">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path}
                className={`font-medium transition-all duration-300 font-lora px-2 sm:px-2.5 md:px-3 lg:px-3 xl:px-4 py-1.5 sm:py-2 md:py-2 lg:py-2 rounded-full border-2 text-xs sm:text-sm md:text-sm lg:text-base xl:text-base ${
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
          <div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-2.5 lg:space-x-3">
            <Link to="/cart">
              <Button
                variant="outline"
                size="icon"
                className={`relative rounded-full font-lora transition-all duration-300 ${
                  isScrolled ? 'w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10' : 'w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11'
                } ${
                  location.pathname === '/cart'
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 border-orange-500 text-white hover:from-orange-600 hover:to-red-700'
                    : 'border-orange-200 hover:bg-orange-50'
                }`}
              >
                <ShoppingCart className={`transition-all duration-300 ${
                  isScrolled ? 'w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-4.5 lg:h-4.5' : 'w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 lg:w-5 lg:h-5'
                }`} />
                {cartItemsCount > 0 && (
                  <span className={`absolute -top-1 -right-1 sm:-top-1 sm:-right-1 md:-top-1.5 md:-right-1.5 lg:-top-2 lg:-right-2 bg-red-500 text-white rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                    isScrolled ? 'w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 lg:w-5 lg:h-5 text-xs' : 'w-4.5 h-4.5 sm:w-5 sm:h-5 md:w-5.5 md:h-5.5 lg:w-6 lg:h-6 text-xs'
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
                      isScrolled ? 'w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10' : 'w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11'
                    } ${
                      location.pathname === '/profile'
                        ? 'bg-gradient-to-r from-orange-500 to-red-600 border-orange-500 text-white hover:from-orange-600 hover:to-red-700'
                        : 'border-orange-200 hover:bg-orange-50'
                    }`}
                  >
                    <User className={`transition-all duration-300 ${
                      isScrolled ? 'w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-4.5 lg:h-4.5' : 'w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 lg:w-5 lg:h-5'
                    }`} />
                  </Button>
                </Link>
              ) : signingOut ? (
                <Button
                  size="sm"
                  disabled
                  className={`hidden sm:flex bg-gradient-to-r from-gray-400 to-gray-500 rounded-full font-lora transition-all duration-300 ${
                    isScrolled ? 'text-xs px-2 py-1' : 'text-xs sm:text-sm px-2.5 sm:px-3 py-1.5'
                  }`}
                >
                  <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                  <span className="hidden md:inline lg:inline">Signing Out...</span>
                </Button>
              ) : (
                <Link to="/auth" className="hidden sm:block">
                  <Button
                    size="sm"
                    className={`bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 rounded-full font-lora transition-all duration-300 ${
                      isScrolled ? 'text-xs px-2 sm:px-2.5 py-1 sm:py-1.5' : 'text-xs sm:text-sm px-2.5 sm:px-3 md:px-3.5 py-1.5 sm:py-2'
                    }`}
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
              className={`md:hidden rounded-full transition-all duration-300 ${
                isScrolled ? 'p-1.5 w-7 h-7' : 'p-2 w-8 h-8 sm:w-9 sm:h-9'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className={`transition-all duration-300 ${
                  isScrolled ? 'w-3.5 h-3.5' : 'w-4 h-4 sm:w-4.5 sm:h-4.5'
                }`} />
              ) : (
                <Menu className={`transition-all duration-300 ${
                  isScrolled ? 'w-3.5 h-3.5' : 'w-4 h-4 sm:w-4.5 sm:h-4.5'
                }`} />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pt-2 sm:pt-3 border-t border-gray-100 mt-2 sm:mt-3">
            <div className="flex flex-col space-y-1.5 sm:space-y-2">
              {navItems.map((item) => (
                <Link 
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-left py-2.5 sm:py-3 px-3.5 sm:px-4 transition-all duration-300 font-lora rounded-lg border-2 text-sm sm:text-base ${
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
                  className="text-left py-2.5 sm:py-3 px-3.5 sm:px-4 transition-all duration-300 font-lora rounded-lg bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold text-sm sm:text-base"
                >
                  Sign In
                </Link>
              )}
              {user && !signingOut && (
                <Link 
                  to="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-left py-2.5 sm:py-3 px-3.5 sm:px-4 transition-all duration-300 font-lora rounded-lg border-2 text-sm sm:text-base ${
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
