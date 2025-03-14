
import { Course, User, Post, Lesson } from './types';

export const courses: Course[] = [
  {
    id: '1',
    title: 'HTML5 & CSS3 Fundamentos',
    description: 'Aprenda os fundamentos de HTML5 e CSS3 para criar websites modernos e responsivos. Este curso cobre todos os elementos HTML essenciais e propriedades CSS para iniciantes.',
    level: 'Beginner',
    category: 'Frontend',
    author: 'Maria Silva',
    duration: '15 horas',
    lessons: 24,
    image: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    featured: true,
    tags: ['HTML', 'CSS', 'Responsive Design']
  },
  {
    id: '2',
    title: 'JavaScript para Iniciantes',
    description: 'Domine os conceitos fundamentais de JavaScript, a linguagem de programação da web. Aprenda sobre variáveis, funções, loops, condicionais e manipulação do DOM.',
    level: 'Beginner',
    category: 'Frontend',
    author: 'Carlos Mendes',
    duration: '20 horas',
    lessons: 32,
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
    featured: true,
    tags: ['JavaScript', 'ES6', 'DOM']
  },
  {
    id: '3',
    title: 'React.js Essencial',
    description: 'Aprenda a construir interfaces modernas com React.js. Este curso cobre componentes, props, state, hooks e o ciclo de vida de componentes React.',
    level: 'Intermediate',
    category: 'Frontend',
    author: 'Ana Costa',
    duration: '25 horas',
    lessons: 40,
    image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    featured: false,
    tags: ['React', 'JavaScript', 'Frontend Framework']
  },
  {
    id: '4',
    title: 'Python para Desenvolvimento Web',
    description: 'Aprenda a utilizar Python no desenvolvimento web com frameworks como Flask e Django. Entenda como criar APIs RESTful e aplicações web completas.',
    level: 'Intermediate',
    category: 'Backend',
    author: 'Roberto Alves',
    duration: '30 horas',
    lessons: 45,
    image: 'https://cdn.pixabay.com/photo/2023/11/21/22/20/python-8406604_1280.jpg',
    featured: true,
    tags: ['Python', 'Flask', 'Django']
  },
  {
    id: '5',
    title: 'Node.js e Express do Zero ao Avançado',
    description: 'Construa aplicações backend robustas com Node.js e Express. Aprenda sobre rotas, middlewares, autenticação, e integração com bancos de dados.',
    level: 'Intermediate',
    category: 'Backend',
    author: 'Fernando Santos',
    duration: '28 horas',
    lessons: 38,
    image: 'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    featured: false,
    tags: ['Node.js', 'Express', 'API']
  },
  {
    id: '6',
    title: 'Git & GitHub - Controle de Versão',
    description: 'Domine o controle de versão com Git e GitHub. Aprenda sobre branches, merges, pull requests e como colaborar em projetos open source.',
    level: 'Beginner',
    category: 'DevTools',
    author: 'Juliana Martins',
    duration: '12 horas',
    lessons: 18,
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    featured: false,
    tags: ['Git', 'GitHub', 'Version Control']
  },
  {
    id: '7',
    title: 'Curso de Python 3 - Mundo 1',
    description: 'Curso completo de Python 3 para iniciantes. Aprenda desde os fundamentos da linguagem até estruturas condicionais, com exercícios práticos.',
    level: 'Beginner',
    category: 'Backend',
    author: 'Gustavo Guanabara',
    duration: '40 horas',
    lessons: 41,
    image: 'https://cdn.pixabay.com/photo/2023/11/21/22/20/python-8406604_1280.jpg',
    featured: true,
    tags: ['Python', 'Programação', 'Iniciante']
  },
  {
    id: '8',
    title: 'Curso de HTML5 e CSS3',
    description: 'Aprenda a criar sites utilizando HTML5 e CSS3 com o professor Gustavo Guanabara. Curso completo com projetos práticos e exercícios.',
    level: 'Beginner',
    category: 'Frontend',
    author: 'Gustavo Guanabara',
    duration: '50 horas',
    lessons: 48,
    image: 'https://i.ytimg.com/vi/Ejkb_YpuHWs/maxresdefault.jpg',
    featured: true,
    tags: ['HTML', 'CSS', 'Web Design']
  },
  {
    id: '9',
    title: 'Curso de JavaScript',
    description: 'Curso completo de JavaScript do básico ao avançado. Aprenda a programar usando a linguagem mais popular da web.',
    level: 'Intermediate',
    category: 'Frontend',
    author: 'Gustavo Guanabara',
    duration: '45 horas',
    lessons: 36,
    image: 'https://i.ytimg.com/vi/BXqUH86F-kA/maxresdefault.jpg',
    featured: false,
    tags: ['JavaScript', 'ECMAScript', 'DOM']
  },
  {
    id: '10',
    title: 'Curso de PHP',
    description: 'Aprenda PHP para desenvolvimento web do zero ao profissional. Curso completo com explicações sobre banco de dados e integração com MySQL.',
    level: 'Intermediate',
    category: 'Backend',
    author: 'Gustavo Guanabara',
    duration: '36 horas',
    lessons: 32,
    image: 'https://i.ytimg.com/vi/F7KzJ7e6EAc/maxresdefault.jpg',
    featured: false,
    tags: ['PHP', 'MySQL', 'Web Development']
  }
];

export const users: User[] = [
  {
    id: '1',
    name: 'Maria Silva',
    email: 'maria@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    bio: 'Desenvolvedora frontend com 10 anos de experiência. Especialista em HTML, CSS e JavaScript.',
    role: 'Instructor',
    joined: '2022-01-15'
  },
  {
    id: '2',
    name: 'Carlos Mendes',
    email: 'carlos@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    bio: 'Engenheiro de software full-stack com foco em JavaScript e Node.js.',
    role: 'Instructor',
    joined: '2022-02-10'
  },
  {
    id: '3',
    name: 'Ana Costa',
    email: 'ana@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    bio: 'Especialista em React e ecossistema moderno de JavaScript.',
    role: 'Instructor',
    joined: '2022-03-05'
  },
  {
    id: '4',
    name: 'Roberto Alves',
    email: 'roberto@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    bio: 'Desenvolvedor Python e entusiasta de ciência de dados.',
    role: 'Instructor',
    joined: '2022-04-20'
  }
];

export const posts: Post[] = [
  {
    id: '1',
    title: 'Como iniciar sua carreira em desenvolvimento web',
    content: 'Neste post, compartilho dicas valiosas para quem está começando na área de desenvolvimento web...',
    author: users[0],
    date: '2023-06-12',
    tags: ['Carreira', 'Iniciantes', 'Web Development'],
    likes: 145,
    comments: 32
  },
  {
    id: '2',
    title: 'Melhores práticas de JavaScript em 2023',
    content: 'O ecossistema JavaScript está sempre evoluindo. Neste artigo, discuto as melhores práticas atuais...',
    author: users[1],
    date: '2023-07-05',
    tags: ['JavaScript', 'Best Practices', 'ES2023'],
    likes: 210,
    comments: 45
  },
  {
    id: '3',
    title: 'Construindo APIs RESTful com Node.js',
    content: 'Aprenda a criar APIs RESTful robustas e escaláveis usando Node.js e Express...',
    author: users[2],
    date: '2023-08-18',
    tags: ['Node.js', 'API', 'Backend'],
    likes: 178,
    comments: 37
  }
];

export const categories = [
  'Frontend',
  'Backend',
  'DevOps',
  'Mobile',
  'Database',
  'DevTools',
  'Cloud',
  'Testing',
  'Security'
];

export const levels = ['Beginner', 'Intermediate', 'Advanced'];

export function getFilteredCourses(filters: {
  searchQuery?: string;
  category?: string[];
  level?: string[];
  tags?: string[];
}) {
  return courses.filter(course => {
    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      if (!course.title.toLowerCase().includes(query) && 
          !course.description.toLowerCase().includes(query) &&
          !course.author.toLowerCase().includes(query)) {
        return false;
      }
    }
    
    // Filter by category
    if (filters.category && filters.category.length > 0 && 
        !filters.category.includes(course.category)) {
      return false;
    }
    
    // Filter by level
    if (filters.level && filters.level.length > 0 && 
        !filters.level.includes(course.level)) {
      return false;
    }
    
    // Filter by tags
    if (filters.tags && filters.tags.length > 0) {
      const hasAllTags = filters.tags.every(tag => 
        course.tags.includes(tag)
      );
      if (!hasAllTags) return false;
    }
    
    return true;
  });
}

export function getCourseById(id: string): Course | undefined {
  return courses.find(course => course.id === id);
}

export function getUserById(id: string): User | undefined {
  return users.find(user => user.id === id);
}

// New function to get related courses based on category and tags
export function getRelatedCourses(courseId: string, category: string, tags: string[]): Course[] {
  // Filter courses by same category and at least one matching tag, excluding the current course
  return courses
    .filter(course => 
      course.id !== courseId && 
      (course.category === category || 
       course.tags.some(tag => tags.includes(tag)))
    )
    .slice(0, 3); // Return max 3 related courses
}
