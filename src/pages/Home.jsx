import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { SUBJECT_CATEGORIES } from '../data/courses';
import { CourseCard } from '../components/CourseCard';
import { Testimonial } from '../components/Testimonial';
import { ArrowRight, BookOpen, Award, CheckCircle2, ShieldCheck, Sparkles, GraduationCap, Users, PlayCircle, Globe } from 'lucide-react';

export const Home = () => {
  const { courses } = useApp();
  const featuredCourses = courses.slice(0, 3);

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      
      {/* Enterprise Hero Banner */}
      <section className="relative bg-slate-950 text-white overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Accredited K-12 & Higher Ed Curriculum
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-tight">
                Empower your <br className="hidden sm:inline" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-indigo-200 to-emerald-400">
                  academic journey
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                Access high-impact, structured online courses taught by world-class educators. Master subjects, prepare for standardized tests, and earn verified digital credentials.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                <Link
                  to="/catalog"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 group text-sm"
                >
                  Explore Course Catalog
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/course/math-101"
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-6 py-4 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2"
                >
                  <PlayCircle className="w-4 h-4 text-indigo-400" /> Watch Demo Lesson
                </Link>
              </div>

              {/* Metric Ticker */}
              <div className="pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-slate-400 text-xs">
                <div>
                  <span className="block text-white font-extrabold text-xl">50,000+</span>
                  Active Enrolled Students
                </div>
                <div>
                  <span className="block text-white font-extrabold text-xl">500+</span>
                  Verified Courses
                </div>
                <div>
                  <span className="block text-white font-extrabold text-xl">4.9 / 5.0</span>
                  Average Faculty Rating
                </div>
              </div>
            </div>

            {/* Right Card Illustration */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-900">
                  <img 
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80" 
                    alt="Students learning online" 
                    className="w-full h-80 sm:h-96 object-cover opacity-85 hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>

                  <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md border border-slate-700 text-white p-4 rounded-xl shadow-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold">Verified LinkedIn Certificates</p>
                        <p className="text-[10px] text-slate-400">Accepted Worldwide</p>
                      </div>
                    </div>
                    <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-1 rounded border border-emerald-500/30">Accredited</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Partner Institutions Ticker */}
      <section className="bg-slate-100 border-y border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">
            Curriculum Partnered with Top Secondary & University Educators
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 opacity-75 font-display font-bold text-sm text-slate-600">
            <span>STANFORD EDTECH</span>
            <span>MIT STEM LABS</span>
            <span>HARVARD ONLINE</span>
            <span>OXFORD ACADEMY</span>
          </div>
        </div>
      </section>

      {/* Subject Categories Explorer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 font-mono">Curriculum Pathways</h2>
          <p className="text-3xl font-display font-bold text-slate-900">Explore Core Academic Subjects</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SUBJECT_CATEGORIES.map((cat, i) => (
            <Link
              key={i}
              to={`/catalog?subject=${encodeURIComponent(cat.name)}`}
              className="pro-card p-6 rounded-2xl border border-slate-200 hover:border-indigo-500 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <span className="inline-block px-2.5 py-1 bg-slate-100 text-slate-800 text-[11px] font-bold rounded-md uppercase">
                  {cat.name}
                </span>
                <h3 className="font-display font-bold text-xl text-slate-900 group-hover:text-indigo-600 transition-colors">{cat.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{cat.desc}</p>
              </div>
              <div className="pt-4 flex items-center text-xs font-bold text-indigo-600">
                View Courses <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Courses Grid */}
      <section className="bg-slate-100/70 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 font-mono">Highest Rated</h2>
              <p className="text-3xl font-display font-bold text-slate-900 mt-1">Featured School Courses</p>
            </div>
            <Link to="/catalog" className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
              See All Courses ({courses.length}) <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Student & Parent Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 font-mono">Student Stories</h2>
          <p className="text-3xl font-display font-bold text-slate-900">Loved by Students & Parents</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Testimonial
            name="Samantha K."
            role="Grade 10 Student"
            quote="The Advanced Algebra course saved my math grade! The visual video lessons explain quadratic equations step-by-step better than my school textbook."
            avatar="https://ui-avatars.com/api/?name=Samantha+K&background=4F46E5&color=fff"
          />

          <Testimonial
            name="David Miller"
            role="Parent of Grade 8 Student"
            quote="As a parent, I love the clear dashboard progress bars. My son completed the Python coding course and built his own text adventure game!"
            avatar="https://ui-avatars.com/api/?name=David+Miller&background=059669&color=fff"
          />

          <Testimonial
            name="Marcus Vance"
            role="High School Senior"
            quote="The AP History prep lessons gave me the confidence I needed. The primary source breakdowns were invaluable."
            avatar="https://ui-avatars.com/api/?name=Marcus+V&background=D97706&color=fff"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-indigo-900 to-slate-950 rounded-3xl p-8 sm:p-12 text-center text-white space-y-6 shadow-xl border border-slate-800">
          <h2 className="text-3xl sm:text-4xl font-display font-bold">Ready to boost your grades today?</h2>
          <p className="text-slate-300 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed">
            Create your free account, explore accredited courses, and start learning with interactive modules.
          </p>
          <div className="pt-2">
            <Link
              to="/catalog"
              className="bg-white text-indigo-950 hover:bg-slate-100 font-bold px-8 py-3.5 rounded-xl shadow-md text-xs sm:text-sm inline-block transition-colors"
            >
              Get Started for Free
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
