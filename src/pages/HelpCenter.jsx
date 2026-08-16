import React, { useState } from 'react';
import { Search, HelpCircle, BookOpen, ShieldCheck, CreditCard, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HelpCenter = () => {
  const [search, setSearch] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    { id: 1, q: "How do I print or share my certificate to LinkedIn?", a: "Go to your Student Dashboard. Once a course reaches 100% completion, click 'View Verified Certificate'. You can print it to PDF or click 'Add to LinkedIn'." },
    { id: 2, q: "How do parent & guardian report card emails work?", a: "Under Account Settings, link your parent or guardian's email. They will automatically receive a weekly progress summary and letter grades." },
    { id: 3, q: "Is EduLearn COPPA and FERPA compliant for K-12 students?", a: "Yes. EduLearn enforces strict student data privacy, zero third-party tracking, and parental consent controls in accordance with federal K-12 guidelines." }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12 font-sans text-slate-800 space-y-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h1 className="text-4xl font-display font-extrabold text-slate-900">How can we help you today?</h1>
          
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search help articles, certificates, parent reports..."
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-300 rounded-2xl shadow-sm text-sm focus:outline-none focus:border-indigo-600"
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-4" />
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="pro-card p-6 rounded-2xl text-center space-y-3">
            <BookOpen className="w-8 h-8 text-indigo-600 mx-auto" />
            <h3 className="font-bold text-base text-slate-900">Getting Started</h3>
            <p className="text-xs text-slate-500">Course enrollment, lesson player, and video playback.</p>
          </div>

          <div className="pro-card p-6 rounded-2xl text-center space-y-3">
            <ShieldCheck className="w-8 h-8 text-emerald-600 mx-auto" />
            <h3 className="font-bold text-base text-slate-900">Certificates & Badges</h3>
            <p className="text-xs text-slate-500">Verified QR codes and LinkedIn credentials sharing.</p>
          </div>

          <div className="pro-card p-6 rounded-2xl text-center space-y-3">
            <CreditCard className="w-8 h-8 text-purple-600 mx-auto" />
            <h3 className="font-bold text-base text-slate-900">Billing & School Seats</h3>
            <p className="text-xs text-slate-500">Invoices, subscription plans, and district license seats.</p>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="pro-card p-6 sm:p-8 rounded-3xl space-y-6">
          <h2 className="text-2xl font-display font-bold text-slate-900">Frequently Asked Questions</h2>

          <div className="divide-y divide-slate-100">
            {faqs.map(faq => (
              <div key={faq.id} className="py-4">
                <button
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  className="w-full flex justify-between items-center text-left font-bold text-slate-900 text-sm hover:text-indigo-600 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === faq.id ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === faq.id && (
                  <p className="text-xs text-slate-600 pt-2 leading-relaxed">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center text-xs text-slate-500">
          Still need assistance? <Link to="/contact" className="font-bold text-indigo-600 hover:underline">Contact Academic Support</Link>
        </div>

      </div>
    </div>
  );
};
