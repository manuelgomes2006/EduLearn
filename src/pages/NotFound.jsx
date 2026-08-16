import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ArrowLeft } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-24 flex items-center justify-center font-sans text-slate-800">
      <div className="pro-card p-10 rounded-3xl text-center space-y-6 max-w-md mx-auto">
        <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto font-bold text-2xl">
          <GraduationCap className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-display font-extrabold text-slate-900">404 Page Not Found</h1>
        <p className="text-xs text-slate-500">The classroom path you're looking for doesn't exist or has been moved.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl text-xs shadow-md transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Homepage
        </Link>
      </div>
    </div>
  );
};
