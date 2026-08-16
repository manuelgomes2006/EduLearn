import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const CourseDetailPage = () => {
  const { selectedCourseId, courses, navigateTo, enrollInCourse, user } = useApp();
  const [openModuleId, setOpenModuleId] = useState('m1');

  const course = courses.find(c => c.id === selectedCourseId) || courses[0];
  const isEnrolled = user.enrolledCourses.includes(course.id);

  const toggleModule = (id) => {
    setOpenModuleId(openModuleId === id ? null : id);
  };

  const handleEnrollClick = () => {
    if (isEnrolled) {
      navigateTo('classroom', course.id);
    } else if (course.isFree) {
      enrollInCourse(course.id);
      navigateTo('classroom', course.id);
    } else {
      navigateTo('checkout', course.id);
    }
  };

  return (
    <div className="bg-gray-50 text-gray-800 font-sans antialiased flex flex-col min-h-screen">
      
      {/* Main Content */}
      <main className="flex-grow">
        
        {/* Dark Hero Header */}
        <div className="bg-dark py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumbs */}
            <nav className="flex text-sm text-gray-400 mb-6" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <button onClick={() => navigateTo('catalog')} className="hover:text-white transition-colors">Courses</button>
                </li>
                <li>
                  <div className="flex items-center">
                    <i className="fas fa-chevron-right text-xs mx-2"></i>
                    <button onClick={() => navigateTo('catalog')} className="hover:text-white transition-colors">{course.category}</button>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <i className="fas fa-chevron-right text-xs mx-2"></i>
                    <span className="text-gray-200 font-medium line-clamp-1">{course.title}</span>
                  </div>
                </li>
              </ol>
            </nav>

            <div className="lg:w-2/3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">{course.title}</h1>
              <p className="text-lg text-gray-300 mb-6">{course.description}</p>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300 mb-8">
                <div className="flex items-center gap-2 text-yellow-400">
                  <div className="flex text-xs">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star-half-alt"></i>
                  </div>
                  <span className="text-white font-semibold ml-1 text-base">{course.rating}</span>
                  <span className="text-gray-400 font-normal underline cursor-pointer">({course.reviewsCount} ratings)</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fas fa-users"></i> {course.studentsCount.toLocaleString()} students enrolled
                </div>
                <div className="flex items-center gap-2">
                  <i className="fas fa-globe"></i> English
                </div>
              </div>

              <div className="flex items-center gap-3">
                <img src={course.instructor.avatar} alt="Instructor" className="w-10 h-10 rounded-full border-2 border-gray-600 object-cover" />
                <p className="text-gray-300 text-sm">Created by <a href="#" className="text-white font-medium hover:underline">{course.instructor.name}</a></p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 relative">
            
            {/* Left Content Area */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* What you'll learn */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">What you'll learn</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {course.whatYouWillLearn.map((item, idx) => (
                    <div key={idx} className="flex gap-3">
                      <i className="fas fa-check text-green-500 mt-1"></i>
                      <span className="text-gray-600 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Content (Accordion) */}
              <div>
                <div className="flex justify-between items-end mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Course Syllabus</h2>
                  <span className="text-gray-500 text-sm">{course.syllabus.length} Modules</span>
                </div>
                
                <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                  {course.syllabus.map((module, mIdx) => {
                    const isOpen = openModuleId === module.id;
                    return (
                      <div key={module.id} className="border-b border-gray-200 last:border-b-0">
                        <button 
                          onClick={() => toggleModule(module.id)}
                          className="accordion-header w-full flex justify-between items-center p-5 bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none"
                        >
                          <div className="flex items-center gap-4 text-left">
                            <div className="w-8 h-8 rounded bg-indigo-100 text-primary flex items-center justify-center font-bold text-sm">
                              {mIdx + 1}
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-900">{module.title}</h3>
                              <p className="text-xs text-gray-500 mt-1">{module.duration} • {module.lessons?.length || 0} lessons</p>
                            </div>
                          </div>
                          <i className={`fas fa-chevron-down text-gray-400 accordion-icon ${isOpen ? 'active' : ''}`}></i>
                        </button>

                        <div className={`accordion-content bg-white ${isOpen ? 'active' : ''}`}>
                          <ul className="py-2">
                            {module.lessons?.map(lesson => (
                              <li 
                                key={lesson.id}
                                onClick={() => {
                                  if (isEnrolled) navigateTo('classroom', course.id, lesson.id);
                                }}
                                className="flex justify-between items-center px-5 py-3 hover:bg-gray-50 text-sm text-gray-600 border-l-4 border-transparent hover:border-primary cursor-pointer"
                              >
                                <div className="flex items-center gap-3">
                                  <i className="fas fa-play-circle text-gray-400"></i> {lesson.title}
                                </div>
                                <span className="text-xs text-gray-400">{lesson.duration}</span>
                              </li>
                            ))}
                            {module.quiz && (
                              <li className="flex justify-between items-center px-5 py-3 hover:bg-gray-50 text-sm text-gray-600 border-l-4 border-transparent hover:border-primary cursor-pointer bg-emerald-50/30">
                                <div className="flex items-center gap-3">
                                  <i className="far fa-check-circle text-secondary"></i> {module.quiz.title}
                                </div>
                                <span className="text-xs text-gray-400">Interactive Quiz</span>
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Instructor Info */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Instructor</h2>
                <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200 flex flex-col sm:flex-row gap-6">
                  <img src={course.instructor.avatar} alt="Instructor" className="w-24 h-24 rounded-full object-cover shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{course.instructor.name}</h3>
                    <p className="text-sm font-medium text-primary mb-4">{course.instructor.title}</p>
                    <div className="flex gap-4 text-sm text-gray-600 mb-4">
                      <span><i className="fas fa-star text-yellow-400 mr-1"></i> {course.instructor.rating} Instructor Rating</span>
                      <span><i className="fas fa-users text-gray-400 mr-1"></i> {course.instructor.studentsCount} Students</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {course.instructor.bio}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar (Sticky on Desktop) */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden transform -translate-y-4 lg:-translate-y-32 z-10">
                
                {/* Video Preview Thumbnail */}
                <button onClick={handleEnrollClick} className="w-full relative block h-48 bg-gray-900 cursor-pointer group text-left">
                  <img src={course.thumbnail} alt="Course Preview" className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <i className="fas fa-play text-2xl text-primary ml-1"></i>
                    </div>
                    <span className="text-white font-medium mt-3 text-sm tracking-wide">
                      {isEnrolled ? 'Continue learning' : 'Preview this course'}
                    </span>
                  </div>
                </button>

                {/* Enrollment Details */}
                <div className="p-6">
                  <div className="text-3xl font-bold text-gray-900 mb-4">
                    {course.isFree ? 'Free' : `$${course.price}`} 
                    {!course.isFree && <span className="text-sm font-normal text-gray-500 line-through ml-2">$49.99</span>}
                  </div>
                  
                  <button 
                    onClick={handleEnrollClick}
                    className="block w-full py-3 px-4 bg-primary hover:bg-indigo-700 text-white text-center font-bold rounded-lg shadow-md transition-colors mb-3"
                  >
                    {isEnrolled ? 'Go to Classroom' : 'Enroll Now'}
                  </button>
                  <p className="text-xs text-center text-gray-500 mb-6">Start instantly and learn at your own schedule.</p>

                  <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-4">This course includes:</h4>
                  
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-center gap-3">
                      <i className="fas fa-video w-5 text-center text-gray-400"></i> {course.duration} on-demand video
                    </li>
                    <li className="flex items-center gap-3">
                      <i className="fas fa-file-pdf w-5 text-center text-gray-400"></i> 25 downloadable worksheets
                    </li>
                    <li className="flex items-center gap-3">
                      <i className="fas fa-mobile-alt w-5 text-center text-gray-400"></i> Access on mobile and web
                    </li>
                    <li className="flex items-center gap-3">
                      <i className="fas fa-layer-group w-5 text-center text-gray-400"></i> For {course.gradeLevel}
                    </li>
                    <li className="flex items-center gap-3">
                      <i className="fas fa-certificate w-5 text-center text-gray-400"></i> Certificate of completion
                    </li>
                  </ul>

                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

    </div>
  );
};
