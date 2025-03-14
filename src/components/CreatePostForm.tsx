
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

interface CreatePostFormProps {
  courseId: string;
}

const CreatePostForm = ({ courseId }: CreatePostFormProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAuthenticated, user } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Você precisa estar logado para criar uma postagem');
      return;
    }
    
    if (!title.trim() || !content.trim()) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simular envio (em um app real, isso iria para uma API)
    setTimeout(() => {
      toast.success('Sua postagem foi enviada com sucesso!');
      setTitle('');
      setContent('');
      setIsSubmitting(false);
    }, 1000);
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-gray-50 rounded-lg p-4 text-center">
        <p className="text-gray-600 mb-3">Faça login para participar da discussão</p>
        <Button>Entrar</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-start gap-3">
        <img 
          src={user?.avatar || "https://randomuser.me/api/portraits/lego/1.jpg"} 
          alt={user?.name || "Usuário"} 
          className="w-10 h-10 rounded-full object-cover mt-1"
        />
        <div className="flex-1 space-y-3">
          <Input
            placeholder="Título da sua postagem"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full"
          />
          <Textarea
            placeholder="Compartilhe sua dúvida, dica ou experiência sobre este curso..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-24"
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2">
              <Send size={16} /> 
              {isSubmitting ? 'Enviando...' : 'Publicar'}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreatePostForm;
