import { motion } from 'framer-motion';
import { Clock, Star, BadgeCheck } from 'lucide-react';
import { Experience } from '@/data/experiences';
import { Link } from 'react-router-dom';

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

export const ExperienceCard = ({ experience, index }: ExperienceCardProps) => {
  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link to={`/experience/${experience.id}`}>
        <div className="experience-card group cursor-pointer">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={experience.image}
              alt={experience.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
            
            {/* Duration Badge */}
            <div className="absolute top-3 left-3 bg-card/90 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-semibold text-foreground">
                {formatDuration(experience.duration)}
              </span>
            </div>

            {/* Price Badge */}
            <div className="absolute bottom-3 right-3 bg-secondary px-3 py-1.5 rounded-full">
              <span className="text-sm font-bold text-secondary-foreground">
                ₹{experience.price}
              </span>
            </div>
          </div>

          <div className="p-4">
            <h3 className="font-bold text-foreground text-lg leading-tight mb-1 group-hover:text-primary transition-colors">
              {experience.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-1">
              {experience.shortDescription}
            </p>

            <div className="flex items-center justify-between">
              <div className="verified-badge">
                <Star className="w-3 h-3 fill-current" />
                <span>{experience.rating}</span>
                <BadgeCheck className="w-3 h-3" />
                <span className="text-muted-foreground">Verified Host</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
