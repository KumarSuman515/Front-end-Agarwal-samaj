// Validation utilities for the classified business registration form

export interface ValidationResult {
  isValid: boolean;
  errors: { [key: string]: string };
}

export const validatePersonName = (name: string): string | null => {
  if (!name.trim()) {
    return "Person name is required";
  }
  if (name.trim().length < 2) {
    return "Person name must be at least 2 characters";
  }
  if (name.trim().length > 50) {
    return "Person name must be less than 50 characters";
  }
  if (!/^[a-zA-Z\s\.]+$/.test(name.trim())) {
    return "Person name can only contain letters, spaces, and dots";
  }
  return null;
};

export const validateFirmName = (name: string): string | null => {
  if (!name.trim()) {
    return "Firm name is required";
  }
  if (name.trim().length < 2) {
    return "Firm name must be at least 2 characters";
  }
  if (name.trim().length > 100) {
    return "Firm name must be less than 100 characters";
  }
  return null;
};

export const validateBusinessCategory = (category: string): string | null => {
  if (!category) {
    return "Business category is required";
  }
  return null;
};

export const validateFirmAddress = (address: string): string | null => {
  if (!address.trim()) {
    return "Firm address is required";
  }
  if (address.trim().length < 10) {
    return "Please provide a complete address (at least 10 characters)";
  }
  if (address.trim().length > 500) {
    return "Address must be less than 500 characters";
  }
  return null;
};

export const validatePhoneNumber = (phone: string): string | null => {
  if (!phone.trim()) {
    return "Phone number is required";
  }
  
  const cleanPhone = phone.replace(/\D/g, '');
  
  if (cleanPhone.length < 10) {
    return "Phone number must be at least 10 digits";
  }
  if (cleanPhone.length > 15) {
    return "Phone number must be less than 15 digits";
  }
  if (!/^(\+91|91|0)?[6-9]\d{9}$/.test(cleanPhone)) {
    return "Please enter a valid Indian mobile number (starting with 6, 7, 8, or 9)";
  }
  return null;
};

export const validateEmail = (email: string): string | null => {
  if (!email.trim()) {
    return "Email is required";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Please enter a valid email address";
  }
  if (email.length > 100) {
    return "Email must be less than 100 characters";
  }
  return null;
};

export const validateWebsite = (website: string): string | null => {
  if (!website.trim()) {
    return null; // Website is optional
  }
  
  if (!/^https?:\/\/.+/.test(website)) {
    return "Website must start with http:// or https://";
  }
  if (website.length > 200) {
    return "Website URL must be less than 200 characters";
  }
  
  try {
    new URL(website);
    return null;
  } catch {
    return "Please enter a valid website URL";
  }
};

export const formatPhoneNumber = (value: string): string => {
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

export const validateFormData = (formData: {
  person_name: string;
  firm_name: string;
  firm_address: string;
  phone: string;
  email: string;
  website: string;
  business_category: string;
}): ValidationResult => {
  const errors: { [key: string]: string } = {};

  const personNameError = validatePersonName(formData.person_name);
  if (personNameError) errors.person_name = personNameError;

  const firmNameError = validateFirmName(formData.firm_name);
  if (firmNameError) errors.firm_name = firmNameError;

  const businessCategoryError = validateBusinessCategory(formData.business_category);
  if (businessCategoryError) errors.business_category = businessCategoryError;

  const firmAddressError = validateFirmAddress(formData.firm_address);
  if (firmAddressError) errors.firm_address = firmAddressError;

  const phoneError = validatePhoneNumber(formData.phone);
  if (phoneError) errors.phone = phoneError;

  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;

  const websiteError = validateWebsite(formData.website);
  if (websiteError) errors.website = websiteError;

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};









