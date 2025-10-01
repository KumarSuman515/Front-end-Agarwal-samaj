"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { useToast } from "@/app/context/ToastContext";
import { API_ENDPOINTS } from "@/lib/api/config";

interface CreateClassifiedModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

interface FormData {
  person_name: string;
  firm_name: string;
  firm_address: string;
  phone: string;
  email: string;
  website: string;
  business_category: string;
  photos: File[];
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
    person_name: "",
    firm_name: "",
    firm_address: "",
    phone: "",
    email: "",
    website: "",
    business_category: "",
    photos: [],
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

    // Person Name Validation
    if (!formData.person_name.trim()) {
      errors.person_name = "Person name is required";
    } else if (formData.person_name.trim().length < 2) {
      errors.person_name = "Person name must be at least 2 characters";
    } else if (formData.person_name.trim().length > 50) {
      errors.person_name = "Person name must be less than 50 characters";
    } else if (!/^[a-zA-Z\s\.]+$/.test(formData.person_name.trim())) {
      errors.person_name = "Person name can only contain letters, spaces, and dots";
    }

    // Firm Name Validation
    if (!formData.firm_name.trim()) {
      errors.firm_name = "Firm name is required";
    } else if (formData.firm_name.trim().length < 2) {
      errors.firm_name = "Firm name must be at least 2 characters";
    } else if (formData.firm_name.trim().length > 100) {
      errors.firm_name = "Firm name must be less than 100 characters";
    }

    // Business Category Validation
    if (!formData.business_category) {
      errors.business_category = "Business category is required";
    }

    // Firm Address Validation
    if (!formData.firm_address.trim()) {
      errors.firm_address = "Firm address is required";
    } else if (formData.firm_address.trim().length < 10) {
      errors.firm_address = "Please provide a complete address (at least 10 characters)";
    } else if (formData.firm_address.trim().length > 500) {
      errors.firm_address = "Address must be less than 500 characters";
    }

    // Phone Number Validation (Indian mobile numbers)
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else {
      // Remove all non-digit characters for validation
      const cleanPhone = formData.phone.replace(/\D/g, '');
      
      if (cleanPhone.length < 10) {
        errors.phone = "Phone number must be at least 10 digits";
      } else if (cleanPhone.length > 15) {
        errors.phone = "Phone number must be less than 15 digits";
      } else if (!/^(\+91|91|0)?[6-9]\d{9}$/.test(cleanPhone)) {
        errors.phone = "Please enter a valid Indian mobile number (starting with 6, 7, 8, or 9)";
      }
    }

    // Email Validation
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    } else if (formData.email.length > 100) {
      errors.email = "Email must be less than 100 characters";
    }

    // Website Validation (Optional)
    if (formData.website && formData.website.trim()) {
      if (!/^https?:\/\/.+/.test(formData.website)) {
        errors.website = "Website must start with http:// or https://";
      } else if (formData.website.length > 200) {
        errors.website = "Website URL must be less than 200 characters";
      } else {
        try {
          new URL(formData.website);
        } catch {
          errors.website = "Please enter a valid website URL";
        }
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const phoneNumber = value.replace(/\D/g, '');
    
    // Format as Indian mobile number
    if (phoneNumber.length <= 3) {
      return phoneNumber;
    } else if (phoneNumber.length <= 6) {
      return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3)}`;
    } else if (phoneNumber.length <= 10) {
      return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 6)} ${phoneNumber.slice(6)}`;
    } else {
      return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 6)} ${phoneNumber.slice(6, 10)}`;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Format phone number input
    if (name === 'phone') {
      const formattedPhone = formatPhoneNumber(value);
      setFormData(prev => ({
        ...prev,
        [name]: formattedPhone
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  // Real-time validation for specific fields
  const validateField = (name: string, value: string) => {
    const errors: ValidationErrors = { ...validationErrors };

    switch (name) {
      case 'person_name':
        if (value.trim() && value.trim().length < 2) {
          errors.person_name = "Person name must be at least 2 characters";
        } else if (value.trim() && value.trim().length > 50) {
          errors.person_name = "Person name must be less than 50 characters";
        } else if (value.trim() && !/^[a-zA-Z\s\.]+$/.test(value.trim())) {
          errors.person_name = "Person name can only contain letters, spaces, and dots";
        } else {
          delete errors.person_name;
        }
        break;

      case 'firm_name':
        if (value.trim() && value.trim().length < 2) {
          errors.firm_name = "Firm name must be at least 2 characters";
        } else if (value.trim() && value.trim().length > 100) {
          errors.firm_name = "Firm name must be less than 100 characters";
        } else {
          delete errors.firm_name;
        }
        break;

      case 'phone':
        if (value.trim()) {
          const cleanPhone = value.replace(/\D/g, '');
          if (cleanPhone.length < 10) {
            errors.phone = "Phone number must be at least 10 digits";
          } else if (cleanPhone.length > 15) {
            errors.phone = "Phone number must be less than 15 digits";
          } else if (!/^(\+91|91|0)?[6-9]\d{9}$/.test(cleanPhone)) {
            errors.phone = "Please enter a valid Indian mobile number (starting with 6, 7, 8, or 9)";
          } else {
            delete errors.phone;
          }
        } else {
          delete errors.phone;
        }
        break;

      case 'email':
        if (value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors.email = "Please enter a valid email address";
        } else if (value.length > 100) {
          errors.email = "Email must be less than 100 characters";
        } else {
          delete errors.email;
        }
        break;

      case 'firm_address':
        if (value.trim() && value.trim().length < 10) {
          errors.firm_address = "Please provide a complete address (at least 10 characters)";
        } else if (value.trim() && value.trim().length > 500) {
          errors.firm_address = "Address must be less than 500 characters";
        } else {
          delete errors.firm_address;
        }
        break;

      case 'website':
        if (value.trim()) {
          if (!/^https?:\/\/.+/.test(value)) {
            errors.website = "Website must start with http:// or https://";
          } else if (value.length > 200) {
            errors.website = "Website URL must be less than 200 characters";
          } else {
            try {
              new URL(value);
              delete errors.website;
            } catch {
              errors.website = "Please enter a valid website URL";
            }
          }
        } else {
          delete errors.website;
        }
        break;
    }

    setValidationErrors(errors);
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const isValidType = file.type.startsWith('image/');
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit
      return isValidType && isValidSize;
    });

    if (validFiles.length !== files.length) {
      showToast("Some files were rejected. Only images under 5MB are allowed.", "error");
    }

    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...validFiles]
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showToast("Please fix the errors in the form", "error");
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      
      // Add all form fields
      formDataToSend.append('person_name', formData.person_name);
      formDataToSend.append('firm_name', formData.firm_name);
      formDataToSend.append('firm_address', formData.firm_address);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('website', formData.website);
      formDataToSend.append('business_category', formData.business_category);
      
      // Add photos
      formData.photos.forEach((photo, index) => {
        formDataToSend.append('photos', photo);
      });

      const response = await fetch(API_ENDPOINTS.classifiedsRegister, {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to register business");
      }

      const result = await response.json();
      showToast("Business registered successfully! Your listing is under review.", "success");
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error registering business:", error);
      
      // Handle specific error messages with user-friendly text
      let errorMessage = "Failed to register business";
      if (error instanceof Error) {
        if (error.message.includes("Email or Phone already registered")) {
          errorMessage = "This email or phone number is already registered. Please use different contact details or contact support if you need to register multiple businesses.";
        } else {
          errorMessage = error.message;
        }
      }
      
      showToast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
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
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Register Your Business</h2>
              <p className="text-sm text-gray-600 mt-1">Join the Agarwal Samaj Business Directory</p>
            </div>
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
          {/* Notice */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <h4 className="text-sm font-medium text-blue-800">Registration Process</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Your business will be reviewed by our team before being published. You'll receive an email notification once approved.
                </p>
              </div>
            </div>
          </div>

          {/* Form Validation Summary */}
          {Object.keys(validationErrors).length > 0 && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="text-sm font-medium text-red-800">Please fix the following errors:</h4>
                  <ul className="mt-2 text-sm text-red-700 list-disc list-inside">
                    {Object.entries(validationErrors).map(([field, error]) => (
                      <li key={field}>{error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Person Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Person Name *
              </label>
              <input
                type="text"
                name="person_name"
                value={formData.person_name}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                maxLength={50}
                className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  validationErrors.person_name 
                    ? "border-red-500 bg-red-50" 
                    : formData.person_name.trim() 
                      ? "border-green-500 bg-green-50" 
                      : "border-gray-300"
                }`}
                placeholder="Enter your full name"
              />
              <div className="flex justify-between items-center mt-1">
                {validationErrors.person_name ? (
                  <p className="text-sm text-red-600">{validationErrors.person_name}</p>
                ) : (
                  <p className="text-sm text-gray-500">Only letters, spaces, and dots allowed</p>
                )}
                <span className="text-xs text-gray-400">{formData.person_name.length}/50</span>
              </div>
            </div>

            {/* Firm Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Firm/Business Name *
              </label>
              <input
                type="text"
                name="firm_name"
                value={formData.firm_name}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                maxLength={100}
                className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  validationErrors.firm_name 
                    ? "border-red-500 bg-red-50" 
                    : formData.firm_name.trim() 
                      ? "border-green-500 bg-green-50" 
                      : "border-gray-300"
                }`}
                placeholder="Enter firm or business name"
              />
              <div className="flex justify-between items-center mt-1">
                {validationErrors.firm_name ? (
                  <p className="text-sm text-red-600">{validationErrors.firm_name}</p>
                ) : (
                  <p className="text-sm text-gray-500">Enter your business or firm name</p>
                )}
                <span className="text-xs text-gray-400">{formData.firm_name.length}/100</span>
              </div>
            </div>

            {/* Business Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Category *
              </label>
              <select
                name="business_category"
                value={formData.business_category}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  validationErrors.business_category 
                    ? "border-red-500 bg-red-50" 
                    : formData.business_category 
                      ? "border-green-500 bg-green-50" 
                      : "border-gray-300"
                }`}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {validationErrors.business_category ? (
                <p className="mt-1 text-sm text-red-600">{validationErrors.business_category}</p>
              ) : (
                <p className="mt-1 text-sm text-gray-500">Choose the category that best describes your business</p>
              )}
            </div>

            {/* Firm Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Firm Address *
              </label>
              <textarea
                name="firm_address"
                value={formData.firm_address}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                rows={4}
                maxLength={500}
                className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none ${
                  validationErrors.firm_address 
                    ? "border-red-500 bg-red-50" 
                    : formData.firm_address.trim() 
                      ? "border-green-500 bg-green-50" 
                      : "border-gray-300"
                }`}
                placeholder="Enter complete business address including street, city, state, and PIN code"
              />
              <div className="flex justify-between items-center mt-1">
                {validationErrors.firm_address ? (
                  <p className="text-sm text-red-600">{validationErrors.firm_address}</p>
                ) : (
                  <p className="text-sm text-gray-500">Include street, city, state, and PIN code</p>
                )}
                <span className="text-xs text-gray-400">{formData.firm_address.length}/500</span>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  maxLength={15}
                  className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    validationErrors.phone 
                      ? "border-red-500 bg-red-50" 
                      : formData.phone.trim() && !validationErrors.phone
                        ? "border-green-500 bg-green-50" 
                        : "border-gray-300"
                  }`}
                  placeholder="987 654 3210"
                />
                <div className="flex justify-between items-center mt-1">
                  {validationErrors.phone ? (
                    <p className="text-sm text-red-600">{validationErrors.phone}</p>
                  ) : (
                    <p className="text-sm text-gray-500">Indian mobile number (6, 7, 8, or 9)</p>
                  )}
                  <span className="text-xs text-gray-400">{formData.phone.replace(/\D/g, '').length}/10</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  maxLength={100}
                  className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    validationErrors.email 
                      ? "border-red-500 bg-red-50" 
                      : formData.email.trim() && !validationErrors.email
                        ? "border-green-500 bg-green-50" 
                        : "border-gray-300"
                  }`}
                  placeholder="your@email.com"
                />
                <div className="flex justify-between items-center mt-1">
                  {validationErrors.email ? (
                    <p className="text-sm text-red-600">{validationErrors.email}</p>
                  ) : (
                    <p className="text-sm text-gray-500">We'll send approval notifications here</p>
                  )}
                  <span className="text-xs text-gray-400">{formData.email.length}/100</span>
                </div>
              </div>
            </div>

            {/* Website */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website (Optional)
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                maxLength={200}
                className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  validationErrors.website 
                    ? "border-red-500 bg-red-50" 
                    : formData.website.trim() && !validationErrors.website
                      ? "border-green-500 bg-green-50" 
                      : "border-gray-300"
                }`}
                placeholder="https://www.yourwebsite.com"
              />
              <div className="flex justify-between items-center mt-1">
                {validationErrors.website ? (
                  <p className="text-sm text-red-600">{validationErrors.website}</p>
                ) : (
                  <p className="text-sm text-gray-500">Include http:// or https://</p>
                )}
                <span className="text-xs text-gray-400">{formData.website.length}/200</span>
              </div>
            </div>

            {/* Business Photos */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Photos (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label htmlFor="photo-upload" className="cursor-pointer">
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm text-gray-600 mb-2">
                    Click to upload business photos
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 5MB each (max 5 photos)
                  </p>
                </label>
              </div>

              {/* Display uploaded photos */}
              {formData.photos.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-3">
                    Uploaded Photos ({formData.photos.length}/5)
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {formData.photos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt={`Business photo ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                        >
                          ×
                        </button>
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                            {photo.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>



            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={loading || Object.keys(validationErrors).length > 0}
                className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors disabled:cursor-not-allowed ${
                  Object.keys(validationErrors).length > 0
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700"
                } ${loading ? "opacity-50" : ""}`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Registering...
                  </div>
                ) : Object.keys(validationErrors).length > 0 ? (
                  `Fix ${Object.keys(validationErrors).length} error${Object.keys(validationErrors).length > 1 ? 's' : ''} to continue`
                ) : (
                  "Register Business"
                )}
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
