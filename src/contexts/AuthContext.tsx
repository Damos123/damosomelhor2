
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  provider: 'google' | 'github' | 'email';
};

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithGithub: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Verificar se há um usuário logado no localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Simulação de login com Google
  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      // Em uma aplicação real, aqui seria feita a chamada para o serviço de autenticação
      const mockUser: User = {
        id: 'google-' + Math.random().toString(36).substr(2, 9),
        name: 'Usuário Google',
        email: 'usuario@gmail.com',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        provider: 'google'
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      toast.success('Login com Google realizado com sucesso!');
      navigate('/');
    } catch (error) {
      console.error('Erro ao realizar login com Google:', error);
      toast.error('Erro ao realizar login com Google');
    } finally {
      setIsLoading(false);
    }
  };

  // Simulação de login com Github
  const loginWithGithub = async () => {
    setIsLoading(true);
    try {
      // Em uma aplicação real, aqui seria feita a chamada para o serviço de autenticação
      const mockUser: User = {
        id: 'github-' + Math.random().toString(36).substr(2, 9),
        name: 'Usuário GitHub',
        email: 'usuario@github.com',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        provider: 'github'
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      toast.success('Login com GitHub realizado com sucesso!');
      navigate('/');
    } catch (error) {
      console.error('Erro ao realizar login com GitHub:', error);
      toast.error('Erro ao realizar login com GitHub');
    } finally {
      setIsLoading(false);
    }
  };

  // Simulação de login com email e senha
  const loginWithEmail = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Em uma aplicação real, aqui seria feita a chamada para o serviço de autenticação
      if (email && password) {
        const mockUser: User = {
          id: 'email-' + Math.random().toString(36).substr(2, 9),
          name: email.split('@')[0],
          email: email,
          avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
          provider: 'email'
        };
        
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        toast.success('Login realizado com sucesso!');
        navigate('/');
      } else {
        throw new Error('Email e senha são obrigatórios');
      }
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      toast.error('Email ou senha inválidos');
    } finally {
      setIsLoading(false);
    }
  };

  // Simulação de registro
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Em uma aplicação real, aqui seria feita a chamada para o serviço de registro
      if (name && email && password) {
        const mockUser: User = {
          id: 'email-' + Math.random().toString(36).substr(2, 9),
          name: name,
          email: email,
          avatar: 'https://randomuser.me/api/portraits/lego/2.jpg',
          provider: 'email'
        };
        
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        toast.success('Registro realizado com sucesso!');
        navigate('/');
      } else {
        throw new Error('Todos os campos são obrigatórios');
      }
    } catch (error) {
      console.error('Erro ao realizar registro:', error);
      toast.error('Erro ao criar conta');
    } finally {
      setIsLoading(false);
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.info('Você saiu da sua conta');
    navigate('/');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isAuthenticated,
      loginWithGoogle,
      loginWithGithub,
      loginWithEmail,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};
