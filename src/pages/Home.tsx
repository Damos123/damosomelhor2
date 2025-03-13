
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Star, Mail, Code } from 'lucide-react';
import EduNavbar from '@/components/EduNavbar';
import CourseCard from '@/components/CourseCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { courses } from '@/lib/education-data';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const featuredCourses = courses.filter(course => course.featured);

  useEffect(() => {
    // Simular carregamento
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <EduNavbar />
      
      {/* Seção Hero */}
      <section className="pt-24 lg:pt-28 pb-10 lg:pb-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div>
                <Badge>Plataforma de Aprendizado Gratuita</Badge>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Aprenda desenvolvimento web com <span className="text-primary">cursos gratuitos</span>
              </h1>
              <p className="text-lg text-gray-600">
                Descubra cursos de programação de alta qualidade, totalmente gratuitos. 
                Construa suas habilidades e avance na sua carreira com nossos recursos de aprendizado.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="rounded-full text-base" asChild>
                  <Link to="/courses">
                    Explorar Cursos <ArrowRight className="ml-2" size={18} />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full text-base" asChild>
                  <Link to="/community">
                    Participar da Comunidade
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="absolute w-72 h-72 bg-primary/10 rounded-full -top-10 -right-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Estudantes aprendendo" 
                className="rounded-lg shadow-lg relative z-10 image-fade-in"
              />
              <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-yellow-400/10 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Cursos em Destaque */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Cursos em Destaque</h2>
              <p className="text-gray-600 mt-2">Comece sua jornada com nossos cursos mais populares</p>
            </div>
            <Button variant="outline" className="hidden md:flex" asChild>
              <Link to="/courses">
                Ver Todos <ArrowRight className="ml-2" size={16} />
              </Link>
            </Button>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl h-80 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredCourses.slice(0, 3).map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
              
              <div className="flex justify-center mt-10">
                <Button className="md:hidden" asChild>
                  <Link to="/courses">
                    Ver Todos os Cursos <ArrowRight className="ml-2" size={16} />
                  </Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </section>
      
      {/* Recursos */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Por que escolher nossa plataforma?</h2>
            <p className="text-gray-600">Nossa missão é tornar a educação de qualidade acessível a todos, independentemente de localização ou situação financeira.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <FeatureCard 
              icon={<BookOpen className="w-10 h-10 text-primary" />}
              title="Cursos Gratuitos"
              description="Acesso a cursos completos e de qualidade sem nenhum custo ou assinatura necessária."
            />
            <FeatureCard 
              icon={<Users className="w-10 h-10 text-primary" />}
              title="Comunidade Ativa"
              description="Conecte-se com outros estudantes, compartilhe conhecimento e colabore em projetos."
            />
            <FeatureCard 
              icon={<Star className="w-10 h-10 text-primary" />}
              title="Conteúdo de Qualidade"
              description="Cursos criados por instrutores experientes abordando as tecnologias mais relevantes do mercado."
            />
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="bg-primary/5 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Fique por dentro das novidades
                </h2>
                <p className="text-gray-600 mb-6">
                  Inscreva-se para receber atualizações sobre novos cursos, eventos da comunidade e dicas de desenvolvimento.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input 
                      type="email" 
                      placeholder="Seu e-mail" 
                      className="pl-10 h-12 rounded-full" 
                    />
                  </div>
                  <Button size="lg" className="rounded-full">Inscrever-se</Button>
                </div>
                <p className="text-xs text-gray-500 text-center">
                  Ao se inscrever, você concorda com nossa Política de Privacidade. Você pode cancelar a qualquer momento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Rodapé */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center gap-2 text-xl font-semibold mb-4">
                <Code size={24} className="text-primary" />
                <span>CodeEdu</span>
              </div>
              <p className="text-gray-400 mb-4">
                Tornando a educação em programação acessível para todos.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Navegação</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Início</Link></li>
                <li><Link to="/courses" className="text-gray-400 hover:text-white transition-colors">Cursos</Link></li>
                <li><Link to="/community" className="text-gray-400 hover:text-white transition-colors">Comunidade</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Recursos</h3>
              <ul className="space-y-2">
                <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">Projetos</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">Termos de Uso</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">Privacidade</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">Cookies</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} CodeEdu. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const Badge = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary ${className || ''}`}>
      {children}
    </span>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="h-14 w-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Home;
