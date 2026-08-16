import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Rating } from '../components/Rating';
import { 
  Star, Users, Globe, Clock, Check, ChevronDown, Play, 
  FileText, Award, Shield, CheckCircle, Lock, ArrowRight 
} from 'lucide-react';

export const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { courses, enrolledCourses, enrollInCourse, user } = useApp();

  const [openModuleId, setOpenModuleId] = useState('m1');

  const course = courses.find(c => c.id === id) || courses[0];
  const isEnrolled = enrolledCourses.includes(course.id);

  const toggleModule = (modId) => {
    setOpenModuleId(openModuleId === modId ? null : modId);
  };

  const handleEnrollClick = () => {
    if (!user.isLoggedIn) {
      navigate('/login');
      return;
    }
    if (isEnrolled) {
      navigate(`/player/${course.id}`);
    } else {
      enrollInCourse(course.id);
      navigate(`/player/${course.id}`);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16 font-sans">
      
      {/* Top Course Dark Banner */}
      <div className="bg-slate-950 text-white py-12 lg:py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <nav className="flex text-xs text-slate-400 mb-6 space-x-2">
            <Link to="/catalog" className="hover:text-white transition-colors">Courses</Link>
            <span>/</span>
            <span className="text-indigo-400 font-semibold">{course.subject}</span>
            <span>/</span>
            <span className="text-slate-200 line-clamp-1">{course.title}</span>
          </nav>

          <div className="lg:w-2/3 space-y-4">
            <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider">
              {course.gradeLevel} • {course.level || 'Intermediate'}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight leading-tight">
              {course.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
              {course.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300 pt-2">
              <Rating rating={course.rating} count={course.reviewsCount} />
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-indigo-400" /> {course.studentsCount.toLocaleString()} Students Enrolled
              </div>
              <div className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-emerald-400" /> English (Subtitles Included)
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <img src={course.instructor.avatar} alt={course.instructor.name} className="w-10 h-10 rounded-full border-2 border-indigo-500 object-cover shadow-xs" />
              <p className="text-xs text-slate-300">
                Created by <span className="text-white font-bold">{course.instructor.name}</span> ({course.instructor.title})
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 relative">
          
          {/* Left Main Content */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* What You'll Learn Box */}
            <div className="pro-card p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-4">
              <h2 className="text-2xl font-display font-bold text-slate-900">What you'll learn</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {course.whatYouWillLearn.map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-start text-xs text-slate-700">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Syllabus Accordion */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-2xl font-display font-bold text-slate-900">Curriculum Syllabus</h2>
                  <p className="text-xs text-slate-500">Modules and video lessons included in this course.</p>
                </div>
                <span className="text-xs font-semibold text-slate-500">{course.modules.length} Modules</span>
              </div>

              <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs divide-y divide-slate-200">
                {course.modules.map((mod, mIdx) => {
                  const isOpen = openModuleId === mod.id;
                  return (
                    <div key={mod.id}>
                      <button
                        onClick={() => toggleModule(mod.id)}
                        className="w-full flex justify-between items-center p-5 bg-slate-50 hover:bg-slate-100/80 text-left focus:outline-none transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                            {mIdx + 1}
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 text-sm">{mod.title}</h3>
                            <p className="text-xs text-slate-500 mt-0.5">{mod.duration} • {mod.lessons?.length || 0} lessons</p>
                          </div>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {isOpen && (
                        <div className="bg-white py-2 divide-y divide-slate-50">
                          {mod.lessons?.map(lesson => (
                            <div 
                              key={lesson.id}
                              onClick={() => { if (isEnrolled) navigate(`/player/${course.id}`); }}
                              className={`flex justify-between items-center px-6 py-3 text-xs ${isEnrolled ? 'hover:bg-indigo-50/50 cursor-pointer font-medium text-slate-900' : 'text-slate-600'}`}
                            >
                              <div className="flex items-center gap-3">
                                <Play className="w-3.5 h-3.5 text-indigo-600" />
                                <span>{lesson.title}</span>
                              </div>
                              <div className="flex items-center gap-3 text-xs text-slate-400">
                                <span>{lesson.duration}</span>
                                {!isEnrolled && <Lock className="w-3.5 h-3.5" />}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Instructor Credentials */}
            <div className="space-y-4">
              <h2 className="text-2xl font-display font-bold text-slate-900">Your Instructor</h2>
              <div className="pro-card p-6 sm:p-8 rounded-2xl border border-slate-200 flex flex-col sm:flex-row gap-6 items-start">
                <img src={course.instructor.avatar} alt={course.instructor.name} className="w-20 h-20 rounded-2xl object-cover shrink-0 shadow-xs border border-slate-200" />
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-900">{course.instructor.name}</h3>
                  <p className="text-xs font-bold text-indigo-600">{course.instructor.title}</p>
                  <p className="text-xs text-slate-600 leading-relaxed pt-1">{course.instructor.bio}</p>
                </div>
              </div>
            </div>

            {/* Enterprise Rating Breakdown Histogram */}
            <div className="space-y-6">
              <h2 className="text-2xl font-display font-bold text-slate-900">Student Rating Distribution</h2>
              <div className="pro-card p-6 rounded-2xl border border-slate-200 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                  
                  {/* Overall Average */}
                  <div className="sm:col-span-4 text-center sm:border-r sm:border-slate-200 pr-4">
                    <div className="text-5xl font-display font-extrabold text-slate-900">{course.rating}</div>
                    <div className="flex justify-center my-2"><Rating rating={course.rating} /></div>
                    <p className="text-xs text-slate-500">Course Rating ({course.reviewsCount} Reviews)</p>
                  </div>

                  {/* Histogram Bars */}
                  <div className="sm:col-span-8 space-y-2 text-xs font-medium text-slate-600">
                    <div className="flex items-center gap-3">
                      <span className="w-12 text-right">5 Stars</span>
                      <div className="flex-1 bg-slate-100 rounded-full h-2.5 overflow-hidden">
                        <div className="bg-amber-400 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                      <span className="w-8 text-right">85%</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="w-12 text-right">4 Stars</span>
                      <div className="flex-1 bg-slate-100 rounded-full h-2.5 overflow-hidden">
                        <div className="bg-amber-400 h-2.5 rounded-full" style={{ width: '10%' }}></div>
                      </div>
                      <span className="w-8 text-right">10%</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="w-12 text-right">3 Stars</span>
                      <div className="flex-1 bg-slate-100 rounded-full h-2.5 overflow-hidden">
                        <div className="bg-amber-400 h-2.5 rounded-full" style={{ width: '3%' }}></div>
                      </div>
                      <span className="w-8 text-right">3%</span>
                    </div>
                  </div>

                </div>

                {/* Reviews List */}
                <div className="pt-4 border-t border-slate-100 space-y-4">
                  {course.reviews.map(r => (
                    <div key={r.id} className="pb-3 border-b border-slate-100 last:border-b-0 space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-slate-900">{r.author}</span>
                        <span className="text-[10px] text-slate-400">{r.date}</span>
                      </div>
                      <Rating rating={r.rating} />
                      <p className="text-xs text-slate-600 pt-1 leading-relaxed">{r.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Right Sticky Sidebar Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden transform -translate-y-4 lg:-translate-y-24 z-20">
              <div onClick={handleEnrollClick} className="relative h-48 bg-slate-900 cursor-pointer group overflow-hidden">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-indigo-600 shadow-xl group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-indigo-600 ml-1" />
                  </div>
                  <span className="font-bold text-xs tracking-wider uppercase mt-3">
                    {isEnrolled ? 'Continue Course' : 'Preview Course'}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <div className="text-3xl font-display font-extrabold text-slate-900">
                    {course.isFree ? 'FREE' : `$${course.price}`}
                  </div>
                  <p className="text-xs text-emerald-600 font-semibold mt-1">Full Lifetime Access Included</p>
                </div>

                <button
                  onClick={handleEnrollClick}
                  className={`w-full py-3.5 px-4 font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 ${
                    isEnrolled ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  }`}
                >
                  {isEnrolled ? (
                    <> <CheckCircle className="w-4 h-4" /> Go to Classroom </>
                  ) : (
                    <> Enroll Now <ArrowRight className="w-4 h-4" /> </>
                  )}
                </button>

                <div className="space-y-2 pt-4 border-t border-slate-100 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-indigo-600 shrink-0" /> {course.duration} on-demand video
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-indigo-600 shrink-0" /> Downloadable worksheets
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-indigo-600 shrink-0" /> Verified LinkedIn Certificate
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
