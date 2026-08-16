import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Award, Printer, X, ShieldCheck, Linkedin, QrCode, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CertificateModal = ({ course, onClose }) => {
  useEffect(() => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Fallback
    }
  }, []);

  const { user } = useApp();
  if (!course) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleShareLinkedin = () => {
    alert(`Certificate for "${course.title}" added to your LinkedIn Credentials Profile!`);
  };

  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto font-sans">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full border border-slate-200 overflow-hidden relative my-8 animate-in zoom-in-95">
        
        {/* Top Control Header */}
        <div className="bg-slate-900 px-6 py-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-xs sm:text-sm">Verified EduLearn Academic Certificate</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleShareLinkedin}
              className="bg-[#0A66C2] hover:bg-[#004182] text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Linkedin className="w-4 h-4 fill-white" /> Add to LinkedIn
            </button>

            <button
              onClick={handlePrint}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Printer className="w-4 h-4" /> Print / PDF
            </button>

            <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Area */}
        <div id="certificate-print-area" className="p-8 sm:p-12 bg-slate-50 relative">
          <div className="border-8 border-double border-indigo-950 p-6 sm:p-10 relative bg-white shadow-inner">
            
            {/* Watermark Logo */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <Award className="w-96 h-96 text-indigo-950" />
            </div>

            {/* Certificate Header */}
            <div className="text-center space-y-2 mb-8">
              <div className="inline-flex items-center justify-center gap-2 text-indigo-950 font-black text-2xl tracking-widest uppercase">
                <ShieldCheck className="w-7 h-7 text-amber-500" /> EduLearn Global Academy
              </div>
              <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 uppercase tracking-wider">
                Certificate of Academic Excellence
              </h1>
              <p className="text-xs text-slate-500 font-mono tracking-widest uppercase">
                Verification Hash: EDULEARN-CERT-{(course.id + user.name).toUpperCase().slice(0, 14)}
              </p>
            </div>

            {/* Recipient Line */}
            <div className="text-center space-y-3 my-8">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">This certifies that</p>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-indigo-950 border-b-2 border-amber-400 inline-block px-8 py-1">
                {user.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto pt-3 leading-relaxed">
                has successfully completed all required modules, examinations, and laboratory requirements for:
              </p>
            </div>

            {/* Course Title */}
            <div className="text-center my-6">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                "{course.title}"
              </h3>
              <p className="text-xs font-bold text-indigo-600 mt-1">
                Subject: {course.subject} • Level: {course.level || 'Intermediate'}
              </p>
            </div>

            {/* Footer Signatures & QR Code */}
            <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-3 gap-4 items-end text-center">
              <div>
                <p className="font-serif italic text-base text-slate-800 border-b border-slate-400 pb-1 mx-auto max-w-[150px]">
                  {course.instructor?.name || "Dr. Robert Chen"}
                </p>
                <p className="text-[10px] font-bold uppercase text-slate-500 mt-1">Lead Academic Director</p>
              </div>

              {/* QR Verification Mockup */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 bg-slate-900 text-white rounded-lg flex items-center justify-center p-2 shadow-xs">
                  <QrCode className="w-10 h-10" />
                </div>
                <span className="text-[9px] font-mono text-slate-500 mt-1">Scan to Verify</span>
              </div>

              <div>
                <p className="font-serif font-bold text-sm text-slate-800 border-b border-slate-400 pb-1 mx-auto max-w-[150px]">
                  {today}
                </p>
                <p className="text-[10px] font-bold uppercase text-slate-500 mt-1">Date of Certification</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
