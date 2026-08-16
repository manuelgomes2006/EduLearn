import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  PlusCircle, DollarSign, Users, BookOpen, Star, 
  X, CheckCircle, ArrowUpRight, Calendar, Video, FileText 
} from 'lucide-react';

export const InstructorDashboard = () => {
  const { courses, createNewCourse, navigateTo } = useApp();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    subject: 'Mathematics',
    gradeLevel: 'Grade 9-10',
    price: '29.99',
    description: '',
    duration: '8 Weeks',
    level: 'Beginner'
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim() && formData.description.trim()) {
      const newId = createNewCourse(formData);
      setShowCreateModal(false);
      navigateTo('course-detail', newId);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 font-sans text-slate-800 space-y-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold uppercase mb-2">
              👨‍🏫 Certified Instructor Portal
            </div>
            <h1 className="text-3xl font-display font-extrabold text-slate-900 tracking-tight">Instructor Dashboard</h1>
            <p className="text-xs text-slate-500 mt-1">Manage course content, student rosters, gradebooks, and office hours.</p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-3 rounded-xl shadow-sm transition-colors flex items-center gap-2 text-xs self-start sm:self-auto"
          >
            <PlusCircle className="w-4 h-4" /> Build & Publish Course
          </button>
        </div>

        {/* Revenue & Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="pro-card p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Revenue</p>
              <p className="text-2xl font-display font-extrabold text-slate-900">$12,450.00</p>
            </div>
          </div>

          <div className="pro-card p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Students</p>
              <p className="text-2xl font-display font-extrabold text-slate-900">1,420</p>
            </div>
          </div>

          <div className="pro-card p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Active Courses</p>
              <p className="text-2xl font-display font-extrabold text-slate-900">{courses.length}</p>
            </div>
          </div>

          <div className="pro-card p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Star className="w-6 h-6 fill-purple-600" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Avg Instructor Rating</p>
              <p className="text-2xl font-display font-extrabold text-slate-900">4.88 / 5</p>
            </div>
          </div>
        </div>

        {/* Course Manager Table & Student Roster */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Course Table (2 cols) */}
          <div className="lg:col-span-2 pro-card rounded-2xl border border-slate-200 overflow-hidden space-y-4">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-lg font-display font-bold text-slate-900">Published Course Roster</h2>
              <span className="text-xs font-semibold text-slate-500">{courses.length} Active Courses</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="p-4">Course Name</th>
                    <th className="p-4">Subject</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Students</th>
                    <th className="p-4">Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {courses.map(course => (
                    <tr key={course.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-slate-900 flex items-center gap-3">
                        <img src={course.thumbnail} alt={course.title} className="w-9 h-9 rounded-lg object-cover" />
                        <span className="line-clamp-1">{course.title}</span>
                      </td>
                      <td className="p-4 font-semibold text-indigo-600">{course.subject}</td>
                      <td className="p-4 font-bold">{course.isFree ? 'Free' : `$${course.price}`}</td>
                      <td className="p-4 font-semibold">{course.studentsCount}</td>
                      <td className="p-4 font-bold text-amber-500">★ {course.rating}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Office Hours Scheduler */}
          <div className="space-y-6 lg:col-span-1">
            <div className="pro-card p-5 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Video className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-sm text-slate-900">Schedule Live Office Hours</h3>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); alert("Live Office Hours Broadcast Scheduled!"); }} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Select Course</label>
                  <select className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs">
                    {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Date & Time</label>
                  <input type="datetime-local" className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs" />
                </div>

                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-xl transition-colors">
                  Schedule Live Session
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>

      {/* Create Course Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto font-sans">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full border border-slate-200 p-6 sm:p-8 space-y-6 my-8 animate-in zoom-in-95">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-display font-extrabold text-slate-900">Build New Academic Course</h2>
                <p className="text-xs text-slate-500">Add course metadata, syllabus modules, and video links.</p>
              </div>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Course Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Advanced Calculus & Limits"
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                  >
                    <option value="Mathematics">Mathematics</option>
                    <option value="Science">Science</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="English">English</option>
                    <option value="History">History</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Grade Level</label>
                  <input
                    type="text"
                    value={formData.gradeLevel}
                    onChange={(e) => setFormData({ ...formData, gradeLevel: e.target.value })}
                    placeholder="Grade 9-10"
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Price ($ USD)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Summarize course goals..."
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl shadow-sm"
                >
                  Publish Course
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
