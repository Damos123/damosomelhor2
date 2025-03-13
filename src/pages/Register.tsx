
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import EduNavbar from '@/components/EduNavbar';
import { Github, Mail, AlertCircle, Loader2, ArrowRight } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, loginWithGoogle, loginWithGithub, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    try {
      if (!name.trim()) {
        throw new Error("Por favor, informe seu nome");
      }
      if (!email.trim()) {
        throw new Error("Por favor, informe seu email");
      }
      if (!password.trim()) {
        throw new Error("Por favor, informe sua senha");
      }
      if (password.length < 6) {
        throw new Error("A senha deve ter pelo menos 6 caracteres");
      }
      
      await register(name, email, password);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocorreu um erro ao criar sua conta");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <EduNavbar />
      
      <div className="container mx-auto pt-32 pb-16 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Criar uma nova conta</h1>
              <p className="text-gray-600">Junte-se a nossa comunidade de aprendizado hoje!</p>
            </div>
            
            {error && (
              <div className="bg-red-50 text-red-800 p-3 rounded-lg mb-6 flex items-center gap-2">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome completo
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Senha
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting || isLoading}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Criando conta...
                  </>
                ) : (
                  <>
                    Criar conta
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-2 text-gray-500">ou continue com</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-4">
                <Button 
                  variant="outline" 
                  type="button" 
                  onClick={loginWithGoogle}
                  disabled={isLoading}
                  className="w-full"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Google
                </Button>
                
                <Button 
                  variant="outline" 
                  type="button" 
                  onClick={loginWithGithub}
                  disabled={isLoading}
                  className="w-full"
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
              </div>
            </div>
            
            <div className="mt-6 text-center text-sm text-gray-600">
              Já tem uma conta?{" "}
              <Link to="/login" className="font-medium text-primary hover:underline">
                Entrar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
