import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import EduNavbar from '@/components/EduNavbar';
import { User, Course, Post } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Mail, 
  Calendar, 
  GraduationCap, 
  Award, 
  Link as LinkIcon, 
  Github, 
  Linkedin, 
  Twitter,
  BookOpen
} from 'lucide-react';
import CourseCard from '@/components/CourseCard';

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Simular carregamento
    const timer = setTimeout(() => {
      // Em uma aplicação real, buscar dados do usuário com base no id
      const mockUser = generateMockUser(id || '1');
      setUser(mockUser);
      
      // Simular cursos matriculados e posts
      setEnrolledCourses(generateMockEnrolledCourses());
      setPosts(generateMockPosts(mockUser));
      
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <EduNavbar />
        <div className="pt-24 pb-16 container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="animate-pulse space-y-4">
            <div className="h-40 bg-gray-200 rounded-xl"></div>
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <EduNavbar />
        <div className="pt-24 pb-16 container mx-auto px-4 md:px-6 max-w-7xl text-center">
          <div className="py-20">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Usuário não encontrado</h1>
            <p className="text-gray-600 mb-8">O perfil que você está procurando não existe ou foi removido.</p>
            <Button asChild>
              <Link to="/">Voltar para Início</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <EduNavbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          {/* Cabeçalho do Perfil */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-6">
            <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
              <div className="absolute -bottom-16 left-8 ring-4 ring-white rounded-full overflow-hidden">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-32 h-32 object-cover"
                />
              </div>
            </div>
            
            <div className="pt-20 pb-6 px-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">{user.name}</h1>
                  <div className="flex items-center gap-3 text-gray-500">
                    <span>{user.role}</span>
                    <span>•</span>
                    <div className="flex items-center">
                      <Mail size={16} className="mr-1" />
                      <span>{user.email}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-1" />
                      <span>Membro desde {new Date(user.joined).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 flex gap-3">
                  <Button variant="outline">Mensagem</Button>
                  <Button>Seguir</Button>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6 max-w-3xl">
                {user.bio || 'Desenvolvedor apaixonado por tecnologia e educação. Sempre em busca de novos desafios e aprendizados.'}
              </p>
              
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-1">
                  <GraduationCap size={18} className="text-gray-500" />
                  <span className="text-gray-700">8 cursos concluídos</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award size={18} className="text-gray-500" />
                  <span className="text-gray-700">3 certificados</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen size={18} className="text-gray-500" />
                  <span className="text-gray-700">12 artigos publicados</span>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6 pt-6 border-t border-gray-100">
                <Link to="#" className="text-gray-500 hover:text-gray-900">
                  <Github size={20} />
                </Link>
                <Link to="#" className="text-gray-500 hover:text-gray-900">
                  <Linkedin size={20} />
                </Link>
                <Link to="#" className="text-gray-500 hover:text-gray-900">
                  <Twitter size={20} />
                </Link>
                <Link to="#" className="text-gray-500 hover:text-gray-900">
                  <LinkIcon size={20} />
                </Link>
              </div>
            </div>
          </div>
          
          {/* Conteúdo do Perfil */}
          <Tabs defaultValue="courses">
            <TabsList className="mb-6">
              <TabsTrigger value="courses">Cursos</TabsTrigger>
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="achievements">Conquistas</TabsTrigger>
            </TabsList>
            
            <TabsContent value="courses">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
              
              {enrolledCourses.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">Nenhum curso inscrito ainda.</p>
                  <Button asChild>
                    <Link to="/courses">Explorar Cursos</Link>
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="posts">
              <div className="space-y-6">
                {posts.map((post) => (
                  <div key={post.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{post.title}</h3>
                    <p className="text-gray-600 mb-4">{post.content}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, i) => (
                        <Badge key={i} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{post.date}</span>
                      <div className="flex items-center gap-4">
                        <span>{post.likes} curtidas</span>
                        <span>{post.comments} comentários</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                {posts.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">Nenhum post publicado ainda.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="achievements">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Conquistas e Certificados</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="border border-gray-100 rounded-lg p-4 flex items-center gap-4">
                      <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Award size={24} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {i === 0 ? 'JavaScript Avançado' : 
                           i === 1 ? 'React Fundamentos' : 
                           i === 2 ? 'Node.js Básico' :
                           i === 3 ? 'TypeScript Essencial' :
                           i === 4 ? 'Git & GitHub' :
                           'CSS Moderno'}
                        </h4>
                        <p className="text-sm text-gray-500">Concluído em {
                          i === 0 ? 'Mai 2023' : 
                          i === 1 ? 'Jul 2023' : 
                          i === 2 ? 'Ago 2023' :
                          i === 3 ? 'Set 2023' :
                          i === 4 ? 'Out 2023' :
                          'Nov 2023'
                        }</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

// Geradores de Dados Simulados
const generateMockUser = (id: string): User => {
  return {
    id,
    name: 'Rafael Oliveira',
    email: 'rafael.oliveira@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    bio: 'Desenvolvedor Full-Stack com 5 anos de experiência. Especializado em React, Node.js e TypeScript. Apaixonado por compartilhar conhecimento e ajudar novos programadores.',
    role: 'Instructor',
    joined: '2022-03-15'
  };
};

const generateMockEnrolledCourses = (): Course[] => {
  return [
    {
      id: '101',
      title: 'JavaScript: Do Básico ao Avançado',
      description: 'Aprenda JavaScript desde os fundamentos até técnicas avançadas de ES6+.',
      level: 'Intermediate',
      category: 'JavaScript',
      author: 'Lucas Mendes',
      duration: '6h 30min',
      lessons: 24,
      image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      tags: ['JavaScript', 'ES6', 'Frontend']
    },
    {
      id: '102',
      title: 'React: Componentes e Hooks',
      description: 'Domine o desenvolvimento de aplicações modernas com React, Hooks e Context API.',
      level: 'Advanced',
      category: 'React',
      author: 'Amanda Santos',
      duration: '8h 15min',
      lessons: 32,
      image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      tags: ['React', 'Hooks', 'Frontend']
    },
    {
      id: '103',
      title: 'Node.js: APIs RESTful',
      description: 'Construa APIs robustas e escaláveis com Node.js, Express e MongoDB.',
      level: 'Intermediate',
      category: 'Node.js',
      author: 'Carlos Ferreira',
      duration: '7h 45min',
      lessons: 28,
      image: 'https://images.unsplash.com/photo-1549605659-32d82da3a059?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      tags: ['Node.js', 'API', 'Backend']
    }
  ];
};

const generateMockPosts = (user: User): Post[] => {
  return [
    {
      id: '201',
      title: 'Dicas para otimizar o desempenho de aplicações React',
      content: 'Neste artigo, compartilho algumas técnicas que tenho usado para melhorar significativamente o desempenho de aplicações React, incluindo memoização, code splitting e lazy loading.',
      author: user,
      date: '3 dias atrás',
      tags: ['React', 'Performance', 'Frontend'],
      likes: 42,
      comments: 15
    },
    {
      id: '202',
      title: 'Como implementar autenticação JWT com Node.js e Express',
      content: 'Um guia passo a passo para implementar um sistema de autenticação seguro usando JSON Web Tokens em aplicações Node.js.',
      author: user,
      date: '1 semana atrás',
      tags: ['Node.js', 'Autenticação', 'JWT', 'Backend'],
      likes: 36,
      comments: 8
    },
    {
      id: '203',
      title: 'Desafio de código: clone do Twitter em 7 dias',
      content: 'Compartilho minha experiência desenvolvendo um clone simplificado do Twitter em 7 dias usando React, Node.js e MongoDB. Confira o código e as lições aprendidas!',
      author: user,
      date: '2 semanas atrás',
      tags: ['Projeto', 'React', 'Node.js', 'Fullstack'],
      likes: 53,
      comments: 22
    }
  ];
};

export default Profile;
