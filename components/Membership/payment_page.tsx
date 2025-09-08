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

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  occupation: string;
  age: string;
  gender: string;
  emergencyContact: string;
  emergencyPhone: string;
  paymentMethod: 'card' | 'upi' | 'paytm';
  upiId: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
}

const MembershipPayment: React.FC<MembershipPaymentProps> = ({ selectedPlan }) => {
  const [paymentMethod] = useState<'paytm'>('paytm');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    occupation: '',
    age: '',
    gender: '',
    emergencyContact: '',
    emergencyPhone: '',
    paymentMethod: 'paytm',
    upiId: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  // Default values if no plan is selected
  const planName = selectedPlan?.name || "Premium Member";
  const planPrice = selectedPlan?.price || "₹500";
  const planDuration = selectedPlan?.duration || "per year";

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = 'Phone number must be 10 digits';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Pincode must be 6 digits';
    if (!formData.age.trim()) newErrors.age = 'Age is required';
    if (!formData.gender.trim()) newErrors.gender = 'Gender is required';
    if (!formData.emergencyContact.trim()) newErrors.emergencyContact = 'Emergency contact is required';
    if (!formData.emergencyPhone.trim()) newErrors.emergencyPhone = 'Emergency phone is required';
    else if (!/^\d{10}$/.test(formData.emergencyPhone.replace(/\D/g, ''))) newErrors.emergencyPhone = 'Emergency phone must be 10 digits';

    // Paytm payment method - no additional validation needed

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form input changes
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Paytm Payment Integration
  const initiatePaytmPayment = async () => {
    try {
      setIsLoading(true);
      
      // Generate unique order ID
      const orderId = `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Prepare payment data
      const paymentData = {
        orderId: orderId,
        amount: planPrice.replace('₹', '').replace(',', ''),
        customerId: formData.email,
        customerName: `${formData.firstName} ${formData.lastName}`,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        planName: planName,
        planDuration: planDuration,
        memberData: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          occupation: formData.occupation,
          age: formData.age,
          gender: formData.gender,
          emergencyContact: formData.emergencyContact,
          emergencyPhone: formData.emergencyPhone
        }
      };

      // For demo purposes, we'll simulate Paytm integration
      // In production, you would make API calls to your backend which handles Paytm
      console.log('Payment Data:', paymentData);
      
      // Simulate API call to backend
      const response = await fetch('/api/membership/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      if (response.ok) {
        const result = await response.json();
        // Redirect to Paytm payment page
        if (result.paymentUrl) {
          window.location.href = result.paymentUrl;
        } else {
          alert('Payment initiated successfully! Check your email for confirmation.');
        }
      } else {
        throw new Error('Payment initiation failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    await initiatePaytmPayment();
  };

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

        {/* Right Section - Membership Form */}
        <div className="p-8 lg:p-12">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Complete Your Membership Registration</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="First Name *"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.firstName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Last Name *"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.lastName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Phone Number *"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <select
                      value={formData.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.gender ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select Gender *</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="Age *"
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.age ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <input
                      type="text"
                      placeholder="Occupation"
                      value={formData.occupation}
                      onChange={(e) => handleInputChange('occupation', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Address Information</h3>
                <div className="space-y-4">
                  <div>
                    <textarea
                      placeholder="Full Address *"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      rows={3}
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.address ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="City *"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.city ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="State *"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.state ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Pincode *"
                        value={formData.pincode}
                        onChange={(e) => handleInputChange('pincode', e.target.value)}
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.pincode ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Emergency Contact Name *"
                      value={formData.emergencyContact}
                      onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.emergencyContact ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.emergencyContact && <p className="text-red-500 text-sm mt-1">{errors.emergencyContact}</p>}
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Emergency Contact Phone *"
                      value={formData.emergencyPhone}
                      onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.emergencyPhone ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.emergencyPhone && <p className="text-red-500 text-sm mt-1">{errors.emergencyPhone}</p>}
                  </div>
                </div>
              </div>

               {/* Payment Method - Paytm Only */}
               <div className="bg-gray-50 rounded-xl p-6">
                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
                 <div className="flex justify-center">
                   <div className="bg-blue-50 border-2 border-blue-500 rounded-xl p-6 w-full max-w-sm">
                     <div className="flex flex-col items-center space-y-3">
                       <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                         <span className="text-white font-bold text-lg">P</span>
                       </div>
                       <div className="text-center">
                         <h4 className="font-semibold text-blue-700 text-lg">Paytm Payment</h4>
                         <p className="text-sm text-blue-600 mt-1">Secure & Fast Payment</p>
                       </div>
                     </div>
                   </div>
                 </div>
                 
                 <div className="mt-4">
                   <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                     <div className="flex items-center space-x-2">
                       <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                         <span className="text-white font-bold text-xs">✓</span>
                       </div>
                       <div>
                         <p className="text-sm text-green-700 font-medium">
                           Paytm Payment Gateway Selected
                         </p>
                         <p className="text-xs text-green-600 mt-1">
                           You will be redirected to Paytm's secure payment page after form submission
                         </p>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing Payment...</span>
                  </div>
                ) : (
                  `Pay ${planPrice} & Complete Registration`
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                By completing this payment, you agree to our terms of service and privacy policy.
                Your payment is secured by Paytm's industry-standard encryption.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipPayment;
