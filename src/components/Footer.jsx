import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ShieldCheck, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-bold text-lg">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white font-display">
                Edu<span className="text-indigo-400">Learn</span>
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed">
              Empowering students and school districts worldwide with accredited online coursework and digital credentials.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
              <ShieldCheck className="w-4 h-4" /> COPPA & FERPA K-12 Compliant
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-white text-[11px]">Academic Programs</h4>
            <ul className="space-y-2">
              <li><Link to="/catalog?subject=Mathematics" className="hover:text-white transition-colors">Mathematics Pathway</Link></li>
              <li><Link to="/catalog?subject=Science" className="hover:text-white transition-colors">Science & Labs</Link></li>
              <li><Link to="/catalog?subject=Computer%20Science" className="hover:text-white transition-colors">Computer Science & Python</Link></li>
              <li><Link to="/catalog?subject=English" className="hover:text-white transition-colors">Literature & Writing</Link></li>
            </ul>
          </div>

          {/* Portals */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-white text-[11px]">Portals & Portfolios</h4>
            <ul className="space-y-2">
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Student Dashboard</Link></li>
              <li><Link to="/instructor" className="hover:text-white transition-colors">Instructor / Faculty Portal</Link></li>
              <li><Link to="/admin" className="hover:text-white transition-colors">School District B2B Portal</Link></li>
              <li><Link to="/billing" className="hover:text-white transition-colors">Subscription & Billing</Link></li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-white text-[11px]">Support & Compliance</h4>
            <ul className="space-y-2">
              <li><Link to="/help" className="hover:text-white transition-colors">Help Center & FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Support Ticket</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy & COPPA Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-500">
          <p>© 2026 EduLearn Academy Inc. All rights reserved.</p>
          <p className="flex items-center gap-1">Designed for K-12 & Higher Ed Excellence</p>
        </div>

      </div>
    </footer>
  );
};
