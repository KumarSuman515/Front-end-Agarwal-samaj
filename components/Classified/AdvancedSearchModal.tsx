"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { useToast } from "@/app/context/ToastContext";

interface AdvancedSearchModalProps {
  onClose: () => void;
  onSearch: (filters: SearchFilters) => void;
  currentFilters: SearchFilters;
}

interface SearchFilters {
  business_category: string;
  firm_name: string;
  location: string;
  status: string;
}

const AdvancedSearchModal = ({ onClose, onSearch, currentFilters }: AdvancedSearchModalProps) => {
  const { showToast } = useToast();
  const [mounted, setMounted] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>(currentFilters);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const categories = ["All", "Business", "Real Estate", "Jobs", "Vehicles", "Education", "Events", "Other"];
  const statuses = ["All", "approved", "pending", "disapproved"];

  const handleInputChange = (field: keyof SearchFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = () => {
    onSearch(filters);
    showToast('Search filters applied successfully', 'success');
    onClose();
  };

  const handleReset = () => {
    const resetFilters: SearchFilters = {
      business_category: "All",
      firm_name: "",
      location: "",
      status: "All"
    };
    setFilters(resetFilters);
    onSearch(resetFilters);
    showToast('Search filters reset successfully', 'info');
    onClose();
  };

  if (!mounted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999] p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const modalContent = (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999] p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Advanced Search</h2>
              <p className="text-blue-100 text-sm mt-1">Filter businesses by multiple criteria</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-blue-200 transition-colors"
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
          <div className="space-y-6">
            {/* Business Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Category
              </label>
              <select
                value={filters.business_category}
                onChange={(e) => handleInputChange('business_category', e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Firm Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Name
              </label>
              <input
                type="text"
                value={filters.firm_name}
                onChange={(e) => handleInputChange('firm_name', e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter business name..."
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                value={filters.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter city or area..."
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Approval Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status === "All" ? "All Statuses" : status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-8">
            <button
              onClick={handleReset}
              className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Reset Filters
            </button>
            <button
              onClick={handleSearch}
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default AdvancedSearchModal;
