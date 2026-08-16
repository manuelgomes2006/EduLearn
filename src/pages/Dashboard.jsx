import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ProgressBar } from '../components/ProgressBar';
import { CourseCard } from '../components/CourseCard';
import { FlashcardDeck } from '../components/FlashcardDeck';
import { BadgeCard } from '../components/BadgeCard';
import { ReportCardModal } from '../components/ReportCardModal';
import { CertificateModal } from '../components/CertificateModal';
import { 
  BookOpen, CheckCircle, Clock, Trophy, Play, ArrowRight, 
  Award, Flame, Heart, FileText, Sparkles, Calendar, Video, ShieldCheck 
} from 'lucide-react';

export const Dashboard = () => {
  const { 
    user, 
    courses, 
    enrolledCourses, 
    wishlist, 
    getCourseProgress, 
    userStats, 
    badges, 
    flashcardDecks, 
    setShowReportCardModal 
  } = useApp();

  const [activeTab, setActiveTab] = useState('courses');
  const [selectedCertCourse, setSelectedCertCourse] = useState(null);

  const enrolledList = courses.filter(c => enrolledCourses.includes(c.id));
  const wishlistedList = courses.filter(c => wishlist.includes(c.id));

  return (
    <div className="bg-slate-50 min-h-screen py-10 font-sans space-y-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-xl border border-slate-800">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-indigo-500/20 text-indigo-300 text-[11px] font-bold px-3 py-1 rounded-full border border-indigo-500/30 flex items-center gap-1.5 shadow-xs">
                  <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> {userStats.streakDays}-Day Study Streak
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 text-[11px] font-bold px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> {userStats.xp} Total XP
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight">
                Welcome back, {user.name}! 🎓
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
                You've completed <span className="text-emerald-400 font-bold">80%</span> of your weekly study goal. Next live faculty office hours are tomorrow at 4:00 PM.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 self-start md:self-auto">
              <button
                onClick={() => setShowReportCardModal(true)}
                className="bg-white text-slate-900 hover:bg-slate-100 px-4 py-2.5 rounded-xl font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
              >
                <FileText className="w-4 h-4 text-indigo-600" /> Parent Report Card
              </button>

              <Link
                to="/catalog"
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-xs transition-colors"
              >
                Explore Courses
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="pro-card p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Active Courses</p>
              <p className="text-2xl font-display font-extrabold text-slate-900">{enrolledList.length}</p>
            </div>
          </div>

          <div className="pro-card p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Completed Lessons</p>
              <p className="text-2xl font-display font-extrabold text-slate-900">28</p>
            </div>
          </div>

          <div className="pro-card p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Saved Wishlist</p>
              <p className="text-2xl font-display font-extrabold text-slate-900">{wishlistedList.length}</p>
            </div>
          </div>

          <div className="pro-card p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Badges Unlocked</p>
              <p className="text-2xl font-display font-extrabold text-slate-900">
                {badges.filter(b => b.unlocked).length} / {badges.length}
              </p>
            </div>
          </div>
        </div>

        {/* Dashboard Tabs & Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main 2-Col Left */}
          <div className="lg:col-span-2 space-y-6">
            
            <div className="flex border-b border-slate-200 space-x-6 text-xs font-bold">
              <button
                onClick={() => setActiveTab('courses')}
                className={`pb-3 flex items-center gap-2 border-b-2 transition-all ${activeTab === 'courses' ? 'border-indigo-600 text-indigo-600 font-extrabold' : 'border-transparent text-slate-500 hover:text-slate-900'}`}
              >
                <BookOpen className="w-4 h-4" /> Enrolled Courses ({enrolledList.length})
              </button>

              <button
                onClick={() => setActiveTab('flashcards')}
                className={`pb-3 flex items-center gap-2 border-b-2 transition-all ${activeTab === 'flashcards' ? 'border-indigo-600 text-indigo-600 font-extrabold' : 'border-transparent text-slate-500 hover:text-slate-900'}`}
              >
                <Sparkles className="w-4 h-4" /> Flashcards Deck
              </button>

              <button
                onClick={() => setActiveTab('wishlist')}
                className={`pb-3 flex items-center gap-2 border-b-2 transition-all ${activeTab === 'wishlist' ? 'border-indigo-600 text-indigo-600 font-extrabold' : 'border-transparent text-slate-500 hover:text-slate-900'}`}
              >
                <Heart className="w-4 h-4" /> Saved Wishlist ({wishlistedList.length})
              </button>

              <button
                onClick={() => setActiveTab('badges')}
                className={`pb-3 flex items-center gap-2 border-b-2 transition-all ${activeTab === 'badges' ? 'border-indigo-600 text-indigo-600 font-extrabold' : 'border-transparent text-slate-500 hover:text-slate-900'}`}
              >
                <Trophy className="w-4 h-4" /> Badges
              </button>
            </div>

            {/* Tab 1: Enrolled Courses */}
            {activeTab === 'courses' && (
              <div className="space-y-4">
                {enrolledList.map(course => {
                  const progress = getCourseProgress(course.id);
                  return (
                    <div key={course.id} className="pro-card bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row gap-5">
                      <div className="w-full sm:w-44 h-32 bg-slate-200 rounded-xl overflow-hidden shrink-0 relative">
                        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-slate-950/30 flex items-center justify-center">
                          <Link 
                            to={`/player/${course.id}`}
                            className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-indigo-600 shadow-lg hover:scale-110 transition-transform"
                          >
                            <Play className="w-4 h-4 fill-indigo-600 ml-0.5" />
                          </Link>
                        </div>
                      </div>

                      <div className="flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-indigo-100 text-indigo-700">
                              {course.subject}
                            </span>
                            <span className="text-xs text-slate-500">{course.gradeLevel}</span>
                          </div>
                          <h3 className="font-display font-bold text-slate-900 text-base">
                            <Link to={`/player/${course.id}`} className="hover:text-indigo-600 transition-colors">
                              {course.title}
                            </Link>
                          </h3>
                          <p className="text-xs text-slate-500">Instructor: {course.instructor.name}</p>
                        </div>

                        <div className="space-y-2">
                          <ProgressBar progress={progress} size="sm" />
                          <div className="pt-2 flex justify-between items-center">
                            {progress === 100 ? (
                              <button
                                onClick={() => setSelectedCertCourse(course)}
                                className="text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-lg border border-amber-200 flex items-center gap-1.5 transition-colors"
                              >
                                <Award className="w-4 h-4 text-amber-600" /> View Verified Certificate
                              </button>
                            ) : (
                              <span className="text-[11px] text-slate-400 font-mono">In Progress</span>
                            )}

                            <Link
                              to={`/player/${course.id}`}
                              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                            >
                              Resume Learning <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Tab 2: Flashcards */}
            {activeTab === 'flashcards' && (
              <div className="space-y-6">
                <FlashcardDeck deck={flashcardDecks[0]} />
              </div>
            )}

            {/* Tab 3: Wishlist */}
            {activeTab === 'wishlist' && (
              <div>
                {wishlistedList.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {wishlistedList.map(course => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
                    <p className="text-xs text-slate-500">No saved courses yet. Click the heart icon on any course card!</p>
                  </div>
                )}
              </div>
            )}

            {/* Tab 4: Badges */}
            {activeTab === 'badges' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {badges.map(b => (
                  <BadgeCard key={b.id} badge={b} />
                ))}
              </div>
            )}

          </div>

          {/* Right Sidebar: Live Faculty Calendar & Tasks */}
          <div className="space-y-6 lg:col-span-1">
            
            {/* Live Faculty Calendar Widget */}
            <div className="pro-card p-5 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Video className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-sm text-slate-900">Live Faculty Office Hours</h3>
              </div>

              <div className="p-3.5 bg-indigo-50/70 border border-indigo-100 rounded-xl space-y-2">
                <div className="flex justify-between items-start">
                  <span className="font-bold text-xs text-indigo-950">Advanced Algebra Q&A</span>
                  <span className="text-[10px] font-bold text-indigo-700 bg-indigo-200/60 px-2 py-0.5 rounded">Tomorrow</span>
                </div>
                <p className="text-xs text-indigo-800">Dr. Robert Chen • Live Video Stream</p>
                <div className="flex items-center gap-2 text-[11px] font-semibold text-indigo-700 pt-1">
                  <Clock className="w-3.5 h-3.5" /> 4:00 PM - 5:00 PM EST
                </div>
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="pro-card p-5 rounded-2xl border border-slate-200 space-y-3">
              <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-3">Assignments Due</h3>
              
              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-slate-900">Algebra Module 2 Quiz</p>
                    <p className="text-[10px] text-slate-500">Advanced Algebra & Functions</p>
                  </div>
                  <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">Today</span>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-slate-900">Python Text RPG Script</p>
                    <p className="text-[10px] text-slate-500">Intro to Python Programming</p>
                  </div>
                  <span className="text-[10px] text-slate-500">Friday</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      <ReportCardModal />
      {selectedCertCourse && (
        <CertificateModal course={selectedCertCourse} onClose={() => setSelectedCertCourse(null)} />
      )}
    </div>
  );
};
