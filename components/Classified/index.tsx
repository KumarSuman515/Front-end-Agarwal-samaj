import React from "react";
import SectionHeader from "@/components/Common/SectionHeader";

const Classified = () => {
  const classifieds = [
    {
      id: 1,
      title: "Business Partnership Opportunity",
      category: "Business",
      description: "Looking for partners in textile business. Experience required. Contact for details.",
      contact: "+91 98765 43210",
      date: "2024-01-15",
      featured: true
    },
    {
      id: 2,
      title: "Property for Sale",
      category: "Real Estate",
      description: "3BHK apartment in prime location. Ready to move. Good for family.",
      contact: "+91 98765 43211",
      date: "2024-01-14",
      featured: false
    },
    {
      id: 3,
      title: "Job Opening - Accountant",
      category: "Jobs",
      description: "CA firm looking for experienced accountant. Good salary package.",
      contact: "+91 98765 43212",
      date: "2024-01-13",
      featured: true
    },
    {
      id: 4,
      title: "Car for Sale",
      category: "Vehicles",
      description: "2018 Honda City, single owner, excellent condition. Negotiable price.",
      contact: "+91 98765 43213",
      date: "2024-01-12",
      featured: false
    },
    {
      id: 5,
      title: "Tutor Required",
      category: "Education",
      description: "Looking for home tutor for 10th standard student. Math and Science.",
      contact: "+91 98765 43214",
      date: "2024-01-11",
      featured: false
    },
    {
      id: 6,
      title: "Community Event Announcement",
      category: "Events",
      description: "Annual community gathering on Republic Day. All members invited.",
      contact: "+91 98765 43215",
      date: "2024-01-10",
      featured: true
    }
  ];

  const categories = ["All", "Business", "Real Estate", "Jobs", "Vehicles", "Education", "Events"];

  return (
    <>
      <section id="classified" className="px-4 md:px-8 2xl:px-0">
        <div className="relative mx-auto max-w-c-1390 px-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
          <SectionHeader
            headerInfo={{
              title: "Community Classifieds",
              subtitle: "Browse Local Listings",
              description: "Find and post community classifieds, business opportunities, and local announcements within the Agarwal Samaj community.",
            }}
          />

          {/* Category Filter */}
          <div className="mt-12 mb-8 flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                  index === 0 
                    ? "bg-blue-600 text-white" 
                    : "bg-gray-100 text-gray-700 hover:bg-blue-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Post New Classified Button */}
          <div className="mb-8 text-center">
            <button className="rounded-lg bg-green-600 px-8 py-3 font-medium text-white transition-colors duration-300 hover:bg-green-700">
              Post New Classified
            </button>
          </div>

          {/* Classifieds Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {classifieds.map((item) => (
              <div
                key={item.id}
                className={`rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg dark:bg-blacksection border-l-4 ${
                  item.featured ? "border-l-yellow-500" : "border-l-blue-500"
                }`}
              >
                <div className="p-6">
                  <div className="mb-3 flex items-start justify-between">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.category === "Business" ? "bg-blue-100 text-blue-800" :
                      item.category === "Real Estate" ? "bg-green-100 text-green-800" :
                      item.category === "Jobs" ? "bg-purple-100 text-purple-800" :
                      item.category === "Vehicles" ? "bg-orange-100 text-orange-800" :
                      item.category === "Education" ? "bg-pink-100 text-pink-800" :
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {item.category}
                    </span>
                    {item.featured && (
                      <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
                        Featured
                      </span>
                    )}
                  </div>
                  
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  
                  <p className="mb-4 line-clamp-3 text-sm text-gray-600">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Contact: {item.contact}</span>
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="mt-4 flex gap-2">
                    <button className="flex-1 rounded bg-blue-600 py-2 px-4 text-sm font-medium text-white transition-colors duration-300 hover:bg-blue-700">
                      Contact
                    </button>
                    <button className="rounded bg-gray-100 py-2 px-4 text-sm font-medium text-gray-700 transition-colors duration-300 hover:bg-gray-200">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="pb-20 pt-12 text-center">
            <button className="rounded-lg bg-gray-100 px-8 py-3 font-medium text-gray-700 transition-colors duration-300 hover:bg-gray-200">
              Load More Classifieds
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Classified;
