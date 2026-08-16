import React from 'react';
import { useApp } from '../context/AppContext';

export const HomePage = () => {
  const { navigateTo, setActiveCategoryFilter, setAuthMode } = useApp();

  const handleSubjectClick = (categoryName) => {
    setActiveCategoryFilter(categoryName);
    navigateTo('catalog');
  };

  return (
    <div className="bg-gray-50 text-gray-800 font-sans antialiased">
      
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden hero-pattern">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-transparent sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 pt-10 lg:pt-20">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Empower your</span>{' '}
                  <span className="block text-primary xl:inline">school journey</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Access high-quality online courses designed specifically for school students. Master subjects, prepare for exams, and learn at your own pace with expert educators.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <button
                      onClick={() => navigateTo('catalog')}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-indigo-700 md:py-4 md:text-lg transition-colors"
                    >
                      Explore Courses
                    </button>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <button
                      onClick={() => navigateTo('course-detail', 'math-101')}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg transition-colors"
                    >
                      Watch Demo
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 hidden lg:block">
          <img 
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full opacity-90" 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
            alt="Students learning online" 
          />
        </div>
      </div>

      {/* Subjects Section */}
      <section id="subjects" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Curriculum</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Explore Our Subjects
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Comprehensive courses covering all core school subjects, designed to make learning engaging and effective.
            </p>
          </div>

          {/* Subject Cards Grid */}
          <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            
            {/* Mathematics Card */}
            <div 
              onClick={() => handleSubjectClick('Mathematics')}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 subject-card flex flex-col items-center text-center cursor-pointer"
            >
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 text-2xl">
                <i className="fas fa-calculator"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Mathematics</h3>
              <p className="text-gray-500 text-sm mb-4">Algebra, Geometry, Calculus, and foundations for all grades.</p>
              <span className="mt-auto text-primary font-medium hover:text-indigo-800 text-sm flex items-center gap-1">
                View Courses <i className="fas fa-arrow-right text-xs"></i>
              </span>
            </div>

            {/* Science Card */}
            <div 
              onClick={() => handleSubjectClick('Science')}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 subject-card flex flex-col items-center text-center cursor-pointer"
            >
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 text-2xl">
                <i className="fas fa-flask"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Science</h3>
              <p className="text-gray-500 text-sm mb-4">Physics, Chemistry, and Biology made interactive and fun.</p>
              <span className="mt-auto text-primary font-medium hover:text-indigo-800 text-sm flex items-center gap-1">
                View Courses <i className="fas fa-arrow-right text-xs"></i>
              </span>
            </div>

            {/* English Card */}
            <div 
              onClick={() => handleSubjectClick('English')}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 subject-card flex flex-col items-center text-center cursor-pointer"
            >
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4 text-2xl">
                <i className="fas fa-book-open"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">English</h3>
              <p className="text-gray-500 text-sm mb-4">Literature, Grammar, Writing skills, and reading comprehension.</p>
              <span className="mt-auto text-primary font-medium hover:text-indigo-800 text-sm flex items-center gap-1">
                View Courses <i className="fas fa-arrow-right text-xs"></i>
              </span>
            </div>

            {/* History/Social Studies Card */}
            <div 
              onClick={() => handleSubjectClick('History')}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 subject-card flex flex-col items-center text-center cursor-pointer"
            >
              <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-4 text-2xl">
                <i className="fas fa-globe-americas"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Social Studies</h3>
              <p className="text-gray-500 text-sm mb-4">History, Geography, and Civics to understand our world.</p>
              <span className="mt-auto text-primary font-medium hover:text-indigo-800 text-sm flex items-center gap-1">
                View Courses <i className="fas fa-arrow-right text-xs"></i>
              </span>
            </div>

            {/* Computer Science Card */}
            <div 
              onClick={() => handleSubjectClick('Computer Science')}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 subject-card flex flex-col items-center text-center cursor-pointer"
            >
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4 text-2xl">
                <i className="fas fa-laptop-code"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Computer Science</h3>
              <p className="text-gray-500 text-sm mb-4">Coding, digital literacy, and logic building for the future.</p>
              <span className="mt-auto text-primary font-medium hover:text-indigo-800 text-sm flex items-center gap-1">
                View Courses <i className="fas fa-arrow-right text-xs"></i>
              </span>
            </div>

            {/* Languages Card */}
            <div 
              onClick={() => handleSubjectClick('English')}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 subject-card flex flex-col items-center text-center cursor-pointer"
            >
              <div className="w-16 h-16 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mb-4 text-2xl">
                <i className="fas fa-language"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Foreign Languages</h3>
              <p className="text-gray-500 text-sm mb-4">Spanish, French, German, and more for global communication.</p>
              <span className="mt-auto text-primary font-medium hover:text-indigo-800 text-sm flex items-center gap-1">
                View Courses <i className="fas fa-arrow-right text-xs"></i>
              </span>
            </div>
             
             {/* Art Card */}
             <div 
              onClick={() => handleSubjectClick('Arts & Music')}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 subject-card flex flex-col items-center text-center cursor-pointer"
             >
                <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4 text-2xl">
                    <i className="fas fa-palette"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Arts & Music</h3>
                <p className="text-gray-500 text-sm mb-4">Creative expression through visual arts, music theory, and design.</p>
                <span className="mt-auto text-primary font-medium hover:text-indigo-800 text-sm flex items-center gap-1">
                    View Courses <i className="fas fa-arrow-right text-xs"></i>
                </span>
            </div>

             {/* Physical Education Card */}
             <div 
              onClick={() => handleSubjectClick('Science')}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 subject-card flex flex-col items-center text-center cursor-pointer"
             >
                <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mb-4 text-2xl">
                    <i className="fas fa-running"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Physical Ed.</h3>
                <p className="text-gray-500 text-sm mb-4">Health, fitness routines, and sports theory for a healthy lifestyle.</p>
                <span className="mt-auto text-primary font-medium hover:text-indigo-800 text-sm flex items-center gap-1">
                    View Courses <i className="fas fa-arrow-right text-xs"></i>
                </span>
            </div>

          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <div className="bg-primary">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to start learning?</span>
            <span className="block text-indigo-200">Join thousands of students today.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-indigo-100">
            Get full access to all our courses, personalized learning paths, and progress tracking tools.
          </p>
          <button 
            onClick={() => { setAuthMode('signup'); navigateTo('auth'); }}
            className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-indigo-50 sm:w-auto transition-colors"
          >
            Sign up for free
          </button>
        </div>
      </div>

    </div>
  );
};
