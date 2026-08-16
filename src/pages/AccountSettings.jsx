import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Mail, Bell, ShieldCheck, Heart, Save, CheckCircle } from 'lucide-react';

export const AccountSettings = () => {
  const { user, parentAccount, setParentAccount } = useApp();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [parentEmail, setParentEmail] = useState(parentAccount.parentEmail);
  const [weeklyDigest, setWeeklyDigest] = useState(parentAccount.weeklyDigest);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setParentAccount(prev => ({
      ...prev,
      parentEmail,
      weeklyDigest,
      linked: true
    }));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 font-sans text-slate-800 space-y-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div>
          <h1 className="text-3xl font-display font-extrabold text-slate-900">Account Settings</h1>
          <p className="text-xs text-slate-500 mt-1">Manage profile information, parent/guardian accounts, and COPPA data privacy preferences.</p>
        </div>

        {savedSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" /> Account settings updated successfully!
          </div>
        )}

        <form onSubmit={handleSaveSettings} className="space-y-8">
          
          {/* Profile Section */}
          <div className="pro-card p-6 sm:p-8 rounded-3xl space-y-6">
            <h2 className="text-lg font-display font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <User className="w-5 h-5 text-indigo-600" /> Student Profile Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                />
              </div>
            </div>
          </div>

          {/* Parent & Guardian Linking (Crucial for K-12) */}
          <div className="pro-card p-6 sm:p-8 rounded-3xl space-y-6 border-2 border-indigo-100 bg-indigo-50/20">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <h2 className="text-lg font-display font-bold text-slate-900 flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-500" /> Parent & Guardian Account Linking (K-12)
              </h2>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded">
                COPPA Consented ✓
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Link a parent or legal guardian email address to send automatic weekly report card digests and progress notifications.
            </p>

            <div className="space-y-4 text-xs font-medium">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Parent / Guardian Email Address</label>
                <input
                  type="email"
                  value={parentEmail}
                  onChange={(e) => setParentEmail(e.target.value)}
                  placeholder="parent.name@family.com"
                  className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="weeklyDigest"
                  checked={weeklyDigest}
                  onChange={(e) => setWeeklyDigest(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded"
                />
                <label htmlFor="weeklyDigest" className="text-xs text-slate-700 font-bold cursor-pointer">
                  Send automated weekly progress & report card email to parent/guardian
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl shadow-md text-xs transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" /> Save Account Preferences
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
