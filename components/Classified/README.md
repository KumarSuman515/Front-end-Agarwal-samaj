# Classified System - Frontend Components

This directory contains the fully functional classified advertisement system for the Agarwal Samaj community.

## Components

### 1. `index.tsx` - Main Classified Component
The main component that displays all classifieds with the following features:

- **Dynamic Data Loading**: Fetches classifieds from the backend API
- **Search Functionality**: Search classifieds by title and description
- **Category Filtering**: Filter by Business, Real Estate, Jobs, Vehicles, Education, Events, Other
- **Pagination**: Load more classifieds with infinite scroll
- **Save Functionality**: Save/unsave classifieds (stored in localStorage)
- **Contact Integration**: Display contact information via toast notifications
- **Responsive Design**: Mobile-friendly interface

### 2. `CreateClassifiedModal.tsx` - Post New Classified
A modal form for creating new classified advertisements with:

- **Form Validation**: Client-side validation for all required fields
- **Category Selection**: Dropdown with all available categories
- **Contact Information**: Phone and email fields
- **Location & Price**: Optional fields for location and pricing
- **Expiration Date**: Optional expiration date for the classified
- **API Integration**: Posts data to the backend API
- **Error Handling**: Displays validation errors and API errors

### 3. `SavedClassifieds.tsx` - View Saved Classifieds
A modal component to view and manage saved classifieds:

- **Saved Items Display**: Shows all saved classifieds in a grid
- **Remove Functionality**: Remove items from saved list
- **Contact Integration**: Contact saved classified owners
- **Data Validation**: Removes invalid/expired classifieds automatically

## Features

### State Management
- Uses React hooks for state management
- localStorage for persistent saved classifieds
- Loading states for better UX

### API Integration
- Fetches classifieds from `http://localhost:4005/api/classifieds`
- Supports pagination, filtering, and search
- Error handling with toast notifications

### User Experience
- Toast notifications for all user actions
- Loading spinners during API calls
- Responsive design for all screen sizes
- Smooth animations with Framer Motion

### Data Validation
- Client-side form validation
- Server-side validation feedback
- Automatic cleanup of invalid saved items

## Usage

### Basic Usage
```tsx
import Classified from "@/components/Classified";

// In your page component
<Classified />
```

### With Custom Configuration
The component automatically handles:
- API calls to fetch classifieds
- User interactions (save, contact, search)
- Modal management
- Toast notifications

## API Endpoints Used

- `GET /api/classifieds` - Fetch classifieds with filters
- `POST /api/classifieds` - Create new classified
- `GET /api/classifieds/:id` - Get single classified (for saved items)

## Dependencies

- `react-hot-toast` - Toast notifications
- `framer-motion` - Animations
- `react-dom` - Portal rendering for modals

## Browser Storage

The component uses localStorage to persist:
- Saved classified IDs
- User preferences

## Error Handling

- Network errors are caught and displayed as toast notifications
- Form validation errors are shown inline
- Invalid saved items are automatically cleaned up

## Responsive Design

- Mobile-first approach
- Grid layout adapts to screen size
- Modal components are mobile-friendly
- Touch-friendly buttons and interactions
