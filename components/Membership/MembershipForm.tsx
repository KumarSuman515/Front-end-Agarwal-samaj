"use client";
import React, { useState } from "react";
import axios from "axios";
import { useToast } from "@/app/context/ToastContext";

interface MembershipFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const MembershipForm: React.FC<MembershipFormProps> = ({ isOpen, onClose }) => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    membershipNumber: "",
    applicantName: "",
    wifeName: "",
    husbandIdCard: "",
    wifeIdCard: "",
    applicantDob: "",
    marriageDate: "",
    wifeDob: "",
    fatherHusbandName: "",
    gotra: "",
    resAddress: "",
    villageCity: "",
    district: "",
    state: "",
    pincode: "",
    telephone: "",
    mobileSelf: "",
    mobileWife: "",
    faxEmail: "",
    occupation: "",
    origin: "",
    corpusFund: "",
    lifeMagazineFee: "",
    membershipFee: ""
  });

  const [uploadedFiles, setUploadedFiles] = useState({
    husbandIdCard: null as File | null,
    wifeIdCard: null as File | null
  });

  const [uploadedPhotos, setUploadedPhotos] = useState({
    husbandPhoto: null as File | null,
    wifePhoto: null as File | null
  });

  const [dragStates, setDragStates] = useState({
    husbandIdCard: false,
    wifeIdCard: false,
    husbandPhoto: false,
    wifePhoto: false
  });

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // File validation function
  const validateFile = (file: File): boolean => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (!allowedTypes.includes(file.type)) {
      showToast('Please upload only PDF, JPG, or PNG files.', 'error');
      return false;
    }
    
    if (file.size > maxSize) {
      showToast('File size should not exceed 5MB.', 'error');
      return false;
    }
    
    return true;
  };

  // Photo validation function
  const validatePhoto = (file: File): boolean => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 3 * 1024 * 1024; // 3MB for photos
    
    if (!allowedTypes.includes(file.type)) {
      showToast('Please upload only JPG or PNG image files for photos.', 'error');
      return false;
    }
    
    if (file.size > maxSize) {
      showToast('Photo size should not exceed 3MB.', 'error');
      return false;
    }
    
    return true;
  };

  // Handle file upload
  const handleFileUpload = (file: File, fieldName: 'husbandIdCard' | 'wifeIdCard') => {
    if (validateFile(file)) {
      setUploadedFiles(prev => ({
        ...prev,
        [fieldName]: file
      }));
      const documentType = fieldName === 'husbandIdCard' ? "Husband's ID card" : "Wife's ID card";
      showToast(`✅ ${documentType} uploaded successfully!`, "success");
    }
  };

  // Handle photo upload
  const handlePhotoUpload = (file: File, fieldName: 'husbandPhoto' | 'wifePhoto') => {
    if (validatePhoto(file)) {
      setUploadedPhotos(prev => ({
        ...prev,
        [fieldName]: file
      }));
      const photoType = fieldName === 'husbandPhoto' ? "Husband's photo" : "Wife's photo";
      showToast(`📸 ${photoType} uploaded successfully!`, "success");
    }
  };

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent, fieldName: 'husbandIdCard' | 'wifeIdCard' | 'husbandPhoto' | 'wifePhoto') => {
    e.preventDefault();
    setDragStates(prev => ({
      ...prev,
      [fieldName]: true
    }));
  };

  const handleDragLeave = (e: React.DragEvent, fieldName: 'husbandIdCard' | 'wifeIdCard' | 'husbandPhoto' | 'wifePhoto') => {
    e.preventDefault();
    setDragStates(prev => ({
      ...prev,
      [fieldName]: false
    }));
  };

  const handleDrop = (e: React.DragEvent, fieldName: 'husbandIdCard' | 'wifeIdCard' | 'husbandPhoto' | 'wifePhoto') => {
    e.preventDefault();
    setDragStates(prev => ({
      ...prev,
      [fieldName]: false
    }));
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      if (fieldName === 'husbandIdCard' || fieldName === 'wifeIdCard') {
        handleFileUpload(files[0], fieldName);
      } else {
        handlePhotoUpload(files[0], fieldName);
      }
    }
  };

  // Handle file input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'husbandIdCard' | 'wifeIdCard') => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0], fieldName);
    }
  };

  // Handle photo input change
  const handlePhotoInputChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'husbandPhoto' | 'wifePhoto') => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handlePhotoUpload(files[0], fieldName);
    }
  };

  // Remove uploaded file
  const removeFile = (fieldName: 'husbandIdCard' | 'wifeIdCard') => {
    setUploadedFiles(prev => ({
      ...prev,
      [fieldName]: null
    }));
    const documentType = fieldName === 'husbandIdCard' ? "Husband's ID card" : "Wife's ID card";
    showToast(`🗑️ ${documentType} removed`, "info");
  };

  // Remove uploaded photo
  const removePhoto = (fieldName: 'husbandPhoto' | 'wifePhoto') => {
    setUploadedPhotos(prev => ({
      ...prev,
      [fieldName]: null
    }));
    const photoType = fieldName === 'husbandPhoto' ? "Husband's photo" : "Wife's photo";
    showToast(`🗑️ ${photoType} removed`, "info");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.membershipFee) {
      showToast("Please select a membership fee option.", "error");
      return;
    }

    if (!uploadedFiles.husbandIdCard) {
      showToast("Please upload Husband's Government ID card.", "error");
      return;
    }

    if (!uploadedPhotos.husbandPhoto) {
      showToast("Please upload Husband's photo.", "error");
      return;
    }
    
    const selectedAmount = parseInt(formData.membershipFee);
    const membershipType = selectedAmount === 21000 ? "Patron" : "Life Member";
    
    setIsLoading(true);
    
    try {
      // Create FormData for file upload
      const submitData = new FormData();
      
      // Generate membership number if not provided
      const membershipNumber = formData.membershipNumber || `MEM${Date.now()}`;
      submitData.append('membershipNumber', membershipNumber);
      
      // Add form data
      Object.keys(formData).forEach(key => {
        if (key !== 'membershipNumber') {
          submitData.append(key, formData[key as keyof typeof formData]);
        }
      });
      
      // Add files
      if (uploadedFiles.husbandIdCard) {
        submitData.append('husbandIdCard', uploadedFiles.husbandIdCard);
      }
      if (uploadedFiles.wifeIdCard) {
        submitData.append('wifeIdCard', uploadedFiles.wifeIdCard);
      }
      
      // Add photos
      if (uploadedPhotos.husbandPhoto) {
        submitData.append('husbandPhoto', uploadedPhotos.husbandPhoto);
      }
      if (uploadedPhotos.wifePhoto) {
        submitData.append('wifePhoto', uploadedPhotos.wifePhoto);
      }
      
      console.log("Submitting membership application...");
      console.log("Form data:", formData);
      console.log("Files:", uploadedFiles);
      console.log("Photos:", uploadedPhotos);
      
      // Submit to backend directly
      const response = await axios.post('http://localhost:4005/api/membership', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 300000, // 30 seconds timeout for file uploads
      });
      
      console.log("Membership created successfully:", response.data);
      
      const uploadedItems: string[] = [];
      if (uploadedFiles.husbandIdCard) uploadedItems.push(`Husband ID: ${uploadedFiles.husbandIdCard.name}`);
      if (uploadedFiles.wifeIdCard) uploadedItems.push(`Wife ID: ${uploadedFiles.wifeIdCard.name}`);
      if (uploadedPhotos.husbandPhoto) uploadedItems.push(`Husband Photo: ${uploadedPhotos.husbandPhoto.name}`);
      if (uploadedPhotos.wifePhoto) uploadedItems.push(`Wife Photo: ${uploadedPhotos.wifePhoto.name}`);
      
      // Show success toast notification
      showToast(
        `🎉 Membership application submitted successfully! Selected: ${membershipType} - Rs. ${selectedAmount.toLocaleString()}/-. Membership Number: ${response.data.membership?.membershipNumber || membershipNumber}`,
        "success"
      );
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          membershipNumber: "",
          applicantName: "",
          wifeName: "",
          husbandIdCard: "",
          wifeIdCard: "",
          applicantDob: "",
          marriageDate: "",
          wifeDob: "",
          fatherHusbandName: "",
          gotra: "",
          resAddress: "",
          villageCity: "",
          district: "",
          state: "",
          pincode: "",
          telephone: "",
          mobileSelf: "",
          mobileWife: "",
          faxEmail: "",
          occupation: "",
          origin: "",
          corpusFund: "",
          lifeMagazineFee: "",
          membershipFee: ""
        });
        setUploadedFiles({ husbandIdCard: null, wifeIdCard: null });
        setUploadedPhotos({ husbandPhoto: null, wifePhoto: null });
        onClose();
      }, 2000);
      
    } catch (error: any) {
      console.error("Error submitting membership:", error);
      
      let errorMessage = "An error occurred while submitting the membership application.";
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      // Show error toast notification
      showToast(`❌ ${errorMessage}`, "error");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6 ">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative mt-20">
        {/* Close Button - Outside Form */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-gray-800 hover:bg-gray-900 text-white rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold transition-colors"
        >
          ×
        </button>
        {/* Header */}
        <div className="bg-white p-4 rounded-t-lg border-b-2 border-gray-200 mt-4">
          <div className="flex items-start space-x-6">
            {/* Logo Section */}
            <div className="flex-shrink-0">
              <div className="w-48 h-48 bg-white  flex items-center justify-center p-1">
                <img 
                  src="/images/project image1.png" 
                  alt="Akhil Bhartiya Agrawal Sammelan Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            
            {/* Organization Details */}
            <div className="flex-1 mt-2 space-y-0">
              <h1 className="text-3xl font-bold text-blue-900 mb-3 leading-tight">
                AKHIL BHARTIYA AGRAWAL SAMMELAN
              </h1>
              
              <div className="space-y-0.5 text-sm">
                <p className="text-red-600 font-medium">
                  (Registered under Societies Registration Act 1860 vide No. 7953 dated 28 January 1976)
                </p>
                <p className="text-gray-800 font-medium">
                  83, Model Basti, East Park Road, Karol Bagh, New Delhi - 110005
                </p>
                <p className="text-gray-800 font-medium">
                  Phones : +91-11-23633333, 23550630, 45733689
                </p>
                <p className="text-gray-800 font-medium">
                  Email : agroha@gmail.com • Website : www.allagarwal.org
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full bg-red-500 h-px"></div>


        {/* Form Title */}
        <div className="flex justify-center mb-2">
          <div className="bg-pink-500 text-white px-6 py-3 rounded-lg inline-block mt-4 ">
            <h2 className="text-2xl font-bold ">APPLICATION-FORM 'K'</h2>
          </div>
        </div>
        
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-blue-900 mb-1">Application Form for Individual Membership</h3>
          <p className="text-sm text-gray-600">(Under Section 7)</p>
        </div>
        
        {/* Red Line */}
        

        {/* Form Content */}
        <div className="p-4">

          {/* Loading Message */}
          {isLoading && (
            <div className="mb-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="animate-spin h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-800 font-medium">
                    Submitting your membership application... Please wait.
                  </p>
                </div>
              </div>
            </div>
          )}
         
          

          {/* Introduction */}
          <div className="mb-8">
            <div className="flex items-start space-x-8">
              <div className="flex-1">
                <p className="mb-1 text-gray-700">To,</p>
                <p className="text-pink-600 font-medium mb-1">The General Secretary,</p>
                <p className="mb-4 text-gray-700">Dear Sir,</p>
                <p className="text-gray-700 leading-relaxed text-sm">
                  I / We want to become a Patron / Life member, Membership fee is being deposited in Cash / Cheque / Bank Draft / Bank Transfer. 
                  Please enroll me / us as a member and oblige.
                </p>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-4">Particulars:</h3>
              
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <p className="text-xs text-gray-500 mb-2">(As per Government Identity Card)</p>
                  <input
                    type="text"
                    name="applicantName"
                    value={formData.applicantName}
                    onChange={handleInputChange}
                    className="w-full border-b-2 border-dotted border-gray-400 px-2 py-1 focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name of Wife</label>
                  <p className="text-xs text-gray-500 mb-2">(As per Government Identity Card)</p>
                  <input
                    type="text"
                    name="wifeName"
                    value={formData.wifeName}
                    onChange={handleInputChange}
                    className="w-full border-b-2 border-dotted border-gray-400 px-2 py-1 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* ID Card Upload Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                {/* Husband ID Card Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Government Identity Card Upload (Husband) *
                  </label>
                  <p className="text-xs text-gray-500 mb-2">Aadhar/PAN/Passport/Driving License (PDF, JPG, PNG - Max 5MB)</p>
                  
                  {uploadedFiles.husbandIdCard ? (
                    <div className="border-2 border-green-300 bg-green-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            {uploadedFiles.husbandIdCard.type.startsWith('image/') ? (
                              <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            ) : (
                              <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                              </svg>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-green-800">{uploadedFiles.husbandIdCard.name}</p>
                            <p className="text-xs text-green-600">{(uploadedFiles.husbandIdCard.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile('husbandIdCard')}
                          className="text-red-600 hover:text-red-800 transition-colors"
                        >
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                        dragStates.husbandIdCard
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      onDragOver={(e) => handleDragOver(e, 'husbandIdCard')}
                      onDragLeave={(e) => handleDragLeave(e, 'husbandIdCard')}
                      onDrop={(e) => handleDrop(e, 'husbandIdCard')}
                    >
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="mt-4">
                        <label htmlFor="husbandIdCard" className="cursor-pointer">
                          <span className="mt-2 block text-sm font-medium text-gray-900">
                            Click to upload or drag and drop
                          </span>
                          <span className="mt-1 block text-xs text-gray-500">
                            PDF, JPG, PNG up to 5MB
                          </span>
                  </label>
                  <input
                          id="husbandIdCard"
                    name="husbandIdCard"
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileInputChange(e, 'husbandIdCard')}
                          className="sr-only"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Wife ID Card Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Government Identity Card Upload (Wife)
                  </label>
                  <p className="text-xs text-gray-500 mb-2">Aadhar/PAN/Passport/Driving License (PDF, JPG, PNG - Max 5MB)</p>
                  
                  {uploadedFiles.wifeIdCard ? (
                    <div className="border-2 border-green-300 bg-green-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            {uploadedFiles.wifeIdCard.type.startsWith('image/') ? (
                              <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            ) : (
                              <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                              </svg>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-green-800">{uploadedFiles.wifeIdCard.name}</p>
                            <p className="text-xs text-green-600">{(uploadedFiles.wifeIdCard.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile('wifeIdCard')}
                          className="text-red-600 hover:text-red-800 transition-colors"
                        >
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                        dragStates.wifeIdCard
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      onDragOver={(e) => handleDragOver(e, 'wifeIdCard')}
                      onDragLeave={(e) => handleDragLeave(e, 'wifeIdCard')}
                      onDrop={(e) => handleDrop(e, 'wifeIdCard')}
                    >
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="mt-4">
                        <label htmlFor="wifeIdCard" className="cursor-pointer">
                          <span className="mt-2 block text-sm font-medium text-gray-900">
                            Click to upload or drag and drop
                          </span>
                          <span className="mt-1 block text-xs text-gray-500">
                            PDF, JPG, PNG up to 5MB
                          </span>
                        </label>
                  <input
                          id="wifeIdCard"
                    name="wifeIdCard"
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileInputChange(e, 'wifeIdCard')}
                          className="sr-only"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Photo Upload Fields */}
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-4">Membership Photos:</h3>
                <p className="text-sm text-gray-600 mb-4">Please upload 2 colour photographs each of you and your wife (Please do not staple)</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Husband Photo Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Husband's Photo *
                    </label>
                    <p className="text-xs text-gray-500 mb-2">JPG, PNG - Max 3MB</p>
                    
                    {uploadedPhotos.husbandPhoto ? (
                      <div className="border-2 border-green-300 bg-green-50 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              <img
                                src={URL.createObjectURL(uploadedPhotos.husbandPhoto)}
                                alt="Husband Photo Preview"
                                className="w-16 h-16 object-cover rounded-lg border-2 border-green-300"
                              />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-green-800">{uploadedPhotos.husbandPhoto.name}</p>
                              <p className="text-xs text-green-600">{(uploadedPhotos.husbandPhoto.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removePhoto('husbandPhoto')}
                            className="text-red-600 hover:text-red-800 transition-colors"
                          >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                          dragStates.husbandPhoto
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        onDragOver={(e) => handleDragOver(e, 'husbandPhoto')}
                        onDragLeave={(e) => handleDragLeave(e, 'husbandPhoto')}
                        onDrop={(e) => handleDrop(e, 'husbandPhoto')}
                      >
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="mt-4">
                          <label htmlFor="husbandPhoto" className="cursor-pointer">
                            <span className="mt-2 block text-sm font-medium text-gray-900">
                              Click to upload or drag and drop
                            </span>
                            <span className="mt-1 block text-xs text-gray-500">
                              JPG, PNG up to 3MB
                            </span>
                          </label>
                          <input
                            id="husbandPhoto"
                            name="husbandPhoto"
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            onChange={(e) => handlePhotoInputChange(e, 'husbandPhoto')}
                            className="sr-only"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Wife Photo Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Wife's Photo
                    </label>
                    <p className="text-xs text-gray-500 mb-2">JPG, PNG - Max 3MB</p>
                    
                    {uploadedPhotos.wifePhoto ? (
                      <div className="border-2 border-green-300 bg-green-50 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              <img
                                src={URL.createObjectURL(uploadedPhotos.wifePhoto)}
                                alt="Wife Photo Preview"
                                className="w-16 h-16 object-cover rounded-lg border-2 border-green-300"
                              />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-green-800">{uploadedPhotos.wifePhoto.name}</p>
                              <p className="text-xs text-green-600">{(uploadedPhotos.wifePhoto.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removePhoto('wifePhoto')}
                            className="text-red-600 hover:text-red-800 transition-colors"
                          >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                          dragStates.wifePhoto
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        onDragOver={(e) => handleDragOver(e, 'wifePhoto')}
                        onDragLeave={(e) => handleDragLeave(e, 'wifePhoto')}
                        onDrop={(e) => handleDrop(e, 'wifePhoto')}
                      >
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="mt-4">
                          <label htmlFor="wifePhoto" className="cursor-pointer">
                            <span className="mt-2 block text-sm font-medium text-gray-900">
                              Click to upload or drag and drop
                            </span>
                            <span className="mt-1 block text-xs text-gray-500">
                              JPG, PNG up to 3MB
                            </span>
                          </label>
                          <input
                            id="wifePhoto"
                            name="wifePhoto"
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            onChange={(e) => handlePhotoInputChange(e, 'wifePhoto')}
                            className="sr-only"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Date Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dt. of Birth (DoB)</label>
                  <input
                    type="date"
                    name="applicantDob"
                    value={formData.applicantDob}
                    onChange={handleInputChange}
                    className="w-full border-b-2 border-dotted border-gray-400 px-2 py-1 focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dt. of Marriage</label>
                  <input
                    type="date"
                    name="marriageDate"
                    value={formData.marriageDate}
                    onChange={handleInputChange}
                    className="w-full border-b-2 border-dotted border-gray-400 px-2 py-1 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">DoB of Wife</label>
                  <input
                    type="date"
                    name="wifeDob"
                    value={formData.wifeDob}
                    onChange={handleInputChange}
                    className="w-full border-b-2 border-dotted border-gray-400 px-2 py-1 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Father/Husband Name and Gotra */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Father / Husband Name</label>
                  <input
                    type="text"
                    name="fatherHusbandName"
                    value={formData.fatherHusbandName}
                    onChange={handleInputChange}
                    className="w-full border-b-2 border-dotted border-gray-400 px-2 py-1 focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gotra</label>
                  <input
                    type="text"
                    name="gotra"
                    value={formData.gotra}
                    onChange={handleInputChange}
                    className="w-full border-b-2 border-dotted border-gray-400 px-2 py-1 focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Address Information */}
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-4">Address & Contact Information:</h3>
                
                {/* Residential Address */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Res. Address</label>
                  <input
                    type="text"
                    name="resAddress"
                    value={formData.resAddress}
                    onChange={handleInputChange}
                    className="w-full border-b-2 border-dotted border-gray-400 px-2 py-1 focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>

                {/* Village/City, District, State, Pincode */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Village / City</label>
                    <input
                      type="text"
                      name="villageCity"
                      value={formData.villageCity}
                      onChange={handleInputChange}
                      className="w-full border-b-2 border-dotted border-gray-400 px-2 py-1 focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Distt.</label>
                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      className="w-full border-b-2 border-dotted border-gray-400 px-2 py-1 focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full border-b-2 border-dotted border-gray-400 px-2 py-1 focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full border-b-2 border-dotted border-gray-400 px-2 py-1 focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tel. (STD Code)</label>
                    <input
                      type="tel"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleInputChange}
                      className="w-full border-b-2 border-dotted border-gray-400 px-2 py-1 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mob.(Self)</label>
                    <input
                      type="tel"
                      name="mobileSelf"
                      value={formData.mobileSelf}
                      onChange={handleInputChange}
                      className="w-full border-b-2 border-dotted border-gray-400 px-2 py-1 focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mob.(Wife)</label>
                    <input
                      type="tel"
                      name="mobileWife"
                      value={formData.mobileWife}
                      onChange={handleInputChange}
                      className="w-full border-b-2 border-dotted border-gray-400 px-2 py-1 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Fax/Email */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fax / E-mail</label>
                  <input
                    type="text"
                    name="faxEmail"
                    value={formData.faxEmail}
                    onChange={handleInputChange}
                    className="w-full border-b-2 border-dotted border-gray-400 px-2 py-1 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                {/* Occupation and Origin */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Occupation (Details)</label>
                    <input
                      type="text"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleInputChange}
                      className="w-full border-b-2 border-dotted border-gray-400 px-2 py-1 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Origin</label>
                    <input
                      type="text"
                      name="origin"
                      value={formData.origin}
                      onChange={handleInputChange}
                      className="w-full border-b-2 border-dotted border-gray-400 px-2 py-1 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Membership Fee Selection */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="text-lg font-bold mb-4 text-blue-900">Membership Fee (with Wife):</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="patron"
                      name="membershipFee"
                      value="21000"
                      checked={formData.membershipFee === "21000"}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                      required
                    />
                    <label htmlFor="patron" className="ml-3 text-sm font-medium text-gray-900">
                      <span className="text-lg font-semibold text-blue-800">Patron Fee Rs. 21,000/-</span>
                      <span className="block text-sm text-gray-600">Premium membership with all benefits</span>
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="lifeMember"
                      name="membershipFee"
                      value="5100"
                      checked={formData.membershipFee === "5100"}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="lifeMember" className="ml-3 text-sm font-medium text-gray-900">
                      <span className="text-lg font-semibold text-blue-800">Life Member Fee Rs. 5,100/-</span>
                      <span className="block text-sm text-gray-600">Lifetime membership with core benefits</span>
                    </label>
                  </div>
                </div>
                
                {formData.membershipFee && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">
                      <span className="font-semibold">Selected Amount: </span>
                      Rs. {parseInt(formData.membershipFee).toLocaleString()}/-
                    </p>
                  </div>
                )}
              </div>

              {/* Declaration Section */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-bold mb-4">Declaration:</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  I / We am / are agreeing to the aims, vows to abide rules and regulations and assure you a helping hand whenever needed by Sammelan, and Rs. 
                  <input
                    type="number"
                    name="corpusFund"
                    value={formData.corpusFund}
                    onChange={handleInputChange}
                    className="inline-block w-24 mx-2 border-b-2 border-dotted border-gray-400 px-2 py-1 focus:border-blue-500 focus:outline-none text-center"
                    placeholder="0"
                  />
                  are giving as a Corpus Fund and Rs. 
                  <input
                    type="number"
                    name="lifeMagazineFee"
                    value={formData.lifeMagazineFee}
                    onChange={handleInputChange}
                    className="inline-block w-24 mx-2 border-b-2 border-dotted border-gray-400 px-2 py-1 focus:border-blue-500 focus:outline-none text-center"
                    placeholder="0"
                  />
                  as a Life Magazine Fee.
                </p>
              </div>
            </div>

            {/* Footer Note */}
            <div className="mt-8 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-800 font-medium">
                    <span className="font-bold">Note:</span> It is mandatory to upload Government I.D. card (Husband's ID is required, Wife's ID is optional) and Husband's photo (Wife's photo is optional). 
                    <br />• ID Cards: PDF, JPG, PNG (Max 5MB each)
                    <br />• Photos: JPG, PNG (Max 3MB each)
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`px-6 py-2 rounded-lg transition-all duration-300 shadow-lg ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 transform hover:scale-105'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </div>
                ) : (
                  'Submit Application'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MembershipForm;
