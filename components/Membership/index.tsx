"use client";
import React, { useState } from "react";
import SectionHeader from "@/components/Common/SectionHeader";

const Membership = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const [formData, setFormData] = useState({
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
    emergencyPhone: ''
  });

  const membershipPlan = {
      id: 1,
    name: "Agarwal Samaj Member",
    price: "₹500",
    duration: "per year",
      features: [
        "Access to community events",
        "Basic profile listing",
        "Newsletter subscription",
      "Community directory access",
        "Priority event registration",
        "Business networking access",
        "Matrimony profile boost",
        "Exclusive workshops",
        "Community support"
      ],
    buttonText: "Join Now",
      buttonColor: "bg-blue-600 hover:bg-blue-700"
  };

  const benefits = [
    {
      icon: "🤝",
      title: "Community Support",
      description: "Connect with fellow Agarwal community members for support and guidance."
    },
    {
      icon: "📚",
      title: "Educational Programs",
      description: "Access to workshops, seminars, and educational resources for personal growth."
    },
    {
      icon: "💼",
      title: "Business Networking",
      description: "Expand your professional network and discover business opportunities."
    },
    {
      icon: "❤️",
      title: "Matrimony Services",
      description: "Find your life partner within the trusted Agarwal Samaj community."
    },
    {
      icon: "🎉",
      title: "Cultural Events",
      description: "Participate in traditional festivals, celebrations, and cultural programs."
    },
    {
      icon: "🏥",
      title: "Health & Wellness",
      description: "Access to health camps, wellness programs, and medical assistance."
    }
  ];

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};
    
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
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
        amount: membershipPlan.price.replace('₹', '').replace(',', ''),
        customerId: formData.email,
        customerName: `${formData.firstName} ${formData.lastName}`,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        planName: membershipPlan.name,
        planDuration: membershipPlan.duration,
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

  // Scroll to registration form
  const scrollToRegistrationForm = () => {
    const formSection = document.getElementById('registration-form');
    if (formSection) {
      // Add a small delay to ensure smooth animation
      setTimeout(() => {
        formSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  };


  return (
    <>
      <section id="membership" className="px-4 md:px-8 2xl:px-0">
        <div className="relative mx-auto max-w-c-1390 px-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
          <SectionHeader
            headerInfo={{
              title: "Join Our Community",
              subtitle: "Agarwal Samaj Membership",
              description: "Become a part of the vibrant Agarwal Samaj community. Choose the membership plan that best suits your needs and start connecting with fellow community members.",
            }}
          />

          {/* Benefits Section */}
          <div className="mt-16">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
              Why Join Agarwal Samaj?
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg"
                >
                  <div className="mb-4 text-4xl">{benefit.icon}</div>
                  <h3 className="mb-3 text-xl font-semibold text-gray-900">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        
          {/* Become a Member Section */}
          <div className="mt-20">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
              Become a Member
            </h2>
            
            {/* Membership Box with Two Divs */}
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
                  
                  {/* Left Div - Membership Details */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 lg:p-12 flex flex-col justify-center">
                    <div className="text-center lg:text-left">
                      <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                        Agarwal Samaj Member
                      </h3>
                      
                      <div className="mb-8">
                        <div className="flex items-center justify-center lg:justify-start space-x-2 mb-2">
                          <span className="text-5xl font-bold text-blue-600">
                            ₹500
                          </span>
                          <span className="text-xl text-gray-600">
                            per year
                          </span>
                        </div>
                        <div className="text-sm text-gray-500 line-through">
                          Original Price: ₹1000
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-gray-700 font-medium">Access to community events</span>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-gray-700 font-medium">Basic profile listing</span>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-gray-700 font-medium">Newsletter subscription</span>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-gray-700 font-medium">Community directory access</span>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-gray-700 font-medium">Priority event registration</span>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-gray-700 font-medium">Business networking access</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Div - Join Us Animation */}
                  <div className="bg-gradient-to-br from-orange-50 to-red-100 p-8 lg:p-12 flex flex-col justify-center items-center relative overflow-hidden">
                    {/* Background Animation Elements */}
                    <div className="absolute top-10 left-10 w-20 h-20 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
                    <div className="absolute top-20 right-16 w-16 h-16 bg-red-200 rounded-full opacity-30 animate-bounce"></div>
                    <div className="absolute bottom-20 left-16 w-12 h-12 bg-yellow-200 rounded-full opacity-25 animate-ping"></div>
                    <div className="absolute bottom-10 right-10 w-24 h-24 bg-orange-300 rounded-full opacity-20 animate-pulse"></div>
                    
                    {/* Main Content */}
                    <div className="text-center z-10">
                      <div className="mb-8">
                        <div className="w-32 h-32 mx-auto mb-6 relative">
                          {/* Animated Circle */}
                          <div className="w-full h-full border-4 border-orange-400 rounded-full animate-spin-slow"></div>
                          <div className="absolute inset-4 border-4 border-red-400 rounded-full animate-spin-reverse"></div>
                          <div className="absolute inset-8 border-4 border-yellow-400 rounded-full animate-pulse"></div>
                          
                          {/* Center Icon */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-2xl font-bold">J</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                        Join Us Today!
                      </h3>
                      
                      <p className="text-lg text-gray-600 mb-8 max-w-md">
                        Be part of our growing community and unlock amazing benefits
                      </p>
                      
                      <div className="space-y-4 mb-8">
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-gray-700">1000+ Active Members</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                          <span className="text-gray-700">50+ Events This Year</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                          <span className="text-gray-700">24/7 Community Support</span>
                        </div>
                      </div>
                      
                      <button 
                        onClick={scrollToRegistrationForm}
                        className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg animate-bounce"
                      >
                        Get Started Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Membership Registration Form */}
          <div id="registration-form" className="mt-20">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
              Complete Your Membership Registration
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div className="bg-gray-50 rounded-xl p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <input
                        type="text"
                        placeholder="First Name *"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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
                        className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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
                        className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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
                        className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <select
                        value={formData.gender}
                        onChange={(e) => handleInputChange('gender', e.target.value)}
                        className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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
                        className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div className="bg-gray-50 rounded-xl p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Address Information</h3>
                  <div className="space-y-6">
                    <div>
                      <textarea
                        placeholder="Full Address *"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        rows={3}
                        className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.address ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <input
                          type="text"
                          placeholder="City *"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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
                          className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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
                          className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.pincode ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="bg-gray-50 rounded-xl p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Emergency Contact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <input
                        type="text"
                        placeholder="Emergency Contact Name *"
                        value={formData.emergencyContact}
                        onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                        className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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
                        className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.emergencyPhone ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.emergencyPhone && <p className="text-red-500 text-sm mt-1">{errors.emergencyPhone}</p>}
                    </div>
                  </div>
                </div>


                {/* Submit Button */}
                <div className="text-center">
                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-12 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing Registration...</span>
                      </div>
                    ) : (
                      `Complete Registration & Pay ${membershipPlan.price}`
                    )}
                  </button>
                  
                  <p className="text-xs text-gray-500 mt-4">
                    By completing this registration, you agree to our terms of service and privacy policy.
                    Payment will be processed securely through Paytm.
                  </p>
                </div>
              </form>
            </div>
          </div>

        
        </div>
      </section>
    </>
  );
};

export default Membership;
