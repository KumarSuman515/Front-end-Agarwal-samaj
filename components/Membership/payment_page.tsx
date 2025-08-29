"use client";
import React, { useState } from "react";

interface Plan {
  id: number;
  name: string;
  price: string;
  duration: string;
}

interface MembershipPaymentProps {
  selectedPlan: Plan | null;
}

const MembershipPayment: React.FC<MembershipPaymentProps> = ({ selectedPlan }) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi'>('card');
  const [upiId, setUpiId] = useState('');

  // Default values if no plan is selected
  const planName = selectedPlan?.name || "Premium Member";
  const planPrice = selectedPlan?.price || "₹499.00";
  const planDuration = selectedPlan?.duration || "per month";

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-6">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        
        {/* Left Section - Order Summary */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8 lg:p-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Order Summary</h1>
            <p className="text-blue-100">Complete your membership registration</p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4">{planName}</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Plan Duration</span>
                  <span className="font-medium">{planDuration}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Membership Fee</span>
                  <span className="font-medium">{planPrice}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Processing Fee</span>
                  <span className="font-medium">₹0.00</span>
                </div>
                <hr className="border-blue-400/30" />
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total Amount</span>
                  <span>{planPrice}</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <h4 className="font-semibold mb-3">What's Included:</h4>
              <ul className="space-y-2 text-sm text-blue-100">
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Community access & networking
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Exclusive events & workshops
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Priority support & assistance
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Section - Payment Form */}
        <div className="p-8 lg:p-12">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Complete Your Payment</h2>
            
            {/* Contact Information */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
               
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 border-2 rounded-xl transition-all ${
                    paymentMethod === 'card'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <span className="font-medium">Credit/Debit Card</span>
                  </div>
                </button>
                
                <button
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 border-2 rounded-xl transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium">UPI</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Payment Details */}
            {paymentMethod === 'card' && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Card Details</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Card Number"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'upi' && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">UPI Details</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="UPI ID (e.g., name@upi)"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <p className="text-sm text-blue-700">
                      💡 Popular UPI apps: Google Pay, PhonePe, Paytm, BHIM
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Billing Address */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Address</h3>
              <div className="space-y-4">
              <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <input
                  type="text"
                  placeholder="Street Address"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
               
                
              </div>
            </div>

            {/* Submit Button */}
            <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Pay {planPrice} & Complete Registration
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              By completing this payment, you agree to our terms of service and privacy policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipPayment;
