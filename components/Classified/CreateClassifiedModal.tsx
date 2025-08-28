"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { useToast } from "@/app/context/ToastContext";

interface CreateClassifiedModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

interface FormData {
  title: string;
  category: string;
  description: string;
  contact: string;
  email: string;
  location: string;
  price: string;
  postedBy: string;
  postedByPhone: string;
  expiresAt: string;
}

interface ValidationErrors {
  [key: string]: string;
}

const CreateClassifiedModal = ({ onClose, onSuccess }: CreateClassifiedModalProps) => {
  const { showToast } = useToast();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  const [formData, setFormData] = useState<FormData>({
    title: "",
    category: "",
    description: "",
    contact: "",
    email: "",
    location: "",
    price: "",
    postedBy: "",
    postedByPhone: "",
    expiresAt: "",
  });

  const categories = [
    "Business",
    "Real Estate", 
    "Jobs",
    "Vehicles",
    "Education",
    "Events",
    "Other"
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};

    if (!formData.title.trim()) {
      errors.title = "Title is required";
    } else if (formData.title.length < 3) {
      errors.title = "Title must be at least 3 characters";
    }

    if (!formData.category) {
      errors.category = "Category is required";
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required";
    } else if (formData.description.length < 10) {
      errors.description = "Description must be at least 10 characters";
    }

    if (!formData.contact.trim()) {
      errors.contact = "Contact number is required";
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.contact)) {
      errors.contact = "Invalid contact number format";
    }

    if (!formData.postedBy.trim()) {
      errors.postedBy = "Your name is required";
    }

    if (!formData.postedByPhone.trim()) {
      errors.postedByPhone = "Your phone number is required";
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.postedByPhone)) {
      errors.postedByPhone = "Invalid phone number format";
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (formData.price && isNaN(Number(formData.price))) {
      errors.price = "Price must be a valid number";
    }

    if (formData.expiresAt && new Date(formData.expiresAt) <= new Date()) {
      errors.expiresAt = "Expiration date must be in the future";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showToast("Please fix the errors in the form", "error");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        price: formData.price ? parseFloat(formData.price) : null,
        expiresAt: formData.expiresAt || null,
      };

      const response = await fetch("http://localhost:4005/api/classifieds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create classified");
      }

      const result = await response.json();
      showToast("Classified posted successfully!", "success");
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error creating classified:", error);
      showToast(error instanceof Error ? error.message : "Failed to create classified", "error");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  const modalContent = (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999] p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Post New Classified</h2>
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

        {/* Form Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  validationErrors.title ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter classified title"
              />
              {validationErrors.title && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.title}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  validationErrors.category ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {validationErrors.category && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.category}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  validationErrors.description ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Describe your classified in detail"
              />
              {validationErrors.description && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.description}</p>
              )}
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Number *
                </label>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    validationErrors.contact ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="+91 98765 43210"
                />
                {validationErrors.contact && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.contact}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    validationErrors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="your@email.com"
                />
                {validationErrors.email && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
                )}
              </div>
            </div>

            {/* Location and Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location (Optional)
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="City, State"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (Optional)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    validationErrors.price ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
                {validationErrors.price && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.price}</p>
                )}
              </div>
            </div>

            {/* Posted By Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="postedBy"
                  value={formData.postedBy}
                  onChange={handleInputChange}
                  className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    validationErrors.postedBy ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Your full name"
                />
                {validationErrors.postedBy && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.postedBy}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Phone Number *
                </label>
                <input
                  type="text"
                  name="postedByPhone"
                  value={formData.postedByPhone}
                  onChange={handleInputChange}
                  className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    validationErrors.postedByPhone ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="+91 98765 43210"
                />
                {validationErrors.postedByPhone && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.postedByPhone}</p>
                )}
              </div>
            </div>

            {/* Expiration Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiration Date (Optional)
              </label>
              <input
                type="date"
                name="expiresAt"
                value={formData.expiresAt}
                onChange={handleInputChange}
                className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  validationErrors.expiresAt ? "border-red-500" : "border-gray-300"
                }`}
                min={new Date().toISOString().split('T')[0]}
              />
              {validationErrors.expiresAt && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.expiresAt}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Posting..." : "Post Classified"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default CreateClassifiedModal;
