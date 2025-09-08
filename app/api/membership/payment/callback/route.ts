import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { PAYTM_CONFIG } from '@/lib/paytm-config';

// Verify Paytm checksum
function verifyChecksum(params: any, checksum: string, key: string): boolean {
  const sortedKeys = Object.keys(params).sort();
  const checksumString = sortedKeys
    .map(key => `${key}=${params[key]}`)
    .join('&') + `&${key}`;
  
  const calculatedChecksum = crypto.createHash('sha256').update(checksumString).digest('hex');
  return calculatedChecksum === checksum;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extract Paytm response parameters
    const responseData = {
      ORDERID: formData.get('ORDERID'),
      MID: formData.get('MID'),
      TXNID: formData.get('TXNID'),
      TXNAMOUNT: formData.get('TXNAMOUNT'),
      PAYMENTMODE: formData.get('PAYMENTMODE'),
      CURRENCY: formData.get('CURRENCY'),
      TXNDATE: formData.get('TXNDATE'),
      STATUS: formData.get('STATUS'),
      RESPCODE: formData.get('RESPCODE'),
      RESPMSG: formData.get('RESPMSG'),
      GATEWAYNAME: formData.get('GATEWAYNAME'),
      BANKTXNID: formData.get('BANKTXNID'),
      BANKNAME: formData.get('BANKNAME'),
      CHECKSUMHASH: formData.get('CHECKSUMHASH')
    };

    // Verify checksum
    const isValidChecksum = verifyChecksum(
      responseData, 
      responseData.CHECKSUMHASH as string, 
      PAYTM_CONFIG.MERCHANT_KEY
    );

    if (!isValidChecksum) {
      console.error('Invalid checksum received from Paytm');
      return NextResponse.redirect(new URL('/membership?status=failed&reason=invalid_checksum', request.url));
    }

    // Process payment result
    if (responseData.STATUS === 'TXN_SUCCESS') {
      // Payment successful
      console.log('Payment successful:', responseData);
      
      // Here you would:
      // 1. Save member data to database
      // 2. Send confirmation email
      // 3. Update membership status
      
      return NextResponse.redirect(new URL('/membership?status=success&orderId=' + responseData.ORDERID, request.url));
    } else {
      // Payment failed
      console.log('Payment failed:', responseData);
      return NextResponse.redirect(new URL('/membership?status=failed&reason=' + responseData.RESPMSG, request.url));
    }

  } catch (error) {
    console.error('Payment callback error:', error);
    return NextResponse.redirect(new URL('/membership?status=error', request.url));
  }
}

export async function GET(request: NextRequest) {
  // Handle GET requests (some payment gateways use GET for callbacks)
  return POST(request);
}
