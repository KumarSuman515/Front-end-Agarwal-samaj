# Membership Form Demo

## How to Test the Form

### 1. Start the Development Server
```bash
cd frontend
npm run dev
```

### 2. Navigate to Membership Page
- Go to `http://localhost:3000/membership`
- You will see 3 membership plans:
  - **Basic Member** - Free (Lifetime)
  - **Premium Member** - ₹500 (per year) - Most Popular
  - **Patron Member** - ₹1000 (per year)

### 3. Select a Plan
- Click on any membership plan
- You will be redirected to the membership form

### 4. Fill Out the Form
The form collects the following information:

#### Personal Information (Required)
- First Name: John
- Last Name: Doe
- Email: john.doe@example.com
- Phone: 9876543210
- Gender: Male/Female/Other
- Age: 30
- Occupation: Software Engineer (Optional)

#### Address Information (Required)
- Full Address: 123 Main Street, Apartment 4B
- City: Mumbai
- State: Maharashtra
- Pincode: 400001

#### Emergency Contact (Required)
- Emergency Contact Name: Jane Doe
- Emergency Contact Phone: 9876543211

#### Payment Method
- **Paytm Payment Only** - No other options available
- User will be redirected to Paytm's secure payment page

### 5. Submit the Form
- Click "Pay ₹500 & Complete Registration" (or the amount for selected plan)
- Form validates all required fields
- If validation passes, redirects to Paytm payment gateway

### 6. Expected Flow

#### Form Validation
- All required fields must be filled
- Email format validation
- Phone number must be 10 digits
- Pincode must be 6 digits

#### Payment Process
1. Form data is collected
2. API call to `/api/membership/payment`
3. Paytm payment URL is generated
4. User is redirected to Paytm payment page
5. After payment, user returns to your site

### 7. Test Data Examples

#### Valid Test Data
```
First Name: Rajesh
Last Name: Agarwal
Email: rajesh.agarwal@gmail.com
Phone: 9876543210
Gender: Male
Age: 35
Occupation: Business Owner
Address: 456 Business Park, Sector 15
City: Delhi
State: Delhi
Pincode: 110001
Emergency Contact: Sita Agarwal
Emergency Phone: 9876543211
```

#### Invalid Test Data (for testing validation)
```
First Name: (empty) - Should show error
Email: invalid-email - Should show error
Phone: 123 - Should show error (must be 10 digits)
Pincode: 123 - Should show error (must be 6 digits)
```

### 8. API Endpoints

#### Payment Initiation
- **URL**: `/api/membership/payment`
- **Method**: POST
- **Body**: Form data with member details
- **Response**: Paytm payment URL

#### Payment Callback
- **URL**: `/api/membership/payment/callback`
- **Method**: POST
- **Purpose**: Handle Paytm payment response

### 9. Features

✅ **Complete Form**: Collects all necessary member information
✅ **Validation**: Client-side validation with error messages
✅ **Paytm Integration**: Direct integration with Paytm payment gateway
✅ **Responsive Design**: Works on desktop and mobile
✅ **User-Friendly**: Clear instructions and error messages
✅ **Secure**: Paytm's industry-standard security

### 10. Paytm Benefits

- **Free Setup**: No setup fees
- **0% MDR**: On UPI and RuPay transactions
- **Secure**: Industry-standard encryption
- **Fast**: Quick payment processing
- **Reliable**: Trusted payment gateway

### 11. Next Steps After Payment

1. **Save Member Data**: Store member information in database
2. **Send Confirmation**: Email confirmation to member
3. **Update Status**: Mark membership as active
4. **Welcome Email**: Send welcome package and benefits

### 12. Troubleshooting

#### Common Issues
- **Form not submitting**: Check all required fields are filled
- **Payment not working**: Verify Paytm credentials in environment
- **Validation errors**: Ensure correct data format (email, phone, pincode)

#### Success Indicators
- Form submits without errors
- Redirects to Paytm payment page
- Payment completes successfully
- User returns to success page

## Ready to Use!

The membership form is now ready for production use. Users can:
1. Select a membership plan
2. Fill out their details
3. Pay through Paytm
4. Become members of Agarwal Samaj

The form is optimized for Indian users with Paytm payment integration and collects all necessary information for membership registration.
