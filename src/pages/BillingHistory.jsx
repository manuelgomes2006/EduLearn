import React from 'react';
import { CreditCard, Download, CheckCircle, ShieldCheck } from 'lucide-react';

export const BillingHistory = () => {
  const invoices = [
    { id: "INV-2026-001", date: "Aug 01, 2026", item: "Pro Student Annual Subscription", amount: "$190.00", status: "Paid" },
    { id: "INV-2026-002", date: "Jul 15, 2026", item: "Advanced Algebra & Functions Course", amount: "$49.99", status: "Paid" }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10 font-sans text-slate-800 space-y-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div>
          <h1 className="text-3xl font-display font-extrabold text-slate-900">Subscriptions & Billing History</h1>
          <p className="text-xs text-slate-500 mt-1">Manage active plans, payment methods, and download official PDF tax invoices.</p>
        </div>

        {/* Subscription Plan Picker */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="pro-card p-6 rounded-2xl border border-slate-200 space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Basic Tier</span>
            <h3 className="font-display font-bold text-xl text-slate-900">Free Student</h3>
            <div className="text-3xl font-extrabold text-slate-900">$0 <span className="text-xs font-normal text-slate-500">/ forever</span></div>
            <ul className="text-xs space-y-2 text-slate-600">
              <li>✓ Access to 10+ free courses</li>
              <li>✓ Basic quiz access</li>
            </ul>
          </div>

          <div className="pro-card p-6 rounded-2xl border-2 border-indigo-600 bg-indigo-50/30 space-y-4 relative">
            <span className="bg-indigo-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase absolute -top-3 right-4">Active Plan</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">Most Popular</span>
            <h3 className="font-display font-bold text-xl text-slate-900">Pro Student Pass</h3>
            <div className="text-3xl font-extrabold text-indigo-600">$19 <span className="text-xs font-normal text-slate-500">/ month</span></div>
            <ul className="text-xs space-y-2 text-slate-600">
              <li>✓ Unlimited course catalog access</li>
              <li>✓ Verified LinkedIn Certificates</li>
              <li>✓ Live Faculty Office Hours</li>
            </ul>
          </div>

          <div className="pro-card p-6 rounded-2xl border border-slate-200 space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Family Pass</span>
            <h3 className="font-display font-bold text-xl text-slate-900">Guardian Family</h3>
            <div className="text-3xl font-extrabold text-slate-900">$39 <span className="text-xs font-normal text-slate-500">/ month</span></div>
            <ul className="text-xs space-y-2 text-slate-600">
              <li>✓ Up to 4 student profiles</li>
              <li>✓ Automated Parent Weekly Email Digest</li>
            </ul>
          </div>
        </div>

        {/* Invoice History Table */}
        <div className="pro-card rounded-2xl border border-slate-200 overflow-hidden space-y-4">
          <div className="p-6 border-b border-slate-100 font-display font-bold text-base text-slate-900">
            Payment & Invoice Receipts History
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold uppercase">
                <tr>
                  <th className="p-4">Invoice ID</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4 text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {invoices.map(inv => (
                  <tr key={inv.id} className="hover:bg-slate-50">
                    <td className="p-4 font-mono font-bold text-slate-900">{inv.id}</td>
                    <td className="p-4 text-slate-500">{inv.date}</td>
                    <td className="p-4 font-semibold text-slate-800">{inv.item}</td>
                    <td className="p-4 font-bold text-indigo-600">{inv.amount}</td>
                    <td className="p-4 text-right">
                      <button className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1 justify-end ml-auto">
                        <Download className="w-3.5 h-3.5" /> PDF Receipt
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
