"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import axios from "axios";
// import ToastProvider from "@/app/context/ToastContext";

type CreateProfileProps = {
  onClose: () => void;
  onSave?: (profile: any) => void;
};

interface ValidationErrors {
  [key: string]: string;
}

const CreateProfile = ({ onClose, onSave }: CreateProfileProps) => {
  // Toggle file upload when backend field names are confirmed
  const ENABLE_FILE_UPLOAD = true;
  const [formData, setFormData] = useState({
    // Candidate Details
    candidateName: "",
    candidateDOB: "",
    birthPlace: "",
    gender: "",
    manglik: "",
    gotra: "",
    maternalGotra: "",
    
    // Family Details
    fatherName: "",
    fatherMobile: "",
    fatherOccupation: "",
    fatherIncome: "",
    motherName: "",
    motherOccupation: "",
    grandFather: "",
    nativePlace: "",
    nationality: "",
    familyStatus: "",
    address: "",
    country: "India",
    state: "",
    district: "",
    pinCode: "",
    phone: "",
    contactNo: "",
    email: "",
    
    // Personal Details
    height: "",
    bodyType: "",
    complexion: "",
    bloodGroup: "",
    educationDetail: "",
    education: "",
    hobby: "",
    occupation: "",
    designation: "",
    annualIncome: "",
    companyName: "",
    companyCity: "",
    
    // Sibling Details
    unmarriedBrothers: "",
    unmarriedSisters: "",
    marriedBrothers: "",
    marriedSisters: "",
    
    // Relative Details
    relation: "",
    relativeName: "",
    relativeMobile: "",
    relativeCity: "",
    relativeCompany: "",
    relativeDesignation: "",
    relativeAddress: "",
    
    // Other Information
    kundaliMilana: "",
    aboutMe: "",
    
    // Photos
    profilePhoto: null as File | null,
    additionalPhotos: [] as File[],
    
    // Terms
    acceptTerms: false,
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;
  const [mounted, setMounted] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"error" | "success">("error");

  useEffect(() => {
    setMounted(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Show toast notification
  const showToastNotification = (message: string, type: "error" | "success" = "error") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  // Validation functions
  const validateStep1 = (): boolean => {
    const errors: ValidationErrors = {};
    
    if (!formData.candidateName.trim()) {
      errors.candidateName = "Candidate name is required";
    } else if (!/^[A-Za-z\s]+$/.test(formData.candidateName)) {
      errors.candidateName = "Candidate name must contain only letters";
    }
    
    if (!formData.candidateDOB) {
      errors.candidateDOB = "Date of birth is required";
    } else {
      const age = calculateAge(formData.candidateDOB);
      if (age < 18 || age > 80) {
        errors.candidateDOB = "Age must be between 18 and 80 years";
      }
    }
    
    if (!formData.birthPlace.trim()) {
      errors.birthPlace = "Birth place is required";
    } else if (!/^[A-Za-z\s]+$/.test(formData.birthPlace)) {
      errors.birthPlace = "Birth place must contain only letters";
    }
    
    if (!formData.gender) {
      errors.gender = "Gender is required";
    }
    
    if (!formData.manglik) {
      errors.manglik = "Manglik status is required";
    }
    
    if (!formData.gotra.trim()) {
      errors.gotra = "Gotra is required";
    } else if (!/^[A-Za-z\s]+$/.test(formData.gotra)) {
      errors.gotra = "Gotra must contain only letters";
    }
    
    if (!formData.maternalGotra.trim()) {
      errors.maternalGotra = "Maternal gotra is required";
    } else if (!/^[A-Za-z\s]+$/.test(formData.maternalGotra)) {
      errors.maternalGotra = "Maternal gotra must contain only letters";
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const errors: ValidationErrors = {};
    
    if (!formData.fatherName.trim()) {
      errors.fatherName = "Father's name is required";
    } else if (!/^[A-Za-z\s]+$/.test(formData.fatherName)) {
      errors.fatherName = "Father's name must contain only letters";
    }
    
    if (!formData.fatherMobile.trim()) {
      errors.fatherMobile = "Father's mobile is required";
    } else if (!/^[0-9]{10}$/.test(formData.fatherMobile)) {
      errors.fatherMobile = "Please enter a valid 10-digit mobile number";
    }
    
    if (formData.fatherOccupation && !/^[A-Za-z\s]+$/.test(formData.fatherOccupation)) {
      errors.fatherOccupation = "Father's occupation must contain only letters";
    }
    
    if (formData.fatherIncome && !/^[0-9]+$/.test(formData.fatherIncome)) {
      errors.fatherIncome = "Please enter a valid number for income";
    }
    
    if (formData.motherName && !/^[A-Za-z\s]+$/.test(formData.motherName)) {
      errors.motherName = "Mother's name must contain only letters";
    }
    
    if (formData.motherOccupation && !/^[A-Za-z\s]+$/.test(formData.motherOccupation)) {
      errors.motherOccupation = "Mother's occupation must contain only letters";
    }
    
    if (formData.grandFather && !/^[A-Za-z\s]+$/.test(formData.grandFather)) {
      errors.grandFather = "Grand father's name must contain only letters";
    }
    
    if (formData.nativePlace && !/^[A-Za-z\s]+$/.test(formData.nativePlace)) {
      errors.nativePlace = "Native place must contain only letters";
    }
    
    if (formData.nationality && !/^[A-Za-z\s]+$/.test(formData.nationality)) {
      errors.nationality = "Nationality must contain only letters";
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep3 = (): boolean => {
    const errors: ValidationErrors = {};
    
    if (!formData.state) {
      errors.state = "State is required";
    }
    
    if (formData.district && !/^[A-Za-z\s]+$/.test(formData.district)) {
      errors.district = "District must contain only letters";
    }
    
    if (formData.pinCode && !/^[0-9]{6}$/.test(formData.pinCode)) {
      errors.pinCode = "Please enter a valid 6-digit PIN code";
    }
    
    if (formData.phone && !/^[0-9]{10}$/.test(formData.phone)) {
      errors.phone = "Please enter a valid 10-digit phone number";
    }
    
    if (!formData.contactNo.trim()) {
      errors.contactNo = "Contact number is required";
    } else if (!/^[0-9]{10}$/.test(formData.contactNo)) {
      errors.contactNo = "Please enter a valid 10-digit contact number";
    }
    
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep4 = (): boolean => {
    const errors: ValidationErrors = {};
    
    if (!formData.height) {
      errors.height = "Height is required";
    }
    
    if (!formData.bodyType) {
      errors.bodyType = "Body type is required";
    }
    
    if (!formData.complexion) {
      errors.complexion = "Complexion is required";
    }
    
    if (!formData.bloodGroup) {
      errors.bloodGroup = "Blood group is required";
    }
    
    if (formData.educationDetail && !/^[A-Za-z\s]+$/.test(formData.educationDetail)) {
      errors.educationDetail = "Education detail must contain only letters";
    }
    
    if (!formData.education) {
      errors.education = "Education is required";
    }
    
    if (formData.hobby && !/^[A-Za-z\s]+$/.test(formData.hobby)) {
      errors.hobby = "Hobby must contain only letters";
    }
    
    if (!formData.occupation.trim()) {
      errors.occupation = "Occupation is required";
    } else if (!/^[A-Za-z\s]+$/.test(formData.occupation)) {
      errors.occupation = "Occupation must contain only letters";
    }
    
    if (formData.designation && !/^[A-Za-z\s]+$/.test(formData.designation)) {
      errors.designation = "Designation must contain only letters";
    }
    
    if (formData.annualIncome && !/^[0-9]+$/.test(formData.annualIncome)) {
      errors.annualIncome = "Please enter a valid number for annual income";
    }
    
    if (formData.companyName && !/^[A-Za-z\s]+$/.test(formData.companyName)) {
      errors.companyName = "Company name must contain only letters";
    }
    
    if (formData.companyCity && !/^[A-Za-z\s]+$/.test(formData.companyCity)) {
      errors.companyCity = "Company city must contain only letters";
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep5 = (): boolean => {
    const errors: ValidationErrors = {};
    
    // Validate numeric fields
    const numericFields = [
      'unmarriedBrothers', 'unmarriedSisters', 
      'marriedBrothers', 'marriedSisters'
    ];
    
    numericFields.forEach(field => {
      if (formData[field as keyof typeof formData] && 
          !/^[0-9]+$/.test(String(formData[field as keyof typeof formData]))) {
        errors[field] = "Please enter a valid number";
      }
    });
    
    if (formData.relation && !/^[A-Za-z\s]+$/.test(formData.relation)) {
      errors.relation = "Relation must contain only letters";
    }
    
    if (formData.relativeName && !/^[A-Za-z\s]+$/.test(formData.relativeName)) {
      errors.relativeName = "Relative name must contain only letters";
    }
    
    if (formData.relativeMobile && !/^[0-9]{10}$/.test(formData.relativeMobile)) {
      errors.relativeMobile = "Please enter a valid 10-digit mobile number";
    }
    
    if (formData.relativeCity && !/^[A-Za-z\s]+$/.test(formData.relativeCity)) {
      errors.relativeCity = "Relative city must contain only letters";
    }
    
    if (formData.relativeCompany && !/^[A-Za-z\s]+$/.test(formData.relativeCompany)) {
      errors.relativeCompany = "Relative company must contain only letters";
    }
    
    if (formData.relativeDesignation && !/^[A-Za-z\s]+$/.test(formData.relativeDesignation)) {
      errors.relativeDesignation = "Relative designation must contain only letters";
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep6 = (): boolean => {
    const errors: ValidationErrors = {};
    
    if (!formData.aboutMe.trim()) {
      errors.aboutMe = "About me is required";
    }
    
    if (!formData.profilePhoto) {
      errors.profilePhoto = "Profile photo is required";
    }
    
    if (!formData.acceptTerms) {
      errors.acceptTerms = "You must accept the terms and conditions";
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case 1: return validateStep1();
      case 2: return validateStep2();
      case 3: return validateStep3();
      case 4: return validateStep4();
      case 5: return validateStep5();
      case 6: return validateStep6();
      default: return true;
    }
  };

  // Validate all steps before final submission
  const validateAllSteps = (): boolean => {
    const validators = [
      validateStep1,
      validateStep2,
      validateStep3,
      validateStep4,
      validateStep5,
      validateStep6,
    ];

    const combinedErrors: ValidationErrors = {};
    // Run each validator, but collect their errors without early exit
    validators.forEach((fn) => {
      const prevErrors = { ...validationErrors };
      const isValid = fn();
      if (!isValid) {
        Object.assign(combinedErrors, validationErrors);
      }
      // Restore previous errors to avoid wiping when running next validator
      setValidationErrors(prevErrors);
    });

    if (Object.keys(combinedErrors).length > 0) {
      setValidationErrors(combinedErrors);
      return false;
    }
    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      if (name === "profilePhoto") {
        setFormData(prev => ({
          ...prev,
          [name]: files[0]
        }));
      } else if (name === "additionalPhotos") {
        setFormData(prev => ({
          ...prev,
          [name]: Array.from(files)
        }));
      }
    }
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const calculateAge = (dob: string) => {
    if (!dob) return 0;
    const birth = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // On final submit, validate all steps to avoid backend 400s
    if (!validateAllSteps()) {
      showToastNotification("Please fill all required fields correctly", "error");
      return;
    }
  
    try {
      const multipart = new FormData();
  
      const toString = (v: unknown) => (v === null || v === undefined ? "" : String(v));
      const toInt = (v: unknown) => {
        if (!v || v === "") return "0";
        const n = parseInt(String(v), 10);
        return Number.isFinite(n) ? String(n) : "0";
      };
      const toBool = (v: unknown) => v ? "1" : "0";
  
      // ---------------- Personal Info ----------------
      multipart.append("name", toString(formData.candidateName));
      multipart.append("dob", toString(formData.candidateDOB));
      multipart.append("birth_place", toString(formData.birthPlace));
      multipart.append("candidate_gender", toString(formData.gender));
      multipart.append("manglik", toString(formData.manglik));
      multipart.append("gotra", toString(formData.gotra));
      multipart.append("maternal_gotra", toString(formData.maternalGotra));
  
      // ---------------- Family Info ----------------
      multipart.append("father_name", toString(formData.fatherName));
      multipart.append("father_mobile", toString(formData.fatherMobile));
      multipart.append("father_occupation", toString(formData.fatherOccupation));
      multipart.append("father_annual_income", toInt(formData.fatherIncome));
      multipart.append("mother_name", toString(formData.motherName));
      multipart.append("mother_occupation", toString(formData.motherOccupation));
      multipart.append("grandfather", toString(formData.grandFather));
      multipart.append("native_place", toString(formData.nativePlace));
      multipart.append("nationality", toString(formData.nationality));
      multipart.append("status_of_family", toString(formData.familyStatus));
  
      // ---------------- Address & Contact ----------------
      multipart.append("address", toString(formData.address));
      multipart.append("country", toString(formData.country));
      multipart.append("state", toString(formData.state));
      multipart.append("district", toString(formData.district));
      multipart.append("pin_code", toString(formData.pinCode));
      multipart.append("phone", toString(formData.phone));
      multipart.append("contact_no", toString(formData.contactNo));
      multipart.append("email", toString(formData.email));
  
      // ---------------- Physical Details ----------------
      multipart.append("height", toString(formData.height));
      multipart.append("body_type", toString(formData.bodyType));
      multipart.append("complexion", toString(formData.complexion));
      multipart.append("blood_group", toString(formData.bloodGroup));
  
      // ---------------- Education & Profession ----------------
      multipart.append("education_detail", toString(formData.educationDetail));
      multipart.append("education", toString(formData.education));
      multipart.append("hobby", toString(formData.hobby));
      multipart.append("occupation", toString(formData.occupation));
      multipart.append("designation", toString(formData.designation));
      multipart.append("annual_income", toInt(formData.annualIncome));
      multipart.append("company_name", toString(formData.companyName));
      multipart.append("company_city", toString(formData.companyCity));
  
      // ---------------- Sibling Info ----------------
      multipart.append("no_unmarried_brother", toInt(formData.unmarriedBrothers));
      multipart.append("no_unmarried_sister", toInt(formData.unmarriedSisters));
      multipart.append("no_married_brother", toInt(formData.marriedBrothers));
      multipart.append("no_married_sister", toInt(formData.marriedSisters));
  
      // ---------------- Relative Info ----------------
      multipart.append("relation", toString(formData.relation));
      multipart.append("relative_name", toString(formData.relativeName));
      multipart.append("relative_mobile_no", toString(formData.relativeMobile));
      multipart.append("relative_city", toString(formData.relativeCity));
      multipart.append("relative_company_name", toString(formData.relativeCompany));
      multipart.append("relative_designation", toString(formData.relativeDesignation));
      multipart.append("relative_company_address", toString(formData.relativeAddress));
  
      // ---------------- Extra ----------------
      multipart.append("kundali_milana", toString(formData.kundaliMilana));
      multipart.append("about_me", toString(formData.aboutMe));
  
      // Handle profile photo
        if (formData.profilePhoto instanceof File) {
        if (ENABLE_FILE_UPLOAD) {
          multipart.append("profilePhoto", formData.profilePhoto);
        }
        // Don't append image_path as a separate field - let the backend handle it
      } else {
        // If no photo uploaded, set a default
        multipart.append("image_path", "default-profile.jpg");
      }
      
      multipart.append("subscription", toBool(formData.acceptTerms));
  
      // ---------------- Additional Photos (optional) ----------------
      if (ENABLE_FILE_UPLOAD && formData.additionalPhotos.length > 0) {
        formData.additionalPhotos.forEach((file, index) => {
          if (file instanceof File) {
            multipart.append("additionalPhotos", file);
          }
        });
      }
  
      // ---------------- Debug Preview ----------------
      const previewPayload: Record<string, unknown> = {};
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "profilePhoto") previewPayload[key] = value instanceof File ? value.name : null;
        else if (key === "additionalPhotos") previewPayload[key] = Array.isArray(value) ? value.map(f => (f instanceof File ? f.name : String(f))) : [];
        else previewPayload[key] = value;
      });
      console.log("[Matrimony] Submitting candidate payload →", previewPayload);
  
      // ---------------- API Request ----------------
      console.log("Sending request to:", "http://localhost:4005/api/candidates");
      console.log("Form data being sent:", Object.fromEntries(multipart.entries()));
      
      const response = await axios.post("http://localhost:4005/api/candidates", multipart, {
         timeout: 30000, // 30 second timeout
       });
      
      console.log("Response received:", response);
      const created = await response?.data ?? null;

      if (!response || response.status < 200 || response.status >= 300 || !created) {
        showToastNotification("Profile save failed: Check server logs.", "error");
        return;
      }

      // Success handling with duplicate detection (email/contact already exists)
      if (response.status === 200 && created?.message && String(created.message).toLowerCase().includes("already existed")) {
        showToastNotification(`Profile already exists; updated successfully. Record ID: ${created.id ?? created?.candidate?.id ?? "N/A"}`, "success");
      } else if (response.status === 201) {
        // Show a simple green toast for successful account creation
        showToastNotification("Your account is created successfully", "success");
      } else {
        showToastNotification(`Profile saved successfully! Record ID: ${created.id ?? created?.candidate?.id ?? "N/A"}`, "success");
      }
      if (onSave) onSave(created);
      onClose();
  
    } catch (error: any) {
      console.error("Failed to create profile", error);
      
      // Handle specific error cases
      if (error.code === 'ECONNABORTED') {
        showToastNotification("Request timeout. Please try again.", "error");
        return;
      }
      
      if (error.response) {
        // Server responded with error status
        const serverData = error.response.data;
        let errorMessage = "Profile creation failed.";

        // Map server validation errors to client fields and surface inline
        const fieldMap: Record<string, keyof typeof formData> = {
          // Personal Info
          name: "candidateName",
          dob: "candidateDOB",
          birth_place: "birthPlace",
          candidate_gender: "gender",
          manglik: "manglik",
          gotra: "gotra",
          maternal_gotra: "maternalGotra",
          // Family Info
          father_name: "fatherName",
          father_mobile: "fatherMobile",
          father_occupation: "fatherOccupation",
          father_annual_income: "fatherIncome",
          mother_name: "motherName",
          mother_occupation: "motherOccupation",
          grandfather: "grandFather",
          native_place: "nativePlace",
          nationality: "nationality",
          status_of_family: "familyStatus",
          // Address & Contact
          address: "address",
          country: "country",
          state: "state",
          district: "district",
          pin_code: "pinCode",
          phone: "phone",
          contact_no: "contactNo",
          email: "email",
          // Physical Details
          height: "height",
          body_type: "bodyType",
          complexion: "complexion",
          blood_group: "bloodGroup",
          // Education & Profession
          education_detail: "educationDetail",
          education: "education",
          hobby: "hobby",
          occupation: "occupation",
          designation: "designation",
          annual_income: "annualIncome",
          company_name: "companyName",
          company_city: "companyCity",
          // Siblings
          no_unmarried_brother: "unmarriedBrothers",
          no_unmarried_sister: "unmarriedSisters",
          no_married_brother: "marriedBrothers",
          no_married_sister: "marriedSisters",
          // Relatives
          relation: "relation",
          relative_name: "relativeName",
          relative_mobile_no: "relativeMobile",
          relative_city: "relativeCity",
          relative_company_name: "relativeCompany",
          relative_designation: "relativeDesignation",
          relative_company_address: "relativeAddress",
          // Extra
          kundali_milana: "kundaliMilana",
          about_me: "aboutMe",
        };

        if (serverData && serverData.error) {
          errorMessage = serverData.error;
        } else if (serverData && serverData.message) {
          errorMessage = serverData.message;
        } else if (serverData && Array.isArray(serverData)) {
          // Handle validation errors array
          const serverErrors = serverData as Array<{ path: string; msg: string }>;
          const mapped: ValidationErrors = {};
          serverErrors.forEach((err) => {
            const clientKey = fieldMap[err.path];
            if (clientKey) mapped[clientKey as string] = err.msg;
          });
          if (Object.keys(mapped).length > 0) setValidationErrors(mapped);
          const first = serverErrors[0];
          errorMessage = first ? `${first.path}: ${first.msg}` : "Validation failed";
        }
        
        showToastNotification(errorMessage, "error");
      } else if (error.request) {
        // Network error
        showToastNotification("Network error. Please check your connection and try again.", "error");
      } else {
        // Other error
        showToastNotification(error?.message || "Failed to create profile. Please try again.", "error");
      }
    }
  };
  

  const nextStep = () => {
    if (validateCurrentStep()) {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
        setValidationErrors({});
      }
    } else {
      showToastNotification("Please fill all required fields correctly", "error");
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setValidationErrors({});
    }
  };

  // Helper function to render input with validation
  const renderInput = (
    name: keyof typeof formData,
    label: string,
    type: string = "text",
    placeholder: string = "",
    required: boolean = false,
    options?: { value: string; label: string }[]
  ) => {
    const hasError = validationErrors[name];
    const value = formData[name];
    
    return (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
          </label>
        {type === "select" ? (
          <select
            name={name}
            value={String(value)}
            onChange={handleInputChange}
            className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 ${
              hasError ? 'border-red-500' : 'border-gray-300'
            }`}
            required={required}
          >
            <option value="">Select</option>
            {options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : type === "textarea" ? (
          <textarea
            name={name}
            value={String(value)}
            onChange={handleInputChange}
            rows={4}
            className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 ${
              hasError ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder={placeholder}
            required={required}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={String(value)}
            onChange={handleInputChange}
            className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 ${
              hasError ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder={placeholder}
            required={required}
          />
        )}
        {hasError && (
          <p className="text-red-500 text-sm mt-1">{hasError}</p>
        )}
        </div>
    );
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Candidate Details</h3>
        <p className="text-gray-600">Basic information about the candidate</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderInput("candidateName", "Candidate Name", "text", "Enter Candidate Name", true)}
        {renderInput("candidateDOB", "Date of Birth", "date", "", true)}
        </div>
        
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderInput("birthPlace", "Birth Place", "text", "Enter Birth Place", true)}
        {renderInput("gender", "Gender", "select", "", true, [
          { value: "male", label: "Male" },
          { value: "female", label: "Female" }
        ])}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {renderInput("manglik", "Manglik", "select", "", true, [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" }
        ])}
        {renderInput("gotra", "Gotra", "text", "Enter Gotra", true)}
        {renderInput("maternalGotra", "Maternal Gotra", "text", "Enter Maternal Gotra", true)}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Family Details</h3>
        <p className="text-gray-600">Information about the candidate's family</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderInput("fatherName", "Father's Name", "text", "Father's Name", true)}
        {renderInput("fatherMobile", "Father's Mobile", "tel", "Father's Mobile", true)}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderInput("fatherOccupation", "Father's Occupation", "text", "Father's Occupation")}
        {renderInput("fatherIncome", "Father's Annual Income", "number", "Annual Income")}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderInput("motherName", "Mother's Name", "text", "Mother's Name")}
        {renderInput("motherOccupation", "Mother's Occupation", "text", "Mother's Occupation")}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderInput("grandFather", "Grand Father", "text", "Grand Father's Name")}
        {renderInput("nativePlace", "Native Place", "text", "Native Place")}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderInput("nationality", "Nationality", "text", "Nationality")}
        {renderInput("familyStatus", "Family Status", "select", "", false, [
          { value: "joint", label: "Joint" },
          { value: "nuclear", label: "Nuclear" }
        ])}
        </div>
        
        <div>
        {renderInput("address", "Address", "textarea", "Enter complete address")}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Contact & Location</h3>
        <p className="text-gray-600">Contact information and location details</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderInput("country", "Country", "text", "Country")}
        {renderInput("state", "State", "select", "", true, [
          { value: "maharashtra", label: "Maharashtra" },
          { value: "delhi", label: "Delhi" },
          { value: "karnataka", label: "Karnataka" },
          { value: "tamil-nadu", label: "Tamil Nadu" },
          { value: "telangana", label: "Telangana" },
          { value: "gujarat", label: "Gujarat" },
          { value: "rajasthan", label: "Rajasthan" },
          { value: "uttar-pradesh", label: "Uttar Pradesh" },
          { value: "west-bengal", label: "West Bengal" },
          { value: "other", label: "Other" }
        ])}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderInput("district", "District", "text", "District")}
        {renderInput("pinCode", "PIN Code", "text", "PIN Code")}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderInput("phone", "Phone", "tel", "Phone Number")}
        {renderInput("contactNo", "Contact Number", "tel", "Contact Number", true)}
        </div>
        
        <div>
        {renderInput("email", "Email ID", "email", "Email Address", true)}
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Personal Details</h3>
        <p className="text-gray-600">Physical and personal characteristics</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderInput("height", "Height", "select", "", true, [
          { value: "5.0", label: "5.0\"" },
          { value: "5.5", label: "5.5\"" },
          { value: "6.0", label: "6.0\"" }
        ])}
        {renderInput("bodyType", "Body Type", "select", "", true, [
          { value: "slim", label: "Slim" },
          { value: "average", label: "Average" },
          { value: "healthy", label: "Healthy" }
        ])}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderInput("complexion", "Complexion", "select", "", true, [
          { value: "fair", label: "Fair" },
          { value: "wheatish", label: "Wheatish" },
          { value: "dark", label: "Dark" }
        ])}
        {renderInput("bloodGroup", "Blood Group", "select", "", true, [
          { value: "A+", label: "A+" },
          { value: "B+", label: "B+" },
          { value: "O+", label: "O+" },
          { value: "AB+", label: "AB+" }
        ])}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderInput("educationDetail", "Education Detail", "text", "Education Details")}
        {renderInput("education", "Education", "select", "", true, [
          { value: "btech", label: "B.Tech" },
          { value: "mba", label: "MBA" },
          { value: "mca", label: "MCA" },
          { value: "other", label: "Other" }
        ])}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderInput("hobby", "Hobby", "text", "Hobbies")}
        {renderInput("occupation", "Occupation", "text", "Occupation", true)}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderInput("designation", "Designation", "text", "Designation")}
        {renderInput("annualIncome", "Annual Income", "number", "Annual Income")}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderInput("companyName", "Company Name", "text", "Company Name")}
        {renderInput("companyCity", "Company City", "text", "Company City")}
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Sibling & Relative Details</h3>
        <p className="text-gray-600">Information about siblings and relatives</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderInput("unmarriedBrothers", "No of Unmarried Brothers", "number", "0", false)}
        {renderInput("unmarriedSisters", "No of Unmarried Sisters", "number", "0", false)}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderInput("marriedBrothers", "No of Married Brothers", "number", "0", false)}
        {renderInput("marriedSisters", "No of Married Sisters", "number", "0", false)}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderInput("relation", "Relation", "text", "Relation")}
        {renderInput("relativeName", "Relative Name", "text", "Relative Name")}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderInput("relativeMobile", "Relative Mobile", "tel", "Mobile Number")}
        {renderInput("relativeCity", "Relative City", "text", "City")}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderInput("relativeCompany", "Relative Company", "text", "Company Name")}
        {renderInput("relativeDesignation", "Relative Designation", "text", "Designation")}
        </div>
        
        <div>
        {renderInput("relativeAddress", "Relative Company Address", "textarea", "Company Address")}
      </div>
    </div>
  );

  const renderStep6 = () => (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Other Information & Photos</h3>
        <p className="text-gray-600">Additional information and photo uploads</p>
      </div>
      
      <div>
        {renderInput("kundaliMilana", "Kundali Milana Necessary", "select", "", false, [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" }
        ])}
      </div>

      <div>
        {renderInput("aboutMe", "About Me / Other Information", "textarea", "Tell us about yourself, your interests, values, and what you're looking for in a life partner...", true)}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Profile Photo <span className="text-red-500">*</span>
        </label>
        <input
          type="file"
          name="profilePhoto"
          onChange={handleFileChange}
          accept="image/*"
          className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 ${
            validationErrors.profilePhoto ? 'border-red-500' : 'border-gray-300'
          }`}
          required
        />
        <p className="text-sm text-gray-500 mt-1">Upload a clear, recent photo of yourself</p>
        {validationErrors.profilePhoto && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.profilePhoto}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Photos
        </label>
        <input
          type="file"
          name="additionalPhotos"
          onChange={handleFileChange}
          accept="image/*"
          multiple
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <p className="text-sm text-gray-500 mt-1">You can upload up to 5 additional photos</p>
      </div>

      <div className="flex items-start space-x-3 pt-4">
        <input
          type="checkbox"
          name="acceptTerms"
          checked={formData.acceptTerms}
          onChange={handleInputChange}
          className="mt-1 h-4 w-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
          required
        />
        <div className="text-sm text-gray-600">
          <label className="font-medium text-gray-700">
            I agree to the{" "}
            <a href="#" className="text-pink-600 hover:text-pink-700 underline">
              Terms and Conditions
            </a>{" "}
            and{" "}
            <a href="#" className="text-pink-600 hover:text-pink-700 underline">
              Privacy Policy
            </a>
          </label>
          <p className="mt-1 text-gray-500">
            By creating a profile, you agree to our community guidelines and consent to the processing of your personal data.
          </p>
        </div>
      </div>
      {validationErrors.acceptTerms && (
        <p className="text-red-500 text-sm mt-1">{validationErrors.acceptTerms}</p>
      )}
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      case 5:
        return renderStep5();
      case 6:
        return renderStep6();
      default:
        return renderStep1();
    }
  };

  if (!mounted) return null;

  const modalContent = (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999] p-4" 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0,
        zIndex: 99999,
        isolation: 'isolate'
      }}
      >
      {/* Toast Notification */}
      {showToast && (
        <div className={`fixed top-4 right-4 z-[100001] px-6 py-3 rounded-lg shadow-lg ${
          toastType === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
        }`}>
          {toastMessage}
        </div>
      )}

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative z-[100000]"
        style={{ 
          position: 'relative', 
          zIndex: 100000,
          isolation: 'isolate'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Create Your Profile</h2>
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
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm text-gray-500">
                {Math.round((currentStep / totalSteps) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-pink-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            {renderCurrentStep()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  currentStep === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Previous
              </button>

              <div className="flex gap-3">
                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-2 bg-pink-600 text-white rounded-lg font-medium hover:bg-pink-700 transition-colors"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                  >
                    Create Profile
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );

  // Use portal to render modal outside normal DOM hierarchy
  if (typeof window !== 'undefined' && document.body) {
    return createPortal(modalContent, document.body);
  }
  
  return null;
};

export default CreateProfile;
