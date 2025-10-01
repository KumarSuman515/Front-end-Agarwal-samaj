// API Configuration
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4005';
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4005/api';
export const UPLOADS_URL = process.env.NEXT_PUBLIC_UPLOADS_URL || 'http://localhost:4005/uploads';

// API Endpoints
export const API_ENDPOINTS = {
  // Sliders
  sliders: `${API_BASE_URL}/sliders`,
  
  // Gallery
  albums: `${API_BASE_URL}/albums`,
  albumImages: (albumId: string) => `${API_BASE_URL}/albums/${albumId}/images`,
  albumDetail: (albumId: string) => `${API_BASE_URL}/albums/${albumId}`,
  
  // Blog
  blogs: `${API_BASE_URL}/blogs`,
  blogCategories: `${API_BASE_URL}/blogs/categories`,
  
  // Membership
  membership: `${API_BASE_URL}/membership`,
  
  // Classifieds
  classifieds: `${API_BASE_URL}/classifieds`,
  classifiedsRegister: `${API_BASE_URL}/classifieds/register`,
  classifiedsSearch: `${API_BASE_URL}/classifieds/search`,
  classifiedStatus: (contact: string) => `${API_BASE_URL}/classifieds/status/${encodeURIComponent(contact)}`,
  classifiedDetail: (id: string) => `${API_BASE_URL}/classifieds/${id}`,
  classifiedUpdateStatus: (id: string) => `${API_BASE_URL}/classifieds/${id}/status`,
  classifiedUpdateFeatured: (id: string) => `${API_BASE_URL}/classifieds/${id}/featured`,
  
  // Matrimony
  candidates: `${API_BASE_URL}/candidates`,
  candidateConnect: (id: string) => `${API_BASE_URL}/candidates/${id}/connect`,
};

// Helper function to get full image URL
export const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return '';
  
  // If already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // If path starts with /, use API_URL
  if (imagePath.startsWith('/')) {
    return `${API_URL}${imagePath}`;
  }
  
  // If path starts with 'uploads/', use API_URL
  if (imagePath.startsWith('uploads/')) {
    return `${API_URL}/${imagePath}`;
  }
  
  // Otherwise, assume it's in uploads directory
  return `${UPLOADS_URL}/${imagePath}`;
};

export default API_ENDPOINTS;

