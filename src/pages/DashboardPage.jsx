import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const DashboardPage = () => {
  const { user, courses, getCourseProgress, navigateTo, setCertificateCourse, setRole } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const enrolledCoursesList = courses.filter(c => user.enrolledCourses.includes(c.id));

  let totalCompletedLessonsCount = 0;
  Object.values(user.completedLessons).forEach(arr => {
    totalCompletedLessonsCount += arr.length;
  });

  return (
    <div className="bg-gray-50 font-sans antialiased text-gray-800 h-screen flex overflow-hidden">
      
      {/* Sidebar (Desktop & Mobile) */}
      <aside 
        id="sidebar" 
        className={`bg-white w-64 border-r border-gray-200 flex flex-col justify-between absolute md:relative z-20 h-full transition-transform duration-300 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 shadow-xl md:shadow-none`}
      >
        <div>
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b border-gray-100">
            <button onClick={() => navigateTo('home')} className="flex items-center gap-2 text-left">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold shadow-md">E</div>
              <span className="font-bold text-xl text-dark">EduLearn</span>
            </button>
            <button 
              onClick={() => setSidebarOpen(false)} 
              className="md:hidden ml-auto text-gray-500 hover:text-red-500"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Menu</p>
            
            <button onClick={() => navigateTo('dashboard')} className="w-full flex items-center gap-3 px-3 py-2.5 bg-indigo-50 text-primary rounded-lg font-medium transition-colors text-left">
              <i className="fas fa-home w-5 text-center"></i> Dashboard
            </button>
            <button onClick={() => navigateTo('catalog')} className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg font-medium transition-colors text-left">
              <i className="fas fa-book-open w-5 text-center"></i> Course Catalog
            </button>
            <button onClick={() => navigateTo('dashboard')} className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg font-medium transition-colors text-left">
              <i className="fas fa-tasks w-5 text-center"></i> Assignments
              <span className="ml-auto bg-red-100 text-red-600 py-0.5 px-2 rounded-full text-xs font-bold">3</span>
            </button>

            {(user.role === 'instructor' || user.role === 'admin') && (
              <button onClick={() => navigateTo('instructor')} className="w-full flex items-center gap-3 px-3 py-2.5 text-emerald-700 bg-emerald-50 rounded-lg font-bold transition-colors text-left mt-2">
                <i className="fas fa-chalkboard-teacher w-5 text-center"></i> Instructor Hub
              </button>
            )}

            <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mt-6 mb-2">Settings</p>
            
            <button onClick={() => navigateTo('auth')} className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg font-medium transition-colors text-left">
              <i className="fas fa-user-circle w-5 text-center"></i> Profile
            </button>
          </nav>
        </div>

        {/* User bottom section */}
        <div className="p-4 border-t border-gray-100">
          <button onClick={() => navigateTo('auth')} className="w-full flex items-center gap-3 px-3 py-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium text-left">
            <i className="fas fa-sign-out-alt w-5 text-center"></i> Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden">
        
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)} 
              className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
            
            {/* Search */}
            <div className="hidden sm:flex relative max-w-md w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-search text-gray-400"></i>
              </div>
              <input 
                type="text" 
                className="block w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary focus:bg-white sm:text-sm transition-colors" 
                placeholder="Search courses, lessons..." 
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Role indicator badge */}
            <span className="hidden sm:inline-block px-2.5 py-1 rounded bg-indigo-50 text-indigo-700 text-xs font-bold capitalize">
              Role: {user.role}
            </span>

            {/* Notifications */}
            <button className="relative p-2 text-gray-400 hover:text-gray-500 transition-colors rounded-full hover:bg-gray-100">
              <i className="far fa-bell text-xl"></i>
              <span className="absolute top-1.5 right-1.5 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>
            
            {/* Profile Avatar */}
            <div className="flex items-center gap-3 cursor-pointer p-1 pr-2 rounded-full hover:bg-gray-100 transition-colors">
              <img className="h-8 w-8 rounded-full object-cover border border-gray-200" src={user.avatar} alt="User avatar" />
              <span id="profile-name" className="text-sm font-medium text-gray-700 hidden md:block">{user.name}</span>
              <i className="fas fa-chevron-down text-xs text-gray-400 hidden md:block"></i>
            </div>
          </div>
        </header>

        {/* Dashboard Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-primary to-indigo-800 rounded-2xl shadow-lg p-6 sm:p-8 text-white relative overflow-hidden">
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 id="welcome-text" className="text-2xl sm:text-3xl font-bold mb-2">Welcome back, {user.name}! 👋</h1>
                  <p className="text-indigo-100 max-w-xl">You've completed 80% of your weekly study goal. Keep up the great work! You have 2 assignments due tomorrow.</p>
                </div>
                <button onClick={() => navigateTo('catalog')} className="bg-white text-primary px-5 py-2.5 rounded-lg font-semibold shadow-sm hover:bg-gray-50 transition-colors whitespace-nowrap self-start md:self-auto">
                  View Schedule
                </button>
              </div>
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white opacity-10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 right-1/4 mb-[-4rem] w-40 h-40 bg-indigo-400 opacity-20 rounded-full blur-xl"></div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
                  <i className="fas fa-book"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Active Courses</p>
                  <p className="text-2xl font-bold text-gray-900">{enrolledCoursesList.length}</p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-green-50 text-green-600 flex items-center justify-center text-xl">
                  <i className="fas fa-check-circle"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Completed Lessons</p>
                  <p className="text-2xl font-bold text-gray-900">{totalCompletedLessonsCount || 28}</p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-yellow-50 text-yellow-600 flex items-center justify-center text-xl">
                  <i className="fas fa-clock"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Hours Learned</p>
                  <p className="text-2xl font-bold text-gray-900">14.5</p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center text-xl">
                  <i className="fas fa-trophy"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Total Points</p>
                  <p className="text-2xl font-bold text-gray-900">1,250</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Continue Learning Section */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-900">Continue Learning</h2>
                  <button onClick={() => navigateTo('catalog')} className="text-sm font-medium text-primary hover:text-indigo-800">Browse more</button>
                </div>

                {enrolledCoursesList.map(course => {
                  const progress = getCourseProgress(course.id);
                  return (
                    <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button onClick={() => navigateTo('classroom', course.id)} className="w-full sm:w-40 h-28 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 relative block text-left">
                          <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary pl-1">
                              <i className="fas fa-play"></i>
                            </div>
                          </div>
                        </button>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">{course.category}</span>
                              <span className="text-xs text-gray-500">{course.gradeLevel}</span>
                            </div>
                            <h3 className="font-bold text-gray-900 text-lg mb-1">
                              <button onClick={() => navigateTo('classroom', course.id)} className="hover:text-primary transition-colors text-left">
                                {course.title}
                              </button>
                            </h3>
                            <p className="text-sm text-gray-500">Instructor: {course.instructor.name}</p>
                          </div>
                          <div className="mt-4">
                            <div className="flex justify-between text-xs mb-1">
                              <span className="font-medium text-gray-700">Progress</span>
                              <span className="font-medium text-primary">{progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-primary h-2 rounded-full transition-all duration-700" style={{ width: `${progress}%` }}></div>
                            </div>

                            {progress === 100 && (
                              <button 
                                onClick={() => setCertificateCourse(course)}
                                className="mt-2 text-xs font-bold text-amber-600 bg-amber-50 hover:bg-amber-100 px-3 py-1 rounded transition-colors inline-flex items-center gap-1"
                              >
                                <i className="fas fa-award"></i> View Certificate
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Upcoming Tasks Sidebar */}
              <div className="space-y-4 lg:col-span-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-900">Upcoming Tasks</h2>
                  <button className="text-gray-400 hover:text-primary"><i className="fas fa-ellipsis-h"></i></button>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1">
                  
                  <div className="p-4 border-b border-gray-100 flex gap-3 hover:bg-gray-50 transition-colors rounded-t-lg">
                    <div className="mt-1">
                      <input type="checkbox" defaultChecked className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-900">Algebra Assignment 4</h4>
                      <p className="text-xs text-gray-500 mb-2">Mathematics</p>
                      <div className="flex items-center gap-2 text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded w-fit">
                        <i className="far fa-clock"></i> Today, 11:59 PM
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-b border-gray-100 flex gap-3 hover:bg-gray-50 transition-colors">
                    <div className="mt-1">
                      <input type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-900">Read Chapter 5: World War II</h4>
                      <p className="text-xs text-gray-500 mb-2">History</p>
                      <div className="flex items-center gap-2 text-xs font-medium text-yellow-600 bg-yellow-50 px-2 py-1 rounded w-fit">
                        <i className="far fa-clock"></i> Tomorrow, 10:00 AM
                      </div>
                    </div>
                  </div>

                  <div className="p-4 flex gap-3 hover:bg-gray-50 transition-colors rounded-b-lg">
                    <div className="mt-1">
                      <input type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-900">Biology Lab Report</h4>
                      <p className="text-xs text-gray-500 mb-2">Science</p>
                      <div className="flex items-center gap-2 text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded w-fit">
                        <i className="far fa-calendar-alt"></i> Friday, 14th Oct
                      </div>
                    </div>
                  </div>

                </div>

                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 mt-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-white p-3 rounded-lg text-primary shadow-sm">
                      <i className="fas fa-calendar-check text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">Parent-Teacher Meeting</h4>
                      <p className="text-xs text-gray-600 mt-1">Scheduled for next Tuesday. Ensure your reports are updated.</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-gray-900 bg-opacity-50 z-10 md:hidden"></div>
      )}
    </div>
  );
};
