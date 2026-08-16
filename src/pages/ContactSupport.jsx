import React, { useState } from 'react';
import { Mail, MessageSquare, Clock, CheckCircle } from 'lucide-react';

export const ContactSupport = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 font-sans text-slate-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-display font-extrabold text-slate-900">Academic & Technical Support</h1>
          <p className="text-xs text-slate-500">Our academic advisors and technical support team respond within 24 hours.</p>
        </div>

        {submitted ? (
          <div className="pro-card p-8 rounded-3xl text-center space-y-3">
            <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
            <h2 className="text-xl font-bold text-slate-900">Support Ticket Submitted!</h2>
            <p className="text-xs text-slate-600">Ticket #EDU-8921 has been opened. An advisor will contact your email shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="pro-card p-6 sm:p-8 rounded-3xl space-y-4 text-xs font-semibold">
            <div>
              <label className="block text-slate-700 mb-1">Your Name</label>
              <input type="text" required defaultValue="Alex Morgan" className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm" />
            </div>

            <div>
              <label className="block text-slate-700 mb-1">Email Address</label>
              <input type="email" required defaultValue="alex.morgan@school.edu" className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm" />
            </div>

            <div>
              <label className="block text-slate-700 mb-1">Subject Category</label>
              <select className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm">
                <option>Academic & Course Content Issue</option>
                <option>Parent Account / Report Card Inquiry</option>
                <option>Certificate Verification</option>
                <option>School District License Seats</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 mb-1">Message Detail</label>
              <textarea rows={4} required placeholder="Describe your question or issue in detail..." className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm" />
            </div>

            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-xs text-xs">
              Submit Support Ticket
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
