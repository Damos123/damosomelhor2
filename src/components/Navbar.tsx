
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-2xl font-semibold text-estate-950 transition-all duration-300"
        >
          <Home size={28} className="text-primary" />
          <span className="hidden sm:inline">EstateVue</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          <NavLink to="/" label="Home" />
          <NavLink to="/search" label="Properties" />
          <NavLink to="/map" label="Map" />
        </nav>

        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="hidden sm:flex items-center gap-2 rounded-full border border-estate-200 hover:bg-estate-50 transition-all duration-300"
            onClick={() => {}}
            asChild
          >
            <Link to="/search">
              <Search size={16} />
              <span>Search</span>
            </Link>
          </Button>

          <Button 
            className="hidden md:block rounded-full transition-all duration-300"
            asChild
          >
            <Link to="/search">View All Properties</Link>
          </Button>

          <button
            className="md:hidden flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X size={24} className="text-estate-900" />
            ) : (
              <Menu size={24} className="text-estate-900" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-out-expo ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ top: '60px' }}
      >
        <div className="flex flex-col p-6 space-y-4">
          <MobileNavLink to="/" label="Home" />
          <MobileNavLink to="/search" label="Properties" />
          <MobileNavLink to="/map" label="Map" />
          
          <Button className="w-full mt-4 rounded-full">
            <Link to="/search" className="w-full">View All Properties</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

const NavLink = ({ to, label }: { to: string; label: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
        isActive
          ? 'text-primary bg-primary/5'
          : 'text-estate-600 hover:text-estate-900 hover:bg-estate-50'
      }`}
    >
      {label}
    </Link>
  );
};

const MobileNavLink = ({ to, label }: { to: string; label: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`px-4 py-3 rounded-md text-lg font-medium ${
        isActive
          ? 'text-primary bg-primary/5'
          : 'text-estate-600 hover:text-estate-900'
      }`}
    >
      {label}
    </Link>
  );
};

export default Navbar;
