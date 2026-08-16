import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  GraduationCap, Search, LogOut, User, Menu, X, ShieldCheck, 
  Bell, Settings, CreditCard, Building, Award, CheckCircle 
} from 'lucide-react';

export const Navbar = () => {
  const { user, logout, notifications, setNotifications, activeRole, setActiveRole } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <header className="sticky top-0 z-40">
      {/* Accreditation Top Bar */}
      <div className="bg-slate-950 text-slate-300 text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded font-semibold text-[10px] uppercase tracking-wider">
            Accredited Platform
          </span>
          <span className="text-slate-400 hidden sm:inline">COPPA & FERPA K-12 Compliant</span>
        </div>

        {/* Role Switcher */}
        <div className="flex items-center gap-2 text-[11px] font-semibold">
          <span className="text-slate-500 hidden sm:inline">Role View:</span>
          <button
            onClick={() => setActiveRole('student')}
            className={`px-2 py-0.5 rounded ${activeRole === 'student' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Student
          </button>
          <button
            onClick={() => setActiveRole('instructor')}
            className={`px-2 py-0.5 rounded ${activeRole === 'instructor' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Instructor
          </button>
          <button
            onClick={() => setActiveRole('admin')}
            className={`px-2 py-0.5 rounded ${activeRole === 'admin' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            District Admin
          </button>
        </div>
      </div>

      {/* Main Nav Bar */}
      <nav className="glass-nav border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            
            {/* Logo & Navigation */}
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2.5 group">
                <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-sm group-hover:bg-indigo-700 transition-colors">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="font-extrabold text-2xl tracking-tight text-slate-900 font-display">
                  Edu<span className="text-indigo-600">Learn</span>
                </span>
              </Link>

              <div className="hidden md:flex items-center space-x-1">
                <NavLink to="/" className={({ isActive }) => `px-3 py-2 rounded-lg text-xs font-semibold ${isActive ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`} end>
                  Home
                </NavLink>

                <NavLink to="/catalog" className={({ isActive }) => `px-3 py-2 rounded-lg text-xs font-semibold ${isActive ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}>
                  Catalog
                </NavLink>

                {user.isLoggedIn && (
                  <>
                    <NavLink to="/dashboard" className={({ isActive }) => `px-3 py-2 rounded-lg text-xs font-semibold ${isActive ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}>
                      Student Dashboard
                    </NavLink>

                    <NavLink to="/instructor" className={({ isActive }) => `px-3 py-2 rounded-lg text-xs font-semibold ${isActive ? 'bg-emerald-50 text-emerald-700 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}>
                      Instructor Portal
                    </NavLink>

                    <NavLink to="/admin" className={({ isActive }) => `px-3 py-2 rounded-lg text-xs font-semibold ${isActive ? 'bg-purple-50 text-purple-700 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}>
                      District Admin
                    </NavLink>
                  </>
                )}
              </div>
            </div>

            {/* Search Input */}
            <div className="hidden lg:flex items-center max-w-xs w-full mx-4">
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search courses, skills..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-100/80 border border-slate-200 rounded-xl text-xs focus:outline-none focus:bg-white focus:border-indigo-600"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              </form>
            </div>

            {/* Notifications & Profile Menu */}
            <div className="flex items-center gap-3">
              {user.isLoggedIn && (
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 relative transition-colors"
                    title="Notifications"
                  >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white animate-pulse"></span>
                    )}
                  </button>

                  {/* Notification Popover Drawer */}
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-50 space-y-3 animate-in fade-in">
                      <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                        <span className="font-bold text-xs text-slate-900">Notifications ({unreadCount} new)</span>
                        <button onClick={markAllNotificationsRead} className="text-[10px] text-indigo-600 hover:underline font-bold">
                          Mark all read
                        </button>
                      </div>

                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {notifications.map(n => (
                          <div key={n.id} className={`p-2.5 rounded-xl text-xs space-y-1 ${n.read ? 'bg-slate-50 text-slate-600' : 'bg-indigo-50/70 border border-indigo-100 text-slate-900 font-semibold'}`}>
                            <p>{n.title}</p>
                            <span className="text-[10px] text-slate-400 font-normal">{n.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {user.isLoggedIn ? (
                <div className="flex items-center gap-2">
                  <Link to="/settings" className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100" title="Settings">
                    <Settings className="w-5 h-5" />
                  </Link>

                  <Link to="/dashboard" className="flex items-center gap-2 hover:opacity-80">
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover border border-slate-200" />
                  </Link>

                  <button onClick={logout} className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50">
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/login" className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg">
                    Log In
                  </Link>
                  <Link to="/signup" className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm">
                    Sign Up Free
                  </Link>
                </div>
              )}

              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-slate-600">
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>
      </nav>
    </header>
  );
};
