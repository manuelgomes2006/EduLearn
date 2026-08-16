import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const CheckoutPage = () => {
  const { selectedCourseId, courses, enrollInCourse, navigateTo } = useApp();
  const course = courses.find(c => c.id === selectedCourseId) || courses[0];

  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const [cardDetails, setCardDetails] = useState({
    name: 'Alex Morgan',
    number: '•••• •••• •••• 4242',
    expiry: '12/28',
    cvv: '123'
  });

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'LEARN20') {
      setDiscountAmount(10);
      setCouponApplied(true);
    } else {
      alert('Try coupon code: LEARN20 for $10 off!');
    }
  };

  const finalPrice = Math.max(0, course.price - discountAmount);

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    enrollInCourse(course.id);
    navigateTo('classroom', course.id);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 font-sans text-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Checkout & Enrollment</h1>
          <p className="text-xs text-gray-500">Complete your payment to unlock instant lifetime access.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Payment Form (7 cols) */}
          <div className="md:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
            
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <i className="fas fa-credit-card text-primary"></i> Payment Method
            </h2>

            {/* Payment Options */}
            <div className="grid grid-cols-3 gap-3 text-xs font-bold">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${paymentMethod === 'card' ? 'border-primary bg-indigo-50 text-primary' : 'border-gray-200 text-gray-600'}`}
              >
                💳 Credit Card
              </button>
              <button
                onClick={() => setPaymentMethod('paypal')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${paymentMethod === 'paypal' ? 'border-primary bg-indigo-50 text-primary' : 'border-gray-200 text-gray-600'}`}
              >
                🅿️ PayPal
              </button>
              <button
                onClick={() => setPaymentMethod('apple')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${paymentMethod === 'apple' ? 'border-primary bg-indigo-50 text-primary' : 'border-gray-200 text-gray-600'}`}
              >
                🍎 Apple Pay
              </button>
            </div>

            <form onSubmit={handlePaymentSubmit} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block text-gray-700 font-bold mb-1">Cardholder Name</label>
                <input
                  type="text"
                  required
                  value={cardDetails.name}
                  onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Card Number</label>
                <input
                  type="text"
                  required
                  value={cardDetails.number}
                  onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Expiration Date</label>
                  <input
                    type="text"
                    required
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-1">CVV Code</label>
                  <input
                    type="text"
                    required
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="pt-2 text-gray-500 text-[11px] flex items-center gap-1.5">
                <i className="fas fa-lock text-secondary"></i>
                256-bit SSL Encrypted Payment Processing
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-md text-sm transition-colors flex items-center justify-center gap-2 mt-4"
              >
                Pay ${finalPrice.toFixed(2)} & Start Learning <i className="fas fa-arrow-right"></i>
              </button>
            </form>

          </div>

          {/* Right Order Summary (5 cols) */}
          <div className="md:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>

            <div className="flex gap-3 items-center pb-4 border-b border-gray-100">
              <img src={course.thumbnail} alt={course.title} className="w-16 h-16 rounded-xl object-cover" />
              <div>
                <h3 className="font-bold text-xs text-gray-900 line-clamp-2">{course.title}</h3>
                <p className="text-[11px] text-primary font-semibold mt-0.5">{course.category}</p>
              </div>
            </div>

            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Coupon (e.g. LEARN20)"
                  className="w-full pl-8 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs uppercase"
                />
                <i className="fas fa-tag text-gray-400 absolute left-2.5 top-2.5"></i>
              </div>
              <button type="submit" className="bg-dark hover:bg-gray-800 text-white px-3 py-2 rounded-xl text-xs font-bold transition-colors">
                Apply
              </button>
            </form>

            {couponApplied && (
              <p className="text-xs text-secondary font-bold">✓ Coupon 'LEARN20' applied! ($10 off)</p>
            )}

            <div className="space-y-2 text-xs border-t border-gray-100 pt-4 text-gray-600">
              <div className="flex justify-between">
                <span>Original Price</span>
                <span className="font-bold">${course.price}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-secondary font-bold">
                  <span>Discount</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-extrabold text-gray-900 border-t border-gray-200 pt-3">
                <span>Total Due</span>
                <span className="text-primary">${finalPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-2xl p-4 flex items-center gap-3 text-green-900 text-xs">
              <i className="fas fa-shield-alt text-secondary text-xl shrink-0"></i>
              <p>30-Day Money Back Guarantee. Instant digital certificate upon course completion.</p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
