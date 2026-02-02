import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const StarRating = ({ 
  rating, 
  onRatingChange, 
  readonly = false,
  size = 'md' 
}: StarRatingProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          whileHover={!readonly ? { scale: 1.15 } : {}}
          whileTap={!readonly ? { scale: 0.95 } : {}}
          onClick={() => !readonly && onRatingChange?.(star)}
          disabled={readonly}
          className={`star ${star <= rating ? 'filled' : 'empty'} ${sizeClasses[size]} ${
            readonly ? 'cursor-default' : 'cursor-pointer'
          }`}
        >
          <Star 
            className={`w-full h-full ${star <= rating ? 'fill-current' : ''}`} 
          />
        </motion.button>
      ))}
    </div>
  );
};
