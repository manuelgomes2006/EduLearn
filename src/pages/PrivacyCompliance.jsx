import React from 'react';
import { ShieldCheck, Lock, CheckCircle } from 'lucide-react';

export const PrivacyCompliance = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-12 font-sans text-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="border-b border-slate-200 pb-6 space-y-2">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> COPPA & FERPA K-12 Compliant
          </div>
          <h1 className="text-3xl font-display font-extrabold text-slate-900">Privacy Policy & Student Data Protection</h1>
          <p className="text-xs text-slate-500">Effective Date: Fall 2026 Academic Term</p>
        </div>

        <div className="pro-card p-6 sm:p-8 rounded-3xl space-y-6 text-xs text-slate-600 leading-relaxed">
          <h2 className="text-base font-bold text-slate-900">1. Commitment to Student Privacy (COPPA & FERPA)</h2>
          <p>
            EduLearn is strictly designed to protect student privacy in accordance with the <strong>Children's Online Privacy Protection Act (COPPA)</strong> and the <strong>Family Educational Rights and Privacy Act (FERPA)</strong>. We do not sell student data, track students across third-party sites, or display targeted advertising.
          </p>

          <h2 className="text-base font-bold text-slate-900">2. Parental Consent & Control</h2>
          <p>
            For students under the age of 13, parental or school district consent is required prior to enrollment. Parents have full access to inspect, review, or request deletion of their child's educational records at any time.
          </p>

          <h2 className="text-base font-bold text-slate-900">3. Encryption & Data Security</h2>
          <p>
            All academic progress records, quiz scores, and personally identifiable information (PII) are encrypted at rest and in transit using 256-bit SSL protocol.
          </p>
        </div>

      </div>
    </div>
  );
};
