import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { BookOpen, User, Mail, Lock, ArrowRight } from 'lucide-react';

export const Signup = () => {
  const { signup } = useApp();
  const navigate = useNavigate();

  const [name, setName] = useState('Alex Morgan');
  const [email, setEmail] = useState('alex.morgan@school.edu');
  const [password, setPassword] = useState('password123');

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(name, email, password, 'student');
    navigate('/dashboard');
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-16 flex items-center justify-center px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md w-full index-card paper-tape bg-white rounded-3xl border border-stone-200 p-8 space-y-8">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-amber-800 text-white rounded-2xl flex items-center justify-center font-bold text-2xl mx-auto shadow-xs">
            <BookOpen className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-serif font-extrabold text-stone-900">Create Free Account</h1>
          <p className="text-xs text-stone-500">Join thousands of students and start learning today.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
          <div>
            <label className="block text-stone-700 mb-1">Full Name</label>
            <div className="relative">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:outline-none focus:border-amber-800"
              />
              <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-stone-700 mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:outline-none focus:border-amber-800"
              />
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-stone-700 mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:outline-none focus:border-amber-800"
              />
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-800 hover:bg-amber-900 text-white font-bold py-3 rounded-xl shadow-xs text-xs transition-colors flex items-center justify-center gap-2 mt-4"
          >
            Create Account <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-stone-100 text-xs text-stone-600">
          Already registered?{' '}
          <Link to="/login" className="font-bold text-amber-800 hover:underline">
            Sign In Here
          </Link>
        </div>

      </div>
    </div>
  );
};
