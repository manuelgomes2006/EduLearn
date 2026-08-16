import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CourseCard } from '../components/CourseCard';
import { Search, RotateCcw, BookOpen } from 'lucide-react';

export const Catalog = () => {
  const { courses } = useApp();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedPriceTier, setSelectedPriceTier] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  // Read URL query parameters if available
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    const subjectParam = params.get('subject');
    if (searchParam) setSearchQuery(searchParam);
    if (subjectParam) setSelectedSubject(subjectParam);
  }, [location.search]);

  const subjects = ["All Subjects", "Mathematics", "Science", "Computer Science", "English", "History", "Foreign Languages", "Arts & Music", "Geography"];
  const gradeLevels = ["All Grades", "Grade 6-8", "Grade 7-9", "Grade 8-10", "Grade 9-10", "Grade 10-11", "Grade 10-12", "Grade 11-12"];

  // Filter & Sort Logic
  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = course.title.toLowerCase().includes(query);
        const matchesDesc = course.description.toLowerCase().includes(query);
        const matchesSubj = course.subject.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesSubj) return false;
      }

      if (selectedSubject && selectedSubject !== "All Subjects") {
        if (course.subject.toLowerCase() !== selectedSubject.toLowerCase()) return false;
      }

      if (selectedGrade && selectedGrade !== "All Grades") {
        if (!course.gradeLevel.toLowerCase().includes(selectedGrade.toLowerCase())) return false;
      }

      if (selectedPriceTier === 'free' && !course.isFree) return false;
      if (selectedPriceTier === 'paid' && course.isFree) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return b.studentsCount - a.studentsCount;
    });
  }, [courses, searchQuery, selectedSubject, selectedGrade, selectedPriceTier, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedSubject('');
    setSelectedGrade('');
    setSelectedPriceTier('');
    setSortBy('popular');
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-10">
      
      {/* Catalog Header */}
      <div className="bg-stone-900 text-white py-12 px-4 sm:px-6 lg:px-8 text-center border-b border-stone-800">
        <div className="max-w-3xl mx-auto space-y-3">
          <h1 className="text-3xl sm:text-4xl font-serif font-extrabold tracking-tight">Course Catalog</h1>
          <p className="text-stone-300 text-xs sm:text-sm max-w-xl mx-auto">
            Browse interactive K-12 and college courses across mathematics, science, programming, history, and languages.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Search & Filter Bar Card */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by keyword, topic, or course name..."
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:outline-none focus:border-amber-700"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
            </div>

            {/* Subject Select */}
            <div className="md:col-span-3">
              <select
                value={selectedSubject || "All Subjects"}
                onChange={(e) => setSelectedSubject(e.target.value === "All Subjects" ? "" : e.target.value)}
                className="w-full px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-semibold text-stone-800 focus:outline-none focus:border-amber-700"
              >
                {subjects.map((s, i) => <option key={i} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Grade Select */}
            <div className="md:col-span-3">
              <select
                value={selectedGrade || "All Grades"}
                onChange={(e) => setSelectedGrade(e.target.value === "All Grades" ? "" : e.target.value)}
                className="w-full px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-semibold text-stone-800 focus:outline-none focus:border-amber-700"
              >
                {gradeLevels.map((g, i) => <option key={i} value={g}>{g}</option>)}
              </select>
            </div>

          </div>

          {/* Price Tier & Sort By Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-stone-100 text-xs font-semibold">
            
            {/* Price Pills */}
            <div className="flex items-center gap-2">
              <span className="text-stone-500">Price:</span>
              <button
                onClick={() => setSelectedPriceTier('')}
                className={`px-3 py-1 rounded-lg border transition-all ${selectedPriceTier === '' ? 'bg-amber-800 text-white border-amber-800' : 'bg-stone-100 text-stone-700 border-transparent hover:bg-stone-200'}`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedPriceTier('free')}
                className={`px-3 py-1 rounded-lg border transition-all ${selectedPriceTier === 'free' ? 'bg-amber-800 text-white border-amber-800' : 'bg-stone-100 text-stone-700 border-transparent hover:bg-stone-200'}`}
              >
                Free Only
              </button>
              <button
                onClick={() => setSelectedPriceTier('paid')}
                className={`px-3 py-1 rounded-lg border transition-all ${selectedPriceTier === 'paid' ? 'bg-amber-800 text-white border-amber-800' : 'bg-stone-100 text-stone-700 border-transparent hover:bg-stone-200'}`}
              >
                Paid
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-stone-500">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none font-bold text-amber-800 focus:outline-none cursor-pointer text-xs"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

          </div>
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center">
          <p className="text-xs font-bold text-stone-800">
            Showing <span className="text-amber-800">{filteredCourses.length}</span> course{filteredCourses.length === 1 ? '' : 's'}
          </p>

          {(searchQuery || selectedSubject || selectedGrade || selectedPriceTier) && (
            <button
              onClick={resetFilters}
              className="text-xs font-semibold text-stone-500 hover:text-rose-700 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
            </button>
          )}
        </div>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center max-w-md mx-auto space-y-4 my-12">
            <BookOpen className="w-12 h-12 text-amber-800 mx-auto" />
            <h3 className="text-lg font-serif font-bold text-stone-900">No courses match your filter</h3>
            <p className="text-xs text-stone-500">Try clearing active search keywords or subject filters.</p>
            <button
              onClick={resetFilters}
              className="bg-amber-800 text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-amber-900 transition-colors shadow-xs"
            >
              Clear All Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
