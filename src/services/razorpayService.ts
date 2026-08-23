export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
    };
  }
}

export function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export async function processRazorpayPayment(params: {
  amount: number;
  user: { name: string; email: string; phone: string };
  orderDescription: string;
  paymentMethod: string;
  onSuccess: (paymentDetails: { paymentId: string; orderId: string; signature: string }) => void;
  onFailure: (errorMsg: string) => void;
}) {
  const isLoaded = await loadRazorpayScript();

  const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_AgriConnect2026';
  const orderId = `order_rzp_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;

  if (isLoaded && window.Razorpay) {
    const options: RazorpayOptions = {
      key: keyId,
      amount: Math.round(params.amount * 100), // in paise
      currency: 'INR',
      name: 'AgriConnect Marketplace',
      description: params.orderDescription,
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=200&q=80',
      order_id: orderId,
      handler: function (response: RazorpayResponse) {
        params.onSuccess({
          paymentId: response.razorpay_payment_id || `pay_rzp_${Date.now()}`,
          orderId: response.razorpay_order_id || orderId,
          signature: response.razorpay_signature || `sig_rzp_${Date.now()}`
        });
      },
      prefill: {
        name: params.user.name,
        email: params.user.email,
        contact: params.user.phone
      },
      theme: {
        color: '#059669' // Agri Emerald Green
      },
      modal: {
        ondismiss: function () {
          params.onFailure('Payment checkout cancelled by user');
        }
      }
    };

    try {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.warn('Razorpay SDK modal error, fallback to simulated checkout gateway', err);
      return false;
    }
  } else {
    // If Razorpay script blocked or offline network, trigger simulation callback
    return false;
  }
}
