import React from 'react';
import { Rating } from './Rating';

export const Testimonial = ({ name, role, quote, avatar, color = "bg-amber-50" }) => {
  return (
    <div className={`p-6 rounded-2xl border border-stone-200 shadow-sm relative space-y-4 ${color} paper-tape`}>
      <Rating rating={5} />
      <p className="text-xs sm:text-sm text-stone-700 font-handwriting text-base leading-relaxed">
        "{quote}"
      </p>
      <div className="flex items-center gap-3 pt-3 border-t border-stone-200/60">
        <img src={avatar} alt={name} className="w-9 h-9 rounded-full object-cover border border-stone-300 shadow-xs" />
        <div>
          <h4 className="text-xs font-bold text-stone-900">{name}</h4>
          <p className="text-[10px] text-stone-500 font-medium">{role}</p>
        </div>
      </div>
    </div>
  );
};
