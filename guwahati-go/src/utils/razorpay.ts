export interface RazorpayOptions {
  key: string;
  amount: number;
  currency?: string;
  name?: string;
  description?: string;
  image?: string;
  order_id?: string;
  customer_id?: string;
  email?: string;
  contact?: string;
  notes?: Record<string, any>;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // Check if script is already loaded
    if (document.querySelector('script[src*="checkout.razorpay.com"]')) {
      console.log('[Razorpay] Script already loaded');
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    
    script.onload = () => {
      console.log('[Razorpay] Script loaded successfully');
      resolve(true);
    };
    
    script.onerror = () => {
      console.error('[Razorpay] Failed to load Razorpay script');
      resolve(false);
    };
    
    document.body.appendChild(script);
  });
};

export const initiateRazorpayPayment = async (options: RazorpayOptions) => {
  try {
    console.log('[Razorpay] Initiating payment with options:', options);
    
    // Load Razorpay script
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      throw new Error('Failed to load Razorpay script');
    }

    if (!window.Razorpay) {
      throw new Error('Razorpay is not available');
    }

    const razorpay = new window.Razorpay({
      key: options.key,
      amount: options.amount,
      currency: options.currency || 'INR',
      name: options.name || 'Dora Explorer',
      description: options.description || 'Experience Booking',
      image: options.image || '/doraexplorer1.png',
      order_id: options.order_id,
      customer_id: options.customer_id,
      prefill: {
        name: options.prefill?.name || '',
        email: options.prefill?.email || '',
        contact: options.prefill?.contact || '',
      },
      notes: options.notes || {},
      theme: {
        color: '#3b82f6',
      },
      handler: (response: any) => {
        console.log('[Razorpay] Payment successful, response:', response);
        return response;
      },
      modal: {
        ondismiss: () => {
          console.warn('[Razorpay] Payment modal dismissed by user');
          return null;
        },
      },
    });

    console.log('[Razorpay] Opening payment modal');
    razorpay.open();
    return razorpay;
  } catch (error) {
    console.error('[Razorpay] Payment Error:', error);
    throw error;
  }
};

export const generateOrderId = async (amount: number): Promise<string> => {
  try {
    console.log('[Razorpay] Creating order with amount:', amount);
    
    // This should be called from your backend
    const response = await fetch('http://localhost:5000/api/payment/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });

    console.log('[Razorpay] Order creation response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('[Razorpay] Order creation failed:', errorData);
      throw new Error(`Failed to create order: ${response.status} - ${errorData.error || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log('[Razorpay] Order created successfully:', data.orderId);
    return data.orderId || data.id;
  } catch (error) {
    console.error('[Razorpay] Error generating order:', error);
    throw error;
  }
};

export const verifyPayment = async (
  orderId: string,
  paymentId: string,
  signature: string
): Promise<boolean> => {
  try {
    console.log('[Razorpay] Verifying payment:', { orderId, paymentId });
    
    const response = await fetch('http://localhost:5000/api/payment/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId,
        paymentId,
        signature,
      }),
    });

    console.log('[Razorpay] Verification response status:', response.status);

    const data = await response.json();
    
    if (!data.verified) {
      console.error('[Razorpay] Payment verification failed:', data.message);
    } else {
      console.log('[Razorpay] Payment verified successfully');
    }
    
    return data.verified || false;
  } catch (error) {
    console.error('[Razorpay] Error verifying payment:', error);
    throw error;
  }
};
