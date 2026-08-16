import React from 'react';

export const ProgressBar = ({ progress = 0, showLabel = true, size = "md" }) => {
  const heightClass = size === "sm" ? "h-2" : size === "lg" ? "h-4" : "h-3";

  return (
    <div className="w-full space-y-1">
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-semibold text-stone-700">
          <span>Progress</span>
          <span className="font-mono text-amber-800">{progress}%</span>
        </div>
      )}
      <div className={`w-full bg-stone-200 rounded-full overflow-hidden ${heightClass} border border-stone-300 relative`}>
        {/* Ruler ticks background */}
        <div 
          className="bg-amber-600 h-full rounded-full transition-all duration-700 relative"
          style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
        >
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:4px_4px]"></div>
        </div>
      </div>
    </div>
  );
};
