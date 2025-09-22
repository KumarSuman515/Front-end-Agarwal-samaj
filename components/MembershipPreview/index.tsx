"use client";
import React, { useState } from "react";
import Link from "next/link";
import SectionHeader from "@/components/Common/SectionHeader";
import MembershipForm from "@/components/Membership/MembershipForm";

const MembershipPreview = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <section id="membership-preview" className="py-20 lg:py-25 xl:py-30">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <SectionHeader
            headerInfo={{
              title: "Join Our Community",
              subtitle: "Agarwal Samaj Membership",
              description: "Become a part of the vibrant Agarwal Samaj community and unlock amazing benefits.",
            }}
          />

          {/* Membership Preview Card */}
          <div className="mt-15 xl:mt-20">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
                  
                  {/* Left Div - Membership Details */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 lg:p-10 flex flex-col justify-center">
                    <div className="text-center lg:text-left">
                      <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                        Agarwal Samaj Member
                      </h3>
                      
                      <div className="mb-6">
                        <div className="flex items-center justify-center lg:justify-start space-x-2 mb-2">
                          <span className="text-4xl font-bold text-blue-600">
                            ₹500
                          </span>
                          <span className="text-lg text-gray-600">
                            per year
                          </span>
                        </div>
                        <div className="text-sm text-gray-500 line-through">
                          Original Price: ₹1000
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-gray-700 text-sm">Access to community events</span>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-gray-700 text-sm">Basic profile listing</span>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-gray-700 text-sm">Newsletter subscription</span>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-gray-700 text-sm">Community directory access</span>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-gray-700 text-sm">Priority event registration</span>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-gray-700 text-sm">Business networking access</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Div - Join Us Animation */}
                  <div className="bg-gradient-to-br from-orange-50 to-red-100 p-8 lg:p-10 flex flex-col justify-center items-center relative overflow-hidden">
                    {/* Background Animation Elements */}
                    <div className="absolute top-8 left-8 w-16 h-16 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
                    <div className="absolute top-16 right-12 w-12 h-12 bg-red-200 rounded-full opacity-30 animate-bounce"></div>
                    <div className="absolute bottom-16 left-12 w-10 h-10 bg-yellow-200 rounded-full opacity-25 animate-ping"></div>
                    <div className="absolute bottom-8 right-8 w-20 h-20 bg-orange-300 rounded-full opacity-20 animate-pulse"></div>
                    
                    {/* Main Content */}
                    <div className="text-center z-10">
                      <div className="mb-6">
                        <div className="w-24 h-24 mx-auto mb-4 relative">
                          {/* Animated Circle */}
                          <div className="w-full h-full border-4 border-orange-400 rounded-full animate-spin-slow"></div>
                          <div className="absolute inset-3 border-4 border-red-400 rounded-full animate-spin-reverse"></div>
                          <div className="absolute inset-6 border-4 border-yellow-400 rounded-full animate-pulse"></div>
                          
                          {/* Center Icon */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xl font-bold">J</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                        Join Us Today!
                      </h3>
                      
                      <p className="text-base text-gray-600 mb-6 max-w-sm">
                        Be part of our growing community and unlock amazing benefits
                      </p>
                      
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-gray-700 text-sm">1000+ Active Members</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                          <span className="text-gray-700 text-sm">50+ Events This Year</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                          <span className="text-gray-700 text-sm">24/7 Community Support</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <button 
                          onClick={() => setIsFormOpen(true)}
                          className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-bold text-base hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                          Register for Membership
                        </button>
                        
                        <Link 
                          href="/membership"
                          className="block w-full bg-white text-orange-600 border-2 border-orange-500 px-6 py-3 rounded-xl font-bold text-base hover:bg-orange-50 transition-all duration-300"
                        >
                          Learn More
                        </Link>
                      </div>
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

export default MembershipPreview;