import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { PAYTM_CONFIG } from '@/lib/paytm-config';

interface PaymentRequest {
  orderId: string;
  amount: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  planName: string;
  planDuration: string;
  memberData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    occupation: string;
    age: string;
    gender: string;
    emergencyContact: string;
    emergencyPhone: string;
  };
}

// Generate checksum for Paytm
function generateChecksum(params: any, key: string): string {
  const sortedKeys = Object.keys(params).sort();
  const checksumString = sortedKeys
    .map(key => `${key}=${params[key]}`)
    .join('&') + `&${key}`;
  
  return crypto.createHash('sha256').update(checksumString).digest('hex');
}

export async function POST(request: NextRequest) {
  try {
    const paymentData: PaymentRequest = await request.json();
    
    // Validate required fields
    if (!paymentData.orderId || !paymentData.amount || !paymentData.customerEmail) {
      return NextResponse.json(
        { error: 'Missing required payment information' },
        { status: 400 }
      );
    }

    // Prepare Paytm parameters
    const paytmParams = {
      MID: PAYTM_CONFIG.MERCHANT_ID,
      WEBSITE: PAYTM_CONFIG.WEBSITE,
      CHANNEL_ID: PAYTM_CONFIG.CHANNEL_ID,
      INDUSTRY_TYPE_ID: PAYTM_CONFIG.INDUSTRY_TYPE_ID,
      ORDER_ID: paymentData.orderId,
      CUST_ID: paymentData.customerId,
      TXN_AMOUNT: paymentData.amount,
      CALLBACK_URL: PAYTM_CONFIG.CALLBACK_URL,
      EMAIL: paymentData.customerEmail,
      MOBILE_NO: paymentData.customerPhone,
      CHECKSUMHASH: '' // Will be calculated below
    };

    // Generate checksum
    const checksum = generateChecksum(paytmParams, PAYTM_CONFIG.MERCHANT_KEY);
    paytmParams.CHECKSUMHASH = checksum;

    // For demo purposes, we'll return a mock response
    // In production, you would redirect to Paytm's payment page
    if (process.env.NODE_ENV === 'development') {
      return NextResponse.json({
        success: true,
        message: 'Payment initiated successfully',
        orderId: paymentData.orderId,
        amount: paymentData.amount,
        paymentUrl: `${PAYTM_CONFIG.TXN_URL}?${new URLSearchParams(paytmParams as any).toString()}`,
        // For demo, we'll also return the form data that would be submitted to Paytm
        paytmFormData: paytmParams,
        memberData: paymentData.memberData
      });
    }

    // In production, redirect to Paytm
    return NextResponse.json({
      success: true,
      message: 'Payment initiated successfully',
      orderId: paymentData.orderId,
      amount: paymentData.amount,
      paymentUrl: `${PAYTM_CONFIG.TXN_URL}?${new URLSearchParams(paytmParams as any).toString()}`
    });

  } catch (error) {
    console.error('Payment initiation error:', error);
    return NextResponse.json(
      { error: 'Failed to initiate payment' },
      { status: 500 }
    );
  }
}

// Handle Paytm callback
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('ORDERID');
    const txnId = searchParams.get('TXNID');
    const status = searchParams.get('STATUS');
    const amount = searchParams.get('TXNAMOUNT');
    const checksum = searchParams.get('CHECKSUMHASH');

    // Verify checksum (implement proper verification)
    // For demo purposes, we'll assume it's valid

    if (status === 'TXN_SUCCESS') {
      // Payment successful
      // Save member data to database
      // Send confirmation email
      
      return NextResponse.json({
        success: true,
        message: 'Payment successful',
        orderId,
        txnId,
        amount
      });
    } else {
      // Payment failed
      return NextResponse.json({
        success: false,
        message: 'Payment failed',
        orderId,
        status
      });
    }
  } catch (error) {
    console.error('Payment callback error:', error);
    return NextResponse.json(
      { error: 'Payment callback failed' },
      { status: 500 }
    );
  }
}
