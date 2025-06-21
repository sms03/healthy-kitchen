import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User, Loader2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, loading, signingOut } = useAuth();
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/menu", label: "Menu" },
    { path: "/recipes", label: "Recipes" },
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
    <nav className={`fixed top-0 left-1/2 transform -translate-x-1/2 z-50 font-roboto transition-all duration-300 ${
      isScrolled 
        ? 'mt-2 sm:mt-3 md:mt-4 lg:mt-4 w-[94%] sm:w-[92%] md:w-[88%] lg:w-[86%] max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl' 
        : 'mt-1 sm:mt-2 md:mt-3 lg:mt-3 w-[96%] sm:w-[94%] md:w-[92%] lg:w-[90%] max-w-md sm:max-w-lg md:max-w-3xl lg:max-w-5xl'
    }`}>
      <div className={`bg-white/95 backdrop-blur-md shadow-lg border border-white/20 transition-all duration-300 ${
        isScrolled 
          ? 'rounded-xl sm:rounded-2xl md:rounded-2xl lg:rounded-3xl px-3 sm:px-4 md:px-5 lg:px-6 py-3 sm:py-3.5 md:py-4 lg:py-4' 
          : 'rounded-2xl sm:rounded-2xl md:rounded-3xl lg:rounded-3xl px-4 sm:px-5 md:px-6 lg:px-8 py-4 sm:py-5 md:py-5 lg:py-6'
      }`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-2.5 md:space-x-3 lg:space-x-3">
            <div className={`bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
              isScrolled ? 'w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-10 lg:h-10' : 'w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12'
            }`}>
              <span className={`text-white font-bold font-roboto transition-all duration-300 ${
                isScrolled ? 'text-sm sm:text-base md:text-base lg:text-lg' : 'text-base sm:text-lg md:text-xl lg:text-xl'
              }`}>HK</span>
            </div>
            <div className="flex flex-col">
              <h1 className={`font-bold text-gray-800 leading-tight font-roboto transition-all duration-300 ${
                isScrolled ? 'text-base sm:text-lg md:text-xl lg:text-xl' : 'text-lg sm:text-xl md:text-2xl lg:text-2xl'
              }`}>Healthy Kitchen</h1>
              <p className={`text-gray-600 leading-tight font-roboto transition-all duration-300 ${
                isScrolled ? 'text-xs sm:text-sm md:text-sm lg:text-sm' : 'text-sm sm:text-sm md:text-base lg:text-base'
              }`}>Delicious & Nutritious</p>
            </div>
          </Link>

          {/* Desktop & Tablet Menu */}
          <div className="hidden md:flex lg:flex items-center space-x-1 sm:space-x-2 md:space-x-2 lg:space-x-3 xl:space-x-4">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path}
                className={`font-medium transition-all duration-300 font-roboto px-3 sm:px-3.5 md:px-4 lg:px-4 xl:px-5 py-2 sm:py-2.5 md:py-2.5 lg:py-3 rounded-full border-2 text-sm sm:text-sm md:text-base lg:text-base xl:text-base ${
                  location.pathname === item.path 
                    ? 'text-white bg-gradient-to-r from-orange-500 to-red-600 border-orange-500 shadow-md' 
                    : 'text-gray-700 hover:text-orange-600 border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Auth */}
          <div className="flex items-center space-x-2 sm:space-x-2.5 md:space-x-3 lg:space-x-3">
            {/* Auth Button */}
            {!loading && (              user && !signingOut ? (
                <Link 
                  to="/profile" 
                  className={`hidden sm:block font-medium transition-all duration-300 font-roboto px-3 sm:px-3.5 md:px-4 lg:px-4 xl:px-5 py-2 sm:py-2.5 md:py-2.5 lg:py-3 rounded-full border-2 text-sm sm:text-sm md:text-base lg:text-base xl:text-base ${
                    location.pathname === '/profile'
                      ? 'text-white bg-gradient-to-r from-orange-500 to-red-600 border-orange-500 shadow-md'
                      : 'text-gray-700 hover:text-orange-600 border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                  }`}
                >
                  Profile
                </Link>
              ) : signingOut ? (
                <Button
                  size="sm"
                  disabled
                  className={`hidden sm:flex bg-gradient-to-r from-gray-400 to-gray-500 rounded-full font-roboto transition-all duration-300 ${
                    isScrolled ? 'text-xs px-3 py-2' : 'text-sm px-4 py-2.5'
                  }`}
                >
                  <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                  <span className="hidden md:inline lg:inline">Signing Out...</span>
                </Button>              ) : (
                <Link 
                  to="/auth" 
                  className="hidden sm:block font-medium transition-all duration-300 font-roboto px-3 sm:px-3.5 md:px-4 lg:px-4 xl:px-5 py-2 sm:py-2.5 md:py-2.5 lg:py-3 rounded-full border-2 text-sm sm:text-sm md:text-base lg:text-base xl:text-base text-gray-700 hover:text-orange-600 border-gray-200 hover:border-orange-300 hover:bg-orange-50"
                >
                  Sign In
                </Link>
              )
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className={`md:hidden rounded-full transition-all duration-300 ${
                isScrolled ? 'p-2 w-9 h-9' : 'p-2.5 w-10 h-10'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className={`transition-all duration-300 ${
                  isScrolled ? 'w-4 h-4' : 'w-5 h-5'
                }`} />
              ) : (
                <Menu className={`transition-all duration-300 ${
                  isScrolled ? 'w-4 h-4' : 'w-5 h-5'
                }`} />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pt-3 sm:pt-4 border-t border-gray-100 mt-3 sm:mt-4">
            <div className="flex flex-col space-y-2 sm:space-y-2.5">
              {navItems.map((item) => (
                <Link 
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-left py-3 sm:py-3.5 px-4 sm:px-5 transition-all duration-300 font-roboto rounded-xl border-2 text-base sm:text-base ${
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
                  className="text-left py-3 sm:py-3.5 px-4 sm:px-5 transition-all duration-300 font-roboto rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold text-base sm:text-base"
                >
                  Sign In
                </Link>
              )}
              {user && !signingOut && (
                <Link 
                  to="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-left py-3 sm:py-3.5 px-4 sm:px-5 transition-all duration-300 font-roboto rounded-xl border-2 text-base sm:text-base ${
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

