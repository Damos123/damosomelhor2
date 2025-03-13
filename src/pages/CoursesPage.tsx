
import { useState, useEffect } from 'react';
import EduNavbar from '@/components/EduNavbar';
import CourseCard from '@/components/CourseCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { courses, categories, levels } from '@/lib/education-data';

const CoursesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    // Simular carregamento
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Filtrar cursos com base na busca e filtros selecionados
    const filtered = courses.filter(course => {
      // Filtro de busca
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!course.title.toLowerCase().includes(query) && 
            !course.description.toLowerCase().includes(query) &&
            !course.author.toLowerCase().includes(query)) {
          return false;
        }
      }
      
      // Filtro de categoria
      if (selectedCategories.length > 0 && !selectedCategories.includes(course.category)) {
        return false;
      }
      
      // Filtro de nível
      if (selectedLevels.length > 0 && !selectedLevels.includes(course.level)) {
        return false;
      }
      
      return true;
    });
    
    setFilteredCourses(filtered);
  }, [searchQuery, selectedCategories, selectedLevels]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const toggleLevel = (level: string) => {
    setSelectedLevels(prev => 
      prev.includes(level) 
        ? prev.filter(l => l !== level) 
        : [...prev, level]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedLevels([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <EduNavbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Cursos Disponíveis</h1>
              <p className="text-gray-600 mt-1">Explore nossa coleção de cursos gratuitos em desenvolvimento web</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center gap-2">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <SlidersHorizontal size={16} />
                Filtros
                {(selectedCategories.length > 0 || selectedLevels.length > 0) && (
                  <span className="flex items-center justify-center bg-primary text-white rounded-full w-5 h-5 text-xs">
                    {selectedCategories.length + selectedLevels.length}
                  </span>
                )}
              </Button>
              
              {(selectedCategories.length > 0 || selectedLevels.length > 0 || searchQuery) && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-500"
                  onClick={clearFilters}
                >
                  Limpar filtros
                </Button>
              )}
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Barra lateral de filtros */}
            <aside className={`bg-white p-6 rounded-xl border border-gray-100 shadow-sm md:w-72 md:sticky md:top-24 transition-all duration-300 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
              <div className="flex items-center justify-between mb-6 md:hidden">
                <h3 className="font-medium text-lg">Filtros</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-500"
                  onClick={() => setIsFilterOpen(false)}
                >
                  <X size={18} />
                </Button>
              </div>
              
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <Input 
                    type="search" 
                    placeholder="Buscar cursos..." 
                    className="pl-10 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Categorias</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`category-${category}`} 
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <Label htmlFor={`category-${category}`} className="text-sm cursor-pointer">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Nível</h3>
                <div className="space-y-2">
                  {levels.map(level => (
                    <div key={level} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`level-${level}`} 
                        checked={selectedLevels.includes(level)}
                        onCheckedChange={() => toggleLevel(level)}
                      />
                      <Label htmlFor={`level-${level}`} className="text-sm cursor-pointer">
                        {level}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
            
            {/* Grade de cursos */}
            <div className="flex-1">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white rounded-xl h-80 animate-pulse"></div>
                  ))}
                </div>
              ) : (
                <>
                  {filteredCourses.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredCourses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <div className="bg-gray-100 rounded-full p-6 mb-4">
                        <Search size={32} className="text-gray-400" />
                      </div>
                      <h3 className="text-xl font-medium text-gray-900 mb-2">Nenhum curso encontrado</h3>
                      <p className="text-gray-600 mb-6">Tente ajustar seus filtros ou termos de busca</p>
                      <Button onClick={clearFilters}>Limpar filtros</Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CoursesPage;
