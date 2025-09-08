"use client";

import React, { useState, useEffect } from "react";
import ContactModal from "./ContactModal";
import { useToast } from "@/app/context/ToastContext";

interface ClassifiedItem {
  id: number;
  person_name: string;
  firm_name: string;
  firm_address: string;
  phone: string;
  email: string;
  website: string;
  business_category: string;
  photos: string;
  status: string;
  approval_by?: number;
  approval_date?: string;
  created_at: string;
  updated_at: string;
}

interface SavedClassifiedsProps {
  onClose: () => void;
}

const SavedClassifieds = ({ onClose }: SavedClassifiedsProps) => {
  const { showToast } = useToast();
  const [savedClassifieds, setSavedClassifieds] = useState<number[]>([]);
  const [classifieds, setClassifieds] = useState<ClassifiedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedContactItem, setSelectedContactItem] = useState<ClassifiedItem | null>(null);

  const API_BASE_URL = "http://localhost:4005/api/classifieds";

  // Load saved classifieds from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("savedClassifieds");
    if (saved) {
      setSavedClassifieds(JSON.parse(saved));
    }
  }, []);

  // Fetch classifieds data
  useEffect(() => {
    if (savedClassifieds.length > 0) {
      fetchClassifieds();
    } else {
      setLoading(false);
    }
  }, [savedClassifieds]);

  const fetchClassifieds = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/search`);
      if (!response.ok) {
        throw new Error('Failed to fetch classifieds');
      }
      const data = await response.json();
      
      // Filter only saved classifieds
      const savedData = data.filter((item: ClassifiedItem) => 
        savedClassifieds.includes(item.id)
      );
      setClassifieds(savedData);
    } catch (error) {
      console.error('Error fetching classifieds:', error);
      showToast('Failed to load saved classifieds', 'error');
      setClassifieds([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveSaved = (id: number) => {
    const newSaved = savedClassifieds.filter(savedId => savedId !== id);
    setSavedClassifieds(newSaved);
    localStorage.setItem("savedClassifieds", JSON.stringify(newSaved));
    
    // Remove from displayed list
    setClassifieds(prev => prev.filter(item => item.id !== id));
    
    showToast("Removed from saved list", "success");
  };

  const handleContactClick = (classified: ClassifiedItem) => {
    setSelectedContactItem(classified);
    setShowContactModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "disapproved":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999] p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Saved Businesses</h2>
              <p className="text-blue-100 text-sm mt-1">
                {savedClassifieds.length} saved business{savedClassifieds.length !== 1 ? 'es' : ''}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-blue-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-4 text-gray-600">Loading saved businesses...</p>
            </div>
          ) : classifieds.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-6">
                <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Saved Businesses</h3>
              <p className="text-gray-600 mb-6">
                You haven't saved any businesses yet. Start exploring and save businesses you're interested in!
              </p>
              <button
                onClick={onClose}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Explore Businesses
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {classifieds.map((business) => (
                <div
                  key={business.id}
                  className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Business Photo */}
                  {business.photos && business.photos.split(',').length > 0 && (
                    <div className="h-48 overflow-hidden rounded-t-lg">
                      <img
                        src={`http://localhost:4005/uploads/${business.photos.split(',')[0]}`}
                        alt={`${business.firm_name} business photo`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}

                  {/* Business Info */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                        {business.firm_name}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(business.status)}`}>
                        {business.status}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Contact:</span> {business.person_name}
                    </p>

                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Category:</span> {business.business_category}
                    </p>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      <span className="font-medium">Address:</span> {business.firm_address}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleContactClick(business)}
                        className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                      >
                        Contact
                      </button>
                      <button
                        onClick={() => handleRemoveSaved(business.id)}
                        className="bg-red-100 text-red-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
                        title="Remove from saved"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
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