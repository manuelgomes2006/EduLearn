import React from 'react';

export const BadgeCard = ({ badge }) => {
  return (
    <div 
      className={`p-4 rounded-2xl border text-center space-y-2 transition-all ${
        badge.unlocked 
          ? 'bg-amber-50/70 border-amber-300 shadow-xs' 
          : 'bg-stone-100/60 border-stone-200 opacity-50 grayscale'
      }`}
    >
      <div className="text-3xl">{badge.icon}</div>
      <div>
        <h4 className="font-serif font-bold text-xs text-stone-900 line-clamp-1">{badge.title}</h4>
        <p className="text-[10px] text-stone-500 line-clamp-2 mt-0.5 leading-tight">{badge.desc}</p>
      </div>
      <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
        badge.unlocked ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-600'
      }`}>
        {badge.unlocked ? 'Unlocked' : 'Locked'}
      </span>
    </div>
  );
};
