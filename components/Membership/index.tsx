"use client";
import React, { useState } from "react";
import SectionHeader from "@/components/Common/SectionHeader";
import MembershipForm from "./MembershipForm";

const Membership = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

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
                        onClick={() => setIsFormOpen(true)}
                        className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg animate-bounce"
                      >
                        Register for Membership
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


        
        </div>
      </section>
      
      {/* Membership Form Modal */}
      <MembershipForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
      />
    </>
  );
};

export default Membership;
