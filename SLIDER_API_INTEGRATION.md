# Slider API Integration

This document explains how the Hero component is integrated with the backend slider API.

## Overview

The Hero component now fetches slider images dynamically from the backend API instead of using static placeholder images.

## Backend API Endpoints

The backend provides the following slider endpoints:

- `GET /api/homePageSliderRoutes` - Get all sliders
- `GET /api/homePageSliderRoutes/:id` - Get single slider by ID
- `POST /api/homePageSliderRoutes` - Create new slider (admin only)
- `PUT /api/homePageSliderRoutes/:id` - Update slider (admin only)
- `DELETE /api/homePageSliderRoutes/:id` - Delete slider (admin only)

## Frontend Integration

### API Service (`lib/api.ts`)

Created a centralized API service with:
- Axios instance with base configuration
- Request/response interceptors for logging and error handling
- Type-safe functions for all slider operations
- Automatic error handling and retry logic

### Hero Component Updates

The Hero component now:
- Fetches slider data from the backend API on mount
- Shows loading state while fetching data
- Displays real images from the API with proper fallbacks
- Handles errors gracefully with retry functionality
- Falls back to placeholder images if API fails

### Key Features

1. **Dynamic Data Loading**: Fetches slider images from backend
2. **Loading States**: Shows spinner while loading
3. **Error Handling**: Displays error messages with retry option
4. **Fallback Images**: Uses placeholder images if API fails
5. **Image Optimization**: Uses Next.js Image component for optimization
6. **TypeScript Support**: Fully typed for better development experience

## Environment Configuration

Set the backend API URL in your environment:

```bash
# Create .env.local file in frontend directory
NEXT_PUBLIC_API_URL=http://localhost:4005
```

## Testing

### Manual Testing

1. Start the backend server:
   ```bash
   cd Agarwal_Matrimony_backend-main
   npm start
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

3. Visit the homepage to see the Hero component with API data

### Automated Testing

Run the test script to verify API connectivity:

```bash
cd frontend
node test-slider-api.js
```

## Data Flow

1. Hero component mounts
2. `useEffect` triggers `fetchSliders()` function
3. Direct axios call makes GET request to `/api/homePageSliderRoutes`
4. Backend returns slider data with image paths
5. Component updates state with fetched data
6. Images are rendered using Next.js Image component
7. Auto-slide functionality works with dynamic data

## Error Scenarios

The component handles these error scenarios:

1. **Network Error**: Shows error message with retry button
2. **Empty Response**: Falls back to placeholder images
3. **Server Error**: Shows error message with retry option
4. **Image Load Error**: Falls back to gradient background

## Image URL Construction

Images are served from the backend's uploads directory:
- Full URL: `http://localhost:4005/uploads/filename.jpg`
- Handles both relative and absolute URLs
- Supports external image URLs

## Performance Considerations

- Images are lazy loaded except for the first slide
- Next.js Image component provides automatic optimization
- Fallback images prevent layout shifts
- Loading states improve perceived performance

## Future Enhancements

Potential improvements:
- Add image caching
- Implement infinite scroll for many sliders
- Add image preloading
- Support for video sliders
- Admin interface for managing sliders
