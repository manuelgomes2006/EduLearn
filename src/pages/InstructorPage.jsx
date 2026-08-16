import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const InstructorPage = () => {
  const { courses, createNewCourse, navigateTo } = useApp();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Mathematics',
    gradeLevel: 'High School (9-12)',
    price: '29.99',
    description: '',
    whatYouWillLearn: '',
    duration: '8 Hours',
    level: 'Beginner',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim() && formData.description.trim()) {
      const newId = createNewCourse(formData);
      setShowCreateModal(false);
      setFormData({
        title: '',
        category: 'Mathematics',
        gradeLevel: 'High School (9-12)',
        price: '29.99',
        description: '',
        whatYouWillLearn: '',
        duration: '8 Hours',
        level: 'Beginner',
        thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800'
      });
      navigateTo('course-detail', newId);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header & Create Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Instructor Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your courses, track student enrollments, and publish new content.</p>
          </div>

          <button 
            onClick={() => setShowCreateModal(true)}
            className="bg-secondary hover:bg-emerald-600 text-white font-bold px-5 py-3 rounded-xl shadow-sm transition-colors flex items-center gap-2 self-start sm:self-auto text-sm"
          >
            <i className="fas fa-plus-circle"></i> Publish New Course
          </button>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-50 text-secondary flex items-center justify-center text-xl">
              <i className="fas fa-dollar-sign"></i>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">$12,450.00</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-primary flex items-center justify-center text-xl">
              <i className="fas fa-users"></i>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">1,420</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center text-xl">
              <i className="fas fa-book-open"></i>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Active Courses</p>
              <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl">
              <i className="fas fa-star"></i>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Avg Course Rating</p>
              <p className="text-2xl font-bold text-gray-900">4.88 / 5</p>
            </div>
          </div>
        </div>

        {/* Course Manager Table */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm space-y-4">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900">Published Courses</h2>
            <span className="text-xs font-semibold text-gray-500">{courses.length} Items</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="p-4">Course Name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Enrolled Students</th>
                  <th className="p-4">Rating</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {courses.map(course => (
                  <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-bold text-gray-900 flex items-center gap-3">
                      <img src={course.thumbnail} alt={course.title} className="w-10 h-10 rounded-lg object-cover" />
                      <span className="line-clamp-1">{course.title}</span>
                    </td>
                    <td className="p-4 font-semibold text-primary">{course.category}</td>
                    <td className="p-4 font-bold">{course.isFree ? 'Free' : `$${course.price}`}</td>
                    <td className="p-4 font-semibold">{course.studentsCount}</td>
                    <td className="p-4 font-bold text-yellow-500">★ {course.rating}</td>
                    <td className="p-4 text-right space-x-2">
                      <button 
                        onClick={() => navigateTo('course-detail', course.id)}
                        className="p-1.5 text-primary hover:bg-indigo-50 rounded-lg transition-colors inline-flex items-center gap-1 font-semibold"
                      >
                        View <i className="fas fa-external-link-alt text-xs"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Create New Course Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-gray-200 p-6 sm:p-8 space-y-6 my-8 animate-in zoom-in-95">
            
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Publish New Course</h2>
                <p className="text-xs text-gray-500">Fill in details to release your new educational course.</p>
              </div>
              <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-gray-600 p-1">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block text-gray-700 font-bold mb-1">Course Title *</label>
                <input 
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g. Advanced Calculus & Limits"
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Category *</label>
                  <select 
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-primary"
                  >
                    <option value="Mathematics">Mathematics</option>
                    <option value="Science">Science</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="English">English</option>
                    <option value="History">History</option>
                    <option value="Arts & Music">Arts & Music</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-1">Grade Level *</label>
                  <select 
                    name="gradeLevel"
                    value={formData.gradeLevel}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-primary"
                  >
                    <option value="Elementary (1-5)">Elementary (1-5)</option>
                    <option value="Middle School (6-8)">Middle School (6-8)</option>
                    <option value="High School (9-12)">High School (9-12)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Price ($ USD, enter 0 for Free)</label>
                  <input 
                    type="number"
                    name="price"
                    step="0.01"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-1">Total Duration</label>
                  <input 
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="e.g. 10 Hours"
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Course Description *</label>
                <textarea 
                  name="description"
                  rows={3}
                  required
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Summarize course goals and prerequisites..."
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowCreateModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>

                <button 
                  type="submit"
                  className="bg-secondary hover:bg-emerald-600 text-white font-bold px-6 py-2.5 rounded-xl transition-colors shadow-sm"
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
