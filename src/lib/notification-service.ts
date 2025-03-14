
import { toast } from 'sonner';

type Subscriber = {
  id: string;
  name: string;
  email: string;
  courseId: string;
  timestamp: string;
};

// In a real application, this would be stored in a database
const subscribers: Subscriber[] = [];

export const subscribeToNotifications = (
  name: string,
  email: string,
  courseId: string
): Promise<Subscriber> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      const newSubscriber: Subscriber = {
        id: `sub-${Date.now()}`,
        name,
        email,
        courseId,
        timestamp: new Date().toISOString(),
      };
      
      subscribers.push(newSubscriber);
      
      // Send notification to admin email
      sendNotificationToAdmin(
        "ualfinhe@gmail.com",
        "Novo assinante do curso",
        `${name} (${email}) se inscreveu no curso #${courseId}`
      );
      
      // Send welcome email to the subscriber
      sendNotificationToSubscriber(
        email,
        "Bem-vindo ao curso!",
        `Olá ${name}, você foi inscrito com sucesso! Você receberá atualizações e notificações sobre este curso.`
      );
      
      resolve(newSubscriber);
    }, 800);
  });
};

export const sendNotificationToAdmin = (
  adminEmail: string,
  subject: string,
  message: string
): void => {
  // In a real application, this would use an email service API
  console.log(`[ADMIN NOTIFICATION] To: ${adminEmail}, Subject: ${subject}, Message: ${message}`);
};

export const sendNotificationToSubscriber = (
  subscriberEmail: string,
  subject: string,
  message: string
): void => {
  // In a real application, this would use an email service API
  console.log(`[SUBSCRIBER NOTIFICATION] To: ${subscriberEmail}, Subject: ${subject}, Message: ${message}`);
};

export const sendNotificationToAllSubscribers = (
  courseId: string,
  subject: string,
  message: string
): void => {
  const courseSubscribers = subscribers.filter(sub => sub.courseId === courseId);
  
  courseSubscribers.forEach(subscriber => {
    sendNotificationToSubscriber(subscriber.email, subject, message);
  });
  
  toast.success(`Notificação enviada para ${courseSubscribers.length} inscritos.`);
};
