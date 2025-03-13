
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, BookOpen, ArrowLeft, CheckCircle, Play, Users, Calendar } from 'lucide-react';
import EduNavbar from '@/components/EduNavbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getCourseById } from '@/lib/education-data';
import { toast } from '@/components/ui/sonner';

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState(getCourseById(id || ''));
  const [isLoading, setIsLoading] = useState(true);

  // Create mock lessons
  const lessons = Array.from({ length: course?.lessons || 10 }, (_, i) => ({
    id: `lesson-${i + 1}`,
    title: `Lição ${i + 1}: ${i === 0 ? 'Introdução' : i === 1 ? 'Conceitos Fundamentais' : `Aplicação Prática ${i - 1}`}`,
    duration: `${Math.floor(Math.random() * 20) + 10}:00`,
    isCompleted: i < 2,
  }));

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleEnroll = () => {
    toast.success('Inscrito com sucesso! Você já pode começar a aprender.');
  };

  if (!course && !isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <EduNavbar />
        <div className="pt-24 pb-16 container mx-auto px-4 md:px-6 max-w-7xl text-center">
          <div className="py-20">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Curso não encontrado</h1>
            <p className="text-gray-600 mb-8">O curso que você está procurando não existe ou foi removido.</p>
            <Button asChild>
              <Link to="/courses">Ver todos os cursos</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <EduNavbar />
      
      {isLoading ? (
        <div className="pt-24 pb-16 container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-12 bg-gray-200 rounded w-3/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      ) : (
        <>
          {/* Course Header */}
          <div className="pt-24 pb-8 bg-gradient-to-b from-gray-100 to-white">
            <div className="container mx-auto px-4 md:px-6 max-w-7xl">
              <Link to="/courses" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
                <ArrowLeft size={16} className="mr-1" />
                Voltar aos cursos
              </Link>
              
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline">{course?.category}</Badge>
                    <Badge className="bg-primary">{course?.level}</Badge>
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{course?.title}</h1>
                  
                  <p className="text-gray-600 mb-6 max-w-3xl">{course?.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{course?.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen size={16} />
                      <span>{course?.lessons} aulas</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={16} />
                      <span>+2500 alunos</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>Atualizado há 2 meses</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Button size="lg" onClick={handleEnroll}>
                      Inscrever-se Gratuitamente
                    </Button>
                    <Button size="lg" variant="outline">
                      <Play size={16} className="mr-2" /> Assistir Introdução
                    </Button>
                  </div>
                </div>
                
                <div className="md:w-1/3">
                  <img 
                    src={course?.image} 
                    alt={course?.title} 
                    className="rounded-xl shadow-lg w-full h-auto aspect-video object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Course Content */}
          <div className="py-12">
            <div className="container mx-auto px-4 md:px-6 max-w-7xl">
              <Tabs defaultValue="content" className="w-full">
                <TabsList className="mb-8">
                  <TabsTrigger value="content">Conteúdo do Curso</TabsTrigger>
                  <TabsTrigger value="instructor">Instrutor</TabsTrigger>
                  <TabsTrigger value="reviews">Avaliações</TabsTrigger>
                </TabsList>
                
                <TabsContent value="content" className="space-y-6">
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                      <h3 className="text-xl font-semibold text-gray-900">Módulos do Curso</h3>
                      <p className="text-gray-600 mt-1">
                        {course?.lessons} aulas • {course?.duration} total
                      </p>
                    </div>
                    
                    <div className="divide-y divide-gray-100">
                      {lessons.map((lesson, index) => (
                        <div 
                          key={lesson.id} 
                          className={`p-4 flex items-center justify-between hover:bg-gray-50 transition-colors ${index === 0 ? 'bg-primary/5' : ''}`}
                        >
                          <div className="flex items-center gap-3">
                            {lesson.isCompleted ? (
                              <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                            ) : index === 0 ? (
                              <Play size={20} className="text-primary flex-shrink-0" />
                            ) : (
                              <div className="w-5 h-5 rounded-full border border-gray-300 text-xs flex items-center justify-center flex-shrink-0">
                                {index + 1}
                              </div>
                            )}
                            <div>
                              <p className="font-medium text-gray-900">{lesson.title}</p>
                              {index === 0 && (
                                <span className="text-xs text-primary font-medium">Aula introdutória gratuita</span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-500">{lesson.duration}</span>
                            {index === 0 ? (
                              <Button variant="ghost" size="sm" className="text-primary">
                                Assistir
                              </Button>
                            ) : (
                              <Button variant="ghost" size="sm" className="text-gray-500" disabled={!lesson.isCompleted}>
                                {lesson.isCompleted ? 'Ver novamente' : 'Inscreva-se'}
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">O que você vai aprender</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {Array.from({ length: 8 }, (_, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">
                            {i === 0 ? 'Fundamentos essenciais da linguagem' : 
                             i === 1 ? 'Construir interfaces interativas' :
                             i === 2 ? 'Manipular dados e fazer requisições' :
                             i === 3 ? 'Técnicas avançadas de otimização' :
                             i === 4 ? 'Boas práticas de desenvolvimento' :
                             i === 5 ? 'Gerenciamento de estado da aplicação' :
                             i === 6 ? 'Testes e debugging eficientes' :
                             'Preparação para projetos do mundo real'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="instructor">
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <div className="flex items-start gap-6">
                      <img 
                        src="https://randomuser.me/api/portraits/men/32.jpg" 
                        alt="Instructor" 
                        className="w-24 h-24 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">{course?.author}</h3>
                        <p className="text-primary mb-3">Instrutor Sênior</p>
                        <p className="text-gray-600 mb-4">
                          Desenvolvedor com mais de 10 anos de experiência, especializado em tecnologias web modernas. 
                          Apaixonado por ensinar e compartilhar conhecimento de forma prática e objetiva.
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="flex flex-col">
                            <span className="font-semibold text-gray-900">12</span>
                            <span className="text-sm text-gray-500">Cursos</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-semibold text-gray-900">14.5k</span>
                            <span className="text-sm text-gray-500">Alunos</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-semibold text-gray-900">4.9</span>
                            <span className="text-sm text-gray-500">Avaliação</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="reviews">
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold text-gray-900">Avaliações dos Alunos</h3>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-400">
                              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                            </svg>
                          ))}
                        </div>
                        <span className="font-medium">4.9</span>
                        <span className="text-gray-500">(128 avaliações)</span>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                          <div className="flex items-center gap-3 mb-3">
                            <img 
                              src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i + 20}.jpg`} 
                              alt="User" 
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                              <p className="font-medium text-gray-900">
                                {i === 0 ? 'Rafael Oliveira' : i === 1 ? 'Amanda Santos' : 'Marcelo Lima'}
                              </p>
                              <p className="text-xs text-gray-500">
                                {i === 0 ? '2 meses atrás' : i === 1 ? '1 semana atrás' : '3 dias atrás'}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center mb-3">
                            {Array.from({ length: 5 }).map((_, j) => (
                              <svg key={j} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-400">
                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                              </svg>
                            ))}
                          </div>
                          
                          <p className="text-gray-700">
                            {i === 0 ? 
                              'Excelente curso para iniciantes! O conteúdo é bem estruturado e o instrutor explica cada conceito de forma clara e objetiva. Recomendo para quem está começando.' : 
                              i === 1 ? 
                              'Estou impressionada com a qualidade das aulas. Consegui aplicar o conhecimento em projetos reais logo nas primeiras semanas. O suporte da comunidade também é incrível!' : 
                              'As explicações são detalhadas e os exercícios práticos ajudam muito a fixar o conteúdo. Já fiz outros cursos na plataforma e a qualidade é sempre excelente.'}
                          </p>
                        </div>
                      ))}
                      
                      <Button variant="outline" className="w-full">Ver todas as avaliações</Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CourseDetail;
