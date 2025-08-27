import React from "react";
import Link from "next/link";

const ClassifiedPreview = () => {
  const featuredClassifieds = [
    {
      id: 1,
      title: "Business Partnership Opportunity",
      category: "Business",
      description: "Looking for partners in textile business. Experience required.",
      contact: "+91 98765 43210",
      featured: true
    },
    {
      id: 2,
      title: "Property for Sale",
      category: "Real Estate",
      description: "3BHK apartment in prime location. Ready to move.",
      contact: "+91 98765 43211",
      featured: false
    },
    {
      id: 3,
      title: "Job Opening - Accountant",
      category: "Jobs",
      description: "CA firm looking for experienced accountant. Good salary.",
      contact: "+91 98765 43212",
      featured: true
    }
  ];

  const categories = [
    { name: "Business", count: 45, icon: "💼" },
    { name: "Real Estate", count: 32, icon: "🏠" },
    { name: "Jobs", count: 28, icon: "💻" },
    { name: "Vehicles", count: 15, icon: "🚗" },
    { name: "Education", count: 22, icon: "📚" },
    { name: "Events", count: 18, icon: "🎉" }
  ];

  return (
    <>
      <section id="classified-preview" className="px-4 md:px-8 2xl:px-0 bg-gray-50">
        <div className="relative mx-auto max-w-c-1390 px-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Community Classifieds
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse and post community classifieds, business opportunities, and local announcements within the Agarwal Samaj community.
            </p>
          </div>

          {/* Categories */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 text-center hover:shadow-md transition-shadow duration-300"
              >
                <div className="text-2xl mb-2">{category.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.count} listings</p>
              </div>
            ))}
          </div>

          {/* Featured Classifieds */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredClassifieds.map((item) => (
              <div
                key={item.id}
                className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 ${
                  item.featured ? "border-l-yellow-500" : "border-l-blue-500"
                }`}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.category === "Business" ? "bg-blue-100 text-blue-800" :
                      item.category === "Real Estate" ? "bg-green-100 text-green-800" :
                      "bg-purple-100 text-purple-800"
                    }`}>
                      {item.category}
                    </span>
                    {item.featured && (
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    {item.description}
                  </p>
                  
                  <div className="text-xs text-gray-500 mb-4">
                    Contact: {item.contact}
                  </div>
                  
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm font-medium transition-colors duration-300">
                    Contact Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pb-20">
            <Link
              href="/classified"
              className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300"
            >
              Browse All Classifieds
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

export default ClassifiedPreview;
