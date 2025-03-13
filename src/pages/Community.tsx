
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EduNavbar from '@/components/EduNavbar';
import { Post, User } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, MessageCircle, User as UserIcon, Heart, Share, MessageSquare } from 'lucide-react';

const Community = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setPosts(generateMockPosts());
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <EduNavbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Main Content */}
            <div className="flex-1">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
                <div className="flex items-center gap-4">
                  <img 
                    src="https://randomuser.me/api/portraits/men/32.jpg" 
                    alt="User" 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <Input 
                    placeholder="Compartilhe uma dúvida ou dica com a comunidade..." 
                    className="rounded-full bg-gray-50"
                  />
                  <Button className="rounded-full">Publicar</Button>
                </div>
              </div>
              
              <Tabs defaultValue="all" className="mb-6">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="all">Todos</TabsTrigger>
                  <TabsTrigger value="questions">Perguntas</TabsTrigger>
                  <TabsTrigger value="discussions">Discussões</TabsTrigger>
                  <TabsTrigger value="projects">Projetos</TabsTrigger>
                </TabsList>
              </Tabs>
              
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6 animate-pulse">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/5"></div>
                      </div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))
              ) : (
                posts.map((post) => (
                  <div key={post.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <img 
                        src={post.author.avatar} 
                        alt={post.author.name} 
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">{post.author.name}</h3>
                        <p className="text-sm text-gray-500">{post.date}</p>
                      </div>
                    </div>
                    
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">{post.title}</h2>
                    <p className="text-gray-600 mb-4">{post.content}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, i) => (
                        <span key={i} className="bg-gray-100 text-gray-600 px-3 py-1 text-sm rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1 text-gray-500 hover:text-primary">
                          <Heart size={18} />
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-1 text-gray-500 hover:text-primary">
                          <MessageSquare size={18} />
                          <span>{post.comments}</span>
                        </button>
                      </div>
                      <button className="flex items-center gap-1 text-gray-500 hover:text-primary">
                        <Share size={18} />
                        <span>Compartilhar</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {/* Sidebar */}
            <div className="w-full md:w-80 space-y-6">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Comunidade CodeEdu</h3>
                <p className="text-gray-600 mb-4">
                  Compartilhe dúvidas, projetos e conecte-se com outros desenvolvedores.
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <UserIcon size={16} />
                    <span>5.2k membros</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle size={16} />
                    <span>+12k posts</span>
                  </div>
                </div>
                <Button className="w-full">Criar Novo Post</Button>
              </div>
              
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tópicos Populares</h3>
                <div className="space-y-3">
                  {['React', 'JavaScript', 'Dúvidas Iniciais', 'Node.js', 'CSS', 'Projetos'].map((topic, i) => (
                    <Link 
                      key={i} 
                      to="#" 
                      className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <span className="text-gray-700">{topic}</span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {Math.floor(Math.random() * 500) + 50}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className="bg-primary/5 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <BookOpen size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Cursos Recomendados</h3>
                </div>
                
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Link 
                      key={i} 
                      to={`/course/${i + 1}`} 
                      className="block p-3 bg-white rounded-lg border border-gray-100 hover:border-primary/50 transition-colors"
                    >
                      <h4 className="font-medium text-gray-900 mb-1">
                        {i === 0 ? 'JavaScript Básico ao Avançado' : 
                         i === 1 ? 'React Fundamentos' : 
                         'Node.js para Iniciantes'}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {i === 0 ? '12 aulas • 3h total' : 
                         i === 1 ? '8 aulas • 2h15 total' : 
                         '10 aulas • 2h45 total'}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Mock Data Generator
const generateMockPosts = (): Post[] => {
  const users: User[] = [
    {
      id: '1',
      name: 'Carlos Silva',
      email: 'carlos@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      role: 'Instructor',
      joined: '2022-01-15'
    },
    {
      id: '2',
      name: 'Ana Pereira',
      email: 'ana@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      role: 'Student',
      joined: '2022-03-22'
    },
    {
      id: '3',
      name: 'Bruno Costa',
      email: 'bruno@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
      role: 'Student',
      joined: '2022-05-10'
    }
  ];

  return [
    {
      id: '1',
      title: 'Como estruturar um projeto React para escalabilidade?',
      content: 'Estou iniciando um novo projeto em React e gostaria de saber quais são as melhores práticas para estruturar os diretórios e arquivos de modo que o projeto seja escalável e de fácil manutenção no futuro.',
      author: users[0],
      date: '2 horas atrás',
      tags: ['React', 'Arquitetura', 'Frontend'],
      likes: 24,
      comments: 8
    },
    {
      id: '2',
      title: 'Qual a melhor abordagem para gerenciamento de estado em aplicações React?',
      content: 'Tenho trabalhado com Context API, mas para aplicações maiores, estou em dúvida se devo migrar para Redux, Zustand ou outra biblioteca. Alguém poderia compartilhar experiências e recomendações?',
      author: users[1],
      date: '5 horas atrás',
      tags: ['React', 'Estado', 'Redux', 'Context API'],
      likes: 32,
      comments: 15
    },
    {
      id: '3',
      title: 'Compartilhando meu projeto: Clone do Twitter com React e Node',
      content: 'Pessoal, finalizei um projeto clone do Twitter usando React no frontend e Node.js no backend. Implementei funcionalidades de autenticação, postagens e comentários. Código disponível no GitHub para quem quiser dar um feedback!',
      author: users[2],
      date: '1 dia atrás',
      tags: ['Projeto', 'React', 'Node.js', 'Fullstack'],
      likes: 47,
      comments: 12
    }
  ];
};

export default Community;
