// API Configuration - following admin panel pattern
import { getBackendUrl, getImageUrl as getImageUrlFromEnv } from '../utils/env';

export const API_URL = process.env.NEXT_PUBLIC_API_URL || getBackendUrl();
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || `${getBackendUrl()}/api`;
export const UPLOADS_URL = process.env.NEXT_PUBLIC_UPLOADS_URL || `${getBackendUrl()}/uploads`;

// API Endpoints
export const API_ENDPOINTS = {
  // Sliders
  sliders: `/sliders`,
  
  // Gallery
  albums: `/albums`,
  albumImages: (albumId: string) => `/albums/${albumId}/images`,
  albumDetail: (albumId: string) => `/albums/${albumId}`,
  
  // Blog
  blogs: `/blogs`,
  blogCategories: `/blogs/categories`,
  
  // Membership
  membership: `/membership`,
  
  // Classifieds
  classifieds: `/classifieds`,
  classifiedsRegister: `/classifieds/register`,
  classifiedsSearch: `/classifieds/search`,
  classifiedStatus: (contact: string) => `/classifieds/status/${encodeURIComponent(contact)}`,
  classifiedDetail: (id: string) => `/classifieds/${id}`,
  classifiedUpdateStatus: (id: string) => `/classifieds/${id}/status`,
  classifiedUpdateFeatured: (id: string) => `/classifieds/${id}/featured`,
  
  // Matrimony
  candidates: `/candidates`,
  candidateConnect: (id: string) => `/candidates/${id}/connect`,
};

// Helper function to get full image URL - following admin panel pattern
export const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return '';
  
  // If already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Use the same pattern as admin panel
  return getImageUrlFromEnv(imagePath);
};

export default API_ENDPOINTS;





