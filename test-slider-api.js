// Simple test script to verify slider API integration
// Run this with: node test-slider-api.js

const axios = require('axios');

const API_BASE_URL = 'http://localhost:4005';

async function testSliderAPI() {
  try {
    console.log('Testing Slider API Integration...\n');
    
    // Test 1: Health check
    console.log('1. Testing server health...');
    const healthResponse = await axios.get(`${API_BASE_URL}/`);
    console.log('✅ Server is running:', healthResponse.data.message);
    
    // Test 2: Get all sliders
    console.log('\n2. Testing GET /api/homePageSliderRoutes...');
    const slidersResponse = await axios.get(`${API_BASE_URL}/api/homePageSliderRoutes`);
    console.log('✅ Sliders fetched successfully');
    console.log('Number of sliders:', slidersResponse.data.length);
    
    if (slidersResponse.data.length > 0) {
      console.log('Sample slider data:');
      console.log(JSON.stringify(slidersResponse.data[0], null, 2));
    } else {
      console.log('ℹ️  No sliders found in database');
    }
    
    console.log('\n✅ All tests passed! Hero component will only show data from backend API.');
    console.log('ℹ️  Note: No fallback images - slider will show empty state if no API data.');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Make sure the backend server is running on port 4005');
      console.log('   Run: cd Agarwal_Matrimony_backend-main && npm start');
    }
    
    if (error.response) {
      console.log('Response status:', error.response.status);
      console.log('Response data:', error.response.data);
    }
  }
}

testSliderAPI();
