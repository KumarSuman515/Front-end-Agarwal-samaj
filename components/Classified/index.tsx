"use client";

import React, { useState, useEffect } from "react";
import SectionHeader from "@/components/Common/SectionHeader";
import CreateClassifiedModal from "./CreateClassifiedModal";
import SavedClassifieds from "./SavedClassifieds";
import ContactModal from "./ContactModal";
import StatusCheckModal from "./StatusCheckModal";
import AdvancedSearchModal from "./AdvancedSearchModal";
import BusinessStats from "./BusinessStats";
import { useToast } from "@/app/context/ToastContext";

interface ClassifiedItem {
  id: number;
  person_name: string;
  firm_name: string;
  firm_address: string;
  phone: string;
  email: string;
  website?: string;
  business_category: string;
  photos?: string;
  status: "pending" | "approved" | "disapproved";
  approval_by?: number;
  approval_date?: string;
  created_at: string;
}

// API Base URL
import { API_ENDPOINTS, getImageUrl } from "@/lib/api/config";
import api, { ApiError } from "@/lib/api/client";

const API_BASE_URL = API_ENDPOINTS.classifieds;

const Classified = () => {
  const { showToast } = useToast();
  const [classifieds, setClassifieds] = useState<ClassifiedItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSavedModal, setShowSavedModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [selectedContactItem, setSelectedContactItem] = useState<ClassifiedItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [savedClassifieds, setSavedClassifieds] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFilters, setSearchFilters] = useState({
    business_category: "All",
    firm_name: "",
    location: "",
    status: "All"
  });

  const categories = ["All", "Business", "Real Estate", "Jobs", "Vehicles", "Education", "Events", "Other"];

  // Fetch classifieds from API with search filters
  const fetchClassifieds = async (searchParams?: { business_category?: string; firm_name?: string }) => {
    try {
      setLoading(true);
      
      // Build query parameters
      const params = new URLSearchParams();
      if (searchParams?.business_category && searchParams.business_category !== "All") {
        params.append('business_category', searchParams.business_category);
      }
      if (searchParams?.firm_name) {
        params.append('firm_name', searchParams.firm_name);
      }
      
      const queryString = params.toString();
      const url = queryString ? `${API_BASE_URL}/search?${queryString}` : `${API_BASE_URL}/search`;
      
      const data = await api.get<ClassifiedItem[]>(url, {
        timeout: 15000,
        retries: 2
      });
      setClassifieds(data);
    } catch (error) {
      console.error('Error fetching classifieds:', error);
      if (error instanceof ApiError) {
        showToast(error.userMessage || 'Failed to load classifieds', 'error');
      } else {
        showToast('Failed to load classifieds', 'error');
      }
      setClassifieds([]);
    } finally {
      setLoading(false);
    }
  };

  // Load saved classifieds from localStorage and fetch classifieds
  useEffect(() => {
    const saved = localStorage.getItem("savedClassifieds");
    if (saved) {
      setSavedClassifieds(JSON.parse(saved));
    }
    fetchClassifieds();
  }, []);

  // Handle search with API call
  const handleSearch = async () => {
    if (!searchTerm.trim() && selectedCategory === "All") {
      showToast("Please enter a search term or select a category", "warning");
      return;
    }
    await fetchClassifieds({
      business_category: selectedCategory,
      firm_name: searchTerm
    });
  };

  // Handle category change with API call
  const handleCategoryChange = async (category: string) => {
    setSelectedCategory(category);
    await fetchClassifieds({
      business_category: category,
      firm_name: searchTerm
    });
  };

  // Handle advanced search
  const handleAdvancedSearch = async (filters: typeof searchFilters) => {
    setSearchFilters(filters);
    setSelectedCategory(filters.business_category);
    setSearchTerm(filters.firm_name);
    
    await fetchClassifieds({
      business_category: filters.business_category,
      firm_name: filters.firm_name
    });
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
    showToast(`Opening contact details for ${classified.firm_name}`, "info");
  };

  const handleCreateSuccess = () => {
    showToast("Business registered successfully! Your listing is under review.", "success");
    fetchClassifieds(); // Refresh the list
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
      timeZone: 'UTC',
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
              title: "Business Directory",
              subtitle: "Agarwal Samaj Business Listings",
              description: "Discover and connect with verified businesses within the Agarwal Samaj community. Register your business to reach potential customers.",
            }}
          />

          {/* Loading State */}
          {loading && (
            <div className="mt-8 mb-6 text-center py-8">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-4 text-gray-600">Loading classifieds...</p>
            </div>
          )}

          {/* Search Bar */}
          <div className="mt-12 mb-6">
            <div className="max-w-2xl mx-auto">
              <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search businesses by name..."
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAdvancedSearch(true);
                      showToast("Advanced search options opened", "info");
                    }}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Advanced Search"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                    </svg>
                  </button>
                  <button
                    type="submit"
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Search"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>

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
              onClick={() => {
                setShowCreateModal(true);
                showToast("Opening business registration form", "info");
              }}
              className="rounded-lg bg-green-600 px-8 py-3 font-medium text-white transition-colors duration-300 hover:bg-green-700"
            >
              Register Your Business
            </button>
            <button 
              onClick={() => {
                setShowStatusModal(true);
                showToast("Opening status check", "info");
              }}
              className="rounded-lg bg-purple-600 px-8 py-3 font-medium text-white transition-colors duration-300 hover:bg-purple-700"
            >
              Check Registration Status
            </button>
            <button 
              onClick={() => {
                setShowSavedModal(true);
                showToast("Opening saved businesses", "info");
              }}
              className="rounded-lg bg-blue-600 px-8 py-3 font-medium text-white transition-colors duration-300 hover:bg-blue-700"
            >
              View Saved ({savedClassifieds.length})
            </button>
          </div>

          {/* Business Statistics */}
          <div className="mb-8">
            <BusinessStats />
          </div>

          {/* Business Directory Grid */}
          {!loading && (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {classifieds.map((business) => (
                <div
                  key={business.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  {/* Business Photos */}
                  {business.photos && business.photos.split(',').length > 0 && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={getImageUrl(business.photos.split(',')[0])}
                        alt={`${business.firm_name} business photo`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}

                  {/* Business Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
                    <div className="flex items-start justify-between mb-3">
                      <span className={`text-xs px-3 py-1 rounded-full bg-white/20 text-white font-medium`}>
                        {business.business_category}
                      </span>
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                        business.status === "approved" 
                          ? "bg-green-500 text-white" 
                          : business.status === "pending"
                          ? "bg-yellow-500 text-white"
                          : "bg-red-500 text-white"
                      }`}>
                        {business.status === "approved" ? "✓ Verified" : business.status === "pending" ? "⏳ Pending" : "❌ Rejected"}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2">
                      {business.firm_name}
                    </h3>
                    
                    <p className="text-blue-100 text-sm">
                      Contact: <span className="font-medium">{business.person_name}</span>
                    </p>
                  </div>

                  {/* Business Details */}
                  <div className="p-6">
                    {/* Address */}
                    <div className="mb-4">
                      <div className="flex items-start">
                        <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">Business Address</p>
                          <p className="text-sm text-gray-600 leading-relaxed">{business.firm_address}</p>
                        </div>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-3 mb-6">
                      {/* Phone */}
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">{business.phone}</p>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">{business.email}</p>
                        </div>
                      </div>

                      {/* Website */}
                      {business.website && (
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                            <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                            </svg>
                          </div>
                          <div>
                            <a href={business.website} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-600 hover:underline">
                              Visit Website
                            </a>
                          </div>
                    </div>
                  )}
                    </div>

                    {/* Posted Date */}
                    <div className="text-xs text-gray-500 mb-4 pb-4 border-b border-gray-100">
                      Listed on {formatDate(business.created_at)}
                  </div>
                  
                    {/* Action Buttons */}
                    <div className="flex gap-3">
                    <button 
                        onClick={() => handleContact(business)}
                        className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      Contact
                    </button>
                    <button 
                        onClick={() => handleSaveClassified(business.id)}
                        className={`px-4 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center ${
                          savedClassifieds.includes(business.id)
                          ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}

          {/* No Results */}
          {!loading && classifieds.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-6">
                <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">No businesses found</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {searchTerm || selectedCategory !== "All" 
                  ? "Try adjusting your search terms or category filters to find more businesses."
                  : "No businesses are currently listed. Be the first to register your business!"
                }
              </p>
              {(!searchTerm && selectedCategory === "All") && (
                <button 
                  onClick={() => {
                    setShowCreateModal(true);
                    showToast("Opening business registration form", "info");
                  }}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300"
                >
                  Register Your Business
                </button>
              )}
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

      {/* Status Check Modal */}
      {showStatusModal && (
        <StatusCheckModal
          onClose={() => setShowStatusModal(false)}
        />
      )}

      {/* Advanced Search Modal */}
      {showAdvancedSearch && (
        <AdvancedSearchModal
          onClose={() => setShowAdvancedSearch(false)}
          onSearch={handleAdvancedSearch}
          currentFilters={searchFilters}
        />
      )}
    </>
  );
};

export default Classified;
