"use client";

import React, { useState, useEffect } from "react";
import SectionHeader from "@/components/Common/SectionHeader";
import CreateClassifiedModal from "./CreateClassifiedModal";
import SavedClassifieds from "./SavedClassifieds";
import ContactModal from "./ContactModal";
import { useToast } from "@/app/context/ToastContext";

interface ClassifiedItem {
  id: number;
  title: string;
  category: string;
  description: string;
  contact: string;
  email?: string;
  location?: string;
  price?: number;
  featured: boolean;
  status: string;
  views: number;
  postedBy: string;
  postedByPhone: string;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Static sample data
const staticClassifieds: ClassifiedItem[] = [
  {
    id: 1,
    title: "Beautiful 3BHK Apartment for Rent",
    category: "Real Estate",
    description: "Spacious 3BHK apartment available for rent in prime location. Fully furnished with modern amenities, parking space, and 24/7 security. Perfect for families.",
    contact: "+91 98765 43210",
    email: "rental@example.com",
    location: "Mumbai, Maharashtra",
    price: 45000,
    featured: true,
    status: "active",
    views: 156,
    postedBy: "Rajesh Agarwal",
    postedByPhone: "+91 98765 43210",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z"
  },
  {
    id: 2,
    title: "Software Developer Required",
    category: "Jobs",
    description: "Looking for experienced React/Node.js developer. 3+ years experience required. Competitive salary with benefits. Work from home option available.",
    contact: "+91 87654 32109",
    email: "hr@techcompany.com",
    location: "Delhi, NCR",
    price: 800000,
    featured: false,
    status: "active",
    views: 89,
    postedBy: "Priya Agarwal",
    postedByPhone: "+91 87654 32109",
    createdAt: "2024-01-14T14:20:00Z",
    updatedAt: "2024-01-14T14:20:00Z"
  },
  {
    id: 3,
    title: "Maruti Swift VXI 2019 Model",
    category: "Vehicles",
    description: "Well maintained Maruti Swift VXI, single owner, 25,000 km driven. All service records available. Excellent condition, ready to drive.",
    contact: "+91 76543 21098",
    location: "Bangalore, Karnataka",
    price: 650000,
    featured: true,
    status: "active",
    views: 234,
    postedBy: "Amit Agarwal",
    postedByPhone: "+91 76543 21098",
    createdAt: "2024-01-13T09:15:00Z",
    updatedAt: "2024-01-13T09:15:00Z"
  },
  {
    id: 4,
    title: "Agarwal Samaj Annual Function",
    category: "Events",
    description: "Join us for the annual Agarwal Samaj function on 25th January 2024. Cultural programs, dinner, and networking opportunities. All members welcome.",
    contact: "+91 65432 10987",
    email: "events@agarwalsamaj.com",
    location: "Pune, Maharashtra",
    featured: false,
    status: "active",
    views: 445,
    postedBy: "Suresh Agarwal",
    postedByPhone: "+91 65432 10987",
    createdAt: "2024-01-12T16:45:00Z",
    updatedAt: "2024-01-12T16:45:00Z"
  },
  {
    id: 5,
    title: "Grocery Store for Sale",
    category: "Business",
    description: "Established grocery store in prime location with good customer base. Monthly turnover 5-6 lakhs. Reason for sale: relocation. Serious buyers only.",
    contact: "+91 54321 09876",
    location: "Chennai, Tamil Nadu",
    price: 2500000,
    featured: false,
    status: "active",
    views: 178,
    postedBy: "Vikram Agarwal",
    postedByPhone: "+91 54321 09876",
    createdAt: "2024-01-11T11:30:00Z",
    updatedAt: "2024-01-11T11:30:00Z"
  },
  {
    id: 6,
    title: "CA Coaching Classes",
    category: "Education",
    description: "Professional CA coaching by experienced faculty. Both online and offline batches available. Special discount for Agarwal community members.",
    contact: "+91 43210 98765",
    email: "ca@education.com",
    location: "Hyderabad, Telangana",
    price: 75000,
    featured: true,
    status: "active",
    views: 123,
    postedBy: "Neha Agarwal",
    postedByPhone: "+91 43210 98765",
    createdAt: "2024-01-10T13:20:00Z",
    updatedAt: "2024-01-10T13:20:00Z"
  },
  {
    id: 7,
    title: "Wedding Catering Services",
    category: "Business",
    description: "Premium wedding catering services with traditional and modern menu options. Serving Agarwal community for 15+ years. Book early for best rates.",
    contact: "+91 32109 87654",
    email: "catering@weddings.com",
    location: "Ahmedabad, Gujarat",
    featured: false,
    status: "active",
    views: 267,
    postedBy: "Manoj Agarwal",
    postedByPhone: "+91 32109 87654",
    createdAt: "2024-01-09T08:45:00Z",
    updatedAt: "2024-01-09T08:45:00Z"
  },
  {
    id: 8,
    title: "Gold Jewellery Exchange",
    category: "Business",
    description: "Buying and selling gold jewellery. Best rates guaranteed. Trusted by Agarwal community for generations. Home service available.",
    contact: "+91 21098 76543",
    location: "Jaipur, Rajasthan",
    featured: false,
    status: "active",
    views: 189,
    postedBy: "Lakshmi Agarwal",
    postedByPhone: "+91 21098 76543",
    createdAt: "2024-01-08T15:10:00Z",
    updatedAt: "2024-01-08T15:10:00Z"
  }
];

const Classified = () => {
  const { showToast } = useToast();
  const [classifieds, setClassifieds] = useState<ClassifiedItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSavedModal, setShowSavedModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedContactItem, setSelectedContactItem] = useState<ClassifiedItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [savedClassifieds, setSavedClassifieds] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const categories = ["All", "Business", "Real Estate", "Jobs", "Vehicles", "Education", "Events", "Other"];

  // Load saved classifieds from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("savedClassifieds");
    if (saved) {
      setSavedClassifieds(JSON.parse(saved));
    }
  }, []);

  // Filter classifieds based on search and category
  useEffect(() => {
    let filtered = staticClassifieds;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.postedBy.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setClassifieds(filtered);
  }, [selectedCategory, searchTerm]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by useEffect
  };

  const handleSaveClassified = (id: number) => {
    const newSaved = savedClassifieds.includes(id) 
      ? savedClassifieds.filter(savedId => savedId !== id)
      : [...savedClassifieds, id];
    
    setSavedClassifieds(newSaved);
    localStorage.setItem("savedClassifieds", JSON.stringify(newSaved));
    
    const isSaved = savedClassifieds.includes(id);
    showToast(
      isSaved ? "Removed from saved" : "Added to saved", 
      "success"
    );
  };

  const handleContact = (classified: ClassifiedItem) => {
    setSelectedContactItem(classified);
    setShowContactModal(true);
  };

  const handleCreateSuccess = () => {
    showToast("Classified created successfully! (Demo mode - not actually saved)", "success");
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Business": return "bg-blue-100 text-blue-800";
      case "Real Estate": return "bg-green-100 text-green-800";
      case "Jobs": return "bg-purple-100 text-purple-800";
      case "Vehicles": return "bg-orange-100 text-orange-800";
      case "Education": return "bg-pink-100 text-pink-800";
      case "Events": return "bg-indigo-100 text-indigo-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatPrice = (price?: number) => {
    if (!price) return null;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

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

          {/* Demo Notice */}
          <div className="mt-8 mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-yellow-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="text-yellow-800 text-sm">
                <strong>Demo Mode:</strong> This is showing static sample data. In production, this would connect to a real database.
              </p>
            </div>
          </div>

          {/* Search Bar */}
          {/* <div className="mt-12 mb-6">
            <form onSubmit={handleSearch} className="max-w-md mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search classifieds..."
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>
          </div> */}

          {/* Category Filter */}
          <div className="mb-8 flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategoryChange(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white" 
                    : "bg-gray-100 text-gray-700 hover:bg-blue-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mb-8 text-center flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setShowCreateModal(true)}
              className="rounded-lg bg-green-600 px-8 py-3 font-medium text-white transition-colors duration-300 hover:bg-green-700"
            >
              Post New Classified
            </button>
            <button 
              onClick={() => setShowSavedModal(true)}
              className="rounded-lg bg-blue-600 px-8 py-3 font-medium text-white transition-colors duration-300 hover:bg-blue-700"
            >
              View Saved ({savedClassifieds.length})
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
                    <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(item.category)}`}>
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

                  {/* Price */}
                  {item.price && (
                    <div className="mb-3">
                      <span className="text-lg font-bold text-green-600">
                        {formatPrice(item.price)}
                      </span>
                    </div>
                  )}

                  {/* Location */}
                  {item.location && (
                    <div className="mb-3 flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {item.location}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>Posted by: {item.postedBy}</span>
                    <span>{formatDate(item.createdAt)}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleContact(item)}
                      className="flex-1 rounded bg-blue-600 py-2 px-4 text-sm font-medium text-white transition-colors duration-300 hover:bg-blue-700"
                    >
                      Contact
                    </button>
                    <button 
                      onClick={() => handleSaveClassified(item.id)}
                      className={`rounded py-2 px-4 text-sm font-medium transition-colors duration-300 ${
                        savedClassifieds.includes(item.id)
                          ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {savedClassifieds.includes(item.id) ? "Saved" : "Save"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {classifieds.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No classifieds found</h3>
              <p className="text-gray-600">
                {searchTerm || selectedCategory !== "All" 
                  ? "Try adjusting your search or filters"
                  : "Be the first to post a classified!"
                }
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Create Classified Modal */}
      {showCreateModal && (
        <CreateClassifiedModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={handleCreateSuccess}
        />
      )}

      {/* Saved Classifieds Modal */}
      {showSavedModal && (
        <SavedClassifieds
          onClose={() => setShowSavedModal(false)}
        />
      )}

      {/* Contact Modal */}
      {showContactModal && selectedContactItem && (
        <ContactModal
          classified={selectedContactItem}
          onClose={() => {
            setShowContactModal(false);
            setSelectedContactItem(null);
          }}
        />
      )}
    </>
  );
};

export default Classified;
