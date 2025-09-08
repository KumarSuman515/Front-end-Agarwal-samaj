// Paytm Payment Gateway Configuration
// Replace these with your actual Paytm credentials

export const PAYTM_CONFIG = {
  // Merchant Credentials - Get these from Paytm Business Dashboard
  MERCHANT_ID: process.env.PAYTM_MERCHANT_ID || 'YOUR_MERCHANT_ID',
  MERCHANT_KEY: process.env.PAYTM_MERCHANT_KEY || 'YOUR_MERCHANT_KEY',
  
  // Environment Configuration
  WEBSITE: process.env.PAYTM_WEBSITE || 'WEBSTAGING', // Use 'DEFAULT' for production
  CHANNEL_ID: process.env.PAYTM_CHANNEL_ID || 'WEB',
  INDUSTRY_TYPE_ID: process.env.PAYTM_INDUSTRY_TYPE_ID || 'Retail',
  
  // URLs
  CALLBACK_URL: process.env.PAYTM_CALLBACK_URL || 'http://localhost:3000/api/membership/payment/callback',
  
  // Transaction URLs
  TXN_URL: process.env.NODE_ENV === 'production' 
    ? 'https://securegw.paytm.in/order/process'
    : 'https://securegw-stage.paytm.in/order/process',
    
  // Status Check URL
  STATUS_URL: process.env.NODE_ENV === 'production'
    ? 'https://securegw.paytm.in/order/status'
    : 'https://securegw-stage.paytm.in/order/status'
};

// Instructions for setup:
/*
1. Register at https://business.paytm.com/
2. Complete KYC verification
3. Get your Merchant ID and Merchant Key from the dashboard
4. Set up your environment variables:
   - PAYTM_MERCHANT_ID
   - PAYTM_MERCHANT_KEY
   - PAYTM_CALLBACK_URL (your domain + /api/membership/payment/callback)
5. For production, change PAYTM_WEBSITE to 'DEFAULT'
6. Test with small amounts first

Free Tier Benefits:
- No setup fees
- No annual maintenance charges
- 0% MDR on UPI and RuPay debit cards
- Low transaction fees on other payment methods
- Industry-standard security
*/
