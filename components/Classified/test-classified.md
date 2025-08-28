# Classified System Testing Guide

## Prerequisites
1. Backend server running on `http://localhost:4005`
2. Frontend development server running
3. Database connected and synced

## Test Steps

### 1. Basic Functionality Test
1. Navigate to `/classified` page
2. Verify the page loads without errors
3. Check if classifieds are displayed (if any exist in database)
4. Verify loading spinner appears initially

### 2. Search Functionality
1. Enter a search term in the search box
2. Press Enter or click search icon
3. Verify results are filtered based on search term
4. Test with empty search to see all results

### 3. Category Filtering
1. Click on different category buttons (Business, Real Estate, etc.)
2. Verify classifieds are filtered by category
3. Click "All" to see all classifieds
4. Verify "All" button is highlighted when selected

### 4. Post New Classified
1. Click "Post New Classified" button
2. Verify modal opens with form
3. Fill out the form with test data:
   - Title: "Test Classified"
   - Category: "Business"
   - Description: "This is a test classified for testing purposes"
   - Contact: "+91 98765 43210"
   - Your Name: "Test User"
   - Your Phone: "+91 98765 43210"
4. Submit the form
5. Verify success message appears
6. Verify new classified appears in the list

### 5. Form Validation Test
1. Open "Post New Classified" modal
2. Try to submit empty form
3. Verify validation errors appear for required fields
4. Test invalid phone number format
5. Test invalid email format
6. Verify errors clear when user starts typing

### 6. Save Functionality
1. Click "Save" button on any classified
2. Verify toast notification appears
3. Verify button text changes to "Saved"
4. Click "View Saved" button
5. Verify saved classified appears in modal
6. Click "Remove" to remove from saved
7. Verify it's removed from saved list

### 7. Contact Functionality
1. Click "Contact" button on any classified
2. Verify contact information appears in toast
3. Check if email is included if available

### 8. Load More Functionality
1. If there are more than 12 classifieds, click "Load More"
2. Verify additional classifieds are loaded
3. Verify they're appended to existing list

### 9. Responsive Design Test
1. Test on mobile device or browser dev tools
2. Verify modals work correctly on mobile
3. Verify grid layout adapts to screen size
4. Test touch interactions

### 10. Error Handling Test
1. Stop the backend server
2. Try to post a new classified
3. Verify error message appears
4. Try to load classifieds
5. Verify error handling works

## Expected Results

### Success Cases
- ✅ Page loads without errors
- ✅ Search filters results correctly
- ✅ Category filtering works
- ✅ New classified can be posted
- ✅ Form validation works
- ✅ Save/unsave functionality works
- ✅ Contact information displays correctly
- ✅ Load more works with pagination
- ✅ Responsive design works
- ✅ Error messages appear for failures

### Common Issues to Check
- CORS errors in browser console
- Database connection issues
- API endpoint not found errors
- Validation errors not displaying
- Toast notifications not appearing

## API Endpoints to Verify

1. `GET http://localhost:4005/api/classifieds` - Should return classifieds
2. `POST http://localhost:4005/api/classifieds` - Should create new classified
3. `GET http://localhost:4005/api/classifieds/:id` - Should return single classified

## Browser Console Check
- No JavaScript errors
- No CORS errors
- Network requests completing successfully
- localStorage being used correctly for saved items
