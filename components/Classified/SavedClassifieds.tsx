"use client";

import React, { useState, useEffect } from "react";
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

// Static sample data (same as in main component)
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

interface SavedClassifiedsProps {
  onClose: () => void;
}

const SavedClassifieds = ({ onClose }: SavedClassifiedsProps) => {
  const { showToast } = useToast();
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [savedClassifieds, setSavedClassifieds] = useState<ClassifiedItem[]>([]);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedContactItem, setSelectedContactItem] = useState<ClassifiedItem | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("savedClassifieds");
    if (saved) {
      const ids = JSON.parse(saved);
      setSavedIds(ids);
      
      // Filter static data to get saved classifieds
      const savedItems = staticClassifieds.filter(item => ids.includes(item.id));
      setSavedClassifieds(savedItems);
    }
  }, []);

  const handleRemoveSaved = (id: number) => {
    const newSavedIds = savedIds.filter(savedId => savedId !== id);
    setSavedIds(newSavedIds);
    setSavedClassifieds(prev => prev.filter(c => c.id !== id));
    localStorage.setItem("savedClassifieds", JSON.stringify(newSavedIds));
    showToast("Removed from saved", "success");
  };

  const handleContact = (classified: ClassifiedItem) => {
    setSelectedContactItem(classified);
    setShowContactModal(true);
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999] p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Saved Classifieds</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              type="button"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {savedClassifieds.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No saved classifieds</h3>
              <p className="text-gray-600">Start saving classifieds to see them here</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {savedClassifieds.map((item) => (
                <div
                  key={item.id}
                  className={`rounded-lg bg-white shadow-md border border-gray-200 border-l-4 ${
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
                        onClick={() => handleRemoveSaved(item.id)}
                        className="rounded bg-red-100 text-red-700 py-2 px-4 text-sm font-medium transition-colors duration-300 hover:bg-red-200"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

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
    </div>
  );
};

export default SavedClassifieds;
