import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Users, Building, Plus, CheckCircle, FileSpreadsheet, ArrowRight } from 'lucide-react';

export const DistrictAdminPanel = () => {
  const { districtLicense } = useApp();
  const [roster, setRoster] = useState(districtLicense.roster);
  const [newStudent, setNewStudent] = useState({ name: '', email: '', grade: 'Grade 10' });

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (newStudent.name && newStudent.email) {
      setRoster(prev => [
        ...prev,
        { id: `s-${Date.now()}`, name: newStudent.name, email: newStudent.email, grade: newStudent.grade, progress: "0%" }
      ]);
      setNewStudent({ name: '', email: '', grade: 'Grade 10' });
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 font-sans text-slate-800 space-y-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-900 px-3 py-1 rounded-full text-xs font-bold uppercase mb-2">
              🛡️ B2B School District License Portal
            </div>
            <h1 className="text-3xl font-display font-extrabold text-slate-900 tracking-tight">
              {districtLicense.schoolName}
            </h1>
            <p className="text-xs text-slate-500 mt-1">Manage seat allocations, bulk-enroll classroom rosters, and track cohort completion.</p>
          </div>

          <div className="bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-xs text-xs font-semibold text-slate-700">
            Subscription: <span className="font-bold text-indigo-600">{districtLicense.planName}</span>
          </div>
        </div>

        {/* License Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="pro-card p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Total District Seats</span>
            <div className="text-3xl font-display font-extrabold text-slate-900">{districtLicense.totalSeats} Seats</div>
            <p className="text-xs text-slate-400">Enterprise License</p>
          </div>

          <div className="pro-card p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Allocated Classroom Seats</span>
            <div className="text-3xl font-display font-extrabold text-indigo-600">{roster.length} Active Students</div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${(roster.length / districtLicense.totalSeats) * 100}%` }}></div>
            </div>
          </div>

          <div className="pro-card p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Available Remaining Seats</span>
            <div className="text-3xl font-display font-extrabold text-emerald-600">
              {districtLicense.totalSeats - roster.length} Seats
            </div>
            <p className="text-xs text-emerald-700 font-semibold">Ready for enrollment</p>
          </div>
        </div>

        {/* Bulk Roster Assigner & Roster Table */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Roster Table */}
          <div className="lg:col-span-2 pro-card rounded-2xl border border-slate-200 overflow-hidden space-y-4">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-lg font-display font-bold text-slate-900">Enrolled Student Cohort Roster</h2>
              <span className="text-xs font-semibold text-slate-500">{roster.length} Students</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase font-semibold">
                  <tr>
                    <th className="p-4">Student Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Grade</th>
                    <th className="p-4">Avg Progress</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {roster.map(st => (
                    <tr key={st.id} className="hover:bg-slate-50">
                      <td className="p-4 font-bold text-slate-900">{st.name}</td>
                      <td className="p-4 font-mono text-slate-600">{st.email}</td>
                      <td className="p-4 font-semibold text-indigo-600">{st.grade}</td>
                      <td className="p-4 font-bold text-emerald-700">{st.progress}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Roster Assigner */}
          <div className="space-y-6 lg:col-span-1">
            <div className="pro-card p-5 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Plus className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-sm text-slate-900">Enroll New Student Seat</h3>
              </div>

              <form onSubmit={handleAddStudent} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Student Full Name</label>
                  <input
                    type="text"
                    required
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                    placeholder="e.g. Jordan Lee"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">School Email Address</label>
                  <input
                    type="email"
                    required
                    value={newStudent.email}
                    onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                    placeholder="jordan.l@oakridge.edu"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Grade Level</label>
                  <select
                    value={newStudent.grade}
                    onChange={(e) => setNewStudent({ ...newStudent, grade: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                  >
                    <option value="Grade 9">Grade 9</option>
                    <option value="Grade 10">Grade 10</option>
                    <option value="Grade 11">Grade 11</option>
                    <option value="Grade 12">Grade 12</option>
                  </select>
                </div>

                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-xl transition-colors">
                  Assign Seat & Send Invite
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
