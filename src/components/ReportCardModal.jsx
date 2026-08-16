import React from 'react';
import { useApp } from '../context/AppContext';
import { Printer, X, Award, CheckCircle } from 'lucide-react';

export const ReportCardModal = () => {
  const { showReportCardModal, setShowReportCardModal, user, courses, enrolledCourses, getCourseProgress } = useApp();

  if (!showReportCardModal) return null;

  const enrolledList = courses.filter(c => enrolledCourses.includes(c.id));

  const handlePrint = () => {
    window.print();
  };

  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="fixed inset-0 bg-stone-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto font-sans">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full border border-stone-200 overflow-hidden relative my-8 animate-in zoom-in-95">
        
        {/* Top Controls */}
        <div className="bg-stone-900 px-6 py-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="font-serif font-bold text-sm">Parent & Guardian Progress Report</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="bg-amber-800 hover:bg-amber-700 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Printer className="w-4 h-4" /> Print Report Card
            </button>
            <button
              onClick={() => setShowReportCardModal(false)}
              className="text-stone-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Area */}
        <div id="certificate-print-area" className="p-8 sm:p-12 bg-[#FFFDF9] space-y-8">
          
          {/* Official Letterhead Header */}
          <div className="border-b-2 border-stone-800 pb-6 flex justify-between items-end">
            <div>
              <h1 className="font-serif font-extrabold text-2xl sm:text-3xl text-stone-900 uppercase tracking-tight">
                EduLearn Academy
              </h1>
              <p className="text-xs text-stone-500 font-mono">Official Academic Performance & Progress Report</p>
            </div>
            <div className="text-right text-xs text-stone-600 font-mono">
              <p>Issued: <span className="font-bold text-stone-900">{today}</span></p>
              <p>Term: <span className="font-bold text-stone-900">Fall Semester 2026</span></p>
            </div>
          </div>

          {/* Student Info Box */}
          <div className="bg-stone-100 p-4 rounded-xl border border-stone-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-sans">
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-500 block">Student Name</span>
              <span className="font-serif font-bold text-stone-900 text-sm">{user.name}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-500 block">Email Address</span>
              <span className="font-mono text-stone-800 text-xs">{user.email}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-500 block">Enrolled Courses</span>
              <span className="font-bold text-stone-900">{enrolledList.length} Courses</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-500 block">Overall Status</span>
              <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">Good Standing</span>
            </div>
          </div>

          {/* Course Grades Table */}
          <div className="space-y-3">
            <h3 className="font-serif font-bold text-base text-stone-900">Course Progress Breakdown</h3>
            <table className="w-full text-left text-xs border border-stone-200 rounded-xl overflow-hidden">
              <thead className="bg-stone-100 text-stone-600 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3">Subject / Course</th>
                  <th className="p-3">Instructor</th>
                  <th className="p-3">Completion %</th>
                  <th className="p-3 text-right">Letter Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {enrolledList.map(course => {
                  const pct = getCourseProgress(course.id);
                  const grade = pct >= 90 ? 'A+' : pct >= 75 ? 'A' : pct >= 50 ? 'B+' : 'In Progress';
                  return (
                    <tr key={course.id} className="hover:bg-stone-50">
                      <td className="p-3 font-bold text-stone-900">
                        {course.title} <span className="text-[10px] text-stone-400 font-normal">({course.subject})</span>
                      </td>
                      <td className="p-3 text-stone-600">{course.instructor.name}</td>
                      <td className="p-3 font-mono font-bold text-amber-900">{pct}%</td>
                      <td className="p-3 text-right font-bold text-emerald-800">{grade}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Instructor Remarks */}
          <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200 text-xs space-y-1">
            <span className="font-bold text-amber-900 uppercase text-[10px]">Academic Advisor Remarks</span>
            <p className="text-stone-700 font-handwriting text-base leading-relaxed">
              "{user.name} demonstrates excellent comprehension in mathematics and computer science coursework. Recommended to maintain daily study habits."
            </p>
          </div>

          {/* Signature Line */}
          <div className="pt-8 border-t border-stone-300 grid grid-cols-2 gap-8 text-center text-xs font-serif">
            <div>
              <p className="font-bold text-stone-800 border-b border-stone-400 pb-1 mx-auto max-w-[180px]">
                Dr. Robert Chen
              </p>
              <p className="text-[10px] text-stone-500 font-sans mt-1 uppercase font-bold">Academic Dean</p>
            </div>
            <div>
              <p className="font-bold text-stone-800 border-b border-stone-400 pb-1 mx-auto max-w-[180px]">
                _____________________
              </p>
              <p className="text-[10px] text-stone-500 font-sans mt-1 uppercase font-bold">Parent / Guardian Signature</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
