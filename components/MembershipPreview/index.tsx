import React from "react";
import Link from "next/link";

const MembershipPreview = () => {
  const membershipPlans = [
    {
      id: 1,
      name: "Basic Member",
      price: "Free",
      duration: "Lifetime",
      features: ["Access to community events", "Basic profile listing", "Newsletter subscription"],
      popular: false
    },
    {
      id: 2,
      name: "Premium Member",
      price: "₹500",
      duration: "per year",
      features: ["All Basic features", "Priority event registration", "Business networking access", "Matrimony profile boost"],
      popular: true
    },
    {
      id: 3,
      name: "Patron Member",
      price: "₹1000",
      duration: "per year",
      features: ["All Premium features", "VIP event access", "Leadership opportunities", "Mentorship programs"],
      popular: false
    }
  ];

  const benefits = [
    {
      icon: "🤝",
      title: "Community Support",
      description: "Connect with fellow Agarwal community members"
    },
    {
      icon: "📚",
      title: "Educational Programs",
      description: "Access to workshops and seminars"
    },
    {
      icon: "💼",
      title: "Business Networking",
      description: "Expand your professional network"
    },
    {
      icon: "❤️",
      title: "Matrimony Services",
      description: "Find your life partner within community"
    }
  ];

  return (
    <>
      <section id="membership-preview" className="px-4 md:px-8 2xl:px-0">
        <div className="relative mx-auto max-w-c-1390 px-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Join Our Community
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Become a part of the vibrant Agarwal Samaj community. Choose the membership plan that best suits your needs.
            </p>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="text-center"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          {/* Membership Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {membershipPlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white rounded-lg shadow-lg overflow-hidden ${
                  plan.popular ? "ring-2 ring-blue-500" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-blue-500 text-white text-center py-2 text-sm font-medium">
                    Most Popular
                  </div>
                )}
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {plan.name}
                  </h3>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-gray-600 ml-2">
                      {plan.duration}
                    </span>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Link
                    href="/membership"
                    className={`w-full text-center py-3 px-6 rounded-lg font-medium transition-colors duration-300 ${
                      plan.popular 
                        ? "bg-blue-600 hover:bg-blue-700 text-white" 
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    {plan.price === "Free" ? "Join Free" : "Join Now"}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pb-20">
            <Link
              href="/membership"
              className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300"
            >
              View All Plans
              <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default MembershipPreview;
