import { API_BASE_URL } from './config';
import { getBackendUrl } from '../utils/env';

// API Error Types
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string,
    public userMessage?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Network Error Messages (User-friendly)
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'कृपया अपना इंटरनेट कनेक्शन चेक करें / Please check your internet connection.',
  SERVER_UNAVAILABLE: 'सर्वर अभी उपलब्ध नहीं है कृपया कुछ समय बाद पुनः प्रयास करें / Server is currently unavailable. Please try again later.',
  TIMEOUT: 'अनुरोध समय समाप्त हो गया कृपया दोबारा प्रयास करें / Request timeout. Please try again.',
  CORS_ERROR: 'कनेक्शन में समस्या है कृपया बाद में प्रयास करें / Connection issue. Please try again later.',
  BAD_REQUEST: 'कृपया सही जानकारी भरें / Please provide valid information.',
  UNAUTHORIZED: 'आप इस कार्य को करने के लिए अधिकृत नहीं हैं / You are not authorized for this action.',
  FORBIDDEN: 'आपको इस संसाधन तक पहुंचने की अनुमति नहीं है / You do not have permission to access this resource.',
  NOT_FOUND: 'अनुरोधित डेटा नहीं मिला / Requested data not found.',
  SERVER_ERROR: 'सर्वर में कुछ समस्या है कृपया बाद में प्रयास करें / Server error. Please try again later.',
  UNKNOWN_ERROR: 'कुछ गलत हो गया कृपया दोबारा प्रयास करें / Something went wrong. Please try again.',
};

// Request Configuration
export interface ApiRequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  skipErrorHandling?: boolean;
}

// Default Configuration
const DEFAULT_CONFIG: Required<Pick<ApiRequestConfig, 'timeout' | 'retries' | 'retryDelay'>> = {
  timeout: 60000, // 60 seconds
  retries: 3, // Retry 3 times before failing
  retryDelay: 2000, // 2 second delay between retries
};

// Check if error is a network error
function isNetworkError(error: any): boolean {
  return (
    error.message === 'Failed to fetch' ||
    error.message === 'Network request failed' ||
    error.message === 'NetworkError when attempting to fetch resource.' ||
    error.name === 'TypeError' ||
    !error.status
  );
}

// Sleep utility for retry delay
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Fetch with timeout
async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeout: number
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new ApiError(
        'Request timeout',
        408,
        'TIMEOUT',
        ERROR_MESSAGES.TIMEOUT
      );
    }
    throw error;
  }
}

// Main API Client Function
export async function apiClient<T = any>(
  endpoint: string,
  config: ApiRequestConfig = {}
): Promise<T> {
  const {
    method = 'GET',
    headers = {},
    body,
    timeout = DEFAULT_CONFIG.timeout,
    retries = DEFAULT_CONFIG.retries,
    retryDelay = DEFAULT_CONFIG.retryDelay,
    skipErrorHandling = false,
  } = config;

  // Build full URL
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  
  console.log('🔗 API Client - Making request to:', url);
  console.log('🔗 API Client - Endpoint:', endpoint);
  console.log('🔗 API Client - API_BASE_URL:', API_BASE_URL);

  // Prepare request options
  const requestOptions: RequestInit = {
    method,
    headers: {
      ...headers,
    },
  };

  // Add body for non-GET requests
  if (body && method !== 'GET') {
    if (body instanceof FormData) {
      requestOptions.body = body;
      // Don't set Content-Type for FormData, browser will set it with boundary
    } else {
      requestOptions.headers = {
        ...requestOptions.headers,
        'Content-Type': 'application/json',
      };
      requestOptions.body = JSON.stringify(body);
    }
  }

  // Retry logic
  let lastError: any;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      // Make the request with timeout
      console.log(`Attempt ${attempt + 1}/${retries + 1} - Making request to:`, url);
      const response = await fetchWithTimeout(url, requestOptions, timeout);

      // Handle different status codes
      if (!response.ok) {
        let errorData: any = {};
        try {
          errorData = await response.json();
          console.log('Server error response:', errorData);
        } catch (parseError) {
          console.log('Failed to parse error response:', parseError);
        }
        
        let userMessage: string;
        let detailedMessage = errorData.error || errorData.message || `HTTP ${response.status}`;
        
        switch (response.status) {
          case 400:
            userMessage = errorData.message || ERROR_MESSAGES.BAD_REQUEST;
            break;
          case 401:
            userMessage = ERROR_MESSAGES.UNAUTHORIZED;
            break;
          case 403:
            userMessage = ERROR_MESSAGES.FORBIDDEN;
            break;
          case 404:
            userMessage = ERROR_MESSAGES.NOT_FOUND;
            break;
          case 500:
          case 502:
          case 503:
          case 504:
            // Use server's error message if available for 500 errors
            userMessage = errorData.message || errorData.error || ERROR_MESSAGES.SERVER_ERROR;
            break;
          default:
            userMessage = errorData.message || ERROR_MESSAGES.UNKNOWN_ERROR;
        }

        throw new ApiError(
          detailedMessage,
          response.status,
          'HTTP_ERROR',
          userMessage
        );
      }

      // Try to parse response as JSON
      try {
        const data = await response.json();
        return data as T;
      } catch (parseError) {
        // If JSON parsing fails, return empty object
        return {} as T;
      }

    } catch (error: any) {
      lastError = error;

      // Don't retry on client errors (4xx) or if it's already an ApiError
      if (error instanceof ApiError && error.status && error.status >= 400 && error.status < 500) {
        throw error;
      }

      // Check if it's a network error
      if (isNetworkError(error)) {
        lastError = new ApiError(
          'Network error',
          0,
          'NETWORK_ERROR',
          ERROR_MESSAGES.NETWORK_ERROR
        );
      }

      // Retry if we have attempts left
      if (attempt < retries) {
        console.log(`Retrying request (attempt ${attempt + 1}/${retries})...`);
        await sleep(retryDelay * (attempt + 1)); // Exponential backoff
        continue;
      }

      // All retries exhausted
      break;
    }
  }

  // If we reach here, all retries failed
  if (lastError instanceof ApiError) {
    throw lastError;
  }

  // Generic network error
  throw new ApiError(
    lastError?.message || 'Unknown error',
    0,
    'NETWORK_ERROR',
    ERROR_MESSAGES.SERVER_UNAVAILABLE
  );
}

// Helper functions for common HTTP methods
export const api = {
  get: <T = any>(endpoint: string, config?: Omit<ApiRequestConfig, 'method' | 'body'>) =>
    apiClient<T>(endpoint, { ...config, method: 'GET' }),

  post: <T = any>(endpoint: string, body?: any, config?: Omit<ApiRequestConfig, 'method' | 'body'>) =>
    apiClient<T>(endpoint, { ...config, method: 'POST', body }),

  put: <T = any>(endpoint: string, body?: any, config?: Omit<ApiRequestConfig, 'method' | 'body'>) =>
    apiClient<T>(endpoint, { ...config, method: 'PUT', body }),

  patch: <T = any>(endpoint: string, body?: any, config?: Omit<ApiRequestConfig, 'method' | 'body'>) =>
    apiClient<T>(endpoint, { ...config, method: 'PATCH', body }),

  delete: <T = any>(endpoint: string, config?: Omit<ApiRequestConfig, 'method' | 'body'>) =>
    apiClient<T>(endpoint, { ...config, method: 'DELETE' }),
};

// Connection checker utility - following admin panel pattern
export async function checkServerConnection(): Promise<boolean> {
  try {
    const backendUrl = getBackendUrl();
    const response = await fetchWithTimeout(
      `${backendUrl}/api/health`,
      { method: 'GET' },
      5000 // 5 second timeout for health check
    );
    return response.ok;
  } catch (error) {
    return false;
  }
}

export default api;

