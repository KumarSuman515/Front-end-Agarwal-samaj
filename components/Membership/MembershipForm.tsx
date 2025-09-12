"use client";
import React, { useState } from "react";

interface MembershipFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const MembershipForm: React.FC<MembershipFormProps> = ({ isOpen, onClose }) => {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.membershipFee) {
      alert("Please select a membership fee option.");
      return;
    }
    
    const selectedAmount = parseInt(formData.membershipFee);
    const membershipType = selectedAmount === 21000 ? "Patron" : "Life Member";
    
    console.log("Form submitted:", formData);
    console.log(`Selected: ${membershipType} - Rs. ${selectedAmount.toLocaleString()}/-`);
    
    // Here you would typically send the data to your backend
    alert(`Membership application submitted successfully!\nSelected: ${membershipType} - Rs. ${selectedAmount.toLocaleString()}/-`);
    onClose();
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
        <div className="bg-white p-4 rounded-t-lg border-b-2 border-gray-200">
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
            <div className="flex-1 mt-6">
              <h1 className="text-3xl font-bold text-blue-900 mb-3 leading-tight">
                AKHIL BHARTIYA AGRAWAL SAMMELAN
              </h1>
              
              <div className="space-y-1 text-sm">
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
        <div className="w-full bg-red-500 mb-4" style={{height: "1px"}}></div>
        {/* Form Title */}
        <div className="flex justify-center mb-4">
          <div className="bg-pink-500 text-white px-6 py-3 rounded-lg inline-block">
            <h2 className="text-2xl font-bold">APPLICATION-FORM 'K'</h2>
          </div>
        </div>
        
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-blue-900 mb-1">Application Form for Individual Membership</h3>
          <p className="text-sm text-gray-600">(Under Section 7)</p>
        </div>
        
        {/* Red Line */}
        

        {/* Form Content */}
        <div className="p-6">
          {/* Membership Number and Photo Instructions */}
          {/* <div className="flex justify-end mb-6">
            <div className="bg-pink-50 border border-pink-300 p-4 rounded-lg w-72">
              <div className="text-center mb-3">
                <label className="block text-sm text-pink-600 font-medium mb-2">Membership Number</label>
                <input
                  type="text"
                  name="membershipNumber"
                  value={formData.membershipNumber}
                  onChange={handleInputChange}
                  className="w-full border border-pink-300 rounded px-3 py-2 text-center font-medium"
                  placeholder="Auto-generated"
                />
              </div>
              <p className="text-xs text-pink-600 text-center leading-relaxed">
                Please attach 2 colour photographs each of you and your wife (Please do not staple)
              </p>
            </div>
          </div> */}

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

              {/* ID Card Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Government Identity Card:- Aadhar/PAN/Passport/Driving License No. (Hus.)
                  </label>
                  <input
                    type="text"
                    name="husbandIdCard"
                    value={formData.husbandIdCard}
                    onChange={handleInputChange}
                    className="w-full border-b-2 border-dotted border-gray-400 px-2 py-1 focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">(Wife)</label>
                  <input
                    type="text"
                    name="wifeIdCard"
                    value={formData.wifeIdCard}
                    onChange={handleInputChange}
                    className="w-full border-b-2 border-dotted border-gray-400 px-2 py-1 focus:border-blue-500 focus:outline-none"
                  />
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
                    <span className="font-bold">Note:</span> It is mandatory to attach photocopy of Govt. I.D. card with this Form.
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
                className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MembershipForm;
