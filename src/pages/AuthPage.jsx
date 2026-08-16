import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const AuthPage = () => {
  const { authMode, setAuthMode, setRole, navigateTo, user } = useApp();
  
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    password: '',
    roleChoice: 'student'
  });

  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (authMode === 'forgot') {
      setResetSent(true);
      return;
    }

    setRole(formData.roleChoice);
    navigateTo('dashboard');
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 flex items-center justify-center px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-200 p-8 space-y-8">
        
        {/* Logo & Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center font-bold text-2xl mx-auto shadow-md">
            E
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            {authMode === 'login' && 'Welcome Back'}
            {authMode === 'signup' && 'Create Free Account'}
            {authMode === 'forgot' && 'Reset Password'}
          </h1>
          <p className="text-xs text-gray-500">
            {authMode === 'login' && 'Enter your details to access your courses.'}
            {authMode === 'signup' && 'Join thousands of students and start learning today.'}
            {authMode === 'forgot' && 'Enter your email to receive a password reset link.'}
          </p>
        </div>

        {/* Tab Switcher */}
        {authMode !== 'forgot' && (
          <div className="flex bg-gray-100 p-1 rounded-xl text-xs font-bold text-gray-500">
            <button
              onClick={() => setAuthMode('login')}
              className={`flex-1 py-2 rounded-lg transition-all ${authMode === 'login' ? 'bg-white text-primary shadow-sm' : 'hover:text-gray-900'}`}
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthMode('signup')}
              className={`flex-1 py-2 rounded-lg transition-all ${authMode === 'signup' ? 'bg-white text-primary shadow-sm' : 'hover:text-gray-900'}`}
            >
              Register
            </button>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium">
          
          {authMode === 'signup' && (
            <>
              <div>
                <label className="block text-gray-700 font-bold mb-1">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Alex Morgan"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-primary"
                  />
                  <i className="fas fa-user text-gray-400 absolute left-3.5 top-3.5"></i>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Select Role</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, roleChoice: 'student' })}
                    className={`p-3 rounded-xl border text-center font-bold text-xs transition-all ${formData.roleChoice === 'student' ? 'border-primary bg-indigo-50 text-primary' : 'border-gray-200 text-gray-600'}`}
                  >
                    🎓 Student
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, roleChoice: 'instructor' })}
                    className={`p-3 rounded-xl border text-center font-bold text-xs transition-all ${formData.roleChoice === 'instructor' ? 'border-secondary bg-green-50 text-secondary' : 'border-gray-200 text-gray-600'}`}
                  >
                    👨‍🏫 Educator
                  </button>
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-gray-700 font-bold mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="alex.student@edulearn.org"
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-primary"
              />
              <i className="fas fa-envelope text-gray-400 absolute left-3.5 top-3.5"></i>
            </div>
          </div>

          {authMode !== 'forgot' && (
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-gray-700 font-bold">Password</label>
                {authMode === 'login' && (
                  <button
                    type="button"
                    onClick={() => { setAuthMode('forgot'); setResetSent(false); }}
                    className="text-[11px] font-bold text-primary hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-primary"
                />
                <i className="fas fa-lock text-gray-400 absolute left-3.5 top-3.5"></i>
              </div>
            </div>
          )}

          {resetSent && (
            <div className="p-3 bg-green-50 text-green-800 rounded-xl text-xs flex items-center gap-2 border border-green-200 font-semibold">
              <i className="fas fa-check-circle text-secondary"></i>
              Password reset link sent to your email!
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-primary hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-md text-sm transition-colors flex items-center justify-center gap-2"
          >
            {authMode === 'login' && 'Sign In to EduLearn'}
            {authMode === 'signup' && 'Create Account'}
            {authMode === 'forgot' && 'Send Reset Link'}
            <i className="fas fa-arrow-right"></i>
          </button>
        </form>

        {authMode === 'forgot' && (
          <div className="text-center pt-2">
            <button onClick={() => setAuthMode('login')} className="text-xs font-bold text-primary hover:underline">
              Back to Sign In
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
