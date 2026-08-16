import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CreditCard, ShieldCheck, Lock, CheckCircle, ArrowRight, Tag } from 'lucide-react';

export const Checkout = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { courses, enrollInCourse } = useApp();

  const course = courses.find(c => c.id === courseId) || courses[0];

  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const basePrice = course.price || 49.99;
  const finalPrice = discountApplied ? (basePrice * 0.8).toFixed(2) : basePrice.toFixed(2);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'LEARN20') {
      setDiscountApplied(true);
    } else {
      alert('Invalid coupon code. Try code "LEARN20" for 20% off!');
    }
  };

  const handleCompletePayment = (e) => {
    e.preventDefault();
    enrollInCourse(course.id);
    setPaymentSuccess(true);
    setTimeout(() => {
      navigate(`/player/${course.id}`);
    }, 1500);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 font-sans text-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
            <Lock className="w-3.5 h-3.5" /> 256-Bit Encrypted Secure Checkout
          </div>
          <h1 className="text-3xl font-display font-extrabold text-slate-900">Complete Course Purchase</h1>
        </div>

        {paymentSuccess ? (
          <div className="pro-card p-10 rounded-3xl text-center space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-display font-bold text-slate-900">Payment Successful!</h2>
            <p className="text-xs text-slate-600">You are now officially enrolled in <strong>"{course.title}"</strong>. Redirecting to classroom...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Payment Form */}
            <div className="md:col-span-7 pro-card p-6 sm:p-8 rounded-3xl space-y-6">
              <h2 className="text-lg font-display font-bold text-slate-900 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-indigo-600" /> Payment Information
              </h2>

              <form onSubmit={handleCompletePayment} className="space-y-4 text-xs font-medium">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Cardholder Full Name</label>
                  <input type="text" required defaultValue="Alex Morgan" className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm" />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Card Number</label>
                  <input type="text" required placeholder="4532 •••• •••• 8892" defaultValue="4532 8921 4402 8892" className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Expiry Date</label>
                    <input type="text" required defaultValue="08 / 28" className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono" />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">CVC Code</label>
                    <input type="text" required defaultValue="392" className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-md text-sm transition-colors flex items-center justify-center gap-2 mt-4"
                >
                  Pay ${finalPrice} & Access Course <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Order Summary Sidebar */}
            <div className="md:col-span-5 pro-card p-6 rounded-3xl space-y-6">
              <h2 className="text-lg font-display font-bold text-slate-900 border-b border-slate-100 pb-3">Order Summary</h2>

              <div className="flex gap-4 items-center">
                <img src={course.thumbnail} alt={course.title} className="w-16 h-16 rounded-xl object-cover" />
                <div>
                  <h3 className="font-bold text-sm text-slate-900 line-clamp-1">{course.title}</h3>
                  <p className="text-xs text-indigo-600">{course.subject} • {course.gradeLevel}</p>
                </div>
              </div>

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo Code (LEARN20)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs uppercase"
                />
                <button type="submit" className="bg-slate-900 text-white px-3.5 py-2.5 rounded-xl text-xs font-bold">
                  Apply
                </button>
              </form>

              {discountApplied && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-1.5 font-semibold">
                  <Tag className="w-4 h-4 text-emerald-600" /> 20% Promo Discount Applied!
                </div>
              )}

              <div className="space-y-2 border-t border-slate-100 pt-4 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Course Original Price</span>
                  <span>${basePrice.toFixed(2)}</span>
                </div>
                {discountApplied && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount (20% Off)</span>
                    <span>-${(basePrice * 0.2).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-slate-900 text-base border-t border-slate-200 pt-2">
                  <span>Total Amount</span>
                  <span className="text-indigo-600">${finalPrice}</span>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
