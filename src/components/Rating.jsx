import React from 'react';
import { Star } from 'lucide-react';

export const Rating = ({ rating = 5.0, count }) => {
  return (
    <div className="flex items-center gap-1 text-amber-600 text-xs font-semibold">
      <div className="flex text-amber-500">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-stone-300'}`} 
          />
        ))}
      </div>
      <span className="font-bold text-stone-800 ml-0.5">{rating}</span>
      {count !== undefined && (
        <span className="text-stone-500 font-normal">({count})</span>
      )}
    </div>
  );
};
