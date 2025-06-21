
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User, ChefHat } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/menu", label: "Menu" },
    { path: "/recipes", label: "Recipes" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Navigation - Pill Shaped */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'py-4' : 'py-6'
      }`}>
        <div className={`pill-navbar max-w-6xl mx-auto transition-all duration-500 ${
          isScrolled ? 'py-3' : 'py-4'
        }`}>
          <div className="flex items-center justify-between px-6 lg:px-8">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <ChefHat className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900 hidden sm:block">Healthy Kitchen</span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link 
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    location.pathname === item.path 
                      ? 'bg-slate-100 text-slate-900 shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Auth & Mobile Menu */}
            <div className="flex items-center space-x-3">
              {user ? (
                <Link to="/profile">
                  <Button variant="ghost" size="sm" className="rounded-full hidden sm:flex">
                    <User className="w-4 h-4" />
                  </Button>
                </Link>
              ) : (
                <Link to="/auth" className="hidden sm:block">
                  <Button className="cta-button text-sm px-6 py-2">
                    Sign In
                  </Button>
                </Link>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden rounded-full p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed top-24 left-4 right-4 glass-morphism rounded-2xl p-6 shadow-2xl">
            <div className="space-y-4">
              {navItems.map((item) => (
                <Link 
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                    location.pathname === item.path 
                      ? 'bg-slate-100 text-slate-900' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              {!user && (
                <Link 
                  to="/auth"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full"
                >
                  <Button className="cta-button w-full mt-4">
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
