import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  reviewsCount?: number;
  size?: 'sm' | 'md' | 'lg';
}

export const RatingStars: React.FC<RatingStarsProps> = ({ rating, reviewsCount, size = 'sm' }) => {
  const starClass = size === 'sm' ? 'w-3.5 h-3.5' : size === 'md' ? 'w-4 h-4' : 'w-5 h-5';

  return (
    <div className="flex items-center space-x-1">
      <div className="flex items-center text-amber-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starClass} ${
              rating >= star
                ? 'fill-amber-400 text-amber-400'
                : rating >= star - 0.5
                ? 'fill-amber-300 text-amber-400'
                : 'text-earth-300'
            }`}
          />
        ))}
      </div>
      <span className={`font-bold text-earth-800 ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
        {rating.toFixed(1)}
      </span>
      {reviewsCount !== undefined && (
        <span className="text-[11px] text-earth-500 font-medium">({reviewsCount})</span>
      )}
    </div>
  );
};
