
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, BookOpen, Code, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const EduNavbar = () => {
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
          className="flex items-center gap-2 text-2xl font-semibold text-primary transition-all duration-300"
        >
          <Code size={28} className="text-primary" />
          <span className="hidden sm:inline">CodeEdu</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          <NavLink to="/" label="Home" />
          <NavLink to="/courses" label="Cursos" />
          <NavLink to="/community" label="Comunidade" />
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input 
              type="search" 
              placeholder="Buscar cursos..." 
              className="pl-10 w-64 h-9 rounded-full" 
            />
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-full border border-primary/20 hover:bg-primary/5"
            asChild
          >
            <Link to="/login">Login</Link>
          </Button>

          <Button 
            className="rounded-full"
            asChild
          >
            <Link to="/register">Cadastrar</Link>
          </Button>
        </div>

        <button
          className="md:hidden flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X size={24} className="text-gray-900" />
          ) : (
            <Menu size={24} className="text-gray-900" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-out-expo ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ top: '60px' }}
      >
        <div className="flex flex-col p-6 space-y-4">
          <div className="mb-4">
            <Input 
              type="search" 
              placeholder="Buscar cursos..." 
              className="w-full h-10 rounded-full pl-10"
              icon={<Search size={16} />}
            />
          </div>
          
          <MobileNavLink to="/" label="Home" />
          <MobileNavLink to="/courses" label="Cursos" />
          <MobileNavLink to="/community" label="Comunidade" />
          
          <div className="flex flex-col space-y-3 pt-4">
            <Button variant="outline" className="w-full rounded-full" asChild>
              <Link to="/login">Login</Link>
            </Button>
            
            <Button className="w-full rounded-full" asChild>
              <Link to="/register">Cadastrar</Link>
            </Button>
          </div>
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
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
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
          : 'text-gray-600 hover:text-gray-900'
      }`}
    >
      {label}
    </Link>
  );
};

export default EduNavbar;
