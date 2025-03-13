
import { Link } from 'react-router-dom';
import { Clock, BookOpen, Star } from 'lucide-react';
import { Course } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <Link to={`/course/${course.id}`} className="group">
      <div className="course-card bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md">
        <div className="relative">
          <img 
            src={course.image} 
            alt={course.title} 
            className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <Badge className="bg-primary/90 hover:bg-primary/90 text-white">
              {course.level}
            </Badge>
          </div>
        </div>
        
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="text-xs py-0 text-gray-500">
              {course.category}
            </Badge>
            {course.featured && (
              <Badge className="bg-amber-500 hover:bg-amber-500 text-white text-xs">
                <Star className="w-3 h-3 mr-1" fill="white" /> Destaque
              </Badge>
            )}
          </div>
          
          <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {course.title}
          </h3>
          
          <p className="text-sm text-gray-500 mb-4 line-clamp-2">
            {course.description}
          </p>
          
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <img 
              src={`https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'women' : 'men'}/${Math.floor(Math.random() * 50) + 1}.jpg`}
              alt={course.author} 
              className="w-6 h-6 rounded-full mr-2 object-cover" 
            />
            <span>{course.author}</span>
          </div>
          
          <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-3">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="w-4 h-4 mr-1" />
              <span>{course.lessons} aulas</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
