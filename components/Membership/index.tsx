"use client";
import React, { useState } from "react";
import SectionHeader from "@/components/Common/SectionHeader";
import MembershipPayment from "./payment_page";

const Membership = () => {
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    id: number;
    name: string;
    price: string;
    duration: string;
    features: string[];
    popular: boolean;
    buttonText: string;
    buttonColor: string;
  } | null>(null);

  const membershipPlans = [
    {
      id: 1,
      name: "Basic Member",
      price: "Free",
      duration: "Lifetime",
      features: [
        "Access to community events",
        "Basic profile listing",
        "Newsletter subscription",
        "Community directory access"
      ],
      popular: false,
      buttonText: "Join Free",
      buttonColor: "bg-gray-600 hover:bg-gray-700"
    },
    {
      id: 2,
      name: "Premium Member",
      price: "₹500",
      duration: "per year",
      features: [
        "All Basic features",
        "Priority event registration",
        "Business networking access",
        "Matrimony profile boost",
        "Exclusive workshops",
        "Community support"
      ],
      popular: true,
      buttonText: "Join Premium",
      buttonColor: "bg-blue-600 hover:bg-blue-700"
    },
    {
      id: 3,
      name: "Patron Member",
      price: "₹1000",
      duration: "per year",
      features: [
        "All Premium features",
        "VIP event access",
        "Leadership opportunities",
        "Mentorship programs",
        "Charity project involvement",
        "Annual recognition"
      ],
      popular: false,
      buttonText: "Join Patron",
      buttonColor: "bg-purple-600 hover:bg-purple-700"
    }
  ];

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

  const handleJoinClick = (plan) => {
    setSelectedPlan(plan);
    setShowPayment(true);
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handleBackToMembership = () => {
    setShowPayment(false);
    setSelectedPlan(null);
  };

  // If payment page is active, show it instead of membership plans
  if (showPayment) {
    return (
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="pt-20 pb-6">
            <button
              onClick={handleBackToMembership}
              className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Membership Plans
            </button>
          </div>
          <MembershipPayment selectedPlan={selectedPlan} />
        </div>
      </div>
    );
  }

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

          {/* Membership Plans */}
          <div className="mt-20">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
              Choose Your Membership Plan
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {membershipPlans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 cursor-pointer ${
                    plan.popular ? "ring-2 ring-blue-500" : ""
                  } ${
                    selectedPlan?.id === plan.id 
                      ? "ring-2 ring-blue-600 shadow-xl transform scale-105" 
                      : "hover:ring-2 hover:ring-blue-200"
                  }`}
                  onClick={() => handlePlanSelect(plan)}
                >
                  {plan.popular && (
                    <div className="absolute left-0 right-0 top-0 bg-blue-500 py-2 text-center text-sm font-medium text-white">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="p-8">
                    <h3 className="mb-4 text-2xl font-bold text-gray-900">
                      {plan.name}
                    </h3>
                    
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-gray-900">
                        {plan.price}
                      </span>
                      <span className="ml-2 text-gray-600">
                        {plan.duration}
                      </span>
                    </div>
                    
                    <ul className="mb-8 space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <svg className="mr-3 h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleJoinClick(plan);
                      }}
                      className={`w-full rounded-lg px-6 py-3 font-medium text-white transition-colors duration-300 ${plan.buttonColor}`}
                    >
                      {plan.buttonText}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        
        </div>
      </section>
    </>
  );
};

export default Membership;
