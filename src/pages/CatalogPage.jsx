import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';

export const CatalogPage = () => {
  const { 
    courses, 
    navigateTo, 
    searchQuery, 
    setSearchQuery, 
    activeCategoryFilter, 
    setActiveCategoryFilter, 
    user 
  } = useApp();

  const [selectedGrade, setSelectedGrade] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  // Filter & Sort Logic
  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = course.title.toLowerCase().includes(query);
        const matchesDesc = course.description.toLowerCase().includes(query);
        const matchesCat = course.category.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesCat) return false;
      }

      if (activeCategoryFilter && activeCategoryFilter !== "All Subjects") {
        if (course.category.toLowerCase() !== activeCategoryFilter.toLowerCase()) return false;
      }

      if (selectedGrade && selectedGrade !== "All Grades") {
        if (!course.gradeLevel.toLowerCase().includes(selectedGrade.toLowerCase())) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.studentsCount - a.studentsCount;
    });
  }, [courses, searchQuery, activeCategoryFilter, selectedGrade, sortBy]);

  const getBadgeColor = (category) => {
    switch (category) {
      case 'Science': return 'text-green-700';
      case 'English': return 'text-red-700';
      case 'History': return 'text-yellow-700';
      case 'Computer Science': return 'text-purple-700';
      default: return 'text-blue-700';
    }
  };

  return (
    <div className="bg-gray-50 text-gray-800 font-sans antialiased flex flex-col min-h-screen">
      
      {/* Page Header */}
      <div className="bg-indigo-900 py-12 px-4 sm:px-6 lg:px-8 text-center border-b border-indigo-800">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">Explore Our Course Catalog</h1>
        <p className="text-lg text-indigo-200 max-w-2xl mx-auto">Find the perfect courses to boost your grades, learn new skills, and prepare for your exams.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* Search & Filters Bar */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-8 z-10 relative -mt-14">
          <div className="flex flex-col md:flex-row gap-4">
            
            {/* Search Input */}
            <div className="flex-grow relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-search text-gray-400"></i>
              </div>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm" 
                placeholder="Search for subjects, topics, or keywords..."
              />
            </div>
            
            {/* Subject Filter */}
            <div className="w-full md:w-48 relative">
              <select 
                value={activeCategoryFilter || "All Subjects"}
                onChange={(e) => setActiveCategoryFilter(e.target.value === "All Subjects" ? "" : e.target.value)}
                className="block w-full pl-3 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm bg-white text-gray-700 cursor-pointer"
              >
                <option value="All Subjects">All Subjects</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Science</option>
                <option value="English">English</option>
                <option value="History">History</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Arts & Music">Arts & Music</option>
              </select>
            </div>

            {/* Grade Filter */}
            <div className="w-full md:w-48 relative">
              <select 
                value={selectedGrade || "All Grades"}
                onChange={(e) => setSelectedGrade(e.target.value === "All Grades" ? "" : e.target.value)}
                className="block w-full pl-3 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm bg-white text-gray-700 cursor-pointer"
              >
                <option value="All Grades">All Grades</option>
                <option value="Elementary">Elementary (1-5)</option>
                <option value="Middle">Middle School (6-8)</option>
                <option value="High">High School (9-12)</option>
              </select>
            </div>

          </div>
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Popular Courses <span className="text-sm font-normal text-gray-500 ml-2">(Showing {filteredCourses.length} courses)</span>
          </h2>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">Sort by:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border-none bg-transparent text-gray-700 font-medium focus:ring-0 cursor-pointer text-sm p-0 pr-4"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map(course => {
            const isEnrolled = user.enrolledCourses.includes(course.id);
            return (
              <div key={course.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden course-card flex flex-col">
                <div className="relative h-48 bg-gray-200">
                  <button onClick={() => navigateTo('course-detail', course.id)} className="w-full h-full block">
                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                  </button>
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 bg-white/90 backdrop-blur-sm ${getBadgeColor(course.category)} text-xs font-bold uppercase tracking-wider rounded-full shadow-sm`}>
                      {course.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-xl text-gray-900 leading-tight">
                        <button onClick={() => navigateTo('course-detail', course.id)} className="hover:text-primary text-left">
                          {course.title}
                        </button>
                      </h3>
                    </div>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">{course.description}</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 mt-auto">
                      <div className="flex items-center gap-1">
                        <i className="fas fa-layer-group text-primary"></i> {course.gradeLevel}
                      </div>
                      <div className="flex items-center gap-1">
                        <i className="far fa-clock text-primary"></i> {course.duration}
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-yellow-400 text-sm">
                        <i className="fas fa-star"></i>
                        <span className="text-gray-700 font-semibold ml-1">{course.rating}</span>
                        <span className="text-gray-400 font-normal">({course.reviewsCount})</span>
                      </div>
                      
                      {isEnrolled ? (
                        <button 
                          onClick={() => navigateTo('classroom', course.id)}
                          className="text-secondary font-semibold text-sm hover:text-emerald-800 transition-colors flex items-center gap-1"
                        >
                          <i className="fas fa-play-circle"></i> Continue
                        </button>
                      ) : (
                        <button 
                          onClick={() => navigateTo('course-detail', course.id)}
                          className="text-primary font-semibold text-sm hover:text-indigo-800 transition-colors"
                        >
                          Enroll Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
