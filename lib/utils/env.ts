// Safe environment variable access - following admin panel pattern
export const getBackendUrl = () => {
  // Try NEXT_PUBLIC_BACKEND_URL first, then fallback to NEXT_PUBLIC_API_URL
  const url = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL;
  if (!url) {
    console.error('NEXT_PUBLIC_BACKEND_URL and NEXT_PUBLIC_API_URL are not defined');
    return 'https://api.abaspunjab.in'; // fallback URL
  }
  return url;
};

export const getApiUrl = (endpoint: string) => {
  const baseUrl = getBackendUrl();
  return `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
};

// Safe image URL construction - following admin panel pattern
export const getImageUrl = (imagePath: string) => {
  if (!imagePath) return 'https://via.placeholder.com/300x200';
  
  const baseUrl = getBackendUrl();
  const cleanPath = imagePath.replace(/\\/g, '/');
  
  // If the path already starts with /uploads/, don't add it again
  if (cleanPath.startsWith('/uploads/')) {
    return `${baseUrl}${cleanPath}`;
  }
  
  return `${baseUrl}/uploads/${cleanPath}`;
};

// Production configuration similar to admin panel
export const PRODUCTION_CONFIG = {
  // Environment
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
  
  // API Configuration
  api: {
    baseUrl: getBackendUrl(),
    timeout: 30000, // 30 seconds
    retryAttempts: 3,
  },
  
  // Image Configuration
  images: {
    fallbackAvatar: 'https://via.placeholder.com/300x300',
    fallbackThumbnail: 'https://via.placeholder.com/600x400',
    fallbackImage: 'https://via.placeholder.com/300x200',
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  },
  
  // Error Handling
  errorHandling: {
    enableErrorBoundary: true,
    logErrors: process.env.NODE_ENV === 'development',
    showErrorDetails: process.env.NODE_ENV === 'development',
  },
  
  // Performance
  performance: {
    enableLazyLoading: true,
    enableImageOptimization: true,
    enableCodeSplitting: true,
  },
  
  // Security
  security: {
    sanitizeInputs: true,
    validateFileTypes: true,
    enableCSP: process.env.NODE_ENV === 'production',
  }
};

// Helper functions following admin panel pattern
export const isValidImageType = (file: File) => {
  return PRODUCTION_CONFIG.images.allowedTypes.includes(file.type);
};

export const isValidFileSize = (file: File) => {
  return file.size <= PRODUCTION_CONFIG.images.maxFileSize;
};
